"use client"
import { useEffect, useState, useRef } from "react"

export default function ContinueScreen() {
  const [visible, setVisible]     = useState(false)
  const [count, setCount]         = useState(9)
  const [dismissed, setDismissed] = useState(false)
  const [exiting, setExiting]     = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Exit-intent: mouse leaves toward top of viewport
  // Only arms after 20s on page so it doesn't fire on quick bounces
  useEffect(() => {
    if (dismissed) return

    let armed = false
    const armTimer = setTimeout(() => { armed = true }, 20000)

    const onMouseLeave = (e: MouseEvent) => {
      if (!armed || dismissed) return
      if (e.clientY <= 8) {
        setVisible(true)
        window.dispatchEvent(new Event("game:gameover"))
      }
    }

    document.addEventListener("mouseleave", onMouseLeave)
    return () => {
      clearTimeout(armTimer)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [dismissed])

  // Countdown — auto-continues when it hits 0
  useEffect(() => {
    if (!visible || dismissed) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(9)
    timerRef.current = setInterval(() => {
      setCount(c => {
        if (c <= 1) {
          clearInterval(timerRef.current ?? undefined)
          handleContinue()
          return 9
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current ?? undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  function handleContinue() {
    setExiting(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
      setVisible(false)
      setExiting(false)
      setCount(9)
    }, 300)
  }

  function handleNo() {
    setDismissed(true)
    setVisible(false)
  }

  if (!visible && !exiting) return null

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(10,18,40,0.96)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        animation: exiting ? "fadeOut .3s ease both" : "fadeIn .4s ease both",
      }}
    >
      {/* Scanlines on overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.18) 3px,rgba(0,0,0,0.18) 4px)",
      }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* GAME OVER */}
        <div style={{
          fontFamily: "var(--font-dm-mono),monospace",
          fontSize: 9, letterSpacing: ".35em",
          color: "var(--terra)", marginBottom: 20,
          animation: "blink .9s step-end infinite",
        }}>
          ── GAME OVER ──
        </div>

        <div style={{
          fontFamily: "var(--font-playfair),serif",
          fontWeight: 900, lineHeight: 1,
          fontSize: "clamp(48px,9vw,100px)",
          color: "var(--paper)",
          letterSpacing: "-.03em",
          marginBottom: 12,
        }}>
          CONTINUE?
        </div>

        {/* Score */}
        <div style={{
          fontFamily: "var(--font-dm-mono),monospace",
          fontSize: 10, letterSpacing: ".2em",
          color: "var(--muted)", marginBottom: 36,
        }}>
          SCORE: 99,999 &nbsp;·&nbsp; RANK: S+
        </div>

        {/* Countdown */}
        <div style={{
          fontFamily: "var(--font-playfair),serif",
          fontWeight: 900,
          fontSize: "clamp(64px,14vw,140px)",
          color: count <= 3 ? "#e05c3a" : "var(--gold)",
          lineHeight: 1, marginBottom: 48,
          animation: "blink .5s step-end infinite",
          transition: "color .3s",
        }}>
          {count}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            onClick={handleContinue}
            style={{
              background: "var(--terra)", color: "var(--paper)",
              border: "none", padding: "14px 36px",
              fontFamily: "var(--font-dm-mono),monospace",
              fontSize: 10, letterSpacing: ".2em",
              cursor: "pointer", transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e0734a")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--terra)")}
          >
            ▶ YES
          </button>
          <button
            onClick={handleNo}
            style={{
              background: "transparent", color: "var(--muted)",
              border: "1px solid rgba(255,255,255,.18)",
              padding: "14px 36px",
              fontFamily: "var(--font-dm-mono),monospace",
              fontSize: 10, letterSpacing: ".2em",
              cursor: "pointer", transition: "all .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.4)" }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.18)" }}
          >
            NO
          </button>
        </div>

        <div style={{
          fontFamily: "var(--font-dm-mono),monospace",
          fontSize: 7, letterSpacing: ".14em",
          color: "rgba(255,255,255,.2)", marginTop: 24,
        }}>
          AUTO-CONTINUE IN {count}s · ↑↑↓↓←→←→BA FOR EASTER EGG
        </div>
      </div>
    </div>
  )
}
