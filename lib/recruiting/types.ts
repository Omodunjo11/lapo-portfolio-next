export type Ball = "you" | "them" | "mutual";
export type Priority = "P0" | "P1" | "P2";
export type FunnelStage =
  | "applied"
  | "first"
  | "second"
  | "third"
  | "fourth"
  | "final"
  | "offered"
  | "passed"
  | "ghosted";

export type Company = {
  id: string;
  name: string;
  role: string;
  stage: FunnelStage;
  stageLabel?: string;
  ball: Ball;
  priority: Priority;
  nextAction: string;
  due: string;
  nudgeDate?: string | null;
  lean?: number | null;
  contacts?: { name: string; email?: string; role?: string }[];
  aliases?: string[];
  paths?: {
    folder?: string;
    notes?: string;
    journal?: string;
  };
  drive?: {
    folderUrl?: string;
    prepUrl?: string;
    note?: string;
  };
};

/** Stages that are still active in the funnel view. */
export const ACTIVE_STAGES = [
  "applied",
  "first",
  "second",
  "third",
  "fourth",
  "final",
  "offered",
] as const;

/** Stages that fall out of the active funnel but stay on record. */
export const ARCHIVE_STAGES = ["passed", "ghosted"] as const;

export const EDITABLE_STAGES = [...ACTIVE_STAGES, ...ARCHIVE_STAGES] as const;

export type PipelineEvent = {
  id: string;
  companyId: string;
  start: string;
  end: string;
  title: string;
  with?: string;
  type?: string;
  status: "scheduled" | "done" | "canceled" | "unscheduled";
  briefPath?: string | null;
  blocker?: string | null;
};

export type Pipeline = {
  version: number;
  owner: string;
  updated: string;
  timezone: string;
  focus: { companyId: string; detail: string }[];
  chase?: {
    companyId: string;
    due: string;
    detail: string;
    draft?: string;
  }[];
  storyGaps?: {
    id: string;
    detail: string;
    neededFor?: string[];
    status?: string;
  }[];
  companies: Company[];
  events: PipelineEvent[];
  driveRootNote?: string;
};
