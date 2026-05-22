"use client"
import { useEffect, useState, useRef, useCallback } from "react"

type OscType = OscillatorType

function note(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  type: OscType = "square",
  vol = 0.07,
) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = type
  osc.frequency.setValueAtTime(freq, startTime)
  gain.gain.setValueAtTime(vol, startTime)
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
  osc.start(startTime)
  osc.stop(startTime + duration + 0.01)
}

function playCoin(ctx: AudioContext) {
  const t = ctx.currentTime
  note(ctx, 988,  t,       0.07)
  note(ctx, 1319, t + 0.06, 0.14)
}

function playSelect(ctx: AudioContext) {
  const t = ctx.currentTime
  note(ctx, 330, t,       0.05)
  note(ctx, 440, t + 0.05, 0.08)
}

function playAchievement(ctx: AudioContext) {
  const t = ctx.currentTime
  const melody = [523, 659, 784, 1047]
  melody.forEach((f, i) => note(ctx, f, t + i * 0.09, 0.13))
}

function playLevelUp(ctx: AudioContext) {
  const t = ctx.currentTime
  const melody = [392, 523, 659, 784, 1047]
  melody.forEach((f, i) => note(ctx, f, t + i * 0.08, 0.12))
  note(ctx, 1319, t + 0.4, 0.25, "square", 0.09)
}

function playGameOver(ctx: AudioContext) {
  const t = ctx.currentTime
  const melody = [440, 349, 330, 262]
  melody.forEach((f, i) => note(ctx, f, t + i * 0.18, 0.2, "square", 0.06))
}

export default function GameSounds() {
  const [muted, setMuted] = useState(true)
  const ctxRef = useRef<AudioContext | null>(null)
  const lastHover = useRef<EventTarget | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume()
    return ctxRef.current
  }, [])

  useEffect(() => {
    if (muted) return

    const onHover = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button")
      if (el && el !== lastHover.current) {
        lastHover.current = el
        playCoin(getCtx())
      }
      if (!el) lastHover.current = null
    }

    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button")
      if (el) playSelect(getCtx())
    }

    const onAchieve  = () => playAchievement(getCtx())
    const onLevelUp  = () => playLevelUp(getCtx())
    const onGameOver = () => playGameOver(getCtx())

    document.addEventListener("mouseover", onHover)
    document.addEventListener("click", onClick)
    window.addEventListener("game:achievement", onAchieve)
    window.addEventListener("game:levelup", onLevelUp)
    window.addEventListener("game:gameover", onGameOver)

    return () => {
      document.removeEventListener("mouseover", onHover)
      document.removeEventListener("click", onClick)
      window.removeEventListener("game:achievement", onAchieve)
      window.removeEventListener("game:levelup", onLevelUp)
      window.removeEventListener("game:gameover", onGameOver)
    }
  }, [muted, getCtx])

  return (
    <button
      onClick={() => {
        // Resume audio context on first unmute (browser policy)
        if (muted) getCtx()
        setMuted(m => !m)
      }}
      title={muted ? "Enable 8-bit sounds" : "Mute sounds"}
      style={{
        position: "fixed", bottom: 72, right: 20, zIndex: 300,
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: `1px solid ${muted ? "rgba(125,211,252,.25)" : "rgba(125,211,252,.6)"}`,
        color: muted ? "var(--muted)" : "#38BDF8",
        fontFamily: "var(--font-dm-mono),monospace",
        fontSize: 8, letterSpacing: ".12em",
        padding: "7px 11px", cursor: "pointer",
        transition: "all .2s",
        lineHeight: 1,
      }}
    >
      {muted ? "🔇 SFX OFF" : "🔊 SFX ON"}
    </button>
  )
}
