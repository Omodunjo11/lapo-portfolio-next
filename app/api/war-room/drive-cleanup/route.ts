import { NextRequest, NextResponse } from "next/server";
import { requireRecruitingAccess } from "@/lib/recruiting/access";
import {
  docIdFromUrl,
  getDriveClient,
} from "@/lib/recruiting/drive";
import { getRecruitingPipeline } from "@/lib/recruiting/pipeline";

export const runtime = "nodejs";
export const maxDuration = 60;

const ROOT_FOLDER_ID =
  process.env.DRIVE_RECRUITING_ROOT_ID ||
  "1MjTJoOq24ojbhXcvEbKU_PMcuwLOVw1q";

function cronAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

function isGoogleDoc(mime: string | null | undefined) {
  return mime === "application/vnd.google-apps.document";
}

function isLegacyStyle(text: string): boolean {
  if (text.includes("\u2014")) return true; // em dash
  if (/\*\*[^*]+\*\*/.test(text)) return true; // bold markdown
  if (/Five lines to land|# Now[\s,]|What they are testing[\s\S]{0,40}\|/i.test(text)) {
    return true;
  }
  if (text.includes("|---") || text.includes("| ---")) return true;
  if (/Prep deck\s*[,—-]|# Hang Ten: Founding-team interview brief/i.test(text)) {
    return true;
  }
  return false;
}

async function listAllDocsUnder(parentId: string): Promise<
  { id: string; name: string; parents: string[]; mimeType: string }[]
> {
  const drive = getDriveClient();
  const out: { id: string; name: string; parents: string[]; mimeType: string }[] =
    [];
  const folders = [parentId];
  const seenFolders = new Set<string>();

  while (folders.length) {
    const folderId = folders.pop()!;
    if (seenFolders.has(folderId)) continue;
    seenFolders.add(folderId);

    let pageToken: string | undefined;
    do {
      const res = await drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields:
          "nextPageToken, files(id, name, mimeType, parents)",
        pageSize: 100,
        pageToken,
        supportsAllDrives: true,
        includeItemsFromAllDrives: true,
      });
      for (const f of res.data.files || []) {
        if (!f.id || !f.name || !f.mimeType) continue;
        if (f.mimeType === "application/vnd.google-apps.folder") {
          folders.push(f.id);
          continue;
        }
        if (!isGoogleDoc(f.mimeType)) continue;
        out.push({
          id: f.id,
          name: f.name,
          parents: f.parents || [folderId],
          mimeType: f.mimeType,
        });
      }
      pageToken = res.data.nextPageToken || undefined;
    } while (pageToken);
  }

  return out;
}

/**
 * Trash legacy prep Docs under the recruiting Drive root.
 * Keeps linked prepUrl docs if they are living-notes style; trashes duplicates / legacy styled docs.
 *
 * POST body: { dryRun?: boolean }
 */
export async function POST(req: NextRequest) {
  const cron = cronAuthorized(req);
  if (!cron) {
    const access = await requireRecruitingAccess();
    if (!access.ok) {
      return NextResponse.json({ error: access.reason }, { status: 403 });
    }
  }

  const body = (await req.json().catch(() => ({}))) as { dryRun?: boolean };
  const dryRun = body.dryRun !== false; // default dry-run safe

  const pipeline = getRecruitingPipeline();
  const keepIds = new Set<string>();
  for (const c of pipeline.companies) {
    const id = docIdFromUrl(c.drive?.prepUrl);
    if (id) keepIds.add(id);
  }

  const docs = await listAllDocsUnder(ROOT_FOLDER_ID);
  const drive = getDriveClient();

  const report: {
    id: string;
    name: string;
    action: "keep" | "trash" | "keep-linked" | "error";
    reason: string;
  }[] = [];

  for (const doc of docs) {
    try {
      const exported = await drive.files.export({
        fileId: doc.id,
        mimeType: "text/plain",
      });
      const text =
        typeof exported.data === "string"
          ? exported.data
          : String(exported.data || "");

      const legacy = isLegacyStyle(text);
      const linked = keepIds.has(doc.id);
      const living = /Living notes|Interview Notes and Prep|Action items/i.test(
        text
      );

      if (linked && !legacy) {
        report.push({
          id: doc.id,
          name: doc.name,
          action: "keep-linked",
          reason: "pipeline prepUrl, living-notes style",
        });
        continue;
      }

      if (linked && legacy) {
        // Keep the link target even if somehow still legacy (should have been overwritten)
        report.push({
          id: doc.id,
          name: doc.name,
          action: "keep-linked",
          reason: "pipeline prepUrl (linked, even if style imperfect)",
        });
        continue;
      }

      if (legacy) {
        if (!dryRun) {
          await drive.files.update({
            fileId: doc.id,
            requestBody: { trashed: true },
            supportsAllDrives: true,
          });
        }
        report.push({
          id: doc.id,
          name: doc.name,
          action: "trash",
          reason: "legacy style (em dash / bold / old deck)",
        });
        continue;
      }

      // Unlinked but clean living notes or other notes (decision journals, etc.)
      report.push({
        id: doc.id,
        name: doc.name,
        action: "keep",
        reason: living
          ? "living-notes or notes style, not pipeline-linked"
          : "no legacy markers",
      });
    } catch (err) {
      report.push({
        id: doc.id,
        name: doc.name,
        action: "error",
        reason: (err as Error).message,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    rootFolderId: ROOT_FOLDER_ID,
    dryRun,
    totalDocs: docs.length,
    trashCount: report.filter((r) => r.action === "trash").length,
    report,
  });
}
