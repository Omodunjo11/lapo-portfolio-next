import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { featuredProjects } from "@/lib/projects"
import { PROJECT_HERO_IMAGES } from "@/lib/project-images"
import { PORTFOLIO_HOME_LINK_LABEL } from "@/lib/metrics"
import { projectRoleLead } from "@/lib/project-display"

const statusLabel = {
  live: "● Live",
  building: "◐ Building",
  built: "◇ Built",
} as const

export default function HomeFeaturedWork() {
  const picks = featuredProjects.slice(0, 3)

  return (
    <section className="page-section page-section--bordered">
      <div className="pad-page" style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(40px, 5vw, 64px)" }}>
        <Reveal>
          <div className="section-header-row" style={{ marginBottom: 36, padding: 0 }}>
            <div>
              <p className="home-section-eyebrow">Selected work</p>
              <h2 className="home-section-title">The proof behind the headline.</h2>
            </div>
            <Link href="/projects" className="btn btn--outline btn--sm" style={{ flexShrink: 0 }}>
              All {PORTFOLIO_HOME_LINK_LABEL} →
            </Link>
          </div>
        </Reveal>

        <div className="home-featured-grid">
          {picks.map((project, i) => {
            const heroImg = PROJECT_HERO_IMAGES[project.slug]
            return (
              <Reveal key={project.slug} delay={i * 0.06}>
                <Link href={`/projects/${project.slug}`} className="home-featured-card interactive-surface interactive-surface--accent-top">
                  {heroImg && (
                    <div className="home-featured-card__image">
                      <Image
                        src={heroImg}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="home-featured-card__image-overlay" />
                    </div>
                  )}
                  <div className="home-featured-card__body">
                    <div className="home-featured-card__meta">
                      <span>{projectRoleLead(project.role)}</span>
                      <span className="home-featured-card__meta-dot" aria-hidden="true">
                        ·
                      </span>
                      <span>{project.year}</span>
                      <span className="home-featured-card__meta-dot" aria-hidden="true">
                        ·
                      </span>
                      <span>{statusLabel[project.status]}</span>
                    </div>
                    <h3 className="home-featured-card__title">{project.name}</h3>
                    <p className="home-featured-card__tagline">{project.tagline}</p>
                    <p className="home-featured-card__outcome">{project.outcome}</p>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
