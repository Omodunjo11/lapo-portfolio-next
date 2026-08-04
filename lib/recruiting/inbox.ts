import type { FunnelStage, Pipeline } from "./types";
import { nextFunnelStage } from "./board";
import type { IngestProposal } from "./gmail/classify";

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

/** Turn non-noise proposals into accept/dismiss flags (stage moves only on Accept). */
export function proposalsToFlags(
  pipeline: Pipeline,
  proposals: IngestProposal[],
  dismissedIds: string[] = []
): InboxFlag[] {
  const dismissed = new Set(dismissedIds);
  const out: InboxFlag[] = [];

  for (const p of proposals) {
    if (!p.companyId || p.signal === "noise" || p.signal === "wait") continue;
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
      const toStage: FunnelStage =
        company.stage === "applied" ? "first" : company.stage;
      if (toStage === company.stage && p.source === "calendar") {
        // Calendar facts already applied separately; still offer stage nudge
        // only if still in applied.
        continue;
      }
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

  return out;
}
