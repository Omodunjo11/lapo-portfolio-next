export type Project = {
  slug: string
  name: string
  role: string
  year: string
  lang: string
  category: string[]
  tagline: string
  problem: string
  what: string
  pmAngle: string
  outcome: string
  features: string[]
  stack: string[]
  github: string
  live?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: "kinage-intelligence",
    name: "Kinage Intelligence",
    role: "AI Product · Signal Intelligence Dashboard",
    year: "2026",
    lang: "TypeScript",
    category: ["ai", "fullstack"],
    tagline: "Turning noisy news feeds into structured analyst intelligence.",
    problem:
      "Kinage's analyst team was manually trawling news sources every morning to track market signals. It was slow, inconsistent, and meant the most important signals often surfaced too late to act on.",
    what:
      "A Next.js intelligence dashboard that ingests signals from multiple news sources, enriches author data through scraping and outreach workflows, and surfaces a filterable feed ranked by recency and relevance. Analysts go from raw noise to structured, prioritised intelligence in one interface.",
    pmAngle:
      "I defined the signal taxonomy before writing a line of code — what counts as a signal, how it should be ranked, and what 'relevant' means to an analyst vs. a generalist. The data model came from that work. I then owned end-to-end delivery from problem brief to live deployment on Vercel.",
    outcome:
      "Turned a daily manual process into a real-time, structured feed that analysts can filter and act on without leaving one interface.",
    features: [
      "Multi-source news ingestion pipeline",
      "Author enrichment through scraping + outreach workflows",
      "Filterable dashboard by recency, relevance, and topic",
      "Signal taxonomy and ranking logic designed from analyst workflow",
      "Deployed and live on Vercel",
    ],
    stack: ["Next.js", "TypeScript", "Vercel", "Web Scraping", "REST APIs"],
    github: "https://github.com/Omodunjo11/kinage-intelligence",
    live: "https://kinage-intelligence.vercel.app",
    featured: true,
  },
  {
    slug: "kova-bot",
    name: "Kova Bot",
    role: "AI Product · Role-Aware Conversational System",
    year: "2026",
    lang: "JavaScript",
    category: ["ai", "fullstack"],
    tagline: "A single AI model, five different personas — based on who's asking.",
    problem:
      "A single LLM personality doesn't work across five different user types. A founder needs strategic framing. An analyst needs precision. A new user needs guidance. One system prompt collapses these into mediocrity.",
    what:
      "A WhatsApp chatbot backend built with Express and Prisma. During onboarding, users are assigned one of five roles. From that point, every conversation runs through role-aware system constraints that tailor framing, tone, and depth. Async message processing keeps responses reliable, and a full Prisma audit trail logs every interaction for accountability.",
    pmAngle:
      "The role taxonomy is a product decision, not an engineering one. I designed the five roles and their constraint logic from first principles — what does each user type actually need from this system, and where does a generic response actively harm them? That thinking preceded any code.",
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
  },
  {
    slug: "glean-regulatory",
    name: "Glean Regulatory",
    role: "AI Product · Regulatory Intelligence Platform",
    year: "2026",
    lang: "TypeScript",
    category: ["ai", "fullstack"],
    tagline: "Compliance teams shouldn't miss a regulatory change because of noise.",
    problem:
      "Compliance teams at financial institutions miss regulatory changes because the signal is buried in dense documents scattered across dozens of sources. The workflow was manual, slow, and brittle — the exact conditions where a missed update becomes a liability.",
    what:
      "A Next.js regulatory intelligence platform that surfaces, tracks, and prioritises regulatory updates for compliance analysts. Designed around the actual compliance workflow — not a developer console or a generic feed, but a tool that fits into how analysts actually operate.",
    pmAngle:
      "I shadowed the compliance workflow before writing a spec. The product decisions — what to surface, how to rank it, what actions to expose — came from understanding what 'relevant' means inside a regulated institution. That research is what separates this from a generic news aggregator.",
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
  },
  {
    slug: "transcript-intelligence",
    name: "Transcript Intelligence",
    role: "AI Automation · Meeting Intelligence Pipeline",
    year: "2026",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "Every meeting should produce structured intelligence — automatically.",
    problem:
      "Meeting notes were scattered across Drive folders with no consistency, no structure, and no follow-through. Insights stayed trapped in transcripts nobody re-read.",
    what:
      "A Python pipeline that watches a Google Drive folder for new meeting transcripts. Each new file triggers a Claude AI analysis that produces a structured summary: key insights, pain points raised, decisions made, and next steps — written back to Drive as a formatted document automatically.",
    pmAngle:
      "I designed the output schema before touching the Claude prompt. What does the team actually need from a meeting summary to act on it? That question drove the structure. The LLM was constrained to produce that format, not left to generate whatever felt natural.",
    outcome:
      "Eliminated the manual meeting-notes process entirely. Structured intelligence is available in Drive within minutes of a meeting ending.",
    features: [
      "Google Drive folder watcher — triggers on new transcript files",
      "Claude AI analysis with structured output schema",
      "Automatic extraction of insights, pain points, and next steps",
      "Formatted document written back to Drive",
      "Output schema designed from analyst workflow, not LLM defaults",
    ],
    stack: ["Python", "Claude API", "Google Drive API", "Google Docs API"],
    github: "https://github.com/Omodunjo11/Kinage-Transcript-Tool",
    featured: true,
  },
  {
    slug: "llm-reliability",
    name: "LLM System Reliability",
    role: "AI Infrastructure · Eval & Drift Monitoring",
    year: "2026",
    lang: "Python",
    category: ["ai", "systems"],
    tagline: "Most AI teams ship fast and measure slow. This fixes that.",
    problem:
      "In regulated environments, a silent LLM failure isn't just a product bug — it's a compliance issue. Most teams catch drift in post-mortems. I built tooling to catch it before it hits users.",
    what:
      "A Python toolkit for measuring and improving reliability in production LLM systems. Covers drift monitoring across model updates, evaluation harnesses for regression testing, and failure mode analysis — with particular focus on the kinds of silent failures that matter most in regulated industries.",
    pmAngle:
      "This is a product reliability problem wearing engineering clothes. I designed the evaluation criteria from user impact backward — not from what the model metrics made easy to measure, but from what a failure would actually cost a compliance officer or a financial analyst.",
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
  },
  {
    slug: "ai-retrieval-core",
    name: "AI Retrieval Core",
    role: "Systems Engineering · Retrieval Architecture",
    year: "2026",
    lang: "C++",
    category: ["systems", "ai"],
    tagline: "Understanding retrieval latency at the systems level — before recommending it at the product level.",
    problem:
      "Most AI PMs treat retrieval as a black box — they spec RAG systems without understanding the latency, cost, and accuracy tradeoffs happening underneath. I built this to fix my own blind spot.",
    what:
      "A low-level retrieval engine written in C++ that implements vector similarity search, indexing strategies, and query routing from scratch. The goal was to understand what 'fast retrieval' actually costs at the systems level before making architecture recommendations at the product level.",
    pmAngle:
      "An AI PM who understands retrieval latency makes better calls when the engineering team says 'this approach won't scale.' I built this not to be an infrastructure engineer but to earn credibility in those conversations — and to know when to push back.",
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
  },
  {
    slug: "kinage-ai-layer",
    name: "Kinage AI Layer",
    role: "AI Backend · Intelligence Engine",
    year: "2026",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "The reasoning backbone that powers Kinage's analyst intelligence.",
    problem:
      "The Kinage Intelligence dashboard needed a clean separation between the AI reasoning layer and the product interface — so each could evolve independently without breaking the other.",
    what:
      "The Python AI backbone for the Kinage platform. Handles the intelligence and reasoning layer between raw data ingestion and the structured outputs the dashboard surfaces. Exposes clean API contracts so the frontend product can consume structured intelligence without coupling to the AI implementation.",
    pmAngle:
      "I designed the API contract between this layer and the frontend before either was built. Clean separation of concerns is a product architecture decision as much as an engineering one — it determines how fast the team can move independently on each side.",
    outcome:
      "A modular AI layer that lets the Kinage intelligence dashboard evolve its UI without touching the reasoning logic — and vice versa.",
    features: [
      "Python AI reasoning layer with clean API contracts",
      "Signal processing and classification pipeline",
      "Structured output schema matching dashboard requirements",
      "Decoupled from frontend for independent deployment",
    ],
    stack: ["Python", "AI / ML", "REST API", "Signal Processing"],
    github: "https://github.com/Omodunjo11/Kinage-AL-",
  },
  {
    slug: "incident-command",
    name: "Incident Command",
    role: "Ops Tooling · Incident Management Interface",
    year: "2025",
    lang: "HTML / JS",
    category: ["fullstack", "systems"],
    tagline: "Coordination overhead compounds outages. This removes it.",
    problem:
      "During live incidents, the biggest time-waster isn't fixing the problem — it's figuring out who knows what and who owns what action. Coordination overhead compounds the outage.",
    what:
      "An incident management interface built to centralise communication and command during engineering outages. Tracks decision owners, surfaces the current state of play, and reduces the time engineers spend on coordination instead of resolution.",
    pmAngle:
      "Built from real incident post-mortems. The UX decisions came from watching how coordination actually breaks down under pressure — not from copying a project management template. The interface is opinionated because incidents don't benefit from optionality.",
    outcome:
      "Faster mean-time-to-resolution by cutting the coordination overhead that compounds every incident.",
    features: [
      "Centralised command interface for live incidents",
      "Decision owner tracking with timestamp logging",
      "Current state visibility for the full response team",
      "Optimised for speed — no unnecessary UI complexity",
    ],
    stack: ["HTML", "JavaScript", "Incident Management"],
    github: "https://github.com/Omodunjo11/Incident-Command",
  },
  {
    slug: "personal-assistant",
    name: "AI Personal Assistant",
    role: "AI Agent · Productivity Automation",
    year: "2025",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "Building an agentic AI to understand where it earns trust — and where it doesn't.",
    problem:
      "Agentic AI is overhyped and under-examined. I wanted to build one myself to understand the real failure modes — not from documentation, but from operating one.",
    what:
      "A Python AI assistant that handles task orchestration, context-aware responses, and workflow automation across personal and professional tasks. Built to push the limits of agentic AI — and specifically to find the boundaries where it breaks trust or needs a human in the loop.",
    pmAngle:
      "The most useful output from this project wasn't the assistant itself — it was clarity on where agentic AI earns trust and what guardrails actually need to look like in practice. That understanding directly shapes how I evaluate and spec agentic AI products.",
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
  },
  {
    slug: "kinage-notifications",
    name: "Kinage Notifications",
    role: "Platform · Event-Driven Messaging",
    year: "2026",
    lang: "JavaScript",
    category: ["fullstack", "automation"],
    tagline: "The right signal, to the right analyst, at the right time.",
    problem:
      "Too many notifications kill adoption. Too few kill trust. The Kinage platform needed a notification layer that respected both sides of that tension.",
    what:
      "Real-time notification delivery across the Kinage platform. Handles multi-channel alert routing and event-driven messaging so analysts receive the signals that matter without being buried in noise.",
    pmAngle:
      "The notification filtering logic is a product decision. I designed the rules around what earns an interrupt — when does a signal justify pulling an analyst out of what they're doing? That question drove the architecture.",
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
  },
  {
    slug: "mailgun-push",
    name: "Mailgun Push",
    role: "Platform · Transactional Messaging",
    year: "2025",
    lang: "JavaScript",
    category: ["fullstack", "automation"],
    tagline: "Email and push that actually lands.",
    problem:
      "Transactional notification pipelines have a habit of silently failing — messages that appear sent but never arrive. I built this to handle the reliability edge cases.",
    what:
      "A transactional email and push notification service integrating Mailgun across product alerts, digests, and user communication workflows. Engineered to handle the delivery edge cases that cause notification pipelines to silently fail.",
    pmAngle:
      "Silent notification failures are invisible to most product metrics until a user complains. I designed observability into this from the start — not as an afterthought.",
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
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const featuredProjects = projects.filter((p) => p.featured)
