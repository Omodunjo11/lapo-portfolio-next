import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: `Experience · ${CANONICAL_NAME}`,
  description: `${LEGAL_NAME} (${CANONICAL_NAME}) — Forward Deployed Product Manager at Kinage. Amazon, TD Bank, Capital One. Wharton MBA. Production AI for regulated industries.`,
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
