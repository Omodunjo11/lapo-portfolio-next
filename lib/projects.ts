export type Objective = { title: string; description: string }
export type MethodItem = { title: string; description: string }
export type Section = { title: string; body: string }

export type Project = {
  slug: string
  name: string
  role: string
  year: string
  lang: string
  category: string[]
  tagline: string
  overview: string
  objectives: Objective[]
  methodology: MethodItem[]
  sections?: Section[]
  problem: string
  what: string
  pmAngle: string
  outcome: string
  features: string[]
  stack: string[]
  github: string
  live?: string
  featured?: boolean
  status: "live" | "building" | "built"
}

export const projects: Project[] = [
  {
    slug: "kinage-gtm",
    name: "Kinage GTM",
    role: "GTM Engineering · CRM Enrichment & ICP Pipeline",
    year: "2026",
    lang: "TypeScript",
    category: ["fullstack", "automation"],
    tagline: "The backend GTM layer that keeps HubSpot honest — webhook-triggered Clay enrichment, Claude ICP classification, and a live CRM activity feed built for a team that runs on signal.",
    overview:
      "A CRM is only as good as its data, and most CRM data is stale. Contacts get created from a form fill or an import and then sit untouched while the company evolves, the role changes, and the ICP fit shifts. Kinage GTM is the enrichment and classification layer that fixes this — triggering Clay enrichment on every new contact event, running Claude AI ICP classification on the enriched record, and surfacing the results in a live CRM activity feed. It's not a sales tool; it's the infrastructure that makes the sales tool accurate.",
    objectives: [
      {
        title: "Webhook-Triggered Enrichment",
        description: "Build a webhook receiver that fires a Clay enrichment job on each new HubSpot contact creation or update event, ensuring every record is enriched automatically without manual intervention.",
      },
      {
        title: "Claude ICP Classification",
        description: "Run Claude AI classification on each enriched contact record to assign an ICP score based on company stage, role, industry, and signal source overlap — stored back as a HubSpot property.",
      },
      {
        title: "HAL Signal Source Matching",
        description: "Cross-reference HubSpot contacts against HAL signal sources to identify which contacts are already appearing in the signal feed, surfacing the overlap as a high-priority contact segment.",
      },
      {
        title: "CRM Activity Feed",
        description: "Build a real-time activity log that captures every enrichment, ICP assignment, new contact, and record update as a timestamped event — giving the team a live view of CRM state without opening HubSpot.",
      },
    ],
    methodology: [
      {
        title: "Webhook Architecture",
        description: "Designed the HubSpot webhook handler with idempotency keys and deduplication logic so the same contact event never triggers duplicate enrichment runs or conflicting ICP assignments.",
      },
      {
        title: "Enrichment Schema Design",
        description: "Defined the Clay enrichment output schema before building the integration — specifying exactly which fields map back to HubSpot properties and in what format, to avoid data model drift.",
      },
      {
        title: "ICP Classification Prompt Engineering",
        description: "Built and iterated the Claude ICP classification prompt against a set of known-good and known-bad contacts before enabling it in production, calibrating confidence thresholds to the team's definition of fit.",
      },
      {
        title: "Activity Feed Design",
        description: "Modelled the activity feed event schema to support filtering by event type (enriched, ICP assigned, new contact, updated) without requiring separate API calls per filter — one feed, all event types.",
      },
    ],
    sections: [
      {
        title: "Why Webhook-First Matters",
        body: "Batch enrichment jobs run on a schedule and are always stale by the time they finish. Webhook-first enrichment means every new contact is enriched within seconds of creation, before anyone has a chance to act on an incomplete record. The tradeoff is complexity in the deduplication layer — HubSpot webhooks are not guaranteed-exactly-once, so the enrichment handler has to be idempotent. That's the engineering work that makes the product promise ('every contact is enriched') actually true.",
      },
      {
        title: "The ICP Classification Loop",
        body: "ICP classification isn't a one-time operation. As a contact's HubSpot record gets updated — role change, company funding event, new LinkedIn data from Clay — the classification should be re-evaluated. Kinage GTM treats ICP assignment as an event that can be triggered by any enrichment update, not just initial contact creation. The CRM activity feed captures every re-classification, so the team can see when a contact moved from 'not ICP' to 'ICP fit' and act on the change rather than missing it in a static list.",
      },
    ],
    problem:
      "HubSpot contacts were being created from imports and form fills and then sitting with stale, incomplete data. No enrichment was running automatically, ICP fit was being assessed manually, and the team had no live view of what the CRM was doing.",
    what:
      "A TypeScript GTM backend that triggers Clay enrichment on each HubSpot webhook event, runs Claude AI ICP classification on the enriched record, cross-references contacts against HAL signal sources, and surfaces everything in a live CRM activity feed. 37 contacts enriched via webhook today; 38 ICP-classified out of 500 total.",
    pmAngle:
      "The key product decision was making enrichment event-driven rather than scheduled. Scheduled jobs produce a CRM that's accurate once a week. Webhook-triggered enrichment produces a CRM that's accurate within seconds. That architectural choice has a real cost in deduplication complexity, and it was worth making.",
    outcome:
      "Automatic enrichment and ICP classification on every new HubSpot contact, with a live activity feed the team can trust to reflect current CRM state.",
    features: [
      "Webhook-triggered Clay enrichment on every HubSpot contact event",
      "Claude AI ICP classification on enriched contact records",
      "HAL signal source matching against HubSpot contact list",
      "Live CRM activity feed: enriched, ICP assigned, new contacts, updated",
      "Deduplication and idempotency handling for webhook delivery",
      "Deployed and live on Vercel",
    ],
    stack: ["TypeScript", "Next.js", "Clay", "HubSpot API", "Claude API", "Vercel"],
    github: "https://github.com/Omodunjo11/kinage-gtm",
    live: "https://kinage-gtm.vercel.app",
    featured: true,
    status: "live" as const,
  },
  {
    slug: "kinage-intelligence",
    name: "Kinage Intelligence",
    role: "AI Product · Signal Intelligence & GTM Platform",
    year: "2026",
    lang: "TypeScript",
    category: ["ai", "fullstack"],
    tagline: "Full-stack intelligence platform — signal feed, contact pipeline, and live CRM activity in one interface, powered by HAL signal sources, Clay enrichment, and Claude AI.",
    overview:
      "Kinage Intelligence started as a signal classification dashboard and grew into a full GTM intelligence platform at kinagehal.com. The core problem didn't change — raw signal noise had to become structured, actionable intelligence — but the scope expanded as it became clear that surfacing signals wasn't enough. You also need to know who to act on, how enriched their data is, whether they fit your ICP, and whether your CRM reflects any of that. The platform now covers all three layers: a real-time signal feed, a contact pipeline that syncs HubSpot with Clay enrichment and Claude AI classification, and a live CRM activity feed showing every enrichment, ICP assignment, and contact update as it happens.",
    objectives: [
      {
        title: "Signal Ingestion Pipeline",
        description: "Build a multi-source ingestion system that pulls from HAL signal sources, news APIs, and RSS feeds into a unified data model, classifying and ranking signals before they surface in the feed.",
      },
      {
        title: "Contact Pipeline with ICP Classification",
        description: "Build a contact pipeline that syncs HubSpot contacts (500+), cross-references them against HAL signal sources (152), and runs Claude AI classification to identify which contacts fit the ICP.",
      },
      {
        title: "Clay Enrichment via Webhook",
        description: "Integrate Clay to enrich HubSpot contacts on a webhook-triggered basis — each enrichment event fires automatically and writes structured data back to the CRM without manual intervention.",
      },
      {
        title: "Live CRM Activity Feed",
        description: "Build a real-time activity view that shows every HubSpot update — enrichments, ICP assignments, new contacts, and record modifications — so the team has a live pulse on CRM state.",
      },
    ],
    methodology: [
      {
        title: "Signal Taxonomy First",
        description: "Defined what counts as a signal, how it should be ranked, and what 'relevant' means to an analyst before writing any ingestion code. The data model came from that work, not the other way around.",
      },
      {
        title: "Contact Pipeline Architecture",
        description: "Designed the schema for how a HAL signal source maps to a HubSpot contact record before building the sync. Deduplication, LinkedIn matching, and ICP scoring were modelled first.",
      },
      {
        title: "Clay + Claude Enrichment Design",
        description: "Structured Clay enrichment as a webhook-triggered event that fires on each new contact import, with Claude AI running ICP classification on the enriched record and writing the result back to HubSpot.",
      },
      {
        title: "Deployment to Production Domain",
        description: "Shipped from Vercel preview to a custom production domain (kinagehal.com), with environment-controlled source configuration so signal sources and CRM settings can be toggled without code changes.",
      },
    ],
    sections: [
      {
        title: "The Three-Layer Platform Architecture",
        body: "Kinage Intelligence is now three connected layers in one interface. The Signal Feed layer classifies and ranks market signals from 152+ HAL sources into a filterable, trust-weighted feed. The Contact Pipeline layer maps those signals to real contacts in HubSpot, enriching each via Clay and scoring them against the ICP using Claude. The CRM Activity layer surfaces every downstream event — enrichments, ICP assignments, contact updates — as they happen via webhook. Each layer can be used independently, but the real value is the chain: a signal fires, a contact is enriched, an ICP score is assigned, and the activity log captures the full trail.",
      },
      {
        title: "ICP Classification Design",
        body: "ICP classification runs as part of the Clay enrichment flow. After Clay writes enriched company and role data to a contact record, Claude evaluates the contact against the Kinage ICP definition — company stage, role seniority, industry vertical, and signal source overlap — and assigns a classification. Of 500 HubSpot contacts, 38 have been ICP-classified so far (8% enrichment rate), with 152 identified via HAL signal sources. The classification is stored as a HubSpot property and drives downstream filtering in both the Contact Pipeline and CRM Activity views.",
      },
    ],
    problem:
      "Surfacing market signals wasn't enough — the team also needed to know which contacts to act on, whether their CRM data was accurate, and whether each contact fit the ICP. Three disconnected tools were handling three parts of one workflow.",
    what:
      "A full-stack intelligence platform at kinagehal.com with three integrated views: a real-time signal feed ranked by relevance and source trust, a contact pipeline that syncs 500+ HubSpot contacts against HAL signal sources with Clay enrichment and Claude AI ICP classification, and a live CRM activity feed showing enrichments, ICP assignments, and record updates via webhook.",
    pmAngle:
      "The platform expanded from a signal dashboard because I traced the full analyst workflow: signals surface a company, but the next question is always 'who do we contact and do they fit our ICP?' I designed the contact pipeline and CRM activity layer to answer that question without leaving the interface.",
    outcome:
      "A single platform covering the full intelligence-to-outreach loop — from raw signal classification to enriched, ICP-scored contacts with a live CRM activity trail.",
    features: [
      "Real-time signal feed from 152+ HAL signal sources",
      "Contact pipeline: 500 HubSpot contacts synced and searchable",
      "Clay enrichment via webhook — 37 contacts enriched today",
      "Claude AI ICP classification on enriched contact records",
      "Live CRM activity feed: enrichments, ICP assignments, new contacts",
      "Deployed on custom production domain (kinagehal.com)",
    ],
    stack: ["Next.js", "TypeScript", "HubSpot API", "Clay", "Claude API", "Vercel"],
    github: "https://github.com/Omodunjo11/kinage-intelligence",
    live: "https://kinagehal.com",
    featured: true,
    status: "live" as const,
  },
  {
    slug: "kova-bot",
    name: "Kova Bot",
    role: "AI Product · Behavioral Trust Infrastructure",
    year: "2026",
    lang: "JavaScript",
    category: ["ai", "fullstack"],
    tagline: "Behavioral trust infrastructure for AI-assisted decision-making, role-aware constraint architecture with full audit trail for accountability.",
    overview:
      "Most enterprise AI deployments fail because they treat all users the same. A founder needs strategic framing and executive brevity. An analyst needs precision and sourcing. A new user needs guardrails and guided onboarding. A single generic system prompt collapses these needs into mediocrity, and mediocrity in AI looks like confident wrong answers. Kova Bot is a WhatsApp-based conversational AI that assigns each user one of five roles during onboarding and runs every subsequent interaction through role-aware constraints.",
    objectives: [
      {
        title: "Role Taxonomy Design",
        description: "Define five user roles from first principles based on what each type of user actually needs from an AI system, not based on what the LLM makes easy to configure.",
      },
      {
        title: "Role-Aware Prompting",
        description: "Build a Claude API integration where the system prompt is dynamically assembled from the user's assigned role, constraining tone, depth, and framing per persona.",
      },
      {
        title: "Async Reliability",
        description: "Design the message processing layer to handle WhatsApp's webhook delivery guarantees and ensure no message is dropped or responded to out of order.",
      },
      {
        title: "Audit Trail",
        description: "Log every interaction, role assignment, system prompt used, user message, model response, to a Prisma-managed database for accountability and future tuning.",
      },
    ],
    methodology: [
      {
        title: "Role Definition",
        description: "Spent one week interviewing the five primary user types before writing any code. Documented what each role needed, what responses would actively harm them, and what constraints mattered.",
      },
      {
        title: "System Prompt Engineering",
        description: "Built a prompt assembly layer that composes role-specific context, constraints, and framing rules into a single coherent system prompt per conversation turn.",
      },
      {
        title: "Webhook Architecture",
        description: "Built the Express backend to handle WhatsApp's delivery guarantees, idempotency on message IDs, queue-based processing, and retry logic for failed Claude API calls.",
      },
      {
        title: "Validation via Pilot",
        description: "Ran a closed pilot with 5K testers across all five roles, collecting response quality ratings and role-misattribution incidents to tune the taxonomy.",
      },
    ],
    sections: [
      {
        title: "The Role Taxonomy",
        body: "The five roles, Founder, Analyst, Operator, Explorer, and Newcomer, were not arbitrary labels. Each maps to a distinct interaction pattern: Founders get strategic brevity and tradeoff framing. Analysts get precise, sourced answers with uncertainty quantified. Operators get procedural, step-by-step outputs. Explorers get breadth over depth, with deliberate ambiguity preserved. Newcomers get guided, scaffolded responses that build context before giving answers.",
      },
      {
        title: "Prompt Constraint Architecture",
        body: "Role-aware prompting isn't just prepending 'you are talking to a Founder'. It means constraining response length, vocabulary register, confidence calibration, and call-to-action structure differently per role. The system prompt layer is modular, a base Claude context plus role-specific constraint blocks, so each dimension can be tuned independently without breaking the others.",
      },
    ],
    problem:
      "A single LLM personality doesn't work across five different user types. A founder needs strategic framing. An analyst needs precision. A new user needs guidance. One system prompt collapses these into mediocrity.",
    what:
      "A WhatsApp chatbot backend built with Express and Prisma. During onboarding, users are assigned one of five roles. From that point, every conversation runs through role-aware system constraints that tailor framing, tone, and depth. Async message processing keeps responses reliable, and a full Prisma audit trail logs every interaction for accountability.",
    pmAngle:
      "The role taxonomy is a product decision, not an engineering one. I designed the five roles and their constraint logic from first principles, what does each user type actually need from this system, and where does a generic response actively harm them? That thinking preceded any code.",
    outcome:
      "Role-aware AI responses that match user context, with async reliability and a full audit trail for accountability.",
    features: [
      "Five-role onboarding taxonomy with role-aware prompting",
      "Claude API integration with role-specific system constraints",
      "Async message processing for reliability",
      "Full conversation audit trail via Prisma",
      "WhatsApp webhook integration via Express",
    ],
    stack: ["JavaScript", "Express", "Claude API", "Prisma", "WhatsApp API"],
    github: "https://github.com/Omodunjo11/Kova-Bot",
    featured: true,
    status: "building" as const,
  },
  {
    slug: "glean-regulatory",
    name: "Glean Regulatory",
    role: "AI Product · Compliance Decision Infrastructure",
    year: "2026",
    lang: "TypeScript",
    category: ["ai", "fullstack"],
    tagline: "AI-assisted anomaly detection and risk classification for regulated institutions, surfacing what matters, suppressing what doesn't, with defensible audit trails.",
    overview:
      "Compliance teams at financial institutions operate in an environment where missing a single regulatory update can trigger audit findings, fines, or enforcement action. Yet the current workflow at most institutions is a patchwork of email alerts, manual document review, and ad hoc searches across dozens of regulatory sources. The signal-to-noise ratio is brutal. Glean Regulatory is a purpose-built intelligence platform that tracks, surfaces, and prioritises regulatory changes for compliance analysts, designed around the compliance workflow, not a generic news aggregator.",
    objectives: [
      {
        title: "Multi-Source Tracking",
        description: "Aggregate regulatory updates across SEC, CFPB, OCC, FINRA, and targeted state-level sources into a single normalised feed.",
      },
      {
        title: "Compliance Workflow Integration",
        description: "Design the interface around what compliance analysts actually do with regulatory updates, triage, assign, annotate, escalate, not just surface them.",
      },
      {
        title: "Priority Ranking",
        description: "Develop a relevance scoring model that weights updates by proximity to the institution's product lines, recency, and enforcement history context.",
      },
      {
        title: "Audit Readiness",
        description: "Build action logging so every triage decision is timestamped and attributable, giving compliance teams a defensible record of their review process.",
      },
    ],
    methodology: [
      {
        title: "Domain Research",
        description: "Mapped the compliance analyst workflow through structured interviews, identifying the five highest-friction points in the current manual process.",
      },
      {
        title: "Source Taxonomy",
        description: "Catalogued 23 regulatory sources by jurisdiction, publication frequency, and relevance to the target institutions, then prioritised ingestion by analyst-reported impact.",
      },
      {
        title: "UI Prototyping",
        description: "Built low-fidelity wireframes tested with three compliance analysts before writing production UI, validating triage flow, filter logic, and notification thresholds.",
      },
      {
        title: "Deployment",
        description: "Shipped as a Next.js application on Vercel with environment-controlled source configuration, enabling institution-specific source sets without code changes.",
      },
    ],
    sections: [
      {
        title: "Relevance Scoring Model",
        body: "Not all regulatory updates are equal, and showing a compliance analyst 200 updates of equal weight is no better than showing them nothing. The relevance model scores updates across three axes: product proximity (does this update affect our specific product category?), recency weight (how close to effective date?), and enforcement signal (does this source have a history of subsequent enforcement action?). The composite score drives visual prioritisation and notification thresholds.",
      },
      {
        title: "Why This Isn't Just a News Aggregator",
        body: "The difference between a regulatory intelligence platform and a news aggregator is workflow integration. A news aggregator tells you what happened. Glean Regulatory tells you what to do about it, by surfacing the right update to the right analyst, attaching it to the relevant product line, and tracking whether it was acted on. The product is the workflow, not just the feed.",
      },
    ],
    problem:
      "Compliance teams at financial institutions miss regulatory changes because the signal is buried in dense documents scattered across dozens of sources. The workflow was manual, slow, and brittle, the exact conditions where a missed update becomes a liability.",
    what:
      "A Next.js regulatory intelligence platform that surfaces, tracks, and prioritises regulatory updates for compliance analysts. Designed around the actual compliance workflow, not a developer console or a generic feed, but a tool that fits into how analysts actually operate.",
    pmAngle:
      "I shadowed the compliance workflow before writing a spec. The product decisions, what to surface, how to rank it, what actions to expose, came from understanding what 'relevant' means inside a regulated institution. That research is what separates this from a generic news aggregator.",
    outcome:
      "A purpose-built intelligence layer for compliance teams, designed to surface what matters and suppress what doesn't.",
    features: [
      "Regulatory update tracking across multiple sources",
      "Analyst-first UI designed around the compliance workflow",
      "Priority and recency ranking for regulatory changes",
      "Full-stack Next.js with live deployment",
    ],
    stack: ["Next.js", "TypeScript", "Vercel", "Regulatory Data APIs"],
    github: "https://github.com/Omodunjo11/Glean-Regulatory-Updated",
    live: "https://glean-regulatory-updated.vercel.app",
    featured: true,
    status: "live" as const,
  },
  {
    slug: "transcript-intelligence",
    name: "Transcript Intelligence",
    role: "AI Automation · Structured Knowledge Extraction Pipeline",
    year: "2026",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "Automated knowledge extraction pipeline, schema-constrained LLM orchestration that converts raw meeting transcripts into structured, actionable intelligence.",
    overview:
      "The average knowledge worker spends 4+ hours a week in meetings and captures almost nothing actionable from them. Meeting notes, when they exist, are scattered across Drive folders with inconsistent structure, no tagging, and no follow-through. Insights stay trapped in transcripts nobody re-reads. This project builds a fully automated pipeline that converts raw meeting transcripts into structured intelligence documents, without any manual step between recording and output.",
    objectives: [
      {
        title: "Automated Trigger",
        description: "Watch a Google Drive folder for new transcript files and trigger the analysis pipeline automatically on each new upload, no human initiation required.",
      },
      {
        title: "Structured Output Schema",
        description: "Design a document schema that captures what teams actually need to act on: key insights, decisions made, pain points raised, and next steps with owners.",
      },
      {
        title: "LLM Constraint Design",
        description: "Constrain Claude to produce the defined output schema reliably, not allow it to summarise in whatever format felt natural to the model.",
      },
      {
        title: "Drive Integration",
        description: "Write the structured output back to Drive as a formatted Google Doc, in the same folder structure as the source transcript, with consistent naming.",
      },
    ],
    methodology: [
      {
        title: "Schema Design First",
        description: "Before writing any prompt engineering, defined the output schema by asking: what does a team need from a meeting summary to actually act on it within 24 hours?",
      },
      {
        title: "Drive API Integration",
        description: "Implemented a Google Drive folder watcher using the Drive Changes API, with file type filtering to avoid triggering on non-transcript uploads.",
      },
      {
        title: "Claude Prompt Engineering",
        description: "Engineered a structured output prompt that forces JSON-compatible section extraction, tested across 40 historical transcripts before production deployment.",
      },
      {
        title: "Output Formatting",
        description: "Used the Google Docs API to write structured summaries with heading hierarchy, bold key terms, and consistent section ordering matching the schema.",
      },
    ],
    sections: [
      {
        title: "Why Schema-First Matters",
        body: "The natural instinct is to prompt the LLM to 'summarise this meeting' and let it decide what to include. That produces summaries that feel thorough but are nearly impossible to act on, because each summary is structured differently and prioritises different things. The schema-first approach means every output answers the same questions in the same order: What was decided? What pain points came up? Who owns what next step? Teams can scan it in 90 seconds.",
      },
      {
        title: "Handling Transcript Quality Variance",
        body: "Meeting transcripts vary widely in quality, some are clean Zoom auto-transcripts, others are noisy Otter.ai files with speaker attribution errors and filler words. The preprocessing step normalises these before passing to Claude: strip filler patterns, fix speaker attribution where possible, and chunk long transcripts to stay within context limits while preserving logical meeting segments.",
      },
    ],
    problem:
      "Meeting notes were scattered across Drive folders with no consistency, no structure, and no follow-through. Insights stayed trapped in transcripts nobody re-read.",
    what:
      "A Python pipeline that watches a Google Drive folder for new meeting transcripts. Each new file triggers a Claude AI analysis that produces a structured summary: key insights, pain points raised, decisions made, and next steps, written back to Drive as a formatted document automatically.",
    pmAngle:
      "I designed the output schema before touching the Claude prompt. What does the team actually need from a meeting summary to act on it? That question drove the structure. The LLM was constrained to produce that format, not left to generate whatever felt natural.",
    outcome:
      "Eliminated the manual meeting-notes process entirely. Structured intelligence is available in Drive within minutes of a meeting ending.",
    features: [
      "Google Drive folder watcher, triggers on new transcript files",
      "Claude AI analysis with structured output schema",
      "Automatic extraction of insights, pain points, and next steps",
      "Formatted document written back to Drive",
      "Output schema designed from analyst workflow, not LLM defaults",
    ],
    stack: ["Python", "Claude API", "Google Drive API", "Google Docs API"],
    github: "https://github.com/Omodunjo11/Kinage-Transcript-Tool",
    featured: true,
    status: "live" as const,
  },
  {
    slug: "llm-reliability",
    name: "LLM System Reliability",
    role: "AI Infrastructure · Evaluation & Drift Detection",
    year: "2026",
    lang: "Python",
    category: ["ai", "systems"],
    tagline: "LLM evaluation framework for regulated environments, drift detection, regression harnesses, and failure-mode classification calibrated to compliance-grade tolerances.",
    overview:
      "In regulated environments, finance, healthcare, legal, a silent LLM failure isn't just a product bug. It's a compliance incident. Most AI teams catch model drift in post-mortems, after a user reports something wrong. This project builds the tooling to catch it before it reaches users: a Python toolkit for measuring LLM reliability in production, covering drift detection across model updates, regression testing harnesses, and failure mode classification with severity scoring calibrated to regulated-industry tolerances.",
    objectives: [
      {
        title: "Drift Monitoring",
        description: "Build detection tooling that flags statistically significant changes in model output behaviour across software updates, prompt changes, or underlying model version switches.",
      },
      {
        title: "Regression Test Harnesses",
        description: "Create reproducible evaluation harnesses that run on every deployment and catch regressions against a curated set of high-stakes queries.",
      },
      {
        title: "Failure Mode Classification",
        description: "Develop a taxonomy of LLM failure types, hallucination, refusal drift, confidence miscalibration, format degradation, with severity scores calibrated to regulated industry impact.",
      },
      {
        title: "Audit-Friendly Reporting",
        description: "Produce structured, timestamped reliability reports that can be included in compliance documentation and model governance reviews.",
      },
    ],
    methodology: [
      {
        title: "Failure Mode Research",
        description: "Catalogued 18 distinct LLM failure patterns from production incident logs and academic literature, then ranked by severity in regulated environments.",
      },
      {
        title: "Baseline Capture",
        description: "Built tooling to snapshot model behaviour across a standardised prompt battery at each deployment, creating the baseline against which drift is measured.",
      },
      {
        title: "Statistical Drift Detection",
        description: "Implemented drift detection using output distribution comparison across prompt categories, flagging shifts above configurable significance thresholds.",
      },
      {
        title: "Severity Calibration",
        description: "Worked backwards from compliance incident definitions to assign severity scores, a confidence miscalibration in a legal context scores higher than the same failure in a consumer setting.",
      },
    ],
    sections: [
      {
        title: "What 'Reliability' Means in Regulated Contexts",
        body: "Consumer AI reliability is usually measured by user satisfaction. Regulated industry reliability is measured by whether the output would survive regulatory scrutiny. Those are very different standards. A model that confidently answers 'no adverse events found' when it actually hallucinated a clean record isn't just unhelpful, it's a liability. The severity scoring in this toolkit is calibrated to that standard, not to CSAT metrics.",
      },
      {
        title: "The Regression Test Design",
        body: "The regression harness is built around 'golden queries', a curated set of prompts where the correct output is known and agreed upon by domain experts. On each deployment, the harness re-runs every golden query and diffs outputs against the stored baseline. Changes above a semantic similarity threshold trigger a review gate. The golden query set is version-controlled and treated as a first-class product artifact.",
      },
    ],
    problem:
      "In regulated environments, a silent LLM failure isn't just a product bug, it's a compliance issue. Most teams catch drift in post-mortems. I built tooling to catch it before it hits users.",
    what:
      "A Python toolkit for measuring and improving reliability in production LLM systems. Covers drift monitoring across model updates, evaluation harnesses for regression testing, and failure mode analysis, with particular focus on the kinds of silent failures that matter most in regulated industries.",
    pmAngle:
      "This is a product reliability problem wearing engineering clothes. I designed the evaluation criteria from user impact backward, not from what the model metrics made easy to measure, but from what a failure would actually cost a compliance officer or a financial analyst.",
    outcome:
      "A practical reliability layer that surfaces LLM degradation before it becomes a user-facing or compliance problem.",
    features: [
      "Drift monitoring across model versions and updates",
      "Evaluation harnesses for regression testing",
      "Failure mode classification with severity scoring",
      "Designed for regulated-industry failure tolerances",
      "Audit-friendly logging and reporting",
    ],
    stack: ["Python", "LLM Evaluation", "MLOps", "Drift Detection"],
    github: "https://github.com/Omodunjo11/llm-system-reliability",
    status: "live" as const,
  },
  {
    slug: "ai-retrieval-core",
    name: "AI Retrieval Core",
    role: "Systems Engineering · Retrieval Architecture",
    year: "2026",
    lang: "C++",
    category: ["systems", "ai"],
    tagline: "Understanding retrieval latency at the systems level, before recommending it at the product level.",
    overview:
      "RAG (Retrieval-Augmented Generation) is now a standard pattern in AI product development, but most AI PMs who spec RAG systems have never built the retrieval layer themselves. They don't know what 'fast retrieval' actually costs at the systems level, what the latency-accuracy tradeoff looks like in practice, or when a simpler keyword approach beats vector search. I built this C++ retrieval engine to fix that blind spot, not to become an infrastructure engineer, but to earn credibility in architecture conversations and know when to push back.",
    objectives: [
      {
        title: "Vector Similarity Search",
        description: "Implement approximate nearest-neighbour search from scratch in C++, without relying on libraries like Faiss, to understand the underlying algorithm at the implementation level.",
      },
      {
        title: "Index Construction",
        description: "Build and compare multiple index strategies (flat, IVF-style partitioned) to understand the latency and memory tradeoffs at different corpus sizes.",
      },
      {
        title: "Query Routing Logic",
        description: "Implement a query router that selects the appropriate search strategy based on query characteristics and corpus size, mirroring decisions made in production retrieval systems.",
      },
      {
        title: "Latency Benchmarking",
        description: "Instrument the system to produce per-query latency distributions across index configurations, giving concrete numbers to what 'fast' and 'slow' actually mean.",
      },
    ],
    methodology: [
      {
        title: "Algorithm Study",
        description: "Read the FAISS and HNSW papers before writing a line of C++, building a precise mental model of what approximate nearest-neighbour search is trading off.",
      },
      {
        title: "Implementation",
        description: "Implemented flat brute-force search first as a correctness baseline, then IVF-style partitioning, benchmarking against the brute-force baseline at each stage.",
      },
      {
        title: "Benchmarking Design",
        description: "Designed benchmark suites across three corpus sizes (10K, 100K, 1M vectors) and four dimensionalities (128d, 256d, 512d, 1536d) to map the latency surface.",
      },
      {
        title: "Insight Extraction",
        description: "Documented concrete thresholds, corpus sizes, dimensionalities, latency targets, at which each index strategy becomes the right or wrong choice.",
      },
    ],
    sections: [
      {
        title: "What This Changes About Product Decisions",
        body: "Before building this, I knew vector search was 'fast'. After building it, I know that 'fast' means sub-10ms for indexed corpora under 1M documents at 1536d, but that index construction time scales non-linearly and can take hours at scale. I know that flat search outperforms IVF under 50K documents and doesn't need the overhead. These are the numbers that let an AI PM say 'that architecture won't hit your latency target at that corpus size' instead of deferring to the engineering team.",
      },
      {
        title: "The C++ Choice",
        body: "Python would have been faster to write. C++ was the right choice because it forces you to think about memory allocation, cache locality, and algorithmic complexity in a way that high-level languages abstract away. The goal wasn't a production system, it was building an accurate mental model of what production retrieval systems are actually doing. C++ achieves that. A Python wrapper around a library does not.",
      },
    ],
    problem:
      "Most AI PMs treat retrieval as a black box, they spec RAG systems without understanding the latency, cost, and accuracy tradeoffs happening underneath. I built this to fix my own blind spot.",
    what:
      "A low-level retrieval engine written in C++ that implements vector similarity search, indexing strategies, and query routing from scratch. The goal was to understand what 'fast retrieval' actually costs at the systems level before making architecture recommendations at the product level.",
    pmAngle:
      "An AI PM who understands retrieval latency makes better calls when the engineering team says 'this approach won't scale.' I built this not to be an infrastructure engineer but to earn credibility in those conversations, and to know when to push back.",
    outcome:
      "First-principles understanding of the performance tradeoffs in retrieval systems that informs every RAG product decision I make.",
    features: [
      "Vector similarity search implementation in C++",
      "Index construction and query routing from scratch",
      "Latency benchmarking across index configurations",
      "Performance comparison across search strategies",
    ],
    stack: ["C++", "Vector Search", "Indexing", "Retrieval Systems"],
    github: "https://github.com/Omodunjo11/ai-retrieval-core-cpp",
    status: "built" as const,
  },
  {
    slug: "kinage-ai-layer",
    name: "Kinage AI Layer",
    role: "AI Backend · Decoupled Intelligence Orchestration",
    year: "2026",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "Decoupled AI orchestration layer, contract-first API design separating intelligence reasoning from product interface for independent deployment and iteration.",
    overview:
      "As the Kinage Intelligence dashboard grew in complexity, it became clear that coupling AI reasoning logic to the frontend code would create a maintenance problem, any prompt change or model update would require frontend deployment, and any UI iteration would risk breaking AI behaviour. The Kinage AI Layer is the Python backend that decouples the intelligence and reasoning layer from the product interface, exposing clean API contracts so each can evolve independently.",
    objectives: [
      {
        title: "Separation of Concerns",
        description: "Design a clean API boundary between the AI reasoning layer and the frontend dashboard, so each team can iterate independently without cross-system breakages.",
      },
      {
        title: "Signal Classification Pipeline",
        description: "Build the intelligence pipeline that ingests raw data, classifies signals by type and relevance, and returns structured output matching the dashboard's data contract.",
      },
      {
        title: "API Contract Design",
        description: "Define and version the API contract before either layer is built, establishing the shared interface that prevents frontend-backend coupling.",
      },
      {
        title: "Independent Deployment",
        description: "Structure the layer for independent deployment, so AI model updates, prompt changes, and classification logic improvements ship without touching the frontend.",
      },
    ],
    methodology: [
      {
        title: "Contract-First Design",
        description: "Defined the API contract (request schema, response schema, error states) in a shared spec document before writing either the Python backend or the Next.js frontend.",
      },
      {
        title: "Classification Architecture",
        description: "Built a modular classification pipeline where each signal type (market news, company mention, thematic shift) runs through a dedicated classification module with its own prompt and scoring logic.",
      },
      {
        title: "Output Schema Validation",
        description: "Implemented Pydantic models for all API responses, ensuring that the AI layer never returns unstructured output and that contract violations are caught at the boundary, not in the UI.",
      },
      {
        title: "Versioning Strategy",
        description: "Designed the API versioning scheme to allow breaking changes in AI classification logic without requiring simultaneous frontend updates.",
      },
    ],
    sections: [
      {
        title: "Why the Separation Matters",
        body: "In a coupled system, changing 'how we classify a market signal' requires touching the frontend, re-testing the UI, and coordinating a joint deployment. In a decoupled system, the classification logic is a backend concern, the frontend only cares that the API contract is honoured. As the AI landscape shifts (better models, cheaper inference, new classification approaches), the decoupled architecture means we can upgrade the intelligence layer without a product freeze.",
      },
    ],
    problem:
      "The Kinage Intelligence dashboard needed a clean separation between the AI reasoning layer and the product interface, so each could evolve independently without breaking the other.",
    what:
      "The Python AI backbone for the Kinage platform. Handles the intelligence and reasoning layer between raw data ingestion and the structured outputs the dashboard surfaces. Exposes clean API contracts so the frontend product can consume structured intelligence without coupling to the AI implementation.",
    pmAngle:
      "I designed the API contract between this layer and the frontend before either was built. Clean separation of concerns is a product architecture decision as much as an engineering one, it determines how fast the team can move independently on each side.",
    outcome:
      "A modular AI layer that lets the Kinage intelligence dashboard evolve its UI without touching the reasoning logic, and vice versa.",
    features: [
      "Python AI reasoning layer with clean API contracts",
      "Signal processing and classification pipeline",
      "Structured output schema matching dashboard requirements",
      "Decoupled from frontend for independent deployment",
    ],
    stack: ["Python", "AI / ML", "REST API", "Signal Processing"],
    github: "https://github.com/Omodunjo11/Kinage-AL-",
    status: "live" as const,
  },
  {
    slug: "incident-command",
    name: "Incident Command",
    role: "Ops Tooling · Incident Management Interface",
    year: "2025",
    lang: "HTML / JS",
    category: ["fullstack", "systems"],
    tagline: "Coordination overhead compounds outages. This removes it.",
    overview:
      "Post-incident reviews consistently show the same pattern: the technical problem gets solved faster than expected, but the incident takes twice as long to resolve because of coordination overhead, unclear ownership, duplicated work, stale status information, and decisions that aren't logged anywhere. Incident Command is a centralised management interface built from real post-mortem findings, not from adapting a generic project management tool to an emergency context.",
    objectives: [
      {
        title: "Centralised Command View",
        description: "Build a single-screen interface that gives the incident commander real-time visibility into who owns what, what's been tried, and what the current status is, without requiring team members to update a separate system.",
      },
      {
        title: "Decision Logging",
        description: "Capture every key decision with a timestamp and owner, so the post-incident review has a complete record of what was decided, when, and by whom.",
      },
      {
        title: "Action Ownership",
        description: "Make action ownership explicit and visible, eliminating the 'I thought you were handling that' coordination failure mode.",
      },
      {
        title: "Low Friction Under Pressure",
        description: "Design every interaction for a stressed engineer under time pressure, no menus, no navigation, no configuration. The interface should be immediately operational.",
      },
    ],
    methodology: [
      {
        title: "Post-Mortem Analysis",
        description: "Reviewed 14 incident post-mortems to identify the most common coordination failure modes, ranking them by frequency and time impact.",
      },
      {
        title: "Opinionated UX Design",
        description: "Made deliberate design choices that reduce optionality under pressure, fixed screen layout, no customisation, forced fields for owner and timestamp on every decision.",
      },
      {
        title: "Rapid Prototyping",
        description: "Built in vanilla HTML/JS to minimise load time and dependency overhead, incident tooling that requires a build step is incident tooling that isn't ready when you need it.",
      },
      {
        title: "Validation",
        description: "Ran tabletop incident simulations with the engineering team to validate that the interface reduced coordination overhead under realistic pressure conditions.",
      },
    ],
    sections: [
      {
        title: "Why Opinionated Tooling Works Better in Incidents",
        body: "Generic project management tools fail during incidents because they offer too much optionality. You can organise by sprint, by assignee, by priority, by label, which means you spend time deciding how to organise instead of responding. Incident Command has one view, one way to log a decision, one way to assign an action. That rigidity is the feature. Under pressure, constraints are faster than choices.",
      },
    ],
    problem:
      "During live incidents, the biggest time-waster isn't fixing the problem, it's figuring out who knows what and who owns what action. Coordination overhead compounds the outage.",
    what:
      "An incident management interface built to centralise communication and command during engineering outages. Tracks decision owners, surfaces the current state of play, and reduces the time engineers spend on coordination instead of resolution.",
    pmAngle:
      "Built from real incident post-mortems. The UX decisions came from watching how coordination actually breaks down under pressure, not from copying a project management template. The interface is opinionated because incidents don't benefit from optionality.",
    outcome:
      "Faster mean-time-to-resolution by cutting the coordination overhead that compounds every incident.",
    features: [
      "Centralised command interface for live incidents",
      "Decision owner tracking with timestamp logging",
      "Current state visibility for the full response team",
      "Optimised for speed, no unnecessary UI complexity",
    ],
    stack: ["HTML", "JavaScript", "Incident Management"],
    github: "https://github.com/Omodunjo11/Incident-Command",
    status: "built" as const,
  },
  {
    slug: "personal-assistant",
    name: "AI Personal Assistant",
    role: "AI Agent · Productivity Automation",
    year: "2025",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "Building an agentic AI to understand where it earns trust, and where it doesn't.",
    overview:
      "Agentic AI is one of the most overhyped and under-examined categories in product development. Every AI company is pitching agents that can 'do work autonomously', but few have been honest about where agents break trust, require human oversight, and cause more harm than help when they act without confirmation. I built a personal AI assistant not because I needed one, but because operating one in a real context was the only way to develop an accurate intuition about agentic failure modes.",
    objectives: [
      {
        title: "Task Orchestration",
        description: "Build an agent that can break compound tasks into steps, execute them in sequence, and handle partial failures without abandoning the full task.",
      },
      {
        title: "Context Management",
        description: "Design the context window strategy for multi-turn, multi-day workflows, where the agent needs to remember decisions made in previous sessions.",
      },
      {
        title: "Trust Boundary Mapping",
        description: "Document empirically where agentic AI earns trust (routine, low-stakes, reversible actions) versus where it requires a human in the loop (irreversible, high-stakes, or ambiguous intent).",
      },
      {
        title: "Guardrail Architecture",
        description: "Design a guardrail system that applies different confirmation requirements based on action category, not a blanket 'confirm everything' that defeats the purpose of automation.",
      },
    ],
    methodology: [
      {
        title: "Real Workflow Integration",
        description: "Deployed the assistant into actual personal and professional workflows for 90 days, not a demo environment, but real tasks with real consequences.",
      },
      {
        title: "Failure Logging",
        description: "Maintained a structured log of every agent failure, categorising by failure type, task category, and whether a human-in-the-loop checkpoint would have prevented it.",
      },
      {
        title: "Trust Calibration",
        description: "Developed a trust scoring framework for action categories, mapping each to an autonomy level (full auto, confirmation required, human-only).",
      },
      {
        title: "Guardrail Iteration",
        description: "Iterated the guardrail design based on 90-day failure log analysis, converging on a minimal set of hard stops that prevented the high-severity failures without killing automation value.",
      },
    ],
    sections: [
      {
        title: "What 90 Days of Operating an Agent Teaches You",
        body: "The failure mode that shows up most in production agents isn't the dramatic one, it isn't the agent sending the wrong email or deleting the wrong file. It's confident mediocrity: the agent completing a task in a way that's technically correct but wrong in context. It answered the literal question instead of the implied question. It scheduled the meeting without checking the agenda. It summarised the document without noting the anomaly that a human reader would have flagged. These failures are hard to prevent with guardrails alone, they require the agent to have a model of what 'good' looks like, not just 'done'.",
      },
    ],
    problem:
      "Agentic AI is overhyped and under-examined. I wanted to build one myself to understand the real failure modes, not from documentation, but from operating one.",
    what:
      "A Python AI assistant that handles task orchestration, context-aware responses, and workflow automation across personal and professional tasks. Built to push the limits of agentic AI, and specifically to find the boundaries where it breaks trust or needs a human in the loop.",
    pmAngle:
      "The most useful output from this project wasn't the assistant itself, it was clarity on where agentic AI earns trust and what guardrails actually need to look like in practice. That understanding directly shapes how I evaluate and spec agentic AI products.",
    outcome:
      "Hands-on intuition about agentic AI failure modes that no amount of reading about it can replace.",
    features: [
      "Task orchestration across personal and professional workflows",
      "Context-aware response generation",
      "Human-in-the-loop design for high-stakes actions",
      "Failure mode documentation and guardrail design",
    ],
    stack: ["Python", "Claude API", "AI Agents", "Automation"],
    github: "https://github.com/Omodunjo11/Personal-Assistant-",
    status: "built" as const,
  },
  {
    slug: "kinage-notifications",
    name: "Kinage Notifications",
    role: "Platform · Event-Driven Messaging",
    year: "2026",
    lang: "JavaScript",
    category: ["fullstack", "automation"],
    tagline: "The right signal, to the right analyst, at the right time.",
    overview:
      "Notification systems fail in one of two ways: they send too much and train users to ignore everything, or they send too little and miss the events that matter. The Kinage notification layer was designed to walk that line, delivering only the signals that warrant an analyst's attention while suppressing the ambient noise that would otherwise cause alert fatigue and adoption drop-off.",
    objectives: [
      {
        title: "Event-Driven Architecture",
        description: "Build a real-time notification delivery system on an event-driven backbone, so analyst alerts fire within seconds of a signal being classified, not on a polling schedule.",
      },
      {
        title: "Multi-Channel Routing",
        description: "Route notifications across email, in-app, and push channels based on signal priority and analyst preference, with channel fallback logic for high-priority signals.",
      },
      {
        title: "Filtering Logic",
        description: "Design the filtering rules that determine what earns an interrupt, calibrated to analyst-reported importance thresholds from the workflow research phase.",
      },
      {
        title: "Feed Integration",
        description: "Integrate tightly with the Kinage Intelligence feed so notification content matches exactly what the analyst will see when they open the dashboard.",
      },
    ],
    methodology: [
      {
        title: "Interrupt Criteria Design",
        description: "Worked with analysts to define the specific signal characteristics that warrant pulling someone out of their current work, building explicit criteria rather than a general 'high priority' flag.",
      },
      {
        title: "Event Architecture",
        description: "Implemented an event bus that the Intelligence feed publishes to on each new signal classification, with subscriber logic for each notification channel.",
      },
      {
        title: "Channel Preference System",
        description: "Built an analyst preference layer that overrides default routing, allowing each analyst to tune channel and threshold settings without affecting platform-wide behaviour.",
      },
      {
        title: "Adoption Monitoring",
        description: "Instrumented notification open rates and action rates per channel and signal type, using these to iteratively tighten the filtering criteria toward optimal alert volume.",
      },
    ],
    sections: [
      {
        title: "The Alert Fatigue Problem",
        body: "Alert fatigue is not a volume problem, it's a relevance problem. Analysts don't stop reading notifications because there are too many; they stop because too many don't matter. The filtering criteria design is therefore the core product work in this project. The engineering of reliable delivery is table stakes. The product work is deciding what earns a notification in the first place, and that decision has to come from analyst workflow research, not from defaulting to 'notify on everything' and letting users manage their own noise.",
      },
    ],
    problem:
      "Too many notifications kill adoption. Too few kill trust. The Kinage platform needed a notification layer that respected both sides of that tension.",
    what:
      "Real-time notification delivery across the Kinage platform. Handles multi-channel alert routing and event-driven messaging so analysts receive the signals that matter without being buried in noise.",
    pmAngle:
      "The notification filtering logic is a product decision. I designed the rules around what earns an interrupt, when does a signal justify pulling an analyst out of what they're doing? That question drove the architecture.",
    outcome:
      "Analysts get signals that warrant their attention, delivered at the right time, without alert fatigue.",
    features: [
      "Multi-channel notification routing",
      "Event-driven architecture for real-time delivery",
      "Analyst-tuned filtering to reduce noise",
      "Integration with Kinage Intelligence feed",
    ],
    stack: ["JavaScript", "Event-Driven", "Real-Time", "Notifications API"],
    github: "https://github.com/Omodunjo11/Kinage-Notifications",
    status: "live" as const,
  },
  {
    slug: "mailgun-push",
    name: "Mailgun Push",
    role: "Platform · Transactional Messaging",
    year: "2025",
    lang: "JavaScript",
    category: ["fullstack", "automation"],
    tagline: "Email and push that actually lands.",
    overview:
      "Transactional notification pipelines have a habit of silently failing in production, messages that show as 'sent' in your dashboard but never arrive in an inbox. The failure modes are well-documented: ISP filtering, webhook delivery gaps, retry storms, and the quiet drop that happens when a bounce isn't handled correctly. This project builds a reliable transactional messaging service on top of Mailgun, engineered specifically to handle the edge cases that cause pipelines to fail silently.",
    objectives: [
      {
        title: "Reliable Email Delivery",
        description: "Integrate Mailgun with retry logic, bounce handling, and delivery status tracking, so failures are visible before users report them.",
      },
      {
        title: "Push Notification Delivery",
        description: "Extend the pipeline to push notifications across mobile and web channels, with the same delivery reliability standards as email.",
      },
      {
        title: "Observability",
        description: "Build delivery observability into the system from the start, not as an afterthought, so delivery failures appear in dashboards rather than support tickets.",
      },
      {
        title: "Failure Recovery",
        description: "Implement failure detection and automatic retry with exponential backoff, handling the transient failures that cause permanent drop in naive implementations.",
      },
    ],
    methodology: [
      {
        title: "Failure Mode Catalogue",
        description: "Documented the 12 most common transactional email failure modes from production incidents and Mailgun's own documentation before writing any integration code.",
      },
      {
        title: "Webhook Handler Design",
        description: "Built robust webhook handlers for Mailgun's delivery events, delivered, bounced, complained, dropped, with idempotency keys to prevent double-processing.",
      },
      {
        title: "Retry Architecture",
        description: "Implemented exponential backoff with jitter for transient failures, with dead-letter queue handling for messages that exceed the retry budget.",
      },
      {
        title: "Delivery Dashboard",
        description: "Built a lightweight delivery status dashboard showing per-message delivery state, bounce rates by domain, and alert thresholds for anomalous failure rates.",
      },
    ],
    sections: [
      {
        title: "Why Silent Failures Are the Real Problem",
        body: "A notification system that crashes visibly is easy to fix, you see the error, you fix the error. A notification system that silently drops 3% of messages is much harder to detect and much more damaging, because it erodes user trust gradually and invisibly. The observability design in this project treats 'delivered' as a claimed state that requires positive confirmation from the receiving mail server, not just 'we called the API and got a 200'. Every message is tracked through its full lifecycle until confirmed receipt or terminal failure.",
      },
    ],
    problem:
      "Transactional notification pipelines have a habit of silently failing, messages that appear sent but never arrive. I built this to handle the reliability edge cases.",
    what:
      "A transactional email and push notification service integrating Mailgun across product alerts, digests, and user communication workflows. Engineered to handle the delivery edge cases that cause notification pipelines to silently fail.",
    pmAngle:
      "Silent notification failures are invisible to most product metrics until a user complains. I designed observability into this from the start, not as an afterthought.",
    outcome:
      "Reliable multi-channel message delivery with visibility into failures before users report them.",
    features: [
      "Mailgun integration for transactional email",
      "Push notification delivery across channels",
      "Failure detection and retry logic",
      "Delivery observability built in from the start",
    ],
    stack: ["JavaScript", "Mailgun API", "Push Notifications"],
    github: "https://github.com/Omodunjo11/Mailgun-Push",
    status: "live" as const,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const featuredProjects = projects.filter((p) => p.featured)
