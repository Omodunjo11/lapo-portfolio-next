import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `About · ${CANONICAL_NAME}`,
  description: `${LEGAL_NAME} — Lagos to New York. Chemical engineer turned AI product manager. Co-Founding CEO, Africa AI Leaders Fellowship. Wharton MBA. Building AI systems that work in production.`,
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
