"use client"
import Image from "next/image"
import Link from "next/link"
import { CANONICAL_NAME, INTENT_CTA, PROFILE_LINKS, ROLE_TITLE } from "@/lib/site"

const HEADSHOT = "/images/IMG_3437.jpg"

export default function CloudScene() {
  return (
    <section
      id="home"
      className="hero-editorial"
      style={{
        position: "relative",
        minHeight: "calc(100svh - 57px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--ink)",
      }}
    >
      <div className="hero-editorial-grid" aria-hidden />

      <div className="hero-editorial-inner">
        <div className="hero-editorial-main">
          <div className="hero-editorial-copy" style={{ animation: "fadeUp .8s .15s ease both", opacity: 0 }}>
            <p className="hero-eyebrow">AI Product · Regulated Systems</p>
            <h1 className="hero-title">{CANONICAL_NAME}</h1>
            <p className="hero-subtitle">{ROLE_TITLE}</p>
            <p className="hero-intent">{INTENT_CTA}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Link href="/#contact" className="hero-cta-primary">
                Start a conversation
              </Link>
              <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="hero-cta-secondary">
                Resume
              </Link>
            </div>
          </div>

          <div className="hero-editorial-portrait" style={{ animation: "fadeUp .8s .25s ease both", opacity: 0 }}>
            <div className="hero-portrait-frame">
              <Image
                src={HEADSHOT}
                alt={`${CANONICAL_NAME} — professional portrait`}
                width={480}
                height={600}
                sizes="(max-width: 900px) 72vw, 380px"
                quality={85}
                priority
                className="hero-portrait-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
