"use client"
import Link from "next/link"

/* ─────────────────────────────────────────────
   CloudScene
   Full-screen sky splash with three anime-style
   Black boy characters on clouds.
   ───────────────────────────────────────────── */

// Palette
const SKIN   = "#8B5E3C"   // warm brown skin
const SKIN_D = "#6B4226"   // shadow / darker tone
const SKIN_L = "#C4845A"   // highlight on skin
const OUTLINE = "#1A0A00"  // bold anime outline
const HAIR   = "#0F0A00"   // near-black hair
const WHITE  = "#FFFFFF"
const EYE    = "#1A1A2E"   // deep eye colour
const EYE_HL = "#FFFFFF"   // eye highlight

/* ─── Shared face component ─── */
function AnimeFace({
  cx, cy, r = 14,
  eyeStyle = "open",   // "open" | "closed" | "focused"
  mouthStyle = "smile" // "smile" | "grin" | "open"
}: {
  cx: number; cy: number; r?: number;
  eyeStyle?: "open" | "closed" | "focused"
  mouthStyle?: "smile" | "grin" | "open"
}) {
  const ew = r * 0.38   // eye width
  const eh = r * 0.32   // eye height
  const ex1 = cx - r * 0.38
  const ex2 = cx + r * 0.38
  const ey  = cy + r * 0.05

  return (
    <g>
      {/* Head base */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.05} fill={SKIN} stroke={OUTLINE} strokeWidth="1.4" />
      {/* Chin shadow */}
      <ellipse cx={cx} cy={cy + r * 0.6} rx={r * 0.55} ry={r * 0.22} fill={SKIN_D} opacity="0.35" />
      {/* Cheek highlight */}
      <ellipse cx={cx - r * 0.42} cy={cy + r * 0.28} rx={r * 0.18} ry={r * 0.12} fill={SKIN_L} opacity="0.45" />
      <ellipse cx={cx + r * 0.42} cy={cy + r * 0.28} rx={r * 0.18} ry={r * 0.12} fill={SKIN_L} opacity="0.45" />

      {/* ── Eyebrows ── */}
      <path d={`M ${ex1 - ew * 0.7} ${ey - eh * 1.9} Q ${ex1} ${ey - eh * 2.3} ${ex1 + ew * 0.7} ${ey - eh * 1.9}`}
        fill="none" stroke={OUTLINE} strokeWidth="1.4" strokeLinecap="round" />
      <path d={`M ${ex2 - ew * 0.7} ${ey - eh * 1.9} Q ${ex2} ${ey - eh * 2.3} ${ex2 + ew * 0.7} ${ey - eh * 1.9}`}
        fill="none" stroke={OUTLINE} strokeWidth="1.4" strokeLinecap="round" />

      {/* ── Eyes ── */}
      {eyeStyle === "open" && <>
        {/* Left eye */}
        <ellipse cx={ex1} cy={ey} rx={ew} ry={eh} fill={WHITE} stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx={ex1} cy={ey + eh * 0.1} rx={ew * 0.62} ry={eh * 0.72} fill={EYE} />
        <circle  cx={ex1 - ew * 0.2} cy={ey - eh * 0.2} r={ew * 0.24} fill={EYE_HL} />
        {/* Right eye */}
        <ellipse cx={ex2} cy={ey} rx={ew} ry={eh} fill={WHITE} stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx={ex2} cy={ey + eh * 0.1} rx={ew * 0.62} ry={eh * 0.72} fill={EYE} />
        <circle  cx={ex2 - ew * 0.2} cy={ey - eh * 0.2} r={ew * 0.24} fill={EYE_HL} />
      </>}
      {eyeStyle === "closed" && <>
        <path d={`M ${ex1 - ew} ${ey} Q ${ex1} ${ey - eh * 1.1} ${ex1 + ew} ${ey}`}
          fill="none" stroke={OUTLINE} strokeWidth="1.4" strokeLinecap="round" />
        <path d={`M ${ex2 - ew} ${ey} Q ${ex2} ${ey - eh * 1.1} ${ex2 + ew} ${ey}`}
          fill="none" stroke={OUTLINE} strokeWidth="1.4" strokeLinecap="round" />
      </>}
      {eyeStyle === "focused" && <>
        {/* Determined squint */}
        <ellipse cx={ex1} cy={ey} rx={ew} ry={eh * 0.6} fill={WHITE} stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx={ex1} cy={ey} rx={ew * 0.55} ry={eh * 0.5} fill={EYE} />
        <circle  cx={ex1 - ew * 0.18} cy={ey - eh * 0.12} r={ew * 0.2} fill={EYE_HL} />
        <ellipse cx={ex2} cy={ey} rx={ew} ry={eh * 0.6} fill={WHITE} stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx={ex2} cy={ey} rx={ew * 0.55} ry={eh * 0.5} fill={EYE} />
        <circle  cx={ex2 - ew * 0.18} cy={ey - eh * 0.12} r={ew * 0.2} fill={EYE_HL} />
      </>}

      {/* ── Nose (small, anime-style) ── */}
      <path d={`M ${cx - r * 0.07} ${cy + r * 0.28} Q ${cx} ${cy + r * 0.38} ${cx + r * 0.07} ${cy + r * 0.28}`}
        fill="none" stroke={SKIN_D} strokeWidth="1.1" strokeLinecap="round" />

      {/* ── Mouth ── */}
      {mouthStyle === "smile" &&
        <path d={`M ${cx - r * 0.24} ${cy + r * 0.52} Q ${cx} ${cy + r * 0.68} ${cx + r * 0.24} ${cy + r * 0.52}`}
          fill="none" stroke={OUTLINE} strokeWidth="1.3" strokeLinecap="round" />}
      {mouthStyle === "grin" && <>
        <path d={`M ${cx - r * 0.28} ${cy + r * 0.50} Q ${cx} ${cy + r * 0.72} ${cx + r * 0.28} ${cy + r * 0.50}`}
          fill={OUTLINE} />
        <path d={`M ${cx - r * 0.24} ${cy + r * 0.54} Q ${cx} ${cy + r * 0.62} ${cx + r * 0.24} ${cy + r * 0.54}`}
          fill={WHITE} />
      </>}
      {mouthStyle === "open" && <>
        <ellipse cx={cx} cy={cy + r * 0.58} rx={r * 0.22} ry={r * 0.14} fill={OUTLINE} />
        <ellipse cx={cx} cy={cy + r * 0.60} rx={r * 0.16} ry={r * 0.08} fill="#8B3A3A" />
      </>}
    </g>
  )
}

/* ─── Hair helper ─── */
function AnimeHair({ cx, cy, r = 14, style = "spiky" }: {
  cx: number; cy: number; r?: number; style?: "spiky" | "short" | "dreads"
}) {
  if (style === "spiky") return (
    <g fill={HAIR} stroke={OUTLINE} strokeWidth="1">
      {/* Back of head */}
      <ellipse cx={cx} cy={cy - r * 0.1} rx={r * 1.02} ry={r * 1.02} fill={HAIR} />
      {/* Spikes */}
      <polygon points={`${cx - r * 0.6},${cy - r * 0.7} ${cx - r * 0.9},${cy - r * 1.7} ${cx - r * 0.2},${cy - r * 1.0}`} />
      <polygon points={`${cx - r * 0.2},${cy - r * 0.9} ${cx - r * 0.3},${cy - r * 1.9} ${cx + r * 0.3},${cy - r * 1.1}`} />
      <polygon points={`${cx + r * 0.2},${cy - r * 0.9} ${cx + r * 0.4},${cy - r * 1.85} ${cx + r * 0.8},${cy - r * 0.9}`} />
      <polygon points={`${cx + r * 0.6},${cy - r * 0.7} ${cx + r * 1.0},${cy - r * 1.5} ${cx + r * 0.95},${cy - r * 0.5}`} />
    </g>
  )
  if (style === "short") return (
    <g fill={HAIR} stroke={OUTLINE} strokeWidth="1">
      <ellipse cx={cx} cy={cy - r * 0.15} rx={r * 1.0} ry={r * 0.88} />
      {/* Short fringe */}
      <ellipse cx={cx - r * 0.45} cy={cy - r * 0.88} rx={r * 0.32} ry={r * 0.24} />
      <ellipse cx={cx}             cy={cy - r * 0.98} rx={r * 0.30} ry={r * 0.22} />
      <ellipse cx={cx + r * 0.45} cy={cy - r * 0.88} rx={r * 0.32} ry={r * 0.24} />
    </g>
  )
  // dreads
  return (
    <g fill={HAIR} stroke={OUTLINE} strokeWidth="0.8">
      <ellipse cx={cx} cy={cy - r * 0.1} rx={r * 1.0} ry={r * 0.95} />
      {/* Dread locks hanging */}
      {[-0.7,-0.4,-0.1,0.2,0.5,0.8].map((ox, i) => (
        <rect key={i} x={cx + ox * r - r * 0.12} y={cy - r * 0.5} width={r * 0.22} height={r * (0.8 + i * 0.1)} rx={r * 0.1} fill={HAIR} />
      ))}
    </g>
  )
}

/* ══════════════════════════════════════════
   CHARACTER 1 — Reader (left cloud)
   Sitting relaxed, legs dangling, book open,
   happy closed eyes (absorbed in reading)
   ══════════════════════════════════════════ */
function Reader() {
  const W = 90, H = 130
  const hx = W / 2, hy = 22
  const r = 15

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: "visible" }}>

      {/* ── Body (hoodie, relaxed sit) ── */}
      {/* Torso */}
      <rect x="26" y="36" width="38" height="36" rx="8" fill="#DDD6FE" stroke={OUTLINE} strokeWidth="1.3" />
      {/* Hoodie pocket */}
      <rect x="33" y="54" width="24" height="14" rx="5" fill="#C4B5FD" stroke={OUTLINE} strokeWidth="0.9" />
      {/* Left arm (holding book) */}
      <rect x="10" y="40" width="18" height="10" rx="5" fill={SKIN} stroke={OUTLINE} strokeWidth="1.2" />
      {/* Right arm (holding book) */}
      <rect x="62" y="40" width="18" height="10" rx="5" fill={SKIN} stroke={OUTLINE} strokeWidth="1.2" />
      {/* Hands */}
      <ellipse cx="13" cy="46" rx="6" ry="5" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="77" cy="46" rx="6" ry="5" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Book ── */}
      <rect x="14" y="44" width="62" height="36" rx="4" fill="#EDE9FE" stroke={OUTLINE} strokeWidth="1.3" />
      <rect x="43" y="44" width="3"  height="36" fill="#A78BFA" opacity="0.6" />
      {/* Page lines */}
      {[50,55,60,65,70].map(y => (
        <line key={y} x1="18" y1={y} x2="42" y2={y} stroke="#C4B5FD" strokeWidth="1" />
      ))}
      {[50,55,60,65,70].map(y => (
        <line key={y} x1="48" y1={y} x2="72" y2={y} stroke="#C4B5FD" strokeWidth="1" />
      ))}

      {/* ── Legs dangling ── */}
      <g style={{ transformOrigin: `${W/2 - 10}px 80px`, animation: "legSwingL 2.4s ease-in-out infinite" }}>
        <rect x="30" y="72" width="14" height="34" rx="7" fill="#334155" stroke={OUTLINE} strokeWidth="1.2" />
        {/* Sneaker */}
        <ellipse cx="37" cy="107" rx="11" ry="7" fill="#0F172A" stroke={OUTLINE} strokeWidth="1" />
        <ellipse cx="34" cy="105" rx="6" ry="3" fill="white" opacity="0.4" />
      </g>
      <g style={{ transformOrigin: `${W/2 + 10}px 80px`, animation: "legSwingR 2.4s ease-in-out infinite" }}>
        <rect x="47" y="72" width="14" height="34" rx="7" fill="#334155" stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx="54" cy="107" rx="11" ry="7" fill="#0F172A" stroke={OUTLINE} strokeWidth="1" />
        <ellipse cx="51" cy="105" rx="6" ry="3" fill="white" opacity="0.4" />
      </g>

      {/* ── Hair ── */}
      <AnimeHair cx={hx} cy={hy} r={r} style="dreads" />

      {/* ── Face ── */}
      <AnimeFace cx={hx} cy={hy} r={r} eyeStyle="closed" mouthStyle="smile" />
    </svg>
  )
}

/* ══════════════════════════════════════════
   CHARACTER 2 — Jumper (centre)
   Mid-air, arms out wide, big open mouth
   excited expression, spiky hair flying
   ══════════════════════════════════════════ */
function Jumper() {
  const W = 100, H = 140
  const hx = W / 2, hy = 22
  const r = 16

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: "visible" }}>

      {/* ── Body (tracksuit) ── */}
      <rect x="28" y="38" width="44" height="40" rx="9" fill="#38BDF8" stroke={OUTLINE} strokeWidth="1.4" />
      {/* Stripe */}
      <rect x="47" y="38" width="6" height="40" fill="#7DD3FC" opacity="0.6" />

      {/* ── Arms spread wide ── */}
      <g style={{ transformOrigin: "30px 46px", animation: "armSpread 3.6s ease-in-out infinite" }}>
        <rect x="0" y="40" width="30" height="12" rx="6" fill={SKIN} stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx="4" cy="46" rx="7" ry="6" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
      </g>
      <g style={{ transformOrigin: "70px 46px", animation: "armSpreadR 3.6s ease-in-out infinite" }}>
        <rect x="70" y="40" width="30" height="12" rx="6" fill={SKIN} stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx="96" cy="46" rx="7" ry="6" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
      </g>

      {/* ── Legs (tucked up in jump) ── */}
      <g style={{ transformOrigin: "38px 80px", animation: "legSwingL 3.6s ease-in-out infinite" }}>
        <rect x="28" y="78" width="16" height="36" rx="8" fill="#0F172A" stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx="36" cy="116" rx="13" ry="8" fill="#1E293B" stroke={OUTLINE} strokeWidth="1" />
        <ellipse cx="33" cy="113" rx="7" ry="3" fill="white" opacity="0.35" />
      </g>
      <g style={{ transformOrigin: "62px 80px", animation: "legSwingR 3.6s ease-in-out infinite" }}>
        <rect x="56" y="78" width="16" height="36" rx="8" fill="#0F172A" stroke={OUTLINE} strokeWidth="1.2" />
        <ellipse cx="64" cy="116" rx="13" ry="8" fill="#1E293B" stroke={OUTLINE} strokeWidth="1" />
        <ellipse cx="61" cy="113" rx="7" ry="3" fill="white" opacity="0.35" />
      </g>

      {/* ── Hair (spiky, mid-air energy) ── */}
      <AnimeHair cx={hx} cy={hy} r={r} style="spiky" />

      {/* ── Face ── */}
      <AnimeFace cx={hx} cy={hy} r={r} eyeStyle="open" mouthStyle="open" />

      {/* ── Speed lines behind character ── */}
      {[-28,-18,-8,8,18,28].map((ox, i) => (
        <line key={i}
          x1={hx + ox} y1={hy + 60 + i * 4}
          x2={hx + ox} y2={hy + 80 + i * 4}
          stroke="rgba(186,230,253,0.45)" strokeWidth="1.5" strokeLinecap="round" />
      ))}
    </svg>
  )
}

/* ══════════════════════════════════════════
   CHARACTER 3 — Gamer (right cloud)
   Cross-legged, leaning forward, focused
   eyes, controller glowing
   ══════════════════════════════════════════ */
function Gamer() {
  const W = 90, H = 110
  const hx = W / 2, hy = 20
  const r = 15

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ overflow: "visible" }}>

      {/* ── Body (zip-up, leaning forward) ── */}
      <rect x="22" y="34" width="46" height="36" rx="8" fill="#1E293B" stroke={OUTLINE} strokeWidth="1.3" />
      {/* Zipper */}
      <line x1="45" y1="34" x2="45" y2="70" stroke="#475569" strokeWidth="2" />
      {/* Collar */}
      <path d="M 38,34 Q 45,42 52,34" fill="none" stroke="#475569" strokeWidth="1.5" />

      {/* ── Arms down to controller ── */}
      <rect x="10" y="44" width="14" height="22" rx="6" fill={SKIN} stroke={OUTLINE} strokeWidth="1.1" />
      <rect x="66" y="44" width="14" height="22" rx="6" fill={SKIN} stroke={OUTLINE} strokeWidth="1.1" />
      {/* Hands */}
      <ellipse cx="17" cy="66" rx="7" ry="5" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="73" cy="66" rx="7" ry="5" fill={SKIN} stroke={OUTLINE} strokeWidth="1" />

      {/* ── Controller (glowing) ── */}
      <rect x="16" y="62" width="58" height="24" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
      {/* Glow effect */}
      <rect x="16" y="62" width="58" height="24" rx="10" fill="none" stroke="#38BDF8" strokeWidth="3" opacity="0.25" />
      {/* D-pad */}
      <rect x="25" y="70" width="10" height="4" rx="1" fill="#334155" />
      <rect x="28" y="67" width="4"  height="10" rx="1" fill="#334155" />
      {/* Buttons */}
      <circle cx="60" cy="70" r="3.5" fill="#A78BFA" stroke="#7C3AED" strokeWidth="0.8" />
      <circle cx="68" cy="74" r="3.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.8" />
      <circle cx="60" cy="78" r="3.5" fill="#86EFAC" stroke="#16A34A" strokeWidth="0.8" />
      <circle cx="52" cy="74" r="3.5" fill="#FDE68A" stroke="#D97706" strokeWidth="0.8" />
      {/* Analog sticks */}
      <circle cx="38" cy="76" r="4" fill="#1E293B" stroke="#475569" strokeWidth="1" />
      <circle cx="52" cy="81" r="4" fill="#1E293B" stroke="#475569" strokeWidth="1" />

      {/* ── Crossed legs ── */}
      <ellipse cx="27" cy="88" rx="16" ry="9" fill="#0F172A" stroke={OUTLINE} strokeWidth="1.1" transform="rotate(-8,27,88)" />
      <ellipse cx="63" cy="88" rx="16" ry="9" fill="#0F172A" stroke={OUTLINE} strokeWidth="1.1" transform="rotate(8,63,88)" />
      {/* Sneakers */}
      <ellipse cx="18" cy="94" rx="10" ry="6" fill="#1E293B" stroke={OUTLINE} strokeWidth="1" />
      <ellipse cx="72" cy="94" rx="10" ry="6" fill="#1E293B" stroke={OUTLINE} strokeWidth="1" />

      {/* ── Hair (short taper) ── */}
      <AnimeHair cx={hx} cy={hy} r={r} style="short" />

      {/* ── Face (focused/determined) ── */}
      <AnimeFace cx={hx} cy={hy} r={r} eyeStyle="focused" mouthStyle="smile" />
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
  { href: "/projects",  label: "Projects",   icon: "🗺️", sub: "World map" },
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
            Lapo Odunjo.
          </h1>
          <p style={{
            fontFamily: "var(--font-playfair),serif",
            fontStyle: "italic",
            fontSize: "clamp(14px,2vw,20px)",
            color: "rgba(255,255,255,0.88)",
            marginTop: 12,
            textShadow: "0 1px 12px rgba(3,105,161,0.4)",
            letterSpacing: ".01em",
          }}>
            I build AI systems that survive contact with the real world.
          </p>
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
            left: "clamp(10px, 5%, 80px)",
            bottom: "clamp(60px,12vh,130px)",
            animation: "cloudDriftL 110s linear infinite alternate",
            zIndex: 4,
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ animation: "cloudBobSlow 4.8s ease-in-out infinite", marginBottom: -14 }}>
                <Reader />
              </div>
              <div style={{ animation: "cloudSquish 4.8s ease-in-out infinite" }}>
                <Cloud w={220} h={96} />
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
            right: "clamp(10px, 5%, 80px)",
            bottom: "clamp(60px,12vh,130px)",
            animation: "cloudDriftR 95s linear infinite alternate",
            zIndex: 4,
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ animation: "cloudBob 5.4s ease-in-out infinite", marginBottom: -14 }}>
                <Gamer />
              </div>
              <div style={{ animation: "cloudSquish 5.4s ease-in-out infinite" }}>
                <Cloud w={210} h={92} />
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
        background: "rgba(248,250,252,0.55)",
        backdropFilter: "blur(2px)",
        borderTop: "1px solid rgba(125,211,252,0.35)",
        borderBottom: "1px solid rgba(125,211,252,0.35)",
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
