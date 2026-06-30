import Link from "next/link"
import Reveal from "@/components/Reveal"
import { INTENT_CTA } from "@/lib/site"

export default function HomeConnectCta() {
  return (
    <section className="home-connect-cta">
      <div className="pad-page home-connect-cta__inner">
        <Reveal>
          <p className="home-section-eyebrow home-section-eyebrow--light">Connect</p>
          <h2 className="home-connect-cta__title">
            Let&apos;s talk about what you&apos;re building.
          </h2>
          <p className="home-connect-cta__intent">{INTENT_CTA}</p>
          <div className="home-connect-cta__actions">
            <Link href="/connect" className="hero-cta-primary">
              Start a conversation →
            </Link>
            <Link href="/experience" className="hero-cta-secondary">
              View experience
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
