/** Hero / case-study imagery keyed by project slug. */
export const PROJECT_HERO_IMAGES: Record<string, string> = {
  "kova-bot": "/images/hero/hero-card-fintech.png",
  "gtm-intelligence-platform": "/images/hero/hero-card-enterprise.png",
  "regulatory-compliance-cockpit": "/images/hero/hero-card-healthcare.png",
  "transcript-intelligence": "/images/hero/hero-card-enterprise.png",
  "llm-reliability": "/images/hero/hero-card-enterprise.png",
  "ai-retrieval-core": "/images/hero/hero-card-fintech.png",
}

export function getProjectHeroImage(slug: string): string | undefined {
  return PROJECT_HERO_IMAGES[slug]
}
