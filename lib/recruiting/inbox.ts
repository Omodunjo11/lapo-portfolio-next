import type { FunnelStage, Pipeline } from "./types";
import { nextFunnelStage } from "./board";
import type { IngestProposal, IngestSignal } from "./gmail/classify";
import { hasExplicitProgression } from "./gmail/taxonomy";

export type InboxSnapshot = {
  scannedAt: string;
  days: number;
  gmailMatched: number;
  calendarMatched: number;
  proposals: IngestProposal[];
};

export type InboxFlag = {
  id: string;
  companyId: string;
  fromStage: FunnelStage;
  toStage: FunnelStage;
  reason: string;
  source: "gmail" | "calendar";
  signal: IngestProposal["signal"];
  subject?: string;
};

const SIGNAL_RANK: Record<IngestSignal, number> = {
  reject: 4,
  advance: 3,
  schedule: 2,
  wait: 1,
  noise: 0,
};

/** One flag per company — prefer stronger signals; ties keep the newer proposal. */
export function dedupeFlagsByCompany(flags: InboxFlag[]): InboxFlag[] {
  const best = new Map<string, InboxFlag>();
  for (const f of flags) {
    const prev = best.get(f.companyId);
    if (!prev) {
      best.set(f.companyId, f);
      continue;
    }
    const rank = SIGNAL_RANK[f.signal] ?? 0;
    const prevRank = SIGNAL_RANK[prev.signal] ?? 0;
    if (rank > prevRank) best.set(f.companyId, f);
    // Equal rank: keep existing (proposals are newest-first from Gmail scan).
  }
  return [...best.values()];
}

function blob(p: IngestProposal) {
  return `${p.subject || ""} ${p.reason || ""} ${p.snippet || ""} ${p.summary || ""}`;
}

/** Turn non-noise proposals into accept/dismiss flags (stage moves only on Accept). */
export function proposalsToFlags(
  pipeline: Pipeline,
  proposals: IngestProposal[],
  dismissedIds: string[] = []
): InboxFlag[] {
  const dismissed = new Set(dismissedIds);
  const out: InboxFlag[] = [];

  for (const p of proposals) {
    if (!p.companyId || p.signal === "noise") continue;
    // Non-spam waits stay quiet; spam waits surface below.
    if (
      p.signal === "wait" &&
      !(p.fromSpam || /\b\[spam\]\b/i.test(p.subject || ""))
    ) {
      continue;
    }
    const company = pipeline.companies.find((c) => c.id === p.companyId);
    if (!company) continue;
    if (
      company.stage === "passed" ||
      company.stage === "ghosted" ||
      company.stage === "offered"
    ) {
      continue;
    }

    const id = `inbox-${p.source}-${p.id}`;
    if (dismissed.has(id)) continue;

    if (p.signal === "reject") {
      out.push({
        id,
        companyId: company.id,
        fromStage: company.stage,
        toStage: "passed",
        reason: `Review carefully before Accept. ${p.reason}: ${p.subject || p.summary || "rejection signal"}`,
        source: p.source,
        signal: p.signal,
        subject: p.subject || p.summary,
      });
      continue;
    }

    // Surface Spam hits even when they're not a stage-move yet.
    if (p.signal === "wait" && (p.fromSpam || /\b\[spam\]\b/i.test(p.subject || ""))) {
      out.push({
        id,
        companyId: company.id,
        fromStage: company.stage,
        toStage: company.stage,
        reason: `${p.reason}: ${p.subject || p.summary || "spam hit"} — open Gmail Spam and move to Inbox`,
        source: p.source,
        signal: p.signal,
        subject: p.subject || p.summary,
      });
      continue;
    }

    if (p.signal === "schedule") {
      // Calendar sync already adds the event — never treat calendar as a stage bump.
      // Gmail schedule: only Applied → 1st. Same-round invites must not look like advances.
      if (p.source === "calendar") continue;
      if (company.stage === "applied") {
        out.push({
          id,
          companyId: company.id,
          fromStage: "applied",
          toStage: "first",
          reason: `${p.reason}: ${p.subject || p.summary || "interview scheduled"}`,
          source: p.source,
          signal: p.signal,
          subject: p.subject || p.summary,
        });
      }
      continue;
    }

    if (p.signal === "advance") {
      // Already at end of funnel — don't spam duplicate "advance" flags.
      if (company.stage === "final") continue;
      // Require explicit progression words so same-round logistics don't +1 stage.
      if (!hasExplicitProgression(blob(p))) continue;
      const next = nextFunnelStage(company.stage);
      if (!next) continue;
      out.push({
        id,
        companyId: company.id,
        fromStage: company.stage,
        toStage: next,
        reason: `${p.reason}: ${p.subject || p.summary || "advance signal"}`,
        source: p.source,
        signal: p.signal,
        subject: p.subject || p.summary,
      });
    }
  }

  return dedupeFlagsByCompany(out);
}
