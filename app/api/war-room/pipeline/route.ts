import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { getRecruitingPipeline, loadWritablePipeline } from "@/lib/recruiting/pipeline";
import { commitPipeline } from "@/lib/recruiting/store";
import { EDITABLE_STAGES, type Company } from "@/lib/recruiting/types";

const PATCHABLE_KEYS = [
  "stage",
  "stageLabel",
  "ball",
  "priority",
  "nextAction",
  "due",
  "nudgeDate",
] as const satisfies readonly (keyof Company)[];

type PatchBody = {
  companyId: string;
  patch: Partial<Pick<Company, (typeof PATCHABLE_KEYS)[number]>>;
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isDateOrEmpty(value: unknown): boolean {
  if (value === null || value === undefined || value === "") return true;
  return typeof value === "string" && DATE_RE.test(value);
}

function isValidPatch(body: unknown): body is PatchBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.companyId !== "string" || !b.companyId) return false;
  if (!b.patch || typeof b.patch !== "object") return false;
  const patch = b.patch as Record<string, unknown>;
  for (const key of Object.keys(patch)) {
    if (!PATCHABLE_KEYS.includes(key as (typeof PATCHABLE_KEYS)[number])) {
      return false;
    }
  }
  if (
    "stage" in patch &&
    !(EDITABLE_STAGES as readonly string[]).includes(patch.stage as string)
  ) {
    return false;
  }
  if ("due" in patch && !isDateOrEmpty(patch.due)) return false;
  if ("nudgeDate" in patch && !isDateOrEmpty(patch.nudgeDate)) return false;
  return true;
}

export async function PATCH(req: NextRequest) {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!isValidPatch(body)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const pipeline = await loadWritablePipeline();
  const company = pipeline.companies.find((c) => c.id === body.companyId);
  if (!company) {
    return NextResponse.json({ error: "company_not_found" }, { status: 404 });
  }

  Object.assign(company, body.patch);
  pipeline.updated = new Date().toISOString().slice(0, 10);

  try {
    await commitPipeline(
      pipeline,
      `War room: update ${body.companyId} via app`
    );
  } catch (err) {
    return NextResponse.json(
      { error: "commit_failed", detail: (err as Error).message },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, updated: pipeline.updated });
}
