import type { Company, FunnelStage, Pipeline } from "./types";
import { ARCHIVE_STAGES } from "./types";
import { readJsonFileFromGitHub } from "../git-store";
import pipeline from "../../data/recruiting-pipeline.json";

export const FUNNEL_COLUMNS = [
  { id: "applied", label: "Applied" },
  { id: "first", label: "1st" },
  { id: "second", label: "2nd" },
  { id: "third", label: "3rd" },
  { id: "fourth", label: "4th" },
  { id: "final", label: "Final" },
] as const;

/** Bundled snapshot for rendering. Always clone — JSON import is read-only. */
export function getRecruitingPipeline(): Pipeline {
  return structuredClone(pipeline) as Pipeline;
}

/**
 * Latest pipeline for writes. Prefer GitHub `main` so Accept/Edit aren't
 * stomped by scans that still have a stale deploy bundle in memory.
 */
export async function loadWritablePipeline(): Promise<Pipeline> {
  try {
    const remote = await readJsonFileFromGitHub<Pipeline>(
      "data/recruiting-pipeline.json"
    );
    if (remote?.data?.companies?.length) {
      return structuredClone(remote.data);
    }
  } catch {
    // fall through to bundle
  }
  return getRecruitingPipeline();
}

export function companiesByStage(data: Pipeline) {
  const map: Record<string, Pipeline["companies"]> = {};
  for (const col of FUNNEL_COLUMNS) map[col.id] = [];
  for (const c of data.companies) {
    if (map[c.stage]) map[c.stage].push(c);
    else if (c.stage === "offered") {
      map.final.push(c);
    }
  }
  return map;
}

export function archivedCompanies(data: Pipeline): Company[] {
  return data.companies.filter((c) =>
    (ARCHIVE_STAGES as readonly string[]).includes(c.stage)
  );
}

export function activeCompanies(data: Pipeline): Company[] {
  return data.companies.filter(
    (c) => !(ARCHIVE_STAGES as readonly string[]).includes(c.stage)
  );
}


/** Drop chase + open calendar rows when a company is passed/ghosted. */
export function applyArchiveHygiene(
  data: Pipeline,
  companyId: string,
  stage: FunnelStage
): void {
  if (!(ARCHIVE_STAGES as readonly string[]).includes(stage)) return;

  data.chase = (data.chase || []).filter((c) => c.companyId !== companyId);

  for (const e of data.events) {
    if (e.companyId !== companyId) continue;
    if (e.status === "scheduled" || e.status === "unscheduled") {
      e.status = "canceled";
    }
  }

  const company = data.companies.find((c) => c.id === companyId);
  if (company) {
    company.nudgeDate = null;
    if (
      !company.nextAction ||
      /attend|nudge|check-in|chase/i.test(company.nextAction)
    ) {
      company.nextAction =
        stage === "passed" ? "Passed - no further chase" : "Ghosted - parked";
    }
  }
}

/** Companies whose `due` or `nudgeDate` is today or earlier, among active companies only. */
export function attentionToday(data: Pipeline, todayISO: string): Company[] {
  return activeCompanies(data).filter((c) => {
    const dueFlag = c.due && c.due <= todayISO;
    const nudgeFlag = c.nudgeDate && c.nudgeDate <= todayISO;
    return Boolean(dueFlag || nudgeFlag);
  });
}
