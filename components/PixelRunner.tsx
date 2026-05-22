"use client"
import { useEffect, useState } from "react"

// NES-style pixel sprites via box-shadow
// Each "pixel" = 4px block; position = col*4px, row*4px
const P = 4

function px(col: number, row: number, color: string): string {
  return `${col * P}px ${row * P}px 0 0 ${color}`
}

// Terracotta runner — frame A (left leg forward)
function runA(c: string, h: string) {
  return [
    px(3,0,c), px(4,0,c),
    px(2,1,c), px(3,1,c), px(4,1,c), px(5,1,c),
    px(2,2,c), px(3,2,h), px(4,2,h), px(5,2,c),
    px(2,3,c), px(3,3,c), px(4,3,c), px(5,3,c),
    // body
    px(3,4,c), px(4,4,c),
    px(2,5,c), px(3,5,c), px(4,5,c), px(5,5,c),
    px(1,6,c), px(2,6,c), px(3,6,c), px(4,6,c), px(5,6,c), px(6,6,c),
    px(3,7,c), px(4,7,c),
    // legs A
    px(2,8,c), px(5,8,c),
    px(1,9,c), px(5,9,c), px(6,9,c),
    px(0,10,c), px(6,10,c), px(7,10,c),
    px(0,11,c), px(7,11,c),
  ].join(",")
}

// Frame B (right leg forward)
function runB(c: string, h: string) {
  return [
    px(3,0,c), px(4,0,c),
    px(2,1,c), px(3,1,c), px(4,1,c), px(5,1,c),
    px(2,2,c), px(3,2,h), px(4,2,h), px(5,2,c),
    px(2,3,c), px(3,3,c), px(4,3,c), px(5,3,c),
    px(3,4,c), px(4,4,c),
    px(2,5,c), px(3,5,c), px(4,5,c), px(5,5,c),
    px(1,6,c), px(2,6,c), px(3,6,c), px(4,6,c), px(5,6,c), px(6,6,c),
    px(3,7,c), px(4,7,c),
    // legs B (swapped)
    px(2,8,c), px(5,8,c),
    px(2,9,c), px(3,9,c), px(5,9,c),
    px(3,10,c), px(6,10,c),
    px(4,10,c), px(6,11,c), px(7,11,c),
  ].join(",")
}

// Gold chaser — helmet variant, frame A
function chaserA(c: string, h: string) {
  return [
    px(2,0,c), px(3,0,c), px(4,0,c), px(5,0,c),
    px(2,1,c), px(3,1,c), px(4,1,c), px(5,1,c), px(6,1,c),
    px(2,2,c), px(3,2,h), px(4,2,h), px(5,2,c), px(6,2,c),
    px(2,3,c), px(3,3,c), px(4,3,c), px(5,3,c),
    px(3,4,c), px(4,4,c),
    px(2,5,c), px(3,5,c), px(4,5,c), px(5,5,c),
    px(1,6,c), px(2,6,c), px(3,6,c), px(4,6,c), px(5,6,c), px(6,6,c),
    px(3,7,c), px(4,7,c),
    px(2,8,c), px(5,8,c),
    px(1,9,c), px(5,9,c), px(6,9,c),
    px(0,10,c), px(6,10,c), px(7,10,c),
    px(0,11,c), px(7,11,c),
  ].join(",")
}

function chaserB(c: string, h: string) {
  return [
    px(2,0,c), px(3,0,c), px(4,0,c), px(5,0,c),
    px(2,1,c), px(3,1,c), px(4,1,c), px(5,1,c), px(6,1,c),
    px(2,2,c), px(3,2,h), px(4,2,h), px(5,2,c), px(6,2,c),
    px(2,3,c), px(3,3,c), px(4,3,c), px(5,3,c),
    px(3,4,c), px(4,4,c),
    px(2,5,c), px(3,5,c), px(4,5,c), px(5,5,c),
    px(1,6,c), px(2,6,c), px(3,6,c), px(4,6,c), px(5,6,c), px(6,6,c),
    px(3,7,c), px(4,7,c),
    px(2,8,c), px(5,8,c),
    px(2,9,c), px(3,9,c), px(5,9,c),
    px(3,10,c), px(6,10,c),
    px(4,10,c), px(6,11,c), px(7,11,c),
  ].join(",")
}

const css = `
@keyframes runAcross  { 0% { left: -60px; } 100% { left: calc(100% + 60px); } }
@keyframes runAcross2 { 0% { left: -120px;} 100% { left: calc(100% + 20px); } }
@keyframes bounce { 0%,100%{ transform:translateY(0); } 40%{ transform:translateY(-${P}px); } }
@keyframes spriteA {
  0%,49%  { box-shadow: var(--fA); }
  50%,100%{ box-shadow: var(--fB); }
}
@keyframes spriteC {
  0%,49%  { box-shadow: var(--fA); }
  50%,100%{ box-shadow: var(--fB); }
}
`

function Sprite({ fA, fB, run, delay = "0s" }: { fA: string; fB: string; run: string; delay?: string }) {
  return (
    <div style={{ position: "absolute", bottom: 0, animation: `${run} 7s linear infinite`, animationDelay: delay }}>
      <div style={{
        width: P,
        height: P,
        animation: `bounce .32s ${delay} linear infinite, spriteA .32s ${delay} step-end infinite`,
        ["--fA" as string]: fA,
        ["--fB" as string]: fB,
      } as React.CSSProperties} />
    </div>
  )
}

export default function PixelRunner() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const t = "#38BDF8",  th = "#BAE6FD"   // sky blue runner
  const g = "#A78BFA",  gh = "#DDD6FE"  // violet chaser

  return (
    <>
      <style>{css}</style>
      <div style={{ position: "fixed", bottom: 18, left: 0, right: 0, pointerEvents: "none", zIndex: 50, height: P * 13, overflow: "hidden" }}>
        <Sprite fA={chaserA(g, gh)}  fB={chaserB(g, gh)}  run="runAcross2" delay=".6s" />
        <Sprite fA={runA(t, th)}     fB={runB(t, th)}     run="runAcross" />
      </div>
    </>
  )
}
