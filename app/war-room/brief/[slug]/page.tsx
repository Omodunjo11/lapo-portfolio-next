import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { readBriefMarkdown } from "@/lib/recruiting/briefs";

export const metadata: Metadata = {
  title: "Brief · War Room",
  robots: { index: false, follow: false },
};

export default async function WarRoomBriefPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clerkReady =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY);

  if (!clerkReady) {
    return (
      <div className="wr-sign">
        <p className="wr-sign-note">Clerk not configured.</p>
      </div>
    );
  }

  const { currentUser } = await import("@clerk/nextjs/server");
  const { emailAllowed } = await import("@/lib/recruiting/access");
  const user = await currentUser();
  const email =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses?.[0]?.emailAddress ||
    null;
  if (!user) redirect("/war-room/sign-in");
  if (!emailAllowed(email)) redirect("/war-room/unauthorized");

  const md = readBriefMarkdown(`briefs/${slug}.md`);
  if (!md) notFound();

  return (
    <div className="wr-root wr-brief-page">
      <header className="wr-top">
        <div>
          <p className="wr-eyebrow">Prep · Now + Next</p>
          <h1 className="wr-title">
            Brief <span>{slug}</span>
          </h1>
        </div>
        <Link href="/war-room" className="wr-btn-ghost">
          ← War Room
        </Link>
      </header>
      <article className="wr-panel wr-brief-body">
        <pre className="wr-brief-md">{md}</pre>
      </article>
    </div>
  );
}
