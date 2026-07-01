"use client"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import PageHero from "@/components/PageHero"
import PersonalityAccent from "@/components/PersonalityAccent"
import { PROFILE_LINKS } from "@/lib/site"
import { WRITING_ACCENT_PHOTO } from "@/lib/personal"
import { essays, getMediumEssays, getOnSiteEssays } from "@/lib/writing"

const tickerItems = [
  { text: "Identity", highlight: true }, { text: "Adoption", highlight: true },
  { text: "Economics" }, { text: "Diaspora", highlight: true },
  { text: "Burnout" }, { text: "Africa", highlight: true },
  { text: "Systems Thinking" }, { text: "Essays", highlight: true },
  { text: "Lagos" }, { text: "Trust", highlight: true },
]

function EssayCard({
  essay,
  onSite = false,
}: {
  essay: (typeof essays)[number]
  onSite?: boolean
}) {
  return (
    <Link href={essay.url} {...(onSite ? {} : { target: "_blank", rel: "noopener" })}>
      <div
        className={`writing-card${onSite ? " writing-card--featured" : ""}`}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = onSite ? "rgba(186,230,253,.22)" : "rgba(186,230,253,.28)"
          e.currentTarget.style.borderTopColor = "var(--terra)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = onSite ? "rgba(186,230,253,.1)" : "var(--paper)"
          e.currentTarget.style.borderTopColor = onSite ? "var(--terra)" : "transparent"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)" }}>
            {essay.category}
          </span>
          <span style={{ fontSize: 9, color: "var(--muted)" }}>
            {essay.year}
            {essay.readingTime ? ` · ${essay.readingTime}` : ""}
          </span>
        </div>
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(18px,2vw,22px)", fontWeight: 700, lineHeight: 1.25, marginBottom: 16, flex: 1 }}>
          {essay.title}
        </h2>
        <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.8, marginBottom: 24 }}>{essay.description}</p>
        <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".1em" }}>
          {onSite ? "Read on lapoodunjo.com →" : "Read on Medium →"}
        </div>
      </div>
    </Link>
  )
}

export default function WritingPage() {
  const onSite = getOnSiteEssays()
  const medium = getMediumEssays()

  return (
    <>
      <PageHero
        eyebrow="Essays · Thinking Out Loud"
        title={
          <>
            I think in essays,<br />
            <em>not bullet points.</em>
          </>
        }
        description="Writing is where I sound like myself: Lagos kid, Wharton student, PM in production, Man United sufferer. Identity, economics, belonging, adoption. The stuff that does not fit a pitch deck."
      >
        <p style={{ fontSize: 11, color: "var(--terra)", marginTop: 14, letterSpacing: ".06em", animation: "fadeUp .7s .85s ease both" }}>
          One essay lives here. The rest are on Medium.
        </p>
      </PageHero>

      <div className="grid-1-2 pad-section" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 12 }}>Why I write</div>
          <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(18px,2vw,24px)", fontWeight: 700, lineHeight: 1.2 }}>
            Thinking that hasn&apos;t made it into a product yet.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13, lineHeight: 1.9, color: "var(--mid)" }}>
            Most of my work is about making complex systems legible, to users, to regulators, to teams who have to trust something they cannot fully see. Writing is where I do that for myself first, usually at 1am, usually with too much football on in the background.
          </p>
          <p style={{ fontSize: 13, lineHeight: 1.9, color: "var(--mid)" }}>
            The featured essay starts with two Wharton nameplates and ends with a Bleach shirt at a Columbia game. That is the point: the bottleneck was never the model. It is whether real people will stake their judgment on what your system says.
          </p>
        </div>
      </div>

      <div className="pad-page" style={{ paddingTop: 8, paddingBottom: 24 }}>
        <PersonalityAccent photo={WRITING_ACCENT_PHOTO} align="right" size="sm" delay={0.04} />
      </div>

      <Ticker items={tickerItems} />

      <section style={{ padding: "64px 48px 80px" }}>
        {onSite.length > 0 ? (
          <div style={{ marginBottom: 48 }}>
            <Reveal>
              <p style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>
                On this site
              </p>
            </Reveal>
            <div className="grid-2col" style={{ gridTemplateColumns: "1fr" }}>
              {onSite.map((essay, i) => (
                <Reveal key={essay.slug} delay={i * 0.08}>
                  <EssayCard essay={essay} onSite />
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        <Reveal>
          <p style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>
            On Medium
          </p>
        </Reveal>
        <div className="grid-2col">
          {medium.map((essay, i) => (
            <Reveal key={essay.slug} delay={i * 0.08}>
              <EssayCard essay={essay} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div
            className="github-band"
            style={{ marginTop: 1, background: "var(--bg2)", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, borderTop: "1px solid var(--border)" }}
          >
            <div>
              <div style={{ fontSize: 8, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 8 }}>Medium</div>
              <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>More where that came from.</div>
              <p style={{ fontSize: 11, color: "var(--muted)", maxWidth: 380 }}>Essays on identity, economics, and diaspora, the full archive of things I couldn&apos;t stop thinking about.</p>
            </div>
            <Link href={PROFILE_LINKS.medium} target="_blank" rel="noopener" className="btn btn--filled" style={{ flexShrink: 0 }}>
              All Essays ↗
            </Link>
          </div>
        </Reveal>
      </section>

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
            className="grid-pub"
            style={{ border: "1px solid var(--border)", padding: "40px 44px", transition: "background .2s", borderRadius: 2 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(186,230,253,.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              Read Paper →
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
