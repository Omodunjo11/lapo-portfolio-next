"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/how-i-build", label: "How I Build" },
  { href: "/writing", label: "Writing" },
  { href: "/connect", label: "Connect" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`))

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 48px",
          background: "rgba(248,250,252,0.82)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          transform: "translateY(-100%)",
          animation: "navIn .6s .2s cubic-bezier(.16,1,.3,1) forwards",
        }}
      >
        <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-.02em" }}>
          L·O
        </Link>

        {/* Desktop links */}
        <ul className="nav-links-wrap">
          {links.map(({ href, label }) => {
            const active = isActive(href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase",
                    color: active ? "var(--terra)" : "var(--muted)",
                    transition: "color .2s",
                    paddingBottom: 2,
                    borderBottom: active ? "1px solid var(--terra)" : "none",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--terra)")}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? "var(--terra)" : "var(--muted)")}
                >
                  {label}
                </Link>
              </li>
            )
          })}
          <li>
            <Link
              href="/connect"
              style={{ background: "var(--ink)", color: "var(--paper)", padding: "7px 18px", borderRadius: 2, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", transition: "background .25s", display: "inline-block" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--terra)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
            >
              Let&apos;s Talk
            </Link>
          </li>
        </ul>

        {/* Hamburger — visible only on mobile via CSS */}
        <button
          className="nav-hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="3" y1="6" x2="17" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="10" x2="17" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown overlay */}
      {open && (
        <div className="mobile-menu-overlay" style={{
          position: "fixed", top: 57, left: 0, right: 0,
          background: "rgba(248,250,252,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
          padding: "8px 24px 24px",
          zIndex: 190,
        }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "14px 0",
                fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase",
                color: isActive(href) ? "var(--terra)" : "var(--muted)",
                borderBottom: "1px solid var(--border)",
                transition: "color .2s",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/connect"
            onClick={() => setOpen(false)}
            style={{ display: "block", marginTop: 16, background: "var(--ink)", color: "var(--paper)", padding: "12px 18px", borderRadius: 2, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", textAlign: "center" }}
          >
            Let&apos;s Talk
          </Link>
        </div>
      )}
    </>
  )
}
