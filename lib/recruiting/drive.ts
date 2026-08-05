import { google, type drive_v3 } from "googleapis";
import { getGoogleAuth } from "./gmail/client";
import type { Company, Pipeline } from "./types";

const ROOT_FOLDER_ID =
  process.env.DRIVE_RECRUITING_ROOT_ID ||
  "1MjTJoOq24ojbhXcvEbKU_PMcuwLOVw1q";

export function getDriveClient() {
  const auth = getGoogleAuth();
  return google.drive({ version: "v3", auth });
}

function folderUrl(id: string) {
  return `https://drive.google.com/drive/folders/${id}`;
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function scoreFolder(company: Company, folderName: string): number {
  const folder = normalize(folderName);
  if (!folder) return 0;
  const candidates = [
    company.name,
    company.paths?.folder,
    ...(company.aliases || []),
  ].filter(Boolean) as string[];

  let best = 0;
  for (const raw of candidates) {
    const c = normalize(raw);
    if (!c) continue;
    if (folder === c) best = Math.max(best, 100);
    else if (folder.includes(c) || c.includes(folder)) best = Math.max(best, 80);
    else {
      const words = c.split(" ").filter((w) => w.length > 2);
      const hits = words.filter((w) => folder.includes(w)).length;
      if (hits > 0) best = Math.max(best, 40 + hits * 10);
    }
  }
  return best;
}

export async function listChildFolders(
  parentId: string = ROOT_FOLDER_ID
): Promise<{ id: string; name: string; webViewLink: string }[]> {
  const drive = getDriveClient();
  const out: { id: string; name: string; webViewLink: string }[] = [];
  let pageToken: string | undefined;

  do {
    const res = await drive.files.list({
      q: `'${parentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "nextPageToken, files(id, name, webViewLink)",
      pageSize: 100,
      pageToken,
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    for (const f of res.data.files || []) {
      if (!f.id || !f.name) continue;
      out.push({
        id: f.id,
        name: f.name,
        webViewLink: f.webViewLink || folderUrl(f.id),
      });
    }
    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return out;
}

/** Map each company to best-matching Drive child folder; mutate copy of pipeline. */
export function mapCompanyFolders(
  pipeline: Pipeline,
  folders: { id: string; name: string; webViewLink: string }[]
): { pipeline: Pipeline; mapped: number } {
  const data: Pipeline = {
    ...pipeline,
    companies: pipeline.companies.map((c) => ({
      ...c,
      drive: { ...(c.drive || {}) },
    })),
  };
  let mapped = 0;

  for (const company of data.companies) {
    let best: { score: number; folder: (typeof folders)[0] } | null = null;
    for (const folder of folders) {
      const score = scoreFolder(company, folder.name);
      if (score < 60) continue;
      if (!best || score > best.score) best = { score, folder };
    }
    if (!best) continue;
    company.drive = {
      ...(company.drive || {}),
      folderUrl: best.folder.webViewLink,
      note: `Mapped to Drive folder “${best.folder.name}”`,
    };
    mapped += 1;
  }

  data.driveRootUrl = data.driveRootUrl || folderUrl(ROOT_FOLDER_ID);
  data.driveRootNote =
    "Company folders auto-mapped from Recruiting Season Drive root on scan.";
  return { pipeline: data, mapped };
}

export function folderIdFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const m = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  return m?.[1] || null;
}

export function docIdFromUrl(url?: string | null): string | null {
  if (!url) return null;
  const m = url.match(/\/document\/d\/([a-zA-Z0-9_-]+)/);
  return m?.[1] || null;
}

/** Turn living-notes Markdown into HTML Google Docs will format as real headings. */
export function markdownToDriveHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const parts: string[] = [
    "<html><body style=\"font-family:Arial,sans-serif;font-size:11pt;line-height:1.45;color:#222\">",
  ];

  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      parts.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      parts.push("</ol>");
      inOl = false;
    }
  };

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      closeLists();
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeLists();
      parts.push("<hr>");
      continue;
    }

    const h1 = trimmed.match(/^#\s+(.+)$/);
    if (h1) {
      closeLists();
      parts.push(
        `<h1 style="font-size:18pt;margin:0 0 8px">${esc(h1[1])}</h1>`
      );
      continue;
    }
    const h2 = trimmed.match(/^##\s+(.+)$/);
    if (h2) {
      closeLists();
      parts.push(
        `<h2 style="font-size:13pt;margin:18px 0 6px">${esc(h2[1])}</h2>`
      );
      continue;
    }
    const h3 = trimmed.match(/^###\s+(.+)$/);
    if (h3) {
      closeLists();
      parts.push(
        `<h3 style="font-size:11pt;margin:12px 0 4px">${esc(h3[1])}</h3>`
      );
      continue;
    }

    const ul = trimmed.match(/^[-*]\s+(.+)$/);
    if (ul) {
      if (inOl) {
        parts.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        parts.push("<ul style=\"margin:4px 0 8px 18px\">");
        inUl = true;
      }
      parts.push(`<li style="margin:2px 0">${esc(ul[1])}</li>`);
      continue;
    }

    const ol = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      if (inUl) {
        parts.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        parts.push("<ol style=\"margin:4px 0 8px 18px\">");
        inOl = true;
      }
      parts.push(`<li style="margin:2px 0">${esc(ol[1])}</li>`);
      continue;
    }

    closeLists();
    // Quoted interview line
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("“") && trimmed.endsWith("”"))
    ) {
      parts.push(
        `<p style="margin:8px 0;font-style:italic">${esc(trimmed)}</p>`
      );
      continue;
    }
    parts.push(`<p style="margin:6px 0">${esc(trimmed)}</p>`);
  }

  closeLists();
  parts.push("</body></html>");
  return parts.join("\n");
}

/** Create a Google Doc in a folder from living-notes Markdown (HTML conversion). */
export async function createPrepDoc(opts: {
  folderId: string;
  title: string;
  plainText: string;
}): Promise<{ id: string; webViewLink: string }> {
  const drive = getDriveClient();
  const created = await drive.files.create({
    requestBody: {
      name: opts.title,
      mimeType: "application/vnd.google-apps.document",
      parents: [opts.folderId],
    },
    media: {
      mimeType: "text/html",
      body: markdownToDriveHtml(opts.plainText),
    },
    fields: "id, webViewLink",
    supportsAllDrives: true,
  });

  const id = created.data.id;
  if (!id) throw new Error("Drive create returned no file id");

  const webViewLink =
    created.data.webViewLink ||
    `https://docs.google.com/document/d/${id}/edit`;

  return { id, webViewLink };
}

/**
 * Replace Google Doc body in place (keeps the same link / prepUrl).
 * Uploads HTML so headings become real Doc styles, not literal "##".
 */
export async function updatePrepDoc(opts: {
  docId: string;
  plainText: string;
}): Promise<void> {
  const drive = getDriveClient();
  await drive.files.update({
    fileId: opts.docId,
    media: {
      mimeType: "text/html",
      body: markdownToDriveHtml(opts.plainText),
    },
    supportsAllDrives: true,
  });
}

export type DriveFile = drive_v3.Schema$File;
