import type { HubBoard, HubItem, Stage } from "./types";
import { STAGES } from "./types";
import board from "../../data/hub.json";

export function getHubBoard(): HubBoard {
  return board as HubBoard;
}

export function itemsByStage(data: HubBoard): Record<Stage, HubItem[]> {
  const map = Object.fromEntries(STAGES.map((s) => [s, [] as HubItem[]])) as Record<
    Stage,
    HubItem[]
  >;
  for (const item of data.items) {
    (map[item.stage] || map.backlog).push(item);
  }
  return map;
}

export function attentionToday(data: HubBoard, todayISO: string): HubItem[] {
  return data.items.filter(
    (i) => i.stage !== "done" && i.due && i.due <= todayISO
  );
}
