import type { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { emailAllowed } from "@/lib/recruiting/access";
import {
  companiesByStage,
  FUNNEL_COLUMNS,
  getRecruitingPipeline,
} from "@/lib/recruiting/pipeline";
import WarRoomBoard from "@/components/war-room/WarRoomBoard";

export const metadata: Metadata = {
  title: "War Room",
  robots: { index: false, follow: false },
};

export default async function WarRoomPage() {
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;

  if (!emailAllowed(email)) {
    redirect("/war-room/unauthorized");
  }

  const pipeline = getRecruitingPipeline();
  const byStage = companiesByStage(pipeline);
  const upcoming = pipeline.events
    .filter((e) => e.status === "scheduled" && e.start)
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <div className="wr-root">
      <header className="wr-top">
        <div>
          <p className="wr-eyebrow">Private · lapoodunjo.com/war-room</p>
          <h1 className="wr-title">
            Recruiting <span>War Room</span>
          </h1>
        </div>
        <div className="wr-top-right">
          <span className="wr-meta">Updated {pipeline.updated}</span>
          <UserButton />
        </div>
      </header>

      <section className="wr-stats">
        {FUNNEL_COLUMNS.map((col) => (
          <div key={col.id} className="wr-stat">
            <div className="wr-stat-label">{col.label}</div>
            <div className="wr-stat-value">{byStage[col.id]?.length ?? 0}</div>
          </div>
        ))}
      </section>

      <WarRoomBoard
        columns={[...FUNNEL_COLUMNS]}
        byStage={byStage}
        upcoming={upcoming}
        companies={pipeline.companies}
        focus={pipeline.focus}
      />

      <p className="wr-foot">
        Interview signals only. Sync from recruiting-season via{" "}
        <code>npm run portfolio:sync</code>. Add Drive folder URLs in pipeline JSON.
      </p>
    </div>
  );
}
