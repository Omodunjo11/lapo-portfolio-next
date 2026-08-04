import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { gmailConfigured } from "@/lib/recruiting/gmail/client";
import {
  applyCalendarFacts,
  scanInterviewSignals,
} from "@/lib/recruiting/gmail/scan";
import { proposalsToFlags } from "@/lib/recruiting/inbox";
import { commitRecruitingInbox } from "@/lib/recruiting/inbox-store";
import {
  getRecruitingPipeline,
  loadWritablePipeline,
} from "@/lib/recruiting/pipeline";
import {
  ensureAdvancePrepDecks,
  ensurePrepDecks,
} from "@/lib/recruiting/prep-deck";
import { commitPipeline } from "@/lib/recruiting/store";
import { commitTextFile } from "@/lib/git-store";
import type { Pipeline } from "@/lib/recruiting/types";

export const runtime = "nodejs";
export const maxDuration = 120;

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

  let appliedCalendar = 0;
  if (opts.applyCalendar) {
    const result = applyCalendarFacts(pipeline, scan.proposals);
    appliedCalendar = result.applied;
    pipeline = result.pipeline;
  }

  let prep = {
    createdDocs: 0,
    updatedDocs: 0,
    mappedFolders: 0,
    localBriefs: 0,
    claudeDecks: 0,
    errors: [] as string[],
  };

  if (opts.ensurePrep !== false) {
    const beforePaths = new Set(
      pipeline.events.map((e) => e.briefPath).filter(Boolean) as string[]
    );
    for (const c of pipeline.companies) {
      const p = `briefs/next-${c.id}.md`;
      const abs = join(process.cwd(), "data", "briefs", `next-${c.id}.md`);
      if (existsSync(abs)) beforePaths.add(p);
    }

    const emailByCompany: Record<string, string> = {};
    for (const p of scan.proposals) {
      if (!p.companyId || p.source !== "gmail") continue;
      if (p.signal !== "advance" && p.signal !== "schedule") continue;
      const chunk = `Subject: ${p.subject || ""}\nFrom: ${p.from || ""}\n${p.snippet || ""}`;
      emailByCompany[p.companyId] = emailByCompany[p.companyId]
        ? `${emailByCompany[p.companyId]}\n---\n${chunk}`
        : chunk;
    }

    const ensured = await ensurePrepDecks(pipeline, { emailByCompany });
    pipeline = ensured.pipeline;

    const advances = await ensureAdvancePrepDecks(
      pipeline,
      scan.proposals.filter((p) => p.signal === "advance"),
      { limit: 2 }
    );
    pipeline = advances.pipeline;

    prep = {
      createdDocs: ensured.createdDocs + advances.createdDocs,
      updatedDocs: ensured.updatedDocs + advances.updatedDocs,
      mappedFolders: Math.max(ensured.mappedFolders, advances.mappedFolders),
      localBriefs: ensured.localBriefs + advances.localBriefs,
      claudeDecks: ensured.claudeDecks + advances.claudeDecks,
      errors: [...ensured.errors, ...advances.errors],
    };

    if (
      opts.persist &&
      (appliedCalendar > 0 ||
        prep.createdDocs > 0 ||
        prep.updatedDocs > 0 ||
        prep.mappedFolders > 0 ||
        prep.localBriefs > 0)
    ) {
      await commitNewBriefs(beforePaths, pipeline);
      await commitPipeline(
        pipeline,
        `War room scan: calendar ${appliedCalendar}, prep+${prep.createdDocs}/~${prep.updatedDocs}, claude ${prep.claudeDecks}`
      );
    }
  } else if (opts.persist && appliedCalendar > 0) {
    await commitPipeline(
      pipeline,
      `War room Gmail scan: apply ${appliedCalendar} calendar fact(s)`
    );
  }

  const inbox = {
    scannedAt: scan.scannedAt,
    days: scan.days,
    gmailMatched: scan.gmailMatched,
    calendarMatched: scan.calendarMatched,
    proposals: scan.proposals,
  };

  if (opts.persist) {
    await commitRecruitingInbox(
      inbox,
      `War room Gmail scan: ${scan.proposals.length} proposal(s)`
    );
  }

  const flags = proposalsToFlags(pipeline, scan.proposals);

  return {
    ok: NextResponse.json({
      ok: true,
      ...inbox,
      appliedCalendar,
      prep,
      spamMatched: scan.spamMatched,
      flags,
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

  try {
    const result = await runScan({
      days,
      applyCalendar,
      persist,
      ensurePrep,
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
