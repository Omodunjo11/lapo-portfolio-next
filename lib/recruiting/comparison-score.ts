import Anthropic from "@anthropic-ai/sdk";
import type { Company } from "./types";
import { anthropicConfigured, getAnthropic, prepModel } from "./claude";
import type { ComparisonFile, ComparisonRow } from "./comparison";
import { rankScore } from "./comparison";

/** Neutral stub until Claude scores — still shows in the table. */
export function provisionalComparisonRow(company: Company): ComparisonRow {
  return {
    companyId: company.id,
    track: "TBD",
    sizeBand: "Unknown, approx",
    size: 3,
    potential: 5,
    exit: 4,
    fit: 5,
    compound: 5,
    excited: 6,
    excitedWhy:
      "Interview scheduled — process interest shown; scoring pending research.",
    why: `${company.name} just entered the pipeline. Scores are provisional until research lands.`,
    watch: "Claude research will refine Fit / Compound / Excited / Exit.",
  };
}

export function companiesMissingComparison(
  file: ComparisonFile,
  companies: Company[]
): Company[] {
  const have = new Set(file.rows.map((r) => r.companyId));
  return companies.filter(
    (c) =>
      !have.has(c.id) &&
      c.stage !== "passed" &&
      c.stage !== "ghosted"
  );
}

/**
 * Ensure every active pipeline company has a comparison row.
 * Returns a new file object when rows were added.
 */
export function ensureComparisonCoverage(
  file: ComparisonFile,
  companies: Company[]
): { file: ComparisonFile; added: ComparisonRow[] } {
  const missing = companiesMissingComparison(file, companies);
  if (!missing.length) return { file, added: [] };
  const added = missing.map(provisionalComparisonRow);
  return {
    file: {
      ...file,
      updated: new Date().toISOString().slice(0, 10),
      rows: [...file.rows, ...added],
    },
    added,
  };
}

function clampScore(n: unknown, fallback: number): number {
  const v = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.max(1, Math.min(10, Math.round(v)));
}

export async function scoreCompanyForComparison(opts: {
  company: Company;
  emailContext?: string | null;
  existing?: ComparisonRow | null;
}): Promise<ComparisonRow> {
  const stub = provisionalComparisonRow(opts.company);
  if (!anthropicConfigured()) return opts.existing || stub;

  const domainHint = (opts.company.aliases || []).find((a) => /\./.test(String(a)));
  const system = `You score one recruiting-target company for Lapo Odunjo's Fit comparison table.
Return ONLY a JSON object (no markdown fence) with keys:
companyId, track, sizeBand, size, potential, exit, fit, compound, excited, excitedWhy, why, watch.

Rules:
- Integers 1–10 for size, potential, exit, fit, compound, excited.
- track: one of "Deploy", "PM", "CoS", "Deploy/PM", or similar short label.
- Excited = how keen THEY seem to advance Lapo (calendar speed, seniority, chase burden), not Lapo's preference.
- Exit = company outcome optionality (liquidity / brand / path clarity). Thin data → lower Exit; do not invent funding rounds.
- Ground in web research + inbox signal. Mark thin data honestly in why/watch.
- companyId must be exactly "${opts.company.id}".
- Keep excitedWhy, why, watch each under 160 characters.`;

  const user = `Company: ${opts.company.name} (id ${opts.company.id})
Role on file: ${opts.company.role || "(blank)"}
Stage: ${opts.company.stageLabel || opts.company.stage}
Next action: ${opts.company.nextAction || "(none)"}
Domain hint: ${domainHint || "(none)"}

## Inbox / calendar signal
${(opts.emailContext || "").slice(0, 3500) || "(none)"}

## Prior provisional row (improve, do not ignore process signal)
${JSON.stringify(opts.existing || stub, null, 2)}

Use web_search for public facts about ${opts.company.name}. Then output the JSON scores.`;

  try {
    const anthropic = getAnthropic(50_000);
    const res = await anthropic.messages.create({
      model: prepModel("full"),
      max_tokens: 1200,
      temperature: 0.2,
      system,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
          max_uses: 4,
        } as unknown as Anthropic.Messages.ToolUnion,
      ],
      messages: [{ role: "user", content: user }],
    });
    const text = res.content
      .filter((b): b is Anthropic.Messages.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return opts.existing || stub;
    const parsed = JSON.parse(jsonMatch[0]) as Partial<ComparisonRow>;
    const row: ComparisonRow = {
      companyId: opts.company.id,
      track: String(parsed.track || stub.track).slice(0, 40),
      sizeBand: String(parsed.sizeBand || stub.sizeBand).slice(0, 60),
      size: clampScore(parsed.size, stub.size),
      potential: clampScore(parsed.potential, stub.potential),
      exit: clampScore(parsed.exit, stub.exit),
      fit: clampScore(parsed.fit, stub.fit),
      compound: clampScore(parsed.compound, stub.compound),
      excited: clampScore(parsed.excited, stub.excited),
      excitedWhy: String(parsed.excitedWhy || stub.excitedWhy).slice(0, 200),
      why: String(parsed.why || stub.why).slice(0, 220),
      watch: String(parsed.watch || stub.watch).slice(0, 220),
    };
    // Touch rank path so bad data is obvious in logs.
    void rankScore(row);
    return row;
  } catch {
    return opts.existing || stub;
  }
}

/** Add missing active companies into the comparison file; optionally Claude-score them. */
export async function upsertComparisonForCompanies(
  file: ComparisonFile,
  companies: Company[],
  opts: {
    emailByCompany?: Record<string, string>;
    /** Claude + web_search per new row. Off for inbox scan (timeouts). */
    score?: boolean;
  } = {}
): Promise<{ file: ComparisonFile; added: ComparisonRow[]; scored: number }> {
  const covered = ensureComparisonCoverage(file, companies);
  let next = covered.file;
  let scored = 0;

  if (opts.score === false) {
    return { file: next, added: covered.added, scored: 0 };
  }

  const targets = companiesMissingComparison(file, companies);
  // After ensure, targets are the ones that were missing — score those rows.
  for (const company of targets) {
    const idx = next.rows.findIndex((r) => r.companyId === company.id);
    if (idx < 0) continue;
    const scoredRow = await scoreCompanyForComparison({
      company,
      emailContext: opts.emailByCompany?.[company.id] || null,
      existing: next.rows[idx],
    });
    next = {
      ...next,
      rows: next.rows.map((r, i) => (i === idx ? scoredRow : r)),
      updated: new Date().toISOString().slice(0, 10),
    };
    scored += 1;
  }

  return { file: next, added: covered.added, scored };
}
