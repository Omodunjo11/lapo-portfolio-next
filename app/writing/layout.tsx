import type { Metadata } from "next"
import { CANONICAL_NAME, LEGAL_NAME, SITE_URL } from "@/lib/site"
import { essays } from "@/lib/writing"
import { writingItemListSchema } from "@/lib/structured-data"
import JsonLd from "@/components/JsonLd"

const title = `Writing · ${CANONICAL_NAME}`
const description = `Essays by ${LEGAL_NAME} on identity, economics, diaspora, and the shape of AI in emerging markets. Published on Medium.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/writing` },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}/writing`,
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

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={writingItemListSchema(essays)} />
      {children}
    </>
  )
}
