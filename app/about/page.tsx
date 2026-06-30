"use client"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { CANONICAL_NAME, IDENTITY_LINE, PROFILE_LINKS } from "@/lib/site"

const stops = [
  {
    city: "Lagos",
    region: "Nigeria",
    note: "Where everything started. Reading systems before I had words for it.",
  },
  {
    city: "Bradford",
    region: "England",
    note: "Chemical engineering degree. First time being the only one in the room who looked like me.",
  },
  {
    city: "Ghana",
    region: "West Africa",
    note: "Pro-bono consulting, 2018–2019. First time doing the work without the title.",
  },
  {
    city: "Atlanta",
    region: "Georgia",
    note: "Big Nerd Ranch. Where I stopped being an engineer who could code and started being someone who built things.",
  },
  {
    city: "New Haven + Greensboro",
    region: "Connecticut + North Carolina",
    note: "COVID. Remote work. Learning how to build when the city around you has stopped.",
  },
  {
    city: "New York",
    region: "New York",
    note: "First time. The city that does not wait for you to be ready.",
  },
  {
    city: "Philadelphia",
    region: "Pennsylvania",
    note: "Wharton MBA. Shipped Kinage in production while writing papers. Did not sleep enough.",
  },
  {
    city: "New York",
    region: "New York",
    note: "Back. Building now. This is where the work is.",
    current: true,
  },
]

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
    title: "Berlin",
    author: "Bea Setton",
    note: "A novel about arriving somewhere unfamiliar and figuring out who you are in rooms that do not quite fit yet. I keep returning to books about that particular feeling.",
  },
  {
    title: "Days at the Morisaki Bookshop",
    author: "Satoshi Yagisawa",
    note: "Quiet and restorative. A reminder that healing is usually slower and smaller than you expect, and that it happens anyway.",
  },
  {
    title: "Canon",
    author: "Paige Lewis",
    note: "Poetry that notices things sideways. I am reading it in transit, which turns out to be the right context.",
  },
  {
    title: "Impossible Creatures",
    author: "Katherine Rundell",
    note: "Pure imagination and craft. I read fiction to remember what it feels like to build a world from scratch, which is closer to product work than most people admit.",
  },
  {
    title: "Team of Teams",
    author: "Stanley McChrystal",
    note: "On how complex organizations adapt when hierarchy stops working fast enough. The most useful management book I have read for thinking about AI systems that need human judgment in the loop.",
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <p className="page-hero-eyebrow">01 · About</p>
        <h1 className="page-hero-title">
          Lagos. Bradford. NYC.<br />
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
                I go by Lapo. Eight cities, one thread: arrive somewhere unfamiliar, learn how the system
                actually works versus how it is supposed to, find your footing, move again.
              </p>
              <p className="body-text">
                Today I build AI systems for regulated industries, environments where trust matters and the cost
                of a wrong answer is real. My work sits at the intersection of product, AI, financial infrastructure,
                and practical judgment about when to automate and when not to.
              </p>
              <p className="body-text">
                I finished my Wharton MBA while shipping Kinage, an AI market intelligence platform, in production.
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

      {/* Trajectory */}
      <section className="page-section page-section--bordered">
        <div className="pad-page" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
          <Reveal>
            <div className="section-header-inline" style={{ marginBottom: 40 }}>
              <span className="section-number">02</span>
              <span className="section-label">The Journey</span>
              <div className="section-divider" />
            </div>
          </Reveal>
          <div style={{ overflowX: "auto", paddingBottom: 8 }}>
            <div style={{ display: "flex", gap: 0, minWidth: "fit-content" }}>
              {stops.map((stop, i) => (
                <Reveal key={`${stop.city}-${i}`} delay={i * 0.06}>
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    {/* Card */}
                    <div style={{
                      width: 180,
                      padding: "24px 20px",
                      background: stop.current ? "var(--ink)" : "var(--paper)",
                      borderTop: `2px solid ${stop.current ? "var(--terra)" : "var(--border)"}`,
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                      borderLeft: i === 0 ? "1px solid var(--border)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                      position: "relative",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: ".2em",
                        color: stop.current ? "var(--terra)" : "var(--muted)",
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div style={{
                        fontFamily: "var(--font-playfair), serif",
                        fontSize: 17,
                        fontWeight: 700,
                        lineHeight: 1.15,
                        color: stop.current ? "var(--paper)" : "var(--ink)",
                      }}>
                        {stop.city}
                      </div>
                      <div style={{
                        fontSize: 8,
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: stop.current ? "rgba(248,250,252,0.4)" : "var(--muted)",
                      }}>
                        {stop.region}
                      </div>
                      <p style={{
                        fontSize: 11,
                        lineHeight: 1.7,
                        color: stop.current ? "rgba(248,250,252,0.65)" : "var(--muted)",
                        marginTop: 4,
                        flex: 1,
                      }}>
                        {stop.note}
                      </p>
                      {stop.current && (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 4,
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--terra)", display: "inline-block" }} />
                          <span style={{ fontSize: 8, letterSpacing: ".12em", color: "var(--terra)", textTransform: "uppercase" }}>Now</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Perspective */}
      <section className="page-section page-section--bordered">
        <Reveal>
          <div className="perspective-wrap pad-page">
            <div className="section-header-inline" style={{ marginBottom: 32 }}>
              <span className="section-number">03</span>
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

      {/* Reading — Bookshelf */}
      <section className="page-section page-section--bordered">
        <div className="pad-page" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
          <Reveal>
            <div className="section-header-inline" style={{ marginBottom: 12 }}>
              <span className="section-number">04</span>
              <span className="section-label">What I Read</span>
              <div className="section-divider" />
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, lineHeight: 1.85, marginBottom: 48 }}>
              I read across systems, economics, and stories about people building things in the wrong order.
            </p>
          </Reveal>

          {/* Shelf */}
          <Reveal>
            <div style={{ position: "relative", overflowX: "auto", paddingBottom: 24 }}>
              {/* Books row */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, minWidth: "fit-content", paddingBottom: 12 }}>
                {reading.map((book, i) => {
                  const spineColors = [
                    { bg: "#1a2744", text: "#a8b8d8" },
                    { bg: "#5c3317", text: "#e8c89a" },
                    { bg: "#1f3a2a", text: "#8ec8a0" },
                    { bg: "#3b1f5c", text: "#c4a8e0" },
                    { bg: "#2a1f1a", text: "#c8a87a" },
                  ]
                  const heights = [220, 190, 240, 200, 210]
                  const widths = [38, 28, 24, 36, 42]
                  const col = spineColors[i % spineColors.length]
                  return (
                    <div
                      key={book.title}
                      title={`${book.title} — ${book.author}`}
                      style={{
                        position: "relative",
                        height: heights[i],
                        width: widths[i],
                        background: col.bg,
                        borderRadius: "2px 2px 0 0",
                        boxShadow: "inset -3px 0 6px rgba(0,0,0,0.3), 2px 0 4px rgba(0,0,0,0.15)",
                        cursor: "default",
                        flexShrink: 0,
                        transition: "transform .2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-8px)")}
                      onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      {/* Spine text */}
                      <div style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        color: col.text,
                        padding: "12px 0",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 6,
                      }}>
                        <span style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: ".04em",
                          lineHeight: 1.2,
                          textAlign: "center",
                        }}>{book.title}</span>
                        <span style={{
                          fontSize: 7,
                          letterSpacing: ".1em",
                          opacity: 0.6,
                          textTransform: "uppercase",
                        }}>{book.author.split(" ").pop()}</span>
                      </div>
                      {/* Spine highlight */}
                      <div style={{
                        position: "absolute",
                        top: 0, left: 0,
                        width: 3,
                        height: "100%",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "2px 0 0 0",
                      }} />
                    </div>
                  )
                })}
              </div>
              {/* Shelf plank */}
              <div style={{
                height: 14,
                background: "linear-gradient(180deg, #c8a87a 0%, #a07848 40%, #8a6030 100%)",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "2px 2px 0 0",
                }} />
              </div>
            </div>
          </Reveal>

          {/* Hover notes */}
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 40 }}>
              {reading.map((book) => (
                <div key={book.title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", minWidth: 120, paddingTop: 3 }}>{book.author}</span>
                  <div>
                    <span style={{ fontFamily: "var(--font-playfair), serif", fontSize: 14, fontWeight: 700, marginRight: 10 }}>{book.title}</span>
                    <span style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75 }}>{book.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div style={{ marginTop: 32 }}>
              <Link href={PROFILE_LINKS.goodreads} target="_blank" rel="noopener noreferrer me" className="btn btn--outline">
                Full reading list on Goodreads ↗
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Photo strip */}
      <section className="page-section page-section--bordered">
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "var(--border)" }}>
            {[
              { src: "/images/photo-wharton-study.png", alt: "Wharton study session, Philadelphia" },
              { src: "/images/photo-tuxedos.jpg", alt: "Formal event, New York" },
              { src: "/images/photo-dinner.jpg", alt: "Dinner, New York" },
            ].map((photo) => (
              <div key={photo.src} style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={80}
                  style={{ objectFit: "cover", transition: "transform .4s" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Outside the work */}
      <section className="page-section page-section--bordered">
        <Reveal>
          <div className="pad-page" style={{ paddingTop: "clamp(32px, 4vw, 48px)", paddingBottom: "clamp(32px, 4vw, 48px)" }}>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: "clamp(16px, 1.8vw, 20px)", color: "var(--mid)", maxWidth: 640, lineHeight: 1.75 }}>
              Outside the work I am a committed Man United fan in difficult times, and a France supporter
              who thinks Mbappé and Dembélé together is the most exciting forward line in world football.
              I read more than I should, and think too hard about why some cities produce disproportionate
              numbers of people who build things.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  )
}
