import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { Company } from "./types";

export type ComparisonRow = {
  companyId: string;
  track: string;
  sizeBand: string;
  size: number;
  potential: number;
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

export function rankScore(r: Pick<
  ComparisonRow,
  "fit" | "compound" | "excited" | "potential" | "size"
>): number {
  return (
    r.fit * 2 +
    r.compound * 2 +
    r.excited +
    r.potential -
    Math.max(0, r.size - 7)
  );
}

export function getRecruitingComparison(): ComparisonFile | null {
  const abs = join(process.cwd(), "data", "recruiting-comparison.json");
  if (!existsSync(abs)) return null;
  try {
    return JSON.parse(readFileSync(abs, "utf8")) as ComparisonFile;
  } catch {
    return null;
  }
}

/** Join scored rows to live pipeline companies (stage, Drive, name). */
export function joinComparison(
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
    .filter((r) => {
      const stage = r.company?.stage;
      return stage !== "passed" && stage !== "ghosted";
    })
    .sort((a, b) => b.rank - a.rank);
}
