import { SITE_URL } from "./site"

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
  githubPrivate?: boolean
  live?: string
  featured?: boolean
  status: "live" | "building" | "built"
}

export const projects: Project[] = [
  {
    slug: "kova-bot",
    name: "Kova",
    role: "Co-Founder · WhatsApp-Native Credit Infrastructure",
    year: "2025",
    lang: "JavaScript",
    category: ["ai", "fullstack"],
    tagline: "WhatsApp credit platform for Nigeria's informal economy. Builds credit identity from payment behaviour, underwrites through progressive lending, and routes trust through collectors who already know the borrower.",
    overview:
      "Forty million Nigerians run their financial lives through Ajo savings groups, market trading, and informal credit networks. Banks cannot score them because the data lives in cash and WhatsApp, not bank statements. Kova is the credit layer on top of that reality: a WhatsApp-native platform where market traders, artisans, and transport workers build a TradeScore from observed payments, complete consent-based verification over chat, and access tiered loans without downloading an app. Scoring blends identity, capacity, behaviour, and social trust. Progressive lending limits exposure on early loans. Collectors vouch for members they know personally, mirroring how informal lending actually works.",
    objectives: [
      {
        title: "Multi-Signal TradeScore",
        description: "Build a composite credit score from separate stored components: identity verification, income capacity, observed payment behaviour, and social trust signals. Self-reported data contributes modestly; verified data and real behaviour drive the score over time. Every change is logged for audit.",
      },
      {
        title: "Progressive Lending Controls",
        description: "Cap early loan exposure regardless of score. Loan limits grow only after successful repayments. Affordability checks prevent offers above what a borrower can reasonably repay. Defaults reset access until resolved.",
      },
      {
        title: "WhatsApp Verification Flow",
        description: "Run consent-first KYC over chat: occupation, income, banking context, and identity signals captured one step at a time. On completion, recompute eligibility and offer a small starter loan when appropriate, in the same conversation.",
      },
      {
        title: "Collector Vouching + Risk Monitoring",
        description: "Let established collectors vouch for new members, with reputation at stake if the member defaults. Flag suspicious patterns such as duplicate identity signals, unusual velocity, and broken vouch track records for review.",
      },
    ],
    methodology: [
      {
        title: "Ladder-First Underwriting",
        description: "Designed risk controls around repayment history, not score alone. Small first loans generate behavioural data before larger exposure. Recovery paths exist for overdue borrowers instead of permanent lockout.",
      },
      {
        title: "No Dead-End Conversations",
        description: "Every eligibility state offers a forward path: verify, get a vouch, join a group, or accept a starter loan. Replaced refusal-without-next-step flows with concrete actions that change the outcome.",
      },
      {
        title: "Webhook-First Architecture",
        description: "Stateless handlers for messaging and payments. Each incoming event loads full user context from the database. Signature validation on inbound webhooks. No in-memory session state that breaks on redeploy.",
      },
      {
        title: "Test-Driven Core Logic",
        description: "Automated test suite covering scoring, lending eligibility, verification flow, vouch honour and break paths, risk flags, and full loan lifecycle before production deploy.",
      },
    ],
    sections: [
      {
        title: "Three Rules That Govern the Whole System",
        body: "Self-reported data gives modest boosts only. It is easy to misrepresent and never unlocks meaningful credit on its own. Verified data and observed behaviour give the real lift: identity checks, payment history, collector vouches, and on-time contributions through the platform. Progressive lending, not the score alone, is the real risk control. Early loans stay small regardless of score. They grow only after repayment proves out. Never dead-end a conversation. If someone cannot borrow yet, always offer the next concrete step.",
      },
      {
        title: "Cold Start: How a New Borrower Gets Their First Loan",
        body: "A brand-new user has no behavioural history, so the system cannot lend blind. The cold-start path mirrors informal Ajo: a trusted collector vouches for someone they know personally, with the collector's reputation on the line, or the borrower completes verification and accepts a small starter loan at the bottom of the ladder. After the first on-time repayment, behavioural data starts to accumulate and larger access unlocks gradually. The conversion moment happens in the same WhatsApp session: verify, check eligibility, offer if ready.",
      },
    ],
    problem:
      "Market traders, artisans, and transport workers in Nigeria are financially active but credit-invisible. Banks need bank statements and collateral. Informal Ajo networks already extend credit based on personal trust, but that trust does not travel. Kova converts observed payment behaviour and collector relationships into a portable credit identity, starting small and growing only as repayment proves out.",
    what:
      "A WhatsApp-native credit platform I co-founded: composite TradeScore, progressive lending, consent-based KYC over chat, collector vouching, AI-assisted collector tools, and payment-integrated loan lifecycle. Built for Nigerians who already run their money through groups and messaging apps, not bank portals.",
    pmAngle:
      "The hardest product problem was cold start: how do you score someone with no history without lending blind? The answer was not a better algorithm. It was designing progressive lending, the vouch mechanic, and conversation flows that never dead-end. Risk control lives in lending limits and affordability, not in hoping the score is right on day one.",
    outcome:
      "5K tester-phase customers in the first two months. Full scoring and lending loop shipped with automated test coverage, live at gokova.io.",
    features: [
      "Composite TradeScore from identity, capacity, behaviour, and social trust",
      "Progressive lending limits that grow with successful repayment history",
      "Affordability checks on every loan offer",
      "Consent-first WhatsApp verification with starter loan on completion",
      "Collector vouch mechanic with reputation stake on defaults",
      "Conversation flows with clear next steps at every eligibility state",
      "Risk monitoring for duplicate identity and suspicious patterns",
      "AI-assisted collector tools with role-gated permissions",
      "Payment webhooks, referral growth, multi-language onboarding",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Prisma", "Webhooks", "Claude API", "WhatsApp Cloud API", "Paystack", "Railway"],
    github: "https://github.com/Omodunjo11/Kova-Bot",
    githubPrivate: true,
    live: "https://gokova.io",
    featured: true,
    status: "live" as const,
  },
  {
    slug: "gtm-intelligence-platform",
    name: "GTM Intelligence Platform",
    role: "AI Product · Enterprise Signal & CRM Infrastructure",
    year: "2026",
    lang: "TypeScript",
    category: ["ai", "fullstack"],
    tagline: "Full-stack GTM intelligence for regulated enterprise sales: signal monitoring, CRM enrichment, and fit classification in one workflow.",
    overview:
      "Enterprise GTM teams drown in signal noise, stale CRM data, and manual fit assessment. I built a platform that closes the loop in one interface: a ranked signal feed, automated contact enrichment triggered by CRM events, AI-assisted fit classification, a decoupled backend for independent iteration, and a live activity view so the team always knows what changed. Built as forward-deployed product work inside a regulated financial services environment.",
    objectives: [
      {
        title: "Signal Ingestion + Ranking",
        description: "Ingest from multiple market signal sources and rank by relevance and source trust. Define what counts as a signal before building ingestion so the feed reflects analyst workflow.",
      },
      {
        title: "Event-Driven CRM Enrichment",
        description: "Enrich contact records automatically when CRM events fire, rather than on a batch schedule. Write enriched and classified data back to the CRM without manual intervention.",
      },
      {
        title: "Decoupled AI Backend",
        description: "Separate classification logic from the frontend via versioned API contracts so model and prompt changes ship without UI redeploys.",
      },
      {
        title: "Activity Monitoring + Alerts",
        description: "Surface enrichments, re-classifications, and contact updates in a live feed. Route notifications only for events that earn an interrupt based on analyst-defined criteria.",
      },
    ],
    methodology: [
      {
        title: "Event-Driven Over Batch",
        description: "Chose webhook-triggered enrichment so CRM data stays current within seconds of a new contact, accepting the engineering cost of idempotent handlers and deduplication.",
      },
      {
        title: "Re-Classification on Change",
        description: "Fit classification retriggers when enriched data changes, not only on first import. Activity logging captures when a contact moves across fit boundaries.",
      },
      {
        title: "Contract-First AI Layer",
        description: "Defined API schemas before building frontend or backend. Modular classification per signal type with validated structured outputs.",
      },
      {
        title: "Interrupt Criteria Design",
        description: "Notification rules came from workflow research: what characteristics justify pulling an analyst out of their current task. Relevance over volume.",
      },
    ],
    sections: [
      {
        title: "Why Event-Driven Beats Batch",
        body: "Batch enrichment produces a CRM that is accurate on a schedule. Event-driven enrichment produces a CRM that is accurate when someone needs to act. For a team running on signal speed, stale contact data is not a minor inconvenience. It is a competitive disadvantage. The engineering tradeoff is worth making.",
      },
      {
        title: "One Workflow, Multiple Layers",
        body: "Signal monitoring, contact enrichment, fit classification, and activity logging are separate capabilities that earn their keep when they connect. A signal surfaces a company. Enrichment fills in the contact. Classification answers whether they fit. Activity logging proves the chain happened. The product value is the workflow, not any single layer in isolation.",
      },
    ],
    problem:
      "Enterprise GTM teams were running signal monitoring, CRM enrichment, and fit assessment as disconnected workflows across separate tools. Signals surfaced companies but not who to contact. CRM data went stale within days. Nobody had a live view of what the CRM was doing.",
    what:
      "A full-stack GTM intelligence platform: ranked signal feed, event-driven CRM enrichment, AI-assisted fit classification, decoupled Python backend, and live activity monitoring. Shipped to production for a regulated financial services client.",
    pmAngle:
      "I traced the full analyst workflow before expanding scope. Surfacing a signal is step one. The product question is always who do we contact and do they fit our criteria? The platform architecture follows that sequence.",
    outcome:
      "Production deployment with multi-source signal ingestion, automated enrichment, and live CRM activity monitoring. ~$215K annual GTM stack cost reduction (Kinage · regulated financial services client).",
    features: [
      "Ranked signal feed with source trust weighting",
      "Event-driven contact enrichment on CRM changes",
      "AI-assisted fit classification with re-classification on updates",
      "Decoupled backend with validated API contracts",
      "Filtered analyst notifications based on interrupt criteria",
      "Live activity feed across enrichment and classification events",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "HubSpot", "Clay", "HeyReach", "Claude API", "OpenAI API", "Webhooks", "Vercel"],
    github: "https://github.com/Omodunjo11/enterprise-gtm-platform",
    githubPrivate: true,
    featured: true,
    status: "built" as const,
  },
  {
    slug: "regulatory-compliance-cockpit",
    name: "Regulatory Compliance Cockpit",
    role: "AI Product · RegTech Compliance Operations",
    year: "2026",
    lang: "TypeScript",
    category: ["ai", "fullstack"],
    tagline: "Mission control for compliance officers: detect regulatory drift in live disclosures, triage violations, and drive remediation before a regulator does.",
    overview:
      "Regulatory drift is when a legal disclosure template, fee schedule, or customer notice gets quietly edited in ways that violate CFPB, RESPA, TILA, ECOA, or CAN-SPAM obligations. These silent changes can expose a firm to multi-million dollar enforcement actions. This prototype answers one question: how do you detect the moment a compliance obligation is no longer satisfied, surface it to the right owner, and drive resolution before a regulator does? Built as a full-product SaaS prototype with 6+ views, mock enforcement scenarios, and production-quality UX on Next.js 16.",
    objectives: [
      {
        title: "Live Risk Cockpit",
        description: "Surface the highest-severity open compliance event in real time with exposure estimate, SLA breach status, assigned owner, and evidence gaps in a single command view.",
      },
      {
        title: "Obligation Traceability Graph",
        description: "Trace the chain Regulation to Obligation to Asset to Owner so compliance officers see exactly why a drift event is a violation, not just that something changed.",
      },
      {
        title: "Monitoring + Response Workspace",
        description: "Real-time alert feed from scanning disclosure templates across source systems (CMS, e-signature, email platforms) with per-event remediation: assign owner, attach evidence, run checklist, track resolution.",
      },
      {
        title: "Exam Simulation + Market Intel",
        description: "Simulate regulator audit readiness against current documentation. Surface peer enforcement actions for the same violation type currently open internally.",
      },
    ],
    methodology: [
      {
        title: "Workflow-First UI Design",
        description: "Mapped compliance officer triage flow before building views: cockpit banner, expandable events feed, breakdown deep-dive, response workspace. Context-driven drawer system keeps officers in flow without page navigation.",
      },
      {
        title: "Regulatory Citation Modelling",
        description: "Modelled real regulatory citations with accurate obligation structures and enforcement scenarios in mock data. Fragility signals flag obligations that have failed multiple times as structural root causes.",
      },
      {
        title: "Business Unit Risk Scoring",
        description: "Per-business-unit risk scorecards with delta trending and top risk driver attribution so leadership sees concentration, not just individual events.",
      },
      {
        title: "AI-Era Compliance Gap",
        description: "Designed around the emerging obligation to keep AI model disclosures current with model versions as lenders deploy AI-driven credit decisions and adverse action notices.",
      },
    ],
    sections: [
      {
        title: "Why This Is Not a News Aggregator",
        body: "A news aggregator tells you what happened. This cockpit tells you what to do about it: which obligation is violated, which asset drifted, who owns remediation, whether evidence exists, and whether peer firms were fined for the same issue. The product is the workflow from detection to resolution, not the feed of regulatory updates.",
      },
      {
        title: "The Obligation Graph",
        body: "Every compliance event traces through Regulation to Obligation to Asset to Owner. When a disclosure template in Salesforce CMS drifts from its approved version, the system shows the specific regulatory citation, the obligation text, the template diff, and the responsible owner. Compliance officers do not hunt through documents. They act on structured violations with evidence packs attached.",
      },
    ],
    problem:
      "Compliance teams at financial institutions miss regulatory drift because disclosure templates, fee schedules, and customer notices change silently across CMS, e-signature, and email systems. A missed obligation can become a multi-million dollar enforcement action.",
    what:
      "A regulatory compliance intelligence cockpit prototype: live risk banner, compliance events feed, obligation graph, monitoring feed, business unit risk scores, peer enforcement intelligence, fragility signals, exam simulation, and per-event response workspace. Six views, mock-data-driven, production UX.",
    pmAngle:
      "I designed around the compliance officer's actual triage loop, not a developer console. The drawer-based deep-dive keeps officers in context. Exam simulation and peer enforcement intel answer the question every officer asks after a violation surfaces: how bad could this get?",
    outcome:
      "Full-product RegTech prototype with 6+ views, obligation traceability graph, and live deployment on Vercel. Workflow patterns informed by Kinage bank compliance work (22%→50% precision, ~$600K annual savings at a top-10 U.S. bank) — this repo is a standalone prototype, not the production Kinage system.",
    features: [
      "Live risk banner with exposure estimate and SLA breach status",
      "Compliance events feed with regulation citation and customer impact",
      "Obligation graph: Regulation to Obligation to Asset to Owner",
      "Real-time monitoring feed across CMS, e-signature, and email sources",
      "Business unit risk scorecards with delta trending",
      "Peer enforcement intelligence and fragility signals",
      "Exam simulation and per-event response workspace with evidence packs",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Salesforce CMS", "Framer Motion", "Vercel"],
    github: "https://github.com/Omodunjo11/regulatory-compliance-cockpit",
    githubPrivate: true,
    live: `${SITE_URL}/demo/regulatory`,
    featured: true,
    status: "live" as const,
  },
  {
    slug: "transcript-intelligence",
    name: "Transcript Intelligence",
    role: "AI Automation · Sales Intelligence Pipeline",
    year: "2026",
    lang: "Python",
    category: ["ai", "automation"],
    tagline: "Production AI pipeline that turns sales call transcripts into structured CRM records within minutes of a call ending, zero manual steps.",
    overview:
      "A B2B fintech startup in elder care financial management was running discovery calls with daily money managers and elder care professionals, a specialized high-trust buyer segment. Auto-generated meeting transcripts piled up in Google Drive with no systematic extraction of pain points, commitments, or follow-ups. I built a production pipeline that watches Drive for new transcripts, analyzes each with Claude or GPT-4.1, extracts structured intelligence, writes formatted summaries back to Drive, and syncs records to Fibery as CRM-quality call summaries.",
    objectives: [
      {
        title: "End-to-End Automation",
        description: "Drive folder watcher triggers analysis on each new transcript automatically. No human initiation. Idempotent processed-files tracking prevents duplicate runs.",
      },
      {
        title: "Schema-Constrained Extraction",
        description: "Structured prompt extracts three intelligence types on every call: insights, pain points, and next steps. Regex-based section parser handles model output format with fallback for empty sections.",
      },
      {
        title: "Dual-Provider LLM",
        description: "Config-switchable between Claude Sonnet and GPT-4.1 via single env flag. Both providers retry 3x with exponential backoff. Token usage logged per run for cost tracking.",
      },
      {
        title: "Fibery GTM Sync",
        description: "Custom HTTP client against Fibery commands and documents APIs pushes structured call data to GTM workspace. Handles Token and Bearer auth fallback for rich-text fields.",
      },
    ],
    methodology: [
      {
        title: "Schema Before Prompt",
        description: "Defined what the sales team needs from a call summary to act within 24 hours before writing any prompt engineering. LLM constrained to that format, not left to summarize freely.",
      },
      {
        title: "Production Reliability",
        description: "Idempotent file tracking, retry-with-backoff on LLM calls, filename regex filtering, local-folder dev mode without Google OAuth, and pytest suite for parsing and DOCX extraction.",
      },
      {
        title: "Drive API Integration",
        description: "Polls Drive for new files, downloads via native Google Docs export or DOCX, writes formatted output back with consistent section ordering and heading hierarchy.",
      },
      {
        title: "Domain-Specific Prompting",
        description: "Prompt engineered for elder care fintech discovery conversations in a high-trust buyer segment, not generic meeting summaries.",
      },
    ],
    sections: [
      {
        title: "Why Schema-First Matters",
        body: "Prompting the model to summarize a meeting produces output that feels thorough but is impossible to act on because every summary is structured differently. The schema-first approach means every output answers the same questions in the same order: What insights emerged? What pain points came up? Who owns what next step? Sales teams scan it in 90 seconds and Fibery gets a consistent record.",
      },
      {
        title: "Built for Unattended Operation",
        body: "This was not a demo. The sales team had to rely on outputs in Fibery without checking whether the pipeline ran. That meant idempotent processing, structured logging, dual-provider failover, and local dev mode for offline testing. Production AI automation fails when the happy path works but edge cases silently drop files.",
      },
    ],
    problem:
      "Sales discovery call transcripts were piling up in Google Drive with no structured extraction. Pain points, commitments, and follow-ups were getting lost between the call ending and the CRM being updated.",
    what:
      "A Python pipeline connecting Google Drive to Claude/GPT-4.1 to Fibery. Watches for new transcripts, extracts insights/pain points/next steps, writes formatted Google Docs, and syncs structured records to a GTM workspace with zero manual steps.",
    pmAngle:
      "I designed the output schema from the sales team's actual workflow, not from what the LLM naturally produces. The pipeline is only as valuable as the structure it enforces on unstructured conversation data.",
    outcome:
      "Production pipeline running unattended with dual LLM providers, Fibery sync, and idempotent Drive processing. Structured call intelligence synced to CRM with zero manual steps.",
    features: [
      "Google Drive folder watcher with regex filename filtering",
      "Claude Sonnet + GPT-4.1 with config-switchable provider",
      "Structured extraction: insights, pain points, next steps",
      "Formatted Google Doc output written back to Drive",
      "Fibery GTM workspace sync via custom API client",
      "Idempotent processing, retry-with-backoff, local dev mode, pytest suite",
    ],
    stack: ["Python", "Claude API", "OpenAI API", "Google Drive API", "Google Docs API", "Fibery API", "pytest"],
    github: "https://github.com/Omodunjo11/transcript-intelligence-pipeline",
    githubPrivate: true,
    featured: true,
    status: "built" as const,
  },
  {
    slug: "llm-reliability",
    name: "LLM System Reliability",
    role: "AI Engineering · RAG Trust Layer",
    year: "2026",
    lang: "Python",
    category: ["ai", "systems"],
    tagline: "Hand-rolled RAG pipeline from scratch: grounded retrieval, confidence scoring, and graceful abstention when evidence is insufficient.",
    overview:
      "LLMs confidently hallucinate when they lack reliable source material. Most teams bolt on LangChain and hope for the best. This project implements the three reliability primitives of a production LLM pipeline from scratch with zero ML framework dependency: grounded retrieval over authoritative documents, confidence scoring before generation, and explicit abstention when confidence falls below threshold. An engineering study in when an AI system should say I do not know.",
    objectives: [
      {
        title: "Grounded Retrieval",
        description: "Keyword search over a curated document corpus. Generation only proceeds from retrieved, authoritative content, not model memory.",
      },
      {
        title: "Confidence Scoring + Abstention Gate",
        description: "Score confidence as min(1.0, len(results) x 0.4). Below 0.5 threshold, refuse to answer rather than guess. The abstention gate is a core production reliability requirement.",
      },
      {
        title: "Conditional Generation",
        description: "When confidence clears threshold, synthesize answer strictly from retrieved documents via a dedicated generation module.",
      },
      {
        title: "Faithfulness Evaluation",
        description: "Measure answer-to-context word overlap as a faithfulness score. Demonstrates awareness of hallucination detection without external eval frameworks.",
      },
    ],
    methodology: [
      {
        title: "Modular Pipeline Design",
        description: "Four independent modules: retrieval.py, abstention.py, generation.py, evaluation.py. Each swappable without breaking the pipeline. Any retrieval backend (vector DB, BM25, hybrid) can slot in later.",
      },
      {
        title: "No Framework Dependency",
        description: "Pure Python stdlib plus JSON document store. Built to prove understanding of the trust layer, not to call LangChain wrappers.",
      },
      {
        title: "Confidence Calibration",
        description: "Tuned abstention threshold against sample queries where insufficient evidence should produce refusal, not confident wrong answers.",
      },
      {
        title: "Faithfulness as Proxy Metric",
        description: "Word-overlap faithfulness score between generated answer and retrieved context as a lightweight hallucination detector for the prototype stage.",
      },
    ],
    sections: [
      {
        title: "When Should an AI Say I Do Not Know",
        body: "Consumer AI optimizes for helpfulness. Production AI in regulated contexts must optimize for correctness under uncertainty. The abstention gate is the difference between a system that admits insufficient evidence and one that fabricates an answer with full confidence. This project makes that gate explicit, measurable, and configurable rather than buried inside a framework default.",
      },
      {
        title: "The Pipeline",
        body: "User query enters retrieval.py for keyword search over sample_docs.json. abstention.py scores confidence from result count. Below 0.5, the system abstains. Above 0.5, generation.py synthesizes from retrieved docs only. evaluation.py computes faithfulness as word overlap between answer and context divided by answer length. Each stage is independently testable and replaceable.",
      },
    ],
    problem:
      "Production LLM deployments fail when models answer confidently without sufficient evidence. Most teams discover this in post-mortems, not at design time.",
    what:
      "A minimal hand-rolled RAG system in Python: retrieval, confidence estimation, conditional generation, and faithfulness evaluation. No LangChain. Four swappable modules proving the trust layer above the model.",
    pmAngle:
      "I built this from scratch because specifying RAG systems for regulated clients requires understanding what happens when retrieval returns nothing. The abstention gate is a product decision disguised as an engineering detail.",
    outcome:
      "Complete four-stage RAG pipeline with abstention gate and faithfulness evaluator, zero framework dependencies.",
    features: [
      "Keyword retrieval over curated document corpus",
      "Confidence scoring with configurable abstention threshold",
      "Conditional generation from retrieved context only",
      "Faithfulness evaluator measuring answer-to-context overlap",
      "Modular architecture: retrieval, abstention, generation, evaluation",
    ],
    stack: ["Python", "Embeddings", "Vector Retrieval", "RAG", "Abstention Gate", "Faithfulness Eval"],
    github: "https://github.com/Omodunjo11/llm-system-reliability",
    status: "built" as const,
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
      "Benchmarked flat vs IVF search across 10K-1M vectors with concrete sub-10ms latency thresholds at 1536d.",
    features: [
      "Vector similarity search implementation in C++",
      "Index construction and query routing from scratch",
      "Latency benchmarking across index configurations",
      "Performance comparison across search strategies",
    ],
    stack: ["C++", "FAISS", "HNSW", "IVF", "ANN", "Vector Search"],
    github: "https://github.com/Omodunjo11/ai-retrieval-core-cpp",
    status: "built" as const,
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
      "Opinionated incident UI built from 14 post-mortems, validated in tabletop simulations with the engineering team.",
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
      "90-day failure log produced a trust-scoring framework mapping action categories to autonomy levels.",
    features: [
      "Task orchestration across personal and professional workflows",
      "Context-aware response generation",
      "Human-in-the-loop design for high-stakes actions",
      "Failure mode documentation and guardrail design",
    ],
    stack: ["Python", "Claude API", "Tool Calling", "AI Agents", "Automation"],
    github: "https://github.com/Omodunjo11/Personal-Assistant-",
    status: "built" as const,
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
      "Delivery lifecycle tracking with bounce handling and dead-letter queue for messages exceeding retry budget.",
    features: [
      "Mailgun integration for transactional email",
      "Push notification delivery across channels",
      "Failure detection and retry logic",
      "Delivery observability built in from the start",
    ],
    stack: ["Node.js", "Mailgun API", "Webhooks", "Dead-letter Queue", "Idempotency", "Push Notifications"],
    github: "https://github.com/Omodunjo11/Mailgun-Push",
    status: "built" as const,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const featuredProjects = projects.filter((p) => p.featured)
