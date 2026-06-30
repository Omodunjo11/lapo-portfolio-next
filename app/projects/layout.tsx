import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = `Projects · ${CANONICAL_NAME}`
const description = `${LEGAL_NAME} — 11 AI products shipped end-to-end. Fintech credit infrastructure, enterprise compliance AI, GTM automation, and LLM reliability systems. TypeScript, Python, Claude API.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/projects`,
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

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
