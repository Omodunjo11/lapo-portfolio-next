import { notFound } from "next/navigation"
import { getProject, projects } from "@/lib/projects"
import { CANONICAL_NAME, SITE_URL } from "@/lib/site"
import ProjectDetail from "@/components/ProjectDetail"

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: "Project Not Found" }

  const title = `${project.name} · ${CANONICAL_NAME}`
  const description = project.tagline

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/projects/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/projects/${slug}`,
      siteName: CANONICAL_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@Modunjo",
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const prev = projects[currentIndex - 1]
  const next = projects[currentIndex + 1]

  return (
    <ProjectDetail
      project={project}
      prev={prev ? { slug: prev.slug, name: prev.name } : undefined}
      next={next ? { slug: next.slug, name: next.name } : undefined}
    />
  )
}
