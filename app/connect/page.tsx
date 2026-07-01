"use client"
import Link from "next/link"
import Image from "next/image"
import Reveal from "@/components/Reveal"
import PageHero from "@/components/PageHero"
import ConnectOutreach from "@/components/ConnectOutreach"
import { CONTACT_EMAIL, CONTACT_PHONE, CONNECT_INTENT, PROFILE_LINKS } from "@/lib/site"
import { OPEN_TO_ROLES } from "@/lib/positioning"
import { CONNECT_ACCENT_PHOTO } from "@/lib/personal"

const openTo = OPEN_TO_ROLES

export default function ConnectPage() {
  return (
    <>
      <PageHero
        variant="ink"
        eyebrow="Connect"
        title={
          <>
            Start a<br />
            <em>conversation.</em>
          </>
        }
        description="Forward Deployed PM and AI product work in regulated production. Open to FDPM, AI PM, and Staff PM conversations."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
          <Link
            href={`mailto:${CONTACT_EMAIL}?subject=AI%20PM%20conversation`}
            className="hero-cta-primary"
          >
            Email me →
          </Link>
          <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="hero-cta-secondary">
            Resume ↗
          </Link>
        </div>
      </PageHero>

      {/* Currently open to */}
      <section className="page-section page-section--bordered">
        <Reveal>
          <div className="pad-page" style={{ paddingTop: "clamp(40px,5vw,64px)", paddingBottom: "clamp(40px,5vw,64px)" }}>
            <p className="connect-intent">{CONNECT_INTENT}</p>
            <ConnectOutreach />
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 32, marginTop: 32 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>◆</span>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Target roles</span>
              <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              <span style={{ fontSize: 8, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--terra)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--terra)", display: "inline-block" }} />
                Available
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 1, background: "var(--border)" }}>
              {openTo.map((item) => (
                <div key={item.role} style={{ background: "var(--paper)", padding: "28px 24px" }}>
                  <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{item.role}</div>
                  <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.75 }}>{item.desc}</p>
                </div>
              ))}
              <div style={{
                background: "var(--ink)",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 180,
              }}>
                <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(248,250,252,0.4)" }}>
                  New York, NY · Available
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(36px,4vw,52px)", fontWeight: 900, color: "var(--paper)", lineHeight: 1, marginBottom: 10 }}>
                    22%<span style={{ color: "var(--terra)" }}>→</span>50%
                  </div>
                  <div style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(248,250,252,0.5)", lineHeight: 1.6 }}>
                    Analyst precision · production AI<br />top 10 U.S. bank
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="page-section contact-section">
        <Reveal>
          <div className="grid-contact pad-page">
            <div>
              <h2 className="contact-title">Ways to reach me</h2>
              <p className="contact-desc">
                Best for FDPM, AI PM, and Staff PM conversations in regulated AI, fintech, and care.
                Design partnerships welcome. I read everything; response time varies with travel and shipping cycles.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href={PROFILE_LINKS.linkedin} target="_blank" rel="noopener noreferrer me" className="btn btn--outline">
                  LinkedIn →
                </Link>
                <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="btn btn--outline">
                  Download resume ↗
                </Link>
              </div>
              <figure className="contact-photo">
                <div className="contact-photo__frame">
                  <Image
                    src={CONNECT_ACCENT_PHOTO.src}
                    alt={CONNECT_ACCENT_PHOTO.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className="contact-photo__img"
                    quality={82}
                  />
                </div>
                {CONNECT_ACCENT_PHOTO.caption ? (
                  <figcaption className="contact-photo__caption">{CONNECT_ACCENT_PHOTO.caption}</figcaption>
                ) : null}
              </figure>
            </div>
            <div className="contact-links">
              {[
                { label: "Email", value: CONTACT_EMAIL, href: PROFILE_LINKS.email },
                { label: "Phone", value: CONTACT_PHONE, href: PROFILE_LINKS.phone },
                { label: "LinkedIn", value: "onaolapomichaelodunjo", href: PROFILE_LINKS.linkedin },
                { label: "GitHub", value: "Omodunjo11", href: PROFILE_LINKS.github },
                { label: "Medium", value: "@odunjoonaolapo", href: PROFILE_LINKS.medium },
                { label: "Twitter / X", value: "@Modunjo", href: PROFILE_LINKS.twitter },
                { label: "Instagram", value: "@alaye_omodunjo", href: PROFILE_LINKS.instagram },
                { label: "Goodreads", value: "Reading list", href: PROFILE_LINKS.goodreads },
              ].map(({ label, value, href }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer me" : undefined}
                  className="contact-link"
                >
                  <span className="contact-link-label">{label}</span>
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
