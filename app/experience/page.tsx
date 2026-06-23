"use client"
import { useState } from "react"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import { ROLE_TITLE } from "@/lib/site"

const tabs = [
  { key: "experience", label: "Experience" },
  { key: "leadership", label: "Leadership" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
]

const jobs = [
  {
    company: "Kinage",
    location: "Philadelphia, PA",
    role: "Forward Deployed Product Manager",
    period: "2025 – Present",
    tag: "Current",
    tagColor: "var(--terra)",
    summary: "Lead production AI systems, enterprise deployment, evaluation infrastructure, and GTM automation for regulated financial workflows, including top 10 U.S. bank design partner workflows.",
    bullets: [
      "Built production agentic workflow embedded inside top 10 U.S. banks: nine-node architecture across ingestion, extraction, enrichment, classification, anomaly detection, state management, confidence scoring, policy gating, and human review using Claude API, OpenAI API, and n8n orchestration.",
      "Designed AI escalation triage copilot for enterprise support workflows, combining context retrieval, issue classification, recommendation generation, confidence-based routing, and human-in-the-loop review to reduce time-to-resolution and improve decision consistency.",
      "Defined product strategy for high-trust autonomous agent systems, translating ambiguous regulated workflows into system architecture, acceptance criteria, V1/V2/V3 roadmap sequencing, and human-in-the-loop operating models; produced ~$600K in estimated annual client savings.",
      "Improved precision 22% → 50% and reduced false positives 60% → 15% through 300+ labeled examples, confusion matrix analysis, and confidence calibration.",
      "Designed four-tier GTM intelligence system (Signal Capture → Enrichment → Intelligence → Execution); centralized ICP scoring in Claude-powered governance layer connected to Clay, HeyReach, and HubSpot; reduced GTM stack cost ~$215K annually.",
      "Embedded two days/week with top 10 U.S. bank's risk and compliance team as enterprise design partner, translating live analyst workflows, edge cases, and decision criteria into model requirements, eval cases, and product acceptance thresholds.",
      "Hired and managed 14-person contracted team across engineering, data ops, and evaluation; defined all specs and acceptance criteria; shipped Python/FastAPI backend and Next.js frontend from 0 to production.",
    ],
    stack: ["Claude API", "Python/FastAPI", "Next.js", "n8n", "Make", "HubSpot", "GitHub Actions"],
  },
  {
    company: "KOVA",
    location: "Philadelphia, PA",
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
    stack: ["WhatsApp API", "NLP", "Python", "Credit Infrastructure"],
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
    stack: ["ML Targeting", "Behavioral Segmentation", "A/B Testing", "Cohort Analysis"],
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
      "Translated enterprise requirements into technical specifications, managed stakeholder expectations across client organization, coordinated cross-functional delivery.",
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
      "Transitioned from QA to product ownership on regulated banking systems within 12 months; promoted to project management within 2 years.",
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
    org: "Africa AI Leaders Fellowship (AAILF)",
    role: "Co-Founding CEO",
    period: "2024 – Present",
    note: "Ford Foundation and Mastercard-backed initiative building AI governance capacity across African policymaking ecosystem.",
  },
  {
    org: "Wharton Graduate Association",
    role: "President",
    period: "2024 – Present",
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
  { year: "2024 – 2026", school: "The Wharton School, University of Pennsylvania", location: "Philadelphia, PA", degree: "MBA, Finance & Strategic Management", note: "Trailblazer Fellowship (50% merit) · President, Wharton Graduate Association ($6M P&L, 1,700+ students) · VP, Wharton Tech Club Conferences · Co-CEO, Africa AI Leaders Fellowship" },
  { year: "2021 – 2023", school: "Columbia University", location: "New York, NY", degree: "M.S., Chemical Engineering", note: "Full merit scholarship, 21 of 5,000+ applicants · GPA 3.8 · Peer-reviewed ACS Applied Energy Materials publication" },
  { year: "2015 – 2020", school: "University of Bradford", location: "Bradford, UK", degree: "B.Eng., Chemical Engineering", note: "Bradford Dean Award, full-ride · GPA 3.7" },
]

const skillGroups = [
  {
    title: "AI/ML Systems",
    items: ["AI evaluation infrastructure", "LLM classification", "Prompt engineering", "Structured extraction", "Semantic scoring", "Dataset construction", "Error taxonomy", "Confusion matrix analysis", "Confidence calibration", "False-positive reduction", "Human-in-the-loop review", "ML operationalization"],
  },
  {
    title: "Agentic Workflows & Enterprise Platforms",
    items: ["Claude API logic layers", "Agentic workflow design", "Tool orchestration", "Transcript intelligence", "CRM intelligence pipelines", "System-of-record design", "Workflow state management", "API platforms", "Enterprise data platforms"],
  },
  {
    title: "Data Governance & Compliance",
    items: ["Metadata registries", "Canonical data models", "Feature pipelines", "PII classification", "Multi-source ingestion", "Fuzzy matching", "Duplicate detection", "Data governance", "Compliance workflows"],
  },
  {
    title: "Product & Business Strategy",
    items: ["0→1 products", "Agentic workflow roadmaps", "Forward-deployed discovery", "Enterprise design partners", "Roadmap sequencing", "Architecture tradeoff analysis", "Cost-to-serve reduction", "GTM systems architecture", "EBITDA quantification"],
  },
  {
    title: "Tools",
    items: ["Python", "SQL", "FastAPI", "Next.js", "Azure Databricks", "Azure Synapse", "Snowflake", "AWS", "OpenAI API", "Claude API", "GitHub Actions", "HubSpot", "Make", "n8n"],
  },
  {
    title: "Certifications & Languages",
    items: ["CSM", "CSPO", "SAFe Agilist", "English (Native)", "Yoruba (Native)", "French (Basic)"],
  },
]

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState("experience")

  return (
    <>
      {/* Hero */}
      <div style={{ padding: "clamp(40px,8vh,64px) clamp(16px,6vw,48px) 40px", borderBottom: "1px solid var(--border)" }}>
        <p style={{ fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "var(--terra)", marginBottom: 18, display: "flex", alignItems: "center", gap: 10, animation: "fadeUp .7s .3s ease both" }}>
          <span style={{ width: 20, height: 1, background: "var(--terra)", display: "inline-block" }} />
          FDE Product Manager · {ROLE_TITLE}
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, lineHeight: .95, letterSpacing: "-.03em", animation: "fadeUp .8s .45s ease both" }}>
              Onaolapo <em style={{ color: "var(--terra)", fontStyle: "italic" }}>Odunjo</em>
            </h1>
            <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, animation: "fadeUp .6s .55s ease both" }}>
              Also known as Lapo Odunjo and Michael Odunjo
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 12, animation: "fadeUp .6s .6s ease both" }}>
              New York, NY · odunjoonaolapo@gmail.com · +1-646-421-3781
            </p>
          </div>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--terra)", color: "var(--paper)", padding: "13px 26px", borderRadius: 2, transition: "background .25s, transform .2s", animation: "fadeUp .6s .7s ease both", whiteSpace: "nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(-2px)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.transform = "translateY(0)" }}
          >
            ↓ Download Resume
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="exp-tabs" style={{ borderBottom: "1px solid var(--border)", display: "flex", gap: 0, overflowX: "auto" }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
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
            {jobs.map((job, idx) => (
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

                  {job.subroles && (
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                      {job.subroles.map(sr => (
                        <div key={sr.role} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                          <div style={{ fontSize: 11, color: "var(--terra)", fontWeight: 600, whiteSpace: "nowrap" }}>{sr.role} · {sr.period}</div>
                          <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.7 }}>{sr.note}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* ── LEADERSHIP ── */}
        {activeTab === "leadership" && (
          <div style={{ padding: "clamp(24px,6vw,48px) clamp(16px,6vw,48px) 0" }}>
            <div className="grid-3col">
              {leadership.map((item, i) => (
                <Reveal key={item.org} delay={i * 0.08}>
                  <div style={{ background: "var(--paper)", padding: "32px 28px", height: "100%", transition: "background .25s", borderTop: "2px solid transparent" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                  >
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
                    <div style={{ background: "var(--paper)", padding: "22px 26px", display: "flex", gap: 12, alignItems: "flex-start", transition: "background .2s, transform .2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.transform = "translateX(4px)" }}
                      onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.transform = "translateX(0)" }}
                    >
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--border)", marginBottom: 56 }}>
              {education.map((edu, i) => (
                <Reveal key={edu.school} delay={i * 0.1}>
                  <div style={{ background: "var(--paper)", padding: "36px 28px", transition: "background .25s", borderTop: "2px solid transparent" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,98,45,.03)"; e.currentTarget.style.borderTopColor = "var(--terra)" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--paper)"; e.currentTarget.style.borderTopColor = "transparent" }}
                  >
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
              <div className="grid-pub" style={{ border: "1px solid var(--border)", padding: "36px 44px", borderRadius: 2, transition: "background .2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,98,45,.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
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
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {sg.items.map(item => (
                        <span key={item}
                          style={{ fontSize: 10, color: "var(--ink)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 2, transition: "all .2s", cursor: "none" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.color = "var(--paper)"; e.currentTarget.style.borderColor = "var(--ink)" }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--border)" }}
                        >{item}</span>
                      ))}
                    </div>
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
                <Link href="/resume.pdf" target="_blank" rel="noopener"
                  style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: "var(--font-syne),sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", background: "var(--terra)", color: "var(--paper)", padding: "13px 26px", borderRadius: 2, whiteSpace: "nowrap", flexShrink: 0, transition: "background .25s, transform .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--ink)"; e.currentTarget.style.transform = "translateY(-2px)" }}
                  onMouseLeave={e => { e.currentTarget.style.background = "var(--terra)"; e.currentTarget.style.transform = "translateY(0)" }}
                >↓ Download PDF</Link>
              </div>
            </Reveal>
          </div>
        )}
      </div>
    </>
  )
}
