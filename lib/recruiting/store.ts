import type { Pipeline } from "./types";
import { commitJsonFile } from "../git-store";

const FILE_PATH = "data/recruiting-pipeline.json";

/** Commit an updated pipeline back to data/recruiting-pipeline.json on `main`. */
export async function commitPipeline(
  next: Pipeline,
  message: string
): Promise<void> {
  await commitJsonFile(FILE_PATH, next, message);
}
