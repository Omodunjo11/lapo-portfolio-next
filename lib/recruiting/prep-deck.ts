import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { Company, Pipeline, PipelineEvent } from "./types";
import {
  createPrepDoc,
  docIdFromUrl,
  folderIdFromUrl,
  listChildFolders,
  mapCompanyFolders,
  updatePrepDoc,
} from "./drive";
import type { IngestProposal } from "./gmail/classify";
import { extractNextInterviewer } from "./gmail/taxonomy";
import { generatePrepDeck, isRichBrief, stubPrepDeck } from "./prep-llm";

function briefsDir() {
  // Vercel serverless FS is read-only except /tmp.
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return join("/tmp", "recruiting-briefs");
  }
  return join(process.cwd(), "data", "briefs");
}

function localBriefText(briefPath?: string | null): string | null {
  if (!briefPath) return null;
  const slug = briefPath.split("/").pop()?.replace(/\.md$/i, "");
  if (!slug) return null;
  for (const dir of [briefsDir(), join(process.cwd(), "data", "briefs")]) {
    const abs = join(dir, `${slug}.md`);
    if (existsSync(abs)) return readFileSync(abs, "utf8");
  }
  return null;
}

function deckTitle(company: Company, event: PipelineEvent) {
  const day = event.start?.slice(0, 10) || "next";
  const who = event.with ? ` — ${event.with}` : "";
  return `Prep deck — ${company.name} — ${day}${who}`;
}

function briefSlug(company: Company, event: PipelineEvent) {
  const day = event.start?.slice(0, 10) || "next";
  return `${day}-${company.id}`;
}

/** Persist markdown under data/briefs (or /tmp on Vercel) and return repo-relative path. */
export function writeLocalBrief(
  company: Company,
  event: PipelineEvent,
  text: string,
  slugOverride?: string
): string {
  const slug = slugOverride || briefSlug(company, event);
  const dir = briefsDir();
  mkdirSync(dir, { recursive: true });
  const abs = join(dir, `${slug}.md`);
  writeFileSync(abs, text.endsWith("\n") ? text : `${text}\n`, "utf8");
  return `briefs/${slug}.md`;
}

/** Absolute path where a brief slug was last written (repo or /tmp). */
export function resolveBriefAbs(slug: string): string | null {
  for (const dir of [briefsDir(), join(process.cwd(), "data", "briefs")]) {
    const abs = join(dir, `${slug}.md`);
    if (existsSync(abs)) return abs;
  }
  return null;
}

async function persistPrepDoc(
  company: Company,
  event: PipelineEvent,
  text: string,
  opts: { overwriteDoc?: boolean }
): Promise<{ created: boolean; updated: boolean; error?: string }> {
  const folderId = folderIdFromUrl(company.drive?.folderUrl);
  if (!folderId) {
    return {
      created: false,
      updated: false,
      error: `no_folder ${company.id}: company folder not mapped yet under Drive root`,
    };
  }

  const existingId = docIdFromUrl(company.drive?.prepUrl);
  if (existingId && (opts.overwriteDoc || company.drive?.prepUrl)) {
    try {
      await updatePrepDoc({ docId: existingId, plainText: text });
      return { created: false, updated: true };
    } catch {
      // Fall through to create a fresh Doc and retarget prepUrl.
    }
  }

  if (company.drive?.prepUrl && !opts.overwriteDoc) {
    return { created: false, updated: false };
  }

  try {
    const doc = await createPrepDoc({
      folderId,
      title: deckTitle(company, event),
      plainText: text,
    });
    company.drive = {
      ...(company.drive || {}),
      folderUrl: company.drive?.folderUrl,
      prepUrl: doc.webViewLink,
      note:
        company.drive?.note ||
        "Prep deck created in company Drive folder (Claude when configured)",
    };
    return { created: true, updated: false };
  } catch (err) {
    return {
      created: false,
      updated: false,
      error: `prep_doc ${company.id}: ${(err as Error).message}`,
    };
  }
}

export type PrepEnsureResult = {
  pipeline: Pipeline;
  createdDocs: number;
  updatedDocs: number;
  mappedFolders: number;
  localBriefs: number;
  claudeDecks: number;
  errors: string[];
  /** Fresh markdown keyed by repo path `data/briefs/<slug>.md` for git commit. */
  briefFiles: Record<string, string>;
};

/**
 * Map Drive company folders, then for each scheduled event missing prep:
 * Claude (or stub) Now+Next brief + Google Doc in the company folder.
 */
export async function ensurePrepDecks(
  pipeline: Pipeline,
  opts: {
    onlyCompanyIds?: string[];
    force?: boolean;
    emailByCompany?: Record<string, string>;
  } = {}
): Promise<PrepEnsureResult> {
  const errors: string[] = [];
  let mappedFolders = 0;
  let createdDocs = 0;
  let updatedDocs = 0;
  let localBriefs = 0;
  let claudeDecks = 0;
  const briefFiles: Record<string, string> = {};

  let data: Pipeline = {
    ...pipeline,
    companies: pipeline.companies.map((c) => ({
      ...c,
      drive: { ...(c.drive || {}) },
    })),
    events: pipeline.events.map((e) => ({ ...e })),
  };

  try {
    const folders = await listChildFolders();
    const mapped = mapCompanyFolders(data, folders);
    data = mapped.pipeline;
    mappedFolders = mapped.mapped;
  } catch (err) {
    errors.push(`folder_map: ${(err as Error).message}`);
  }

  const scheduled = data.events.filter((e) => {
    if (e.status !== "scheduled" || !e.start) return false;
    if (opts.onlyCompanyIds && !opts.onlyCompanyIds.includes(e.companyId)) {
      return false;
    }
    return true;
  });

  for (const event of scheduled) {
    const company = data.companies.find((c) => c.id === event.companyId);
    if (!company) continue;

    const existingLocal = localBriefText(event.briefPath);
    const hasEmail = Boolean(opts.emailByCompany?.[company.id]);
    // Claude only when we have fresh email context (or force). Otherwise stub.
    const shouldClaude =
      opts.force ||
      (hasEmail && (!existingLocal || !isRichBrief(existingLocal)));

    let text = existingLocal || stubPrepDeck(company, event);
    if (shouldClaude) {
      const gen = await generatePrepDeck({
        company,
        event,
        emailContext: opts.emailByCompany?.[company.id] || null,
        existingBrief: existingLocal,
        force: opts.force,
      });
      text = gen.text;
      if (gen.source === "claude") claudeDecks += 1;
    }

    if (!event.briefPath || opts.force || shouldClaude || !existingLocal) {
      try {
        event.briefPath = writeLocalBrief(company, event, text);
        briefFiles[`data/${event.briefPath}`] = text.endsWith("\n")
          ? text
          : `${text}\n`;
        localBriefs += 1;
      } catch (err) {
        errors.push(`local_brief ${company.id}: ${(err as Error).message}`);
      }
    }

    const needsDoc =
      opts.force || !company.drive?.prepUrl || shouldClaude;
    if (!needsDoc) continue;

    const result = await persistPrepDoc(company, event, text, {
      overwriteDoc: Boolean(company.drive?.prepUrl) && shouldClaude,
    });
    if (result.error) errors.push(result.error);
    if (result.created) createdDocs += 1;
    if (result.updated) updatedDocs += 1;
  }

  if (
    createdDocs > 0 ||
    updatedDocs > 0 ||
    localBriefs > 0 ||
    mappedFolders > 0
  ) {
    data.updated = new Date().toISOString().slice(0, 10);
  }

  return {
    pipeline: data,
    createdDocs,
    updatedDocs,
    mappedFolders,
    localBriefs,
    claudeDecks,
    errors,
    briefFiles,
  };
}

/**
 * From advance emails (next steps / NDA / HM), write next-round Claude prep
 * even before a calendar invite exists.
 */
export async function ensureAdvancePrepDecks(
  pipeline: Pipeline,
  advances: IngestProposal[],
  opts: { limit?: number } = {}
): Promise<PrepEnsureResult> {
  const limit = opts.limit ?? 2;
  const errors: string[] = [];
  let createdDocs = 0;
  let updatedDocs = 0;
  let localBriefs = 0;
  let claudeDecks = 0;
  let mappedFolders = 0;
  const briefFiles: Record<string, string> = {};

  let data: Pipeline = {
    ...pipeline,
    companies: pipeline.companies.map((c) => ({
      ...c,
      drive: { ...(c.drive || {}) },
      contacts: c.contacts ? c.contacts.map((x) => ({ ...x })) : c.contacts,
    })),
    events: pipeline.events.map((e) => ({ ...e })),
  };

  try {
    const folders = await listChildFolders();
    const mapped = mapCompanyFolders(data, folders);
    data = mapped.pipeline;
    mappedFolders = mapped.mapped;
  } catch (err) {
    errors.push(`folder_map: ${(err as Error).message}`);
  }

  const seen = new Set<string>();
  const work = advances
    .filter((p) => p.signal === "advance" && p.companyId && p.source === "gmail")
    .slice(0, limit * 2);

  for (const p of work) {
    if (!p.companyId || seen.has(p.companyId)) continue;
    if (seen.size >= limit) break;
    seen.add(p.companyId);

    const company = data.companies.find((c) => c.id === p.companyId);
    if (!company) continue;

    const blob = `${p.subject || ""}\n${p.snippet || ""}`;
    const who = extractNextInterviewer(blob) || undefined;
    if (who) {
      const contacts = company.contacts || [];
      if (!contacts.some((c) => c.name.toLowerCase() === who.toLowerCase())) {
        company.contacts = [...contacts, { name: who, role: "Next interviewer" }];
      }
    }

    const day = new Date().toISOString().slice(0, 10);
    const event: PipelineEvent = {
      id: `prep-next-${company.id}-${day}`,
      companyId: company.id,
      start: `${day}T12:00:00-04:00`,
      end: `${day}T12:45:00-04:00`,
      title: who
        ? `Next: ${who} @ ${company.name}`
        : `Next interview — ${company.name}`,
      with: who || "",
      type: "other",
      status: "unscheduled",
      briefPath: null,
      blocker: p.subject || p.reason,
    };

    const slug = `next-${company.id}`;
    const existingPath = `briefs/${slug}.md`;
    const legacyNext = join(
      process.cwd(),
      "data",
      "briefs",
      `next-${company.id}-sahil.md`
    );
    const existingLocal =
      localBriefText(existingPath) ||
      (existsSync(legacyNext) ? readFileSync(legacyNext, "utf8") : null) ||
      localBriefText(
        data.events.find(
          (e) => e.companyId === company.id && e.status === "scheduled"
        )?.briefPath
      );

    // Force Claude when we have a fresh advance signal and only a stub/old brief.
    // NDA / process mail without a named interviewer still regenerates if no next-* brief.
    const force =
      !existingLocal ||
      !isRichBrief(existingLocal) ||
      (who
        ? !new RegExp(who.split(/\s+/)[0] || "NOPE", "i").test(
            existingLocal || ""
          )
        : !localBriefText(existingPath));

    const gen = await generatePrepDeck({
      company,
      event,
      emailContext: `Subject: ${p.subject || ""}\nFrom: ${p.from || ""}\n\n${p.snippet || ""}`,
      existingBrief: existingLocal,
      force,
    });
    if (gen.source === "claude") claudeDecks += 1;

    try {
      event.briefPath = writeLocalBrief(company, event, gen.text, slug);
      briefFiles[`data/briefs/${slug}.md`] = gen.text.endsWith("\n")
        ? gen.text
        : `${gen.text}\n`;
      localBriefs += 1;
    } catch (err) {
      errors.push(`advance_brief ${company.id}: ${(err as Error).message}`);
      continue;
    }

    // Prefer linking upcoming scheduled event to this next brief when present.
    const upcoming = data.events.find(
      (e) => e.companyId === company.id && e.status === "scheduled"
    );
    if (upcoming && (!upcoming.briefPath || force)) {
      upcoming.briefPath = event.briefPath;
      if (who) upcoming.with = upcoming.with || who;
    } else if (
      !data.events.some((e) => e.id === event.id) &&
      !upcoming
    ) {
      data.events.push(event);
    }

    const result = await persistPrepDoc(company, event, gen.text, {
      overwriteDoc: Boolean(company.drive?.prepUrl),
    });
    if (result.error) errors.push(result.error);
    if (result.created) createdDocs += 1;
    if (result.updated) updatedDocs += 1;
  }

  if (
    createdDocs > 0 ||
    updatedDocs > 0 ||
    localBriefs > 0 ||
    mappedFolders > 0
  ) {
    data.updated = new Date().toISOString().slice(0, 10);
  }

  return {
    pipeline: data,
    createdDocs,
    updatedDocs,
    mappedFolders,
    localBriefs,
    claudeDecks,
    errors,
    briefFiles,
  };
}
