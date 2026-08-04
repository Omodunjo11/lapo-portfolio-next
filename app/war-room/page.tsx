import type { Metadata } from "next";
import Link from "next/link";
import type { BoardPrefs } from "@/lib/recruiting/board";

export const metadata: Metadata = {
  title: "War Room",
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

  return <AuthenticatedWarRoom />;
}

async function AuthenticatedWarRoom() {
  const { currentUser } = await import("@clerk/nextjs/server");
  const { redirect } = await import("next/navigation");
  const { emailAllowed } = await import("@/lib/recruiting/access");
  const {
    companiesByStage,
    archivedCompanies,
    attentionToday,
    FUNNEL_COLUMNS,
    getRecruitingPipeline,
  } = await import("@/lib/recruiting/pipeline");
  const { allSuggestions } = await import("@/lib/recruiting/flags");
  const { getRecruitingInbox } = await import("@/lib/recruiting/inbox-store");
  const { gmailConfigured } = await import("@/lib/recruiting/gmail/client");
  const WarRoomBoard = (await import("@/components/war-room/WarRoomBoard")).default;

  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;

  if (!user) {
    redirect("/war-room/sign-in");
    return null;
  }
  if (!emailAllowed(email)) {
    redirect("/war-room/unauthorized");
    return null;
  }

  const prefs = (user.privateMetadata?.recruitingBoard || {}) as Partial<BoardPrefs>;
  const dismissed = prefs.dismissedSuggestionIds || [];

  const pipeline = getRecruitingPipeline();
  const byStage = companiesByStage(pipeline);
  const suggestions = allSuggestions(pipeline, dismissed);
  const inbox = getRecruitingInbox();
  const upcoming = pipeline.events
    .filter((e) => e.status === "scheduled" && e.start)
    .sort((a, b) => a.start.localeCompare(b.start));
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: pipeline.timezone || "America/New_York",
  }).format(new Date());
  const archived = archivedCompanies(pipeline);
  const attention = attentionToday(pipeline, today);

  return (
    <div className="wr-root">
      <header className="wr-top">
        <div>
          <p className="wr-eyebrow">Private · recruiting command center</p>
          <h1 className="wr-title">
            Recruiting <span>War Room</span>
          </h1>
        </div>
        <div className="wr-top-right">
          <span className="wr-meta">
            Pipeline {pipeline.updated}
            {inbox.scannedAt
              ? ` · Inbox ${new Date(inbox.scannedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}`
              : ""}
          </span>
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
        initialCompanies={pipeline.companies}
        upcoming={upcoming}
        focus={pipeline.focus}
        chase={pipeline.chase || []}
        archived={archived}
        attention={attention}
        today={today}
        initialSuggestions={suggestions}
        gmailReady={gmailConfigured()}
        lastScanAt={inbox.scannedAt || null}
        recentEvents={pipeline.events.filter(
          (e) => e.status === "scheduled" || e.status === "done"
        )}
      />

      <p className="wr-foot">
        Scan inbox anytime (button). Site cron runs daily 8am ET; Mac LaunchAgent
        still proposes every ~3h locally. Calendar facts can auto-update; stages
        only move when you Accept a flag or drag a card.
      </p>
    </div>
  );
}
