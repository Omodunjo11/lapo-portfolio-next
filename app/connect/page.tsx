"use client"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { CONTACT_EMAIL, PROFILE_LINKS } from "@/lib/site"

export default function ConnectPage() {
  return (
    <>
      <div className="page-hero page-hero--ink">
        <p className="page-hero-eyebrow page-hero-eyebrow--light">Connect</p>
        <h1 className="page-hero-title page-hero-title--light">
          Start a<br />
          <em>conversation.</em>
        </h1>
        <p className="page-hero-desc page-hero-desc--light">
          AI systems in regulated industries. Private markets across Africa.
          Anything that does not fit a clean slide deck — those are my favourite conversations.
        </p>
      </div>

      <section className="page-section contact-section">
        <Reveal>
          <div className="grid-contact pad-page">
            <div>
              <h2 className="contact-title">Ways to reach me</h2>
              <p className="contact-desc">
                Best for role conversations, design partnerships, or anything at the intersection of
                AI product and regulated infrastructure. I read everything — response time varies with
                travel and shipping cycles.
              </p>
              <div style={{ marginTop: 28 }}>
                <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="btn btn--outline">
                  Download resume ↗
                </Link>
              </div>
            </div>
            <div className="contact-links">
              {[
                { label: "Email", value: CONTACT_EMAIL, href: PROFILE_LINKS.email },
                { label: "LinkedIn", value: "onaolapomichaelodunjo", href: PROFILE_LINKS.linkedin },
                { label: "GitHub", value: "Omodunjo11", href: PROFILE_LINKS.github },
                { label: "Medium", value: "@odunjoonaolapo", href: PROFILE_LINKS.medium },
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
