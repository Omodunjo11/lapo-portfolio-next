import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function WarRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="wr-shell">{children}</div>;
}
