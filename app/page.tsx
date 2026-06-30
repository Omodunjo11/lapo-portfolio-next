"use client"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import CloudScene from "@/components/CloudScene"
import { PROFILE_LINKS } from "@/lib/site"
import { PROOF_METRICS } from "@/lib/metrics"

const tickerItems = [
  { text: "AI Product · Regulated Systems", highlight: true },
  { text: "Lagos → Bradford → NYC → Philly" },
  { text: "RAG Systems in Production", highlight: true },
  { text: "LLM Evaluation Frameworks" },
  { text: "Kinage · KOVA · Building", highlight: true },
  { text: "Trust Infrastructure" },
  { text: "Agentic Workflows · Production", highlight: true },
  { text: "Wharton MBA · Completed" },
]

const navPanels = [
  {
    number: "01",
    label: "About",
    href: "/about",
    headline: "Lagos to Philly. Same question everywhere.",
    desc: "Who I am, how I think, and what drives the work.",
  },
  {
    number: "02",
    label: "Work",
    href: "/work",
    headline: "Production AI. Not just demos.",
    desc: "Featured builds across regulated finance, informal credit, and agentic systems.",
  },
  {
    number: "03",
    label: "Projects",
    href: "/projects",
    headline: "Nine products shipped end-to-end.",
    desc: "Full breakdowns of what I built, how I built it, and why.",
  },
  {
    number: "04",
    label: "Experience",
    href: "/experience",
    headline: "Amazon · TD Bank · Capital One · Wharton.",
    desc: "The full timeline of roles, education, and what I learned in each.",
  },
  {
    number: "05",
    label: "How I Build",
    href: "/how-i-build",
    headline: "The method behind the product.",
    desc: "How I approach AI systems, trust, and decisions under uncertainty.",
  },
  {
    number: "06",
    label: "Writing",
    href: "/writing",
    headline: "I think in essays, not bullet points.",
    desc: "Identity, economics, and the things that do not fit a pitch deck.",
  },
  {
    number: "07",
    label: "Connect",
    href: "/connect",
    headline: "Start a conversation.",
    desc: "AI systems in regulated industries. Private markets across Africa. Anything that does not fit a clean slide deck.",
    span: true,
  },
]

export default function Home() {
  return (
    <>
      <CloudScene />

      <div className="page-body">
        <div className="metrics-bar">
          {PROOF_METRICS.map(({ metric, label }) => (
            <div key={metric} className="metric-item">
              <span className="metric-value">{metric}</span>
              <span className="metric-label">{label}</span>
            </div>
          ))}
        </div>

        <Ticker items={tickerItems} />

        <section className="page-section">
          <div className="pad-page" style={{ paddingTop: "clamp(48px, 6vw, 88px)", paddingBottom: "clamp(48px, 6vw, 88px)" }}>
            <Reveal>
              <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
                Lagos · Wharton · AI in Regulated Industries
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(38px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-.03em", marginBottom: 32, maxWidth: 720 }}>
                Most AI demos are impressive.<br />
                <em style={{ color: "var(--terra)" }}>Most AI in production is quietly broken.</em>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "var(--mid)", maxWidth: 580, lineHeight: 1.85, marginBottom: 12 }}>
                I build for the gap between those two statements. Regulated banks, healthcare networks,
                credit infrastructure in markets most products never reach. The cost of a wrong answer
                is real in these environments, and trust is the actual product.
              </p>
              <p style={{ fontSize: "clamp(14px, 1.5vw, 17px)", color: "var(--mid)", maxWidth: 580, lineHeight: 1.85, marginBottom: 36 }}>
                I grew up in Lagos, studied in Bradford, built at Amazon and Capital One,
                and finished my Wharton MBA while shipping Kinage in production.
                The thread running through all of it is one question: where is the real problem,
                and what would actually help?
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/work" className="btn btn--filled">See the work →</Link>
                <Link href="/about" className="btn btn--outline">About me</Link>
                <Link href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer me" className="btn btn--ghost">LinkedIn ↗</Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="page-section page-section--bordered">
          <div className="pad-page" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
            <Reveal>
              <p style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 32 }}>Explore</p>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)" }}>
              {navPanels.map((panel, i) => (
                <Reveal key={panel.href} delay={i * 0.05}>
                  <Link
                    href={panel.href}
                    style={{
                      display: "block",
                      background: "var(--paper)",
                      padding: "32px 28px",
                      transition: "background .2s",
                      height: "100%",
                      gridColumn: panel.span ? "span 2" : undefined,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".18em", color: "var(--terra)" }}>{panel.number}</span>
                      <span style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", fontFamily: "var(--font-syne), sans-serif", fontWeight: 700 }}>{panel.label} →</span>
                    </div>
                    <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(15px, 1.4vw, 17px)", fontWeight: 700, lineHeight: 1.3, marginBottom: 10 }}>
                      {panel.headline}
                    </h2>
                    <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75 }}>{panel.desc}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
