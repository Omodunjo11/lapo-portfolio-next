"use client"
import Link from "next/link"

/* ─────────────────────────────────────────────
   CloudScene — anime-style Black boy characters
   Reference aesthetic: Boondocks / Afro Samurai
   Deep skin, serious expressions, gi/kimono,
   dramatic hair, kanji labels.
   ───────────────────────────────────────────── */

// Palette
const S0  = "#120704"   // deepest shadow
const S1  = "#2A1006"   // base skin
const S2  = "#3D1A0A"   // mid skin
const S3  = "#5C2E14"   // highlight skin
const OL  = "#0A0604"   // outline
const HA  = "#0A0604"   // hair
const W   = "#F4F0E8"   // white/off-white cloth
const WS  = "#D4CFC5"   // cloth shadow
const BK  = "#111111"   // black cloth
const BKL = "#2A2A2A"   // black cloth lighter

/* ── Shared anime eye / face ── */
function SeriousFace({
  cx, cy, r = 16,
  eyeDir = 0,          // 0=forward, -1=left, 1=right
  lidHeavy = false,
}: {
  cx: number; cy: number; r?: number
  eyeDir?: number; lidHeavy?: boolean
}) {
  const ew = r * 0.42
  const eh = r * 0.28
  const ex1 = cx - r * 0.38
  const ex2 = cx + r * 0.38
  const ey  = cy + r * 0.06
  const pupilOff = eyeDir * ew * 0.18

  return (
    <g>
      {/* Head */}
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 1.08} fill={S1} stroke={OL} strokeWidth="1.5" />
      {/* Jawline sharpening */}
      <ellipse cx={cx} cy={cy + r * 0.55} rx={r * 0.65} ry={r * 0.3} fill={S0} opacity="0.5" />
      {/* Cheekbone highlights */}
      <ellipse cx={cx - r * 0.52} cy={cy + r * 0.15} rx={r * 0.16} ry={r * 0.10} fill={S3} opacity="0.4" />
      <ellipse cx={cx + r * 0.52} cy={cy + r * 0.15} rx={r * 0.16} ry={r * 0.10} fill={S3} opacity="0.4" />

      {/* ── Heavy brows (serious) ── */}
      <path d={`M ${ex1 - ew * 0.8} ${ey - eh * 2.0} L ${ex1 + ew * 0.8} ${ey - eh * 2.4}`}
        stroke={OL} strokeWidth="2.2" strokeLinecap="round" />
      <path d={`M ${ex2 - ew * 0.8} ${ey - eh * 2.4} L ${ex2 + ew * 0.8} ${ey - eh * 2.0}`}
        stroke={OL} strokeWidth="2.2" strokeLinecap="round" />

      {/* ── Eyes — almond shaped, serious ── */}
      {/* Left */}
      <path d={`M ${ex1 - ew} ${ey} Q ${ex1} ${ey - eh * (lidHeavy ? 0.7 : 1.1)} ${ex1 + ew} ${ey} Q ${ex1} ${ey + eh * 0.6} Z`}
        fill="white" stroke={OL} strokeWidth="1.1" />
      <ellipse cx={ex1 + pupilOff} cy={ey} rx={ew * 0.52} ry={eh * 0.72} fill={OL} />
      <circle cx={ex1 + pupilOff - ew * 0.18} cy={ey - eh * 0.22} r={ew * 0.18} fill="white" />
      {/* Heavy upper lid line */}
      <path d={`M ${ex1 - ew} ${ey} Q ${ex1} ${ey - eh * (lidHeavy ? 0.9 : 1.3)} ${ex1 + ew} ${ey}`}
        fill="none" stroke={OL} strokeWidth="1.8" />

      {/* Right */}
      <path d={`M ${ex2 - ew} ${ey} Q ${ex2} ${ey - eh * (lidHeavy ? 0.7 : 1.1)} ${ex2 + ew} ${ey} Q ${ex2} ${ey + eh * 0.6} Z`}
        fill="white" stroke={OL} strokeWidth="1.1" />
      <ellipse cx={ex2 + pupilOff} cy={ey} rx={ew * 0.52} ry={eh * 0.72} fill={OL} />
      <circle cx={ex2 + pupilOff - ew * 0.18} cy={ey - eh * 0.22} r={ew * 0.18} fill="white" />
      <path d={`M ${ex2 - ew} ${ey} Q ${ex2} ${ey - eh * (lidHeavy ? 0.9 : 1.3)} ${ex2 + ew} ${ey}`}
        fill="none" stroke={OL} strokeWidth="1.8" />

      {/* Nose */}
      <path d={`M ${cx - r * 0.08} ${cy + r * 0.32} Q ${cx + r * 0.06} ${cy + r * 0.42} ${cx + r * 0.14} ${cy + r * 0.34}`}
        fill="none" stroke={S0} strokeWidth="1.2" strokeLinecap="round" />

      {/* Mouth — straight/slight frown = cool */}
      <path d={`M ${cx - r * 0.22} ${cy + r * 0.55} Q ${cx} ${cy + r * 0.62} ${cx + r * 0.22} ${cy + r * 0.55}`}
        fill="none" stroke={OL} strokeWidth="1.4" strokeLinecap="round" />
    </g>
  )
}

/* ══════════════════════════════════════════════
   CHARACTER 1 — 記録者 (The Recorder)
   Sitting on cloud, reading, afro, white haori,
   legs stretched out, bandaged, serious
   ══════════════════════════════════════════════ */
function Reader() {
  return (
    <svg viewBox="0 0 110 170" width="110" height="170" style={{ overflow: "visible" }}>

      {/* ── Legs stretched out ── */}
      {/* Left leg */}
      <g style={{ transformOrigin: "35px 105px", animation: "legSwingL 3.2s ease-in-out infinite" }}>
        <rect x="24" y="100" width="22" height="48" rx="5" fill={BK} stroke={OL} strokeWidth="1.2" />
        {/* Bandage wraps on shin */}
        {[118,124,130,136].map(y => (
          <line key={y} x1="24" y1={y} x2="46" y2={y} stroke={W} strokeWidth="1.5" opacity="0.7" />
        ))}
        {/* Sandal */}
        <ellipse cx="35" cy="149" rx="14" ry="6" fill={S1} stroke={OL} strokeWidth="1" />
        <line x1="29" y1="145" x2="29" y2="149" stroke={OL} strokeWidth="1.2" />
        <line x1="35" y1="143" x2="35" y2="149" stroke={OL} strokeWidth="1.2" />
        <line x1="41" y1="145" x2="41" y2="149" stroke={OL} strokeWidth="1.2" />
      </g>
      {/* Right leg */}
      <g style={{ transformOrigin: "75px 105px", animation: "legSwingR 3.2s ease-in-out infinite" }}>
        <rect x="64" y="100" width="22" height="48" rx="5" fill={BK} stroke={OL} strokeWidth="1.2" />
        {[118,124,130,136].map(y => (
          <line key={y} x1="64" y1={y} x2="86" y2={y} stroke={W} strokeWidth="1.5" opacity="0.7" />
        ))}
        <ellipse cx="75" cy="149" rx="14" ry="6" fill={S1} stroke={OL} strokeWidth="1" />
        <line x1="69" y1="145" x2="69" y2="149" stroke={OL} strokeWidth="1.2" />
        <line x1="75" y1="143" x2="75" y2="149" stroke={OL} strokeWidth="1.2" />
        <line x1="81" y1="145" x2="81" y2="149" stroke={OL} strokeWidth="1.2" />
      </g>

      {/* ── Haori (white outer robe) ── */}
      <path d="M 20,65 L 15,110 L 55,112 L 55,65 Z" fill={WS} stroke={OL} strokeWidth="1.3" />
      <path d="M 90,65 L 95,110 L 55,112 L 55,65 Z" fill={W}  stroke={OL} strokeWidth="1.3" />
      {/* Collar */}
      <path d="M 38,60 L 55,72 L 72,60" fill="none" stroke={OL} strokeWidth="1.5" />
      {/* Under layer dark sash */}
      <rect x="36" y="95" width="38" height="14" rx="2" fill="#6B3FA0" opacity="0.85" stroke={OL} strokeWidth="1" />

      {/* ── Arms ── */}
      {/* Left arm holding book bottom */}
      <rect x="10" y="72" width="16" height="30" rx="6" fill={S1} stroke={OL} strokeWidth="1.2" />
      {/* Right arm holding book top */}
      <rect x="84" y="72" width="16" height="30" rx="6" fill={S1} stroke={OL} strokeWidth="1.2" />
      {/* Hands */}
      <ellipse cx="18" cy="100" rx="8" ry="6" fill={S2} stroke={OL} strokeWidth="1" />
      <ellipse cx="92" cy="100" rx="8" ry="6" fill={S2} stroke={OL} strokeWidth="1" />

      {/* ── Book ── */}
      <rect x="18" y="78" width="74" height="50" rx="3" fill={WS} stroke={OL} strokeWidth="1.4" />
      <rect x="53" y="78" width="4"  height="50" fill="#C4B5FD" opacity="0.7" />
      {/* Japanese text on book cover */}
      <rect x="20" y="82" width="30" height="42" rx="2" fill="#E8E4DC" />
      {/* Simulated kanji lines */}
      {[90,98,106,116].map((y,i) => (
        <line key={i} x1="24" y1={y} x2="47" y2={y} stroke="#9A9085" strokeWidth="1.2" />
      ))}
      <rect x="57" y="82" width="30" height="42" rx="2" fill="#EDEAE3" />
      {[90,98,106,116].map((y,i) => (
        <line key={i} x1="60" y1={y} x2="83" y2={y} stroke="#9A9085" strokeWidth="1.2" />
      ))}

      {/* ── Katana at back ── */}
      <line x1="80" y1="60" x2="105" y2="130" stroke={OL} strokeWidth="3" strokeLinecap="round" />
      <rect x="78" y="58" width="10" height="5" rx="2" fill="#8B6914" stroke={OL} strokeWidth="0.8" />

      {/* ── Afro ── */}
      {/* Big natural shape */}
      <ellipse cx="55" cy="30" rx="30" ry="28" fill={HA} stroke={OL} strokeWidth="1.5" />
      {/* Texture bumps around edge */}
      {[
        [30,12],[22,22],[18,34],[22,46],[30,54],
        [42,58],[55,60],[68,58],[78,54],[86,46],
        [90,34],[86,22],[78,12],[68,8],[55,6],[42,8],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={4.5 + (i % 3)} fill={HA} stroke={OL} strokeWidth="0.7" />
      ))}
      {/* Inner volume highlights */}
      <ellipse cx="48" cy="22" rx="8" ry="7" fill="#1A0E06" opacity="0.6" />

      {/* ── Face ── */}
      <SeriousFace cx={55} cy={35} r={17} eyeDir={-1} lidHeavy />
    </svg>
  )
}

/* ══════════════════════════════════════════════
   CHARACTER 2 — 風の戦士 (Wind Warrior)
   Standing on cloud, spiky hair, blue gi,
   arm wraps, hakama pants, ready stance
   ══════════════════════════════════════════════ */
function Jumper() {
  return (
    <svg viewBox="0 0 100 190" width="100" height="190" style={{ overflow: "visible" }}>

      {/* ── Hakama (wide black pants) ── */}
      {/* Left leg */}
      <g style={{ transformOrigin: "36px 130px", animation: "legSwingL 3.6s ease-in-out infinite" }}>
        <path d="M 24,120 Q 20,155 22,175 L 42,175 Q 44,155 40,120 Z"
          fill={BK} stroke={OL} strokeWidth="1.3" />
        {/* Bandage wraps */}
        {[152,158,164].map(y => (
          <line key={y} x1="22" y1={y} x2="42" y2={y} stroke={W} strokeWidth="1.8" opacity="0.8" />
        ))}
        {/* Sandal */}
        <ellipse cx="32" cy="177" rx="13" ry="5" fill={S0} stroke={OL} strokeWidth="1" />
      </g>
      {/* Right leg */}
      <g style={{ transformOrigin: "64px 130px", animation: "legSwingR 3.6s ease-in-out infinite" }}>
        <path d="M 60,120 Q 56,155 58,175 L 78,175 Q 80,155 76,120 Z"
          fill={BKL} stroke={OL} strokeWidth="1.3" />
        {[152,158,164].map(y => (
          <line key={y} x1="58" y1={y} x2="78" y2={y} stroke={W} strokeWidth="1.8" opacity="0.8" />
        ))}
        <ellipse cx="68" cy="177" rx="13" ry="5" fill={S0} stroke={OL} strokeWidth="1" />
      </g>

      {/* ── Blue gi / vest ── */}
      <path d="M 28,65 L 22,125 L 78,125 L 72,65 Z" fill="#4A9CC8" stroke={OL} strokeWidth="1.4" />
      {/* Gi fold / lapel */}
      <path d="M 50,62 L 38,80 L 50,120" fill="#2A6E96" stroke={OL} strokeWidth="1" />
      <path d="M 50,62 L 62,80 L 50,120" fill="#5AAED8" stroke={OL} strokeWidth="0.8" opacity="0.6" />
      {/* Symbol on chest */}
      <circle cx="50" cy="88" r="9" fill="none" stroke={W} strokeWidth="1.5" opacity="0.7" />
      <path d="M 46,85 L 50,91 L 54,85" fill="none" stroke={W} strokeWidth="1.5" />
      {/* Belt / obi */}
      <rect x="30" y="114" width="40" height="10" rx="2" fill="#1A3A50" stroke={OL} strokeWidth="1" />

      {/* ── Arms ── */}
      {/* Left arm */}
      <g style={{ transformOrigin: "24px 78px", animation: "armSpread 3.6s ease-in-out infinite" }}>
        <rect x="4" y="68" width="22" height="36" rx="8" fill={S1} stroke={OL} strokeWidth="1.3" />
        {/* Arm wraps (bandage) */}
        {[80,86,92,98].map(y => (
          <line key={y} x1="4" y1={y} x2="26" y2={y} stroke={W} strokeWidth="1.8" opacity="0.75" />
        ))}
        <ellipse cx="15" cy="104" rx="9" ry="7" fill={S2} stroke={OL} strokeWidth="1" />
      </g>
      {/* Right arm */}
      <g style={{ transformOrigin: "76px 78px", animation: "armSpreadR 3.6s ease-in-out infinite" }}>
        <rect x="74" y="68" width="22" height="36" rx="8" fill={S1} stroke={OL} strokeWidth="1.3" />
        {[80,86,92,98].map(y => (
          <line key={y} x1="74" y1={y} x2="96" y2={y} stroke={W} strokeWidth="1.8" opacity="0.75" />
        ))}
        <ellipse cx="85" cy="104" rx="9" ry="7" fill={S2} stroke={OL} strokeWidth="1" />
      </g>

      {/* ── Dramatic spiky hair ── */}
      <g fill={HA} stroke={OL} strokeWidth="1.2">
        {/* Back skull mass */}
        <ellipse cx="50" cy="32" rx="20" ry="19" />
        {/* Spikes going up */}
        <polygon points="38,20 34,0 46,18" />
        <polygon points="46,14 44,-8 56,14" />
        <polygon points="54,14 56,-10 66,18" />
        <polygon points="62,20 68,-2 70,22" />
        {/* Side spikes */}
        <polygon points="30,30 14,18 32,38" />
        <polygon points="70,30 86,18 68,38" />
      </g>

      {/* ── Face ── */}
      <SeriousFace cx={50} cy={34} r={18} eyeDir={0} lidHeavy />
    </svg>
  )
}

/* ══════════════════════════════════════════════
   CHARACTER 3 — 遊戯使い (The Game Master)
   Sitting cool, all black, skull motifs, chain,
   gaming case beside him, fade haircut
   ══════════════════════════════════════════════ */
function Gamer() {
  return (
    <svg viewBox="0 0 130 160" width="130" height="160" style={{ overflow: "visible" }}>

      {/* ── Legs in cool sit ── */}
      {/* Left leg stretched */}
      <rect x="18" y="95" width="22" height="48" rx="5" fill={BK} stroke={OL} strokeWidth="1.2" />
      {/* Skull ankle guard */}
      <rect x="16" y="128" width="26" height="14" rx="3" fill="#1A1A1A" stroke={OL} strokeWidth="1.1" />
      <circle cx="29" cy="135" r="4.5" fill={BKL} stroke={OL} strokeWidth="0.8" />
      <circle cx="29" cy="135" r="2.5" fill={OL} />
      <circle cx="26" cy="133" r="1" fill={W} opacity="0.5" />
      <circle cx="32" cy="133" r="1" fill={W} opacity="0.5" />
      {/* Boot */}
      <ellipse cx="29" cy="145" rx="14" ry="7" fill="#111" stroke={OL} strokeWidth="1" />
      <rect x="17" y="138" width="26" height="10" rx="2" fill="#1A1A1A" stroke={OL} strokeWidth="1" />

      {/* Right leg bent */}
      <path d="M 62,95 Q 58,118 70,130 L 82,128 Q 74,115 78,95 Z"
        fill={BK} stroke={OL} strokeWidth="1.2" />
      {/* Right skull ankle guard */}
      <rect x="68" y="124" width="26" height="14" rx="3" fill="#1A1A1A" stroke={OL} strokeWidth="1.1" />
      <circle cx="81" cy="131" r="4.5" fill={BKL} stroke={OL} strokeWidth="0.8" />
      <circle cx="81" cy="131" r="2.5" fill={OL} />
      <circle cx="78" cy="129" r="1" fill={W} opacity="0.5" />
      <circle cx="84" cy="129" r="1" fill={W} opacity="0.5" />
      <ellipse cx="81" cy="140" rx="14" ry="7" fill="#111" stroke={OL} strokeWidth="1" />

      {/* ── Body (sleeveless black jacket) ── */}
      <rect x="22" y="48" width="54" height="48" rx="7" fill={BK} stroke={OL} strokeWidth="1.4" />
      {/* Open jacket — chest visible */}
      <path d="M 40,48 L 49,68 L 49,96" fill={S1} stroke={OL} strokeWidth="1" />
      <path d="M 58,48 L 49,68" fill="none" stroke={OL} strokeWidth="1" />
      {/* Skull necklace */}
      <circle cx="49" cy="60" r="5" fill={BKL} stroke={OL} strokeWidth="0.8" />
      <circle cx="49" cy="60" r="3" fill={OL} />
      <circle cx="47" cy="58.5" r="1.2" fill={W} opacity="0.6" />
      <circle cx="51" cy="58.5" r="1.2" fill={W} opacity="0.6" />

      {/* ── Arms ── */}
      {/* Left arm resting */}
      <rect x="6" y="55" width="18" height="36" rx="7" fill={S0} stroke={OL} strokeWidth="1.2" />
      <ellipse cx="15" cy="90" rx="9" ry="6" fill={S1} stroke={OL} strokeWidth="1" />
      {/* Right arm resting on case */}
      <rect x="76" y="60" width="18" height="30" rx="7" fill={S0} stroke={OL} strokeWidth="1.2" />
      <ellipse cx="85" cy="90" rx="9" ry="6" fill={S1} stroke={OL} strokeWidth="1" />

      {/* ── Gaming case (to the right) ── */}
      <rect x="88" y="82" width="40" height="44" rx="4" fill={BK} stroke={OL} strokeWidth="1.4" />
      {/* Skull stickers */}
      {[
        { x: 96, y: 92, c: "#E879C0" },
        { x: 110, y: 90, c: "#60E8A0" },
        { x: 98, y: 108, c: "#60C8F0" },
        { x: 113, y: 106, c: "#F0D060" },
      ].map(({ x, y, c }, i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5.5" fill={BKL} stroke={OL} strokeWidth="0.8" />
          <circle cx={x} cy={y} r="3.5" fill={c} opacity="0.85" />
          <circle cx={x - 1.2} cy={y - 1.2} r="1.2" fill={W} opacity="0.5" />
          <circle cx={x + 1.5} cy={y - 1} r="1" fill={W} opacity="0.3" />
        </g>
      ))}
      {/* Chain from case */}
      {[0,1,2,3,4,5].map(i => (
        <ellipse key={i}
          cx={104 + i * 5} cy={128 + i * 4}
          rx="4.5" ry="2.5"
          fill="none" stroke="#8A8A8A" strokeWidth="1.5"
          transform={`rotate(${i * 18}, ${104 + i * 5}, ${128 + i * 4})`}
        />
      ))}

      {/* ── Fade / taper haircut ── */}
      <g>
        {/* Base skull */}
        <ellipse cx="49" cy="24" rx="19" ry="18" fill={HA} stroke={OL} strokeWidth="1.4" />
        {/* Top texture — slight wave */}
        <path d="M 32,16 Q 40,10 49,8 Q 58,10 66,16" fill={HA} stroke={OL} strokeWidth="1" />
        {/* Fade line sides */}
        <path d="M 30,24 Q 30,32 33,38" fill="none" stroke={OL} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 68,24 Q 68,32 65,38" fill="none" stroke={OL} strokeWidth="1.8" strokeLinecap="round" />
        {/* Part line */}
        <path d="M 38,10 Q 46,7 54,10" fill="none" stroke="#1A0E08" strokeWidth="1" />
      </g>

      {/* ── Face ── */}
      <SeriousFace cx={49} cy={26} r={17} eyeDir={1} lidHeavy />
    </svg>
  )
}

/* ── Cloud ── */
function Cloud({ w = 200, h = 90 }: { w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}
      style={{ filter: "drop-shadow(0 10px 30px rgba(147,197,253,0.5))" }}>
      <ellipse cx={w*.50} cy={h*.70} rx={w*.45} ry={h*.30} fill="white" />
      <ellipse cx={w*.28} cy={h*.52} rx={w*.24} ry={h*.36} fill="white" />
      <ellipse cx={w*.52} cy={h*.36} rx={w*.28} ry={h*.34} fill="white" />
      <ellipse cx={w*.75} cy={h*.52} rx={w*.22} ry={h*.32} fill="white" />
      <ellipse cx={w*.88} cy={h*.62} rx={w*.16} ry={h*.26} fill="white" />
      {/* Blue-tinted shadow underside */}
      <ellipse cx={w*.50} cy={h*.88} rx={w*.44} ry={h*.14} fill="rgba(147,197,253,0.55)" />
    </svg>
  )
}

function MiniCloud({ w = 90, h = 40 }: { w?: number; h?: number }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}
      style={{ filter: "drop-shadow(0 5px 12px rgba(147,197,253,0.4))" }}>
      <ellipse cx={w*.50} cy={h*.70} rx={w*.44} ry={h*.28} fill="white" />
      <ellipse cx={w*.30} cy={h*.48} rx={w*.22} ry={h*.34} fill="white" />
      <ellipse cx={w*.55} cy={h*.34} rx={w*.26} ry={h*.32} fill="white" />
      <ellipse cx={w*.72} cy={h*.52} rx={w*.20} ry={h*.28} fill="white" />
      <ellipse cx={w*.50} cy={h*.88} rx={w*.44} ry={h*.12} fill="rgba(147,197,253,0.45)" />
    </svg>
  )
}

/* ── Kanji label (black brush-stroke panel) ── */
function KanjiLabel({ text, sub }: { text: string; sub: string }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "rgba(10,6,4,0.88)",
      padding: "8px 10px",
      borderRadius: 2,
      boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
      backdropFilter: "blur(4px)",
      gap: 2,
    }}>
      <span style={{
        fontFamily: "serif",
        fontSize: "clamp(13px,1.6vw,18px)",
        color: "white",
        lineHeight: 1.1,
        writingMode: "vertical-rl",
        letterSpacing: ".1em",
      }}>{text}</span>
      <span style={{
        fontFamily: "var(--font-dm-mono),monospace",
        fontSize: 7,
        color: "rgba(255,255,255,0.5)",
        letterSpacing: ".12em",
        marginTop: 4,
      }}>{sub}</span>
    </div>
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
      {/* ═══════════════════════════════════
          PANEL 1 — Sky scene
          ═══════════════════════════════════ */}
      <section id="home" style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        animation: "sceneFadeUp .9s ease both",
      }}>

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
          }}>Lapo Odunjo.</h1>
          <p style={{
            fontFamily: "var(--font-playfair),serif",
            fontStyle: "italic",
            fontSize: "clamp(14px,2vw,20px)",
            color: "rgba(255,255,255,0.88)",
            marginTop: 12,
            textShadow: "0 1px 12px rgba(3,105,161,0.4)",
          }}>
            I build AI systems that survive contact with the real world.
          </p>
        </div>

        {/* ══════════════════════════════════
            THREE CHARACTERS ON CLOUDS
            ══════════════════════════════════ */}
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          height: "clamp(340px,58vh,560px)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "clamp(40px,6vh,80px)",
        }}>

          {/* ── LEFT: 記録者 Reader ── */}
          <div style={{
            position: "absolute",
            left: "clamp(10px,4%,60px)",
            bottom: "clamp(60px,13vh,140px)",
            animation: "cloudDriftL 110s linear infinite alternate",
            zIndex: 4,
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <KanjiLabel text="記録者" sub="RECORDER" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ animation: "cloudBobSlow 4.8s ease-in-out infinite", marginBottom: -18 }}>
                  <Reader />
                </div>
                <div style={{ animation: "cloudSquish 4.8s ease-in-out infinite" }}>
                  <Cloud w={230} h={100} />
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTRE: 風の戦士 Warrior/Jumper ── */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: "clamp(80px,16vh,180px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 5,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 4 }}>
              <div style={{ animation: "jumpBounce 3.6s ease-in-out infinite" }}>
                <Jumper />
              </div>
              <KanjiLabel text="風の戦士" sub="WIND WARRIOR" />
            </div>
            {/* Mini cloud trail */}
            <div style={{ display: "flex", gap: "clamp(8px,2vw,24px)", alignItems: "flex-end" }}>
              <div style={{ animation: "cloudDriftL 80s linear infinite alternate" }}>
                <MiniCloud w={88} h={40} />
              </div>
              <div style={{ animation: "cloudDriftR 88s linear infinite alternate", marginBottom: 6 }}>
                <MiniCloud w={72} h={34} />
              </div>
              <div style={{ animation: "cloudDriftL 96s linear infinite alternate", marginBottom: 2 }}>
                <MiniCloud w={80} h={38} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: 遊戯使い Gamer ── */}
          <div style={{
            position: "absolute",
            right: "clamp(10px,4%,60px)",
            bottom: "clamp(60px,13vh,140px)",
            animation: "cloudDriftR 95s linear infinite alternate",
            zIndex: 4,
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ animation: "cloudBob 5.4s ease-in-out infinite", marginBottom: -18 }}>
                  <Gamer />
                </div>
                <div style={{ animation: "cloudSquish 5.4s ease-in-out infinite" }}>
                  <Cloud w={240} h={102} />
                </div>
              </div>
              <KanjiLabel text="遊戯使い" sub="GAME MASTER" />
            </div>
          </div>

        </div>

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
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".22em", color: "rgba(255,255,255,0.65)" }}>
              SCROLL TO EXPLORE
            </span>
            <div style={{ animation: "scrollBounce 1.8s ease-in-out infinite" }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 3v12M4 10l5 5 5-5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
          <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".28em", color: "var(--terra)", marginBottom: 10 }}>
            ── SELECT A DESTINATION ──
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair),serif", fontWeight: 900, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-.02em", lineHeight: 1, color: "var(--ink)", margin: 0 }}>
            World Map
          </h2>
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
                <div style={{ fontFamily: "var(--font-playfair),serif", fontWeight: 700, fontSize: "clamp(15px,1.8vw,20px)", color: "var(--ink)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".12em", color: "var(--muted)" }}>{sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
