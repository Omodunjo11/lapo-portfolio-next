import type { Company, Pipeline } from "../types";

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
};

type CompanyHit = Company & { noise?: boolean };

const INTERVIEW_RE =
  /\b(interview|interviewer|phone screen|recruiter screen|hiring manager|hm screen|onsite|on-site|loop|final round|panel|meet(?:ing)? with|zoom|google meet|teams call|calendly|schedule(?:d)? (?:a |an )?(?:call|interview|chat)|upcoming interview|interview confirmation|invitation:?|first round|get .* scheduled|find some time|whenever it works|pointed me|applied through)\b/i;

const OUTBOUND_CHASE_RE =
  /\b(first round|get .* scheduled|find some time|whenever it works|pointed me|applied through|copying (him|her|them)|attached my resume|would love to find some time)\b/i;

const APPLICATION_NOISE_RE =
  /\b(thanks for applying|thank you for (?:your )?application|application (?:received|submitted)|we received your application|new jobs? for you|job alert|recommended (?:roles?|jobs?)|high-conviction|open roles digest)\b/i;

export function matchCompany(
  pipeline: Pipeline,
  text: string
): CompanyHit | null {
  const hay = (text || "").toLowerCase();
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
    for (const a of c.aliases || []) {
      if (a && hay.includes(String(a).toLowerCase())) return c;
    }
    if (hay.includes(c.name.toLowerCase())) return c;
  }
  return null;
}

export function isInterviewSignal({
  subject,
  snippet,
  from,
  source,
}: {
  subject?: string;
  snippet?: string;
  from?: string;
  source: "gmail" | "calendar";
}) {
  const text = `${subject || ""} ${snippet || ""} ${from || ""}`;
  if (source === "calendar") return true;
  if (APPLICATION_NOISE_RE.test(text)) return false;
  if (/jackandjill/i.test(text)) return false;
  return INTERVIEW_RE.test(text);
}

export function classifyEmail({
  subject,
  snippet,
  from,
  company,
  to = "",
}: {
  subject: string;
  snippet: string;
  from: string;
  company: CompanyHit | null;
  to?: string;
}): { signal: IngestSignal; confidence: IngestConfidence; reason: string } {
  if (company?.noise) {
    return {
      signal: "noise",
      confidence: "high",
      reason: "job-search tool noise",
    };
  }
  const text = `${subject} ${snippet} ${from} ${to}`.toLowerCase();

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

  if (!isInterviewSignal({ subject, snippet, from, source: "gmail" })) {
    return {
      signal: "noise",
      confidence: "medium",
      reason: "not interview-related (applications ignored)",
    };
  }

  if (
    /unfortunately|not moving forward|other candidates|won't be progressing|will not be moving/i.test(
      text
    )
  ) {
    return {
      signal: "reject",
      confidence: "high",
      reason: "rejection language",
    };
  }
  if (
    /calendly|schedule a|book a time|availability|interview invite|zoom\.us|meet\.google|interview confirmation|phone interview is confirmed|you.?re invited to an interview|updated invitation|invitation from an unknown sender|invitation:/i.test(
      text
    )
  ) {
    return {
      signal: "schedule",
      confidence: "medium",
      reason: "interview scheduling",
    };
  }
  if (
    /next steps|moving forward|hiring manager|next round|final round|onsite/i.test(
      text
    )
  ) {
    return {
      signal: "advance",
      confidence: "medium",
      reason: "interview advance",
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
