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
  drive?: {
    folderUrl?: string;
    prepUrl?: string;
    note?: string;
  };
};

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
  companies: Company[];
  events: PipelineEvent[];
  driveRootNote?: string;
};
