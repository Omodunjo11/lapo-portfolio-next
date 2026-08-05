/**
 * Recruiting email process taxonomy — what counts as a "next step" / advance.
 * Keep hard reject / schedule safety in classify.ts; this module owns process language.
 */

export type ProcessAdvanceKind =
  | "nda"
  | "next_round"
  | "loop_progression"
  | "exec_or_hm"
  | "take_home"
  | "offer_process"
  | "generic_advance";

/** Broad vocabulary for Gmail q= OR clauses (quoted multi-word in scan). */
export const PROCESS_GMAIL_TERMS = [
  "NDA",
  "non-disclosure",
  "next step",
  "next steps",
  "next stage",
  "next round",
  "move forward",
  "moving forward",
  "excited to continue",
  "excited to move",
  "pleased to move",
  "happy to move",
  "like to move forward",
  "invite you to the next",
  "following up after",
  "after our conversation",
  "after our call",
  "great speaking with you",
  "hiring manager",
  "final round",
  "onsite",
  "on-site",
  "superday",
  "panel interview",
  "case interview",
  "take-home",
  "take home",
  "work sample",
  "reference check",
  "offer discussion",
  "verbal offer",
  "team interview",
  "meet the team",
  "deeper conversation",
  "continue the conversation",
  "continue our conversations",
] as const;

/**
 * Classifier: process-advance language (progression in an active loop).
 * Intentionally wide — hard rejects and application noise are filtered first.
 */
export const PROCESS_ADVANCE_RE =
  /\b(next steps?|next stage|next round|next interview|following interview|subsequent (?:round|interview|conversation)|moving forward|move forward|pleased to (?:move|share|invite)|(?:we'd|we would|'d) like to move|excited to (?:move|continue|share)|happy to (?:move|continue)|continue(?:d)? (?:our |the )?conversations?|continue the process|advance(?:d)? (?:you|your candidacy)|progressing (?:you|your)|progress to the next|proceed to the next|invite you to the next|invite you to (?:meet|speak with)|as the next step|for the next step|next step in (?:our|the) process|hiring manager|hm screen|final round|on-?site|super\s*day|panel interview|meet the (?:broader )?team|team interview|deeper conversation|coo|cto|ceo|cfo|vice president|\bvp\b|take[- ]?home|work sample|case study|written exercise|assignment (?:for|to) (?:you|complete)|reference check|background check|offer (?:discussion|letter|details)|verbal offer|compensation conversation|\bnda\b|non-?disclosure|complete (?:the |an )?nda|sign (?:the |this )?(?:attached )?nda)\b/i;

/** Interview-adjacent vocabulary (gate for non-noise mail). */
export const INTERVIEW_SIGNAL_RE =
  /\b(interview|interviewer|phone screen|recruiter screen|hiring manager|hm screen|onsite|on-site|super\s*day|loop|final round|panel|meet(?:ing)? with|zoom|google meet|teams call|calendly|schedule(?:d)? (?:a |an )?(?:call|interview|chat|video)|upcoming interview|interview confirmation|invitation:?|first round|get .* scheduled|find some time|whenever it works|pointed me|applied through|\bnda\b|non-?disclosure|next step|next stage|move forward|moving forward|continue(?:d)? (?:our |the )?conversations?|sign (?:the |this )?(?:attached )?nda|take[- ]?home|work sample|reference check|meet the team|deeper conversation|\b(?:coo|cto|ceo)\b)\b/i;

export function gmailProcessOrClause(): string {
  const quoted = PROCESS_GMAIL_TERMS.map((t) =>
    t.includes(" ") ? `"${t}"` : t
  );
  return `(${quoted.join(" OR ")})`;
}

export function classifyProcessAdvanceKind(
  text: string
): ProcessAdvanceKind | null {
  if (!PROCESS_ADVANCE_RE.test(text)) return null;
  if (/\bnda\b|\bnon-?disclosure\b/i.test(text)) return "nda";
  if (
    /\btake[- ]?home\b|\bwork\s+sample\b|\bcase\s+study\b|\bwritten\s+exercise\b|\bassignment\b/i.test(
      text
    )
  ) {
    return "take_home";
  }
  if (
    /\boffer\b|\bverbal\s+offer\b|\bcompensation\b|\bcomp\s+conversation\b|\breference\s+check\b/i.test(
      text
    )
  ) {
    return "offer_process";
  }
  if (
    /\bhiring\s+manager\b|\bhm\s+screen\b|\b(?:coo|cto|ceo|cfo)\b|\bvice\s+president\b|\bvp\b/i.test(
      text
    )
  ) {
    return "exec_or_hm";
  }
  if (
    /\bfinal\s+round\b|\bon-?site\b|\bsuper\s*day\b|\bpanel\b|\bloop\b|\bmeet\s+the\s+team\b/i.test(
      text
    )
  ) {
    return "loop_progression";
  }
  if (
    /\bnext\s+round\b|\bnext\s+interview\b|\bnext\s+steps?\b|\bmove\s+forward\b|\bmoving\s+forward\b/i.test(
      text
    )
  ) {
    return "next_round";
  }
  return "generic_advance";
}

export function processAdvanceReason(
  kind: ProcessAdvanceKind,
  text: string
): string {
  const scheduleAsk =
    /schedule|availability|dates?\/times?|video call with|share .{0,40}(?:dates?|times?)/i.test(
      text
    );
  switch (kind) {
    case "nda":
      return "NDA / next-stage advance";
    case "take_home":
      return "take-home / work-sample advance";
    case "offer_process":
      return "offer / late-stage process advance";
    case "exec_or_hm":
      return scheduleAsk
        ? "exec / HM advance + schedule ask"
        : "exec / hiring-manager advance";
    case "loop_progression":
      return "loop / onsite / panel advance";
    case "next_round":
      return scheduleAsk
        ? "next-round advance + schedule ask"
        : "next-round advance";
    default:
      return scheduleAsk
        ? "process advance + schedule ask"
        : "process advance";
  }
}

/**
 * Explicit progression language — not just role titles or invite logistics.
 * Calendar invites often mention COO/HM without meaning "you advanced a stage."
 */
export function hasExplicitProgression(text: string): boolean {
  return /\b(next\s+steps?|next\s+stage|next\s+round|next\s+interview|move\s+forward|moving\s+forward|progress(?:ing)?\s+to|proceed(?:ing)?\s+to|invite you to the next|continue(?:d)?\s+(?:our\s+|the\s+)?process|pleased to (?:move|share|invite)|(?:we'd|we would|'d) like to move|excited to (?:move|continue)|advance(?:d)?\s+(?:you|your)|after (?:our|the) (?:call|conversation|screen|interview).{0,80}(?:next|would like|invite|schedule)|following up after.{0,60}(?:next|move|invite)|\bnda\b|non-?disclosure|take[- ]?home|work sample|reference check|verbal offer|offer (?:discussion|letter|details))\b/i.test(
    text
  );
}

/** Invite / confirm / reschedule logistics for an interview that may already be on the books. */
export function isInterviewLogistics(text: string): boolean {
  return /\b(calendly|zoom\.us|meet\.google|teams\.microsoft|interview confirmation|phone interview is confirmed|you.?re invited to an interview|updated invitation|invitation from an unknown sender|invitation:|calendar invite|reschedul|reminder:|looking forward to (?:our|the) (?:call|chat|interview|conversation)|see you (?:on|at|tomorrow|monday|tuesday|wednesday|thursday|friday))\b/i.test(
    text
  );
}

/** Best-effort pull of next interviewer from advance email text. */
export function extractNextInterviewer(text: string): string | null {
  const patterns = [
    /(?:COO|CTO|CEO|CFO|VP|Vice President)[,:]?\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?),\s*(?:our\s+)?(?:COO|CTO|CEO|CFO|VP|hiring manager)/,
    /(?:video\s+call|call|meeting|chat|interview)\s+with\s+(?:our\s+|the\s+)?\*+([^*]{2,60}?)\*+/i,
    /(?:meet|speak|connect)\s+with\s+(?:our\s+|the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/,
    /(?:video\s+call|call|meeting|chat|interview)\s+with\s+(?:our\s+|the\s+)?([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/,
  ];
  const titleOnly =
    /^(coo|cto|ceo|cfo|vp|vice president|hiring manager|our|the|a|an|your|this|next)$/i;
  for (const re of patterns) {
    const m = text.match(re);
    if (!m?.[1]) continue;
    const name = m[1]
      .replace(/\*+/g, "")
      .replace(/\s+/g, " ")
      .replace(/\s+about\s+.*/i, "")
      .trim();
    if (name.length < 2 || name.length > 48) continue;
    if (titleOnly.test(name)) continue;
    return name;
  }
  return null;
}
