import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hub",
  robots: { index: false, follow: false },
};

export default async function HubPage() {
  const { hasHubSession } = await import("@/lib/security/session");
  const authed = await hasHubSession();

  if (!authed) {
    const HubLogin = (await import("@/components/hub/HubLogin")).default;
    return <HubLogin />;
  }

  const { getHubBoard, itemsByStage, attentionToday } = await import(
    "@/lib/hub/board"
  );
  const HubBoard = (await import("@/components/hub/HubBoard")).default;

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
