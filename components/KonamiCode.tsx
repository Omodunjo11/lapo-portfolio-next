"use client"
import { useEffect, useState } from "react"

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"]

export default function KonamiCode() {
  const [idx, setIdx] = useState(0)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx]) {
        const next = idx + 1
        if (next === KONAMI.length) {
          setShow(true)
          setIdx(0)
          setTimeout(() => setShow(false), 4000)
        } else {
          setIdx(next)
        }
      } else {
        setIdx(0)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [idx])

  if (!show) return null

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(13,13,13,.92)", backdropFilter: "blur(8px)",
      animation: "fadeIn .3s ease",
    }}
      onClick={() => setShow(false)}
    >
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{
          fontFamily: "var(--font-syne),sans-serif", fontSize: 10, letterSpacing: ".3em",
          textTransform: "uppercase", color: "var(--gold)", marginBottom: 16,
          border: "1px solid var(--gold)", padding: "4px 16px", display: "inline-block", borderRadius: 2,
        }}>
          ◆ Achievement Unlocked
        </div>
        <h2 style={{
          fontFamily: "var(--font-playfair),serif", fontSize: "clamp(28px,5vw,56px)",
          fontWeight: 900, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 16,
        }}>
          You found<br /><em style={{ color: "var(--terra)", fontStyle: "italic" }}>the easter egg.</em>
        </h2>
        <p style={{ fontSize: 13, color: "rgba(245,240,232,.6)", maxWidth: 380, margin: "0 auto 24px", lineHeight: 1.7 }}>
          Lagos raised me. Bradford sharpened me. Columbia proved it.<br />
          Wharton confirmed it. The game is still going.
        </p>
        <p style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)" }}>
          ↑↑↓↓←→←→BA · Classic.
        </p>
        <p style={{ fontSize: 9, color: "rgba(245,240,232,.3)", marginTop: 32, letterSpacing: ".1em" }}>
          click anywhere to close
        </p>
      </div>
    </div>
  )
}
