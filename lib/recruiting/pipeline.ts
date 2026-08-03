import type { Pipeline } from "./types";
import pipeline from "../../data/recruiting-pipeline.json";

export const FUNNEL_COLUMNS = [
  { id: "applied", label: "Applied" },
  { id: "first", label: "1st" },
  { id: "second", label: "2nd" },
  { id: "third", label: "3rd" },
  { id: "fourth", label: "4th" },
  { id: "final", label: "Final" },
] as const;

export function getRecruitingPipeline(): Pipeline {
  return pipeline as Pipeline;
}

export function companiesByStage(data: Pipeline) {
  const map: Record<string, Pipeline["companies"]> = {};
  for (const col of FUNNEL_COLUMNS) map[col.id] = [];
  for (const c of data.companies) {
    if (map[c.stage]) map[c.stage].push(c);
    else if (c.stage === "offered") {
      map.final.push(c);
    }
  }
  return map;
}
