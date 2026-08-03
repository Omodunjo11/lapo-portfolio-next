import type { Metadata } from "next";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "War Room · Unauthorized",
  robots: { index: false, follow: false },
};

export default function UnauthorizedPage() {
  return (
    <div className="wr-sign">
      <div>
        <h1 className="wr-title">
          Access <span>denied</span>
        </h1>
        <p className="wr-sign-note" style={{ maxWidth: 420 }}>
          This account isn&apos;t on the allowlist. Sign out and use the email
          configured in <code>RECRUITING_ALLOWED_EMAILS</code>.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <SignOutButton>
            <button className="wr-btn" type="button">
              Sign out
            </button>
          </SignOutButton>
          <Link href="/" className="wr-btn wr-btn-ghost">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
