"use client"
import Image from "next/image"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import { featuredProjects } from "@/lib/projects"
import { essays } from "@/lib/writing"

const tickerItems = [
  { text: "Achievement Unlocked: Staff TPM", highlight: true }, { text: "Lagos → Bradford → NYC → Philly" },
  { text: "Final Boss Energy", highlight: true }, { text: "36 Countries. Still Grinding." },
  { text: "RAG Systems in Prod", highlight: true }, { text: "Side Quest: Wharton MBA" },
  { text: "LLM Evaluation Frameworks", highlight: true }, { text: "Yoruba Native Speaker" },
  { text: "No Skip Cutscene", highlight: true }, { text: "Jollof Rice Connoisseur" },
  { text: "Currently Grinding", highlight: true }, { text: "Respawn Requires Coffee" },
  { text: "Regulatory AI", highlight: true }, { text: "Built Different · Lagos Edition" },
]

const SH = ({ n, t }: { n: string; t: string }) => (
  <div style={{ padding: "56px 48px 32px", display: "flex", alignItems: "center", gap: 18 }}>
    <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>{n}</span>
    <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>{t}</span>
    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
  </div>
)

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="grid-hero">
        <div className="hero-left">
          <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp .7s .5s ease both" }}>
            <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
            AI Systems Architecture · Private Capital · Africa & U.S.
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, lineHeight: .92, letterSpacing: "-.03em", marginBottom: 12, animation: "fadeUp .8s .65s ease both" }}>
            Onaolapo<br />Michael<br /><em style={{ fontStyle: "italic", color: "var(--terra)" }}>Odunjo</em>
          </h1>
          <p style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic", marginBottom: 18, animation: "fadeUp .7s .8s ease both" }}>Lapo to most people</p>
          <p style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.5, maxWidth: 420, marginBottom: 8, minHeight: 56, animation: "fadeUp .7s 1.05s ease both", color: "var(--ink)" }}>
            I build AI systems that survive contact with the real world.
            <span className="cursor-blink" />
          </p>
          <p style={{ fontSize: 12, color: "var(--muted)", maxWidth: 400, marginBottom: 40, animation: "fadeUp .7s 1.15s ease both" }}>
            Wharton MBA · Kinage · KOVA · Amazon · Capital One · TD Bank · City Ventures
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, animation: "fadeUp .7s 1.25s ease both" }}>
            {[
              { label: "↓ Resume", href: "/resume.pdf", primary: true, download: true },
              { label: "See My Work", href: "/projects" },
              { label: "LinkedIn", href: "https://linkedin.com/in/onaolapomichaelodunjo", external: true },
              { label: "GitHub", href: "https://github.com/Omodunjo11", external: true },
              { label: "Writing", href: "/writing" },
            ].map((btn) => (
              <Link key={btn.label} href={btn.href}
                {...(btn.download ? { download: true } : {})}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener" : undefined}
                style={{ fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid", borderColor: btn.primary ? "var(--terra)" : "var(--border)", padding: "9px 18px", borderRadius: 2, transition: "all .25s", background: btn.primary ? "var(--terra)" : "transparent", color: btn.primary ? "var(--paper)" : "inherit", fontWeight: btn.primary ? 600 : 400 }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.transform = "translateY(-1px)" }}
                onMouseLeave={e => { e.currentTarget.style.background = btn.primary ? "var(--terra)" : "transparent"; e.currentTarget.style.color = btn.primary ? "var(--paper)" : "inherit"; e.currentTarget.style.borderColor = btn.primary ? "var(--terra)" : "var(--border)"; e.currentTarget.style.transform = "translateY(0)" }}
              >{btn.label}</Link>
            ))}
          </div>
        </div>
        <div className="hero-right" style={{ animation: "fadeIn 1s .8s ease both" }}>
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <Image src="/images/IMG_3437.jpg" alt="Lapo Odunjo" fill style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(8%) contrast(1.05)" }} priority />
            <span style={{ position: "absolute", bottom: 12, left: 14, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,240,232,.75)" }}>Philadelphia, 2025</span>
          </div>
          <div className="grid-stats">
            {[{ n: "2B+", l: "Records Modeled" }, { n: "60+", l: "Companies Reviewed" }, { n: "10", l: "African Markets" }, { n: "36", l: "Countries Traveled" }].map(({ n, l }) => (
              <div key={l} style={{ background: "var(--paper)", padding: 20, transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 30, fontWeight: 700, color: "var(--terra)" }}>{n}</div>
                <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATUS BAR ── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--ink)", padding: "10px 48px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", overflow: "hidden" }}>
        <span style={{ fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--terra)", flexShrink: 0 }}>◆ Currently</span>
        {[
          { label: "Playing", value: "Civilization VII" },
          { label: "Building", value: "Kinage in Prod" },
          { label: "Reading", value: "Team of Teams" },
          { label: "Grinding", value: "Wharton MBA '26" },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(245,240,232,.35)" }}>{label}:</span>
            <span style={{ fontSize: 10, color: "rgba(245,240,232,.75)", fontFamily: "var(--font-dm-mono),monospace" }}>{value}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 8, color: "rgba(245,240,232,.2)", letterSpacing: ".12em", flexShrink: 0 }}>↑↑↓↓←→←→BA</span>
      </div>

      <Ticker items={tickerItems} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "72px 0 80px" }}>
        <Reveal><SH n="01" t="About" /></Reveal>
        <div className="grid-about pad-page">
          <Reveal>
            <div className="about-left">
              <Image src="/images/IMG_3438.png" alt="Lapo Odunjo" width={400} height={500} style={{ width: "100%", height: "auto", objectFit: "cover", filter: "grayscale(15%) contrast(1.05)", marginBottom: 24 }} />
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 6 }}>AD ASTRA PER ASPERA</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic" }}>To the stars through difficulties.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--mid)" }}>I grew up between Lagos and Bradford. The question that followed me out of both was the same: how does this actually work, and what breaks first under pressure?</p>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: "var(--mid)" }}>That question took me from chemical engineering to product management to AI systems to private capital. The path looks nonlinear from the outside. From the inside, it has always been one thing: find the leverage point, then build toward it.</p>
              <blockquote style={{ borderLeft: "2px solid var(--terra)", paddingLeft: 24, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.6, color: "var(--ink)", margin: "8px 0" }}>
                Most AI systems fail in regulated institutions not because the models are weak, but because the escalation logic is naive.
              </blockquote>
              <blockquote style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 24, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 15, color: "var(--mid)", lineHeight: 1.6 }}>
                I have never been the smartest person in the room. I am usually the one who read the room differently.
              </blockquote>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {["AI Systems", "Private Markets", "Africa", "Fintech", "Regulated Industries", "Electrochemistry"].map(tag => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 2, color: "var(--mid)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE LONGER VERSION ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="02" t="Extended Lore" /></Reveal>
        <div className="grid-3col" style={{ margin: "0 48px" }}>
          {[
            {
              label: "What shaped the lens",
              name: "The thing Lagos actually taught me",
              body: "Growing up in Lagos did not teach me to be resilient. Everyone says that. What it actually taught me was to distrust surface explanations.\n\nWhen a system breaks visibly, the cause is almost never where the break is. The fuel queue is not a fuel problem. The FX swing is not an exchange rate problem. That instinct — tracing effects back to their actual origin — is the thing I bring to every model I build and every investment I evaluate.\n\nBradford gave me rigor. Lagos gave me the reason to use it.",
            },
            {
              label: "What I am obsessed with right now",
              name: "The ideas I keep coming back to",
              body: "Why informal financial systems in West Africa are more sophisticated than they look from the outside, and why formalising them badly is worse than leaving them alone.\n\nWhether AI governance in regulated institutions is a product problem or a political one. Probably both.\n\nHow to build things that outlast the person who built them. Not immortality. Just durability.\n\nWhat it actually means to be a builder from the continent operating inside Western institutions without losing the thread back home.",
            },
            {
              label: "Will absolutely debate you on",
              name: "Strong opinions, loosely held. Mostly.",
              body: "Nigerian jollof is better. This is not a debate, it is a fact with citations.\n\nMost AI failures in enterprises are communication failures dressed up as technical ones.\n\nThe best investors in African markets are the ones who have been embarrassed by their first deal. Overconfidence is the most expensive mistake you can make in a market you do not actually understand yet.\n\nAnyone who has never left their home country should not be building products for people who have.",
            },
            {
              label: "Side quest: gaming",
              name: "How games actually trained me",
              body: "I have been a gamer since I was old enough to hold a controller. What I did not realise until recently is that games taught me everything that matters: resource allocation under uncertainty, reading patterns before they complete, knowing when to push and when to reset.\n\nEvery PM I have ever met who moves fast and breaks nothing learned it the same way — through a thousand invisible iterations before the stakes were real.\n\nThe strategy games especially. If you have ever spent three hours optimising a build order in an RTS, you already understand roadmap sequencing. You just call it something different at work.",
            },
            {
              label: "Right now",
              name: "What the calendar actually looks like",
              body: "Finishing the Wharton MBA. Running Kinage in production. Raising for KOVA. Writing about what happens when AI models meet regulated institutions and neither side is ready.\n\nI co-founded Young Africans in Diaspora because the community needed to exist and nobody was building it. I run Sunday conversations about AI, capital, and what it means to operate from the continent inside Western institutions. The most interesting problems live at intersections. I keep moving toward them.",
            },
            {
              label: "What I am reading",
              name: "The shelf right now",
              books: [
                { title: "Berlin", author: "Bea Setton", bg: "linear-gradient(145deg,#1a2a3a,#2d4a6e)", url: "https://www.goodreads.com/book/show/195822703" },
                { title: "Days at the Morisaki Bookshop", author: "Yagisawa", bg: "linear-gradient(145deg,#1a3a2a,#2d6e4a)", url: "https://www.goodreads.com/book/show/60784546" },
                { title: "Team of Teams", author: "McChrystal", bg: "linear-gradient(145deg,#0d1a0d,#1a3a1a)", url: "https://www.goodreads.com/book/show/22875451" },
                { title: "The Poisoned King", author: "Rundell", bg: "linear-gradient(145deg,#2c1810,#5c2d0e)", url: "https://www.goodreads.com/book/show/217497829" },
                { title: "Nietzsche on Love", author: "Nietzsche", bg: "linear-gradient(145deg,#3a2a0d,#6e520d)", url: "https://www.goodreads.com/book/show/62926" },
                { title: "Impossible Creatures", author: "Rundell", bg: "linear-gradient(145deg,#3a1a0d,#c4622d)", url: "https://www.goodreads.com/book/show/61230834" },
              ],
            },
          ].map((card, i) => (
            <Reveal key={card.name} delay={i * 0.07}>
              <div
                style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", transition: "background .25s", position: "relative" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,98,45,.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(196,98,45,.3)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 14 }}>{card.label}</div>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{card.name}</div>
                {card.body ? (
                  <div style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.8 }}>
                    {card.body.split("\n\n").map((p, j) => <p key={j} style={{ marginBottom: 10 }}>{p}</p>)}
                  </div>
                ) : card.books ? (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 18 }}>
                      {card.books.map((book) => (
                        <Link key={book.title} href={book.url} target="_blank" rel="noopener">
                          <div style={{ background: book.bg, borderRadius: 3, padding: "12px 8px", minHeight: 90, display: "flex", flexDirection: "column", justifyContent: "flex-end", transition: "transform .2s" }}
                            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                          >
                            <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(245,240,232,.9)", lineHeight: 1.3, marginBottom: 3 }}>{book.title}</div>
                            <div style={{ fontSize: 7, color: "rgba(245,240,232,.6)" }}>{book.author}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link href="https://www.goodreads.com/review/list/57964479" target="_blank" rel="noopener" style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--terra)" }}>Full shelf on Goodreads →</Link>
                  </>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section id="work" style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>03</span>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Featured Projects</span>
              <div style={{ width: 120, height: 1, background: "var(--border)" }} />
            </div>
            <Link href="/projects" style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)" }}>View All →</Link>
          </div>
        </Reveal>
        <div className="grid-2col pad-page">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <Link href={`/projects/${project.slug}`}>
                <div
                  style={{ background: "var(--paper)", padding: "36px 32px", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", transition: "background .25s", borderTop: "2px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", border: "1px solid rgba(196,98,45,.3)", color: "var(--terra)", padding: "3px 9px", borderRadius: 2 }}>{project.lang}</span>
                    <span style={{ fontSize: 9, color: "var(--muted)" }}>{project.year}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{project.name}</div>
                  <div style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{project.role}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--mid)", flex: 1, marginBottom: 24 }}>{project.tagline}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                    {project.stack.slice(0, 3).map(s => <span key={s} style={{ fontSize: 8, background: "rgba(201,168,76,.1)", color: "#7a6020", padding: "3px 8px", borderRadius: 2 }}>{s}</span>)}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".1em" }}>Read full breakdown →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ padding: "32px 48px 0", textAlign: "center" }}>
            <Link href="/projects"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "13px 32px", borderRadius: 2, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              See all 11 projects →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── CAPITAL ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="04" t="Capital Allocation" /></Reveal>
        <div className="grid-2col" style={{ margin: "0 48px" }}>
          {[
            {
              label: "City Ventures",
              name: "African & Emerging Markets",
              desc: "Full investment lifecycle: market sizing, financial diligence, deal leadership, post-investment monitoring. 60+ companies reviewed. Two closed investments (mid-to-high seven figures). Built the firm's framework for markets where the standard U.S. playbook doesn't apply — FX stress, regulatory disruption, exit uncertainty across Nigeria, Kenya, South Africa, Ghana, and Egypt.",
              chips: ["60+ companies", "Two 7-fig leads", "FX stress", "Nigeria · Kenya · S. Africa · Ghana · Egypt"],
            },
            {
              label: "Founding Member · Philadelphia",
              name: "KOVA — Raising",
              desc: "Building a credit data platform that converts informal financial behaviour (savings groups, rent, school fees) into structured, usable credit signals for Nigeria's informal economy. Designed the onboarding model leveraging existing collector networks to drive adoption at grassroots scale. Operating across a 5-person cross-functional team.",
              chips: ["Nigeria", "Credit infrastructure", "Informal economy", "Fintech"],
            },
          ].map((card, i) => (
            <Reveal key={card.name} delay={i * 0.1}>
              <div style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", transition: "background .25s", borderTop: "2px solid transparent" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
              >
                <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(196,98,45,.3)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 14 }}>{card.label}</span>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 12 }}>{card.name}</div>
                <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--mid)", marginBottom: 16 }}>{card.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {card.chips.map(c => <span key={c} style={{ fontSize: 8, background: "rgba(201,168,76,.1)", color: "#7a6020", padding: "3px 8px", borderRadius: 2 }}>{c}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WRITING PREVIEW ── */}
      <section id="writing" style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>05</span>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Thoughts</span>
              <div style={{ width: 120, height: 1, background: "var(--border)" }} />
            </div>
            <Link href="/writing" style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)" }}>All Essays →</Link>
          </div>
        </Reveal>
        <div className="grid-2col" style={{ margin: "0 48px" }}>
          {essays.map((essay, i) => (
            <Reveal key={essay.slug} delay={i * 0.07}>
              <Link href={essay.url} target="_blank" rel="noopener">
                <div
                  style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", transition: "background .25s", borderTop: "2px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                >
                  <div style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 12 }}>{essay.category}</div>
                  <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.3, flex: 1 }}>{essay.title}</h3>
                  <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.75, marginBottom: 16 }}>{essay.description}</p>
                  <div style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "8px 14px", display: "inline-block", borderRadius: 2, transition: "all .25s", width: "fit-content" }}>Read →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="06" t="Education" /></Reveal>
        <div className="grid-3col" style={{ margin: "0 48px" }}>
          {[
            { year: "2024 – 2026", school: "The Wharton School", degree: "MBA, Finance & AI Operations\nUniversity of Pennsylvania", note: "Trailblazer Fellowship (50% merit) · President, Wharton Graduate Association ($6M P&L, 1,700+ students) · VP, Wharton Tech Club Conferences · Co-CEO, Africa AI Leaders Fellowship" },
            { year: "2021 – 2023", school: "Columbia University", degree: "MS, Chemical Engineering\nNew York, NY", note: "Full merit, 21 of 5,000+ applicants · GPA 3.8 · ACS Applied Energy Materials publication" },
            { year: "2015 – 2018", school: "University of Bradford", degree: "B.Eng., Chemical & Process Engineering\nBradford, UK", note: "Bradford Dean Award, full-ride · GPA 3.7" },
          ].map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.1}>
              <div style={{ background: "var(--paper)", padding: "32px 26px", transition: "background .25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,98,45,.04)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 9, letterSpacing: ".12em", color: "var(--terra)", marginBottom: 10 }}>{edu.year}</div>
                <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 19, fontWeight: 700, lineHeight: 1.15, marginBottom: 6 }}>{edu.school}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 14, lineHeight: 1.5 }}>{edu.degree}</div>
                <div style={{ fontSize: 11, color: "var(--mid)", borderTop: "1px solid var(--border)", paddingTop: 10, lineHeight: 1.65 }}>{edu.note}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="07" t="Achievements Unlocked" /></Reveal>
        <div className="grid-2col" style={{ margin: "0 48px" }}>
          {[
            { name: "Trailblazer Fellowship, 50% Merit", inst: "The Wharton School, UPenn", xp: "+500 XP" },
            { name: "Full Merit Scholarship", inst: "Columbia University, 21 of 5,000+ applicants", xp: "Rare Drop" },
            { name: "Bradford Dean Award, Full-Ride", inst: "University of Bradford", xp: "+300 XP" },
            { name: "Manhattan Prep Scholarship", inst: "Merit, quantitative achievement", xp: "+150 XP" },
            { name: "President, Wharton Graduate Association", inst: "Elected · $6M budget · 1,700+ students", xp: "Boss Cleared" },
            { name: "Peer-Reviewed Publication", inst: "ACS Applied Energy Materials, 2024", xp: "Side Quest ✓" },
          ].map((award, i) => (
            <Reveal key={award.name} delay={(i % 2) * 0.08}>
              <div style={{ background: "var(--paper)", padding: "24px 26px", display: "flex", gap: 12, alignItems: "flex-start", transition: "background .2s, transform .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.transform = "translateX(4px)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.transform = "translateX(0)" }}
              >
                <span style={{ color: "var(--gold)", flexShrink: 0, fontSize: 14 }}>🏆</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{award.name}</div>
                    <span style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", background: "rgba(201,168,76,.12)", color: "#7a6020", padding: "2px 7px", borderRadius: 2, flexShrink: 0 }}>{award.xp}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--muted)", fontStyle: "italic" }}>{award.inst}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="08" t="Loadout" /></Reveal>
        <div className="grid-4col" style={{ margin: "0 48px" }}>
          {[
            { title: "AI & Product Systems", items: ["Platform Strategy", "RAG Architecture", "LLM Evaluation", "Drift Monitoring", "Anomaly Detection", "Experimentation Frameworks", "Governance & Escalation Design"] },
            { title: "Investment", items: ["DCF & LBO Modeling", "IRR Sensitivity", "NAV Analysis", "Monte Carlo", "Portfolio Construction", "FX Stress Testing", "Blended Finance"] },
            { title: "Markets", items: ["Nigeria, Kenya, S. Africa, Ghana, Egypt", "Fintech Infrastructure", "Digital Lending", "Energy Infrastructure", "Regulated Finance (U.S.)"] },
            { title: "Technical", items: ["Python · SQL", "FastAPI · Snowflake · AWS", "OpenAI · Claude · Cursor", "Capital IQ · PitchBook", "Tableau · Excel (advanced)", "GitHub · Vercel"] },
          ].map(({ title, items }) => (
            <Reveal key={title}>
              <div style={{ background: "var(--paper)", padding: "26px 22px" }}>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 14 }}>{title}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map(item => (
                    <li key={item} style={{ fontSize: 11, color: "var(--ink)", display: "flex", gap: 8, alignItems: "flex-start", transition: "color .2s, transform .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--terra)"; e.currentTarget.style.transform = "translateX(4px)" }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.transform = "translateX(0)" }}
                    >
                      <span style={{ color: "var(--gold)", fontSize: 8, marginTop: 3, flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PHOTO BREAK ── */}
      <div className="grid-photo">
        <div style={{ overflow: "hidden", position: "relative" }}>
          <Image src="/images/IMG_3436.jpg" alt="Lapo in Philadelphia" fill style={{ objectFit: "cover", objectPosition: "center 20%", filter: "contrast(1.07) brightness(.88)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(196,98,45,.15) 0%,transparent 60%)" }} />
        </div>
        <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--ink)" }}>
          <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>◆ Philadelphia, 2025</p>
          <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 900, lineHeight: 1.1, color: "#f5f0e8", marginBottom: 18 }}>
            The systems matter.<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>So do the people they affect.</em>
          </h2>
          <p style={{ fontSize: 12, color: "rgba(245,240,232,.55)", lineHeight: 1.85, maxWidth: 340, marginBottom: 28 }}>That is the through-line in everything I build.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="https://medium.com/@odunjoonaolapo" target="_blank" rel="noopener"
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", background: "var(--gold)", color: "var(--ink)", padding: "9px 18px", borderRadius: 2, fontFamily: "var(--font-syne),sans-serif", fontWeight: 700, transition: "background .25s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--terra)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
            >Essays on Medium</Link>
            <Link href="mailto:odunjoonaolapo@gmail.com"
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", border: "1px solid rgba(245,240,232,.18)", color: "#f5f0e8", padding: "9px 18px", borderRadius: 2, fontFamily: "var(--font-syne),sans-serif", fontWeight: 600, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--terra)"; e.currentTarget.style.color = "var(--terra)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,240,232,.18)"; e.currentTarget.style.color = "#f5f0e8" }}
            >Get In Touch</Link>
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ borderTop: "1px solid var(--border)", padding: "80px 48px" }}>
        <Reveal>
          <div className="grid-contact">
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
                Let&apos;s build something{" "}
                <em style={{ color: "var(--terra)", fontStyle: "italic" }}>worth building.</em>
              </h2>
              <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, maxWidth: 340 }}>
                AI product strategy, regulated-industry AI, private markets in Africa and emerging markets — if any of that is the problem, I want to hear about it.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { label: "Email", value: "odunjoonaolapo@gmail.com", href: "mailto:odunjoonaolapo@gmail.com" },
                { label: "LinkedIn", value: "onaolapomichaelodunjo", href: "https://linkedin.com/in/onaolapomichaelodunjo" },
                { label: "GitHub", value: "Omodunjo11", href: "https://github.com/Omodunjo11" },
                { label: "Coaching", value: "Leland MBA Advisory", href: "https://www.joinleland.com/coach/onaolapo-o" },
              ].map(({ label, value, href }) => (
                <Link key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener" : undefined}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", border: "1px solid var(--border)", fontSize: 12, borderRadius: 2, transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.transform = "translateX(4px)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)" }}
                >
                  <span style={{ color: "var(--muted)", fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", width: 80 }}>{label}</span>
                  <span>{value}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
