/** Hero / case-study imagery keyed by project slug. */
export const PROJECT_HERO_IMAGES: Record<string, string> = {
  "kova-bot": "/images/hero/hero-card-fintech.png",
  "gtm-intelligence-platform": "/images/hero/hero-card-enterprise.png",
  "regulatory-compliance-cockpit": "/images/hero/hero-card-enterprise.png",
  "transcript-intelligence": "/images/hero/hero-card-enterprise.png",
  "llm-reliability": "/images/hero/hero-card-enterprise.png",
  "ai-retrieval-core": "/images/hero/hero-card-fintech.png",
  "incident-command": "/images/hero/hero-card-enterprise.png",
  "personal-assistant": "/images/hero/hero-card-enterprise.png",
  "mailgun-push": "/images/hero/hero-card-fintech.png",
}

export function getProjectHeroImage(slug: string): string | undefined {
  return PROJECT_HERO_IMAGES[slug]
}
