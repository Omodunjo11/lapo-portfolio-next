import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, CATEGORY_LABELS, type Category } from "@/lib/hub/types";

export const metadata: Metadata = {
  title: "Hub · Personal OS",
  robots: { index: false, follow: false },
};

export default function HubPage() {
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
            <span>Hub</span>
          </h1>
          <p className="wr-sign-note">
            Your personal OS for everything that isn&apos;t recruiting. Clerk
            isn&apos;t configured yet.
          </p>
          <Link href="/" className="wr-btn" style={{ display: "inline-block", marginTop: 16 }}>
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return <AuthenticatedHub />;
}

async function AuthenticatedHub() {
  const { currentUser } = await import("@clerk/nextjs/server");
  const { redirect } = await import("next/navigation");
  const { emailAllowed } = await import("@/lib/recruiting/access");
  const { getHubBoard, itemsByStage, attentionToday } = await import(
    "@/lib/hub/board"
  );
  const HubBoard = (await import("@/components/hub/HubBoard")).default;

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

  const board = getHubBoard();
  const byStage = itemsByStage(board);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: board.timezone || "America/New_York",
  }).format(new Date());
  const attention = attentionToday(board, today);

  const openItems = board.items.filter((i) => i.stage !== "done");
  const categoryPulse = CATEGORIES.map((cat) => ({
    id: cat as Category,
    label: CATEGORY_LABELS[cat],
    count: openItems.filter((i) => i.category === cat).length,
  })).filter((c) => c.count > 0);

  const activeCount = byStage.active?.length ?? 0;
  const backlogCount = byStage.backlog?.length ?? 0;

  return (
    <div className="wr-root hub-root">
      <header className="hub-hero">
        <div className="hub-hero-copy">
          <p className="wr-eyebrow">Private · personal operating system</p>
          <h1 className="wr-title">
            <span>Hub</span>
          </h1>
          <p className="hub-lede">
            What you&apos;re running outside the recruiting funnel — habits,
            projects, writing, life admin, reading. One board. Three states.
            You decide what gets CPU.
          </p>
        </div>
        <div className="hub-hero-meta">
          <div className="hub-runstat">
            <span className="hub-runstat-val">{activeCount}</span>
            <span className="hub-runstat-lab">in flight</span>
          </div>
          <div className="hub-runstat">
            <span className="hub-runstat-val">{backlogCount}</span>
            <span className="hub-runstat-lab">queued</span>
          </div>
          <span className="wr-meta">Synced {board.updated}</span>
        </div>
      </header>

      {categoryPulse.length > 0 ? (
        <section className="hub-pulse" aria-label="Open work by type">
          {categoryPulse.map((c) => (
            <div key={c.id} className="hub-pulse-chip">
              <span className="hub-pulse-n">{c.count}</span>
              <span className="hub-pulse-lab">{c.label}</span>
            </div>
          ))}
        </section>
      ) : null}

      <HubBoard itemsByStage={byStage} attention={attention} today={today} />
    </div>
  );
}
