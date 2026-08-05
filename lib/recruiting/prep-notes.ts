import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function notesDir() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return join("/tmp", "recruiting-prep-notes");
  }
  return join(process.cwd(), "data", "prep-notes");
}

function repoNotesPath(companyId: string) {
  return join(process.cwd(), "data", "prep-notes", `${companyId}.md`);
}

export function prepNotesRepoPath(companyId: string) {
  return `data/prep-notes/${companyId}.md`;
}

function stampEt() {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Load Lapo's accumulated next-round notes for a company (tmp, then repo). */
export function loadPrepNotes(companyId: string): string {
  const tmp = join(notesDir(), `${companyId}.md`);
  if (existsSync(tmp)) return readFileSync(tmp, "utf8");
  const repo = repoNotesPath(companyId);
  if (existsSync(repo)) return readFileSync(repo, "utf8");
  return "";
}

/** Overwrite full notes file (rare). Prefer appendPrepNotes. */
export function writePrepNotesLocal(companyId: string, text: string): string {
  const clean = text.replace(/\r\n/g, "\n").trimEnd();
  const body = clean ? `${clean}\n` : "";
  const dir = notesDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${companyId}.md`), body, "utf8");
  if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    mkdirSync(join(process.cwd(), "data", "prep-notes"), { recursive: true });
    writeFileSync(repoNotesPath(companyId), body, "utf8");
  }
  return body;
}

/**
 * Append a dated feedback entry. Never deletes prior feedback.
 * Newest entry is always on top.
 */
export function appendPrepNotes(companyId: string, newText: string): string {
  const incoming = newText.replace(/\r\n/g, "\n").trim();
  if (!incoming) return loadPrepNotes(companyId);

  const prior = loadPrepNotes(companyId).trim();
  // If the user pasted the whole prior log back in, don't double-append.
  if (prior && incoming === prior) return writePrepNotesLocal(companyId, prior);
  if (prior && prior.includes(incoming) && incoming.length > 80) {
    return writePrepNotesLocal(companyId, prior);
  }

  const entry = `## Feedback added ${stampEt()} ET\n\n${incoming}\n`;
  const body = prior ? `${entry}\n${prior}\n` : `${entry}\n`;
  return writePrepNotesLocal(companyId, body);
}
