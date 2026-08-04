import type { Company, FunnelStage, Pipeline, PipelineEvent } from "./types";

export type Suggestion = {
  id: string;
  companyId: string;
  fromStage: FunnelStage;
  toStage: FunnelStage;
  reason: string;
  status: "pending" | "accepted" | "dismissed";
};

export type BoardPrefs = {
  dismissedSuggestionIds: string[];
};

export const EMPTY_BOARD_PREFS: BoardPrefs = {
  dismissedSuggestionIds: [],
};

const FUNNEL_ORDER: FunnelStage[] = [
  "applied",
  "first",
  "second",
  "third",
  "fourth",
  "final",
];

export function nextFunnelStage(stage: FunnelStage): FunnelStage | null {
  const i = FUNNEL_ORDER.indexOf(stage);
  if (i < 0 || i >= FUNNEL_ORDER.length - 1) return null;
  return FUNNEL_ORDER[i + 1];
}

export function prevFunnelStage(stage: FunnelStage): FunnelStage | null {
  const i = FUNNEL_ORDER.indexOf(stage);
  if (i <= 0) return null;
  return FUNNEL_ORDER[i - 1];
}

/**
 * Flag-only suggestions. Never auto-move — Lapo accepts or dismisses.
 */
export function buildSuggestions(
  pipeline: Pipeline,
  dismissedIds: string[] = []
): Suggestion[] {
  const dismissed = new Set(dismissedIds);
  const out: Suggestion[] = [];

  const doneByCompany = new Map<string, PipelineEvent[]>();
  const scheduledByCompany = new Map<string, PipelineEvent[]>();
  for (const e of pipeline.events) {
    if (e.status !== "done" && e.status !== "scheduled") continue;
    const map = e.status === "done" ? doneByCompany : scheduledByCompany;
    const list = map.get(e.companyId) || [];
    list.push(e);
    map.set(e.companyId, list);
  }

  for (const c of pipeline.companies) {
    if (c.stage === "passed" || c.stage === "ghosted" || c.stage === "offered") {
      continue;
    }

    const done = doneByCompany.get(c.id) || [];
    const scheduled = scheduledByCompany.get(c.id) || [];
    const hasDoneScreen = done.some(
      (e) => e.type === "recruiter" || e.type === "phone" || e.type === "founding"
    );
    const hasDoneHm = done.some((e) => e.type === "hm");
    const hasUpcoming = scheduled.length > 0;

    if (c.stage === "first" && hasDoneScreen && !hasUpcoming) {
      const id = `${c.id}-to-second-after-screen`;
      if (!dismissed.has(id)) {
        out.push({
          id,
          companyId: c.id,
          fromStage: "first",
          toStage: "second",
          reason:
            "1st screen appears done and nothing new is scheduled — advance when you want.",
          status: "pending",
        });
      }
    }

    if ((c.stage === "first" || c.stage === "second") && hasDoneHm) {
      const id = `${c.id}-to-third-after-hm`;
      if (!dismissed.has(id)) {
        out.push({
          id,
          companyId: c.id,
          fromStage: c.stage,
          toStage: "third",
          reason:
            "Hiring-manager interview logged as done — flag for next round when you're ready.",
          status: "pending",
        });
      }
    }

    if (c.stage === "applied" && hasUpcoming) {
      const id = `${c.id}-to-first-scheduled`;
      if (!dismissed.has(id)) {
        out.push({
          id,
          companyId: c.id,
          fromStage: "applied",
          toStage: "first",
          reason: "Interview is on the calendar — move to 1st when you confirm.",
          status: "pending",
        });
      }
    }
  }

  return out;
}

export function companiesByStageMerged(companies: Company[]) {
  const map: Record<string, Company[]> = {
    applied: [],
    first: [],
    second: [],
    third: [],
    fourth: [],
    final: [],
  };
  for (const c of companies) {
    if (c.stage === "offered") map.final.push(c);
    else if (map[c.stage]) map[c.stage].push(c);
  }
  return map;
}
