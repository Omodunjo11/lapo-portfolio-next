import { redirect } from "next/navigation"

const REGULATORY_DEMO_URL = "https://glean-regulatory-updated.vercel.app"

export function GET() {
  redirect(REGULATORY_DEMO_URL)
}
