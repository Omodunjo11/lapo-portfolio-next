import type { Metadata } from "next"
import { CANONICAL_NAME, CONTACT_EMAIL, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = `Connect · ${CANONICAL_NAME}`
const description = `Get in touch with ${LEGAL_NAME}. Open to AI Strategist, Deployment Strategist, and AI PM roles. ${CONTACT_EMAIL} — building at the intersection of AI product and regulated infrastructure.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/connect` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/connect`,
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

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
