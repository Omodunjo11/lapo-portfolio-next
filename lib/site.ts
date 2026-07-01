import {
  CONNECT_INTENT,
  HERO_OPERATOR_LINE,
  ROLE_META as POSITIONING_ROLE_META,
  TARGET_ROLES,
} from "@/lib/positioning"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lapoodunjo.com"

export const CANONICAL_NAME = "Lapo Odunjo"

export const LEGAL_NAME = "Onaolapo Michael (Lapo) Odunjo"

/** All public name variants, used in metadata, schema, and on-page identity. */
export const NAME_ALIASES = [
  "Lapo Odunjo",
  "Onaolapo Odunjo",
  "Onaolapo Michael Odunjo",
  "Onaolapo Michael (Lapo) Odunjo",
  "Michael Odunjo",
  "Onaolapo M. Odunjo",
] as const

export const ROLE_TITLE = "AI Product · Trust Systems & Regulated Infrastructure"

/** Consistent Kinage positioning, FDE PM for regulated clients, not a single product SKU. */
export const KINAGE_TAGLINE =
  "forward-deployed production AI for regulated healthcare and fintech clients"

export const ROLE_META = POSITIONING_ROLE_META

export const SEO_DESCRIPTION =
  `Onaolapo Michael (Lapo) Odunjo, ${POSITIONING_ROLE_META} Open to FDPM, AI PM, and Staff PM roles.`

export const SEO_KEYWORDS = [
  ...NAME_ALIASES,
  "Lapo Odunjo portfolio",
  "Onaolapo Michael Odunjo LinkedIn",
  "Michael Odunjo AI",
  "Onaolapo Odunjo Wharton",
  "AI product manager",
  "forward deployed PM",
  "FDPM",
  "Staff PM AI",
  "regulated AI",
  "Kinage",
  "KOVA",
  "lapoodunjo.com",
]

export const INTENT_CTA = TARGET_ROLES

export const HERO_HOSPITALITY_LINE = HERO_OPERATOR_LINE

export { CONNECT_INTENT }

export const CONTACT_EMAIL = "odunjoonaolapo@gmail.com"

export const CONTACT_PHONE = "+1-646-421-3781"

export const PROFILE_LINKS = {
  linkedin: "https://www.linkedin.com/in/onaolapomichaelodunjo",
  github: "https://github.com/Omodunjo11",
  medium: "https://medium.com/@odunjoonaolapo",
  twitter: "https://twitter.com/Modunjo",
  instagram: "https://www.instagram.com/alaye_omodunjo",
  goodreads: "https://www.goodreads.com/review/list/57964479",
  email: `mailto:${CONTACT_EMAIL}`,
  phone: "tel:+16464213781",
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
  "Onaolapo Michael (Lapo) Odunjo. Lapo is short for Onaolapo"
