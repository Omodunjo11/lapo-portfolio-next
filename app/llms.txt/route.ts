import { CANONICAL_NAME, LEGAL_NAME, PROFILE_LINKS, ROLE_TITLE, SITE_URL } from "@/lib/site"
import { projects } from "@/lib/projects"
import { essays } from "@/lib/writing"

export function GET() {
  const projectLines = projects.map((p) => `- [${p.name}](${SITE_URL}/projects/${p.slug}): ${p.tagline}`)
  const essayLines = essays.map((e) => `- [${e.title}](${e.url}): ${e.description}`)

  const body = `# ${CANONICAL_NAME}

> ${LEGAL_NAME}, ${ROLE_TITLE}

## About
${LEGAL_NAME} (Lapo Odunjo) builds production AI trust systems for regulated industries, healthcare, fintech, and enterprise compliance. Forward Deployed PM at Kinage. Co-founder of KOVA. Previously Amazon, TD Bank, Capital One. Wharton MBA.

## Site
- Homepage: ${SITE_URL}
- About: ${SITE_URL}/about
- Projects: ${SITE_URL}/projects
- Experience: ${SITE_URL}/experience
- How I Build: ${SITE_URL}/how-i-build
- Writing: ${SITE_URL}/writing
- Connect: ${SITE_URL}/connect

## Projects
${projectLines.join("\n")}

## Writing
${essayLines.join("\n")}

## Profiles
- LinkedIn: ${PROFILE_LINKS.linkedin}
- GitHub: ${PROFILE_LINKS.github}
- Medium: ${PROFILE_LINKS.medium}
- Twitter: ${PROFILE_LINKS.twitter}
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
