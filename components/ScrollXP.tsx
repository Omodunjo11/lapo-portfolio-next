"use client"
import { useEffect, useState, useRef } from "react"

const LEVELS = [
  "Newcomer", "Observer", "Curious", "Engaged",
  "Invested", "Deep Dive", "Lore Master", "Final Boss",
]
const TOTAL = LEVELS.length

export default function ScrollXP() {
  const [scrollPct, setScrollPct] = useState(0)
  const [leveledUp, setLeveledUp] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const lastLevel = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = Math.min(99.9, (window.scrollY / max) * 100)
      setScrollPct(pct)

      const newLevel = Math.min(TOTAL - 1, Math.floor(pct / (100 / TOTAL)))
      if (newLevel > lastLevel.current) {
        lastLevel.current = newLevel
        setLeveledUp(true)
        window.dispatchEvent(new Event("game:levelup"))
        setTimeout(() => setLeveledUp(false), 1800)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const level = Math.min(TOTAL - 1, Math.floor(scrollPct / (100 / TOTAL)))
  const segSize = 100 / TOTAL
  const barFill = ((scrollPct % segSize) / segSize) * 100

  return (
    <div
      style={{
        position: "fixed", bottom: 72, left: 16, zIndex: 200,
        pointerEvents: "none",
      }}
    >
      {/* LEVEL UP flash */}
      {leveledUp && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 4px)", left: 0,
          fontFamily: "var(--font-dm-mono),monospace", fontSize: 8,
          color: "var(--gold)", letterSpacing: ".18em",
          animation: "levelUpPop .4s cubic-bezier(.22,1,.36,1) both",
          whiteSpace: "nowrap", pointerEvents: "none",
        }}>
          ▲ LEVEL UP!
        </div>
      )}

      {/* Pip — always visible */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        style={{
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${leveledUp ? "#FDE68A" : "rgba(125,211,252,0.4)"}`,
          padding: expanded ? "7px 11px" : "5px 8px",
          transition: "all .25s cubic-bezier(.22,1,.36,1)",
          overflow: "hidden",
          width: expanded ? 148 : 42,
          pointerEvents: "auto",
          cursor: "default",
        }}
      >
        {/* Collapsed: just LVL number */}
        {!expanded && (
          <div style={{
            fontFamily: "var(--font-dm-mono),monospace",
            fontSize: 7, letterSpacing: ".12em", color: "var(--terra)",
            textAlign: "center",
          }}>
            LV{level + 1}
          </div>
        )}

        {/* Expanded: full widget */}
        {expanded && (
          <>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              fontFamily: "var(--font-dm-mono),monospace", marginBottom: 5,
            }}>
              <span style={{ fontSize: 8, color: "var(--terra)", letterSpacing: ".14em" }}>LVL {level + 1}</span>
              <span style={{ fontSize: 7, color: "var(--muted)", letterSpacing: ".08em" }}>{LEVELS[level]}</span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4,
                  background: i < Math.round(barFill / 10) ? "var(--gold)" : "rgba(255,255,255,0.08)",
                  transition: "background .15s",
                }} />
              ))}
            </div>
            <div style={{
              fontFamily: "var(--font-dm-mono),monospace", fontSize: 6,
              color: "var(--muted)", letterSpacing: ".1em", marginTop: 3, textAlign: "right",
            }}>
              XP {Math.round(barFill)}/100
            </div>
          </>
        )}
      </div>
    </div>
  )
}
