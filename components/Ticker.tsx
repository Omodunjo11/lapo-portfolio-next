type TickerProps = {
  items: { text: string; highlight?: boolean }[]
}

export default function Ticker({ items }: TickerProps) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: "hidden", background: "var(--bg2)", padding: "11px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: item.highlight ? "var(--gold)" : "rgba(238,234,226,.45)",
              padding: "0 24px",
            }}
          >
            {item.text}
            <span style={{ color: "var(--terra)", fontSize: 6 }}>&nbsp;&nbsp;◆&nbsp;&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
