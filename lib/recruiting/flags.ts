import { buildSuggestions, type Suggestion } from "./board";
import { proposalsToFlags } from "./inbox";
import { getRecruitingInbox } from "./inbox-store";
import type { Pipeline } from "./types";

/** Event-based suggestions + latest Gmail/Calendar inbox flags. */
export function allSuggestions(
  pipeline: Pipeline,
  dismissedIds: string[] = []
): Suggestion[] {
  const fromEvents = buildSuggestions(pipeline, dismissedIds);
  const inbox = getRecruitingInbox();
  const fromInbox: Suggestion[] = proposalsToFlags(
    pipeline,
    inbox.proposals,
    dismissedIds
  ).map((f) => ({
    id: f.id,
    companyId: f.companyId,
    fromStage: f.fromStage,
    toStage: f.toStage,
    reason: f.reason,
    status: "pending" as const,
  }));

  const seen = new Set(fromEvents.map((s) => s.id));
  return [...fromEvents, ...fromInbox.filter((s) => !seen.has(s.id))];
}
