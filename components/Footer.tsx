import Link from "next/link"

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "24px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 9,
        color: "var(--muted)",
      }}
    >
      <span>© 2025 Onaolapo Michael Odunjo</span>
      <span
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: 11,
        }}
      >
        Ad astra per aspera.
      </span>
      <Link
        href="https://github.com/Omodunjo11"
        target="_blank"
        rel="noopener"
        style={{ color: "var(--terra)" }}
      >
        GitHub ↗
      </Link>
    </footer>
  )
}
