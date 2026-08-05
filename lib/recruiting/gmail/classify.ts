import type { Company, Pipeline } from "../types";
import {
  INTERVIEW_SIGNAL_RE,
  classifyProcessAdvanceKind,
  hasExplicitProgression,
  isInterviewLogistics,
  processAdvanceReason,
} from "./taxonomy";

export type IngestSignal =
  | "noise"
  | "reject"
  | "schedule"
  | "advance"
  | "wait";

export type IngestConfidence = "high" | "medium" | "low";

export type IngestProposal = {
  source: "gmail" | "calendar";
  id: string;
  threadId?: string | null;
  date?: string;
  from?: string;
  subject?: string;
  snippet?: string;
  summary?: string;
  start?: string;
  end?: string;
  htmlLink?: string;
  companyId: string | null;
  companyName: string | null;
  signal: IngestSignal;
  confidence: IngestConfidence;
  reason: string;
  /** True when the Gmail message was in Spam when scanned. */
  fromSpam?: boolean;
};

type CompanyHit = Company & { noise?: boolean };

const OUTBOUND_CHASE_RE =
  /\b(first round|get .* scheduled|find some time|whenever it works|pointed me|applied through|copying (him|her|them)|attached my resume|would love to find some time)\b/i;

const APPLICATION_NOISE_RE =
  /\b(thanks for applying|thank you for (?:your )?application|application (?:received|submitted)|we received your application|new jobs? for you|job alert|recommended (?:roles?|jobs?)|high-conviction|open roles digest|medium daily digest|stories for )\b/i;

export function matchCompany(
  pipeline: Pipeline,
  text: string,
  opts: { from?: string } = {}
): CompanyHit | null {
  const hay = (text || "").toLowerCase();
  const from = (opts.from || "").toLowerCase();
  if (/jackandjill\.ai|jack and jill/i.test(hay)) {
    return {
      id: "_noise",
      name: "noise",
      role: "",
      stage: "applied",
      ball: "you",
      priority: "P2",
      nextAction: "",
      due: "",
      noise: true,
    };
  }
  for (const c of pipeline.companies) {
    if (hay.includes(c.name.toLowerCase())) return c;
    for (const a of c.aliases || []) {
      const al = String(a || "").toLowerCase().trim();
      if (!al || al.length < 4) continue;
      // First-name / short single tokens are too sticky (e.g. "Michal" in a
      // Medium digest). Only match those against the From header.
      const personish =
        !al.includes(".") &&
        !al.includes("@") &&
        !/\s/.test(al) &&
        al.length < 12;
      if (personish) {
        if (from.includes(al)) return c;
        continue;
      }
      if (hay.includes(al)) return c;
    }
  }
  return null;
}

export function isInterviewSignal({
  subject,
  snippet,
  from,
  body = "",
  source,
}: {
  subject?: string;
  snippet?: string;
  from?: string;
  body?: string;
  source: "gmail" | "calendar";
}) {
  const text = `${subject || ""} ${snippet || ""} ${body || ""} ${from || ""}`;
  if (source === "calendar") return true;
  if (APPLICATION_NOISE_RE.test(text)) return false;
  if (/jackandjill/i.test(text)) return false;
  return INTERVIEW_SIGNAL_RE.test(text);
}

export function classifyEmail({
  subject,
  snippet,
  from,
  company,
  to = "",
  body = "",
}: {
  subject: string;
  snippet: string;
  from: string;
  company: CompanyHit | null;
  to?: string;
  /** Full message plain text when fetched — preferred over snippet alone. */
  body?: string;
}): { signal: IngestSignal; confidence: IngestConfidence; reason: string } {
  if (company?.noise) {
    return {
      signal: "noise",
      confidence: "high",
      reason: "job-search tool noise",
    };
  }
  const text = `${subject} ${snippet} ${body} ${from} ${to}`.toLowerCase();

  if (APPLICATION_NOISE_RE.test(text)) {
    return {
      signal: "noise",
      confidence: "high",
      reason: "application / job digest noise",
    };
  }

  // Outbound chase to a tracked company (e.g. sent "get a first round scheduled")
  if (company && OUTBOUND_CHASE_RE.test(text)) {
    return {
      signal: "schedule",
      confidence: "medium",
      reason: "outbound schedule / first-round chase",
    };
  }

  // Hard rejects on tracked companies can look like plain updates, not
  // "interview" mail. Prefer truth over needing interview keywords.
  const hardReject =
    /\b(not moving forward|will not be moving forward|won't be progressing|will not be progressing|won't be advancing|will not be advancing|other candidates|decided not to proceed|no longer under consideration|position has been filled|will not be proceeding|won't be proceeding)\b/i.test(
      text
    ) ||
    /\bunfortunately\b.{0,120}\b(not (?:be )?moving|won't be|will not be|other candidates|decided not|no longer under consideration|position has been filled)\b/i.test(
      text
    );

  // Process advance beats bare "schedule a …" — but only when the body has
  // explicit progression language. Calendar invites / confirmations that merely
  // name a COO or "hiring manager" are logistics for the current round.
  const advanceKind = classifyProcessAdvanceKind(text);
  const isScheduling =
    /calendly|schedule a|book a time|availability|interview invite|zoom\.us|meet\.google|interview confirmation|phone interview is confirmed|you.?re booked|booked for|you.?re confirmed|confirmed for your|all set for|you.?re invited to an interview|updated invitation|invitation from an unknown sender|invitation:|confirm a time|times? you (?:have )?shared|asking if you have|send you the (?:confirmation|invite)|calendar invite|what time (?:would|works?)|reschedul|any availability|time that works/i.test(
      text
    ) || isInterviewLogistics(text);

  // Hard booked confirmations with a named interview window win over COO/HM advance.
  const bookedHard =
    isScheduling &&
    /\b(you.?re booked|booked for|you.?re confirmed|confirmed for your|invitation:|all set for)\b/i.test(
      text
    );

  if (
    company &&
    advanceKind &&
    !hardReject &&
    !bookedHard &&
    !(isScheduling && !hasExplicitProgression(text)) &&
    !(advanceKind === "generic_advance" && !hasExplicitProgression(text))
  ) {
    return {
      signal: "advance",
      confidence: "medium",
      reason: processAdvanceReason(advanceKind, text),
    };
  }

  // Scheduling first when both soft apology and new times appear.
  if (isScheduling) {
    return {
      signal: "schedule",
      confidence: bookedHard ? "high" : "medium",
      reason: bookedHard
        ? "interview booked / confirmed"
        : "interview scheduling",
    };
  }

  if (company && hardReject) {
    return {
      signal: "reject",
      confidence: "high",
      reason: "hard rejection language (not scheduling conflict)",
    };
  }

  if (!isInterviewSignal({ subject, snippet, from, body, source: "gmail" })) {
    return {
      signal: "noise",
      confidence: "medium",
      reason: "not interview-related (applications ignored)",
    };
  }
  if (
    /thank you for (your time|speaking|chatting)|great speaking|enjoyed (our|the) (call|chat|interview)/i.test(
      text
    )
  ) {
    return {
      signal: "wait",
      confidence: "medium",
      reason: "post-interview thank you",
    };
  }
  if (company) {
    return {
      signal: "wait",
      confidence: "low",
      reason: "interview-adjacent, unclear",
    };
  }
  return { signal: "noise", confidence: "low", reason: "no company match" };
}

export function classifyCalendar({
  company,
  summary,
}: {
  company: CompanyHit | null;
  summary?: string;
}): { signal: IngestSignal; confidence: IngestConfidence; reason: string } {
  if (!company || company.noise) {
    return {
      signal: "noise",
      confidence: "low",
      reason: "unmatched calendar",
    };
  }
  const s = summary || "";
  if (APPLICATION_NOISE_RE.test(s)) {
    return {
      signal: "noise",
      confidence: "high",
      reason: "non-interview calendar",
    };
  }
  return {
    signal: "schedule",
    confidence: "high",
    reason: "calendar interview matched company",
  };
}
