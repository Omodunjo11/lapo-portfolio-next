import type { Metadata } from "next";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Private shell for /war-room only.
 * Public portfolio layout stays unchanged (no Geist, no Sign Up on the main site).
 */
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
            War Room
          </Link>
          <div className="wr-chrome-actions">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button type="button" className="wr-btn">
                  Sign in
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </header>
      ) : null}
      {children}
    </div>
  );
}
