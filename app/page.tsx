"use client"
import Image from "next/image"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import CloudScene from "@/components/CloudScene"
import { featuredProjects } from "@/lib/projects"
import { essays } from "@/lib/writing"
import { CANONICAL_NAME, CONTACT_EMAIL, IDENTITY_LINE, INTENT_CTA, PROFILE_LINKS } from "@/lib/site"

const tickerItems = [
  { text: "AI Product · Regulated Systems", highlight: true }, { text: "Lagos → Bradford → NYC → Philly" },
  { text: "RAG Systems in Production", highlight: true }, { text: "36 Countries. Always Curious." },
  { text: "LLM Evaluation Frameworks", highlight: true }, { text: "Wharton MBA · Completed" },
  { text: "Kinage · KOVA · Building", highlight: true }, { text: "Trust Infrastructure" },
  { text: "Agentic Workflows · Production", highlight: true }, { text: "Lagos Raised · World Shaped" },
]

const SH = ({ n, t }: { n: string; t: string }) => (
  <div style={{ padding: "clamp(40px,8vh,64px) clamp(20px,6vw,48px) 36px" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 6 }}>
      {n && <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".22em", color: "var(--terra)" }}>{n}</span>}
      <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 900, letterSpacing: "-.02em", lineHeight: 1, margin: 0 }}>{t}</h2>
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
      <div className="metrics-bar" style={{
        background: "rgba(255,255,255,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
        padding: "20px clamp(16px,5vw,64px)",
        display: "flex",
        alignItems: "center",
        gap: "clamp(16px,4vw,56px)",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        {[
          { metric: "$148M",  label: "Retention opportunity scoped at Amazon" },
          { metric: "2B+",    label: "Records modeled across AI systems" },
          { metric: "11",     label: "AI products shipped end-to-end" },
          { metric: "10",     label: "African markets · fintech & private capital" },
        ].map(({ metric, label }) => (
          <div key={metric} style={{ display: "flex", alignItems: "baseline", gap: 8, minWidth: 0 }}>
            <span style={{
              fontFamily: "var(--font-playfair),serif",
              fontWeight: 900,
              fontSize: "clamp(20px,2.8vw,32px)",
              color: "var(--terra)",
              lineHeight: 1,
              flexShrink: 0,
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
      <div id="status-bar" style={{ borderBottom: "1px solid var(--border)", background: "var(--ink)", padding: "10px clamp(16px,4vw,48px)", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", overflow: "hidden" }}>
        <span style={{ fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--terra)", flexShrink: 0 }}>◆ Currently</span>
        {[
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
        <span style={{ fontSize: 8, color: "rgba(186,230,253,.55)", letterSpacing: ".08em", flexShrink: 0, maxWidth: 280, lineHeight: 1.4, textAlign: "right" }}>{INTENT_CTA}</span>
      </div>

      <Ticker items={tickerItems} />

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: "72px 0 80px" }}>
        <Reveal><SH n="01" t="About" /></Reveal>
        <div className="grid-about pad-page">
          <Reveal>
            <div className="about-left">
              <Image src="/images/IMG_3437.jpg" alt={`${CANONICAL_NAME} — Onaolapo Michael Odunjo`} width={400} height={500} sizes="(max-width: 768px) 100vw, 33vw" quality={80} priority style={{ width: "100%", height: "auto", objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%) contrast(1.05)", marginBottom: 24 }} />
              <p style={{ fontSize: 10, color: "var(--muted)", lineHeight: 1.65, marginBottom: 16 }}>
                {IDENTITY_LINE}
              </p>
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
          <div style={{ padding: "0 clamp(16px,6vw,48px) 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>02</span>
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
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", border: "1px solid rgba(125,211,252,.6)", color: "var(--terra)", padding: "3px 9px", borderRadius: 2 }}>{project.lang}</span>
                    <span style={{ fontSize: 9, color: "var(--muted)" }}>{project.year}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{project.name}</div>
                  <div style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>{project.role}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--mid)", flex: 1, marginBottom: 24 }}>{project.tagline}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                    {project.stack.slice(0, 3).map(s => <span key={s} style={{ fontSize: 8, background: "var(--bg2)", color: "var(--mid)", padding: "3px 8px", borderRadius: 2 }}>{s}</span>)}
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
            <Link href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer me"
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
        <Reveal><SH n="03" t="Story" /></Reveal>
        <div className="grid-3col" style={{ margin: "0 clamp(16px,6vw,48px)" }}>
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
          ].map((card, i) => (
            <Reveal key={card.name} delay={i * 0.07}>
              <div
                style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", transition: "background .25s", position: "relative" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", border: "1px solid rgba(125,211,252,.6)", padding: "3px 9px", borderRadius: 2, display: "inline-block", marginBottom: 14 }}>{card.label}</div>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 14, fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>{card.name}</div>
                <div style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.8 }}>
                  {card.body.split("\n\n").map((p, j) => <p key={j} style={{ marginBottom: 10 }}>{p}</p>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── WRITING PREVIEW ── */}
      <section id="writing" style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 clamp(16px,6vw,48px) 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>04</span>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Thoughts</span>
              <div style={{ width: 120, height: 1, background: "var(--border)" }} />
            </div>
            <Link href="/writing" style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)" }}>All Essays →</Link>
          </div>
        </Reveal>
        <div className="grid-2col" style={{ margin: "0 clamp(16px,6vw,48px)" }}>
          {essays.slice(0, 2).map((essay, i) => (
            <Reveal key={essay.slug} delay={i * 0.07}>
              <Link href={essay.url} target="_blank" rel="noopener">
                <div
                  style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", display: "flex", flexDirection: "column", transition: "background .25s", borderTop: "2px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
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

      {/* ── PHOTO BREAK ── */}
      <div className="grid-photo">
        <div style={{ overflow: "hidden", position: "relative" }}>
          <Image src="/images/IMG_3436.jpg" alt="Lapo in Philadelphia" fill sizes="(max-width: 768px) 100vw, 50vw" quality={80} style={{ objectFit: "cover", objectPosition: "center 20%", filter: "contrast(1.07) brightness(.88)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(56,189,248,.12) 0%,transparent 60%)" }} />
        </div>
        <div style={{ padding: "64px 56px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--ink)" }}>
          <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>◆ Philadelphia, 2025</p>
          <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 900, lineHeight: 1.1, color: "var(--paper)", marginBottom: 18 }}>
            Building things that<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>actually work.</em>
          </h2>
          <p style={{ fontSize: 12, color: "rgba(186,230,253,.7)", lineHeight: 1.85, maxWidth: 340, marginBottom: 28 }}>Not just in demos. In production, under pressure, in regulated environments where it actually matters.</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href={PROFILE_LINKS.medium} target="_blank" rel="noopener noreferrer me"
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", background: "var(--gold)", color: "var(--ink)", padding: "9px 18px", borderRadius: 2, fontFamily: "var(--font-syne),sans-serif", fontWeight: 700, transition: "background .25s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--terra)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
            >Essays on Medium</Link>
            <Link href={PROFILE_LINKS.email}
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", border: "1px solid rgba(245,240,232,.18)", color: "var(--paper)", padding: "9px 18px", borderRadius: 2, fontFamily: "var(--font-syne),sans-serif", fontWeight: 600, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--terra)"; e.currentTarget.style.color = "var(--terra)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(125,211,252,.25)"; e.currentTarget.style.color = "var(--paper)" }}
            >Get In Touch</Link>
          </div>
        </div>
      </div>

      {/* ── FULL CAREER ── */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "48px clamp(16px,6vw,48px)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 8 }}>Full timeline</div>
              <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, lineHeight: 1.2 }}>
                Experience, education, skills & awards
              </div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, maxWidth: 420, lineHeight: 1.7 }}>
                Kinage · KOVA · Amazon · TD Bank · Capital One · Wharton · Columbia · City Ventures.
              </p>
            </div>
            <Link href="/experience"
              style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "13px 28px", borderRadius: 2, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              View experience →
            </Link>
          </div>
        </Reveal>
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
                { label: "Email", value: CONTACT_EMAIL, href: PROFILE_LINKS.email },
                { label: "LinkedIn", value: "onaolapomichaelodunjo", href: PROFILE_LINKS.linkedin },
                { label: "GitHub", value: "Omodunjo11", href: PROFILE_LINKS.github },
                { label: "Medium", value: "@odunjoonaolapo", href: PROFILE_LINKS.medium },
              ].map(({ label, value, href }) => (
                <Link key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer me" : undefined}
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
