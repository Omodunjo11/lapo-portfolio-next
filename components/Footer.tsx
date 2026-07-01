"use client"
import Link from "next/link"
import { CANONICAL_NAME, IDENTITY_LINE, PROFILE_LINKS } from "@/lib/site"

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "32px 48px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        fontSize: 9,
        color: "var(--muted)",
        background: "var(--paper)",
      }}
    >
      <p style={{ fontSize: 10, color: "var(--mid)", lineHeight: 1.7, maxWidth: 720, margin: 0 }}>
        {IDENTITY_LINE}. Official portfolio and professional home on the web.
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="footer-brand">
            {CANONICAL_NAME}
          </span>
          <span style={{ fontSize: 9, color: "var(--muted)", letterSpacing: ".06em" }}>
            © 2026 · New York, NY
          </span>
        </div>

        <span className="footer-motto">Ad astra per aspera.</span>

        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          {[
            { label: "Email", href: PROFILE_LINKS.email },
            { label: "LinkedIn", href: PROFILE_LINKS.linkedin },
            { label: "GitHub", href: PROFILE_LINKS.github },
            { label: "Medium", href: PROFILE_LINKS.medium },
            { label: "Twitter", href: PROFILE_LINKS.twitter },
            { label: "Instagram", href: PROFILE_LINKS.instagram },
            { label: "Goodreads", href: PROFILE_LINKS.goodreads },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer me" : undefined}
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
      </div>

      <p className="footer-build">Production AI operator · case studies on Vercel</p>
    </footer>
  )
}
