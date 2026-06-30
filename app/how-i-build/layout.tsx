import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = `How I Build AI Products · ${CANONICAL_NAME}`
const description = `${LEGAL_NAME}'s principles for building production AI — evaluation-first design, confidence routing, human-in-the-loop escalation, and trust infrastructure for regulated environments.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/how-i-build` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/how-i-build`,
    siteName: CANONICAL_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function HowIBuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
