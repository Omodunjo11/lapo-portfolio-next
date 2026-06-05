import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Writing · Lapo Odunjo",
  description: "Essays on identity, economics, AI governance, diaspora, and building products from the African continent. Published on Medium.",
}

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
