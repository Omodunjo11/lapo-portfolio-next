type TickerProps = {
  items: { text: string; highlight?: boolean }[]
}

export default function Ticker({ items }: TickerProps) {
  const doubled = [...items, ...items]

  return (
    <div className="ticker-bar">
      <div className="ticker-inner">
        {doubled.map((item, i) => (
          <span key={i} className={item.highlight ? "ticker-item ticker-item--highlight" : "ticker-item"}>
            {item.text}
            <span className="ticker-sep">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
