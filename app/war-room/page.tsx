import type { Metadata } from "next";
import Link from "next/link";
import type { BoardPrefs } from "@/lib/recruiting/board";

export const metadata: Metadata = {
  title: "War Room",
  robots: { index: false, follow: false },
};

/** Always serve fresh board + comparison markup (no stale dual-panel RSC cache). */
export const dynamic = "force-dynamic";

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
    FUNNEL_COLUMNS,
    loadWritablePipeline,
  } = await import("@/lib/recruiting/pipeline");
  const { allSuggestions } = await import("@/lib/recruiting/flags");
  const { getRecruitingInbox } = await import("@/lib/recruiting/inbox-store");
  const { gmailConfigured } = await import("@/lib/recruiting/gmail/client");
  const {
    getRecruitingComparison,
    joinComparison,
  } = await import("@/lib/recruiting/comparison");
  const WarRoomBoard = (await import("@/components/war-room/WarRoomBoard")).default;
  const WarRoomComparison = (
    await import("@/components/war-room/WarRoomComparison")
  ).default;

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

  // Prefer GitHub main so moves (e.g. Sierra → Passed) show in comparison without redeploy.
  const pipeline = await loadWritablePipeline();
  const byStage = companiesByStage(pipeline);
  const suggestions = allSuggestions(pipeline, dismissed);
  const inbox = getRecruitingInbox();
  const activeIds = new Set(
    pipeline.companies
      .filter((c) => c.stage !== "passed" && c.stage !== "ghosted")
      .map((c) => c.id)
  );
  const upcoming = pipeline.events
    .filter(
      (e) =>
        e.status === "scheduled" &&
        e.start &&
        activeIds.has(e.companyId)
    )
    .sort((a, b) => a.start.localeCompare(b.start));
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: pipeline.timezone || "America/New_York",
  }).format(new Date());
  const archived = archivedCompanies(pipeline);
  const comparison = getRecruitingComparison();
  const comparisonRows = comparison
    ? joinComparison(comparison, pipeline.companies)
    : { active: [], archived: [] };

  const chaseActive = (pipeline.chase || []).filter((c) =>
    activeIds.has(c.companyId)
  );

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
            {comparison ? ` · Compare ${comparison.updated}` : ""}
          </span>
          {pipeline.driveRootUrl ? (
            <a
              className="wr-btn"
              href={pipeline.driveRootUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: 12 }}
            >
              Drive
            </a>
          ) : null}
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
        chase={chaseActive}
        archived={archived}
        today={today}
        initialSuggestions={suggestions}
        gmailReady={gmailConfigured()}
        lastScanAt={inbox.scannedAt || null}
        driveRootUrl={pipeline.driveRootUrl}
        recentEvents={pipeline.events.filter(
          (e) => e.status === "scheduled" || e.status === "done"
        )}
      />

      {comparison ? (
        <WarRoomComparison comparison={comparison} rows={comparisonRows} />
      ) : null}

      <p className="wr-foot">
        Stages only move when you Accept a flag or drag a card. Live stage on Fit
        comparison reads GitHub main, so Passed moves off the ranking without a
        redeploy. New companies get Claude research scores on Scan and appear in
        the table immediately.
      </p>
    </div>
  );
}
