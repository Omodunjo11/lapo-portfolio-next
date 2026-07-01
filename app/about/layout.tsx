import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = "About"
const socialTitle = `${title} · ${CANONICAL_NAME}`
const description = `${LEGAL_NAME}, Lagos to New York. Chemical engineer turned AI product manager. Wharton MBA. Building AI systems that work in production.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: socialTitle,
    description,
    url: `${SITE_URL}/about`,
    siteName: CANONICAL_NAME,
    locale: "en_US",
    type: "profile",
    firstName: "Onaolapo",
    lastName: "Odunjo",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
