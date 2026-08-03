import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "War Room · Unauthorized",
  robots: { index: false, follow: false },
};

export default async function UnauthorizedPage() {
  const clerkReady =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    Boolean(process.env.CLERK_SECRET_KEY) &&
    !String(process.env.CLERK_SECRET_KEY).includes("placeholder");

  let SignOut: React.ReactNode = null;
  if (clerkReady) {
    const { SignOutButton } = await import("@clerk/nextjs");
    SignOut = (
      <SignOutButton>
        <button className="wr-btn" type="button">
          Sign out
        </button>
      </SignOutButton>
    );
  }

  return (
    <div className="wr-sign">
      <div>
        <h1 className="wr-title">
          Access <span>denied</span>
        </h1>
        <p className="wr-sign-note" style={{ maxWidth: 420 }}>
          This account isn&apos;t on the allowlist. Use the email in{" "}
          <code>RECRUITING_ALLOWED_EMAILS</code>.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {SignOut}
          <Link href="/" className="wr-btn wr-btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
