import type Anthropic from "@anthropic-ai/sdk";
import type { Company, PipelineEvent } from "./types";
import { anthropicConfigured, getAnthropic, prepModel } from "./claude";

const CANDIDATE_CONTEXT = `
Candidate: Onaolapo "Lapo" Odunjo (he/him). Wharton MBA. Product / forward-deployed AI.
Voice: calm, direct, living-notes style. Situation, decision, system, result. No ramble. No fake domain depth.

Proof bank (use the relevant ones; do not invent employers or metrics):
- Kinage: multi-account AI deployment ownership; coached technical delivery; playbooks; 0 to 12 institutions; cost-to-serve about 62 percent down. Emphasize team leverage, not solo heroics.
- Bank / regulated trust: eval gates, precision, production quality bar; field failure modes into Product.
- Judgment under pressure: TD-style pushback. Calm alternative, protected delivery, spoke risk and outcomes not emotion.
- Incomplete-info shipping: incomplete specs, cut scope, ship, measure adoption.
- People leadership honesty: lead by ownership and coaching deployed engineers; do not overclaim formal manager headcount.
- Incomplete-info STAR is drafted. Gov or MENA depth may be thin. Say so if asked.

Do not invent companies, titles, metrics, or interviewer biographies.
`.trim();

export type PrepGenInput = {
  company: Company;
  event: PipelineEvent;
  emailContext?: string | null;
  existingBrief?: string | null;
  /** Regenerate even when an existing brief looks rich. */
  force?: boolean;
};

/** True when brief already matches the living-notes style we want to keep. */
export function isRichBrief(text: string | null | undefined): boolean {
  if (!text) return false;
  if (looksLikeLegacyPrepDeck(text)) return false;
  if (text.length >= 1800) return true;
  return /living notes|action items|how to read this|interview line to reuse/i.test(
    text
  );
}

/** Old Cursor-style decks: tables, em dashes, bold labels, "Five lines to land". */
export function looksLikeLegacyPrepDeck(text: string): boolean {
  if (/Five lines to land|# Now |What they are testing\s*\n\s*\|/i.test(text)) {
    return true;
  }
  if (text.includes("\u2014") || text.includes("**With:**") || text.includes("**When:**")) {
    return true;
  }
  if (/^\|.+\|$/m.test(text) && text.includes("|---")) return true;
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

  return `# ${company.name}: Interview Notes and Prep

Onaolapo (Lapo) Odunjo. Role: ${company.role}. Living notes doc. Stage: ${company.stageLabel || company.stage}.

When: ${when} ET
With: ${event.with || "TBD"}
Calendar: ${event.title}

## Goal for this conversation

- Confirm fit for ${company.role}
- Leave with next step and who you meet next

## What they are testing

- Why ${company.name} specifically, not generic AI interest
- Forward-deployed / shipping ownership proof
- Trust, eval, and production quality bar
- Ambiguity comfort: incomplete info, decision, motion

## Opening (~20 seconds)

Draft a tight opener tied to ${company.name}'s product and your closest proof.

## Stories to have ready

- Kinage scale, playbooks, cost-to-serve
- Bank trust, precision, eval gates
- Judgment under pressure (TD pushback)
- Incomplete-info story

## Questions to ask

1. What are you hiring this seat to own in the next 90 days?
2. What is the biggest failure mode on the team right now?
3. If this goes well, who else would I meet and what are those conversations testing?

## Don't

- Don't wing the loop question
- Don't overclaim domain depth you don't have
- Don't leave without a clear next owner and timing

## Loop map

- This round: ${event.title}${event.with ? ` with ${event.with}` : ""}
- Likely next: TBD. Ask on this call.

## After the call

1. Debrief in War Room
2. Update this doc's loop map
3. Stub next-round prep the same day if a name is known

## Action items

1. Rehearse one incomplete-info story before the call
2. Write down one company-specific why in their language
3. End the call with a clear next owner and timing

This is a living document. Add new notes here after every ${company.name} conversation so the next round always has the full picture in one place.
`;
}

/**
 * Claude-written living-notes prep markdown. Falls back to stub if no key / error.
 */
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
      text: existingBrief && !looksLikeLegacyPrepDeck(existingBrief)
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

  const system = `You write interview prep as living notes for Lapo Odunjo's recruiting War Room.

GOLD STANDARD STYLE (match Brain Co interview notes, not a consulting deck):
- Clean, readable prose and bullet lists.
- Plain Markdown headings and hyphen bullets only.
- No bold, no italic, no asterisk emphasis (** or * for emphasis). Hyphen "-" for list bullets is required.
- No markdown tables. Never.
- No em dashes (the Unicode character). Use commas, periods, colons, or "to" instead.
- No "---" horizontal rules.
- No partner-memo pomp. Write like notes Lapo will reread the morning of the call.

STRUCTURE (use these section headings, in order):
1. Title: "# {Company}: Interview Notes and Prep"
2. One short identity line: "Onaolapo (Lapo) Odunjo. Role: .... Living notes. Stage: ...."
3. Plain meta lines (not bold): When, With, Calendar
4. ## Goal for this conversation
5. ## What they are testing (bullets: each signal, then why it matters in one short clause)
6. ## Opening (~20 seconds) with one quoted opener
7. ## Lines to land (numbered, 4 to 6)
8. ## Stories to have ready (short subsections with Situation / Decision / Result as plain labels, not bold)
9. ## Questions to ask (2 to 4 numbered)
10. ## Don't (bullets)
11. ## Loop map
12. ## Prep bank
13. ## After the call
14. ## Action items
15. Closing line: "This is a living document. Add new notes here after every {Company} conversation so the next round always has the full picture in one place."

Be specific to the company and interview funnel stage. Never reframe "2nd" / "1st" / "Final" as a funding Series. Honest about gaps. Output Markdown only, no preamble, no code fences around the whole doc.`;

  const user = `${CANDIDATE_CONTEXT}

## Target
Company: ${company.name}
Role: ${company.role}
Stage: ${company.stageLabel || company.stage}
(Interview funnel stage, e.g. 1st / 2nd / Final. NOT funding round.)
Priority: ${company.priority}
Next action on file: ${company.nextAction}
When: ${when} ET
With: ${event.with || "TBD"}
Calendar/title: ${event.title}

## Signal email / context (may be empty)
${(emailContext || "").slice(0, 3500) || "(none)"}

## Existing brief (may be empty, stubby, or legacy structured). Rewrite fresh in the living-notes style. Do not preserve tables, bold, or em dashes.
${(existingBrief || "").slice(0, 2500) || "(none, write fresh)"}

Write the prep notes now.`;

  try {
    const anthropic = getAnthropic();
    const res = await anthropic.messages.create({
      model: prepModel(),
      max_tokens: 4096,
      temperature: 0.4,
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

/** Soft cleanup if the model still slips legacy punctuation. */
export function sanitizePrepMarkdown(text: string): string {
  return text
    .replace(/\u2014/g, ",")
    .replace(/\u2013/g, "-")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/^---+$/gm, "")
    .replace(/\n{3,}/g, "\n\n");
}
