"use client"
import Image from "next/image"
import Link from "next/link"

const MAP_LINKS = [
  { href: "/#about",     label: "Story",      icon: "📖", sub: "Origin & lore" },
  { href: "/#work",      label: "Build",      icon: "⚒️", sub: "Quest log" },
  { href: "/projects",   label: "Projects",   icon: "🗺️", sub: "World map" },
  { href: "/experience", label: "Experience", icon: "⚔️", sub: "Battle history" },
  { href: "/writing",    label: "Writing",    icon: "🪶", sub: "Field notes" },
  { href: "/#contact",   label: "Connect",    icon: "🌐", sub: "Start a co-op" },
]

export default function CloudScene() {
  return (
    <>
      {/* ═══════════════════════════════════
          PANEL 1 — Sky scene
          ═══════════════════════════════════ */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          animation: "sceneFadeUp .9s ease both",
        }}
      >
        {/* ── Name + tagline — top centre ── */}
        <div style={{
          position: "absolute",
          top: "clamp(56px,9vh,90px)",
          left: 0, right: 0,
          textAlign: "center",
          zIndex: 10,
          animation: "fadeUp .8s .2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
          padding: "0 20px",
        }}>
          <h1 style={{
            fontFamily: "var(--font-playfair),serif",
            fontWeight: 900,
            fontSize: "clamp(36px,6.5vw,84px)",
            letterSpacing: "-.03em",
            lineHeight: 1,
            margin: 0,
            color: "white",
            textShadow: "0 2px 32px rgba(3,105,161,0.55), 0 1px 6px rgba(0,0,0,0.25)",
          }}>
            Lapo Odunjo.
          </h1>
          <p style={{
            fontFamily: "var(--font-playfair),serif",
            fontStyle: "italic",
            fontSize: "clamp(13px,1.8vw,19px)",
            color: "rgba(255,255,255,0.90)",
            marginTop: 10,
            textShadow: "0 1px 12px rgba(3,105,161,0.45)",
          }}>
            I build AI systems that survive contact with the real world.
          </p>
        </div>

        {/* ── The image — fills the scene ── */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          zIndex: 2,
        }}>
          <Image
            src="/images/cloud-scene.png"
            alt="Three characters on clouds — The Recorder, The Wind Warrior, The Game Master"
            fill
            priority
            style={{
              objectFit: "contain",
              objectPosition: "center bottom",
            }}
          />
        </div>

        {/* ── Scroll hint ── */}
        <div style={{
          position: "absolute",
          bottom: "clamp(14px,3.5vh,28px)",
          left: 0, right: 0,
          textAlign: "center",
          zIndex: 10,
          animation: "fadeIn 1s 1.4s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}>
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{
              fontFamily: "var(--font-dm-mono),monospace",
              fontSize: 8,
              letterSpacing: ".22em",
              color: "rgba(255,255,255,0.65)",
            }}>SCROLL TO EXPLORE</span>
            <div style={{ animation: "scrollBounce 1.8s ease-in-out infinite" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M4 10l5 5 5-5"
                  stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PANEL 2 — World map portal
          ═══════════════════════════════════ */}
      <section id="map" style={{
        background: "rgba(248,250,252,0.55)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(125,211,252,0.35)",
        borderBottom: "1px solid rgba(125,211,252,0.35)",
        padding: "clamp(48px,8vh,96px) clamp(20px,6vw,64px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vh,60px)" }}>
          <div style={{
            fontFamily: "var(--font-dm-mono),monospace",
            fontSize: 8, letterSpacing: ".28em",
            color: "var(--terra)", marginBottom: 10,
          }}>── SELECT A DESTINATION ──</div>
          <h2 style={{
            fontFamily: "var(--font-playfair),serif",
            fontWeight: 900,
            fontSize: "clamp(28px,4vw,52px)",
            letterSpacing: "-.02em",
            lineHeight: 1,
            color: "var(--ink)", margin: 0,
          }}>World Map</h2>
          <div style={{ width: 40, height: 2, background: "var(--terra)", margin: "16px auto 0" }} />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "clamp(12px,2vw,24px)",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {MAP_LINKS.map(({ href, label, icon, sub }) => (
            <Link key={href} href={href}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                padding: "clamp(24px,4vw,40px) 20px",
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(125,211,252,0.35)",
                boxShadow: "0 2px 24px rgba(56,189,248,0.10), 0 1px 4px rgba(15,23,42,0.06)",
                borderRadius: 2,
                transition: "all .22s ease",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.transform = "translateY(-4px)"
                el.style.boxShadow = "0 8px 32px rgba(56,189,248,0.22), 0 2px 8px rgba(15,23,42,0.10)"
                el.style.borderColor = "rgba(125,211,252,0.7)"
                el.style.background = "rgba(255,255,255,0.92)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.transform = "translateY(0)"
                el.style.boxShadow = "0 2px 24px rgba(56,189,248,0.10), 0 1px 4px rgba(15,23,42,0.06)"
                el.style.borderColor = "rgba(125,211,252,0.35)"
                el.style.background = "rgba(255,255,255,0.72)"
              }}
            >
              <span style={{ fontSize: "clamp(28px,3.5vw,40px)", lineHeight: 1 }}>{icon}</span>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  fontFamily: "var(--font-playfair),serif",
                  fontWeight: 700,
                  fontSize: "clamp(15px,1.8vw,20px)",
                  color: "var(--ink)", marginBottom: 4,
                }}>{label}</div>
                <div style={{
                  fontFamily: "var(--font-dm-mono),monospace",
                  fontSize: 8, letterSpacing: ".12em",
                  color: "var(--muted)",
                }}>{sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
