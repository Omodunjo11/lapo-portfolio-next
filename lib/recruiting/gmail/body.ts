/** Decode Gmail's URL-safe base64 payload data. */
function decodeBase64Url(data: string): string {
  const normalized = data.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(normalized + pad, "base64").toString("utf8");
}

type MessagePart = {
  mimeType?: string | null;
  filename?: string | null;
  body?: { data?: string | null; size?: number | null } | null;
  parts?: MessagePart[] | null;
};

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function collectParts(
  part: MessagePart | null | undefined,
  out: { plain: string[]; html: string[] }
) {
  if (!part) return;
  const mime = (part.mimeType || "").toLowerCase();
  const data = part.body?.data;
  if (data && !part.filename) {
    const decoded = decodeBase64Url(data);
    if (mime === "text/plain") out.plain.push(decoded);
    else if (mime === "text/html") out.html.push(decoded);
    else if (!mime.startsWith("multipart/") && !mime.includes("image")) {
      // Some clients send bare text without a clear mime.
      if (!/<[a-z][\s\S]*>/i.test(decoded)) out.plain.push(decoded);
      else out.html.push(decoded);
    }
  }
  for (const child of part.parts || []) collectParts(child, out);
}

/**
 * Plain-text body for classification. Prefer text/plain; fall back to stripped HTML.
 * Caps length so long threads / signatures don't blow classifiers or JSON payload size.
 */
export function extractGmailBody(
  payload: MessagePart | null | undefined,
  maxChars = 12000
): string {
  const out = { plain: [] as string[], html: [] as string[] };
  collectParts(payload, out);
  const plain = out.plain.join("\n").trim();
  const html = out.html.length ? stripHtml(out.html.join("\n")) : "";
  const text = (plain || html).trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars);
}
