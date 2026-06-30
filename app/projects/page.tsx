"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import { projects, featuredProjects } from "@/lib/projects"

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / LLM" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "automation", label: "Automation" },
  { key: "systems", label: "Systems" },
]

const statusFilters = [
  { key: "all", label: "All" },
  { key: "live", label: "● Live" },
  { key: "building", label: "◐ Building" },
  { key: "built", label: "◇ Built" },
]

const statusConfig = {
  live:     { label: "● Live",      bg: "rgba(74,222,128,0.12)",  color: "#4ade80",  border: "rgba(74,222,128,0.35)" },
  building: { label: "◐ Building",  bg: "rgba(56,189,248,0.12)",  color: "var(--terra)", border: "rgba(56,189,248,0.35)" },
  built:    { label: "◇ Built",     bg: "rgba(167,139,250,0.12)", color: "#A78BFA",  border: "rgba(167,139,250,0.35)" },
}

const tickerItems = [
  { text: "Claude API", highlight: true }, { text: "0→1 Products" },
  { text: "TradeScore", highlight: true }, { text: "TypeScript" },
  { text: "LLM Abstention", highlight: true }, { text: "Python" },
  { text: "Regulatory AI", highlight: true }, { text: "Next.js" },
  { text: "Webhook-First", highlight: true }, { text: "Prisma" },
  { text: "WhatsApp Credit", highlight: true }, { text: "Paystack" },
]

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  "HTML / JS": "#e34c26",
}

// Hero images mapped to featured project slugs
const featuredImages: Record<string, string> = {
  "kova-bot": "/images/hero/hero-card-fintech.png",
  "gtm-intelligence-platform": "/images/hero/hero-card-enterprise.png",
  "regulatory-compliance-cockpit": "/images/hero/hero-card-healthcare.png",
}

export default function ProjectsPage() {
  const [active, setActive] = useState("all")
  const [statusActive, setStatusActive] = useState("all")

  const visible = projects.filter(
    (p) =>
      (active === "all" || p.category.includes(active)) &&
      (statusActive === "all" || p.status === statusActive)
  )

  const liveCount = projects.filter(p => p.status === "live").length
  const buildingCount = projects.filter(p => p.status === "building").length

  return (
    <>
      {/* Hero */}
      <div
        style={{
          minHeight: "42vh",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "clamp(48px,10vh,80px) clamp(16px,6vw,48px) 48px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase",
            color: "var(--terra)", marginBottom: 18,
            display: "flex", alignItems: "center", gap: 10,
            animation: "fadeUp .7s .4s ease both",
          }}
        >
          <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
          Product · AI Systems · Built from Scratch
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(40px, 6vw, 76px)",
            fontWeight: 900, lineHeight: .92, letterSpacing: "-.03em",
            marginBottom: 20,
            animation: "fadeUp .8s .55s ease both",
          }}
        >
          I don&apos;t just spec it.<br />
          <em style={{ color: "var(--terra)", fontStyle: "italic" }}>I ship it.</em>
        </h1>
        <p
          style={{
            fontSize: 13, color: "var(--muted)", maxWidth: 560, lineHeight: 1.85,
            animation: "fadeUp .7s .7s ease both",
          }}
        >
          Every project here started with a real problem: forty million Nigerians with no credit file, a compliance team missing regulatory drift in live disclosures, a sales team losing call intelligence in Drive folders. I found the gap, designed the solution, and built the thing.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg2)" }}>
        <div
          style={{
            padding: "14px clamp(16px,6vw,48px)",
            display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center",
          }}
        >
          {[
            { label: "Total builds", value: "11" },
            { label: "Live in production", value: String(liveCount) },
            { label: "In progress", value: String(buildingCount) },
            { label: "Primary stack", value: "TypeScript · Python" },
            { label: "Domains", value: "Fintech · Enterprise · AI" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontWeight: 800, fontSize: 13 }}>{value}</span>
              <span style={{ fontSize: 8, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <Ticker items={tickerItems} />

      {/* Featured */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "clamp(40px,6vw,56px) clamp(16px,6vw,48px)" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 32 }}>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>◆</span>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Featured Builds</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 10, color: "var(--muted)" }}>Production AI · Regulated Systems</span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 1, background: "var(--border)" }}>
          {featuredProjects.map((project, i) => {
            const heroImg = featuredImages[project.slug]
            const cfg = statusConfig[project.status]
            return (
              <Reveal key={project.slug} delay={i * 0.07}>
                <Link href={`/projects/${project.slug}`} style={{ display: "block", height: "100%" }}>
                  <div
                    style={{
                      background: "var(--paper)", height: "100%",
                      display: "flex", flexDirection: "column",
                      transition: "background .25s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,98,45,.03)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
                  >
                    {/* Image header */}
                    {heroImg ? (
                      <div style={{ position: "relative", height: 160, overflow: "hidden", flexShrink: 0 }}>
                        <Image
                          src={heroImg}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          style={{ objectFit: "cover" }}
                        />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)" }} />
                        <span
                          style={{
                            position: "absolute", bottom: 12, left: 16,
                            fontSize: 7, letterSpacing: ".14em", textTransform: "uppercase",
                            background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                            padding: "3px 9px", borderRadius: 2,
                          }}
                        >{cfg.label}</span>
                      </div>
                    ) : (
                      <div
                        style={{
                          height: 100, background: "var(--ink)", flexShrink: 0,
                          display: "flex", alignItems: "flex-end", padding: "16px 20px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 7, letterSpacing: ".14em", textTransform: "uppercase",
                            background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                            padding: "3px 9px", borderRadius: 2,
                          }}
                        >{cfg.label}</span>
                      </div>
                    )}

                    {/* Card body */}
                    <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontSize: 8, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>{project.year}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <span style={{ width: 7, height: 7, borderRadius: "50%", background: langColors[project.lang] || "var(--muted)", display: "inline-block" }} />
                          <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 7, color: "var(--muted)" }}>{project.lang}</span>
                        </span>
                      </div>
                      <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 18, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>
                        {project.name}
                      </div>
                      <div style={{ fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 12 }}>
                        {project.role}
                      </div>
                      <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--mid)", flex: 1, marginBottom: 18 }}>
                        {project.tagline}
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 18 }}>
                        {project.stack.slice(0, 3).map(s => (
                          <span key={s} style={{ fontSize: 8, letterSpacing: ".07em", background: "rgba(201,168,76,.12)", color: "#c9a84c", padding: "3px 8px", borderRadius: 2 }}>{s}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".08em" }}>Read full breakdown →</div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* All Projects */}
      <section style={{ padding: "clamp(40px,5vw,56px) clamp(16px,6vw,48px)", paddingBottom: 0 }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>◆</span>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>All Builds</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 9, color: "var(--muted)" }}>{visible.length} showing</span>
          </div>
        </Reveal>

        {/* Combined filter bar */}
        <Reveal>
          <div
            style={{
              display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center",
              paddingBottom: 24, borderBottom: "1px solid var(--border)", marginBottom: 0,
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)", marginRight: 4 }}>Category</span>
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  style={{
                    fontSize: 8, letterSpacing: ".1em", textTransform: "uppercase",
                    border: "1px solid",
                    borderColor: active === f.key ? "var(--terra)" : "var(--border)",
                    padding: "5px 13px", borderRadius: 2,
                    background: active === f.key ? "var(--terra)" : "transparent",
                    color: active === f.key ? "var(--paper)" : "var(--mid)",
                    fontFamily: "var(--font-dm-mono), monospace",
                    cursor: "pointer", transition: "all .2s",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div style={{ width: 1, height: 20, background: "var(--border)", flexShrink: 0 }} />
            <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)", marginRight: 4 }}>Status</span>
              {statusFilters.map((f) => {
                const cfg = f.key !== "all" ? statusConfig[f.key as keyof typeof statusConfig] : null
                const isActive = statusActive === f.key
                return (
                  <button
                    key={f.key}
                    onClick={() => setStatusActive(f.key)}
                    style={{
                      fontSize: 8, letterSpacing: ".1em",
                      border: "1px solid",
                      borderColor: isActive ? (cfg?.color ?? "var(--terra)") : "var(--border)",
                      padding: "5px 13px", borderRadius: 2,
                      background: isActive ? (cfg?.bg ?? "var(--terra)") : "transparent",
                      color: isActive ? (cfg?.color ?? "var(--paper)") : "var(--mid)",
                      fontFamily: "var(--font-dm-mono), monospace",
                      cursor: "pointer", transition: "all .2s",
                    }}
                  >
                    {f.label}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Project list */}
      <section style={{ paddingBottom: 64 }}>
        <div style={{ background: "var(--border)", display: "flex", flexDirection: "column", gap: 1, margin: 0 }}>
          {visible.map((project, i) => {
            const cfg = statusConfig[project.status]
            return (
              <Reveal key={project.slug} delay={(i % 5) * 0.05}>
                <Link href={`/projects/${project.slug}`} style={{ display: "block" }}>
                  <div
                    style={{
                      background: "var(--paper)",
                      padding: "22px clamp(16px,6vw,48px)",
                      display: "grid",
                      gridTemplateColumns: "1fr auto",
                      gap: "12px 32px",
                      alignItems: "center",
                      transition: "background .2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,98,45,.03)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
                  >
                    {/* Left: name + meta */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-syne),sans-serif", fontWeight: 800, fontSize: 15 }}>{project.name}</span>
                        <span style={{ fontSize: 7, letterSpacing: ".14em", textTransform: "uppercase", background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`, padding: "2px 7px", borderRadius: 2 }}>{cfg.label}</span>
                      </div>
                      <p style={{ fontSize: 11, color: "var(--mid)", lineHeight: 1.65, marginBottom: 10, maxWidth: 600 }}>
                        {project.tagline}
                      </p>
                      <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                        {project.stack.slice(0, 4).map(s => (
                          <span key={s} style={{ fontSize: 7, letterSpacing: ".07em", background: "rgba(201,168,76,.12)", color: "#c9a84c", padding: "2px 7px", borderRadius: 2 }}>{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Right: lang dot + year + arrow */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: langColors[project.lang] || "var(--muted)", display: "inline-block" }} />
                        <span style={{ fontFamily: "var(--font-dm-mono),monospace", fontSize: 8, color: "var(--muted)" }}>{project.lang}</span>
                      </div>
                      <span style={{ fontSize: 8, color: "var(--muted)" }}>{project.year}</span>
                      <span style={{ fontSize: 12, color: "var(--terra)" }}>→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* GitHub band */}
      <Reveal>
        <div
          style={{
            margin: "0 clamp(16px,6vw,48px) 80px",
            border: "1px solid var(--border)", borderRadius: 2,
            padding: "36px 44px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40,
            background: "var(--bg2)", transition: "background .3s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#e5dfd3")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--bg2)")}
        >
          <div>
            <div style={{ fontSize: 8, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 8 }}>Open Source</div>
            <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>See everything on GitHub</div>
            <p style={{ fontSize: 11, color: "var(--muted)", maxWidth: 420 }}>All projects are public. Code, commits, and context — no gatekeeping.</p>
          </div>
          <Link
            href="https://github.com/Omodunjo11"
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: ".1em", textTransform: "uppercase",
              background: "var(--ink)", color: "var(--paper)",
              padding: "13px 26px", borderRadius: 2,
              whiteSpace: "nowrap", flexShrink: 0,
              transition: "background .25s, transform .2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.transform = "translateY(-2px)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(0)" }}
          >
            View GitHub ↗
          </Link>
        </div>
      </Reveal>
    </>
  )
}
