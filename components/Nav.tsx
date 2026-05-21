"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/#about", label: "Story" },
  { href: "/#work", label: "Build" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/#contact", label: "Connect" },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 48px",
        background: "rgba(245,240,232,0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        transform: "translateY(-100%)",
        animation: "navIn .6s .2s cubic-bezier(.16,1,.3,1) forwards",
      }}
    >
      <Link href="/" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-.02em" }}>
        L·O
      </Link>

      <ul style={{ display: "flex", gap: 28, listStyle: "none", alignItems: "center" }}>
        {links.map(({ href, label }) => {
          const active =
            (href === "/projects" && pathname.startsWith("/projects")) ||
            (href === "/writing" && pathname.startsWith("/writing"))
          return (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase",
                  color: active ? "var(--terra)" : "var(--muted)",
                  transition: "color .2s", position: "relative",
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
            href="mailto:omodunjo@wharton.upenn.edu"
            style={{ background: "var(--ink)", color: "var(--paper)", padding: "7px 18px", borderRadius: 2, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", transition: "background .25s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--terra)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--ink)")}
          >
            Let&apos;s Talk
          </Link>
        </li>
      </ul>
    </nav>
  )
}
