import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How I Build AI Products · Lapo Odunjo",
  description: "11 principles from building production AI systems — systems thinking, retrieval quality, confidence routing, evaluation strategy, and the V1/V2/V3 sequencing most teams get backwards.",
}

export default function HowIBuildLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
