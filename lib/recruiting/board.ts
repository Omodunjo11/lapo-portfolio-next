import type { Company, FunnelStage, Pipeline, PipelineEvent } from "./types";

export type Suggestion = {
  id: string;
  companyId: string;
  fromStage: FunnelStage;
  toStage: FunnelStage;
  reason: string;
  status: "pending" | "accepted" | "dismissed";
  /** Inbox suppress key (thread + company + toStage). */
  key?: string;
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
 * Flag-only suggestions from calendar/events. Kept minimal — inbox Scan owns
 * real progression. These only cover Applied→1st when an interview lands on
 * the calendar (not “bump every done screen”).
 */
export function buildSuggestions(
  pipeline: Pipeline,
  dismissedIds: string[] = []
): Suggestion[] {
  const dismissed = new Set(dismissedIds);
  const out: Suggestion[] = [];

  const scheduledByCompany = new Map<string, PipelineEvent[]>();
  for (const e of pipeline.events) {
    if (e.status !== "scheduled") continue;
    const list = scheduledByCompany.get(e.companyId) || [];
    list.push(e);
    scheduledByCompany.set(e.companyId, list);
  }

  for (const c of pipeline.companies) {
    if (c.stage === "passed" || c.stage === "ghosted" || c.stage === "offered") {
      continue;
    }

    const scheduled = scheduledByCompany.get(c.id) || [];
    const hasUpcoming = scheduled.length > 0;

    if (c.stage === "applied" && hasUpcoming) {
      const id = `${c.id}-to-first-scheduled`;
      if (!dismissed.has(id)) {
        out.push({
          id,
          companyId: c.id,
          fromStage: "applied",
          toStage: "first",
          reason: "Interview is on the calendar. Move to 1st when you confirm.",
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
