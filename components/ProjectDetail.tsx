"use client"
import Link from "next/link"
import type { Project } from "@/lib/projects"

type Props = {
  project: Project
  prev?: Pick<Project, "slug" | "name">
  next?: Pick<Project, "slug" | "name">
}

export default function ProjectDetail({ project, prev, next }: Props) {
  return (
    <>
      {/* Back nav */}
      <div style={{ padding: "32px 48px 0", display: "flex", alignItems: "center", gap: 12, animation: "fadeUp .5s .1s ease both" }}>
        <Link
          href="/projects"
          style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", display: "flex", alignItems: "center", gap: 8, transition: "color .2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--terra)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          ← All Projects
        </Link>
        <span style={{ color: "var(--border)", fontSize: 10 }}>/</span>
        <span style={{ fontSize: 9, color: "var(--muted)", letterSpacing: ".1em" }}>{project.name}</span>
      </div>

      {/* Hero */}
      <div style={{ padding: "48px 48px 64px", borderBottom: "1px solid var(--border)" }}>
        <div className="detail-hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp .6s .2s ease both" }}>
              <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
              {project.role}
            </p>
            <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 900, lineHeight: .95, letterSpacing: "-.03em", marginBottom: 20, animation: "fadeUp .7s .3s ease both" }}>
              {project.name}
            </h1>
            <p style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic", fontSize: 20, color: "var(--mid)", maxWidth: 560, lineHeight: 1.5, animation: "fadeUp .6s .45s ease both" }}>
              {project.tagline}
            </p>
          </div>

          {/* Meta sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--border)", minWidth: 180, animation: "fadeIn .7s .5s ease both" }}>
            {[{ label: "Language", value: project.lang }, { label: "Year", value: project.year }, { label: "Category", value: project.category.join(", ") }].map(({ label, value }) => (
              <div key={label} style={{ background: "var(--paper)", padding: "14px 18px" }}>
                <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 11, fontWeight: 600 }}>{value}</div>
              </div>
            ))}
            <div style={{ background: "var(--paper)", padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              <Link
                href={project.github} target="_blank" rel="noopener"
                style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "8px 14px", borderRadius: 2, textAlign: "center", transition: "all .2s", display: "block" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
              >
                GitHub ↗
              </Link>
              {project.live && (
                <Link
                  href={project.live} target="_blank" rel="noopener"
                  style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--terra)", color: "var(--paper)", border: "1px solid var(--terra)", padding: "8px 14px", borderRadius: 2, textAlign: "center", transition: "all .2s", display: "block" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.borderColor = "var(--ink)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.borderColor = "var(--terra)" }}
                >
                  Live Site ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid-detail pad-section">
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>

          {/* Overview */}
          <div>
            <SectionHeader num="01" label="Overview" />
            <p style={{ fontSize: 14, lineHeight: 1.95, color: "var(--mid)" }}>{project.overview}</p>
          </div>

          {/* Key Objectives */}
          <div>
            <SectionHeader num="02" label="Key Objectives" />
            <ol style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 20 }}>
              {project.objectives.map((obj, i) => (
                <li key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, color: "var(--terra)", minWidth: 22, paddingTop: 2 }}>{i + 1}.</span>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{obj.title}: </span>
                    <span style={{ fontSize: 14, color: "var(--mid)", lineHeight: 1.85 }}>{obj.description}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Methodology */}
          <div>
            <SectionHeader num="03" label="Methodology" />
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
              {project.methodology.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", paddingLeft: 4 }}>
                  <span style={{ color: "var(--terra)", fontSize: 8, marginTop: 6, flexShrink: 0 }}>◆</span>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{item.title}: </span>
                    <span style={{ fontSize: 14, color: "var(--mid)", lineHeight: 1.85 }}>{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional deep-dive sections */}
          {project.sections && project.sections.map((sec, i) => (
            <div key={i}>
              <SectionHeader num={String(i + 4).padStart(2, "0")} label={sec.title} />
              <p style={{ fontSize: 14, lineHeight: 1.95, color: "var(--mid)" }}>{sec.body}</p>
            </div>
          ))}

          {/* PM Angle */}
          <div style={{ background: "var(--bg2)", padding: "32px 36px", borderRadius: 2 }}>
            <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 12 }}>PM Angle</div>
            <blockquote style={{ fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.7, color: "var(--ink)", borderLeft: "2px solid var(--terra)", paddingLeft: 24 }}>
              {project.pmAngle}
            </blockquote>
          </div>

          {/* Outcome */}
          <div>
            <SectionHeader label="Outcome" />
            <p style={{ fontSize: 14, lineHeight: 1.9, color: "var(--mid)" }}>{project.outcome}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar-sticky">
          <div style={{ border: "1px solid var(--border)", padding: "28px 24px" }}>
            <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>Key Features</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {project.features.map((f) => (
                <li key={f} style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.65, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", fontSize: 8, marginTop: 4, flexShrink: 0 }}>▸</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ border: "1px solid var(--border)", padding: "28px 24px" }}>
            <div style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>Tech Stack</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.stack.map((s) => (
                <span key={s} style={{ fontSize: 9, background: "rgba(201,168,76,.12)", color: "#7a6020", padding: "4px 10px", borderRadius: 2 }}>{s}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link
              href={project.github} target="_blank" rel="noopener"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", border: "1px solid var(--border)", borderRadius: 2, fontSize: 12, transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              <span>View on GitHub</span><span>↗</span>
            </Link>
            {project.live && (
              <Link
                href={project.live} target="_blank" rel="noopener"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "var(--terra)", color: "var(--paper)", borderRadius: 2, fontSize: 12, transition: "all .25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--ink)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--terra)")}
              >
                <span>View Live Site</span><span>↗</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Prev / Next */}
      {(prev || next) && (
        <div style={{ borderTop: "1px solid var(--border)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)" }}>
          {prev ? (
            <Link href={`/projects/${prev.slug}`}>
              <div
                style={{ background: "var(--paper)", padding: "36px 48px", transition: "background .25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>← Previous</div>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 15, fontWeight: 800 }}>{prev.name}</div>
              </div>
            </Link>
          ) : <div style={{ background: "var(--paper)" }} />}
          {next ? (
            <Link href={`/projects/${next.slug}`}>
              <div
                style={{ background: "var(--paper)", padding: "36px 48px", textAlign: "right", transition: "background .25s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 10 }}>Next →</div>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 15, fontWeight: 800 }}>{next.name}</div>
              </div>
            </Link>
          ) : <div style={{ background: "var(--paper)" }} />}
        </div>
      )}
    </>
  )
}

function SectionHeader({ num, label }: { num?: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      {num && <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>{num}</span>}
      <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  )
}
