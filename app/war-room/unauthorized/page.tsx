import type { Metadata } from "next";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import ForceSignOut from "@/components/war-room/ForceSignOut";
import { emailAllowed } from "@/lib/recruiting/access";

export const metadata: Metadata = {
  title: "War Room · Unauthorized",
  robots: { index: false, follow: false },
};

export default async function UnauthorizedPage() {
  const clerkReady =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY) &&
    !String(process.env.CLERK_SECRET_KEY).includes("placeholder");

  if (clerkReady) {
    const user = await currentUser();
    const email =
      user?.primaryEmailAddress?.emailAddress ||
      user?.emailAddresses?.[0]?.emailAddress ||
      null;
    // If someone from Kinage (or any non-allowlisted account) signed in, kick them out.
    if (user && !emailAllowed(email)) {
      return (
        <ForceSignOut reason="Only Lapo's personal account can access this page. Signing out." />
      );
    }
  }

  return (
    <div className="wr-sign">
      <div>
        <h1 className="wr-title">
          Access <span>denied</span>
        </h1>
        <p className="wr-sign-note" style={{ maxWidth: 440 }}>
          This war room is personal — allowlisted to Lapo&apos;s Gmail only. Kinage
          / work accounts cannot sign in.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <Link href="/war-room/sign-in" className="wr-btn">
            Sign in
          </Link>
          <Link href="/" className="wr-btn wr-btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
