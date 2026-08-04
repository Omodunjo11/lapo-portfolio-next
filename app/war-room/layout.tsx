import type { Metadata } from "next";
import PrivateChrome from "@/components/private/PrivateChrome";

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
      {clerkReady ? <PrivateChrome active="war-room" /> : null}
      {children}
    </div>
  );
}
