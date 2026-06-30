import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Connect · ${CANONICAL_NAME}`,
  description: `Get in touch with ${LEGAL_NAME}. Open to AI Strategist, Deployment Strategist, and AI PM roles. Building at the intersection of AI product and regulated infrastructure.`,
}

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
