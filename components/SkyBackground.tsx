"use client"

// Open sky background — endless blue, layered clouds, sense of freedom
// No structures, no silhouettes — just sky and light

export default function SkyBackground() {
  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}
    >

      {/* ── 1. Base sky gradient ── */}
      {/* Deep blue at top, fading through sky → mist → near-white below */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #38A8D4 0%, #7DD3FC 16%, #BAE6FD 34%, #E0F2FE 54%, #F0F9FF 72%, #F8FAFC 86%, #F0EEFF 100%)",
      }} />

      {/* ── 2. Atmospheric side light ── */}
      {/* Keeps the sky from looking flat — subtle glow from upper corners */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 60% 40% at 0%   10%, rgba(186,230,253,.55) 0%, transparent 62%)",
          "radial-gradient(ellipse 50% 35% at 100% 8%,  rgba(221,214,254,.40) 0%, transparent 58%)",
          "radial-gradient(ellipse 80% 18% at 50%  0%,  rgba(56,189,248,.28)  0%, transparent 55%)",
        ].join(","),
      }} />

      {/* ── 3. Sun glow / horizon warmth ── */}
      {/* Warm light near the horizon where sky meets clouds */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 90% 28% at 50% 62%, rgba(253,230,138,.18) 0%, transparent 65%)",
          "radial-gradient(ellipse 60% 18% at 50% 74%, rgba(255,255,255,.50) 0%, transparent 60%)",
        ].join(","),
      }} />

      {/* ── 4. Far cloud floor ── */}
      {/* The deep cloud bank below — gives sense of floating high above */}
      <div style={{
        position: "absolute",
        bottom: "4%", left: "-8%", right: "-8%", height: "42%",
        background: [
          "radial-gradient(ellipse 120% 65% at 50% 100%, rgba(255,255,255,.85) 0%, transparent 55%)",
          "radial-gradient(ellipse 90%  45% at 25% 95%,  rgba(240,249,255,.72) 0%, transparent 55%)",
          "radial-gradient(ellipse 90%  45% at 75% 95%,  rgba(240,249,255,.68) 0%, transparent 55%)",
        ].join(","),
        filter: "blur(6px)",
      }} />

      {/* ── 5. Left cloud cluster ── */}
      <div style={{
        position: "absolute", left: "-2%", top: "14%", width: "36%", height: "22%",
        background: [
          "radial-gradient(ellipse 60% 70% at 25% 55%, rgba(255,255,255,.82) 0%, transparent 65%)",
          "radial-gradient(ellipse 50% 60% at 58% 42%, rgba(255,255,255,.72) 0%, transparent 62%)",
          "radial-gradient(ellipse 38% 50% at 78% 68%, rgba(255,255,255,.62) 0%, transparent 62%)",
          "radial-gradient(ellipse 42% 55% at 12% 38%, rgba(255,255,255,.65) 0%, transparent 62%)",
          "radial-gradient(ellipse 30% 40% at 44% 72%, rgba(255,255,255,.55) 0%, transparent 60%)",
        ].join(","),
        filter: "blur(4px)",
      }} />

      {/* ── 6. Right cloud cluster ── */}
      <div style={{
        position: "absolute", right: "-4%", top: "8%", width: "34%", height: "20%",
        background: [
          "radial-gradient(ellipse 55% 65% at 72% 52%, rgba(255,255,255,.80) 0%, transparent 65%)",
          "radial-gradient(ellipse 45% 55% at 38% 45%, rgba(255,255,255,.68) 0%, transparent 62%)",
          "radial-gradient(ellipse 38% 48% at 58% 72%, rgba(255,255,255,.60) 0%, transparent 62%)",
          "radial-gradient(ellipse 32% 42% at 88% 35%, rgba(255,255,255,.62) 0%, transparent 60%)",
        ].join(","),
        filter: "blur(4px)",
      }} />

      {/* ── 7. Centre-top wispy clouds ── */}
      {/* High altitude cirrus — light and airy */}
      <div style={{
        position: "absolute", left: "22%", top: "5%", width: "56%", height: "16%",
        background: [
          "radial-gradient(ellipse 65% 75% at 50% 50%, rgba(255,255,255,.48) 0%, transparent 68%)",
          "radial-gradient(ellipse 38% 55% at 22% 58%, rgba(255,255,255,.40) 0%, transparent 65%)",
          "radial-gradient(ellipse 38% 55% at 78% 42%, rgba(255,255,255,.40) 0%, transparent 65%)",
        ].join(","),
        filter: "blur(6px)",
      }} />

      {/* ── 8. Mid-sky drifting wisps ── */}
      {/* Loose clouds at mid-height — gives the sky movement and depth */}
      <div style={{
        position: "absolute", left: "8%", top: "32%", width: "22%", height: "10%",
        background: "radial-gradient(ellipse 75% 80% at 45% 55%, rgba(255,255,255,.42) 0%, transparent 68%)",
        filter: "blur(10px)",
      }} />
      <div style={{
        position: "absolute", right: "12%", top: "26%", width: "20%", height: "9%",
        background: "radial-gradient(ellipse 75% 80% at 55% 50%, rgba(255,255,255,.38) 0%, transparent 68%)",
        filter: "blur(10px)",
      }} />
      <div style={{
        position: "absolute", left: "42%", top: "38%", width: "18%", height: "8%",
        background: "radial-gradient(ellipse 80% 75% at 50% 50%, rgba(255,255,255,.32) 0%, transparent 65%)",
        filter: "blur(12px)",
      }} />

      {/* ── 9. World-map / HUD grid ── */}
      {/* Keeps the game-UI feeling — barely visible */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          "linear-gradient(rgba(56,189,248,.05) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(56,189,248,.05) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "48px 48px",
      }} />

      {/* ── 10. Soft vignette ── */}
      {/* Very gentle edge darkening — keeps the eye on the content */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(167,139,250,.08) 100%)",
      }} />

    </div>
  )
}
