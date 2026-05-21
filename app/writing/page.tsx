"use client"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import { essays } from "@/lib/writing"

const tickerItems = [
  { text: "Identity", highlight: true }, { text: "Medium" },
  { text: "Economics", highlight: true }, { text: "Diaspora" },
  { text: "Burnout", highlight: true }, { text: "Africa" },
  { text: "Systems Thinking", highlight: true }, { text: "Essays" },
  { text: "Lagos", highlight: true }, { text: "Capital" },
]

export default function WritingPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ minHeight: "40vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "80px 48px 60px", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 18, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp .7s .4s ease both" }}>
          <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
          Essays · Medium · Thinking Out Loud
        </p>
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(40px,6vw,76px)", fontWeight: 900, lineHeight: .92, letterSpacing: "-.03em", marginBottom: 20, animation: "fadeUp .8s .55s ease both" }}>
          He thinks in essays,<br /><em style={{ color: "var(--terra)", fontStyle: "italic" }}>not bullet points.</em>
        </h1>
        <p style={{ fontSize: 13, color: "var(--muted)", maxWidth: 560, lineHeight: 1.85, animation: "fadeUp .7s .7s ease both" }}>
          Writing is where I process what I cannot yet systematise. Identity, economics, belonging, burnout — the things that don't fit neatly into a pitch deck or a product spec.
        </p>
      </div>

      <Ticker items={tickerItems} />

      {/* Essays grid */}
      <section style={{ padding: "64px 48px 80px" }}>
        <div className="grid-2col">
          {essays.map((essay, i) => (
            <Reveal key={essay.slug} delay={i * 0.08}>
              <Link href={essay.url} target="_blank" rel="noopener">
                <div
                  style={{ background: "var(--paper)", padding: "40px 36px", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", transition: "background .25s", borderTop: "2px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,112,58,.07)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)" }}>{essay.category}</span>
                    <span style={{ fontSize: 9, color: "var(--muted)" }}>{essay.year}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px,2vw,22px)", fontWeight: 700, lineHeight: 1.25, marginBottom: 16, flex: 1 }}>
                    {essay.title}
                  </h2>
                  <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.8, marginBottom: 24 }}>{essay.description}</p>
                  <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".1em" }}>Read on Medium →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Medium CTA */}
        <Reveal>
          <div
            style={{ marginTop: 1, background: "var(--bg2)", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, transition: "background .3s", borderTop: "1px solid var(--border)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e5dfd3")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--bg2)")}
          >
            <div>
              <div style={{ fontSize: 8, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 8 }}>Medium</div>
              <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>More where that came from.</div>
              <p style={{ fontSize: 11, color: "var(--muted)", maxWidth: 380 }}>All essays published on Medium — the full archive of things I couldn't stop thinking about.</p>
            </div>
            <Link
              href="https://medium.com/@odunjoonaolapo"
              target="_blank" rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--ink)", color: "var(--paper)", padding: "13px 26px", borderRadius: 2, whiteSpace: "nowrap", flexShrink: 0, transition: "background .25s, transform .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(0)" }}
            >
              All Essays ↗
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Publication */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "64px 48px 80px" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>◆</span>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Peer-Reviewed Research</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div
            className="grid-pub" style={{ border: "1px solid var(--border)", padding: "40px 44px", transition: "background .2s", borderRadius: 2 }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,112,58,.07)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div>
              <div style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 10 }}>
                ACS Applied Energy Materials · American Chemical Society · 2024
              </div>
              <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                Seawater Electrolysis for Hydrogen Production
              </h3>
              <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--mid)", maxWidth: 560 }}>
                Peer-reviewed research on AI-assisted electrochemical optimization for hydrogen production from seawater. At the intersection of my engineering and ML backgrounds.
              </p>
            </div>
            <Link
              href="https://pubs.acs.org/doi/abs/10.1021/acsaem.4c00839"
              target="_blank" rel="noopener"
              style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "12px 22px", borderRadius: 2, whiteSpace: "nowrap", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              Read Paper →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
