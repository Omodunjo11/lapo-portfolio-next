import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hub",
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
            The <span>Hub</span>
          </h1>
          <p className="wr-sign-note">Clerk isn&apos;t configured yet — sign in from /war-room first.</p>
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
  }
  if (!emailAllowed(email)) {
    redirect("/war-room/unauthorized");
  }

  const board = getHubBoard();
  const byStage = itemsByStage(board);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: board.timezone || "America/New_York",
  }).format(new Date());
  const attention = attentionToday(board, today);

  return (
    <div className="wr-root">
      <header className="wr-top">
        <div>
          <p className="wr-eyebrow">Private · lapoodunjo.com/hub</p>
          <h1 className="wr-title">
            The <span>Hub</span>
          </h1>
        </div>
        <div className="wr-top-right">
          <span className="wr-meta">Updated {board.updated}</span>
        </div>
      </header>

      <HubBoard itemsByStage={byStage} attention={attention} today={today} />
    </div>
  );
}
