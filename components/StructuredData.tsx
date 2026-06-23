import {
  CANONICAL_NAME,
  CONTACT_EMAIL,
  LEGAL_NAME,
  NAME_ALIASES,
  PROFILE_LINKS,
  ROLE_TITLE,
  SAME_AS_PROFILES,
  SEO_DESCRIPTION,
  SITE_URL,
} from "@/lib/site"

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: LEGAL_NAME,
  alternateName: NAME_ALIASES.filter((name) => name !== LEGAL_NAME),
  givenName: "Onaolapo",
  additionalName: "Michael",
  familyName: "Odunjo",
  nickname: CANONICAL_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/IMG_3437.jpg`,
  email: CONTACT_EMAIL,
  jobTitle: ROLE_TITLE,
  description: SEO_DESCRIPTION,
  sameAs: [...SAME_AS_PROFILES],
  knowsAbout: [
    "Artificial Intelligence",
    "Product Management",
    "Regulated Industries",
    "Fintech",
    "Private Markets",
    "RAG Systems",
    "LLM Evaluation",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "The Wharton School, University of Pennsylvania" },
    { "@type": "CollegeOrUniversity", name: "Columbia University" },
    { "@type": "CollegeOrUniversity", name: "University of Bradford" },
  ],
  worksFor: [
    { "@type": "Organization", name: "Kinage" },
    { "@type": "Organization", name: "KOVA" },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: `${CANONICAL_NAME} — Portfolio`,
  alternateName: NAME_ALIASES,
  url: SITE_URL,
  description: SEO_DESCRIPTION,
  inLanguage: "en",
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
}

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: `${CANONICAL_NAME} — Official Portfolio`,
  description: SEO_DESCRIPTION,
  mainEntity: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
}

export default function StructuredData() {
  const graph = [personSchema, websiteSchema, profilePageSchema]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
