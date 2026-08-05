/**
 * One-shot: delete legacy prep style, regenerate living-notes briefs for all
 * active companies, overwrite Drive prep docs when mapped.
 *
 * Usage:
 *   npx tsx --env-file=.env.production.local scripts/regen-living-notes-prep.ts
 */
import { writeFileSync, unlinkSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getRecruitingPipeline } from "../lib/recruiting/pipeline";
import {
  generatePrepDeck,
  looksLikeLegacyPrepDeck,
} from "../lib/recruiting/prep-llm";
import {
  createPrepDoc,
  docIdFromUrl,
  folderIdFromUrl,
  listChildFolders,
  mapCompanyFolders,
  updatePrepDoc,
} from "../lib/recruiting/drive";
import type { Company, PipelineEvent } from "../lib/recruiting/types";

const ROOT = process.cwd();
const BRIEFS = join(ROOT, "data", "briefs");
const PIPELINE_PATH = join(ROOT, "data", "recruiting-pipeline.json");

const SKIP = new Set(["semgrep"]);

function wipeBriefs() {
  if (!existsSync(BRIEFS)) return [];
  const removed: string[] = [];
  for (const name of readdirSync(BRIEFS)) {
    if (!name.endsWith(".md")) continue;
    unlinkSync(join(BRIEFS, name));
    removed.push(name);
  }
  return removed;
}

function pickEvent(company: Company, events: PipelineEvent[]): PipelineEvent {
  const mine = events.filter((e) => e.companyId === company.id);
  const now = Date.now();
  const upcoming = mine
    .filter((e) => e.status === "scheduled" && e.start && Date.parse(e.start) >= now - 86_400_000)
    .sort((a, b) => Date.parse(a.start!) - Date.parse(b.start!));
  if (upcoming[0]) return upcoming[0];

  const scheduled = mine
    .filter((e) => e.status === "scheduled" && e.start)
    .sort((a, b) => Date.parse(b.start!) - Date.parse(a.start!));
  if (scheduled[0]) return scheduled[0];

  const open = mine
    .filter((e) => e.status === "unscheduled")
    .sort((a, b) => (b.start || "").localeCompare(a.start || ""));
  if (open[0]) return open[0];

  const day = new Date().toISOString().slice(0, 10);
  return {
    id: `prep-regen-${company.id}-${day}`,
    companyId: company.id,
    start: `${day}T12:00:00-04:00`,
    end: `${day}T12:45:00-04:00`,
    title: `Next interview: ${company.name}`,
    with: "",
    type: "other",
    status: "unscheduled",
    briefPath: null,
    blocker: "regen living-notes",
  };
}

async function overwriteDrive(company: Company, event: PipelineEvent, text: string) {
  const folderId = folderIdFromUrl(company.drive?.folderUrl);
  if (!folderId) return { ok: false as const, error: "no_folder" };

  const existingId = docIdFromUrl(company.drive?.prepUrl);
  if (existingId) {
    try {
      await updatePrepDoc({ docId: existingId, plainText: text });
      return { ok: true as const, action: "updated" as const };
    } catch (err) {
      // fall through
      console.warn(`update failed ${company.id}:`, (err as Error).message);
    }
  }

  try {
    const day = event.start?.slice(0, 10) || "next";
    const who = event.with ? ` (${event.with})` : "";
    const doc = await createPrepDoc({
      folderId,
      title: `Interview notes: ${company.name} ${day}${who}`,
      plainText: text,
    });
    company.drive = {
      ...(company.drive || {}),
      folderUrl: company.drive?.folderUrl,
      prepUrl: doc.webViewLink,
      note: "Living-notes prep regenerated",
    };
    return { ok: true as const, action: "created" as const };
  } catch (err) {
    return { ok: false as const, error: (err as Error).message };
  }
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY?.trim()) {
    throw new Error("ANTHROPIC_API_KEY missing. Use --env-file=.env.production.local");
  }

  const removed = wipeBriefs();
  console.log("Removed briefs:", removed.join(", ") || "(none)");

  let pipeline = getRecruitingPipeline();
  try {
    const folders = await listChildFolders();
    const mapped = mapCompanyFolders(pipeline, folders);
    pipeline = mapped.pipeline;
    console.log("Mapped folders:", mapped.mapped);
  } catch (err) {
    console.warn("Drive folder map skipped:", (err as Error).message);
  }

  const active = pipeline.companies.filter((c) => !SKIP.has(c.id));
  const briefFiles: Record<string, string> = {};

  for (const company of active) {
    const event = pickEvent(company, pipeline.events);
    // Keep event titles plain.
    event.title = event.title
      .replace(/\u2014/g, ":")
      .replace(/\u2013/g, "-");

    console.log(`\n=== ${company.name} (${company.stageLabel || company.stage}) ===`);
    console.log(`Event: ${event.title} | with=${event.with || "TBD"}`);

    const gen = await generatePrepDeck({
      company,
      event,
      emailContext: null,
      existingBrief: null,
      force: true,
    });
    console.log(`Source: ${gen.source}, chars: ${gen.text.length}, legacy?: ${looksLikeLegacyPrepDeck(gen.text)}`);

    const nextSlug = `next-${company.id}`;
    const nextAbs = join(BRIEFS, `${nextSlug}.md`);
    writeFileSync(nextAbs, gen.text.endsWith("\n") ? gen.text : `${gen.text}\n`);
    briefFiles[`data/briefs/${nextSlug}.md`] = gen.text;

    let briefPath = `briefs/${nextSlug}.md`;
    if (event.start && event.status === "scheduled") {
      const day = event.start.slice(0, 10);
      const datedSlug = `${day}-${company.id}`;
      writeFileSync(
        join(BRIEFS, `${datedSlug}.md`),
        gen.text.endsWith("\n") ? gen.text : `${gen.text}\n`
      );
      briefFiles[`data/briefs/${datedSlug}.md`] = gen.text;
      briefPath = `briefs/${datedSlug}.md`;
    }

    // Point matching pipeline events at the new brief.
    for (const e of pipeline.events) {
      if (e.companyId !== company.id) continue;
      if (e.id === event.id || e.status === "scheduled" || e.status === "unscheduled") {
        e.briefPath = briefPath.startsWith("briefs/")
          ? briefPath
          : `briefs/${nextSlug}.md`;
        // Prefer next-* for unscheduled placeholders.
        if (e.status === "unscheduled") e.briefPath = `briefs/${nextSlug}.md`;
      }
    }

    const drive = await overwriteDrive(company, event, gen.text);
    console.log("Drive:", drive);

    // Small pause to stay kind to the API.
    await new Promise((r) => setTimeout(r, 400));
  }

  pipeline.updated = new Date().toISOString().slice(0, 10);
  writeFileSync(PIPELINE_PATH, `${JSON.stringify(pipeline, null, 2)}\n`);
  console.log("\nWrote pipeline +", Object.keys(briefFiles).length, "brief files");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
