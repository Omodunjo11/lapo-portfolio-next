import type { Metadata } from "next";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function WarRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkReady =
    Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
    !String(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).includes("placeholder");

  return (
    <div className="wr-shell">
      {clerkReady ? (
        <header className="wr-chrome">
          <Link href="/war-room" className="wr-chrome-brand">
            War Room · personal
          </Link>
          <div className="wr-chrome-actions">
            <Link href="/" className="wr-btn-ghost">
              Home
            </Link>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button type="button" className="wr-btn">
                  Sign in
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Link href="/hub" className="wr-btn-ghost">
                Hub
              </Link>
              <UserButton />
            </Show>
          </div>
        </header>
      ) : null}
      {children}
    </div>
  );
}
