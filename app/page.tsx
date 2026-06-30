"use client"
import Image from "next/image"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import CloudScene from "@/components/CloudScene"
import { featuredProjects } from "@/lib/projects"
import { essays } from "@/lib/writing"
import { CANONICAL_NAME, CONTACT_EMAIL, IDENTITY_LINE, PROFILE_LINKS } from "@/lib/site"
import { PROOF_METRICS } from "@/lib/metrics"

const tickerItems = [
  { text: "AI Product · Regulated Systems", highlight: true },
  { text: "Lagos → Bradford → NYC → Philly" },
  { text: "RAG Systems in Production", highlight: true },
  { text: "LLM Evaluation Frameworks" },
  { text: "Kinage · KOVA · Building", highlight: true },
  { text: "Trust Infrastructure" },
  { text: "Agentic Workflows · Production", highlight: true },
  { text: "Wharton MBA · Completed" },
]

const SH = ({ n, t }: { n: string; t: string }) => (
  <div className="section-header">
    <div className="section-header-row">
      {n && <span className="section-number">{n}</span>}
      <h2 className="section-title">{t}</h2>
    </div>
    <div className="section-rule" />
  </div>
)

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

export default function Home() {
  return (
    <>
      <CloudScene />

      <div className="page-body">
        <div className="metrics-bar">
          {PROOF_METRICS.map(({ metric, label }) => (
            <div key={metric} className="metric-item">
              <span className="metric-value">{metric}</span>
              <span className="metric-label">{label}</span>
            </div>
          ))}
        </div>

        <Ticker items={tickerItems} />

        <section id="about" className="page-section">
          <Reveal><SH n="01" t="About" /></Reveal>
          <div className="grid-about pad-page">
            <Reveal>
              <div className="about-left">
                <Image
                  src="/images/IMG_3436.jpg"
                  alt={`${CANONICAL_NAME} in Philadelphia`}
                  width={400}
                  height={500}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={80}
                  className="about-photo"
                />
                <p className="about-identity">{IDENTITY_LINE}</p>
                <div className="about-motto">
                  <div className="about-motto-label">AD ASTRA PER ASPERA</div>
                  <div className="about-motto-text">To the stars through difficulties.</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="about-right">
                <p className="body-text">
                  I go by Lapo. I grew up in Lagos, studied in Bradford, and found my way through New York and Philadelphia.
                  Every move meant learning a new system and finding my voice in rooms that did not feel familiar at first.
                  That is why I am drawn to products and people in transition.
                </p>
                <p className="body-text">
                  Today I build AI systems for regulated industries — environments where trust matters and the cost of a wrong answer is real.
                  My work sits at the intersection of product, AI, financial infrastructure, and practical judgment.
                </p>
                <p className="body-text">
                  I recently finished my Wharton MBA while shipping Kinage, an AI market intelligence platform, in production.
                  The path from chemical engineering to product to AI to private capital looks random from the outside.
                  To me it has always been one question: where is the real problem, and what would actually help?
                </p>
                <div className="tag-row">
                  {["AI Systems", "Private Markets", "Africa", "Fintech", "Regulated Industries"].map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="work" className="page-section page-section--bordered">
          <Reveal>
            <div className="section-header-bar">
              <div className="section-header-inline">
                <span className="section-number">02</span>
                <span className="section-label">Featured Projects</span>
                <div className="section-divider" />
              </div>
              <Link href="/projects" className="section-link">View All →</Link>
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
              <Link href="/projects" className="btn btn--outline">See all 11 projects →</Link>
              <Link href={PROFILE_LINKS.github} target="_blank" rel="noopener noreferrer me" className="btn btn--filled">
                Build Archive on GitHub ↗
              </Link>
              <Link href="/how-i-build" className="btn btn--accent">How I Build AI Products →</Link>
            </div>
          </Reveal>
        </section>

        <section id="perspective" className="page-section page-section--bordered">
          <Reveal><SH n="03" t="Perspective" /></Reveal>
          <Reveal>
            <div className="perspective-wrap pad-page">
              <div className="perspective-intro">
                <figure className="perspective-hero">
                  <Image
                    src="/images/photo-landscape.jpg"
                    alt="Tea hills outside Nairobi, Kenya"
                    width={400}
                    height={300}
                    sizes="140px"
                    quality={80}
                    className="perspective-landscape-img"
                  />
                  <figcaption className="perspective-caption">Nairobi highlands · Kenya</figcaption>
                </figure>

                <p className="perspective-lede">
                  Most of how I think about product started in Lagos — reading systems when the official story
                  does not match what is happening on the ground. That lens still shows up in the AI work I ship
                  for banks, healthcare, and markets most products never reach.
                </p>
              </div>

              <div className="perspective-points">
                {perspectives.map((item) => (
                  <article key={item.title} className="perspective-point">
                    <h3 className="perspective-title">{item.title}</h3>
                    <p className="perspective-body">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        <section id="writing" className="page-section page-section--bordered">
          <Reveal>
            <div className="section-header-bar">
              <div className="section-header-inline">
                <span className="section-number">04</span>
                <span className="section-label">Thoughts</span>
                <div className="section-divider" />
              </div>
              <Link href="/writing" className="section-link">All Essays →</Link>
            </div>
          </Reveal>
          <div className="grid-2col writing-grid">
            {essays.slice(0, 2).map((essay, i) => (
              <Reveal key={essay.slug} delay={i * 0.07}>
                <Link href={essay.url} target="_blank" rel="noopener" className="essay-card">
                  <div className="essay-category">{essay.category}</div>
                  <h3 className="essay-title">{essay.title}</h3>
                  <p className="essay-desc">{essay.description}</p>
                  <div className="essay-read">Read →</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="grid-photo">
          <div className="photo-break-image">
            <Image
              src="/images/photo-nairobi.jpg"
              alt="Lapo with friends in Nairobi"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="photo-break-img photo-break-img--social"
            />
            <div className="photo-break-overlay" />
          </div>
          <div className="photo-break-copy">
            <p className="photo-break-eyebrow">Nairobi · 2025</p>
            <h2 className="photo-break-title">
              Building things that<br />
              <em>actually work.</em>
            </h2>
            <p className="photo-break-text">
              Not just in demos. In production, under pressure, in regulated environments where it actually matters.
            </p>
            <div className="photo-break-actions">
              <Link href={PROFILE_LINKS.medium} target="_blank" rel="noopener noreferrer me" className="btn btn--gold">
                Essays on Medium
              </Link>
              <Link href={PROFILE_LINKS.email} className="btn btn--ghost">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <section className="page-section page-section--bordered page-section--compact">
          <Reveal>
            <div className="experience-teaser">
              <div>
                <div className="section-label" style={{ marginBottom: 8 }}>Full timeline</div>
                <div className="experience-title">Experience, education, skills & awards</div>
                <p className="experience-sub">
                  Kinage · KOVA · Amazon · TD Bank · Capital One · Wharton · Columbia · City Ventures.
                </p>
              </div>
              <Link href="/experience" className="btn btn--outline">View experience →</Link>
            </div>
          </Reveal>
        </section>

        <section id="contact" className="page-section page-section--bordered contact-section">
          <Reveal>
            <div className="grid-contact">
              <div>
                <h2 className="contact-title">
                  Start a conversation.
                </h2>
                <p className="contact-desc">
                  AI systems in regulated industries. Private markets across Africa.
                  Anything that does not fit a clean slide deck — those are my favourite conversations.
                </p>
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
      </div>
    </>
  )
}
