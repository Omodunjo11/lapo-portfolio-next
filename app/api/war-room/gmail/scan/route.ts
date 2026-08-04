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
import { getRecruitingPipeline } from "@/lib/recruiting/pipeline";
import { ensurePrepDecks } from "@/lib/recruiting/prep-deck";
import { commitPipeline } from "@/lib/recruiting/store";
import { commitTextFile } from "@/lib/git-store";
import type { Pipeline } from "@/lib/recruiting/types";

export const runtime = "nodejs";
export const maxDuration = 60;

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

async function commitNewBriefs(beforePaths: Set<string>, pipeline: Pipeline) {
  for (const e of pipeline.events) {
    if (!e.briefPath || beforePaths.has(e.briefPath)) continue;
    const slug = e.briefPath.split("/").pop()?.replace(/\.md$/i, "");
    if (!slug) continue;
    const abs = join(process.cwd(), "data", "briefs", `${slug}.md`);
    if (!existsSync(abs)) continue;
    const text = readFileSync(abs, "utf8");
    await commitTextFile(
      `data/briefs/${slug}.md`,
      text,
      `War room: prep brief for ${e.companyId}`
    );
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

  let pipeline = getRecruitingPipeline();
  const scan = await scanInterviewSignals(pipeline, { days: opts.days });

  let appliedCalendar = 0;
  if (opts.applyCalendar) {
    const result = applyCalendarFacts(pipeline, scan.proposals);
    appliedCalendar = result.applied;
    pipeline = result.pipeline;
  }

  let prep = {
    createdDocs: 0,
    mappedFolders: 0,
    localBriefs: 0,
    errors: [] as string[],
  };

  if (opts.ensurePrep !== false) {
    const beforePaths = new Set(
      pipeline.events.map((e) => e.briefPath).filter(Boolean) as string[]
    );
    const ensured = await ensurePrepDecks(pipeline);
    prep = {
      createdDocs: ensured.createdDocs,
      mappedFolders: ensured.mappedFolders,
      localBriefs: ensured.localBriefs,
      errors: ensured.errors,
    };
    pipeline = ensured.pipeline;

    if (
      opts.persist &&
      (appliedCalendar > 0 ||
        ensured.createdDocs > 0 ||
        ensured.mappedFolders > 0 ||
        ensured.localBriefs > 0)
    ) {
      await commitNewBriefs(beforePaths, pipeline);
      await commitPipeline(
        pipeline,
        `War room scan: calendar ${appliedCalendar}, prep docs ${ensured.createdDocs}, folders ${ensured.mappedFolders}`
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
