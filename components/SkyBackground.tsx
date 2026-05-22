"use client"

// Skybound background — inspired by floating-world / sky-city RPG aesthetics
// Pure CSS: no images, no copyright issues, fully accessible
// Layers: sky gradient → atmospheric depth → cloud banks → island silhouettes → grid

export default function SkyBackground() {
  return (
    <div
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}
    >

      {/* ── 1. Base sky gradient ────────────────────────────────────── */}
      {/* Bright blue at top fading to near-white at reading zones */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, #4BAFD6 0%, #7DD3FC 12%, #BAE6FD 28%, #E0F2FE 48%, #F0F9FF 65%, #F8FAFC 80%, #EEF0FF 100%)",
      }} />

      {/* ── 2. Atmospheric side light ───────────────────────────────── */}
      {/* Gives the sky depth and prevents it looking flat */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 55% 35% at 0%   20%, rgba(186,230,253,.50) 0%, transparent 60%)",
          "radial-gradient(ellipse 45% 30% at 100% 15%, rgba(221,214,254,.40) 0%, transparent 58%)",
          "radial-gradient(ellipse 70% 20% at 50%   0%, rgba(56,189,248,.30)  0%, transparent 55%)",
        ].join(","),
      }} />

      {/* ── 3. Sun / horizon glow ───────────────────────────────────── */}
      {/* Warm golden haze near the horizon line — gives the "breaking dawn" */}
      <div style={{
        position: "absolute", inset: 0,
        background: [
          "radial-gradient(ellipse 80% 22% at 50% 68%, rgba(253,230,138,.22) 0%, transparent 65%)",
          "radial-gradient(ellipse 50% 15% at 50% 78%, rgba(255,255,255,.45) 0%, transparent 60%)",
        ].join(","),
      }} />

      {/* ── 4. Deep cloud bank — far horizon ───────────────────────── */}
      {/* The massive cloud floor visible below the floating world */}
      <div style={{
        position: "absolute",
        bottom: "8%", left: "-5%", right: "-5%",
        height: "38%",
        background: [
          "radial-gradient(ellipse 110% 60% at 50% 100%, rgba(255,255,255,.80) 0%, transparent 55%)",
          "radial-gradient(ellipse 80%  40% at 30% 90%,  rgba(240,249,255,.70) 0%, transparent 55%)",
          "radial-gradient(ellipse 80%  40% at 70% 95%,  rgba(240,249,255,.65) 0%, transparent 55%)",
        ].join(","),
        filter: "blur(4px)",
      }} />

      {/* ── 5. Mid-level cloud clusters ─────────────────────────────── */}
      {/* Groups of overlapping radial gradients = convincing cumulus shapes */}
      {/* Left cloud group */}
      <div style={{
        position: "absolute", left: "2%", top: "16%", width: "32%", height: "18%",
        background: [
          "radial-gradient(ellipse 55% 65% at 30% 60%, rgba(255,255,255,.80) 0%, transparent 65%)",
          "radial-gradient(ellipse 45% 55% at 60% 45%, rgba(255,255,255,.70) 0%, transparent 60%)",
          "radial-gradient(ellipse 35% 45% at 80% 70%, rgba(255,255,255,.60) 0%, transparent 60%)",
          "radial-gradient(ellipse 40% 50% at 15% 40%, rgba(255,255,255,.65) 0%, transparent 60%)",
        ].join(","),
        filter: "blur(3px)",
      }} />

      {/* Right cloud group */}
      <div style={{
        position: "absolute", right: "3%", top: "10%", width: "30%", height: "16%",
        background: [
          "radial-gradient(ellipse 50% 60% at 70% 55%, rgba(255,255,255,.75) 0%, transparent 65%)",
          "radial-gradient(ellipse 40% 50% at 35% 45%, rgba(255,255,255,.65) 0%, transparent 60%)",
          "radial-gradient(ellipse 35% 45% at 55% 75%, rgba(255,255,255,.60) 0%, transparent 60%)",
        ].join(","),
        filter: "blur(3px)",
      }} />

      {/* Center-high cloud wisps */}
      <div style={{
        position: "absolute", left: "28%", top: "7%", width: "44%", height: "14%",
        background: [
          "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(255,255,255,.55) 0%, transparent 65%)",
          "radial-gradient(ellipse 35% 50% at 25% 60%, rgba(255,255,255,.45) 0%, transparent 60%)",
          "radial-gradient(ellipse 35% 50% at 75% 40%, rgba(255,255,255,.45) 0%, transparent 60%)",
        ].join(","),
        filter: "blur(5px)",
      }} />

      {/* ── 6. Floating island silhouettes ──────────────────────────── */}
      {/* Very low opacity, distant, blue-gray toned — just barely there */}

      {/* Main centre island (largest, most prominent but still subtle) */}
      <div style={{ position: "absolute", left: "50%", top: "14%", transform: "translateX(-50%)", opacity: 0.10 }}>
        <svg width="320" height="140" viewBox="0 0 320 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Island base */}
          <ellipse cx="160" cy="110" rx="155" ry="28" fill="#1E3A5F" />
          {/* Island body */}
          <path d="M 30 110 Q 60 55 110 38 Q 160 24 210 38 Q 260 54 292 110 Z" fill="#1E3A5F" />
          {/* Rock formations */}
          <path d="M 80 80 Q 90 60 105 58 Q 118 58 124 75 Z" fill="#162D47" opacity="0.8" />
          <path d="M 195 75 Q 202 56 218 54 Q 232 56 236 72 Z" fill="#162D47" opacity="0.8" />
          {/* Central tower silhouette */}
          <rect x="148" y="10" width="24" height="34" rx="3" fill="#1E3A5F" opacity="0.85" />
          <path d="M 148 10 L 160 0 L 172 10 Z" fill="#1E3A5F" opacity="0.9" />
          {/* Platform ring */}
          <rect x="120" y="38" width="80" height="6" rx="2" fill="#1E3A5F" opacity="0.7" />
          {/* Wing struts */}
          <rect x="64"  y="44" width="58" height="4" rx="2" fill="#1E3A5F" opacity="0.6" />
          <rect x="198" y="44" width="58" height="4" rx="2" fill="#1E3A5F" opacity="0.6" />
          {/* Hanging roots */}
          <path d="M 100 110 Q 105 128 108 138" stroke="#1E3A5F" strokeWidth="2.5" opacity="0.5" fill="none" />
          <path d="M 130 115 Q 133 130 134 140" stroke="#1E3A5F" strokeWidth="2"   opacity="0.4" fill="none" />
          <path d="M 160 118 Q 162 132 163 140" stroke="#1E3A5F" strokeWidth="2"   opacity="0.4" fill="none" />
          <path d="M 190 115 Q 192 128 194 138" stroke="#1E3A5F" strokeWidth="2"   opacity="0.4" fill="none" />
          <path d="M 218 110 Q 222 127 225 138" stroke="#1E3A5F" strokeWidth="2.5" opacity="0.5" fill="none" />
        </svg>
      </div>

      {/* Small left island — further away, more faint */}
      <div style={{ position: "absolute", left: "9%", top: "24%", opacity: 0.072 }}>
        <svg width="180" height="75" viewBox="0 0 180 75" fill="none">
          <ellipse cx="90" cy="58" rx="85" ry="16" fill="#1E3A5F" />
          <path d="M 20 58 Q 50 24 90 18 Q 130 14 162 58 Z" fill="#1E3A5F" />
          <rect x="84" y="6" width="12" height="18" rx="2" fill="#1E3A5F" opacity="0.75" />
          <path d="M 84 6 L 90 0 L 96 6 Z" fill="#1E3A5F" opacity="0.8" />
          <path d="M 60 58 Q 63 70 64 75" stroke="#1E3A5F" strokeWidth="2" opacity="0.45" fill="none" />
          <path d="M 90 62 Q 92 72 92 75" stroke="#1E3A5F" strokeWidth="1.5" opacity="0.38" fill="none" />
          <path d="M 118 58 Q 120 69 121 75" stroke="#1E3A5F" strokeWidth="2" opacity="0.45" fill="none" />
        </svg>
      </div>

      {/* Small right island */}
      <div style={{ position: "absolute", right: "8%", top: "18%", opacity: 0.065 }}>
        <svg width="140" height="60" viewBox="0 0 140 60" fill="none">
          <ellipse cx="70" cy="46" rx="66" ry="13" fill="#1E3A5F" />
          <path d="M 14 46 Q 35 18 70 13 Q 105 10 128 46 Z" fill="#1E3A5F" />
          <rect x="64" y="4" width="12" height="14" rx="2" fill="#1E3A5F" opacity="0.7" />
          <path d="M 44 46 Q 47 58 48 60" stroke="#1E3A5F" strokeWidth="1.5" opacity="0.4" fill="none" />
          <path d="M 72 50 Q 73 58 74 60" stroke="#1E3A5F" strokeWidth="1.5" opacity="0.35" fill="none" />
          <path d="M 98 46 Q 100 57 101 60" stroke="#1E3A5F" strokeWidth="1.5" opacity="0.4" fill="none" />
        </svg>
      </div>

      {/* Tiny far-right speck — extreme distance */}
      <div style={{ position: "absolute", right: "22%", top: "15%", opacity: 0.055 }}>
        <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
          <ellipse cx="35" cy="24" rx="32" ry="8" fill="#1E3A5F" />
          <path d="M 8 24 Q 20 8 35 6 Q 50 5 62 24 Z" fill="#1E3A5F" />
          <rect x="32" y="1" width="6" height="8" rx="1" fill="#1E3A5F" opacity="0.7" />
        </svg>
      </div>

      {/* ── 7. Foreground cloud wisps (partially obscure islands) ────── */}
      {/* Makes the islands look like they're floating in clouds */}
      <div style={{
        position: "absolute", left: "-2%", top: "28%", width: "35%", height: "12%",
        background: "radial-gradient(ellipse 70% 80% at 40% 60%, rgba(255,255,255,.60) 0%, transparent 65%)",
        filter: "blur(8px)",
      }} />
      <div style={{
        position: "absolute", right: "-2%", top: "22%", width: "28%", height: "10%",
        background: "radial-gradient(ellipse 70% 80% at 60% 55%, rgba(255,255,255,.55) 0%, transparent 65%)",
        filter: "blur(8px)",
      }} />
      <div style={{
        position: "absolute", left: "25%", top: "30%", width: "50%", height: "8%",
        background: "radial-gradient(ellipse 80% 90% at 50% 50%, rgba(255,255,255,.38) 0%, transparent 65%)",
        filter: "blur(12px)",
      }} />

      {/* ── 8. World-map / HUD grid ─────────────────────────────────── */}
      {/* Very subtle — keeps the game UI feeling without noise */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: [
          "linear-gradient(rgba(56,189,248,.055) 1px, transparent 1px)",
          "linear-gradient(90deg, rgba(56,189,248,.055) 1px, transparent 1px)",
        ].join(","),
        backgroundSize: "48px 48px",
      }} />

      {/* ── 9. Edge vignette ─────────────────────────────────────────── */}
      {/* Soft lavender fade at corners — keeps focus on content center */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(167,139,250,.10) 100%)",
      }} />

    </div>
  )
}
