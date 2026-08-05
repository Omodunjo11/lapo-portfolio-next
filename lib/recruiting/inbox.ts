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
  /** Dismissed / accepted thread keys — permanent suppress. */
  handledKeys?: string[];
  /**
   * Stage-move flags first discovered on a Scan. Shown on Today until
   * Accept/Dismiss. Re-derived flags from the whole inbox are never used
   * on page load — that was causing the same emails to nag every visit.
   */
  pendingFlags?: InboxFlag[];
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
  key: string;
};

export type FlagFilter = {
  dismissedIds?: string[];
  handledKeys?: string[];
  /** Proposals from the previous scan — same message/thread must not re-nag. */
  alreadySeenProposals?: IngestProposal[];
};

const SIGNAL_RANK: Record<IngestSignal, number> = {
  reject: 4,
  advance: 3,
  schedule: 2,
  wait: 1,
  noise: 0,
};

const OWN_MAIL =
  /odunjoonaolapo@gmail\.com|omodunjo@wharton\.upenn\.edu/i;

export function proposalStageKey(
  p: Pick<IngestProposal, "companyId" | "threadId" | "id" | "source">,
  toStage: FunnelStage
): string {
  const thread = p.threadId || p.id;
  return `${p.companyId}|${p.source}|${thread}|${toStage}`;
}

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
  }
  return [...best.values()];
}

function blob(p: IngestProposal) {
  return `${p.subject || ""} ${p.reason || ""} ${p.snippet || ""} ${p.summary || ""}`;
}

function isSchedulingOverview(p: IngestProposal): boolean {
  const sub = p.subject || "";
  return /\b(scheduling|interview overview|availability|calendly|invitation:|updated invitation|reminder:)\b/i.test(
    sub
  );
}

function isOutboundFromLapo(p: IngestProposal): boolean {
  const from = p.from || "";
  if (!OWN_MAIL.test(from)) return false;
  const left = from.split("→")[0] || from;
  return OWN_MAIL.test(left);
}

function threadKey(p: IngestProposal): string {
  return `${p.companyId}|${p.threadId || p.id}`;
}

/**
 * Discover NEW stage-move flags from a scan (vs previous proposals).
 * Do not call this on cold page load against the full inbox — use pendingFlags.
 */
export function proposalsToFlags(
  pipeline: Pipeline,
  proposals: IngestProposal[],
  filter: FlagFilter | string[] = {}
): InboxFlag[] {
  const opts: FlagFilter = Array.isArray(filter)
    ? { dismissedIds: filter }
    : filter;
  const dismissed = new Set(opts.dismissedIds || []);
  const handled = new Set(opts.handledKeys || []);
  const seenMsgs = new Set(
    (opts.alreadySeenProposals || []).map((p) => `${p.source}:${p.id}`)
  );
  const seenAdvanceThreads = new Set(
    (opts.alreadySeenProposals || [])
      .filter((p) => p.signal === "advance" && p.companyId)
      .map((p) => threadKey(p))
  );

  const out: InboxFlag[] = [];

  for (const p of proposals) {
    if (!p.companyId || p.signal === "noise") continue;
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

    const alreadyScanned = seenMsgs.has(`${p.source}:${p.id}`);

    if (p.signal === "reject") {
      const key = proposalStageKey(p, "passed");
      if (handled.has(key) || dismissed.has(key) || alreadyScanned) continue;
      out.push({
        id,
        companyId: company.id,
        fromStage: company.stage,
        toStage: "passed",
        reason: `Review carefully before Accept. ${p.reason}: ${p.subject || p.summary || "rejection signal"}`,
        source: p.source,
        signal: p.signal,
        subject: p.subject || p.summary,
        key,
      });
      continue;
    }

    if (p.signal === "wait" && (p.fromSpam || /\b\[spam\]\b/i.test(p.subject || ""))) {
      const key = `${company.id}|spam|${p.threadId || p.id}`;
      if (handled.has(key) || dismissed.has(key) || alreadyScanned) continue;
      out.push({
        id,
        companyId: company.id,
        fromStage: company.stage,
        toStage: company.stage,
        reason: `${p.reason}: ${p.subject || p.summary || "spam hit"} — open Gmail Spam and move to Inbox`,
        source: p.source,
        signal: p.signal,
        subject: p.subject || p.summary,
        key,
      });
      continue;
    }

    if (p.signal === "schedule") {
      if (p.source === "calendar") continue;
      if (company.stage === "applied") {
        const key = proposalStageKey(p, "first");
        if (handled.has(key) || dismissed.has(key) || alreadyScanned) continue;
        out.push({
          id,
          companyId: company.id,
          fromStage: "applied",
          toStage: "first",
          reason: `${p.reason}: ${p.subject || p.summary || "interview scheduled"}`,
          source: p.source,
          signal: p.signal,
          subject: p.subject || p.summary,
          key,
        });
      }
      continue;
    }

    if (p.signal === "advance") {
      if (company.stage === "final") continue;
      if (isOutboundFromLapo(p)) continue;
      if (isSchedulingOverview(p)) continue;
      if (!hasExplicitProgression(blob(p))) continue;

      const next = nextFunnelStage(company.stage);
      if (!next) continue;

      if (
        (company.stage === "second" ||
          company.stage === "third" ||
          company.stage === "fourth") &&
        !/\b(final\s+round|third\s+round|fourth\s+round|on-?site|super\s*day|panel interview|reference check|offer (?:discussion|letter)|verbal offer)\b/i.test(
          blob(p)
        )
      ) {
        continue;
      }

      const key = proposalStageKey(p, next);
      if (handled.has(key) || dismissed.has(key)) continue;
      if (alreadyScanned || seenAdvanceThreads.has(threadKey(p))) continue;

      out.push({
        id,
        companyId: company.id,
        fromStage: company.stage,
        toStage: next,
        reason: `${p.reason}: ${p.subject || p.summary || "advance signal"}`,
        source: p.source,
        signal: p.signal,
        subject: p.subject || p.summary,
        key,
      });
    }
  }

  return dedupeFlagsByCompany(out);
}

export function mergeHandledKeys(
  existing: string[] | undefined,
  keys: string[]
): string[] {
  return [...new Set([...(existing || []), ...keys])];
}

/** Keep pending flags that are still valid for the live pipeline stage. */
export function activePendingFlags(
  pipeline: Pipeline,
  pending: InboxFlag[] | undefined,
  dismissedIds: string[] = [],
  handledKeys: string[] = []
): InboxFlag[] {
  const dismissed = new Set(dismissedIds);
  const handled = new Set(handledKeys);
  const out: InboxFlag[] = [];
  for (const f of pending || []) {
    if (dismissed.has(f.id) || dismissed.has(f.key) || handled.has(f.key)) {
      continue;
    }
    const company = pipeline.companies.find((c) => c.id === f.companyId);
    if (!company) continue;
    if (
      company.stage === "passed" ||
      company.stage === "ghosted" ||
      company.stage === "offered"
    ) {
      continue;
    }
    // Drop if they already moved past the suggested toStage (or to it).
    const order = [
      "applied",
      "first",
      "second",
      "third",
      "fourth",
      "final",
      "offered",
    ];
    const cur = order.indexOf(company.stage);
    const to = order.indexOf(f.toStage);
    if (cur >= 0 && to >= 0 && cur >= to && f.fromStage !== f.toStage) {
      continue;
    }
    out.push({
      ...f,
      fromStage: company.stage,
    });
  }
  return dedupeFlagsByCompany(out);
}

export function mergePendingFlags(
  existing: InboxFlag[] | undefined,
  discovered: InboxFlag[]
): InboxFlag[] {
  const byKey = new Map<string, InboxFlag>();
  for (const f of existing || []) byKey.set(f.key, f);
  for (const f of discovered) byKey.set(f.key, f);
  return [...byKey.values()];
}
