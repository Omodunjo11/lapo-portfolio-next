import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { ComparisonFile } from "./comparison-core";

export type {
  ComparisonRow,
  ComparisonFile,
  RankedComparisonRow,
  JoinedComparison,
} from "./comparison-core";
export { rankScore, joinComparison } from "./comparison-core";

export function getRecruitingComparison(): ComparisonFile | null {
  const abs = join(process.cwd(), "data", "recruiting-comparison.json");
  if (!existsSync(abs)) return null;
  try {
    return JSON.parse(readFileSync(abs, "utf8")) as ComparisonFile;
  } catch {
    return null;
  }
}
