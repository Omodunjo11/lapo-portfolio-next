"use client"

// Anime sky background — joyful, free, expansive
// Rich blue sky, volumetric white clouds with highlight + shadow,
// strong sun glow, slow cloud drift animation

export default function SkyBackground() {
  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}
    >

      {/* ── 1. Rich sky gradient ── */}
      {/* Deep vivid blue at top, opening to light horizon below */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #0369A1 0%, #0EA5E9 10%, #38BDF8 26%, #7DD3FC 46%, #BAE6FD 64%, #E0F2FE 80%, #F0F9FF 94%, #F8FAFC 100%)",
      }} />

      {/* ── 2. Sun glow — upper right, strong like the anime ref ── */}
      {/* The bright light source that makes everything feel warm and alive */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 55% 45% at 78% 5%,  rgba(255,255,255,.80) 0%, rgba(186,230,253,.40) 35%, transparent 65%)",
          "radial-gradient(ellipse 35% 30% at 78% 3%,  rgba(255,255,255,.95) 0%, transparent 45%)",
          "radial-gradient(ellipse 90% 35% at 50% 0%,  rgba(56,189,248,.35)  0%, transparent 60%)",
        ].join(","),
      }} />

      {/* ── 3. Horizon brightness ── */}
      {/* The glowing horizon line where the sky opens up */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 100% 22% at 50% 58%, rgba(255,255,255,.55) 0%, transparent 65%)",
          "radial-gradient(ellipse  70% 14% at 50% 65%, rgba(240,249,255,.70) 0%, transparent 60%)",
        ].join(","),
      }} />

      {/* ── 4. Far cloud bank — the big cumulus at the horizon ── */}
      {/* Sits in the upper-mid zone, bright white tops */}
      <div style={{
        position: "absolute",
        left: "-5%", top: "12%", right: "-5%", height: "40%",
        background: [
          // Bright white tops (sun hits here)
          "radial-gradient(ellipse 50% 35% at 20% 30%, rgba(255,255,255,.92) 0%, transparent 55%)",
          "radial-gradient(ellipse 45% 32% at 48% 22%, rgba(255,255,255,.88) 0%, transparent 52%)",
          "radial-gradient(ellipse 38% 28% at 72% 35%, rgba(255,255,255,.85) 0%, transparent 52%)",
          "radial-gradient(ellipse 30% 22% at 88% 25%, rgba(255,255,255,.80) 0%, transparent 50%)",
          // Body fill
          "radial-gradient(ellipse 60% 55% at 25% 55%, rgba(255,255,255,.75) 0%, transparent 60%)",
          "radial-gradient(ellipse 55% 50% at 55% 60%, rgba(255,255,255,.70) 0%, transparent 58%)",
          "radial-gradient(ellipse 48% 45% at 80% 58%, rgba(255,255,255,.68) 0%, transparent 58%)",
          // Shadow undersides (blue-tinted — key to the anime look)
          "radial-gradient(ellipse 55% 25% at 22% 88%, rgba(147,197,253,.55) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 22% at 52% 90%, rgba(147,197,253,.50) 0%, transparent 52%)",
          "radial-gradient(ellipse 44% 20% at 78% 88%, rgba(147,197,253,.48) 0%, transparent 52%)",
        ].join(","),
        filter: "blur(3px)",
        animation: "cloudDriftL 90s linear infinite alternate",
      }} />

      {/* ── 5. Left foreground cloud cluster ── */}
      {/* The big dramatic cloud mass on the left — like image 3 */}
      <div style={{
        position: "absolute",
        left: "-8%", top: "22%", width: "42%", height: "30%",
        background: [
          // Bright highlights
          "radial-gradient(ellipse 45% 40% at 40% 18%, rgba(255,255,255,.95) 0%, transparent 52%)",
          "radial-gradient(ellipse 35% 32% at 65% 12%, rgba(255,255,255,.90) 0%, transparent 48%)",
          "radial-gradient(ellipse 28% 25% at 20% 22%, rgba(255,255,255,.88) 0%, transparent 48%)",
          // Body
          "radial-gradient(ellipse 62% 58% at 38% 52%, rgba(255,255,255,.82) 0%, transparent 60%)",
          "radial-gradient(ellipse 50% 48% at 68% 48%, rgba(255,255,255,.78) 0%, transparent 58%)",
          "radial-gradient(ellipse 42% 40% at 15% 55%, rgba(255,255,255,.75) 0%, transparent 58%)",
          // Shadow (blue-gray underside)
          "radial-gradient(ellipse 58% 28% at 35% 85%, rgba(125,211,252,.50) 0%, transparent 55%)",
          "radial-gradient(ellipse 50% 24% at 65% 88%, rgba(125,211,252,.45) 0%, transparent 52%)",
          "radial-gradient(ellipse 35% 20% at 10% 90%, rgba(147,197,253,.42) 0%, transparent 50%)",
        ].join(","),
        filter: "blur(2px)",
        animation: "cloudDriftL 120s linear infinite alternate",
      }} />

      {/* ── 6. Right cloud cluster ── */}
      <div style={{
        position: "absolute",
        right: "-6%", top: "16%", width: "38%", height: "28%",
        background: [
          "radial-gradient(ellipse 42% 38% at 60% 18%, rgba(255,255,255,.92) 0%, transparent 52%)",
          "radial-gradient(ellipse 32% 28% at 30% 14%, rgba(255,255,255,.88) 0%, transparent 48%)",
          "radial-gradient(ellipse 55% 52% at 55% 55%, rgba(255,255,255,.80) 0%, transparent 60%)",
          "radial-gradient(ellipse 42% 45% at 25% 52%, rgba(255,255,255,.76) 0%, transparent 58%)",
          "radial-gradient(ellipse 48% 22% at 58% 85%, rgba(125,211,252,.48) 0%, transparent 52%)",
          "radial-gradient(ellipse 38% 20% at 28% 88%, rgba(147,197,253,.44) 0%, transparent 50%)",
        ].join(","),
        filter: "blur(2px)",
        animation: "cloudDriftR 100s linear infinite alternate",
      }} />

      {/* ── 7. High altitude wisps — cirrus, near the sun ── */}
      {/* Light streaky clouds up high, catching the light */}
      <div style={{
        position: "absolute", left: "15%", top: "4%", width: "55%", height: "14%",
        background: [
          "radial-gradient(ellipse 70% 80% at 50% 45%, rgba(255,255,255,.52) 0%, transparent 65%)",
          "radial-gradient(ellipse 40% 60% at 20% 55%, rgba(255,255,255,.42) 0%, transparent 62%)",
          "radial-gradient(ellipse 40% 60% at 80% 40%, rgba(255,255,255,.42) 0%, transparent 62%)",
        ].join(","),
        filter: "blur(7px)",
        animation: "cloudDriftS 150s linear infinite alternate",
      }} />

      {/* ── 8. Lower scattered clouds ── */}
      {/* Smaller puffs in the lower reading zone — subtle, not busy */}
      <div style={{
        position: "absolute", left: "5%", top: "52%", width: "25%", height: "12%",
        background: [
          "radial-gradient(ellipse 65% 65% at 45% 45%, rgba(255,255,255,.38) 0%, transparent 62%)",
          "radial-gradient(ellipse 45% 45% at 70% 55%, rgba(255,255,255,.30) 0%, transparent 58%)",
          "radial-gradient(ellipse 50% 22% at 50% 85%, rgba(186,230,253,.28) 0%, transparent 55%)",
        ].join(","),
        filter: "blur(10px)",
      }} />
      <div style={{
        position: "absolute", right: "8%", top: "46%", width: "22%", height: "10%",
        background: [
          "radial-gradient(ellipse 65% 65% at 55% 45%, rgba(255,255,255,.32) 0%, transparent 62%)",
          "radial-gradient(ellipse 45% 22% at 50% 85%, rgba(186,230,253,.25) 0%, transparent 55%)",
        ].join(","),
        filter: "blur(10px)",
      }} />

      {/* ── 9. Light ray streaks from sun ── */}
      {/* Very subtle crepuscular rays from the upper-right sun */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "conic-gradient(from 200deg at 78% 3%, transparent 0deg, rgba(255,255,255,.04) 3deg, transparent 6deg, rgba(255,255,255,.03) 10deg, transparent 14deg, rgba(255,255,255,.04) 18deg, transparent 22deg)",
        ].join(","),
        opacity: 0.7,
      }} />

      {/* ── 10. World-map / HUD grid ── */}
      {/* Faint game-UI grid — barely there */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "48px 48px",
      }} />

    </div>
  )
}
