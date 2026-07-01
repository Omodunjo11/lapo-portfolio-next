import {
  CANONICAL_NAME,
  CONTACT_EMAIL,
  LEGAL_NAME,
  NAME_ALIASES,
  ROLE_TITLE,
  SAME_AS_PROFILES,
  SEO_DESCRIPTION,
  SITE_URL,
} from "@/lib/site"
import type { Essay } from "@/lib/writing"
import type { Project } from "@/lib/projects"

export function personSchema() {
  return {
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
    homeLocation: {
      "@type": "Place",
      name: "New York, NY",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
    nationality: { "@type": "Country", name: "Nigeria" },
    sameAs: [...SAME_AS_PROFILES],
    knowsAbout: [
      "Artificial Intelligence",
      "Product Management",
      "Regulated Industries",
      "Fintech",
      "Private Markets",
      "Healthcare AI",
      "RAG Systems",
      "LLM Evaluation",
      "Agentic Workflows",
      "Credit Infrastructure",
      "Compliance Automation",
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
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: `${CANONICAL_NAME}, Portfolio`,
    alternateName: NAME_ALIASES,
    url: SITE_URL,
    description: SEO_DESCRIPTION,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  }
}

export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${CANONICAL_NAME}, Official Portfolio`,
    description: SEO_DESCRIPTION,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  }
}

export function projectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/projects/${project.slug}#project`,
    name: project.name,
    headline: project.tagline,
    description: project.overview,
    url: `${SITE_URL}/projects/${project.slug}`,
    datePublished: project.year,
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    keywords: project.stack.join(", "),
    genre: project.category.join(", "),
    ...(project.live ? { sameAs: project.live } : {}),
  }
}

export function writingItemListSchema(essays: Essay[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/writing#essays`,
    name: `Essays by ${CANONICAL_NAME}`,
    description: `Long-form writing by ${LEGAL_NAME} on identity, economics, diaspora, and AI in emerging markets.`,
    numberOfItems: essays.length,
    itemListElement: essays.map((essay, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        headline: essay.title,
        description: essay.description,
        url: essay.url,
        author: { "@id": `${SITE_URL}/#person` },
        datePublished: essay.year,
        publisher: { "@type": "Organization", name: "Medium" },
      },
    })),
  }
}

export function jsonLdScript(data: object | object[]) {
  return JSON.stringify(data)
}
