import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function briefSlugFromPath(briefPath: string | null | undefined) {
  if (!briefPath) return null;
  const base = briefPath.split("/").pop() || "";
  return base.replace(/\.md$/i, "") || null;
}

export function readBriefMarkdown(briefPath: string | null | undefined) {
  const slug = briefSlugFromPath(briefPath);
  if (!slug) return null;
  const abs = join(process.cwd(), "data", "briefs", `${slug}.md`);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, "utf8");
}

export function briefHref(briefPath: string | null | undefined) {
  const slug = briefSlugFromPath(briefPath);
  return slug ? `/war-room/brief/${slug}` : null;
}
