"use client"
import Image from "next/image"
import Link from "next/link"
import { CANONICAL_NAME, INTENT_CTA, PROFILE_LINKS, ROLE_TITLE } from "@/lib/site"

const FEATURED = [
  {
    href: "/projects/kova-bot",
    image: "/images/hero/hero-card-fintech.png",
    label: "Kova",
    sub: "WhatsApp credit infrastructure",
  },
  {
    href: "/projects/gtm-intelligence-platform",
    image: "/images/hero/hero-card-enterprise.png",
    label: "Kinage",
    sub: "Enterprise agentic workflows",
  },
  {
    href: "/projects/regulatory-compliance-cockpit",
    image: "/images/hero/hero-card-healthcare.png",
    label: "Regulated AI",
    sub: "Healthcare compliance ops",
  },
]

const QUICK_LINKS = [
  { href: "/#about", label: "About", sub: "Background & focus" },
  { href: "/#work", label: "Work", sub: "Selected projects" },
  { href: "/projects", label: "Projects", sub: "Full portfolio" },
  { href: "/experience", label: "Experience", sub: "Career timeline" },
  { href: "/writing", label: "Writing", sub: "Essays & notes" },
  { href: "/#contact", label: "Contact", sub: "Start a conversation" },
]

export default function CloudScene() {
  return (
    <>
      <section
        id="home"
        className="hero-editorial"
        style={{
          position: "relative",
          minHeight: "calc(100svh - 57px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          background: "var(--ink)",
        }}
      >
        <div className="hero-editorial-grid" aria-hidden />

        <div className="hero-editorial-inner">
          <div className="hero-editorial-copy" style={{ animation: "fadeUp .8s .15s ease both", opacity: 0 }}>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 10,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(148,163,184,0.9)",
                margin: "0 0 20px",
              }}
            >
              AI Product · Regulated Systems
            </p>
            <h1
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 900,
                fontSize: "clamp(42px,6.5vw,76px)",
                letterSpacing: "-.03em",
                lineHeight: 1.02,
                margin: 0,
                color: "var(--paper)",
              }}
            >
              {CANONICAL_NAME}
            </h1>
            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
                fontSize: "clamp(16px,2.2vw,22px)",
                color: "rgba(226,232,240,0.92)",
                marginTop: 16,
                maxWidth: 560,
                lineHeight: 1.45,
              }}
            >
              {ROLE_TITLE}
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "clamp(10px,1.1vw,12px)",
                letterSpacing: ".04em",
                color: "rgba(148,163,184,0.95)",
                marginTop: 18,
                maxWidth: 520,
                lineHeight: 1.7,
              }}
            >
              {INTENT_CTA}
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Link href="/#contact" className="hero-cta-primary">
                Start a conversation
              </Link>
              <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="hero-cta-secondary">
                Resume
              </Link>
            </div>
          </div>

          <div className="hero-featured-row" style={{ animation: "fadeUp .8s .3s ease both", opacity: 0 }}>
            {FEATURED.map((item) => (
              <Link key={item.href} href={item.href} className="hero-featured-card">
                <div className="hero-featured-image">
                  <Image src={item.image} alt={item.label} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: "cover" }} priority />
                </div>
                <div className="hero-featured-meta">
                  <div className="hero-featured-label">{item.label}</div>
                  <div className="hero-featured-sub">{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="map" className="hero-quick-links">
        <div className="hero-quick-links-header">
          <p className="hero-quick-links-eyebrow">Navigate</p>
          <h2 className="hero-quick-links-title">Where to next</h2>
        </div>
        <div className="hero-quick-links-grid">
          {QUICK_LINKS.map(({ href, label, sub }) => (
            <Link key={href} href={href} className="hero-quick-link-card">
              <div className="hero-quick-link-label">{label}</div>
              <div className="hero-quick-link-sub">{sub}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
