import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Projects · ${CANONICAL_NAME}`,
  description: `Projects by ${LEGAL_NAME} (${CANONICAL_NAME}, Michael Odunjo) — AI systems, fintech, RegTech, and production software. Kinage, KOVA, and more.`,
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
