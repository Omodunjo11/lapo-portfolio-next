import type Anthropic from "@anthropic-ai/sdk";
import type { Company, PipelineEvent } from "./types";
import { anthropicConfigured, getAnthropic, prepModel } from "./claude";

/**
 * READABILITY: Brain Co Google Doc.
 * JOB: accumulate feedback; rewrite only the next-step prep tab from ALL of it.
 */
const STYLE_AND_JOB = `
Write like the Brain Co Google Doc: readable titles, short bullets, clear judgment, action items.

DOCUMENT ORDER (always, top to bottom):
1. Title + Lapo line
2. ## Company research — public + signal research FIRST
3. ## Company and contacts, from your inbox
4. ## Notes from … / ## Feedback added … — Lapo's notes AFTER research
5. ## Next step prep / Prep for {person} — refreshed for the upcoming round
6. ## Interview line to reuse
7. ## How to read this and what to do with it

ACCUMULATION RULES (critical):
- NEVER delete or invent away prior feedback. Old "Notes from …", "Feedback added …", and company/contact facts stay in the document.
- Company research stays at the top and only grows with better verified facts. Do not bury research under Lapo's notes.
- When Lapo adds new notes, ADD a new dated feedback block BELOW research (not above it).
- REWRITE only the forward section: "## Next step prep (updated {date})" / "## Prep for {person}, {date}".
  That next-step section must synthesize ALL prior feedback + the newest notes + email into one clear prep for the upcoming round.
- Think of the doc as tabs over time: research + history stay; the next-step tab is refreshed.

Shape:

# {Company}: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: …. Living notes doc, add to this after every conversation.

## Company research
- What they do / product
- Stage, customers, positioning (mark unknown if not found)
- Why this seat or process matters for Lapo
- Sources: public web + inbox signal only; no invented facts

## Company and contacts, from your inbox
- Stable facts (keep and extend, do not wipe)

## Notes from {prior person/date}
- Keep prior round notes (preserve substance)

## Feedback added {dates}
- Keep prior Lapo feedback entries; add new ones when provided

## Next step prep (updated {today's date}): {Next person or next round}
### What this conversation is about
### What they are likely testing (from ALL feedback so far)
### Lines and stories to land
### Questions to ask
### Action items before the call

## Interview line to reuse, in their own language
"…"

## How to read this and what to do with it
- Judgment that uses the full history, focused on the next round

This is a living document. Add new notes here after every {Company} conversation so the next round always has the full picture in one place.
`.trim();

const CANDIDATE_CONTEXT = `
Candidate: Onaolapo "Lapo" Odunjo (he/him). Wharton MBA. Product / forward-deployed AI.
Voice: calm, specific, readable. Night-before brief. Not a template.

Proof bank (use only what is relevant; do not invent employers or metrics):
- Kinage: multi-account AI deployment; playbooks; coached deployed engineers; 0 to 12 institutions; cost-to-serve about 62 percent down. Team leverage, not solo heroics.
- Bank / regulated trust: eval gates, precision, production quality bar; field failure modes into Product.
- Judgment under pressure: TD-style pushback. Calm alternative, protected delivery, spoke to risk and outcomes.
- Incomplete-info shipping: incomplete specs, cut scope, ship, measure adoption.
- Do not overclaim formal manager headcount. Lead by ownership and coaching.
- Gov or MENA depth may be thin. Say so if asked.

Do not invent companies, titles, metrics, interviewer biographies, or what the interview is about. If signal does not say, mark unknown.
`.trim();

export type PrepGenInput = {
  company: Company;
  event: PipelineEvent;
  emailContext?: string | null;
  /** Full accumulated notes log and/or newest batch. */
  userUpdate?: string | null;
  existingBrief?: string | null;
  force?: boolean;
  /** New company / first doc: research-first with public web search. */
  researchBootstrap?: boolean;
};

export function isRichBrief(text: string | null | undefined): boolean {
  if (!text) return false;
  if (looksLikeLegacyPrepDeck(text)) return false;
  const hasNextPrep =
    /## (Next step prep|Prep for )/i.test(text) ||
    /Action items before/i.test(text);
  const hasReadable =
    /How to read this and what to do with it/i.test(text) &&
    /Action items/i.test(text);
  return hasNextPrep && hasReadable && text.length >= 1000;
}

export function looksLikeLegacyPrepDeck(text: string): boolean {
  if (/Five lines to land|# Now |Points to land|Lines to land/i.test(text)) {
    return true;
  }
  if (/## Goal for this conversation/i.test(text)) return true;
  if (text.includes("\u2014")) return true;
  if (text.includes("**With:**") || text.includes("**When:**")) return true;
  if (/^\|.+\|$/m.test(text) && text.includes("|---")) return true;
  if (
    /Prep deck\s*[,:—-]/i.test(text) &&
    !/Interview Notes and Prep/i.test(text)
  ) {
    return true;
  }
  return false;
}

export function stubPrepDeck(company: Company, event: PipelineEvent): string {
  const when = event.start
    ? new Date(event.start).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "America/New_York",
      })
    : "TBD";

  const withWho = event.with || "TBD";
  const nextLabel = withWho !== "TBD" ? withWho : "next round";
  const today = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });

  return `# ${company.name}: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: ${company.role}. Living notes doc, add to this after every conversation.

## Company research

- Waiting on public + inbox research. Do not invent.
- Role on file: ${company.role || "unknown"}
- Stage: ${company.stageLabel || company.stage}

## Company and contacts, from your inbox

- Role on file: ${company.role}
- Stage: ${company.stageLabel || company.stage}
- Priority: ${company.priority}
- Next action on file: ${company.nextAction || "none"}
- Upcoming: ${event.title} with ${withWho} (${when} ET)

## Feedback / My notes

- (none yet — add in War Room Next-round notes)

## Next step prep (updated ${today}): ${nextLabel}

### What this conversation is about

- Waiting on email / Lapo notes. Do not invent.

### What they are likely testing (from ALL feedback so far)

- Fit for ${company.role} at stage ${company.stageLabel || company.stage}
- Shipping judgment under incomplete information

### Lines and stories to land

- Kinage playbooks and cost-to-serve
- Bank trust and eval gates
- TD-style pushback that protected the outcome

### Questions to ask

1. What are you hiring this seat to own in the next 90 days?
2. What is the biggest failure mode on the team right now?
3. If this goes well, who else would I meet and what are those conversations testing?

### Action items before the call

1. Add notes in War Room Next-round notes, then Update next-round doc
2. Rehearse one incomplete-info story

## Interview line to reuse, in their own language

"I'm at my best when the product bar is high and the brief is incomplete. I take partial signal, drive a decision, and keep delivery protected."

## How to read this and what to do with it

Stub until live feedback lands. Research stays first; your notes follow under Feedback. Each Update refreshes only the next-step section.

This is a living document. Add new notes here after every ${company.name} conversation so the next round always has the full picture in one place.
`;
}

function whenLabel(event: PipelineEvent): string {
  if (!event.start) return "Scheduling / TBD";
  return new Date(event.start).toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
}

function todayLabel(): string {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

/** Prefer surgical update when a Brain Co living doc already exists. */
function shouldSurgicalUpdate(
  existingBrief: string | null | undefined,
  force?: boolean,
  hasFreshSignal?: boolean
): boolean {
  if (!existingBrief || looksLikeLegacyPrepDeck(existingBrief)) return false;
  if (!isRichBrief(existingBrief)) return false;
  return Boolean(force || hasFreshSignal);
}

export async function generatePrepDeck(input: PrepGenInput): Promise<{
  text: string;
  source: "claude" | "stub" | "existing";
}> {
  const {
    company,
    event,
    emailContext,
    userUpdate,
    existingBrief,
    force,
    researchBootstrap,
  } = input;

  const hasFreshSignal = Boolean(
    (emailContext && emailContext.trim().length > 40) ||
      (userUpdate && userUpdate.trim().length > 20)
  );

  if (
    existingBrief &&
    isRichBrief(existingBrief) &&
    !force &&
    !hasFreshSignal &&
    !researchBootstrap &&
    !looksLikeLegacyPrepDeck(existingBrief)
  ) {
    return { text: existingBrief, source: "existing" };
  }

  if (!anthropicConfigured()) {
    return {
      text:
        existingBrief && !looksLikeLegacyPrepDeck(existingBrief)
          ? existingBrief
          : stubPrepDeck(company, event),
      source: "stub",
    };
  }

  const when = whenLabel(event);
  const today = todayLabel();
  const withWho = event.with || "TBD";
  const nextHeading =
    withWho !== "TBD"
      ? `Prep for ${withWho}, ${when} ET`
      : `Next step prep (updated ${today})`;

  const bootstrap =
    Boolean(researchBootstrap) ||
    !existingBrief ||
    !isRichBrief(existingBrief) ||
    looksLikeLegacyPrepDeck(existingBrief || "");

  const surgical =
    !bootstrap && shouldSurgicalUpdate(existingBrief, force, hasFreshSignal);

  const domainHint = (company.aliases || []).find((a) =>
    /\./.test(String(a))
  );

  const system = surgical
    ? `You UPDATE an existing living Google Doc for Lapo Odunjo. Do not rewrite from scratch.

Continuous doc identity (keep):
# ${company.name}: Interview Notes and Prep
Keep the company line and role line. This doc stays one continuous living notes file.

ORDER (do not rearrange):
1. Company research (top)
2. Company and contacts
3. Notes / Feedback (Lapo notes AFTER research)
4. Current next-step prep
5. Closing sections

UPDATE RULES:
1. Preserve every prior section that is already history (company research, company/contacts, Notes from …, Feedback added …, interview lines worth keeping).
2. Fold NEW Lapo feedback / email facts into history BELOW research (new "## Feedback added ${today}" or extend company/contacts). Do not drop older feedback. Never put Lapo notes above Company research.
3. There must be exactly ONE current upcoming-prep section. Rename it to:
   ## ${nextHeading}
   Update that section in place with dates, interview title/format, and prep for THIS next conversation. Older "## Prep for …" / "## Next step prep …" content that is no longer the upcoming round moves under a history heading if it still has substance.
4. Ground truth = existing doc + email + Lapo feedback. Do not invent.
5. Brain Co style: readable, short bullets, no tables, no em dashes, no --- rules, no **bold** spam.
6. Prefer a focused edit. Most of the markdown should remain recognizably the same document.
7. Output the FULL updated Markdown document only. No preamble.`
    : `You write accumulating interview notes + next-round prep for Lapo Odunjo.

${STYLE_AND_JOB}

HARD RULES:
- Start with ## Company research (public web + inbox). Put Lapo's notes AFTER research, never before.
- Preserve prior feedback and prior round notes. Do not shrink history into a short summary that drops detail Lapo already captured.
- Refresh the upcoming prep heading to: ## ${nextHeading}
- One current next-step section only.
- Email + Lapo feedback log + web research are ground truth. Do not invent. Mark unknowns.
- Readable Brain Co style. No tables. No em dashes. No --- rules. No **bold** spam.
- Prefer under ~1400 words, but never cut prior feedback to hit a length target.
- Output Markdown only. No preamble.`;

  const user = `${CANDIDATE_CONTEXT}

## Upcoming interview (use for continuous prep title / dates)
Company: ${company.name}
Role: ${company.role}
Likely domain / site hint: ${domainHint || "(none)"}
Interview stage: ${company.stageLabel || company.stage}
When: ${when} ET
With: ${withWho}
Calendar/title: ${event.title}
Target prep heading: ## ${nextHeading}
Mode: ${
    surgical
      ? "surgical UPDATE of existing living doc"
      : bootstrap
        ? "BOOTSTRAP research-first living notes (use web search)"
        : "full living notes create/refresh"
  }

## Email / invite signal
${(emailContext || "").slice(0, surgical ? 2500 : 4000) || "(none)"}

## Newest Lapo feedback to fold in BELOW company research (prior feedback already lives in the current doc)
${(userUpdate || "").slice(0, surgical ? 2800 : 8000) || "(none)"}

## Current living doc (base; edit this)
${(existingBrief || "").slice(0, surgical ? 10000 : 9000) || "(none)"}

${
    surgical
      ? "Update the living document in place now. Keep research first. Keep history. Refresh only the continuous next-interview heading and that prep section plus any new feedback block under research."
      : bootstrap
        ? `Research ${company.name} on the public web (use web_search). Write a research-first living document now: Company research first, then inbox contacts, then any Lapo notes, then next-step prep.`
        : "Write the living document now. Research first. Preserve history. Update the next-step prep section."
  }`;

  try {
    const anthropic = getAnthropic(bootstrap ? 55_000 : 35_000);
    const tools = bootstrap
      ? ([
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: 5,
          },
        ] as unknown as Anthropic.Messages.ToolUnion[])
      : undefined;
    const res = await anthropic.messages.create({
      model: prepModel(surgical ? "update" : "full"),
      // Surgical updates must finish inside the Vercel 60s window.
      max_tokens: surgical ? 3200 : 6000,
      temperature: 0.25,
      system,
      tools,
      messages: [{ role: "user", content: user }],
    });
    const text = res.content
      .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    if (text.length < 400) {
      return {
        text:
          existingBrief && !looksLikeLegacyPrepDeck(existingBrief)
            ? existingBrief
            : stubPrepDeck(company, event),
        source: "stub",
      };
    }
    const cleaned = sanitizePrepMarkdown(text);
    return {
      text: cleaned.endsWith("\n") ? cleaned : `${cleaned}\n`,
      source: "claude",
    };
  } catch {
    return {
      text:
        existingBrief && !looksLikeLegacyPrepDeck(existingBrief)
          ? existingBrief
          : stubPrepDeck(company, event),
      source: "stub",
    };
  }
}

export function sanitizePrepMarkdown(text: string): string {
  return text
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, "-")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^---+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}
