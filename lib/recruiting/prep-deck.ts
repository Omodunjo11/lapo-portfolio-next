import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import type { Company, Pipeline, PipelineEvent } from "./types";
import {
  createPrepDoc,
  folderIdFromUrl,
  listChildFolders,
  mapCompanyFolders,
} from "./drive";

function localBriefText(briefPath?: string | null): string | null {
  if (!briefPath) return null;
  const slug = briefPath.split("/").pop()?.replace(/\.md$/i, "");
  if (!slug) return null;
  const abs = join(process.cwd(), "data", "briefs", `${slug}.md`);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, "utf8");
}

function stubDeck(company: Company, event: PipelineEvent): string {
  const when = event.start
    ? new Date(event.start).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
      })
    : "TBD";

  return `# ${company.name} — prep deck

When: ${when} ET
With: ${event.with || "TBD"}
Role: ${company.role}
Stage: ${company.stageLabel || company.stage}
Title: ${event.title}

---

# Now — this interview

## Goal for this call
- Confirm fit for ${company.role}
- Leave with next step + who you meet next

## 5 talking points
1. Why ${company.name} specifically (not generic AI interest)
2. Forward-deployed / shipping ownership proof
3. Trust, eval, and production quality bar
4. Ambiguity comfort — incomplete info → decision → motion
5. What "good" looks like in the first 90 days

## Opening (~20s)
Draft a tight opener tied to ${company.name}'s product and your closest proof.

## Stories to have ready
- Kinage scale / playbooks / cost-to-serve
- Bank trust / precision / eval
- Judgment under pressure (TD pushback)
- Incomplete-info story

## Likely topics
- Role shape and success metrics
- Enterprise vs product tension (if relevant)
- Loop / timeline / competing process

## 3 questions to ask
1. What are you hiring this seat to own in the next 90 days?
2. What's the biggest failure mode on the team right now?
3. If this goes well, who else would I meet and what are those conversations testing?

## Don't
- Don't wing the loop question
- Don't overclaim domain depth you don't have
- Don't leave without a clear next owner + timing

---

# Next — loop & future rounds

## Loop map
- Past rounds: (fill after debrief)
- This round: ${event.title}${event.with ? ` with ${event.with}` : ""}
- Likely next: TBD — ask on this call
- Still unknown: interviewer ladder, timeline, role leveling

## Prep bank for later rounds
- Deepen one managed/coached technical delivery story
- Research whoever they name next (same day)
- Confirm format for the following round

## After the call
1. Debrief in War Room
2. Update this doc's Loop map
3. Stub next-round prep the same day if a name is known
`;
}

function deckTitle(company: Company, event: PipelineEvent) {
  const day = event.start?.slice(0, 10) || "soon";
  const who = event.with ? ` — ${event.with}` : "";
  return `Prep deck — ${company.name} — ${day}${who}`;
}

function briefSlug(company: Company, event: PipelineEvent) {
  const day = event.start?.slice(0, 10) || "next";
  return `${day}-${company.id}`;
}

/** Persist markdown under data/briefs and return repo-relative path. */
export function writeLocalBrief(
  company: Company,
  event: PipelineEvent,
  text: string
): string {
  const slug = briefSlug(company, event);
  const dir = join(process.cwd(), "data", "briefs");
  mkdirSync(dir, { recursive: true });
  const abs = join(dir, `${slug}.md`);
  writeFileSync(abs, text.endsWith("\n") ? text : `${text}\n`, "utf8");
  return `briefs/${slug}.md`;
}

export type PrepEnsureResult = {
  pipeline: Pipeline;
  createdDocs: number;
  mappedFolders: number;
  localBriefs: number;
  errors: string[];
};

/**
 * Map Drive company folders, then for each scheduled event missing prep:
 * write local Now+Next brief + create Google Doc in the company folder.
 */
export async function ensurePrepDecks(
  pipeline: Pipeline,
  opts: { onlyCompanyIds?: string[]; force?: boolean } = {}
): Promise<PrepEnsureResult> {
  const errors: string[] = [];
  let mappedFolders = 0;
  let createdDocs = 0;
  let localBriefs = 0;

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
    const text =
      existingLocal && !opts.force
        ? existingLocal
        : stubDeck(company, event);

    // Always ensure a local brief path for War Room.
    if (!event.briefPath || opts.force) {
      try {
        event.briefPath = writeLocalBrief(company, event, text);
        localBriefs += 1;
      } catch (err) {
        errors.push(`local_brief ${company.id}: ${(err as Error).message}`);
      }
    }

    const folderId = folderIdFromUrl(company.drive?.folderUrl);
    const needsDoc = opts.force || !company.drive?.prepUrl;
    if (!folderId) {
      if (needsDoc) {
        errors.push(
          `no_folder ${company.id}: company folder not mapped yet under Drive root`
        );
      }
      continue;
    }
    if (!needsDoc) continue;

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
        note: company.drive?.note || "Prep deck created in company Drive folder",
      };
      createdDocs += 1;
    } catch (err) {
      errors.push(`prep_doc ${company.id}: ${(err as Error).message}`);
    }
  }

  if (createdDocs > 0 || localBriefs > 0 || mappedFolders > 0) {
    data.updated = new Date().toISOString().slice(0, 10);
  }

  return {
    pipeline: data,
    createdDocs,
    mappedFolders,
    localBriefs,
    errors,
  };
}
