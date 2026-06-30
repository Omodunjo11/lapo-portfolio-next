export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lapoodunjo.com"

export const CANONICAL_NAME = "Lapo Odunjo"

export const LEGAL_NAME = "Onaolapo Michael Odunjo"

/** All public name variants — used in metadata, schema, and on-page identity. */
export const NAME_ALIASES = [
  "Lapo Odunjo",
  "Onaolapo Michael Odunjo",
  "Onaolapo Odunjo",
  "Michael Odunjo",
  "Onaolapo M. Odunjo",
] as const

export const ROLE_TITLE = "AI Product · Trust Systems & Regulated Infrastructure"

export const ROLE_META =
  "AI product leader building production trust systems for regulated industries. Kinage · KOVA · Amazon · TD Bank · Wharton MBA."

export const SEO_DESCRIPTION =
  "Lapo Odunjo (Onaolapo Michael Odunjo) — AI product leader building trust systems for regulated industries. Also known as Onaolapo Odunjo and Michael Odunjo. Kinage, KOVA, Amazon, TD Bank, Wharton MBA."

export const SEO_KEYWORDS = [
  ...NAME_ALIASES,
  "Lapo Odunjo portfolio",
  "Onaolapo Michael Odunjo LinkedIn",
  "Michael Odunjo AI",
  "Onaolapo Odunjo Wharton",
  "AI product manager",
  "regulated AI",
  "Kinage",
  "KOVA",
  "lapoodunjo.com",
]

export const INTENT_CTA =
  "Building Kinage & KOVA · Open to Staff AI PM roles & regulated-AI design partners"

export const CONTACT_EMAIL = "odunjoonaolapo@gmail.com"

export const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/onaolapomichaelodunjo",
  github: "https://github.com/Omodunjo11",
  medium: "https://medium.com/@odunjoonaolapo",
  twitter: "https://twitter.com/Modunjo",
  instagram: "https://www.instagram.com/alaye_omodunjo",
  goodreads: "https://www.goodreads.com/review/list/57964479",
  email: `mailto:${CONTACT_EMAIL}`,
  resume: `${SITE_URL}/resume.pdf`,
} as const

export const SAME_AS_PROFILES = [
  PROFILE_LINKS.linkedin,
  PROFILE_LINKS.github,
  PROFILE_LINKS.medium,
  PROFILE_LINKS.twitter,
  PROFILE_LINKS.instagram,
  PROFILE_LINKS.goodreads,
] as const

export const IDENTITY_LINE =
  "Onaolapo Michael Odunjo — also known as Lapo Odunjo, Onaolapo Odunjo, and Michael Odunjo"
