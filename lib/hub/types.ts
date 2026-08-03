export const CATEGORIES = [
  "habit",
  "project",
  "writing",
  "life-admin",
  "reading",
  "other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
  habit: "Habit",
  project: "Project",
  writing: "Writing",
  "life-admin": "Life admin",
  reading: "Reading",
  other: "Other",
};

export const STAGES = ["backlog", "active", "done"] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
  backlog: "Backlog",
  active: "Active",
  done: "Done",
};

export type Priority = "P0" | "P1" | "P2";

export type HubItem = {
  id: string;
  category: Category;
  title: string;
  detail?: string;
  stage: Stage;
  priority?: Priority;
  due?: string | null;
  link?: string;
};

export type HubBoard = {
  version: number;
  updated: string;
  timezone: string;
  items: HubItem[];
};
