"use client"
import Link from "next/link"

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        fontSize: 9,
        color: "var(--muted)",
        background: "var(--paper)",
      }}
    >
      {/* Left: branding */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, color: "var(--ink)", letterSpacing: "-.01em" }}>
          Lapo Odunjo
        </span>
        <span style={{ fontSize: 9, color: "var(--muted)", letterSpacing: ".06em" }}>
          © 2026 · Philadelphia, PA
        </span>
      </div>

      {/* Centre: motto */}
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: 12,
          color: "var(--muted)",
          letterSpacing: ".02em",
        }}
      >
        Ad astra per aspera.
      </span>

      {/* Right: links */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {[
          { label: "Email", href: "mailto:odunjoonaolapo@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com/in/onaolapomichaelodunjo" },
          { label: "GitHub", href: "https://github.com/Omodunjo11" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener" : undefined}
            style={{
              fontSize: 9,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              transition: "color .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--terra)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            {label} ↗
          </Link>
        ))}
      </div>
    </footer>
  )
}
