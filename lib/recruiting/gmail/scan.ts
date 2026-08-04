import type { Pipeline } from "../types";
import {
  classifyCalendar,
  classifyEmail,
  matchCompany,
  type IngestProposal,
} from "./classify";
import { getCalendarClient, getGmailClient } from "./client";

function header(
  headers: { name?: string | null; value?: string | null }[] | undefined,
  name: string
) {
  return (
    headers?.find((h) => h.name?.toLowerCase() === name.toLowerCase())?.value ||
    ""
  );
}

export type ScanResult = {
  scannedAt: string;
  days: number;
  gmailMatched: number;
  calendarMatched: number;
  proposals: IngestProposal[];
};

export async function scanInterviewSignals(
  pipeline: Pipeline,
  opts: { days?: number } = {}
): Promise<ScanResult> {
  const days =
    opts.days ?? (Number(process.env.GMAIL_INGEST_DAYS || 7) || 7);
  const gmail = getGmailClient();
  const calendar = getCalendarClient();

  const after = Math.floor((Date.now() - days * 86400000) / 1000);
  const aliasQuery = pipeline.companies
    .flatMap((c) => c.aliases || [c.name])
    .filter(Boolean)
    .slice(0, 30)
    .map((a) => `"${String(a).replace(/"/g, "")}"`)
    .join(" OR ");

  const interviewTerms =
    '(interview OR interviewer OR "phone screen" OR "hiring manager" OR onsite OR calendly OR "final round" OR "next round")';
  const q = `after:${after} (${aliasQuery}) ${interviewTerms}`;

  const list = await gmail.users.messages.list({
    userId: "me",
    q,
    maxResults: 40,
  });

  const messages = list.data.messages || [];
  const proposals: IngestProposal[] = [];

  for (const m of messages) {
    if (!m.id) continue;
    const full = await gmail.users.messages.get({
      userId: "me",
      id: m.id,
      format: "metadata",
      metadataHeaders: ["From", "Subject", "Date"],
    });
    const headers = full.data.payload?.headers || [];
    const subject = header(headers, "Subject");
    const from = header(headers, "From");
    const date = header(headers, "Date");
    const snippet = full.data.snippet || "";
    const company = matchCompany(pipeline, `${subject} ${from} ${snippet}`);
    const classification = classifyEmail({ subject, snippet, from, company });

    if (classification.signal === "noise") continue;

    proposals.push({
      source: "gmail",
      id: m.id,
      threadId: full.data.threadId,
      date,
      from,
      subject,
      snippet,
      companyId: company?.noise ? null : company?.id || null,
      companyName: company?.noise ? "noise" : company?.name || null,
      ...classification,
    });
  }

  const timeMin = new Date(Date.now() - days * 86400000).toISOString();
  const timeMax = new Date(Date.now() + 14 * 86400000).toISOString();
  const cal = await calendar.events.list({
    calendarId: "primary",
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 50,
  });

  let calendarMatched = 0;
  for (const ev of cal.data.items || []) {
    if (!ev.id) continue;
    const summary = ev.summary || "";
    const description = ev.description || "";
    const blob = `${summary} ${description} ${(ev.attendees || [])
      .map((a) => a.email)
      .join(" ")}`;
    const company = matchCompany(pipeline, blob);
    if (!company || company.noise) continue;

    const classification = classifyCalendar({ company, summary });
    if (classification.signal === "noise") continue;

    calendarMatched += 1;
    const start = ev.start?.dateTime || ev.start?.date || "";
    const end = ev.end?.dateTime || ev.end?.date || "";

    proposals.push({
      source: "calendar",
      id: ev.id,
      summary,
      start,
      end,
      htmlLink: ev.htmlLink || undefined,
      companyId: company.id,
      companyName: company.name,
      ...classification,
    });
  }

  return {
    scannedAt: new Date().toISOString(),
    days,
    gmailMatched: messages.length,
    calendarMatched,
    proposals,
  };
}

/** Apply high-confidence calendar schedule facts only — never move stages. */
export function applyCalendarFacts(
  pipeline: Pipeline,
  proposals: IngestProposal[]
): { pipeline: Pipeline; applied: number } {
  const data: Pipeline = {
    ...pipeline,
    companies: pipeline.companies.map((c) => ({ ...c })),
    events: pipeline.events.map((e) => ({ ...e })),
  };
  let applied = 0;

  for (const p of proposals) {
    if (p.confidence !== "high") continue;
    if (p.source !== "calendar" || p.signal !== "schedule") continue;
    if (!p.start || !p.end || !p.companyId) continue;

    const company = data.companies.find((c) => c.id === p.companyId);
    if (!company) continue;

    const eid = `evt-${company.id}-${p.start.slice(0, 10)}`;
    let event = data.events.find((e) => e.id === eid || e.id === `cal-${p.id}`);
    if (!event) {
      event = {
        id: eid,
        companyId: company.id,
        start: p.start,
        end: p.end,
        title: p.summary || `${company.name} interview`,
        with: "",
        type: "other",
        status: "scheduled",
        briefPath: null,
        blocker: null,
      };
      data.events.push(event);
    } else {
      event.start = p.start;
      event.end = p.end;
      event.status = "scheduled";
      event.title = p.summary || event.title;
    }
    company.ball = "you";
    company.nextAction = `Attend: ${event.title}`;
    company.due = p.start.slice(0, 10);
    company.priority = "P0";
    applied += 1;
  }

  if (applied > 0) {
    data.updated = new Date().toISOString().slice(0, 10);
  }

  return { pipeline: data, applied };
}
