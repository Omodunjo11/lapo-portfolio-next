import { KINAGE_TAGLINE } from "@/lib/site"

export const HOME_TICKER = [
  { text: "Agentic Workflows", highlight: true },
  { text: "LLM Evaluation" },
  { text: "Regulated AI", highlight: true },
  { text: "WhatsApp Credit" },
  { text: "Confidence Routing", highlight: true },
  { text: "RAG Systems" },
  { text: "Fintech Infrastructure", highlight: true },
  { text: "Human-in-the-Loop" },
  { text: "Compliance Automation", highlight: true },
  { text: "TradeScore" },
] as const

export const HOME_CURRENTLY = [
  {
    org: "Kinage",
    role: "Forward Deployed PM · AI Strategy",
    description:
      `${KINAGE_TAGLINE.charAt(0).toUpperCase()}${KINAGE_TAGLINE.slice(1)}. Embedded with operators, shipping agentic workflows, and turning analyst overrides into production quality gates.`,
    href: "/experience",
    hrefLabel: "Kinage work →",
  },
  {
    org: "KOVA",
    role: "Co-Founder · Credit Infrastructure",
    description:
      "WhatsApp-native credit for Nigeria's informal economy. TradeScore, progressive lending, and collector vouching. 5K testers in the first two months.",
    href: "/projects/kova-bot",
    hrefLabel: "Case study →",
  },
] as const

export const HOME_PRINCIPLES = [
  {
    n: "06",
    tag: "Confidence Routing",
    title: "Confidence controls what happens next, not just what gets shown.",
    href: "/projects/llm-reliability",
  },
  {
    n: "07",
    tag: "Productive Refusal",
    title: "A system that knows when not to answer is more valuable than one that always does.",
    href: "/projects/llm-reliability",
  },
  {
    n: "09",
    tag: "Evaluation",
    title: "Accuracy is not enough. The metric depends on the cost of being wrong.",
    href: "/experience",
  },
] as const

export const HOME_CREDIBILITY = [
  "Kinage",
  "Amazon",
  "TD Bank",
  "Capital One",
  "Wharton MBA",
  "Columbia M.S.",
] as const

export const HOME_QUOTE = {
  text: "The bottleneck is trust, not accuracy. Designing for adoption under scrutiny is harder than improving benchmark numbers, and it is the one that actually matters.",
  source: "How I think about regulated AI",
} as const

export const HOME_ALONG_THE_WAY = [
  {
    org: "Wharton Graduate Association",
    role: "President",
    period: "2024 – 2026",
    note: "$6M annual budget · 1,700+ MBA students",
  },
  {
    org: "Goldman Sachs Community Builder Fellow",
    role: "Governance Strategy Lead",
    period: "2025",
    note: "Board governance framework for Philadelphia nonprofit College Together",
  },
  {
    org: "Trailblazer Fellowship",
    role: "Wharton MBA · 50% merit",
    period: "2024 – 2026",
    note: "Merit scholarship, The Wharton School",
  },
  {
    org: "Wharton Tech Club",
    role: "VP, Conferences",
    period: "2024 – 2026",
    note: "Programming for Wharton's largest student-run tech community",
  },
] as const
