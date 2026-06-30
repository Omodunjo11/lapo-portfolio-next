"use client"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { featuredProjects, projects } from "@/lib/projects"
import { PROFILE_LINKS } from "@/lib/site"

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
          shipped end-to-end, from strategy and evaluation to production adoption.
        </p>
      </div>

      <section className="page-section page-section--bordered">
        <Reveal>
          <div className="pad-page" style={{ paddingTop: "clamp(32px, 4vw, 48px)", paddingBottom: 0 }}>
            <p style={{ fontSize: 13, color: "var(--mid)", maxWidth: 640, lineHeight: 1.9 }}>
              Every build here started with a trust problem, not a technical one. Regulated institutions,
              informal credit markets, and enterprise compliance teams share a common constraint: the people
              who need to act on the system are rarely the people who built it. These projects are designed
              for that gap.
            </p>
          </div>
        </Reveal>
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
            <Link href="/projects" className="btn btn--outline">See all {projects.length} projects →</Link>
            <Link href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer me" className="btn btn--filled">
              Build Archive on GitHub ↗
            </Link>
            <Link href="/how-i-build" className="btn btn--accent">How I Build AI Products →</Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
