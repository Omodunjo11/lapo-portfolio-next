"use client"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { featuredProjects } from "@/lib/projects"
import { PROFILE_LINKS } from "@/lib/site"

const perspectives = [
  {
    title: "The symptom is rarely the problem",
    body: "Lagos taught me to distrust the first explanation. When an AI pipeline or an investment thesis keeps failing, something upstream is usually wrong, something the room is reluctant to say out loud. I have made a habit of asking that question before anything else.",
  },
  {
    title: "Informal systems encode real intelligence",
    body: "That skepticism deepened when I looked closely at how credit actually works in West Africa. Ajo groups and market lending look messy on a spreadsheet but they are often more adaptive than the products built to replace them. Understanding what already works before touching it is not just a courtesy. It is how you avoid breaking the thing you came to fix.",
  },
  {
    title: "The bottleneck is trust, not accuracy",
    body: "The same lesson shows up inside regulated institutions. The constraint is almost never the model. It is whether a compliance officer, a fraud investigator, or an analyst will act on what the system says. Designing for adoption under scrutiny is a harder problem than improving benchmark numbers, and it is the one that actually matters.",
  },
  {
    title: "Hold both lenses at once",
    body: "Working from the continent inside Western institutions means carrying global rigor and local reality at the same time. The products that last do not ask people to choose between them, and neither do I.",
  },
]

export default function WorkPage() {
  return (
    <>
      <div className="page-hero">
        <p className="page-hero-eyebrow">02 · Work</p>
        <h1 className="page-hero-title">
          Production AI.<br />
          <em>Not just demos.</em>
        </h1>
        <p className="page-hero-desc">
          Featured builds across regulated finance, informal credit infrastructure, and agentic systems
          shipped end-to-end — from strategy and evaluation to production adoption.
        </p>
      </div>

      <section className="page-section page-section--bordered">
        <div className="grid-2col pad-page">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <Link href={`/projects/${project.slug}`} className="project-card">
                <div className="project-card-top">
                  <span className="project-lang">{project.lang}</span>
                  <span className="project-year">{project.year}</span>
                </div>
                <div className="project-name">{project.name}</div>
                <div className="project-role">{project.role}</div>
                <p className="project-tagline">{project.tagline}</p>
                <div className="project-stack">
                  {project.stack.slice(0, 3).map(s => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
                <div className="project-cta">Read full breakdown →</div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="cta-row">
            <Link href="/projects" className="btn btn--outline">See all 11 projects →</Link>
            <Link href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer me" className="btn btn--filled">
              Build Archive on GitHub ↗
            </Link>
            <Link href="/how-i-build" className="btn btn--accent">How I Build AI Products →</Link>
          </div>
        </Reveal>
      </section>

      <section className="page-section page-section--bordered">
        <div className="perspective-wrap pad-page">
          <div className="section-header-inline" style={{ marginBottom: 8 }}>
            <span className="section-number">03</span>
            <span className="section-label">Perspective</span>
            <div className="section-divider" />
          </div>

          <div className="perspective-layout">
            <figure className="perspective-hero">
              <Image
                src="/images/photo-landscape.jpg"
                alt="Tea hills outside Nairobi, Kenya"
                width={1200}
                height={900}
                sizes="(max-width: 900px) 92vw, 38vw"
                quality={85}
                className="perspective-landscape-img"
              />
              <figcaption className="perspective-caption">Nairobi highlands · Kenya</figcaption>
            </figure>

            <div className="perspective-copy">
              <p className="perspective-lede">
                Most of how I think about product started in Lagos, reading systems when the official story
                does not match what is happening on the ground. That lens still shows up in the AI work I ship
                for banks, healthcare, and markets most products never reach.
              </p>

              <div className="perspective-points">
                {perspectives.map((item) => (
                  <article key={item.title} className="perspective-point">
                    <h3 className="perspective-title">{item.title}</h3>
                    <p className="perspective-body">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
