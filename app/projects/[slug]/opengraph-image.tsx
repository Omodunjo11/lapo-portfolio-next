import { ImageResponse } from "next/og"
import { getProject } from "@/lib/projects"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  const name = project?.name ?? "Project"
  const tagline = project?.tagline ?? "AI product case study"
  const role = project?.role ?? "AI Product"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0F172A 0%, #1e3a5f 50%, #2563EB 100%)",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: "0.24em", textTransform: "uppercase", opacity: 0.75 }}>
          {role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.03em" }}>{name}</div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "#BAE6FD", maxWidth: 900 }}>{tagline}</div>
        </div>
        <div style={{ fontSize: 22, color: "rgba(248,250,252,0.7)" }}>lapoodunjo.com · Lapo Odunjo</div>
      </div>
    ),
    { ...size },
  )
}
