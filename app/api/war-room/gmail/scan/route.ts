import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { gmailConfigured } from "@/lib/recruiting/gmail/client";
import {
  applyCalendarFacts,
  scanInterviewSignals,
} from "@/lib/recruiting/gmail/scan";
import { proposalsToFlags } from "@/lib/recruiting/inbox";
import { commitRecruitingInbox } from "@/lib/recruiting/inbox-store";
import { getRecruitingPipeline } from "@/lib/recruiting/pipeline";
import { commitPipeline } from "@/lib/recruiting/store";

export const runtime = "nodejs";
export const maxDuration = 60;

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}

async function runScan(opts: {
  days?: number;
  applyCalendar: boolean;
  persist: boolean;
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
    if (appliedCalendar > 0 && opts.persist) {
      await commitPipeline(
        result.pipeline,
        `War room Gmail scan: apply ${appliedCalendar} calendar fact(s)`
      );
      pipeline = result.pipeline;
    } else if (appliedCalendar > 0) {
      pipeline = result.pipeline;
    }
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
      flags,
    }),
  };
}

export async function GET(req: NextRequest) {
  // Vercel Cron
  if (!cronAuthorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const result = await runScan({ applyCalendar: true, persist: true });
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

  try {
    const result = await runScan({ days, applyCalendar, persist });
    if ("error" in result && result.error) return result.error;
    return result.ok!;
  } catch (err) {
    return NextResponse.json(
      { error: "scan_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }
}
