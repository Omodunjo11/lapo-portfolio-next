import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `How I Build AI Products · ${CANONICAL_NAME}`,
  description: `How ${LEGAL_NAME} (${CANONICAL_NAME}) designs production AI systems — RAG, confidence routing, human-in-the-loop, and regulated deployment.`,
}

export default function HowIBuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
