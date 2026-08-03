import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "War Room · Sign in",
  robots: { index: false, follow: false },
};

export default async function WarRoomSignInPage() {
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
            Recruiting <span>War Room</span>
          </h1>
          <p className="wr-sign-note">
            Auth is not configured yet. Add Clerk keys on Vercel, then return here.
          </p>
          <Link href="/" className="wr-btn" style={{ display: "inline-block", marginTop: 16 }}>
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const { SignIn } = await import("@clerk/nextjs");
  return (
    <div className="wr-sign">
      <div>
        <p className="wr-eyebrow">Private</p>
        <h1 className="wr-title" style={{ marginBottom: 24 }}>
          Recruiting <span>War Room</span>
        </h1>
        <SignIn
          routing="path"
          path="/war-room/sign-in"
          forceRedirectUrl="/war-room"
        />
        <p className="wr-sign-note">
          Personal login only. Set password in Clerk — never commit it to the repo.
        </p>
      </div>
    </div>
  );
}
