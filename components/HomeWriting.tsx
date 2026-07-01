import Link from "next/link"
import Reveal from "@/components/Reveal"
import EssayTopicChip from "@/components/EssayTopicChip"
import { FEATURED_ESSAY_SLUG, getEssay, getEssayTopic, getMediumEssays } from "@/lib/writing"

export default function HomeWriting() {
  const featured = getEssay(FEATURED_ESSAY_SLUG)!
  const mediumPicks = getMediumEssays().slice(0, 2)

  return (
    <section className="home-writing">
      <div className="pad-page home-writing__inner">
        <Reveal>
          <div className="section-header-row" style={{ marginBottom: 32, padding: 0 }}>
            <div>
              <p className="home-section-eyebrow home-section-eyebrow--light">Writing</p>
              <h2 className="home-section-title home-section-title--light">
                The parts of me that don&apos;t fit a case study.
              </h2>
            </div>
            <Link href="/writing" className="btn btn--ghost btn--sm" style={{ flexShrink: 0 }}>
              All essays →
            </Link>
          </div>
        </Reveal>

        <div className="home-writing__grid home-writing__grid--featured">
          <Reveal>
            <Link href={featured.url} className="home-writing__card home-writing__card--featured">
              <div className="home-writing__chips">
                <EssayTopicChip topic={getEssayTopic(featured.category)} />
              </div>
              <div className="home-writing__meta">
                <span>{featured.year}</span>
                {featured.readingTime ? <span>{featured.readingTime}</span> : null}
              </div>
              <h3 className="home-writing__title">{featured.title}</h3>
              <p className="home-writing__desc">{featured.description}</p>
              <span className="home-writing__link">Read on lapoodunjo.com →</span>
            </Link>
          </Reveal>

          {mediumPicks.map((essay, i) => (
            <Reveal key={essay.slug} delay={0.08 + i * 0.08}>
              <Link href={essay.url} target="_blank" rel="noopener noreferrer" className="home-writing__card">
                <div className="home-writing__chips">
                  <EssayTopicChip topic={getEssayTopic(essay.category)} />
                </div>
                <div className="home-writing__meta">
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
