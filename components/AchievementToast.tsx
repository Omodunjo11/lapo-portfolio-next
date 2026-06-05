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

const SESSION_KEY = "lapo_achievements_shown"

function getSessionShown(): Set<number> {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set()
  } catch { return new Set() }
}

function saveSessionShown(set: Set<number>) {
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify([...set])) } catch {}
}

export default function AchievementToast() {
  const [queue, setQueue] = useState<Toast[]>([])
  const shown = useRef<Set<number>>(new Set())

  useEffect(() => {
    // Restore already-seen achievements from this session
    shown.current = getSessionShown()

    // Don't fire anything until the user has been on the page 5s
    let ready = false
    const readyTimer = setTimeout(() => { ready = true }, 5000)

    const fire = (i: number, m: typeof MILESTONES[0]) => {
      shown.current.add(i)
      saveSessionShown(shown.current)
      const toast: Toast = { id: `${i}-${Date.now()}`, ...m }
      setQueue(prev => [...prev, toast])
      window.dispatchEvent(new Event("game:achievement"))
      setTimeout(() => setQueue(prev => prev.filter(t => t.id !== toast.id)), 3800)
    }

    const onScroll = () => {
      if (!ready) return
      const max = document.body.scrollHeight - window.innerHeight
      if (max <= 0) return
      const pct = (window.scrollY / max) * 100
      MILESTONES.forEach((m, i) => {
        if (pct >= m.pct && !shown.current.has(i)) fire(i, m)
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      clearTimeout(readyTimer)
      window.removeEventListener("scroll", onScroll)
    }
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
            background: "rgba(255,255,255,0.90)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(125,211,252,0.55)",
            padding: "12px 14px",
            width: 270,
            animation: "achieveSlide .35s cubic-bezier(.22,1,.36,1) both",
            animationDelay: `${idx * 0.06}s`,
            boxShadow: "0 4px 24px rgba(56,189,248,.18), 0 1px 4px rgba(15,23,42,.08)",
          }}
        >
          <div style={{
            fontFamily: "var(--font-dm-mono),monospace", fontSize: 7,
            letterSpacing: ".22em", color: "#38BDF8", marginBottom: 8,
            animation: "blink .9s step-end infinite",
          }}>
            ◆ ACHIEVEMENT UNLOCKED
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>{t.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "var(--font-dm-mono),monospace", fontSize: 11,
                color: "var(--ink)", fontWeight: 700, marginBottom: 2, letterSpacing: ".04em",
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
