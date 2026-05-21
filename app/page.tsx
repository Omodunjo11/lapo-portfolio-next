"use client"
import Image from "next/image"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import { featuredProjects } from "@/lib/projects"

const tickerItems = [
  { text: "Retrieval Architecture", highlight: true }, { text: "36 Countries Visited" },
  { text: "LLM Evaluation", highlight: true }, { text: "Yoruba Native Speaker" },
  { text: "Enterprise ML", highlight: true }, { text: "Africa & Emerging Markets" },
  { text: "Regulatory AI", highlight: true }, { text: "Chemical Engineer at Heart" },
  { text: "Drift Monitoring", highlight: true }, { text: "Wharton MBA 26" },
  { text: "Platform Strategy", highlight: true }, { text: "Private Equity" },
  { text: "RAG Systems", highlight: true }, { text: "Jollof Rice Connoisseur" },
]

const taglines = [
  "Building AI systems that work in regulated environments.",
  "Connecting emerging markets to global capital.",
  "Shipping products that survive contact with reality.",
  "Infrastructure investor. AI builder. Wharton MBA.",
]

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "55% 45%",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Left */}
        <div
          style={{
            padding: "80px 64px 80px 48px",
            display: "flex", flexDirection: "column", justifyContent: "center",
            borderRight: "1px solid var(--border)",
          }}
        >
          <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 24, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp .7s .5s ease both" }}>
            <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
            AI Systems Architecture · Private Capital · Africa & U.S.
          </p>

          <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(48px,6vw,80px)", fontWeight: 900, lineHeight: .92, letterSpacing: "-.03em", marginBottom: 12, animation: "fadeUp .8s .65s ease both" }}>
            Onaolapo<br />Michael<br />
            <em style={{ fontStyle: "italic", color: "var(--terra)" }}>Odunjo</em>
          </h1>

          <p style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic", marginBottom: 18, animation: "fadeUp .7s .8s ease both" }}>
            Lapo to most people
          </p>

          <p
            style={{
              fontFamily: "var(--font-playfair),serif",
              fontStyle: "italic", fontSize: 18,
              lineHeight: 1.5, maxWidth: 420,
              marginBottom: 8, minHeight: 56,
              animation: "fadeUp .7s 1.05s ease both",
              color: "var(--ink)",
            }}
          >
            {taglines[0]}
            <span className="cursor-blink" />
          </p>

          <p style={{ fontSize: 12, color: "var(--muted)", maxWidth: 400, marginBottom: 40, animation: "fadeUp .7s 1.15s ease both" }}>
            Wharton MBA · Kinage · KOVA · Amazon · Capital One · TD Bank · City Ventures
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, animation: "fadeUp .7s 1.25s ease both" }}>
            {[
              { label: "↓ Resume", href: "/Website-Resume.pdf", primary: true, download: true },
              { label: "See My Work", href: "/projects" },
              { label: "LinkedIn", href: "https://linkedin.com/in/onaolapomichaelodunjo", external: true },
              { label: "GitHub", href: "https://github.com/Omodunjo11", external: true },
            ].map((btn) => (
              <Link
                key={btn.label}
                href={btn.href}
                download={btn.download}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener" : undefined}
                style={{
                  fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase",
                  border: "1px solid var(--border)", padding: "9px 18px", borderRadius: 2,
                  transition: "all .25s",
                  background: btn.primary ? "var(--terra)" : "transparent",
                  color: btn.primary ? "var(--paper)" : "inherit",
                  borderColor: btn.primary ? "var(--terra)" : "var(--border)",
                  fontWeight: btn.primary ? 600 : 400,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--ink)"
                  e.currentTarget.style.color = "var(--paper)"
                  e.currentTarget.style.borderColor = "var(--ink)"
                  e.currentTarget.style.transform = "translateY(-1px)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = btn.primary ? "var(--terra)" : "transparent"
                  e.currentTarget.style.color = btn.primary ? "var(--paper)" : "inherit"
                  e.currentTarget.style.borderColor = btn.primary ? "var(--terra)" : "var(--border)"
                  e.currentTarget.style.transform = "translateY(0)"
                }}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", animation: "fadeIn 1s .8s ease both" }}>
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <Image
              src="/images/IMG_3437.jpg"
              alt="Lapo Odunjo"
              fill
              style={{ objectFit: "cover", objectPosition: "center top", filter: "grayscale(8%) contrast(1.05)" }}
              priority
            />
            <span style={{ position: "absolute", bottom: 12, left: 14, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,240,232,.75)" }}>
              Philadelphia, 2025
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border)", borderTop: "1px solid var(--border)" }}>
            {[
              { n: "2B+", l: "Records Modeled" },
              { n: "60+", l: "Companies Reviewed" },
              { n: "10", l: "African Markets" },
              { n: "36", l: "Countries Traveled" },
            ].map(({ n, l }) => (
              <div key={l} style={{ background: "var(--paper)", padding: 20, transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--paper)")}
              >
                <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 30, fontWeight: 700, color: "var(--terra)" }}>{n}</div>
                <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Ticker items={tickerItems} />

      {/* ABOUT */}
      <section id="about" style={{ padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 48px 48px", display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>01</span>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>About</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 0, padding: "0 48px", alignItems: "start" }}>
          <Reveal>
            <div style={{ paddingRight: 56, borderRight: "1px solid var(--border)" }}>
              <Image
                src="/images/IMG_3438.png"
                alt="Lapo Odunjo"
                width={400}
                height={500}
                style={{ width: "100%", height: "auto", objectFit: "cover", filter: "grayscale(15%) contrast(1.05)", marginBottom: 24 }}
              />
              <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 9, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 6 }}>AD ASTRA PER ASPERA</div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic" }}>To the stars through difficulties.</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ paddingLeft: 56, display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "I grew up between Lagos and Bradford. The question that followed me out of both was the same: how does this actually work, and what breaks first under pressure?",
                "That question took me from chemical engineering to product management to AI systems to private capital. The path looks nonlinear from the outside. From the inside, it has always been one thing: find the leverage point, then build toward it.",
              ].map((text, i) => (
                <p key={i} style={{ fontSize: 14, lineHeight: 1.85, color: "var(--mid)" }}>{text}</p>
              ))}

              <blockquote style={{ borderLeft: "2px solid var(--terra)", paddingLeft: 24, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 16, lineHeight: 1.6, color: "var(--ink)", margin: "8px 0" }}>
                Most AI systems fail in regulated institutions not because the models are weak, but because the escalation logic is naive.
              </blockquote>

              <blockquote style={{ borderLeft: "2px solid var(--gold)", paddingLeft: 24, fontFamily: "var(--font-playfair),serif", fontStyle: "italic", fontSize: 15, color: "var(--mid)", lineHeight: 1.6 }}>
                I have never been the smartest person in the room. I am usually the one who read the room differently.
              </blockquote>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {["AI Systems", "Private Markets", "Africa", "Fintech", "Regulated Industries", "Electrochemistry"].map((tag) => (
                  <span key={tag} style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 2, color: "var(--mid)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section id="work" style={{ padding: "72px 0 80px", borderTop: "1px solid var(--border)" }}>
        <Reveal>
          <div style={{ padding: "0 48px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>02</span>
              <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Featured Projects</span>
              <div style={{ width: 120, height: 1, background: "var(--border)" }} />
            </div>
            <Link
              href="/projects"
              style={{ fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", transition: "opacity .2s" }}
            >
              View All →
            </Link>
          </div>
        </Reveal>

        <div style={{ padding: "0 48px", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "var(--border)" }}>
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.1}>
              <Link href={`/projects/${project.slug}`}>
                <div
                  style={{
                    background: "var(--paper)", padding: "36px 32px",
                    height: "100%", display: "flex", flexDirection: "column",
                    position: "relative", overflow: "hidden",
                    transition: "background .25s",
                    borderTop: "2px solid transparent",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", border: "1px solid rgba(196,98,45,.3)", color: "var(--terra)", padding: "3px 9px", borderRadius: 2 }}>
                      {project.lang}
                    </span>
                    <span style={{ fontSize: 9, color: "var(--muted)" }}>{project.year}</span>
                  </div>
                  <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>{project.name}</div>
                  <div style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>{project.role}</div>
                  <p style={{ fontSize: 13, lineHeight: 1.85, color: "var(--mid)", flex: 1, marginBottom: 24 }}>{project.tagline}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
                    {project.stack.slice(0, 3).map((s) => (
                      <span key={s} style={{ fontSize: 8, background: "rgba(201,168,76,.1)", color: "#7a6020", padding: "3px 8px", borderRadius: 2 }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".1em" }}>Read full breakdown →</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ padding: "32px 48px 0", textAlign: "center" }}>
            <Link
              href="/projects"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700,
                letterSpacing: ".1em", textTransform: "uppercase",
                border: "1px solid var(--border)", padding: "13px 32px", borderRadius: 2,
                transition: "all .25s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
            >
              See all {"{"}11{"}"} projects →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SKILLS */}
      <section style={{ borderTop: "1px solid var(--border)", padding: "72px 0 80px" }}>
        <Reveal>
          <div style={{ padding: "0 48px 48px", display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>03</span>
            <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Skills</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "var(--border)", margin: "0 48px" }}>
          {[
            {
              title: "AI & ML",
              items: ["LLM Systems Design", "RAG Architecture", "Prompt Engineering", "Evaluation Frameworks", "Drift Monitoring", "Claude / GPT APIs"],
            },
            {
              title: "Product",
              items: ["0→1 Product Builds", "Spec Writing", "User Research", "Roadmap Strategy", "Regulated Domains", "Data Products"],
            },
            {
              title: "Engineering",
              items: ["TypeScript / Next.js", "Python", "C++", "Node / Express", "Prisma / SQL", "Vercel / Cloud"],
            },
            {
              title: "Capital & Strategy",
              items: ["Private Equity", "Venture Capital", "Financial Modelling", "Africa Markets", "M&A Analysis", "Infrastructure"],
            },
          ].map(({ title, items }) => (
            <Reveal key={title}>
              <div style={{ background: "var(--paper)", padding: "26px 22px" }}>
                <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 14 }}>
                  {title}
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map((item) => (
                    <li key={item} style={{ fontSize: 11, color: "var(--ink)", display: "flex", gap: 8, alignItems: "flex-start", transition: "color .2s, transform .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "var(--terra)"; e.currentTarget.style.transform = "translateX(4px)" }}
                      onMouseLeave={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.transform = "translateX(0)" }}
                    >
                      <span style={{ color: "var(--gold)", fontSize: 8, marginTop: 3, flexShrink: 0 }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ borderTop: "1px solid var(--border)", padding: "80px 48px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
                Let&apos;s build something{" "}
                <em style={{ color: "var(--terra)", fontStyle: "italic" }}>worth building.</em>
              </h2>
              <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, maxWidth: 340 }}>
                AI product strategy, regulated-industry AI, private markets in Africa and emerging markets — if any of that is the problem, I want to hear about it.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { label: "Email", value: "omodunjo@wharton.upenn.edu", href: "mailto:omodunjo@wharton.upenn.edu" },
                { label: "LinkedIn", value: "onaolapomichaelodunjo", href: "https://linkedin.com/in/onaolapomichaelodunjo" },
                { label: "GitHub", value: "Omodunjo11", href: "https://github.com/Omodunjo11" },
              ].map(({ label, value, href }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener" : undefined}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 18px", border: "1px solid var(--border)",
                    fontSize: 12, borderRadius: 2, transition: "all .25s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.transform = "translateX(4px)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)" }}
                >
                  <span style={{ color: "var(--muted)", fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", width: 80 }}>{label}</span>
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
