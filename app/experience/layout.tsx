import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Experience · Lapo Odunjo",
  description: "Forward Deployed Product Manager at Kinage. Previously Amazon, TD Bank, Capital One. Wharton MBA. Building production AI systems for regulated financial industries.",
}

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
