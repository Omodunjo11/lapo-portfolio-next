import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects · Lapo Odunjo",
  description: "AI systems I've built from scratch — semantic intelligence pipelines, behavioral credit infrastructure, LLM evaluation frameworks, and agentic workflow architecture for regulated industries.",
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
