"use client"
import { useEffect, useState } from "react"

// Pixel art frames using box-shadow (each pixel = 3px)
// Character 1: running figure in terracotta
// Character 2: chasing figure slightly behind

const style = `
@keyframes runAcross {
  0%   { left: -60px; }
  100% { left: calc(100% + 60px); }
}
@keyframes runAcross2 {
  0%   { left: -120px; }
  100% { left: calc(100% + 10px); }
}
@keyframes legA {
  0%,100% { transform: rotate(20deg); }
  50%      { transform: rotate(-20deg); }
}
@keyframes legB {
  0%,100% { transform: rotate(-20deg); }
  50%      { transform: rotate(20deg); }
}
@keyframes armA {
  0%,100% { transform: rotate(-30deg); }
  50%      { transform: rotate(30deg); }
}
@keyframes bounce {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-3px); }
}
`

function Figure({ color, size = 1 }: { color: string; size?: number }) {
  const s = size
  return (
    <div style={{ position: "relative", width: 14 * s, height: 24 * s, animation: `bounce .32s linear infinite` }}>
      {/* Head */}
      <div style={{ position: "absolute", top: 0, left: 4 * s, width: 6 * s, height: 6 * s, background: color, borderRadius: "50%" }} />
      {/* Body */}
      <div style={{ position: "absolute", top: 7 * s, left: 5 * s, width: 4 * s, height: 7 * s, background: color }} />
      {/* Left arm */}
      <div style={{ position: "absolute", top: 8 * s, left: 2 * s, width: 3 * s, height: 1.5 * s, background: color, transformOrigin: "right center", animation: `armA .32s linear infinite` }} />
      {/* Right arm */}
      <div style={{ position: "absolute", top: 8 * s, left: 9 * s, width: 3 * s, height: 1.5 * s, background: color, transformOrigin: "left center", animation: `legA .32s linear infinite` }} />
      {/* Left leg */}
      <div style={{ position: "absolute", top: 14 * s, left: 4 * s, width: 2 * s, height: 6 * s, background: color, transformOrigin: "top center", animation: `legA .32s linear infinite` }} />
      {/* Right leg */}
      <div style={{ position: "absolute", top: 14 * s, left: 8 * s, width: 2 * s, height: 6 * s, background: color, transformOrigin: "top center", animation: `legB .32s linear infinite` }} />
    </div>
  )
}

export default function PixelRunner() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <>
      <style>{style}</style>
      {/* Fixed to bottom of viewport, runs continuously */}
      <div style={{
        position: "fixed",
        bottom: 18,
        left: 0,
        right: 0,
        pointerEvents: "none",
        zIndex: 50,
        height: 32,
        overflow: "hidden",
      }}>
        {/* Chaser (slightly behind, gold) */}
        <div style={{
          position: "absolute",
          bottom: 0,
          animation: "runAcross2 7s linear infinite",
          animationDelay: ".6s",
          display: "flex",
          alignItems: "flex-end",
          gap: 0,
        }}>
          <Figure color="var(--gold)" />
        </div>

        {/* Runner (front, terracotta) */}
        <div style={{
          position: "absolute",
          bottom: 0,
          animation: "runAcross 7s linear infinite",
          display: "flex",
          alignItems: "flex-end",
        }}>
          <Figure color="var(--terra)" />
        </div>
      </div>
    </>
  )
}
