"use client"
import { useState } from "react"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import { projects } from "@/lib/projects"

const filters = [
  { key: "all", label: "All" },
  { key: "ai", label: "AI / LLM" },
  { key: "fullstack", label: "Full-Stack" },
  { key: "automation", label: "Automation" },
  { key: "systems", label: "Systems" },
]

const tickerItems = [
  { text: "Claude API", highlight: true }, { text: "0→1 Products" },
  { text: "RAG Systems", highlight: true }, { text: "TypeScript" },
  { text: "LLM Evaluation", highlight: true }, { text: "Python" },
  { text: "Regulatory AI", highlight: true }, { text: "Next.js" },
  { text: "Signal Intelligence", highlight: true }, { text: "Prisma" },
  { text: "Role-Aware AI", highlight: true }, { text: "Google Drive API" },
]

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  "C++": "#f34b7d",
  "HTML / JS": "#e34c26",
}

export default function ProjectsPage() {
  const [active, setActive] = useState("all")

  const visible = projects.filter(
    (p) => active === "all" || p.category.includes(active)
  )

  return (
    <>
      {/* Hero */}
      <div
        style={{
          minHeight: "48vh",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "80px 48px 60px",
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
          Every project here started with a real problem — a team drowning in meeting transcripts, a compliance team missing regulatory signals, a chatbot that couldn&apos;t tell a founder from an analyst. I found the gap, designed the solution, and built the thing.
        </p>
      </div>

      <Ticker items={tickerItems} />

      {/* Narrative */}
      <Reveal>
        <section className="pad-section" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="grid-1-2">
            <div>
              <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>
                The Through-Line
              </div>
              <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 700, lineHeight: 1.2 }}>
                Building AI products that work{" "}
                <em style={{ color: "var(--terra)", fontStyle: "italic" }}>in the real world</em>
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.9 }}>
                Most AI demos collapse the moment they touch a real workflow — inconsistent outputs, no escalation logic, no way to audit what the model actually did.{" "}
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>I build AI systems designed to survive contact with reality.</strong>{" "}
                That means thinking about failure modes before launch, not after.
              </p>
              <blockquote
                style={{
                  borderLeft: "2px solid var(--terra)", padding: "14px 0 14px 24px",
                  fontFamily: "var(--font-playfair), serif", fontStyle: "italic",
                  fontSize: 16, lineHeight: 1.6, color: "var(--ink)", margin: "8px 0",
                }}
              >
                I come to every product as both the PM and the person who can build a working prototype by Tuesday — which changes what questions you ask and how fast you move.
              </blockquote>
              <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.9 }}>
                Across these projects, I&apos;ve worked the full AI product surface:{" "}
                <strong style={{ color: "var(--ink)" }}>defining the use case</strong>,{" "}
                <strong style={{ color: "var(--ink)" }}>architecting the system</strong> (retrieval, context management, role-aware prompting),{" "}
                <strong style={{ color: "var(--ink)" }}>shipping the interface</strong>, and{" "}
                <strong style={{ color: "var(--ink)" }}>measuring reliability</strong> in regulated environments where silent failures are liabilities.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Capabilities */}
      <Reveal>
        <div style={{ padding: "0 0 48px" }}>
          <div style={{ padding: "56px 48px 32px", display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>◆</span>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>What I bring to an AI PM role</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
          <div className="grid-4col" style={{ margin: "0 48px" }}>
            {[
              { icon: "🧩", title: "Product Definition", desc: "I find the real problem under the stated one. Every project here started from a workflow gap — not a feature request. I write specs, define success metrics, and kill bad ideas before they become bad code." },
              { icon: "⚙️", title: "Technical Depth", desc: "LLM context windows, retrieval pipelines, role-aware prompting, async message queues — I understand the stack well enough to call out engineering tradeoffs in a design review, not just in a post-mortem." },
              { icon: "📐", title: "Ship Velocity", desc: "All of this was built outside a big org. No platform team, no infra support. That forces ruthless prioritisation and an allergy to scope creep. I know what a v1 needs to be and what it can be later." },
              { icon: "🏛️", title: "Regulated Domains", desc: "Fintech, compliance, and enterprise AI are my home turf. I understand why a CISO blocks an LLM rollout and what it takes to make an AI product trustworthy enough to deploy inside a bank or regulator." },
            ].map((cap) => (
              <div
                key={cap.title}
                style={{ background: "var(--paper)", padding: "30px 24px", transition: "background .25s", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,98,45,.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontSize: 20, marginBottom: 14 }}>{cap.icon}</div>
                <div style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 12, fontWeight: 800, marginBottom: 10 }}>{cap.title}</div>
                <p style={{ fontSize: 11, color: "var(--mid)", lineHeight: 1.75 }}>{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Section header */}
      <div style={{ padding: "32px 48px 0", display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>01</span>
        <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>All Projects</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      {/* Filters */}
      <div style={{ padding: "24px 48px 32px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 9, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)", marginRight: 8 }}>Filter by</span>
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            style={{
              fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase",
              border: "1px solid",
              borderColor: active === f.key ? "var(--terra)" : "var(--border)",
              padding: "6px 16px", borderRadius: 2,
              background: active === f.key ? "var(--terra)" : "transparent",
              color: active === f.key ? "var(--paper)" : "var(--mid)",
              fontFamily: "var(--font-dm-mono), monospace",
              cursor: "none", transition: "all .2s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="pad-page" style={{ paddingBottom: 80 }}>
        <div className="grid-3col">
          {visible.map((project, i) => (
            <Reveal key={project.slug} delay={((i % 3) * 0.08)}>
              <Link href={`/projects/${project.slug}`}>
                <div
                  style={{
                    background: "var(--paper)", padding: "32px 28px",
                    height: "100%",
                    display: "flex", flexDirection: "column",
                    position: "relative", overflow: "hidden",
                    transition: "background .25s",
                    borderTop: "2px solid transparent",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(196,98,45,.03)"
                    e.currentTarget.style.borderTopColor = "var(--terra)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--paper)"
                    e.currentTarget.style.borderTopColor = "transparent"
                  }}
                >
                  {/* Top row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <span
                      style={{
                        fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase",
                        border: "1px solid rgba(196,98,45,.3)", color: "var(--terra)",
                        padding: "3px 9px", borderRadius: 2,
                      }}
                    >
                      {project.lang}
                    </span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span
                        style={{
                          width: 8, height: 8, borderRadius: "50%",
                          background: langColors[project.lang] || "var(--muted)",
                          display: "inline-block",
                        }}
                      />
                      <span style={{ fontSize: 9, color: "var(--muted)" }}>{project.year}</span>
                    </div>
                  </div>

                  <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 16, fontWeight: 800, marginBottom: 6, lineHeight: 1.2 }}>
                    {project.name}
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "#7a6020", marginBottom: 14 }}>
                    {project.role}
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.85, color: "var(--mid)", flex: 1, marginBottom: 20 }}>
                    {project.tagline}
                  </p>

                  {/* PM Outcome */}
                  <div
                    style={{
                      background: "rgba(196,98,45,.05)",
                      borderLeft: "2px solid var(--terra)",
                      padding: "10px 14px",
                      marginBottom: 16,
                      fontSize: 11,
                      color: "var(--ink)",
                      lineHeight: 1.65,
                    }}
                  >
                    <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 4 }}>
                      Outcome
                    </div>
                    {project.outcome}
                  </div>

                  {/* Stack chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {project.stack.slice(0, 4).map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: 8, letterSpacing: ".07em",
                          background: "rgba(201,168,76,.12)", color: "#c9a84c",
                          padding: "3px 8px", borderRadius: 2,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div style={{ marginTop: 20, fontSize: 10, color: "var(--terra)", letterSpacing: ".1em" }}>
                    Read breakdown →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GitHub band */}
      <Reveal>
        <div
          style={{
            margin: "0 48px 80px",
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
