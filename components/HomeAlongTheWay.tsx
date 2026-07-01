import Link from "next/link"
import Reveal from "@/components/Reveal"
import { HOME_ALONG_THE_WAY } from "@/lib/home"

export default function HomeAlongTheWay() {
  return (
    <section className="home-along page-section page-section--bordered">
      <div className="pad-page home-along__inner">
        <Reveal>
          <div className="section-header-row" style={{ marginBottom: 28, padding: 0 }}>
            <div>
              <p className="home-section-eyebrow">
                <span className="section-symbol" aria-hidden="true">
                  ⬡
                </span>{" "}
                Along the way
              </p>
              <h2 className="home-section-title">Side quests with real stakes.</h2>
            </div>
            <Link href="/experience" className="btn btn--outline btn--sm" style={{ flexShrink: 0 }}>
              Full experience →
            </Link>
          </div>
        </Reveal>

        <div className="home-along__grid">
          {HOME_ALONG_THE_WAY.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.05}>
              <article className="home-along__card interactive-surface">
                <div className="home-along__meta">
                  <span>{item.role}</span>
                  <span>{item.period}</span>
                </div>
                <h3 className="home-along__org">{item.org}</h3>
                <p className="home-along__note">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
