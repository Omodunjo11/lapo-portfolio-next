import type { Pipeline } from "../types";
import { extractGmailBody } from "./body";
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
  spamMatched: number;
  proposals: IngestProposal[];
};

async function listMessageIds(
  gmail: ReturnType<typeof getGmailClient>,
  q: string,
  maxResults: number,
  includeSpamTrash = false
) {
  const list = await gmail.users.messages.list({
    userId: "me",
    q,
    maxResults,
    includeSpamTrash,
  });
  return list.data.messages || [];
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }
  const n = Math.min(concurrency, Math.max(items.length, 1));
  await Promise.all(Array.from({ length: n }, () => worker()));
  return results;
}

async function proposalFromMessage(
  gmail: ReturnType<typeof getGmailClient>,
  pipeline: Pipeline,
  messageId: string,
  opts: { fromSpam?: boolean } = {}
): Promise<IngestProposal | null> {
  // Full payload so we classify on body text, not subject+snippet alone.
  const full = await gmail.users.messages.get({
    userId: "me",
    id: messageId,
    format: "full",
  });
  const headers = full.data.payload?.headers || [];
  const subject = header(headers, "Subject");
  const from = header(headers, "From");
  const to = [header(headers, "To"), header(headers, "Cc")]
    .filter(Boolean)
    .join(" ");
  const date = header(headers, "Date");
  const snippet = full.data.snippet || "";
  const body = extractGmailBody(full.data.payload);
  const company = matchCompany(
    pipeline,
    `${subject} ${from} ${to} ${snippet} ${body}`,
    { from }
  );
  let classification = classifyEmail({
    subject,
    snippet,
    body,
    from,
    to,
    company,
  });

  // Spam often strips "interview" wording. Still surface tracked-company hits.
  if (
    opts.fromSpam &&
    company &&
    !company.noise &&
    classification.signal === "noise"
  ) {
    classification = {
      signal: "wait",
      confidence: "medium",
      reason: "Tracked company mail found in Spam — open and move out of Spam",
    };
  }

  if (classification.signal === "noise") return null;

  const spamTag = opts.fromSpam ? " [spam]" : "";
  return {
    source: "gmail",
    id: messageId,
    threadId: full.data.threadId,
    date,
    from: to ? `${from} → ${to}` : from,
    subject: subject ? `${subject}${spamTag}` : subject,
    snippet: body ? body.slice(0, 280) : snippet,
    companyId: company?.noise ? null : company?.id || null,
    companyName: company?.noise ? "noise" : company?.name || null,
    fromSpam: Boolean(opts.fromSpam),
    ...classification,
    reason: opts.fromSpam
      ? `${classification.reason} (in Spam)`
      : classification.reason,
  };
}

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
    .slice(0, 40)
    .map((a) => `"${String(a).replace(/"/g, "")}"`)
    .join(" OR ");

  const interviewTerms =
    '(interview OR interviewer OR "phone screen" OR "hiring manager" OR onsite OR calendly OR "final round" OR "next round" OR "first round" OR "google meet" OR invitation OR NDA OR "non-disclosure" OR "next step" OR "next stage" OR "move forward" OR "moving forward")';
  const sentChaseTerms =
    '("first round" OR schedule OR scheduled OR "find some time" OR "looking forward" OR calendly OR "attached" OR applied OR resume OR NDA)';
  // Tracked company + clear process docs (NDA) even without the word interview.
  const processTerms =
    '(NDA OR "non-disclosure" OR "next step" OR "next stage" OR "move forward" OR "moving forward" OR "excited to continue" OR "excited to move")';

  // Keyword / process pass (inbox + sent chase).
  const inboxQ = `after:${after} -in:spam -in:trash ((${aliasQuery}) (${interviewTerms} OR ${processTerms}) OR (in:sent (${aliasQuery}) ${sentChaseTerms}))`;
  // Safety net: recent mail for company names / domains (not first-name aliases).
  const strongAliasQuery = pipeline.companies
    .flatMap((c) => {
      const out = [c.name];
      for (const a of c.aliases || []) {
        const s = String(a || "").trim();
        if (!s) continue;
        if (s.includes(".") || s.includes("@") || /\s/.test(s)) out.push(s);
      }
      return out;
    })
    .filter(Boolean)
    .slice(0, 40)
    .map((a) => `"${String(a).replace(/"/g, "")}"`)
    .join(" OR ");
  const companyQ = `after:${after} -in:spam -in:trash (${strongAliasQuery})`;
  // Explicit Spam pass — Hang Ten and others have landed here.
  const spamQ = `in:spam after:${after} (${aliasQuery})`;

  const [inboxMsgs, companyMsgs, spamMsgs] = await Promise.all([
    listMessageIds(gmail, inboxQ, 40, false),
    listMessageIds(gmail, companyQ, 35, false),
    listMessageIds(gmail, spamQ, 25, true),
  ]);

  const seen = new Set<string>();
  const work: { id: string; fromSpam: boolean }[] = [];

  for (const m of [...inboxMsgs, ...companyMsgs]) {
    if (!m.id || seen.has(m.id)) continue;
    seen.add(m.id);
    work.push({ id: m.id, fromSpam: false });
  }

  let spamMatched = 0;
  for (const m of spamMsgs) {
    if (!m.id || seen.has(m.id)) continue;
    seen.add(m.id);
    spamMatched += 1;
    work.push({ id: m.id, fromSpam: true });
  }

  const proposals = (
    await mapPool(work, 6, ({ id, fromSpam }) =>
      proposalFromMessage(gmail, pipeline, id, { fromSpam })
    )
  ).filter((p): p is IngestProposal => Boolean(p));

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
    gmailMatched: inboxMsgs.length + companyMsgs.length + spamMsgs.length,
    calendarMatched,
    spamMatched,
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

    // Don't revive past meetings into "Attend" next actions.
    const endMs = Date.parse(p.end);
    if (Number.isFinite(endMs) && endMs < Date.now() - 30 * 60 * 1000) {
      continue;
    }

    const company = data.companies.find((c) => c.id === p.companyId);
    if (!company) continue;

    const eid = `evt-${company.id}-${p.start.slice(0, 10)}`;
    let event =
      data.events.find((e) => e.id === `cal-${p.id}`) ||
      data.events.find((e) => e.id === eid) ||
      data.events.find(
        (e) => e.companyId === company.id && e.status === "scheduled"
      );

    if (event?.status === "done") continue;

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
      if (event.id !== eid && event.id !== `cal-${p.id}`) {
        event.id = eid;
      }
      event.start = p.start;
      event.end = p.end;
      event.status = "scheduled";
      event.title = p.summary || event.title;
    }

    for (const e of data.events) {
      if (
        e.companyId === company.id &&
        e.status === "scheduled" &&
        e.id !== event.id
      ) {
        e.status = "canceled";
        e.blocker = `Superseded by calendar update → ${p.start}`;
      }
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
