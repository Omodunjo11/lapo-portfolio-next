"use client"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { CANONICAL_NAME, IDENTITY_LINE } from "@/lib/site"

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <p className="page-hero-eyebrow">01 · About</p>
        <h1 className="page-hero-title">
          Lagos to Philly.<br />
          <em>Same question everywhere.</em>
        </h1>
        <p className="page-hero-desc">
          Where is the real problem, and what would actually help? That thread runs through
          chemical engineering, product, AI, private capital, and the regulated systems I ship today.
        </p>
      </div>

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
                I go by Lapo. I grew up in Lagos, studied in Bradford, and found my way through New York and Philadelphia.
                Every move meant learning a new system and finding my voice in rooms that did not feel familiar at first.
                That is why I am drawn to products and people in transition.
              </p>
              <p className="body-text">
                Today I build AI systems for regulated industries — environments where trust matters and the cost of a wrong answer is real.
                My work sits at the intersection of product, AI, financial infrastructure, and practical judgment.
              </p>
              <p className="body-text">
                I recently finished my Wharton MBA while shipping Kinage, an AI market intelligence platform, in production.
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
    </>
  )
}
