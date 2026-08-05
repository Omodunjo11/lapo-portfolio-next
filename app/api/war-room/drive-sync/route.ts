import { NextRequest, NextResponse } from "next/server";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import {
  docIdFromUrl,
  folderIdFromUrl,
  createPrepDoc,
  updatePrepDoc,
} from "@/lib/recruiting/drive";
import { getRecruitingPipeline } from "@/lib/recruiting/pipeline";
import { commitPipeline } from "@/lib/recruiting/store";

export const runtime = "nodejs";
export const maxDuration = 60;

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function readBrief(companyId: string): string | null {
  // Prefer human living notes in debriefs when present (Brain Co gold standard).
  const goldCandidates = [
    join(process.cwd(), "data", "debriefs", `${companyId}-interview-notes.md`),
    join(process.cwd(), "data", "debriefs", `${companyId}-2026-08-04.md`),
    join(process.cwd(), "data", "debriefs", `${companyId}-notes.md`),
  ];
  for (const gold of goldCandidates) {
    if (!existsSync(gold)) continue;
    let text = readFileSync(gold, "utf8");
    text = text.replace(
      /\n(- Next-round brief:.*\n)(- Decision journal:.*\n)(- Pipeline:.*\n)(- Story gap:.*\n)?/,
      "\n"
    );
    return text;
  }

  const candidates = [
    join(process.cwd(), "data", "briefs", `next-${companyId}.md`),
    join("/tmp", "recruiting-briefs", `next-${companyId}.md`),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p, "utf8");
  }
  return null;
}

/**
 * Push committed living-notes briefs into linked Drive Docs as formatted HTML.
 * POST { companyId?: string, persist?: boolean }
 */
export async function POST(req: NextRequest) {
  const cron = cronAuthorized(req);
  if (!cron) {
    const access = await requireRecruitingAccess();
    if (!access.ok) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }
  }

  const body = (await req.json().catch(() => ({}))) as {
    companyId?: string;
    persist?: boolean;
  };
  const persist = body.persist !== false;

  const pipeline = getRecruitingPipeline();
  const companies = pipeline.companies.filter((c) =>
    body.companyId ? c.id === body.companyId : Boolean(c.drive?.prepUrl || c.drive?.folderUrl)
  );

  const results: {
    companyId: string;
    action: string;
    error?: string;
    prepUrl?: string;
  }[] = [];

  for (const company of companies) {
    const text = readBrief(company.id);
    if (!text) {
      results.push({ companyId: company.id, action: "skip", error: "no_brief" });
      continue;
    }

    const existingId = docIdFromUrl(company.drive?.prepUrl);
    try {
      if (existingId) {
        await updatePrepDoc({ docId: existingId, plainText: text });
        results.push({
          companyId: company.id,
          action: "updated",
          prepUrl: company.drive?.prepUrl,
        });
        continue;
      }

      const folderId = folderIdFromUrl(company.drive?.folderUrl);
      if (!folderId) {
        results.push({
          companyId: company.id,
          action: "skip",
          error: "no_folder",
        });
        continue;
      }

      const doc = await createPrepDoc({
        folderId,
        title: `${company.name}: Interview Notes and Prep`,
        plainText: text,
      });
      company.drive = {
        ...(company.drive || {}),
        folderUrl: company.drive?.folderUrl,
        prepUrl: doc.webViewLink,
        note: "Living notes synced as formatted Doc",
      };
      results.push({
        companyId: company.id,
        action: "created",
        prepUrl: doc.webViewLink,
      });
    } catch (err) {
      results.push({
        companyId: company.id,
        action: "error",
        error: (err as Error).message,
      });
    }
  }

  if (persist && results.some((r) => r.action === "created")) {
    await commitPipeline(
      pipeline,
      "War room: sync living-notes prepUrls to Drive"
    );
  }

  return NextResponse.json({
    ok: true,
    results,
    updated: results.filter((r) => r.action === "updated").length,
    created: results.filter((r) => r.action === "created").length,
  });
}
