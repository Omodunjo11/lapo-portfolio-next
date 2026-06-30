import Link from "next/link"
import Reveal from "@/components/Reveal"
import { HOME_PRINCIPLES, HOME_QUOTE } from "@/lib/home"

export default function HomeThinking() {
  return (
    <section className="page-section page-section--bordered">
      <div className="pad-page" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <div className="home-thinking-layout">
          <Reveal>
            <blockquote className="home-quote">
              <p>&ldquo;{HOME_QUOTE.text}&rdquo;</p>
              <footer>{HOME_QUOTE.source}</footer>
            </blockquote>
          </Reveal>

          <div>
            <Reveal delay={0.05}>
              <div className="section-header-row" style={{ marginBottom: 28, padding: 0 }}>
                <div>
                  <p className="home-section-eyebrow">How I build</p>
                  <h2 className="home-section-title home-section-title--sm">
                    Principles I ship by.
                  </h2>
                </div>
                <Link href="/how-i-build" className="btn btn--outline btn--sm" style={{ flexShrink: 0 }}>
                  Full framework →
                </Link>
              </div>
            </Reveal>

            <div className="home-principles">
              {HOME_PRINCIPLES.map((p, i) => (
                <Reveal key={p.n} delay={0.08 + i * 0.05}>
                  <Link href={p.href} className="home-principle-card interactive-surface">
                    <span className="home-principle-card__n">{p.n}</span>
                    <span className="home-principle-card__tag">{p.tag}</span>
                    <p className="home-principle-card__title">{p.title}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
