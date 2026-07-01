import Link from "next/link"
import Reveal from "@/components/Reveal"
import HomeLifeStrip from "@/components/HomeLifeStrip"
import HomePersonalityBullets from "@/components/HomePersonalityBullets"
import {
  GOODREADS_LINK,
  HOME_JOURNEY_PICKS,
  HOME_LIFE_STRIP,
  HOME_ON_ROTATION,
  HOME_READING_PICKS,
  PERSONAL_BLURB,
} from "@/lib/personal"

export default function HomePersonality() {
  return (
    <section className="home-personality page-section page-section--bordered">
      <div className="pad-page home-personality__inner">
        <div className="home-personality__layout">
          <Reveal>
            <div className="home-personality__copy-block">
              <p className="home-section-eyebrow">The person</p>
              <h2 className="home-section-title">Besides the work.</h2>
              <p className="home-personality__blurb">{PERSONAL_BLURB}</p>
              <HomePersonalityBullets />
            </div>
          </Reveal>

          <HomeLifeStrip
            photos={HOME_LIFE_STRIP}
            label="Life lately"
            linkLabel="More on About →"
            layout="grid"
            polaroid
            inset
            delay={0.06}
          />
        </div>

        <Reveal delay={0.12}>
          <div className="home-shelf">
            <p className="home-shelf__label">Reading lately</p>
            <div className="home-reading-picks__grid">
              {HOME_READING_PICKS.map((book) => (
                <div key={book.title} className="home-reading-picks__card">
                  <p className="home-reading-picks__title">
                    {book.title}
                    <span className="home-reading-picks__author"> · {book.author}</span>
                  </p>
                  <p className="home-reading-picks__note">{book.note}</p>
                </div>
              ))}
            </div>
            <div className="home-shelf__rotation">
              <p className="home-shelf__rotation-label">On rotation</p>
              <div className="home-shelf__rotation-grid">
                {HOME_ON_ROTATION.map((item) => (
                  <div key={item.title} className="home-shelf__rotation-card">
                    <p className="home-shelf__rotation-title">{item.title}</p>
                    <p className="home-shelf__rotation-note">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <Link href={GOODREADS_LINK} target="_blank" rel="noopener noreferrer me" className="home-personality__link">
              Full reading list on Goodreads ↗
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="home-journey-picks">
            <div className="home-journey-picks__header">
              <p className="home-journey-picks__label">Where I&apos;ve landed</p>
              <Link href="/about" className="home-personality__link">
                Full journey →
              </Link>
            </div>
            <div className="home-journey-picks__grid">
              {HOME_JOURNEY_PICKS.map((stop) => (
                <div
                  key={stop.city}
                  className={`home-journey-picks__card${"current" in stop && stop.current ? " home-journey-picks__card--current" : ""}`}
                >
                  <span className="home-journey-picks__city">{stop.city}</span>
                  <span className="home-journey-picks__years">{stop.years}</span>
                  <p className="home-journey-picks__note">{stop.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
