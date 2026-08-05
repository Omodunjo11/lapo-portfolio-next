import type { Pipeline } from "./types";
import { activeCompanies } from "./pipeline";

/** Ball is on them and due passed this many days ago with no update: ghost risk. */
const GHOST_RISK_DAYS = 3;
const DAY_MS = 86_400_000;
const HOUR_MS = 3_600_000;

export type DigestData = {
  today: string;
  upcoming: {
    title: string;
    companyName: string;
    start: string;
    briefPath?: string | null;
  }[];
  yourMove: { name: string; nextAction: string }[];
  nudgesDue: { name: string; nudgeDate: string; nextAction: string }[];
  ghostRisk: { name: string; due: string; daysSilent: number; nextAction: string }[];
  debriefNeeded: { companyName: string; title: string; start: string }[];
  storyGaps: string[];
};

export function buildDigest(
  pipeline: Pipeline,
  todayISO: string,
  nowMs: number
): DigestData {
  const nameOf = (id: string) =>
    pipeline.companies.find((c) => c.id === id)?.name || id;
  const active = activeCompanies(pipeline);

  const upcoming = pipeline.events
    .filter((e) => e.status === "scheduled" && e.start)
    .filter((e) => new Date(e.start).getTime() >= nowMs - HOUR_MS)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 5)
    .map((e) => ({
      title: e.title,
      companyName: nameOf(e.companyId),
      start: e.start,
      briefPath: e.briefPath,
    }));

  const yourMove = active
    .filter((c) => c.ball === "you")
    .map((c) => ({ name: c.name, nextAction: c.nextAction }));

  const nudgesDue = active
    .filter((c) => c.nudgeDate && c.nudgeDate <= todayISO)
    .map((c) => ({
      name: c.name,
      nudgeDate: c.nudgeDate as string,
      nextAction: c.nextAction,
    }));

  const ghostRisk = active
    .filter((c) => c.ball === "them" && c.due)
    .map((c) => ({
      name: c.name,
      due: c.due,
      daysSilent: Math.floor((nowMs - new Date(c.due).getTime()) / DAY_MS),
      nextAction: c.nextAction,
    }))
    .filter((c) => c.daysSilent >= GHOST_RISK_DAYS);

  const debriefNeeded = pipeline.events
    .filter(
      (e) =>
        e.status === "scheduled" &&
        e.start &&
        new Date(e.start).getTime() < nowMs - HOUR_MS
    )
    .map((e) => ({
      companyName: nameOf(e.companyId),
      title: e.title,
      start: e.start,
    }));

  const storyGaps = (pipeline.storyGaps || [])
    .filter((g) => g.status !== "ready" && g.status !== "done")
    .map((g) => g.detail);

  return {
    today: todayISO,
    upcoming,
    yourMove,
    nudgesDue,
    ghostRisk,
    debriefNeeded,
    storyGaps,
  };
}

function whenEt(iso: string, timezone: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDigestEmail(
  d: DigestData,
  timezone: string
): { subject: string; text: string } {
  const isQuiet =
    d.upcoming.length === 0 &&
    d.yourMove.length === 0 &&
    d.nudgesDue.length === 0 &&
    d.ghostRisk.length === 0 &&
    d.debriefNeeded.length === 0;

  const lines: string[] = [];
  lines.push(`War Room digest, ${d.today}`);
  lines.push("");

  if (isQuiet) {
    lines.push("Nothing needs you today. Quiet day.");
  }

  if (d.upcoming.length > 0) {
    lines.push("Today and next");
    for (const e of d.upcoming) {
      const brief = e.briefPath
        ? ` Prep: https://lapoodunjo.com/war-room/brief/${e.briefPath.split("/").pop()?.replace(/\.md$/i, "")}`
        : "";
      lines.push(`- ${e.companyName}, ${whenEt(e.start, timezone)}.${brief}`);
    }
    lines.push("");
  }

  if (d.yourMove.length > 0) {
    lines.push("Your move");
    for (const c of d.yourMove) {
      lines.push(`- ${c.name}: ${c.nextAction}`);
    }
    lines.push("");
  }

  if (d.nudgesDue.length > 0) {
    lines.push("Nudges due");
    for (const c of d.nudgesDue) {
      lines.push(`- ${c.name}, due ${c.nudgeDate}: ${c.nextAction}`);
    }
    lines.push("");
  }

  if (d.ghostRisk.length > 0) {
    lines.push(`Ghost risk (silent ${GHOST_RISK_DAYS}+ days)`);
    for (const c of d.ghostRisk) {
      lines.push(
        `- ${c.name}, ${c.daysSilent} days since ${c.due}: ${c.nextAction}`
      );
    }
    lines.push("");
  }

  if (d.debriefNeeded.length > 0) {
    lines.push("Debrief needed");
    for (const e of d.debriefNeeded) {
      lines.push(`- ${e.companyName}, ${e.title}, ${whenEt(e.start, timezone)}`);
    }
    lines.push("");
  }

  if (d.storyGaps.length > 0) {
    lines.push("Open story gaps");
    for (const g of d.storyGaps) {
      lines.push(`- ${g}`);
    }
    lines.push("");
  }

  lines.push("Full board: https://lapoodunjo.com/war-room");

  const subject = isQuiet
    ? `War Room, ${d.today}: quiet day`
    : `War Room, ${d.today}: ${d.upcoming.length} today, ${d.ghostRisk.length} ghost risk, ${d.nudgesDue.length} nudge due`;

  return { subject, text: lines.join("\n") };
}
