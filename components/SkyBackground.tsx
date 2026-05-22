// Fixed sky background — cloud radials + subtle world-map grid
// Renders behind all content via z-index: -1
export default function SkyBackground() {
  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}
    >
      {/* Cloud radials */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 72% 48% at 8%   4%,  rgba(186,230,253,.75) 0%, transparent 55%)",
          "radial-gradient(ellipse 55% 38% at 92%  9%,  rgba(221,214,254,.60) 0%, transparent 52%)",
          "radial-gradient(ellipse 50% 35% at 52%  88%, rgba(186,230,253,.40) 0%, transparent 55%)",
          "radial-gradient(ellipse 38% 28% at 72%  44%, rgba(167,139,250,.14) 0%, transparent 48%)",
          "radial-gradient(ellipse 42% 30% at 20%  65%, rgba(134,239,172,.10) 0%, transparent 50%)",
        ].join(","),
      }} />

      {/* World-map grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          "linear-gradient(rgba(125,211,252,.07) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(125,211,252,.07) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "48px 48px",
      }} />

      {/* Soft horizon glow at bottom */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "30%",
        background: "linear-gradient(to top, rgba(221,214,254,.18) 0%, transparent 100%)",
      }} />
    </div>
  )
}
