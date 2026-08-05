import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { loadWritablePipeline } from "@/lib/recruiting/pipeline";
import { commitPipeline } from "@/lib/recruiting/store";
import { commitTextFile } from "@/lib/git-store";
import type { FunnelStage } from "@/lib/recruiting/types";
import { EDITABLE_STAGES } from "@/lib/recruiting/types";

export const runtime = "nodejs";

type DebriefBody = {
  eventId?: string;
  companyId: string;
  energy?: number;
  /** How keen they seemed to advance you (1–5). Feeds comparison Excited. */
  theirPull?: number;
  stageOutcome?: string;
  whatTheyCareAbout?: string;
  landed?: string;
  fix?: string;
  nextStep?: string;
  timeline?: string;
  peopleMentioned?: string;
  loopNext?: string;
  loopUnknown?: string;
  prepNext?: string;
  markEventDone?: boolean;
  stage?: FunnelStage;
};

export async function POST(req: NextRequest) {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as DebriefBody | null;
  if (!body?.companyId) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const pipeline = await loadWritablePipeline();
  const company = pipeline.companies.find((c) => c.id === body.companyId);
  if (!company) {
    return NextResponse.json({ error: "company_not_found" }, { status: 404 });
  }

  const today = new Date().toISOString().slice(0, 10);
  const event =
    (body.eventId &&
      pipeline.events.find((e) => e.id === body.eventId)) ||
    pipeline.events.find(
      (e) => e.companyId === body.companyId && e.status === "scheduled"
    );

  if (event && body.markEventDone !== false) {
    event.status = "done";
  }

  if (
    body.stage &&
    (EDITABLE_STAGES as readonly string[]).includes(body.stage)
  ) {
    company.stage = body.stage;
    company.stageLabel = body.stage;
  }

  if (body.nextStep) {
    company.nextAction = body.nextStep;
    company.ball = "them";
  }
  if (body.timeline) {
    // store timeline hint in nextAction if nextStep empty
    if (!body.nextStep) company.nextAction = `Next: ${body.timeline}`;
  }
  company.due = today;
  pipeline.updated = today;

  const withWho = event?.with || "TBD";
  const md = `# Debrief, ${company.name}, ${today}

With: ${withWho}
Energy (yours): ${body.energy ?? "?"} / 5
Their excitement / pull: ${body.theirPull ?? "?"} / 5
Stage outcome: ${body.stageOutcome || "unclear"}

## What they care about
${body.whatTheyCareAbout || "-"}

## What landed
${body.landed || "-"}

## What to fix
${body.fix || "-"}

## Facts / process
- Next step: ${body.nextStep || "-"}
- Timeline: ${body.timeline || "-"}
- People mentioned: ${body.peopleMentioned || "-"}

## Loop updates
- Confirmed next round: ${body.loopNext || "-"}
- Still unknown: ${body.loopUnknown || "-"}
- Prep to start now: ${body.prepNext || "-"}

---
Captured from War Room debrief.
`;

  const filePath = `data/debriefs/${company.id}-${today}.md`;

  try {
    await commitTextFile(
      filePath,
      md,
      `War room debrief: ${company.id} ${today}`
    );
    await commitPipeline(
      pipeline,
      `War room debrief: update ${company.id} after call`
    );
  } catch (err) {
    return NextResponse.json(
      { error: "commit_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    debriefPath: filePath,
    pipeline,
    hint: "Refresh in ~30–60s after deploy. Stub/refresh next brief in recruiting-season when loopNext is known.",
  });
}
