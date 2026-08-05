import { buildSuggestions, type Suggestion } from "./board";
import { activePendingFlags } from "./inbox";
import { getRecruitingInbox } from "./inbox-store";
import type { Pipeline } from "./types";

/**
 * Today flags = board event heuristics + pending inbox flags discovered on Scan.
 * Never re-derive stage bumps from the full saved inbox (that re-nagged every visit).
 */
export function allSuggestions(
  pipeline: Pipeline,
  dismissedIds: string[] = []
): Suggestion[] {
  const fromEvents = buildSuggestions(pipeline, dismissedIds);
  const inbox = getRecruitingInbox();
  const fromInbox: Suggestion[] = activePendingFlags(
    pipeline,
    inbox.pendingFlags,
    dismissedIds,
    inbox.handledKeys || []
  ).map((f) => ({
    id: f.id,
    companyId: f.companyId,
    fromStage: f.fromStage,
    toStage: f.toStage,
    reason: f.reason,
    status: "pending" as const,
    key: f.key,
  }));

  const seen = new Set(fromEvents.map((s) => s.id));
  return [...fromEvents, ...fromInbox.filter((s) => !seen.has(s.id))];
}
