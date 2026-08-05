import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { gmailConfigured } from "@/lib/recruiting/gmail/client";
import {
  applyCalendarFacts,
  scanInterviewSignals,
} from "@/lib/recruiting/gmail/scan";
import { ensureDiscoveredCompanies } from "@/lib/recruiting/gmail/discover-company";
import {
  proposalsToFlags,
  mergePendingFlags,
  activePendingFlags,
} from "@/lib/recruiting/inbox";
import {
  commitRecruitingInbox,
  getRecruitingInbox,
} from "@/lib/recruiting/inbox-store";
import {
  getRecruitingPipeline,
  loadWritablePipeline,
} from "@/lib/recruiting/pipeline";
import {
  ensureAdvancePrepDecks,
  ensurePrepDecks,
} from "@/lib/recruiting/prep-deck";
import { commitPipeline } from "@/lib/recruiting/store";
import { commitJsonFile, commitTextFile } from "@/lib/git-store";
import type { Pipeline } from "@/lib/recruiting/types";
import {
  getRecruitingComparison,
  joinComparison,
  type ComparisonFile,
  type JoinedComparison,
} from "@/lib/recruiting/comparison";
import { upsertComparisonForCompanies } from "@/lib/recruiting/comparison-score";

export const runtime = "nodejs";
export const maxDuration = 90;

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

async function commitBriefPath(briefPath: string, companyId: string) {
  const slug = briefPath.split("/").pop()?.replace(/\.md$/i, "");
  if (!slug) return;
  const abs = join(process.cwd(), "data", "briefs", `${slug}.md`);
  if (!existsSync(abs)) return;
  const text = readFileSync(abs, "utf8");
  await commitTextFile(
    `data/briefs/${slug}.md`,
    text,
    `War room: prep brief for ${companyId}`
  );
}

async function commitNewBriefs(beforePaths: Set<string>, pipeline: Pipeline) {
  for (const e of pipeline.events) {
    if (!e.briefPath || beforePaths.has(e.briefPath)) continue;
    await commitBriefPath(e.briefPath, e.companyId);
  }
  // Advance prep writes next-<company>.md which may not be on an event yet.
  for (const c of pipeline.companies) {
    const p = `briefs/next-${c.id}.md`;
    if (beforePaths.has(p)) continue;
    const abs = join(process.cwd(), "data", "briefs", `next-${c.id}.md`);
    if (!existsSync(abs)) continue;
    await commitBriefPath(p, c.id);
  }
}

async function runScan(opts: {
  days?: number;
  applyCalendar: boolean;
  persist: boolean;
  ensurePrep?: boolean;
  /** Claude on the scan request — keep false for cron (use /api/war-room/prep). */
  claudePrep?: boolean;
}) {
  if (!gmailConfigured()) {
    return {
      error: NextResponse.json(
        {
          error: "gmail_not_configured",
          detail:
            "Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN on Vercel",
        },
        { status: 503 }
      ),
    };
  }

  // Always start from GitHub main so Accept/Edit stages aren't stomped
  // by a stale deploy bundle.
  let pipeline = await loadWritablePipeline().catch(() =>
    getRecruitingPipeline()
  );
  const scan = await scanInterviewSignals(pipeline, { days: opts.days });

  // Auto-add firms from clear "Interview with X" / calendar titles before
  // calendar facts and stage flags run (needs companyId on the board).
  const discovered = ensureDiscoveredCompanies(pipeline, scan.proposals);
  pipeline = discovered.pipeline;
  const companiesAdded = discovered.added.length;

  let appliedCalendar = 0;
  if (opts.applyCalendar) {
    const result = applyCalendarFacts(pipeline, scan.proposals);
    appliedCalendar = result.applied;
    pipeline = result.pipeline;
  }

  // Persist discoveries immediately so a later Drive/prep failure cannot
  // leave Northslope (etc.) offline after a successful classify.
  if (opts.persist && (companiesAdded > 0 || appliedCalendar > 0)) {
    try {
      await commitPipeline(
        pipeline,
        companiesAdded > 0
          ? `War room scan: add ${companiesAdded} discovered company(ies), calendar ${appliedCalendar}`
          : `War room Gmail scan: apply ${appliedCalendar} calendar fact(s)`
      );
    } catch (err) {
      console.error("war-room scan early pipeline commit failed", err);
    }
  }

  let prep = {
    createdDocs: 0,
    updatedDocs: 0,
    mappedFolders: 0,
    localBriefs: 0,
    claudeDecks: 0,
    errors: [] as string[],
  };

  // Shared across prep + comparison scoring.
  const emailByCompany: Record<string, string> = {};
  for (const p of scan.proposals) {
    if (!p.companyId || p.source !== "gmail") continue;
    if (
      p.signal !== "advance" &&
      p.signal !== "schedule" &&
      p.signal !== "wait"
    ) {
      continue;
    }
    const chunk = `Subject: ${p.subject || ""}\nFrom: ${p.from || ""}\n${p.snippet || ""}`;
    emailByCompany[p.companyId] = emailByCompany[p.companyId]
      ? `${emailByCompany[p.companyId]}\n---\n${chunk}`
      : chunk;
  }

  if (opts.ensurePrep !== false) {
    const beforePaths = new Set(
      pipeline.events.map((e) => e.briefPath).filter(Boolean) as string[]
    );
    for (const c of pipeline.companies) {
      const p = `briefs/next-${c.id}.md`;
      const abs = join(process.cwd(), "data", "briefs", `next-${c.id}.md`);
      if (existsSync(abs)) beforePaths.add(p);
    }

    try {
      const discoveredIds = discovered.added.map((c) => c.id);
      // Any scheduled company still missing a Drive prepUrl gets a folder +
      // research-first doc (covers Northslope if discovery ran earlier).
      const missingPrepIds = pipeline.companies
        .filter(
          (c) =>
            !c.drive?.prepUrl &&
            pipeline.events.some(
              (e) =>
                e.companyId === c.id && e.status === "scheduled" && e.start
            )
        )
        .map((c) => c.id);
      const bootstrapIds = Array.from(
        new Set([...discoveredIds, ...missingPrepIds])
      );

      const ensured = await ensurePrepDecks(pipeline, {
        emailByCompany:
          opts.claudePrep || bootstrapIds.length > 0 ? emailByCompany : {},
        onlyCompanyIds: bootstrapIds.length > 0 ? bootstrapIds : undefined,
        force: bootstrapIds.length > 0,
        researchBootstrap: bootstrapIds.length > 0,
      });
      // If we only bootstrapped missing companies, still map/create prep for
      // other scheduled events missing docs.
      if (bootstrapIds.length > 0) {
        const rest = await ensurePrepDecks(ensured.pipeline, {
          emailByCompany: opts.claudePrep ? emailByCompany : {},
        });
        pipeline = rest.pipeline;
        prep = {
          createdDocs: ensured.createdDocs + rest.createdDocs,
          updatedDocs: ensured.updatedDocs + rest.updatedDocs,
          mappedFolders: Math.max(ensured.mappedFolders, rest.mappedFolders),
          localBriefs: ensured.localBriefs + rest.localBriefs,
          claudeDecks: ensured.claudeDecks + rest.claudeDecks,
          errors: [...ensured.errors, ...rest.errors],
        };
      } else {
        pipeline = ensured.pipeline;
        prep = {
          createdDocs: ensured.createdDocs,
          updatedDocs: ensured.updatedDocs,
          mappedFolders: ensured.mappedFolders,
          localBriefs: ensured.localBriefs,
          claudeDecks: ensured.claudeDecks,
          errors: [...ensured.errors],
        };
      }

      let advances = {
        createdDocs: 0,
        updatedDocs: 0,
        mappedFolders: 0,
        localBriefs: 0,
        claudeDecks: 0,
        errors: [] as string[],
        pipeline,
      };

      if (opts.claudePrep) {
        advances = await ensureAdvancePrepDecks(
          pipeline,
          scan.proposals.filter((p) => p.signal === "advance"),
          { limit: 1 }
        );
        pipeline = advances.pipeline;
      }

      prep = {
        createdDocs: prep.createdDocs + advances.createdDocs,
        updatedDocs: prep.updatedDocs + advances.updatedDocs,
        mappedFolders: Math.max(prep.mappedFolders, advances.mappedFolders),
        localBriefs: prep.localBriefs + advances.localBriefs,
        claudeDecks: prep.claudeDecks + advances.claudeDecks,
        errors: [...prep.errors, ...advances.errors],
      };

      if (
        opts.persist &&
        (prep.createdDocs > 0 ||
          prep.updatedDocs > 0 ||
          prep.mappedFolders > 0 ||
          prep.localBriefs > 0)
      ) {
        await commitNewBriefs(beforePaths, pipeline);
        await commitPipeline(
          pipeline,
          `War room scan: prep+${prep.createdDocs}/~${prep.updatedDocs}, claude ${prep.claudeDecks}`
        );
      }
    } catch (err) {
      const detail = (err as Error).message || "prep_failed";
      console.error("war-room scan prep failed", err);
      prep.errors.push(detail);
    }
  }

  const prevInbox = getRecruitingInbox();
  // Only NEW messages vs last scan become flags. Same threads already in the
  // snapshot do not propose another "→ next round".
  const discoveredFlags = proposalsToFlags(pipeline, scan.proposals, {
    handledKeys: prevInbox.handledKeys || [],
    alreadySeenProposals: prevInbox.proposals || [],
  });
  const pendingFlags = activePendingFlags(
    pipeline,
    mergePendingFlags(prevInbox.pendingFlags, discoveredFlags),
    [],
    prevInbox.handledKeys || []
  );

  const inbox = {
    scannedAt: scan.scannedAt,
    days: scan.days,
    gmailMatched: scan.gmailMatched,
    calendarMatched: scan.calendarMatched,
    proposals: scan.proposals,
    handledKeys: prevInbox.handledKeys || [],
    pendingFlags,
  };

  if (opts.persist) {
    await commitRecruitingInbox(
      inbox,
      `War room Gmail scan: ${scan.proposals.length} proposal(s), ${discoveredFlags.length} new flag(s)`
    );
  }

  let comparisonFile: ComparisonFile | null = getRecruitingComparison();
  let comparisonRows: JoinedComparison | null = null;
  let comparisonAdded: string[] = [];
  let comparisonScored = 0;
  try {
    if (comparisonFile) {
      const upserted = await upsertComparisonForCompanies(
        comparisonFile,
        pipeline.companies,
        { emailByCompany }
      );
      comparisonFile = upserted.file;
      comparisonAdded = upserted.added.map((r) => r.companyId);
      comparisonScored = upserted.scored;
      if (
        opts.persist &&
        (upserted.added.length > 0 || upserted.scored > 0)
      ) {
        await commitJsonFile(
          "data/recruiting-comparison.json",
          comparisonFile,
          `War room scan: comparison +${upserted.added.length} / scored ${upserted.scored}`
        );
      }
      comparisonRows = joinComparison(comparisonFile, pipeline.companies);
    }
  } catch (err) {
    console.error("war-room scan comparison upsert failed", err);
    prep.errors.push(
      `comparison: ${(err as Error).message || "comparison_failed"}`
    );
    if (comparisonFile) {
      comparisonRows = joinComparison(comparisonFile, pipeline.companies);
    }
  }

  return {
    ok: NextResponse.json({
      ok: true,
      ...inbox,
      appliedCalendar,
      companiesAdded,
      discoveredCompanies: discovered.added.map((c) => ({
        id: c.id,
        name: c.name,
        stage: c.stage,
        nextAction: c.nextAction,
        due: c.due,
        priority: c.priority,
        aliases: c.aliases,
      })),
      // Fresh board slice so the client updates immediately (don't wait for
      // GitHub/Vercel rebuild after commitPipeline).
      pipeline: {
        companies: pipeline.companies,
        events: pipeline.events,
        focus: pipeline.focus,
        updated: pipeline.updated,
      },
      comparison: comparisonFile,
      comparisonRows,
      comparisonAdded,
      comparisonScored,
      prep,
      spamMatched: scan.spamMatched,
      flags: pendingFlags,
    }),
  };
}

export async function GET(req: NextRequest) {
  if (!cronAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const result = await runScan({
      applyCalendar: true,
      persist: true,
      ensurePrep: true,
      claudePrep: false,
    });
    if ("error" in result && result.error) return result.error;
    return result.ok!;
  } catch (err) {
    return NextResponse.json(
      { error: "scan_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }
}

export async function POST(req: NextRequest) {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const days = typeof body.days === "number" ? body.days : undefined;
  const applyCalendar = body.applyCalendar !== false;
  const persist = body.persist !== false;
  const ensurePrep = body.ensurePrep !== false;
  const claudePrep = body.claudePrep === true;

  try {
    const result = await runScan({
      days,
      applyCalendar,
      persist,
      ensurePrep,
      claudePrep,
    });
    if ("error" in result && result.error) return result.error;
    return result.ok!;
  } catch (err) {
    return NextResponse.json(
      { error: "scan_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }
}
