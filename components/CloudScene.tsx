"use client"
import Link from "next/link"
import { CANONICAL_NAME, INTENT_CTA, PROFILE_LINKS, ROLE_TITLE } from "@/lib/site"

/* ─────────────────────────────────────────────
   CloudScene
   Full-screen sky splash with three animated
   Black boy silhouette characters on clouds.
   ───────────────────────────────────────────── */

// Shared colours for silhouettes
const SKIN  = "#1a0a00"   // deep brown/black silhouette
const SHIRT = "#0F172A"   // near-black body
const SKIN2 = "#2d1200"   // slightly lighter — catches light

/* ── Reader character (left cloud) ──
   Sitting, legs dangling and swinging.
   SVG viewBox: 0 0 60 90                       */
function Reader() {
  return (
    <svg viewBox="0 0 60 90" width="60" height="90" style={{ overflow: "visible" }}>
      {/* Head */}
      <ellipse cx="30" cy="14" rx="11" ry="12" fill={SKIN} />
      {/* Body */}
      <rect x="18" y="24" width="24" height="26" rx="4" fill={SHIRT} />
      {/* Book in lap */}
      <rect x="12" y="38" width="36" height="22" rx="3" fill="#DDD6FE" opacity="0.9" />
      <rect x="29" y="38" width="2" height="22" fill="#A78BFA" opacity="0.7" />
      {/* Left arm holding book */}
      <rect x="10" y="32" width="10" height="18" rx="4" fill={SKIN} />
      {/* Right arm holding book */}
      <rect x="40" y="32" width="10" height="18" rx="4" fill={SKIN} />

      {/* Left leg — swinging */}
      <g style={{ transformOrigin: "22px 50px", animation: "legSwingL 2.2s ease-in-out infinite" }}>
        <rect x="18" y="50" width="10" height="28" rx="4" fill={SKIN} />
        {/* shoe */}
        <ellipse cx="22" cy="79" rx="7" ry="4" fill={SKIN2} />
      </g>
      {/* Right leg — swinging opposite */}
      <g style={{ transformOrigin: "38px 50px", animation: "legSwingR 2.2s ease-in-out infinite" }}>
        <rect x="32" y="50" width="10" height="28" rx="4" fill={SKIN} />
        <ellipse cx="37" cy="79" rx="7" ry="4" fill={SKIN2} />
      </g>
    </svg>
  )
}

/* ── Jumper character (centre) ──
   Mid-air, arms spread, jumping between mini clouds.
   SVG viewBox: 0 0 64 96                        */
function Jumper() {
  return (
    <svg viewBox="0 0 64 96" width="64" height="96" style={{ overflow: "visible" }}>
      {/* Head */}
      <ellipse cx="32" cy="14" rx="12" ry="13" fill={SKIN} />
      {/* Body */}
      <rect x="19" y="26" width="26" height="28" rx="5" fill={SHIRT} />

      {/* Left arm — spread out */}
      <g style={{ transformOrigin: "20px 32px", animation: "armSpread 3.6s ease-in-out infinite" }}>
        <rect x="0" y="28" width="22" height="9" rx="4" fill={SKIN} />
      </g>
      {/* Right arm — spread out */}
      <g style={{ transformOrigin: "44px 32px", animation: "armSpreadR 3.6s ease-in-out infinite" }}>
        <rect x="42" y="28" width="22" height="9" rx="4" fill={SKIN} />
      </g>

      {/* Left leg — tucked slightly */}
      <g style={{ transformOrigin: "26px 54px", animation: "legSwingL 3.6s ease-in-out infinite" }}>
        <rect x="20" y="54" width="11" height="26" rx="4" fill={SKIN} />
        <ellipse cx="25" cy="81" rx="7" ry="4" fill={SKIN2} />
      </g>
      {/* Right leg */}
      <g style={{ transformOrigin: "40px 54px", animation: "legSwingR 3.6s ease-in-out infinite" }}>
        <rect x="34" y="54" width="11" height="26" rx="4" fill={SKIN} />
        <ellipse cx="40" cy="81" rx="7" ry="4" fill={SKIN2} />
      </g>
    </svg>
  )
}

/* ── Gamer character (right cloud) ──
   Sitting cross-legged, holding controller.
   SVG viewBox: 0 0 64 80                        */
function Gamer() {
  return (
    <svg viewBox="0 0 64 80" width="64" height="80" style={{ overflow: "visible" }}>
      {/* Head */}
      <ellipse cx="32" cy="13" rx="12" ry="13" fill={SKIN} />
      {/* Body */}
      <rect x="18" y="24" width="28" height="26" rx="5" fill={SHIRT} />

      {/* Controller */}
      <rect x="14" y="42" width="36" height="16" rx="6" fill="#334155" />
      <circle cx="22" cy="50" r="3" fill="#38BDF8" opacity="0.8" />
      <circle cx="42" cy="50" r="3" fill="#A78BFA" opacity="0.8" />
      <rect x="29" y="47" width="6" height="2" rx="1" fill="#64748B" />
      <rect x="31" y="45" width="2" height="6" rx="1" fill="#64748B" />

      {/* Left arm */}
      <rect x="8" y="30" width="12" height="20" rx="4" fill={SKIN} />
      {/* Right arm */}
      <rect x="44" y="30" width="12" height="20" rx="4" fill={SKIN} />

      {/* Cross legs */}
      <ellipse cx="22" cy="64" rx="13" ry="8" fill={SKIN} transform="rotate(-12,22,64)" />
      <ellipse cx="42" cy="64" rx="13" ry="8" fill={SKIN} transform="rotate(12,42,64)" />
    </svg>
  )
}

/* ── A cloud shape (reusable) ──  */
function Cloud({ w = 180, h = 80, opacity = 1 }: { w?: number; h?: number; opacity?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ filter: "drop-shadow(0 8px 24px rgba(186,230,253,0.5))", opacity }}>
      {/* Main body */}
      <ellipse cx={w * 0.5}  cy={h * 0.68} rx={w * 0.44} ry={h * 0.30} fill="white" />
      {/* Left puff */}
      <ellipse cx={w * 0.28} cy={h * 0.50} rx={w * 0.24} ry={h * 0.34} fill="white" />
      {/* Centre top puff */}
      <ellipse cx={w * 0.52} cy={h * 0.36} rx={w * 0.28} ry={h * 0.32} fill="white" />
      {/* Right puff */}
      <ellipse cx={w * 0.74} cy={h * 0.50} rx={w * 0.22} ry={h * 0.30} fill="white" />
      {/* Blue-tinted underside shadow */}
      <ellipse cx={w * 0.50} cy={h * 0.86} rx={w * 0.44} ry={h * 0.14} fill="rgba(147,197,253,0.55)" />
    </svg>
  )
}

/* ── Mini cloud (for jumper's path) ── */
function MiniCloud({ w = 80, h = 38 }: { w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} style={{ filter: "drop-shadow(0 4px 10px rgba(186,230,253,0.4))" }}>
      <ellipse cx={w * 0.50} cy={h * 0.70} rx={w * 0.44} ry={h * 0.28} fill="white" />
      <ellipse cx={w * 0.30} cy={h * 0.48} rx={w * 0.22} ry={h * 0.32} fill="white" />
      <ellipse cx={w * 0.55} cy={h * 0.34} rx={w * 0.26} ry={h * 0.30} fill="white" />
      <ellipse cx={w * 0.72} cy={h * 0.52} rx={w * 0.20} ry={h * 0.28} fill="white" />
      <ellipse cx={w * 0.50} cy={h * 0.88} rx={w * 0.44} ry={h * 0.12} fill="rgba(147,197,253,0.45)" />
    </svg>
  )
}

const MAP_LINKS = [
  { href: "/#about",    label: "Story",      icon: "📖", sub: "Origin & lore" },
  { href: "/#work",     label: "Build",      icon: "⚒️", sub: "Quest log" },
  { href: "/projects",  label: "Projects",   icon: "🗺️", sub: "Full portfolio" },
  { href: "/experience",label: "Experience", icon: "⚔️", sub: "Battle history" },
  { href: "/writing",   label: "Writing",    icon: "🪶", sub: "Field notes" },
  { href: "/#contact",  label: "Connect",    icon: "🌐", sub: "Start a co-op" },
]

export default function CloudScene() {
  return (
    <>
      {/* ═══════════════════════════════════════
          PANEL 1 — Sky scene, full viewport
          ═══════════════════════════════════════ */}
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
          background: "linear-gradient(180deg, #2d2a4a 0%, #3d3560 10%, #5c4a7a 28%, #8b6e9e 50%, #b89abf 70%, #d9c4d4 88%, #ede5ec 100%)",
        }}
      >
        {/* ── Name + tagline ── */}
        <div style={{
          position: "absolute",
          top: "clamp(64px,10vh,100px)",
          left: 0, right: 0,
          textAlign: "center",
          zIndex: 10,
          animation: "fadeUp .8s .2s ease both",
          opacity: 0,
          animationFillMode: "forwards",
        }}>
          <h1 style={{
            fontFamily: "var(--font-playfair),serif",
            fontWeight: 900,
            fontSize: "clamp(40px,7vw,90px)",
            letterSpacing: "-.03em",
            lineHeight: 1,
            margin: 0,
            color: "white",
            textShadow: "0 2px 32px rgba(3,105,161,0.5), 0 1px 4px rgba(3,105,161,0.3)",
          }}>
            {CANONICAL_NAME}.
          </h1>
          <p style={{
            fontFamily: "var(--font-playfair),serif",
            fontStyle: "italic",
            fontSize: "clamp(14px,2vw,20px)",
            color: "rgba(255,255,255,0.88)",
            marginTop: 12,
            textShadow: "0 1px 12px rgba(3,105,161,0.4)",
            letterSpacing: ".01em",
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.45,
          }}>
            {ROLE_TITLE}
          </p>
          <p style={{
            fontFamily: "var(--font-dm-mono),monospace",
            fontSize: "clamp(9px,1.2vw,11px)",
            letterSpacing: ".1em",
            color: "rgba(253,230,138,0.95)",
            marginTop: 16,
            textShadow: "0 1px 8px rgba(3,105,161,0.35)",
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}>
            {INTENT_CTA}
          </p>
          <div style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 22,
          }}>
            <Link
              href="/#contact"
              style={{
                fontFamily: "var(--font-syne),sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                background: "var(--gold)",
                color: "var(--ink)",
                padding: "10px 20px",
                borderRadius: 2,
                transition: "background .25s",
              }}
            >
              Start a conversation
            </Link>
            <Link
              href={PROFILE_LINKS.resume}
              target="_blank"
              rel="noopener"
              style={{
                fontFamily: "var(--font-syne),sans-serif",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "rgba(255,255,255,0.92)",
                padding: "10px 20px",
                borderRadius: 2,
                transition: "all .25s",
              }}
            >
              Resume ↓
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════
            THE SCENE — three clouds at eye level
            ══════════════════════════════════════ */}
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
          height: "clamp(320px, 55vh, 520px)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "clamp(40px,6vh,80px)",
        }}>

          {/* ── LEFT: Reader ── */}
          <div style={{
            position: "absolute",
            left: "clamp(20px, 8%, 120px)",
            bottom: "clamp(60px,12vh,130px)",
            animation: "cloudDriftL 110s linear infinite alternate",
            zIndex: 4,
          }}>
            {/* Character sits on cloud top */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}>
              <div style={{ animation: "cloudBobSlow 4.8s ease-in-out infinite", marginBottom: -10 }}>
                <Reader />
              </div>
              <div style={{ animation: "cloudSquish 4.8s ease-in-out infinite" }}>
                <Cloud w={200} h={88} />
              </div>
            </div>
          </div>

          {/* ── CENTRE: Jumper + mini cloud trail ── */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "clamp(70px,14vh,150px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 5,
          }}>
            {/* Mini cloud trio the jumper leaps between */}
            <div style={{
              display: "flex",
              gap: "clamp(12px,3vw,32px)",
              alignItems: "flex-end",
              position: "relative",
              marginBottom: 0,
            }}>
              {/* Cloud A */}
              <div style={{ animation: "cloudDriftL 80s linear infinite alternate", opacity: 0.9 }}>
                <MiniCloud w={90} h={42} />
              </div>

              {/* Jumper — floats above centre */}
              <div style={{
                position: "absolute",
                left: "50%",
                bottom: 28,
                transform: "translateX(-50%)",
                animation: "jumpBounce 3.6s ease-in-out infinite",
                zIndex: 6,
              }}>
                <Jumper />
              </div>

              {/* Cloud B */}
              <div style={{ animation: "cloudDriftR 88s linear infinite alternate", opacity: 0.9, marginTop: 8 }}>
                <MiniCloud w={76} h={36} />
              </div>
              {/* Cloud C */}
              <div style={{ animation: "cloudDriftL 96s linear infinite alternate", opacity: 0.85, marginBottom: 4 }}>
                <MiniCloud w={84} h={40} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Gamer ── */}
          <div style={{
            position: "absolute",
            right: "clamp(20px, 8%, 120px)",
            bottom: "clamp(60px,12vh,130px)",
            animation: "cloudDriftR 95s linear infinite alternate",
            zIndex: 4,
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}>
              <div style={{ animation: "cloudBob 5.4s ease-in-out infinite", marginBottom: -10 }}>
                <Gamer />
              </div>
              <div style={{ animation: "cloudSquish 5.4s ease-in-out infinite" }}>
                <Cloud w={190} h={84} />
              </div>
            </div>
          </div>

        </div>{/* /scene */}

        {/* ── Scroll hint ── */}
        <div style={{
          position: "absolute",
          bottom: "clamp(16px,4vh,32px)",
          left: 0, right: 0,
          textAlign: "center",
          animation: "fadeIn 1s 1.4s ease both",
          opacity: 0,
          animationFillMode: "forwards",
          zIndex: 10,
        }}>
          <div style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}>
            <span style={{
              fontFamily: "var(--font-dm-mono),monospace",
              fontSize: 8,
              letterSpacing: ".22em",
              color: "rgba(255,255,255,0.65)",
            }}>SCROLL TO EXPLORE</span>
            <div style={{ animation: "scrollBounce 1.8s ease-in-out infinite" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M4 10l5 5 5-5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PANEL 2 — World map portal
          ═══════════════════════════════════════ */}
      <section id="map" style={{
        background: "linear-gradient(180deg, #ede5ec 0%, #e8dfe8 40%, #dfd8e0 100%)",
        borderTop: "1px solid rgba(180,160,180,0.3)",
        borderBottom: "1px solid rgba(180,160,180,0.3)",
        padding: "clamp(48px,8vh,96px) clamp(20px,6vw,64px)",
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(36px,5vh,60px)" }}>
          <div style={{
            fontFamily: "var(--font-dm-mono),monospace",
            fontSize: 8,
            letterSpacing: ".28em",
            color: "var(--terra)",
            marginBottom: 10,
          }}>── SELECT A DESTINATION ──</div>
          <h2 style={{
            fontFamily: "var(--font-playfair),serif",
            fontWeight: 900,
            fontSize: "clamp(28px,4vw,52px)",
            letterSpacing: "-.02em",
            lineHeight: 1,
            color: "var(--ink)",
            margin: 0,
          }}>World Map</h2>
          <div style={{ width: 40, height: 2, background: "var(--terra)", margin: "16px auto 0" }} />
        </div>

        {/* 3×2 card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "clamp(12px,2vw,24px)",
          maxWidth: 900,
          margin: "0 auto",
        }}>
          {MAP_LINKS.map(({ href, label, icon, sub }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
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
                  color: "var(--ink)",
                  marginBottom: 4,
                }}>{label}</div>
                <div style={{
                  fontFamily: "var(--font-dm-mono),monospace",
                  fontSize: 8,
                  letterSpacing: ".12em",
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
