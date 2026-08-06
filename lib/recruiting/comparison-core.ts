import type { Company } from "./types";
import { ARCHIVE_STAGES } from "./types";

export type ComparisonRow = {
  companyId: string;
  track: string;
  sizeBand: string;
  size: number;
  potential: number;
  /** Company outcome optionality: liquidity / brand / path clarity (1–10). */
  exit: number;
  fit: number;
  compound: number;
  /** How keen they seem to advance Lapo (1–10). */
  excited: number;
  excitedWhy: string;
  why: string;
  watch: string;
};

export type ComparisonFile = {
  updated: string;
  formula: string;
  note?: string;
  memo: {
    topDeploy: string[];
    bestCoS: string;
    deprioritize: string[];
    offerPressure: string;
    evidence: string[];
    summary: string;
  };
  rows: ComparisonRow[];
};

export type RankedComparisonRow = ComparisonRow & {
  rank: number;
  company: Company | null;
};

export type JoinedComparison = {
  active: RankedComparisonRow[];
  archived: RankedComparisonRow[];
};

function isArchivedStage(stage: string | undefined | null): boolean {
  return Boolean(
    stage && (ARCHIVE_STAGES as readonly string[]).includes(stage)
  );
}

export function rankScore(
  r: Pick<
    ComparisonRow,
    "fit" | "compound" | "excited" | "potential" | "exit" | "size"
  >
): number {
  return (
    r.fit * 2 +
    r.compound * 2 +
    r.excited +
    r.potential +
    r.exit -
    Math.max(0, r.size - 7)
  );
}

function toRanked(
  file: ComparisonFile,
  companies: Company[]
): RankedComparisonRow[] {
  const byId = new Map(companies.map((c) => [c.id, c]));
  return file.rows
    .map((r) => ({
      ...r,
      rank: rankScore(r),
      company: byId.get(r.companyId) || null,
    }))
    .sort((a, b) => b.rank - a.rank);
}

/**
 * Join scored rows to live pipeline companies.
 * Active ranking excludes passed/ghosted; those go in `archived`.
 * Active pipeline companies missing from the scorefile still appear
 * (provisional row) so discovery shows up before a full rebuild.
 */
export function joinComparison(
  file: ComparisonFile,
  companies: Company[]
): JoinedComparison {
  const have = new Set(file.rows.map((r) => r.companyId));
  const provisional: ComparisonRow[] = companies
    .filter(
      (c) =>
        !have.has(c.id) &&
        c.stage !== "passed" &&
        c.stage !== "ghosted"
    )
    .map((c) => ({
      companyId: c.id,
      track: "TBD",
      sizeBand: "Unknown, approx",
      size: 3,
      potential: 5,
      exit: 4,
      fit: 5,
      compound: 5,
      excited: 6,
      excitedWhy: "Just added — scoring from research pending or in progress.",
      why: `${c.name} is on the board but not yet in the scored comparison file.`,
      watch: "Wait for scan/research score, then refine.",
    }));

  const merged: ComparisonFile = {
    ...file,
    rows: [...file.rows, ...provisional],
  };
  const ranked = toRanked(merged, companies);
  const active: RankedComparisonRow[] = [];
  const archived: RankedComparisonRow[] = [];

  for (const r of ranked) {
    if (isArchivedStage(r.company?.stage)) archived.push(r);
    else active.push(r);
  }

  return { active, archived };
}
