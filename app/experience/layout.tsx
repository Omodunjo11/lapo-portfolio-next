import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = `Experience · ${CANONICAL_NAME}`
const description = `${LEGAL_NAME} — Forward Deployed PM at Kinage, Amazon, TD Bank, Capital One. Wharton MBA. 10+ years shipping AI and data products in regulated industries.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/experience` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/experience`,
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

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
