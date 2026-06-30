import Link from "next/link"
import Reveal from "@/components/Reveal"
import { essays } from "@/lib/writing"

export default function HomeWriting() {
  const picks = essays.slice(0, 2)

  return (
    <section className="home-writing">
      <div className="pad-page home-writing__inner">
        <Reveal>
          <div className="section-header-row" style={{ marginBottom: 32, padding: 0 }}>
            <div>
              <p className="home-section-eyebrow home-section-eyebrow--light">Writing</p>
              <h2 className="home-section-title home-section-title--light">
                Thinking that hasn&apos;t made it into a product yet.
              </h2>
            </div>
            <Link href="/writing" className="btn btn--ghost btn--sm" style={{ flexShrink: 0 }}>
              All essays →
            </Link>
          </div>
        </Reveal>

        <div className="home-writing__grid">
          {picks.map((essay, i) => (
            <Reveal key={essay.slug} delay={i * 0.08}>
              <Link href={essay.url} target="_blank" rel="noopener noreferrer" className="home-writing__card">
                <div className="home-writing__meta">
                  <span>{essay.category}</span>
                  <span>{essay.year}</span>
                </div>
                <h3 className="home-writing__title">{essay.title}</h3>
                <p className="home-writing__desc">{essay.description}</p>
                <span className="home-writing__link">Read on Medium →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
