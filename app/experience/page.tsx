"use client"
import { useState } from "react"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import PageHero from "@/components/PageHero"
import { CONTACT_EMAIL, CONTACT_PHONE, KINAGE_TAGLINE, PROFILE_LINKS, ROLE_TITLE } from "@/lib/site"

const tabs = [
  { key: "experience", label: "Experience" },
  { key: "leadership", label: "Leadership" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
]

const jobs = [
  {
    company: "Kinage",
    location: "New York, NY",
    role: "Forward Deployed Product Manager, AI Strategy",
    period: "2025 – Present",
    tag: "Current",
    tagColor: "var(--terra)",
    summary: `${KINAGE_TAGLINE.charAt(0).toUpperCase()}${KINAGE_TAGLINE.slice(1)}: map live operator workflows, make model and infrastructure tradeoffs, ship compound AI architectures with engineers, and drive adoption from launch through operator trust.`,
    bullets: [
      "Raised internal movement completion 34% → 72% at multi-site hospital systems: embedded with clinical and ops teams to map intake-to-discharge handoff failures, co-designed agent-assisted workflows with engineers, then owned adoption post-launch by running weekly override reviews, iterating prompts and routing, and tightening escalation paths until usage held.",
      "Improved precision 22% → 50% and cut false positives 60% → 15% for a top 10 U.S. bank compliance team (~$600K annual savings): embedded 2+ days/week with fraud and risk analysts, translated live SOPs and policy boundaries into model requirements and eval cases, shipped compound agents with confidence gating and mandatory human review.",
      "Set the AI quality bar governing what went to production — built evaluation infrastructure with 300+ labeled examples across fraud, compliance, and financial exploitation risk categories; established confusion-matrix benchmarks, precision/recall thresholds, and online eval from analyst overrides as hard promotion gates.",
      "Architected nine-node agentic workflow (ingestion, extraction, enrichment, classification, anomaly detection, state management, confidence scoring, policy gating, human review) with Claude/OpenAI APIs and n8n; partnered with forward-deployed engineers on Python/FastAPI and Next.js delivery.",
      "Designed HITL control layer exposing confidence scores, source evidence, escalation paths, and override capture to investigators — made AI outputs explainable, auditable, and subordinate to compliance judgment, not black-box automation.",
      "Designed four-tier GTM intelligence system (Signal Capture → Enrichment → Intelligence → Execution); centralized ICP scoring in Claude-powered governance layer connected to Clay, HeyReach, and HubSpot; reduced GTM stack cost ~$215K annually.",
    ],
    stack: ["Claude API", "OpenAI API", "Python/FastAPI", "Next.js", "TypeScript", "Clay", "HeyReach", "HubSpot", "n8n", "Make", "GitHub Actions"],
  },
  {
    company: "KOVA",
    location: "New York, NY",
    role: "Co-Founder, AI Credit Infrastructure",
    period: "2025 – Present",
    tag: "Founder",
    tagColor: "var(--gold)",
    summary: "Building credit infrastructure for Nigeria's informal economy by converting unstructured WhatsApp payment conversations into structured credit signals.",
    bullets: [
      "Built and launched WhatsApp-first NLP system for behavioral credit infrastructure in Nigeria's informal economy, converting unstructured Ajo payment conversations into structured credit signals and deriving creditworthiness from behavioral consistency patterns.",
      "Reached 5K tester-phase customers in first two months by designing distribution strategy that embeds into existing WhatsApp workflows instead of requiring app downloads.",
      "Created upstream data layer from informal trust networks that banks and lenders can underwrite against.",
    ],
    stack: ["WhatsApp Cloud API", "PostgreSQL", "Prisma", "Paystack", "Claude API", "Node.js", "Express"],
  },
  {
    company: "Amazon",
    location: "New York, NY",
    role: "Senior Technical Product Manager Intern, Prime Subscription",
    period: "Summer 2025",
    tag: "1.17M+ MAU · $8.4B initiative",
    tagColor: "var(--muted)",
    summary: "Owned ML-driven personalization and lifecycle strategy for Prime subscription retention across 1.17M+ MAU.",
    bullets: [
      "Owned product strategy for $148M ARR Prime subscription initiative serving 1.17M+ monthly active users within broader $8.4B business, translating churn analysis into activation, personalization, and lifecycle engagement roadmap.",
      "Shipped ML-driven targeting framework for subscription personalization and retention, partnering with data science to define behavioral segments, measurement approach, and incremental lift analysis.",
      "Aligned 8 cross-functional stakeholder teams — Data Science, Engineering, Marketing, Finance, and Legal — on targeting framework scope, success metrics, and launch criteria; presented roadmap to VP-level leadership.",
    ],
    stack: ["AWS", "ML Targeting", "Behavioral Segmentation", "A/B Testing", "Cohort Analysis"],
  },
  {
    company: "TD Bank",
    location: "New York, NY",
    role: "Senior Product Manager, Enterprise Data Platform",
    period: "2023 – 2025",
    tag: "15 business units",
    tagColor: "var(--muted)",
    summary: "Owned core enterprise data platform strategy and ML operationalization across fraud, lending, compliance, and analytics workflows for 15 business units.",
    bullets: [
      "Managed 13-person cross-functional platform team across PMs, engineers, BSAs, and data modelers; set roadmap priorities, operating cadence, requirements standards, and delivery accountability across 15 business units.",
      "Built product strategy and investment case for $500M+ enterprise data platform by quantifying EBITDA impact of data reliability, compliance infrastructure, ML enablement, platform reuse, and capability sequencing; coordinated 170+ contributors.",
      "Led 0→1 Azure data platform build after diagnosing structural fragmentation across source systems, metadata, and model inputs; defined canonical data model, metadata ontology, and governance architecture as system-of-record contracts for fraud, lending, and compliance.",
      "Rebuilt executive trust after fraud-lending integration failure by tracing root cause to conflicting risk score definitions; introduced metadata registry, PII classification framework, and cross-BU governance working group.",
      "Resolved VP-level escalation on real-time infrastructure by showing proposed architecture created 3x cost increase for <5% outcome improvement; defended hybrid model preserving detection performance while containing cost.",
      "Operationalized fraud ML by standardizing feature pipelines and embedding model outputs into investigator workflows, eliminating manual triage across 5 systems, improving investigation throughput 29%, and reducing deployment time 30% across 40+ integrations.",
      "Established ML deployment approval gates with Legal, Compliance, and fraud investigation teams, creating reusable governance standards for model readiness, PII handling, and operational adoption.",
    ],
    stack: ["Azure Databricks", "Azure Synapse", "ML Operationalization", "Data Governance", "Fraud ML"],
    subroles: [
      { role: "Product Manager, Enterprise Data Platform", period: "2023", note: "Delivered foundational fraud pipelines, system migrations, PII standards, and governance frameworks enabling platform consolidation and promotion to senior role." },
    ],
  },
  {
    company: "Capital One",
    location: "New York, NY",
    role: "Principal Associate, Data as a Service Platform",
    period: "2022 – 2023",
    tag: "$270M API platform",
    tagColor: "var(--muted)",
    summary: "Owned product strategy for $270M enterprise API platform serving 200+ internal teams across consumer banking, commercial banking, and credit cards.",
    bullets: [
      "Drove 15% adoption growth and $80M+ measurable value creation by expanding platform capabilities, improving developer experience, and accelerating integrations across internal customers.",
      "Built usage instrumentation tracking API consumption, error rates, integration bottlenecks, and downstream business impact; used signal data to prioritize roadmap investments toward highest-leverage platform capabilities.",
    ],
    stack: ["API Platform", "Developer Experience", "Usage Analytics"],
  },
  {
    company: "Big Nerd Ranch",
    location: "Atlanta, GA",
    role: "Product Manager",
    period: "2020 – 2022",
    tag: "Earlier",
    tagColor: "var(--muted)",
    summary: "Owned delivery for $14M Fortune 10 mobile banking engagement generating $15M revenue within three months of launch.",
    bullets: [
      "Led ML and data product delivery for Fortune 10 and enterprise clients including Apple and Chick-fil-A: owned $14M engagement and coordinated cross-functional delivery teams across engineering, design, and QA.",
      "Managed client-facing delivery teams across distributed stakeholder groups: set timelines, acceptance criteria, and escalation paths for regulated and mobile product delivery.",
    ],
    stack: ["Mobile Banking", "Enterprise Delivery"],
  },
  {
    company: "UnoTelos (IBM)",
    location: "New York, NY",
    role: "Product Manager",
    period: "2017 – 2019",
    tag: "Earlier",
    tagColor: "var(--muted)",
    summary: "Led multi-team delivery coordination on enterprise systems for IBM clients.",
    bullets: [
      "Led multi-team delivery coordination on enterprise systems for IBM clients; introduced structured dependency tracking improving execution reliability across complex programs.",
    ],
    stack: ["Enterprise Systems", "IBM", "Delivery Coordination"],
  },
  {
    company: "Santander Bank",
    location: "Bradford, UK",
    role: "Product Manager (promoted from QA Engineer)",
    period: "2013 – 2017",
    tag: "Earlier",
    tagColor: "var(--muted)",
    summary: "Transitioned from QA to product ownership on regulated banking systems within 12 months; promoted to project management within 2 years.",
    bullets: [
      "Promoted from QA to product ownership on regulated banking systems within 12 months; led project management on high-availability reporting and analytics platforms.",
      "Built reporting and analytics systems supporting business decision-making on high-availability platform.",
    ],
    stack: ["Regulated Banking", "QA", "Analytics", "Product Management"],
  },
  {
    company: "Chevron",
    location: "Lagos, Nigeria",
    role: "Process Engineer & Financial Analyst",
    period: "2018 – 2020",
    tag: "Earlier",
    tagColor: "var(--muted)",
    summary: "Built data-driven process models improving refinery throughput 8–10%; supported $50M+ capital investment decisions through scenario modeling and cost-benefit analysis.",
    bullets: [
      "Built data-driven process models improving refinery throughput 8–10%; supported $50M+ capital investment decisions through scenario modeling, cost-benefit analysis, and structured system analysis on high-stakes infrastructure projects.",
    ],
    stack: ["Process Modeling", "Financial Analysis", "Capital Decisions"],
  },
]

const leadership = [
  {
    org: "Wharton Graduate Association",
    role: "President",
    period: "2024 – May 2026",
    note: "Lead student government with $6M annual budget across 20+ teams serving 1,700+ MBA students; primary liaison to Wharton administration on policy and programming.",
  },
  {
    org: "College Together, Goldman Sachs Community Builder Fellow",
    role: "Governance Strategy Lead",
    period: "2025",
    note: "Designed board governance framework (four-committee architecture, operating model, three-phase roadmap) for Philadelphia nonprofit addressing philanthropic dependency concentration and key-person risk.",
  },
]

const education = [
  { year: "2024 – May 2026", school: "The Wharton School, University of Pennsylvania", location: "Philadelphia, PA", degree: "MBA, Finance & Strategic Management", note: "Trailblazer Fellowship (50% merit) · President, Wharton Graduate Association ($6M P&L, 1,700+ students) · VP, Wharton Tech Club Conferences" },
  { year: "2021 – 2023", school: "Columbia University", location: "New York, NY", degree: "M.S., Chemical Engineering", note: "Full merit scholarship, 21 of 5,000+ applicants · GPA 3.8 · Peer-reviewed ACS Applied Energy Materials publication" },
  { year: "2015 – 2020", school: "University of Bradford", location: "Bradford, UK", degree: "B.Eng., Chemical Engineering", note: "Bradford Dean Award, full-ride · GPA 3.7" },
]

const skillGroups = [
  {
    title: "AI/ML Systems",
    proofLink: { href: "/projects/llm-reliability", label: "LLM Reliability case study →" },
    items: ["AI evaluation infrastructure", "LLM classification", "Prompt engineering", "Structured extraction", "Semantic scoring", "Dataset construction", "Error taxonomy", "Confusion matrix analysis", "Confidence calibration", "False-positive reduction", "Human-in-the-loop review", "ML operationalization"],
  },
  {
    title: "Agentic Workflows & Enterprise Platforms",
    proofLink: { href: "/projects/gtm-intelligence-platform", label: "GTM Intelligence Platform →" },
    items: ["Claude API logic layers", "Agentic workflow design", "Tool orchestration", "Transcript intelligence", "CRM intelligence pipelines", "System-of-record design", "Workflow state management", "API platforms", "Enterprise data platforms"],
  },
  {
    title: "Data Governance & Compliance",
    proofLink: { href: "/projects/regulatory-compliance-cockpit", label: "Regulatory Compliance Cockpit →" },
    items: ["Metadata registries", "Canonical data models", "Feature pipelines", "PII classification", "Multi-source ingestion", "Fuzzy matching", "Duplicate detection", "Data governance", "Compliance workflows"],
  },
  {
    title: "Product & Business Strategy",
    proofLink: { href: "/projects/kova-bot", label: "Kova credit infrastructure →" },
    items: ["0→1 products", "Agentic workflow roadmaps", "Forward-deployed discovery", "Enterprise design partners", "Roadmap sequencing", "Architecture tradeoff analysis", "Cost-to-serve reduction", "Pricing/margin analysis", "Platform operating models", "GTM systems architecture", "EBITDA quantification"],
  },
  {
    title: "Tools",
    proofLink: { href: "/projects", label: "All builds →" },
    items: ["Python", "SQL", "FastAPI", "Next.js", "Azure Databricks", "Azure Synapse", "Snowflake", "AWS", "OpenAI API", "Claude API", "GitHub Actions", "HubSpot", "Clay", "HeyReach", "Make", "n8n"],
  },
  {
    title: "Certifications & Languages",
    items: ["CSM", "CSPO", "SAFe Agilist", "English (Native)", "Yoruba (Native)", "French (Basic)"],
  },
]

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState("experience")
  const [showEarlier, setShowEarlier] = useState(false)

  const earlierStartIndex = jobs.findIndex((j) => j.tag === "Earlier")
  const primaryJobs = earlierStartIndex === -1 ? jobs : jobs.slice(0, earlierStartIndex)
  const earlierJobs = earlierStartIndex === -1 ? [] : jobs.slice(earlierStartIndex)

  const renderJob = (job: (typeof jobs)[number], idx: number) => (
    <Reveal key={job.company + job.role} delay={idx * 0.04}>
      <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 48, marginBottom: 48 }}>
        <div className="grid-exp-row" style={{ marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 18, fontWeight: 800 }}>{job.company}</div>
              <span style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase", color: job.tagColor, border: `1px solid ${job.tagColor}30`, padding: "2px 8px", borderRadius: 2 }}>{job.tag}</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--terra)", fontWeight: 600, marginBottom: 4 }}>{job.role}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>{job.location} · {job.period}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "flex-end", maxWidth: 300 }}>
            {job.stack.map(s => (
              <span key={s} style={{ fontSize: 8, background: "rgba(201,168,76,.12)", color: "#7a6020", padding: "3px 8px", borderRadius: 2 }}>{s}</span>
            ))}
          </div>
        </div>

        <p style={{ fontSize: 13, color: "var(--mid)", lineHeight: 1.8, marginBottom: 20, fontStyle: "italic", borderLeft: "2px solid var(--border)", paddingLeft: 16 }}>{job.summary}</p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
          {job.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.8, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ color: "var(--terra)", fontSize: 8, marginTop: 5, flexShrink: 0 }}>▸</span>
              {b}
            </li>
          ))}
        </ul>

        {"subroles" in job && job.subroles && (
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            {job.subroles.map((sr) => (
              <div key={sr.role} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: "var(--terra)", fontWeight: 600, whiteSpace: "nowrap" }}>{sr.role} · {sr.period}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>{sr.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  )

  return (
    <>
      <PageHero size="compact" eyebrow={`FDE Product Manager · ${ROLE_TITLE}`} title={<>Onaolapo <em>Odunjo</em></>}>
        <p className="page-hero-meta">Onaolapo Michael (Lapo) Odunjo — Lapo is short for Onaolapo</p>
        <p className="page-hero-meta">New York, NY · {CONTACT_EMAIL} · {CONTACT_PHONE}</p>
        <div className="page-hero-toolbar">
          <div />
          <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="btn btn--terra">
            ↓ Download Resume
          </Link>
        </div>
      </PageHero>

      {/* Tabs */}
      <div className="exp-tabs" role="tablist" aria-label="Experience sections" style={{ borderBottom: "1px solid var(--border)", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700,
              letterSpacing: ".12em", textTransform: "uppercase",
              padding: "20px 24px", background: "transparent",
              color: activeTab === tab.key ? "var(--terra)" : "var(--muted)",
              borderBottom: activeTab === tab.key ? "2px solid var(--terra)" : "2px solid transparent",
              cursor: "pointer", transition: "color .2s, border-color .2s",
              marginBottom: -1,
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--terra)")}
            onMouseLeave={e => (e.currentTarget.style.color = activeTab === tab.key ? "var(--terra)" : "var(--muted)")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding: "0 0 80px" }}>

        {/* ── EXPERIENCE ── */}
        {activeTab === "experience" && (
          <div style={{ padding: "clamp(24px,6vw,48px) clamp(16px,6vw,48px) 0" }}>
            {primaryJobs.map((job, idx) => renderJob(job, idx))}
            {earlierJobs.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={() => setShowEarlier((open) => !open)}
                  style={{
                    fontFamily: "var(--font-syne),sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: ".1em",
                    textTransform: "uppercase",
                    border: "1px solid var(--border)",
                    background: "var(--bg2)",
                    color: "var(--mid)",
                    padding: "12px 20px",
                    borderRadius: 2,
                    cursor: "pointer",
                    marginBottom: showEarlier ? 32 : 0,
                  }}
                >
                  {showEarlier ? "Hide earlier career ↑" : `Show earlier career (${earlierJobs.length} roles) ↓`}
                </button>
                {showEarlier && earlierJobs.map((job, idx) => renderJob(job, idx))}
              </>
            )}
          </div>
        )}

        {/* ── LEADERSHIP ── */}
        {activeTab === "leadership" && (
          <div style={{ padding: "clamp(24px,6vw,48px) clamp(16px,6vw,48px) 0" }}>
            <div className="grid-3col">
              {leadership.map((item, i) => (
                <Reveal key={item.org} delay={i * 0.08}>
                  <div className="interactive-surface interactive-surface--accent-top" style={{ background: "var(--paper)", padding: "32px 28px", height: "100%" }}>
                    <div style={{ fontSize: 8, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 10 }}>{item.period}</div>
                    <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 15, fontWeight: 800, marginBottom: 6, lineHeight: 1.25 }}>{item.org}</div>
                    <div style={{ fontSize: 11, color: "var(--terra)", marginBottom: 14 }}>{item.role}</div>
                    <p style={{ fontSize: 12, color: "var(--mid)", lineHeight: 1.75 }}>{item.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Awards in leadership tab */}
            <div style={{ marginTop: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 32 }}>
                <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".2em", color: "var(--terra)" }}>◆</span>
                <span style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase" }}>Awards & Honors</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>
              <div className="grid-2col">
                {[
                  { name: "Trailblazer Fellowship, 50% Merit", inst: "The Wharton School, UPenn" },
                  { name: "Full Merit Scholarship", inst: "Columbia University, 21 of 5,000+ applicants" },
                  { name: "Bradford Dean Award, Full-Ride", inst: "University of Bradford" },
                  { name: "Manhattan Prep Scholarship", inst: "Merit, quantitative achievement" },
                  { name: "President, Wharton Graduate Association", inst: "Elected · $6M budget · 1,700+ students" },
                  { name: "Peer-Reviewed Publication", inst: "ACS Applied Energy Materials, 2024" },
                ].map((a, i) => (
                  <Reveal key={a.name} delay={(i % 2) * 0.08}>
                    <div className="interactive-surface interactive-surface--shift" style={{ background: "var(--paper)", padding: "22px 26px", display: "flex", gap: 12, alignItems: "flex-start", transition: "background .2s, transform .2s" }}>
                      <span style={{ color: "var(--terra)", flexShrink: 0 }}>◆</span>
                      <div>
                        <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 12, fontWeight: 700, marginBottom: 2 }}>{a.name}</div>
                        <div style={{ fontSize: 10, color: "var(--muted)", fontStyle: "italic" }}>{a.inst}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EDUCATION ── */}
        {activeTab === "education" && (
          <div style={{ padding: "clamp(24px,6vw,48px) clamp(16px,6vw,48px) 0" }}>
            <div className="grid-3col" style={{ marginBottom: 56 }}>
              {education.map((edu, i) => (
                <Reveal key={edu.school} delay={i * 0.1}>
                  <div className="interactive-surface interactive-surface--accent-top" style={{ background: "var(--paper)", padding: "36px 28px" }}>
                    <div style={{ fontSize: 9, letterSpacing: ".12em", color: "var(--terra)", marginBottom: 12 }}>{edu.year}</div>
                    <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 21, fontWeight: 700, lineHeight: 1.15, marginBottom: 6 }}>{edu.school}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>{edu.location}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 16 }}>{edu.degree}</div>
                    <div style={{ fontSize: 11, color: "var(--mid)", borderTop: "1px solid var(--border)", paddingTop: 14, lineHeight: 1.7 }}>{edu.note}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* ACS publication */}
            <Reveal>
              <div className="grid-pub interactive-surface" style={{ border: "1px solid var(--border)", padding: "36px 44px", borderRadius: 2 }}>
                <div>
                  <div style={{ fontSize: 8, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 10 }}>ACS Applied Energy Materials · American Chemical Society · 2024</div>
                  <h3 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Seawater Electrolysis for Hydrogen Production</h3>
                  <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--mid)" }}>Peer-reviewed research on AI-assisted electrochemical optimization for hydrogen production from seawater. At the intersection of my engineering and ML backgrounds.</p>
                </div>
                <Link href="https://pubs.acs.org/doi/abs/10.1021/acsaem.4c00839" target="_blank" rel="noopener"
                  style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", border: "1px solid var(--border)", padding: "12px 22px", borderRadius: 2, whiteSpace: "nowrap", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "inherit"; e.currentTarget.style.borderColor = "var(--border)" }}
                >Read Paper →</Link>
              </div>
            </Reveal>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeTab === "skills" && (
          <div style={{ padding: "clamp(24px,6vw,48px) clamp(16px,6vw,48px) 0" }}>
            <div className="grid-3col">
              {skillGroups.map((sg, i) => (
                <Reveal key={sg.title} delay={i * 0.06}>
                  <div style={{ background: "var(--paper)", padding: "28px 26px" }}>
                    <div style={{ fontFamily: "var(--font-syne),sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 16 }}>{sg.title}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: sg.proofLink ? 14 : 0 }}>
                      {sg.items.map(item => (
                        <span key={item}
                          style={{ fontSize: 10, color: "var(--ink)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 2, transition: "all .2s", cursor: "default" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--border)" }}
                        >{item}</span>
                      ))}
                    </div>
                    {sg.proofLink && (
                      <Link href={sg.proofLink.href} style={{ fontSize: 10, color: "var(--terra)", letterSpacing: ".06em" }}>
                        {sg.proofLink.label}
                      </Link>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div style={{ marginTop: 1, background: "var(--bg2)", padding: "36px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, borderTop: "1px solid var(--border)" }}>
                <div>
                  <div style={{ fontSize: 8, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 8 }}>Full CV</div>
                  <div style={{ fontFamily: "var(--font-playfair),serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Download the complete resume</div>
                  <p style={{ fontSize: 11, color: "var(--muted)" }}>AI systems, private markets, leadership, publications, consolidated. Last updated 2026.</p>
                </div>
                <Link href={PROFILE_LINKS.resume} target="_blank" rel="noopener" className="btn btn--terra" style={{ flexShrink: 0 }}>
                  ↓ Download PDF
                </Link>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </>
  )
}
