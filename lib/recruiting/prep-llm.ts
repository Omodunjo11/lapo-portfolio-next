import type Anthropic from "@anthropic-ai/sdk";
import type { Company, PipelineEvent } from "./types";
import { anthropicConfigured, getAnthropic, prepModel } from "./claude";

/**
 * READABILITY gold standard: Brain Co Google Doc.
 * JOB: turn email + Lapo's updates into next-round prep (not a static archive).
 */
const STYLE_AND_JOB = `
Write like the Brain Co Google Doc: readable titles, short bullets, clear judgment, action items.
But the PURPOSE is always: prep Lapo for the NEXT interview round.

Primary job (in order):
1. Read the email / calendar signal about who is next and what the conversation is about
2. Fold in notes Lapo already captured (prior rounds, debriefs, updates he shared)
3. Produce a forward brief: what they are likely testing, what to say, stories to warm, questions to ask, action items before that call

Shape example:

# {Company}: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: …. Living notes doc, add to this after every conversation.

## Company and contacts, from your inbox
- Who reached out, role, stage, logos / framing only if known from signal

## What we already know (from prior rounds)
- Short bullets from prior notes / Lapo's updates. Skip this section if there is no prior signal.

## Prep for {Next person}, {date or TBD}
### What this conversation is about
- From the email / invite / Lapo's update (do not invent)

### What they are likely testing
- Tied to role stage and email language

### Lines and stories to land
- 3 to 5 concrete items mapped to Lapo's proof bank

### Questions to ask
- 2 to 4 numbered questions

## Interview line to reuse, in their own language
"…"

## How to read this and what to do with it
- Short judgment paragraph + bullets on what matters for THIS next round

## Action items before the call
1. …
2. …

This is a living document. Add new notes here after every {Company} conversation so the next round always has the full picture in one place.
`.trim();

const CANDIDATE_CONTEXT = `
Candidate: Onaolapo "Lapo" Odunjo (he/him). Wharton MBA. Product / forward-deployed AI.
Voice: calm, specific, readable. Night-before brief for the next call. Not a template. Not a history essay.

Proof bank (use only what is relevant; do not invent employers or metrics):
- Kinage: multi-account AI deployment; playbooks; coached deployed engineers; 0 to 12 institutions; cost-to-serve about 62 percent down. Team leverage, not solo heroics.
- Bank / regulated trust: eval gates, precision, production quality bar; field failure modes into Product.
- Judgment under pressure: TD-style pushback. Calm alternative, protected delivery, spoke to risk and outcomes.
- Incomplete-info shipping: incomplete specs, cut scope, ship, measure adoption.
- Do not overclaim formal manager headcount. Lead by ownership and coaching.
- Gov or MENA depth may be thin. Say so if asked.

Do not invent companies, titles, metrics, interviewer biographies, or what the interview is about. If email does not say, mark it unknown and ask it as a question.
`.trim();

export type PrepGenInput = {
  company: Company;
  event: PipelineEvent;
  emailContext?: string | null;
  /** Fresh notes Lapo shared (debrief, chat update, War Room text). */
  userUpdate?: string | null;
  existingBrief?: string | null;
  force?: boolean;
};

/** Forward prep that names a next conversation and has action items. */
export function isRichBrief(text: string | null | undefined): boolean {
  if (!text) return false;
  if (looksLikeLegacyPrepDeck(text)) return false;
  const hasNextPrep = /## Prep for /i.test(text) || /Action items before/i.test(text);
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
  if (/Prep deck\s*[,:—-]/i.test(text) && !/Interview Notes and Prep/i.test(text)) {
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

  return `# ${company.name}: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: ${company.role}. Living notes doc, add to this after every conversation.

## Company and contacts, from your inbox

- Role on file: ${company.role}
- Stage: ${company.stageLabel || company.stage}
- Priority: ${company.priority}
- Next action on file: ${company.nextAction || "none"}
- Upcoming: ${event.title} with ${withWho} (${when} ET)

## Prep for ${nextLabel}${when !== "TBD" ? `, ${when}` : ""}

### What this conversation is about

- Waiting on email / Lapo update for what they want this round to cover. Do not invent.

### What they are likely testing

- Fit for ${company.role} at stage ${company.stageLabel || company.stage}
- Shipping judgment under incomplete information
- Calm ownership, not solo-hero polish

### Lines and stories to land

- Kinage playbooks and cost-to-serve
- Bank trust and eval gates
- TD-style pushback that protected the outcome

### Questions to ask

1. What are you hiring this seat to own in the next 90 days?
2. What is the biggest failure mode on the team right now?
3. If this goes well, who else would I meet and what are those conversations testing?

## Interview line to reuse, in their own language

"I'm at my best when the product bar is high and the brief is incomplete. I take partial signal, drive a decision, and keep delivery protected."

## How to read this and what to do with it

This is a stub until live email or Lapo's update lands. Once Scan or War Room has signal about the next round, regenerate so the Prep for section names the person and what the conversation is about.

## Action items before the call

1. Paste the latest email or your own update into War Room prep so this brief can be rewritten for the real next round
2. Rehearse one incomplete-info story
3. Leave with a clear next owner and timing

This is a living document. Add new notes here after every ${company.name} conversation so the next round always has the full picture in one place.
`;
}

export async function generatePrepDeck(input: PrepGenInput): Promise<{
  text: string;
  source: "claude" | "stub" | "existing";
}> {
  const { company, event, emailContext, userUpdate, existingBrief, force } =
    input;

  const hasFreshSignal = Boolean(
    (emailContext && emailContext.trim().length > 40) ||
      (userUpdate && userUpdate.trim().length > 20)
  );

  if (
    existingBrief &&
    isRichBrief(existingBrief) &&
    !force &&
    !hasFreshSignal &&
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
    : "Scheduling / TBD";

  const system = `You write next-round interview prep for Lapo Odunjo.

${STYLE_AND_JOB}

HARD RULES:
- The center of the document is "## Prep for {next person or next round}". Everything else supports that.
- Use email + Lapo updates as ground truth for what the next interview is about. Do not invent agenda, product details, or interviewer bios.
- Keep useful prior-round facts under "What we already know". Do not rewrite the whole history as the main event.
- Readable Brain Co style: real ## / ### titles, hyphen bullets, short judgment prose.
- No markdown tables. No em dashes. No --- rules. No **bold** spam.
- Interview funnel stage ("2nd", "Final") is not a funding Series.
- Under ~900 words. Skimmable the morning of the call.
- Output Markdown only. No preamble.`;

  const user = `${CANDIDATE_CONTEXT}

## Target (next round)
Company: ${company.name}
Role: ${company.role}
Interview stage: ${company.stageLabel || company.stage}
Priority: ${company.priority}
Next action on file: ${company.nextAction}
When: ${when} ET
With: ${event.with || "TBD"}
Calendar/title: ${event.title}

## Email / invite signal about the next interview (priority source)
${(emailContext || "").slice(0, 4000) || "(none)"}

## Updates Lapo shared (debrief, chat, War Room). Treat as ground truth.
${(userUpdate || "").slice(0, 4000) || "(none)"}

## Prior living notes (keep facts; rewrite so Prep for next round leads)
${(existingBrief || "").slice(0, 3500) || "(none)"}

Write the next-round prep now.`;

  try {
    const anthropic = getAnthropic();
    const res = await anthropic.messages.create({
      model: prepModel(),
      max_tokens: 4096,
      temperature: 0.35,
      system,
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
