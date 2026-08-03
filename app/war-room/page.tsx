import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "War Room · Setup",
  robots: { index: false, follow: false },
};

export default function WarRoomPage() {
  const clerkReady =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY) &&
    !String(process.env.CLERK_SECRET_KEY).includes("placeholder");

  if (!clerkReady) {
    return (
      <div className="wr-sign">
        <div>
          <p className="wr-eyebrow">Private</p>
          <h1 className="wr-title">
            War Room <span>setup</span>
          </h1>
          <p className="wr-sign-note" style={{ maxWidth: 460 }}>
            Clerk keys are not on Vercel yet. Public site is up. Add{" "}
            <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
            <code>CLERK_SECRET_KEY</code>, then redeploy.
          </p>
          <Link href="/" className="wr-btn" style={{ display: "inline-block", marginTop: 16 }}>
            Back home
          </Link>
        </div>
      </div>
    );
  }

  // Dynamic import path — real page logic lives in authenticated branch
  return <AuthenticatedWarRoom />;
}

async function AuthenticatedWarRoom() {
  const { currentUser } = await import("@clerk/nextjs/server");
  const { redirect } = await import("next/navigation");
  const { emailAllowed } = await import("@/lib/recruiting/access");
  const {
    companiesByStage,
    FUNNEL_COLUMNS,
    getRecruitingPipeline,
  } = await import("@/lib/recruiting/pipeline");
  const WarRoomBoard = (await import("@/components/war-room/WarRoomBoard")).default;

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;

  if (!user) {
    redirect("/war-room/sign-in");
  }

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
