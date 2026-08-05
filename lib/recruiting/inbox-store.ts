import type { InboxSnapshot } from "./inbox";
import { commitJsonFile } from "../git-store";
import snapshot from "../../data/recruiting-inbox.json";

const FILE_PATH = "data/recruiting-inbox.json";

export function getRecruitingInbox(): InboxSnapshot {
  const raw = snapshot as {
    scannedAt?: string | null;
    days?: number;
    gmailMatched?: number;
    calendarMatched?: number;
    proposals?: InboxSnapshot["proposals"];
    handledKeys?: string[];
  };
  return {
    scannedAt: raw.scannedAt || "",
    days: raw.days || 7,
    gmailMatched: raw.gmailMatched || 0,
    calendarMatched: raw.calendarMatched || 0,
    proposals: raw.proposals || [],
    handledKeys: raw.handledKeys || [],
  };
}

export async function commitRecruitingInbox(
  next: InboxSnapshot,
  message: string
): Promise<void> {
  await commitJsonFile(FILE_PATH, next, message);
}
