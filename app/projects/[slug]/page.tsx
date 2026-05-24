import { notFound } from "next/navigation"
import { getProject, projects } from "@/lib/projects"
import ProjectDetail from "@/components/ProjectDetail"

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  return { title: project ? `${project.name}, Lapo Odunjo` : "Project Not Found" }
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
