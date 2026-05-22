"use client"
import { useEffect, useState, useRef } from "react"

type Toast = { id: string; icon: string; title: string; desc: string; xp: string }

const MILESTONES: Array<{ pct: number; icon: string; title: string; desc: string; xp: string }> = [
  { pct: 2,  icon: "🎮", title: "New Game+",          desc: "Portfolio loaded successfully",    xp: "+10 XP"  },
  { pct: 18, icon: "🗺️", title: "Lore Unlocked",      desc: "Character backstory discovered",  xp: "+50 XP"  },
  { pct: 38, icon: "🏗️", title: "Build Log Accessed", desc: "Projects section reached",        xp: "+150 XP" },
  { pct: 58, icon: "📜", title: "Side Quest Found",   desc: "Extended lore unlocked",          xp: "+75 XP"  },
  { pct: 78, icon: "🌍", title: "World Traveler",     desc: "36 countries. Still grinding.",   xp: "+200 XP" },
  { pct: 94, icon: "⚔️", title: "Final Boss Reached", desc: "You made it to the end screen",   xp: "+500 XP" },
]

export default function AchievementToast() {
  const [queue, setQueue] = useState<Toast[]>([])
  const shown = useRef(new Set<number>())

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = (window.scrollY / max) * 100

      MILESTONES.forEach((m, i) => {
        if (pct >= m.pct && !shown.current.has(i)) {
          shown.current.add(i)
          const toast: Toast = { id: `${i}-${Date.now()}`, ...m }
          setQueue(prev => [...prev, toast])
          window.dispatchEvent(new Event("game:achievement"))
          setTimeout(() => setQueue(prev => prev.filter(t => t.id !== toast.id)), 3800)
        }
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    // trigger on load for the first one
    setTimeout(onScroll, 1200)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (queue.length === 0) return null

  return (
    <div style={{
      position: "fixed", bottom: 90, right: 20, zIndex: 400,
      display: "flex", flexDirection: "column", gap: 8,
      pointerEvents: "none",
    }}>
      {queue.map((t, idx) => (
        <div
          key={t.id}
          style={{
            background: "var(--ink)",
            border: "2px solid var(--terra)",
            padding: "12px 14px",
            width: 270,
            animation: "achieveSlide .35s cubic-bezier(.22,1,.36,1) both",
            animationDelay: `${idx * 0.06}s`,
            imageRendering: "pixelated",
            boxShadow: "4px 4px 0 rgba(196,98,45,.25)",
          }}
        >
          <div style={{
            fontFamily: "var(--font-dm-mono),monospace", fontSize: 7,
            letterSpacing: ".22em", color: "var(--terra)", marginBottom: 8,
            animation: "blink .9s step-end infinite",
          }}>
            ◆ ACHIEVEMENT UNLOCKED
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>{t.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "var(--font-dm-mono),monospace", fontSize: 11,
                color: "var(--paper)", fontWeight: 700, marginBottom: 2, letterSpacing: ".04em",
              }}>{t.title}</div>
              <div style={{
                fontFamily: "var(--font-dm-mono),monospace", fontSize: 8,
                color: "var(--muted)", letterSpacing: ".06em",
              }}>{t.desc}</div>
            </div>
            <div style={{
              fontFamily: "var(--font-dm-mono),monospace", fontSize: 9,
              color: "var(--gold)", letterSpacing: ".08em", whiteSpace: "nowrap", marginLeft: 4,
            }}>{t.xp}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
