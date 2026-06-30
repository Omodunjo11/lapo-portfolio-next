"use client"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { CANONICAL_NAME, IDENTITY_LINE, PROFILE_LINKS } from "@/lib/site"

const perspectives = [
  {
    title: "The symptom is rarely the problem",
    body: "Lagos taught me to distrust the first explanation. When an AI pipeline or an investment thesis keeps failing, something upstream is usually wrong, something the room is reluctant to say out loud. I have made a habit of asking that question before anything else.",
  },
  {
    title: "Informal systems encode real intelligence",
    body: "That skepticism deepened when I looked closely at how credit actually works in West Africa. Ajo groups and market lending look messy on a spreadsheet but they are often more adaptive than the products built to replace them. Understanding what already works before touching it is not just a courtesy. It is how you avoid breaking the thing you came to fix.",
  },
  {
    title: "The bottleneck is trust, not accuracy",
    body: "The same lesson shows up inside regulated institutions. The constraint is almost never the model. It is whether a compliance officer, a fraud investigator, or an analyst will act on what the system says. Designing for adoption under scrutiny is a harder problem than improving benchmark numbers, and it is the one that actually matters.",
  },
  {
    title: "Hold both lenses at once",
    body: "Working from the continent inside Western institutions means carrying global rigor and local reality at the same time. The products that last do not ask people to choose between them, and neither do I.",
  },
]

const reading = [
  {
    title: "Seeing Like a State",
    author: "James C. Scott",
    note: "On why legible, formal systems so often destroy the informal intelligence they replace. The most useful book I have read for thinking about fintech in Africa.",
  },
  {
    title: "Poor Economics",
    author: "Abhijit Banerjee & Esther Duflo",
    note: "Rigorous and human at the same time. Changed how I think about designing for people at the economic margin.",
  },
  {
    title: "The Entrepreneurial State",
    author: "Mariana Mazzucato",
    note: "A corrective for anyone who thinks markets build things from scratch. Useful for thinking about infrastructure and who actually takes the early risk.",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    note: "Still the clearest framework I have for understanding why intelligent people make confident wrong decisions — relevant every week in product work.",
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <p className="page-hero-eyebrow">01 · About</p>
        <h1 className="page-hero-title">
          Lagos to Philly.<br />
          <em>Same question everywhere.</em>
        </h1>
        <p className="page-hero-desc">
          Where is the real problem, and what would actually help? That thread runs through
          chemical engineering, product, AI, private capital, and the regulated systems I ship today.
        </p>
      </div>

      {/* Bio */}
      <section className="page-section">
        <div className="grid-about pad-page">
          <Reveal>
            <div className="about-left">
              <Image
                src="/images/IMG_3436.jpg"
                alt={`${CANONICAL_NAME} in Philadelphia`}
                width={400}
                height={500}
                sizes="(max-width: 768px) 100vw, 33vw"
                quality={80}
                className="about-photo"
              />
              <p className="about-identity">{IDENTITY_LINE}</p>
              <div className="about-motto">
                <div className="about-motto-label">AD ASTRA PER ASPERA</div>
                <div className="about-motto-text">To the stars through difficulties.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-right">
              <p className="body-text">
                I go by Lapo. I grew up in Lagos, studied in Bradford, and found my way through New York and Philadelphia.
                Every move meant learning a new system and finding my voice in rooms that did not feel familiar at first.
                That is why I am drawn to products and people in transition.
              </p>
              <p className="body-text">
                Today I build AI systems for regulated industries, environments where trust matters and the cost of a wrong answer is real.
                My work sits at the intersection of product, AI, financial infrastructure, and practical judgment.
              </p>
              <p className="body-text">
                I recently finished my Wharton MBA while shipping Kinage, an AI market intelligence platform, in production.
                The path from chemical engineering to product to AI to private capital looks random from the outside.
                To me it has always been one question: where is the real problem, and what would actually help?
              </p>
              <div className="tag-row">
                {["AI Systems", "Private Markets", "Africa", "Fintech", "Regulated Industries"].map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/experience" className="btn btn--outline">View experience →</Link>
                <Link href="/connect" className="btn btn--filled">Connect →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Perspective */}
      <section className="page-section page-section--bordered">
        <Reveal>
          <div className="perspective-wrap pad-page">
            <div className="section-header-inline" style={{ marginBottom: 32 }}>
              <span className="section-number">02</span>
              <span className="section-label">How I Think</span>
              <div className="section-divider" />
            </div>

            <div className="perspective-layout">
              <figure className="perspective-hero">
                <Image
                  src="/images/photo-landscape.jpg"
                  alt="Tea hills outside Nairobi, Kenya"
                  width={1200}
                  height={900}
                  sizes="(max-width: 900px) 92vw, 38vw"
                  quality={85}
                  className="perspective-landscape-img"
                />
                <figcaption className="perspective-caption">Nairobi highlands · Kenya</figcaption>
              </figure>

              <div className="perspective-copy">
                <p className="perspective-lede">
                  Most of how I think about product started in Lagos, reading systems when the official story
                  does not match what is happening on the ground. That lens still shows up in the AI work I ship
                  for banks, healthcare, and markets most products never reach.
                </p>
                <div className="perspective-points">
                  {perspectives.map((item) => (
                    <article key={item.title} className="perspective-point">
                      <h3 className="perspective-title">{item.title}</h3>
                      <p className="perspective-body">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Reading */}
      <section className="page-section page-section--bordered">
        <div className="pad-page" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
          <Reveal>
            <div className="section-header-inline" style={{ marginBottom: 32 }}>
              <span className="section-number">03</span>
              <span className="section-label">What I Read</span>
              <div className="section-divider" />
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, lineHeight: 1.85, marginBottom: 40 }}>
              I read across systems, economics, and stories about people building things in the wrong order.
              These are the books that have stayed with me longest.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 1, background: "var(--border)" }}>
            {reading.map((book, i) => (
              <Reveal key={book.title} delay={i * 0.07}>
                <div style={{ background: "var(--paper)", padding: "28px 24px", height: "100%" }}>
                  <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 10 }}>{book.author}</div>
                  <div style={{ fontFamily: "var(--font-playfair), serif", fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>{book.title}</div>
                  <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75 }}>{book.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 24 }}>
              <Link
                href={PROFILE_LINKS.goodreads}
                target="_blank"
                rel="noopener noreferrer me"
                className="btn btn--outline"
              >
                Full reading list on Goodreads ↗
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outside the work */}
      <section className="page-section page-section--bordered">
        <Reveal>
          <div className="pad-page" style={{ paddingTop: "clamp(32px, 4vw, 48px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 20px)", color: "var(--mid)", maxWidth: 640, lineHeight: 1.75 }}>
              Outside the work I follow African football obsessively, read more than I should,
              and think too hard about why some cities produce disproportionate numbers of people
              who build things.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
