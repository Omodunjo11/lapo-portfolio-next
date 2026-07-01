import Link from "next/link"
import Reveal from "@/components/Reveal"
import {
  GOODREADS_LINK,
  HOME_JOURNEY_PICKS,
  HOME_READING_PICKS,
  PERSONAL_BLURB,
  PERSONAL_BULLETS,
  PERSONAL_INTRO,
} from "@/lib/personal"

export default function HomePersonality() {
  return (
    <section className="home-personality page-section page-section--bordered">
      <div className="pad-page home-personality__inner">
        <Reveal>
          <div className="home-personality__copy home-personality__copy--full">
            <p className="home-section-eyebrow">The person</p>
            <h2 className="home-section-title">Besides the work.</h2>
            <p className="home-personality__intro">{PERSONAL_INTRO}</p>
            <p className="home-personality__blurb">{PERSONAL_BLURB}</p>
            <ul className="home-personality__bullets">
              {PERSONAL_BULLETS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href="/about" className="home-personality__link">
              Full story on About →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="home-reading-picks">
            <p className="home-reading-picks__label">On the bookshelf</p>
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
            <Link href={GOODREADS_LINK} target="_blank" rel="noopener noreferrer me" className="home-personality__link">
              Full reading list on Goodreads ↗
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="home-journey-picks">
            <div className="home-journey-picks__header">
              <p className="home-journey-picks__label">Where I&apos;ve been</p>
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
