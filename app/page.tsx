"use client"
import Image from "next/image"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import CloudScene from "@/components/CloudScene"
import { featuredProjects } from "@/lib/projects"
import { essays } from "@/lib/writing"

const tickerItems = [
  { text: "Staff TPM · AI Systems Builder", highlight: true }, { text: "Lagos → Bradford → NYC → Philly" },
  { text: "RAG Systems in Production", highlight: true }, { text: "36 Countries. Always Curious." },
  { text: "LLM Evaluation Frameworks", highlight: true }, { text: "Wharton MBA · Completed" },
  { text: "Regulated AI · Trust Infrastructure", highlight: true }, { text: "Yoruba Native Speaker" },
  { text: "Kinage · KOVA · Building", highlight: true }, { text: "Jollof Rice Connoisseur" },
  { text: "Private Capital · Africa", highlight: true }, { text: "Coffee. Reading. Tennis. Repeat." },
  { text: "Agentic Workflows · Production", highlight: true }, { text: "Lagos Raised · World Shaped" },
]

const SH = ({ n, t, game }: { n: string; t: string; game?: string }) => (
  <div style={{ padding: "64px 48px 36px" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 6 }}>
      {n && <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".22em", color: "var(--terra)" }}>{n}</span>}
      <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, letterSpacing: "-.02em", lineHeight: 1, margin: 0 }}>{t}</h2>
      {game && <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".14em", color: "var(--muted)", marginLeft: 4, opacity: 0.6 }}>{'// '}{game}</span>}
    </div>
    <div style={{ width: 40, height: 2, background: "var(--terra)", marginTop: 10 }} />
  </div>
)

export default function Home() {
  return (
    <>
      <CloudScene />

      <div style={{ background: "var(--paper)" }}>

      {/* ── PROOF METRICS ── */}
      <div style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(125,211,252,0.3)",
        padding: "20px clamp(20px,5vw,64px)",
        display: "flex",
        alignItems: "center",
        gap: "clamp(20px,4vw,56px)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {[
          { metric: "$148M",  label: "Retention opportunity scoped at Amazon" },
          { metric: "2B+",    label: "Records modeled across AI systems" },
          { metric: "11",     label: "AI products shipped end-to-end" },
          { metric: "10",     label: "African markets · fintech & private capital" },
        ].map(({ metric, label }) => (
          <div key={metric} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{
              fontFamily: "var(--font-playfair),serif",
              fontWeight: 900,
              fontSize: "clamp(22px,2.8vw,32px)",
              color: "var(--terra)",
              lineHeight: 1,
            }}>{metric}</span>
            <span style={{
              fontFamily: "var(--font-dm-mono),monospace",
              fontSize: "clamp(8px,1vw,10px)",
              letterSpacing: ".08em",
              color: "var(--muted)",
              maxWidth: 160,
              lineHeight: 1.4,
            }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── STATUS BAR ── */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--ink)", padding: "10px 48px", display: "flex", alignItems: "center", gap: 32, flexWrap: "wrap", overflow: "hidden" }}>
        <span style={{ fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--terra)", flexShrink: 0 }}>◆ Currently</span>
        {[
          { label: "Playing", value: "Civilization VII" },
          { label: "Building", value: "Kinage in Prod" },
          { label: "Reading", value: "Team of Teams" },
          { label: "Completed", value: "Wharton MBA" },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(186,230,253,.6)" }}>{label}:</span>
            <span style={{ fontSize: 10, color: "rgba(248,250,252,.9)", fontFamily: "var(--font-dm-mono),monospace" }}>{value}</span>
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 8, color: "rgba(186,230,253,.25)", letterSpacing: ".12em", flexShrink: 0 }}>↑↑↓↓←→←→BA</span>
      </div>

      <Ticker items={tickerItems} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "72px 0 80px" }}>
        <Reveal><SH n="01" t="About" game="character profile" /></Reveal>
        <div className="grid-about pad-page">
          <Reveal>
            <div className="about-left">
              <Image src="/images/IMG_3437.jpg" alt="Lapo Odunjo" width={400} height={500} style={{ width: "100%", height: "auto", objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%) contrast(1.05)", marginBottom: 24 }} />
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 6 }}>AD ASTRA PER ASPERA</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic" }}>To the stars through difficulties.</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="about-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--mid)" }}>I go by Lapo. I grew up in Lagos, left home for university in Bradford, found my way through New York and Philadelphia, and have been shaped by every place that asked me to begin again.</p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--mid)" }}>A lot of my story has been about new beginnings: learning new systems, entering new rooms, building new communities, and finding my voice in places that did not always feel familiar at first. That is probably why I am drawn to products and people in transition. I like helping make complicated things feel more navigable.</p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--mid)" }}>Today, I build AI systems for regulated industries, especially in environments where trust matters and the cost of a wrong answer is real. My work sits at the intersection of product, AI, financial infrastructure, and practical judgment.</p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--mid)" }}>The path from chemical engineering to product to AI to private capital may look random from the outside. To me, it has always been connected by one question: where is the real problem, and what would actually help?</p>
              <p style={{ fontSize: 15, lineHeight: 1.9, color: "var(--mid)" }}>Outside the build, you will usually find me reading in a coffee shop, planning the next trip, playing tennis, running somewhere in the city, or getting pulled into one more game of League, Mortal Kombat, or God of War. I recently finished my Wharton MBA while simultaneously building Kinage, an AI-powered market intelligence platform, in production. Intense, humbling, and worth every minute.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {["AI Systems", "Private Markets", "Africa", "Fintech", "Regulated Industries", "Electrochemistry"].map(tag => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 2, color: "var(--mid)" }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section id="work" style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 48px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>02</span>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Featured Projects</span>
              <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".12em", color: "var(--muted)", opacity: 0.55 }}>{'// quest log'}</span>
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
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(186,230,253,.28)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", border: "1px solid rgba(125,211,252,.6)", color: "var(--terra)", padding: "3px 9px", borderRadius: 2 }}>{project.lang}</span>
                    <span style={{ fontSize: 9, color: "var(--muted)" }}>{project.year}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{project.name}</div>
                  <div style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "#A78BFA", marginBottom: 16 }}>{project.role}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--mid)", flex: 1, marginBottom: 24 }}>{project.tagline}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                    {project.stack.slice(0, 3).map(s => <span key={s} style={{ fontSize: 8, background: "rgba(167,139,250,.15)", color: "#A78BFA", padding: "3px 8px", borderRadius: 2 }}>{s}</span>)}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".1em" }}>Read full breakdown →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ padding: "32px 48px 0", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/projects"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "13px 32px", borderRadius: 2, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              See all 11 projects →
            </Link>
            <Link href="https://github.com/Omodunjo11" target="_blank" rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--ink)", color: "var(--paper)", padding: "13px 32px", borderRadius: 2, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--terra)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)" }}
            >
              Build Archive on GitHub ↗
            </Link>
            <Link href="/how-i-build"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--terra)", color: "var(--terra)", padding: "13px 32px", borderRadius: 2, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.color = "white" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--terra)" }}
            >
              How I Build AI Products →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── THE LONGER VERSION ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="03" t="Story" game="extended lore" /></Reveal>
        <div className="grid-3col" style={{ margin: "0 48px" }}>
          {[
            {
              label: "What shaped the lens",
              name: "The thing Lagos actually taught me",
              body: "I grew up in Lagos. The city moves fast and nothing is ever quite what it looks like on the surface. You learn early to look past the obvious explanation, because the obvious one is almost always wrong.\n\nThat habit never left me. When an AI system keeps failing, or an investment keeps underperforming, the first thing I do is ignore where the pain is showing up. The real problem is almost always somewhere else.",
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
              body: "I have been a gamer since I was old enough to hold a controller. What I did not realise until recently is that games taught me everything that matters: resource allocation under uncertainty, reading patterns before they complete, knowing when to push and when to reset.\n\nEvery PM I have ever met who moves fast and breaks nothing learned it the same way, through a thousand invisible iterations before the stakes were real.\n\nThe strategy games especially. If you have ever spent three hours optimising a build order in an RTS, you already understand roadmap sequencing. You just call it something different at work.",
            },
            {
              label: "Right now",
              name: "What the calendar actually looks like",
              body: "Finished the Wharton MBA. Running Kinage in production. Raising for KOVA. Writing about what happens when AI models meet regulated institutions and neither side is ready.\n\nI also co-founded Young Africans in Diaspora because the community needed to exist and nobody was building it. Most weeks I am juggling more than I probably should. It is fine.",
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
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(186,230,253,.28)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(125,211,252,.6)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 14 }}>{card.label}</div>
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

      {/* ── CAPITAL ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal><SH n="04" t="Capital Allocation" game="resource management" /></Reveal>
        <div className="grid-2col" style={{ margin: "0 48px" }}>
          {[
            {
              label: "Operations Lead · City Ventures",
              name: "African & Emerging Markets",
              desc: "Full investment lifecycle: market sizing, financial diligence, deal leadership, post-investment monitoring. 60+ companies reviewed. Two closed investments (mid-to-high seven figures). Built the firm's framework for markets where the standard U.S. playbook doesn't apply, FX stress, regulatory disruption, exit uncertainty across Nigeria, Kenya, South Africa, Ghana, and Egypt.",
              chips: ["60+ companies", "Two 7-fig leads", "FX stress", "Nigeria · Kenya · S. Africa · Ghana · Egypt"],
            },
            {
              label: "Founding Member · Philadelphia",
              name: "KOVA, Raising",
              desc: "Building a credit data platform that converts informal financial behaviour (savings groups, rent, school fees) into structured, usable credit signals for Nigeria's informal economy. Designed the onboarding model leveraging existing collector networks to drive adoption at grassroots scale. Operating across a 5-person cross-functional team.",
              chips: ["Nigeria", "Credit infrastructure", "Informal economy", "Fintech"],
            },
          ].map((card, i) => (
            <Reveal key={card.name} delay={i * 0.1}>
              <div style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", transition: "background .25s", borderTop: "2px solid transparent" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(186,230,253,.28)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
              >
                <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(125,211,252,.6)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 14 }}>{card.label}</span>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 12 }}>{card.name}</div>
                <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--mid)", marginBottom: 16 }}>{card.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {card.chips.map(c => <span key={c} style={{ fontSize: 8, background: "rgba(167,139,250,.15)", color: "#A78BFA", padding: "3px 8px", borderRadius: 2 }}>{c}</span>)}
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
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(186,230,253,.28)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
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
        <Reveal><SH n="06" t="Education" game="training arc" /></Reveal>
        <div className="grid-3col" style={{ margin: "0 48px" }}>
          {[
            { year: "Completed", school: "The Wharton School", degree: "MBA, Finance & AI Operations\nUniversity of Pennsylvania", note: "Trailblazer Fellowship (50% merit) · President, Wharton Graduate Association ($6M P&L, 1,700+ students) · VP, Wharton Tech Club Conferences · Co-CEO, Africa AI Leaders Fellowship" },
            { year: "2021 – 2023", school: "Columbia University", degree: "MS, Chemical Engineering\nNew York, NY", note: "Full merit, 21 of 5,000+ applicants · GPA 3.8 · ACS Applied Energy Materials publication" },
            { year: "2015 – 2018", school: "University of Bradford", degree: "B.Eng., Chemical & Process Engineering\nBradford, UK", note: "Bradford Dean Award, full-ride · GPA 3.7" },
          ].map((edu, i) => (
            <Reveal key={edu.school} delay={i * 0.1}>
              <div style={{ background: "var(--paper)", padding: "32px 26px", transition: "background .25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(186,230,253,.28)")}
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
        <Reveal><SH n="07" t="Achievements Unlocked" game="milestones" /></Reveal>
        <div className="grid-2col" style={{ margin: "0 48px" }}>
          {[
            { name: "Trailblazer Fellowship, 50% Merit", inst: "The Wharton School, UPenn", xp: "+500 XP" },
            { name: "Full Merit Scholarship", inst: "Columbia University, 21 of 5,000+ applicants", xp: "+1000 XP" },
            { name: "Bradford Dean Award, Full-Ride", inst: "University of Bradford", xp: "+300 XP" },
            { name: "Manhattan Prep Scholarship", inst: "Merit, quantitative achievement", xp: "+150 XP" },
            { name: "President, Wharton Graduate Association", inst: "Elected · $6M budget · 1,700+ students", xp: "Boss Cleared" },
            { name: "Peer-Reviewed Publication", inst: "ACS Applied Energy Materials, 2024", xp: "Side Quest ✓" },
          ].map((award, i) => (
            <Reveal key={award.name} delay={(i % 2) * 0.08}>
              <div style={{ background: "var(--paper)", padding: "24px 26px", display: "flex", gap: 12, alignItems: "flex-start", transition: "background .2s, transform .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(186,230,253,.28)"; e.currentTarget.style.transform = "translateX(4px)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.transform = "translateX(0)" }}
              >
                <span style={{ color: "#A78BFA", flexShrink: 0, fontSize: 14 }}>🏆</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{award.name}</div>
                    <span style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", background: "rgba(167,139,250,.15)", color: "#A78BFA", padding: "2px 7px", borderRadius: 2, flexShrink: 0 }}>{award.xp}</span>
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
        <Reveal><SH n="08" t="Loadout" game="skill tree" /></Reveal>
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
                      <span style={{ color: "#A78BFA", fontSize: 8, marginTop: 3, flexShrink: 0 }}>▸</span>
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
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(56,189,248,.12) 0%,transparent 60%)" }} />
        </div>
        <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--ink)" }}>
          <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>◆ Philadelphia, 2025</p>
          <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 900, lineHeight: 1.1, color: "var(--paper)", marginBottom: 18 }}>
            Building things that<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>actually work.</em>
          </h2>
          <p style={{ fontSize: 12, color: "rgba(186,230,253,.7)", lineHeight: 1.85, maxWidth: 340, marginBottom: 28 }}>Not just in demos. In production, under pressure, in regulated environments where it actually matters.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="https://medium.com/@odunjoonaolapo" target="_blank" rel="noopener"
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", background: "var(--gold)", color: "var(--ink)", padding: "9px 18px", borderRadius: 2, fontFamily: "var(--font-syne),sans-serif", fontWeight: 700, transition: "background .25s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--terra)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
            >Essays on Medium</Link>
            <Link href="mailto:odunjoonaolapo@gmail.com"
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", border: "1px solid rgba(245,240,232,.18)", color: "var(--paper)", padding: "9px 18px", borderRadius: 2, fontFamily: "var(--font-syne),sans-serif", fontWeight: 600, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--terra)"; e.currentTarget.style.color = "var(--terra)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(125,211,252,.25)"; e.currentTarget.style.color = "var(--paper)" }}
            >Get In Touch</Link>
          </div>
        </div>
      </div>

      {/* ── BASE CAMP ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 48px 40px", display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>09</span>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Base Camp</span>
            <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".12em", color: "var(--muted)", opacity: 0.55 }}>{'// when not building'}</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
        </Reveal>
        <div className="grid-2col" style={{ margin: "0 48px" }}>
          <Reveal>
            <div style={{ background: "var(--paper)", padding: "36px 32px" }}>
              <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(125,211,252,.6)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 16 }}>Off the clock</div>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--mid)" }}>
                When I am not building, I am usually reading in a coffee shop, planning a trip, playing tennis, running, or gaming. I like games that reward strategy, timing, adaptation, and character mastery, which probably explains the League of Legends, Mortal Kombat, and God of War rotation.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--mid)", marginTop: 16 }}>
                Travel has shaped how I build too. Moving through different cities, cultures, and systems made me care more about products that work outside polished environments. Thirty-six countries in, that instinct only gets stronger.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div style={{ background: "var(--paper)", padding: "36px 32px" }}>
              <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(125,211,252,.6)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 16 }}>Current rotation</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "🎮", label: "Gaming", value: "League · Mortal Kombat · God of War" },
                  { icon: "🎾", label: "Sport", value: "Tennis · Running (NYC routes)" },
                  { icon: "✈️", label: "Travel", value: "36 countries · always planning the next" },
                  { icon: "📖", label: "Reading", value: "Whatever's in the coffee shop bag" },
                  { icon: "☕", label: "Base", value: "Philadelphia, for now" },
                ].map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 12, color: "var(--mid)" }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ borderTop: "1px solid var(--border)", padding: "80px 48px" }}>
        <Reveal>
          <div className="grid-contact">
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(30px,3.5vw,52px)", fontWeight: 900, lineHeight: 1.0, marginBottom: 20, letterSpacing: "-.02em" }}>
                Start a conversation.{" "}
                <em style={{ color: "var(--terra)", fontStyle: "italic" }}>Or a co-op.</em>
              </h2>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.85, maxWidth: 340 }}>
                AI systems in regulated industries. Private markets across Africa. Anything that does not fit a clean slide deck. Those are my favourite conversations.
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

      </div>{/* end paper wrapper */}
    </>
  )
}
