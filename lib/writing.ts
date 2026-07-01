import { SITE_URL } from "@/lib/site"

export type Essay = {
  slug: string
  category: string
  title: string
  description: string
  url: string
  year: string
  onSite?: boolean
  readingTime?: string
}

export const FEATURED_ESSAY_SLUG = "the-bottleneck-was-never-the-model"

export const essays: Essay[] = [
  {
    slug: FEATURED_ESSAY_SLUG,
    category: "Essay · AI & Adoption",
    title: "The Bottleneck Was Never the Model",
    description:
      "Two nameplates, one person, and what hospital nurses taught me about AI adoption. Lagos to Wharton to production deploys.",
    url: `${SITE_URL}/writing/${FEATURED_ESSAY_SLUG}`,
    year: "2026",
    onSite: true,
    readingTime: "8 min",
  },
  {
    slug: "life-of-many-lives",
    category: "Essay · Identity",
    title: "A Life of Many Lives: My Endless New Beginnings",
    description: "Reinvention is not a phase. It is the only stable strategy in an unstable life.",
    url: "https://odunjoonaolapo.medium.com/a-life-of-many-lives-my-endless-new-beginnings-2f6fa96c3411",
    year: "2024",
  },
  {
    slug: "love-and-capitalism",
    category: "Essay · Economics",
    title: "Love and Capitalism",
    description: "Capitalism does not just shape markets. It quietly rewrites how we form and measure relationships.",
    url: "https://odunjoonaolapo.medium.com/love-and-capitalism-385b73f043b4",
    year: "2024",
  },
  {
    slug: "embracing-the-chaos",
    category: "Essay · Burnout",
    title: "Embracing the Chaos: Burnout, Change, and the Craving for Stability",
    description: "Burnout is not just overwork. It is what happens when constant change becomes your baseline.",
    url: "https://odunjoonaolapo.medium.com/embracing-the-chaos-the-toxic-struggle-between-burnout-change-and-the-craving-for-stability-a88dd2b90ef9",
    year: "2024",
  },
  {
    slug: "echoes-of-home",
    category: "Essay · Diaspora",
    title: "Echoes of Home: Gratitude and Longing in the Diaspora",
    description: "Gratitude and homesickness are not opposites. They compound.",
    url: "https://odunjoonaolapo.medium.com/echoes-of-home-navigating-gratitude-and-longing-in-the-diaspora-14127684fd17",
    year: "2024",
  },
]

export function getEssay(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug)
}

export function getOnSiteEssays(): Essay[] {
  return essays.filter((e) => e.onSite)
}

export function getMediumEssays(): Essay[] {
  return essays.filter((e) => !e.onSite)
}
