import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import { anthropicConfigured } from "@/lib/recruiting/claude";
import {
  getRecruitingPipeline,
  loadWritablePipeline,
} from "@/lib/recruiting/pipeline";
import { ensureAdvancePrepDecks } from "@/lib/recruiting/prep-deck";
import { commitPipeline } from "@/lib/recruiting/store";
import { commitTextFile } from "@/lib/git-store";
import type { IngestProposal } from "@/lib/recruiting/gmail/classify";

export const runtime = "nodejs";
export const maxDuration = 60;

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

async function commitBriefIfPresent(companyId: string, briefFiles?: Record<string, string>) {
  const repoPath = `data/briefs/next-${companyId}.md`;
  const fromMem = briefFiles?.[repoPath];
  if (fromMem) {
    await commitTextFile(
      repoPath,
      fromMem,
      `War room: Claude prep for ${companyId}`
    );
    return true;
  }
  const slug = `next-${companyId}`;
  const abs = join(process.cwd(), "data", "briefs", `${slug}.md`);
  const tmp = join("/tmp", "recruiting-briefs", `${slug}.md`);
  const path = existsSync(tmp) ? tmp : existsSync(abs) ? abs : null;
  if (!path) return false;
  await commitTextFile(
    repoPath,
    readFileSync(path, "utf8"),
    `War room: Claude prep for ${companyId}`
  );
  return true;
}

/**
 * Generate next-round Claude prep for one company from email + optional Lapo update.
 * Body: { companyId, subject?, snippet?, from?, userUpdate?, force?, persist? }
 */
export async function POST(req: NextRequest) {
  const cron = cronAuthorized(req);
  if (!cron) {
    const access = await requireRecruitingAccess();
    if (!access.ok) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }
  }

  if (!anthropicConfigured()) {
    return NextResponse.json(
      { error: "anthropic_not_configured", detail: "Set ANTHROPIC_API_KEY" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const companyId =
    typeof body.companyId === "string" ? body.companyId : null;
  const subject = typeof body.subject === "string" ? body.subject : "";
  const snippet = typeof body.snippet === "string" ? body.snippet : "";
  const from = typeof body.from === "string" ? body.from : "";
  const userUpdate =
    typeof body.userUpdate === "string" ? body.userUpdate : "";
  const force = body.force === true || Boolean(userUpdate.trim());
  const persist = body.persist !== false;

  if (!companyId) {
    return NextResponse.json({ error: "companyId_required" }, { status: 400 });
  }

  let pipeline = await loadWritablePipeline().catch(() =>
    getRecruitingPipeline()
  );
  if (!pipeline.companies.some((c) => c.id === companyId)) {
    return NextResponse.json({ error: "unknown_company" }, { status: 404 });
  }

  const advance: IngestProposal = {
    source: "gmail",
    id: `manual-prep-${companyId}-${Date.now()}`,
    companyId,
    companyName:
      pipeline.companies.find((c) => c.id === companyId)?.name || companyId,
    subject,
    snippet,
    from,
    signal: "advance",
    confidence: "medium",
    reason: userUpdate.trim()
      ? "manual prep from Lapo update + email"
      : "manual / post-scan Claude prep",
  };

  const ensured = await ensureAdvancePrepDecks(pipeline, [advance], {
    limit: 1,
    userUpdate: userUpdate || null,
    force,
  });
  pipeline = ensured.pipeline;

  if (persist && (ensured.localBriefs > 0 || ensured.createdDocs > 0 || ensured.updatedDocs > 0 || ensured.claudeDecks > 0)) {
    await commitBriefIfPresent(companyId, ensured.briefFiles);
    await commitPipeline(
      pipeline,
      `War room: Claude prep ${companyId} (${ensured.claudeDecks} llm)`
    );
  }

  return NextResponse.json({
    ok: true,
    companyId,
    ...ensured,
    anthropic: true,
  });
}
