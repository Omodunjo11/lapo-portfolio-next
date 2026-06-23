import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Writing · ${CANONICAL_NAME}`,
  description: `Essays by ${LEGAL_NAME} (${CANONICAL_NAME}) on identity, economics, diaspora, and AI. Published on Medium by Onaolapo Odunjo.`,
}

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
