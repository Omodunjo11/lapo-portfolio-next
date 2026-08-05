import type Anthropic from "@anthropic-ai/sdk";
import type { Company, PipelineEvent } from "./types";
import { anthropicConfigured, getAnthropic, prepModel } from "./claude";

const CANDIDATE_CONTEXT = `
Candidate: Onaolapo "Lapo" Odunjo (he/him). Wharton MBA. Product / forward-deployed AI.
Voice: calm, crisp, structured. Situation, then decision, then system, then result. No ramble. No fake domain depth.

Proof bank (use the relevant ones; do not invent employers or metrics):
- Kinage: multi-account AI deployment ownership; coached technical delivery; playbooks; 0 to 12 institutions; cost-to-serve down about 62 percent. Emphasize team leverage, not solo heroics.
- Bank / regulated trust: eval gates, precision, production quality bar; field failure modes into Product.
- Judgment under pressure: TD-style pushback. Calm alternative, protected delivery, spoke to risk and outcomes, not emotion.
- Incomplete-info shipping: incomplete specs, cut scope, ship, measure adoption.
- People leadership honesty: lead by ownership and coaching deployed engineers; do not overclaim formal manager headcount.
- Incomplete-info STAR is drafted; gov/MENA depth may be thin, say so if asked.

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

export function isRichBrief(text: string | null | undefined): boolean {
  if (!text) return false;
  if (text.length >= 2200) return true;
  return /what .+ is testing|five lines to land|90 day|stories to have ready/i.test(
    text
  );
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

  return `# ${company.name}, prep deck

When: ${when} ET
With: ${event.with || "TBD"}
Role: ${company.role}
Stage: ${company.stageLabel || company.stage}
Title: ${event.title}

---

# Now, this interview

## Goal for this call
- Confirm fit for ${company.role}
- Leave with next step and who you meet next

## 5 talking points
1. Why ${company.name} specifically, not generic AI interest
2. Forward-deployed / shipping ownership proof
3. Trust, eval, and production quality bar
4. Ambiguity comfort, incomplete info leading to a decision and motion
5. What "good" looks like in the first 90 days

## Opening (~20s)
Draft a tight opener tied to ${company.name}'s product and your closest proof.

## Stories to have ready
- Kinage scale, playbooks, cost-to-serve
- Bank trust, precision, eval
- Judgment under pressure (TD pushback)
- Incomplete-info story

## 3 questions to ask
1. What are you hiring this seat to own in the next 90 days?
2. What's the biggest failure mode on the team right now?
3. If this goes well, who else would I meet and what are those conversations testing?

## Don't
- Don't wing the loop question
- Don't overclaim domain depth you don't have
- Don't leave without a clear next owner and timing

---

# Next, loop and future rounds

## Loop map
- This round: ${event.title}${event.with ? ` with ${event.with}` : ""}
- Likely next: TBD, ask on this call

## After the call
1. Debrief in War Room
2. Update this doc's Loop map
3. Stub next-round prep the same day if a name is known
`;
}

/**
 * Claude-written Now+Next prep markdown. Falls back to stub if no key / error.
 */
export async function generatePrepDeck(input: PrepGenInput): Promise<{
  text: string;
  source: "claude" | "stub" | "existing";
}> {
  const { company, event, emailContext, existingBrief, force } = input;

  if (existingBrief && isRichBrief(existingBrief) && !force) {
    return { text: existingBrief, source: "existing" };
  }

  if (!anthropicConfigured()) {
    return {
      text: existingBrief || stubPrepDeck(company, event),
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

  const system = `You write interview prep decks for Lapo Odunjo's recruiting War Room.
Output GitHub-flavored Markdown only, no preamble, no code fences around the whole doc.
Mirror the quality bar of a sharp partner memo: specific, rehearsable, honest about gaps.

Writing style, follow exactly:
- No em dashes. Use a period, comma, or "to" instead of "—" or "--".
- No bold or italic emphasis (no **text** or *text*). Section headers (#, ##) are fine; plain "- " bullets are fine.
- No markdown tables. Write "what they are testing" as a plain bullet list (point, then why it matters, on one line or two).
- Plain prose paragraphs and simple bullet lists, not dense jargon-heavy fragments. Write like you're briefing a smart colleague, not filling out a template.

Structure MUST include these top-level sections in order:
1. Title line + meta (When / With / Role / Stage / Title)
2. "# Now, this interview" with Goal, What they are testing (bullet list), Opening (~20s, quoted), Points to land, Stories to have ready, Questions (2-4), Don't
3. "# Next, loop and future rounds" with Loop map, Prep bank, After the call
Keep it under ~900 words. Plain ASCII punctuation only.`;

  const user = `${CANDIDATE_CONTEXT}

## Target
Company: ${company.name}
Role: ${company.role}
Stage: ${company.stageLabel || company.stage}
Priority: ${company.priority}
Next action on file: ${company.nextAction}
When: ${when} ET
With: ${event.with || "TBD"}
Calendar/title: ${event.title}

## Signal email / context (may be empty)
${(emailContext || "").slice(0, 3500) || "(none)"}

## Existing brief to improve (may be empty or stubby)
${(existingBrief || "").slice(0, 2500) || "(none — write fresh)"}

Write the prep deck now.`;

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
        text: existingBrief || stubPrepDeck(company, event),
        source: "stub",
      };
    }
    return { text: text.endsWith("\n") ? text : `${text}\n`, source: "claude" };
  } catch {
    return {
      text: existingBrief || stubPrepDeck(company, event),
      source: "stub",
    };
  }
}
