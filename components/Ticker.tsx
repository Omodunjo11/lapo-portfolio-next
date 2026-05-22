type TickerProps = {
  items: { text: string; highlight?: boolean }[]
}

export default function Ticker({ items }: TickerProps) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: "hidden", background: "linear-gradient(90deg,#0F2547 0%,#1a1a4e 50%,#0F2547 100%)", padding: "11px 0" }}>
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
              color: item.highlight ? "#FDE68A" : "rgba(186,230,253,.70)",
              padding: "0 24px",
            }}
          >
            {item.text}
            <span style={{ color: "#7DD3FC", fontSize: 6 }}>&nbsp;&nbsp;◆&nbsp;&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
