import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { getRecruitingPipeline } from "@/lib/recruiting/pipeline";
import {
  appendPrepNotes,
  loadPrepNotes,
  prepNotesRepoPath,
  writePrepNotesLocal,
} from "@/lib/recruiting/prep-notes";
import { commitTextFile } from "@/lib/git-store";

export const runtime = "nodejs";

/**
 * GET ?companyId=hang-ten — load accumulated feedback log
 * POST { companyId, notes, mode?: "append"|"replace", persist? }
 *   append (default): add dated entry, keep old feedback
 *   replace: overwrite whole file (escape hatch)
 */
export async function GET(req: NextRequest) {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 403 });
  }

  const companyId = req.nextUrl.searchParams.get("companyId");
  if (!companyId) {
    return NextResponse.json({ error: "companyId_required" }, { status: 400 });
  }

  const pipeline = getRecruitingPipeline();
  if (!pipeline.companies.some((c) => c.id === companyId)) {
    return NextResponse.json({ error: "unknown_company" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    companyId,
    notes: loadPrepNotes(companyId),
  });
}

export async function POST(req: NextRequest) {
  const access = await requireRecruitingAccess();
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as {
    companyId?: string;
    notes?: string;
    mode?: "append" | "replace";
    persist?: boolean;
  } | null;

  const companyId = body?.companyId;
  if (!companyId || typeof body?.notes !== "string") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const pipeline = getRecruitingPipeline();
  if (!pipeline.companies.some((c) => c.id === companyId)) {
    return NextResponse.json({ error: "unknown_company" }, { status: 404 });
  }

  const mode = body.mode === "replace" ? "replace" : "append";
  const notes =
    mode === "replace"
      ? writePrepNotesLocal(companyId, body.notes)
      : appendPrepNotes(companyId, body.notes);
  const persist = body.persist !== false;

  if (persist) {
    try {
      await commitTextFile(
        prepNotesRepoPath(companyId),
        notes || "\n",
        `War room: prep notes for ${companyId}`
      );
    } catch (err) {
      return NextResponse.json({
        ok: true,
        companyId,
        notes,
        mode,
        persisted: false,
        warn: (err as Error).message,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    companyId,
    notes,
    mode,
    persisted: persist,
  });
}
