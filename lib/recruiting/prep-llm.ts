import type Anthropic from "@anthropic-ai/sdk";
import type { Company, PipelineEvent } from "./types";
import { anthropicConfigured, getAnthropic, prepModel } from "./claude";

/**
 * Gold standard: the Brain Co Google Doc living notes.
 * Readable titles, short bullets, prose judgment, action items.
 * Not a consulting “prep deck” template.
 */
const BRAIN_CO_STYLE_SAMPLE = `
# Brain Co: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: AI Deployment Lead. Living notes doc, add to this after every conversation.

## Company and contacts, from your inbox

- Brain Co. is described as an applied AI startup, founded by Elad Gil and Eric Wu
- Recruiter screen held Monday, August 3, coordinated by Michal, with Alina also involved
- Otter's notetaker was not let into that meeting, so there is no automatic transcript

## Notes from the recruiter screen, August 3

### Culture, what they want to hear

- People work hard because they like the pace, not because of grind for its own sake
- Bias is to never wait: push forward with incomplete information
- This is a lean, strong product org. The AI role sits between or adjacent to that group

### Role shape

- Comfortable with ambiguity
- Able to push forward on small amounts of information
- This is an evergreen seat: an ongoing hiring need, not a one time opening

## Interview line to reuse, in their own language

"I'm at my best in lean, fast environments where the product bar is high and the brief is incomplete. I don't wait for perfect structure. I take partial signal, drive a decision, and keep the work moving."

## How to read this and what to do with it

This reads as a strong, live signal, not a generic pitch. A few things worth noticing:

- The heavy emphasis on ambiguity and "never wait" is the single biggest theme
- Government and Qatar coming up in a recruiter screen suggests a live strategic question
- Evergreen seat, hiring more than one: treat this like an ongoing relationship

## Action items

1. Watch for hiring manager outreach and respond quickly once it lands
2. Prepare one or two specific stories that show deciding and moving with incomplete information
3. Keep your answers short and decisive in tone, since that matches the culture they described

This is a living document. Add new notes here after every Brain Co conversation so the next round always has the full picture in one place.
`.trim();

const CANDIDATE_CONTEXT = `
Candidate: Onaolapo "Lapo" Odunjo (he/him). Wharton MBA. Product / forward-deployed AI.
Voice: calm, specific, readable. Like briefing a sharp friend the night before. Not a template.

Proof bank (use only what is relevant; do not invent employers or metrics):
- Kinage: multi-account AI deployment; playbooks; coached deployed engineers; 0 to 12 institutions; cost-to-serve about 62 percent down. Team leverage, not solo heroics.
- Bank / regulated trust: eval gates, precision, production quality bar; field failure modes into Product.
- Judgment under pressure: TD-style pushback. Calm alternative, protected delivery, spoke to risk and outcomes.
- Incomplete-info shipping: incomplete specs, cut scope, ship, measure adoption.
- Do not overclaim formal manager headcount. Lead by ownership and coaching.
- Gov or MENA depth may be thin. Say so if asked.

Do not invent companies, titles, metrics, or interviewer biographies.
`.trim();

export type PrepGenInput = {
  company: Company;
  event: PipelineEvent;
  emailContext?: string | null;
  existingBrief?: string | null;
  force?: boolean;
};

/** Keep only Brain Co–style living notes. Force-regenerate robotic templates. */
export function isRichBrief(text: string | null | undefined): boolean {
  if (!text) return false;
  if (looksLikeLegacyPrepDeck(text)) return false;
  return (
    /How to read this and what to do with it/i.test(text) &&
    /Action items/i.test(text) &&
    text.length >= 1200
  );
}

/** Old decks + the failed auto template that feels unreadable in Drive. */
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

  return `# ${company.name}: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: ${company.role}. Living notes doc, add to this after every conversation.

## Company and contacts, from your inbox

- Role on file: ${company.role}
- Stage: ${company.stageLabel || company.stage}
- Priority: ${company.priority}
- Next action on file: ${company.nextAction || "none"}
- Upcoming: ${event.title} with ${withWho} (${when} ET)

## Prep for the next conversation

### What matters in this room

- Why ${company.name} specifically, not generic AI interest
- Proof you ship under incomplete information
- Trust and production quality when agents meet real operators
- Calm judgment under pressure

### Interview line to reuse

"I'm at my best when the product bar is high and the brief is incomplete. I take partial signal, drive a decision, and keep delivery protected."

### Stories to keep warm

- Kinage playbooks and cost-to-serve
- Bank trust and eval gates
- TD-style pushback that protected the outcome

### Questions worth asking

1. What are you hiring this seat to own in the next 90 days?
2. What is the biggest failure mode on the team right now?
3. If this goes well, who else would I meet and what are those conversations testing?

## How to read this and what to do with it

This is a stub until Claude can write from live signal. Replace the prep section after the next real conversation with notes in their language, the way the Brain Co doc does.

## Action items

1. Rehearse one incomplete-info story before the call
2. Write one company-specific why in their language
3. Leave with a clear next owner and timing

This is a living document. Add new notes here after every ${company.name} conversation so the next round always has the full picture in one place.
`;
}

export async function generatePrepDeck(input: PrepGenInput): Promise<{
  text: string;
  source: "claude" | "stub" | "existing";
}> {
  const { company, event, emailContext, existingBrief, force } = input;

  if (
    existingBrief &&
    isRichBrief(existingBrief) &&
    !force &&
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

  const system = `You write living interview notes for Lapo Odunjo, matching the Brain Co Google Doc exactly in feel.

GOLD STANDARD (mirror this shape and readability):
${BRAIN_CO_STYLE_SAMPLE}

RULES:
- Real document title: "# {Company}: Interview Notes and Prep"
- Identity line under the title, then useful sections with plain ## and ### titles that a human would write (named after the conversation, theme, or person), not a rigid template checklist.
- Prefer sections like: Company and contacts; Notes from {person/date}; Prep for {upcoming person}; Interview line to reuse; How to read this and what to do with it; Action items.
- Short hyphen bullets. Short prose where judgment helps.
- No markdown tables. No em dashes. No horizontal rules made of ---.
- Do not use "**bold**" spam. Titles carry hierarchy. Occasional plain emphasis in prose is fine without asterisks.
- Do not invent. If signal is thin, say what is known and what is still unknown.
- Interview funnel stage ("2nd", "Final") is not a funding Series.
- End with the living document closing line.
- Under ~800 words. Easy to skim the morning of the call.
- Output Markdown only. No preamble.`;

  const user = `${CANDIDATE_CONTEXT}

## Target
Company: ${company.name}
Role: ${company.role}
Interview stage: ${company.stageLabel || company.stage}
Priority: ${company.priority}
Next action on file: ${company.nextAction}
When: ${when} ET
With: ${event.with || "TBD"}
Calendar/title: ${event.title}

## Signal email / context (may be empty)
${(emailContext || "").slice(0, 3500) || "(none)"}

## Existing notes (may be wrong style). Rewrite into the Brain Co living-notes style. Keep real facts.
${(existingBrief || "").slice(0, 2500) || "(none, write fresh)"}

Write the notes now.`;

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
