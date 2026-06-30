"use client"
import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { featuredProjects } from "@/lib/projects"
import { PROFILE_LINKS } from "@/lib/site"

const perspectives = [
  {
    title: "Look past where the pain shows up",
    body: "Lagos rewards people who distrust the first explanation. When an AI pipeline or investment thesis keeps failing, I assume the symptom is pointing somewhere else — and ask what the room is reluctant to say out loud.",
  },
  {
    title: "Informal finance is smarter than it looks",
    body: "Ajo groups and market credit in West Africa look messy on a spreadsheet. They are often more adaptive than the products meant to replace them. The work is not to formalize them fast — it is to formalize them without breaking what already works.",
  },
  {
    title: "Trust beats the model",
    body: "In regulated institutions, the bottleneck is rarely capability. It is whether a compliance officer, fraud investigator, or analyst will act on what the system says. I design for adoption under scrutiny — not another demo.",
  },
  {
    title: "Two lenses, one product",
    body: "Building from the continent inside Western institutions means holding global rigor and local reality at the same time. The products that last do not ask people to choose between them.",
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

          <figure className="perspective-hero">
            <Image
              src="/images/photo-landscape.jpg"
              alt="Tea hills outside Nairobi, Kenya"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 92vw, 520px"
              quality={85}
              className="perspective-landscape-img"
            />
            <figcaption className="perspective-caption">Nairobi highlands · Kenya</figcaption>
          </figure>

          <p className="perspective-lede">
            Most of how I think about product started in Lagos — reading systems when the official story
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
      </section>
    </>
  )
}
