import type { HubBoard } from "./types";
import { commitJsonFile } from "../git-store";

const FILE_PATH = "data/hub.json";

/** Commit an updated board back to data/hub.json on `main`. */
export async function commitHubBoard(
  next: HubBoard,
  message: string
): Promise<void> {
  await commitJsonFile(FILE_PATH, next, message);
}
