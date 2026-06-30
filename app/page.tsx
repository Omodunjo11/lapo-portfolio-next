"use client"
import Image from "next/image"
import Link from "next/link"
import Ticker from "@/components/Ticker"
import Reveal from "@/components/Reveal"
import CloudScene from "@/components/CloudScene"
import { featuredProjects } from "@/lib/projects"
import { essays } from "@/lib/writing"
import { CANONICAL_NAME, CONTACT_EMAIL, IDENTITY_LINE, PROFILE_LINKS } from "@/lib/site"

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

const metrics = [
  { metric: "$148M", label: "Retention opportunity scoped at Amazon" },
  { metric: "2B+", label: "Records modeled across AI systems" },
  { metric: "11", label: "AI products shipped end-to-end" },
  { metric: "10", label: "African markets · fintech & private capital" },
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
    label: "On diagnosis",
    title: "Look past where the pain shows up",
    body: "Lagos taught me to distrust the obvious explanation. When an AI system or investment keeps failing, the symptom is rarely the disease — I start by asking what the room is afraid to name.",
  },
  {
    label: "On informal finance",
    title: "Chaos on a spreadsheet is often sophistication in practice",
    body: "Ajo groups and market credit in West Africa look informal because banks cannot see them. They are often more adaptive than the products designed to replace them. Formalizing them badly does more harm than leaving them alone.",
  },
  {
    label: "On regulated AI",
    title: "Trust is the real bottleneck, not the model",
    body: "In banks and healthcare, deployment fails when institutions cannot act on a system's output. Governance, workflow ownership, and political cover matter as much as eval scores. I design for adoption under scrutiny, not demos.",
  },
  {
    label: "On building across borders",
    title: "Hold global practice and local reality at once",
    body: "Building from the continent inside Western institutions means refusing to pick one lens. The products that last translate global rigor into contexts where the cost of being wrong is personal, not abstract.",
  },
]

export default function Home() {
  return (
    <>
      <CloudScene />

      <div className="page-body">
        <div className="metrics-bar">
          {metrics.map(({ metric, label }) => (
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
            <div className="perspective-layout pad-page">
              <figure className="perspective-media">
                <Image
                  src="/images/photo-landscape.jpg"
                  alt="Tea hills outside Nairobi, Kenya"
                  width={1200}
                  height={900}
                  sizes="(max-width: 900px) 100vw, 44vw"
                  quality={88}
                  className="perspective-landscape-img"
                  priority={false}
                />
                <figcaption className="perspective-caption">Nairobi Highlands · Kenya</figcaption>
              </figure>

              <div className="perspective-stack">
                <p className="perspective-intro">
                  Four lenses I bring to product work — shaped by Lagos, Wharton, Kinage, KOVA, and years inside regulated institutions.
                </p>
                {perspectives.map((item) => (
                  <article key={item.label} className="perspective-item">
                    <p className="perspective-label">{item.label}</p>
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
