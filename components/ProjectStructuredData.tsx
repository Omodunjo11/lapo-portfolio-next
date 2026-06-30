import { projectSchema } from "@/lib/structured-data"
import type { Project } from "@/lib/projects"
import JsonLd from "@/components/JsonLd"

export default function ProjectStructuredData({ project }: { project: Project }) {
  return <JsonLd data={projectSchema(project)} />
}
