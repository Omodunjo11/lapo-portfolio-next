import type { Metadata } from "next"
import { CANONICAL_NAME, CONTACT_EMAIL, LEGAL_NAME, SITE_URL } from "@/lib/site"

const title = "Connect"
const socialTitle = `${title} · ${CANONICAL_NAME}`
const description = `Get in touch with ${LEGAL_NAME}. Open to Forward Deployed PM, AI PM, and Staff PM roles in regulated production. ${CONTACT_EMAIL}.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/connect` },
  openGraph: {
    title: socialTitle,
    description,
    url: `${SITE_URL}/connect`,
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

export default function ConnectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
