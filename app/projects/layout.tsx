import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Projects · ${CANONICAL_NAME}`,
  description: `${LEGAL_NAME} — 11 AI products shipped end-to-end. Fintech credit infrastructure, enterprise compliance AI, GTM automation, LLM reliability systems. TypeScript, Python, Claude API.`,
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
