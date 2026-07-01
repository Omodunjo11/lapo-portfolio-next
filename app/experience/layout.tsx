import type { Metadata } from "next"
import { CANONICAL_NAME, KINAGE_TAGLINE, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = "Experience"
const socialTitle = `${title} · ${CANONICAL_NAME}`
const description = `${LEGAL_NAME}, Forward Deployed PM at Kinage (${KINAGE_TAGLINE}). Amazon, TD Bank, Capital One. Wharton MBA. Production AI and regulated fintech product work.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/experience` },
  openGraph: {
    title: socialTitle,
    description,
    url: `${SITE_URL}/experience`,
    siteName: CANONICAL_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle,
    description,
  },
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
