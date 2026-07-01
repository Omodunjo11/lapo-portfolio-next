import { notFound } from "next/navigation"
import EssayArticle from "@/components/EssayArticle"
import { ESSAY_CONTENT } from "@/lib/essay-content"
import { CANONICAL_NAME, SITE_URL } from "@/lib/site"
import { essays, getEssay } from "@/lib/writing"

export async function generateStaticParams() {
  return essays.filter((e) => e.onSite).map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const essay = getEssay(slug)
  if (!essay?.onSite) return { title: "Essay Not Found" }

  const title = `${essay.title} · ${CANONICAL_NAME}`

  return {
    title,
    description: essay.description,
    alternates: { canonical: `${SITE_URL}/writing/${slug}` },
    openGraph: {
      title,
      description: essay.description,
      url: `${SITE_URL}/writing/${slug}`,
      siteName: CANONICAL_NAME,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: essay.description,
      creator: "@Modunjo",
    },
  }
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const essay = getEssay(slug)
  const blocks = ESSAY_CONTENT[slug]

  if (!essay?.onSite || !blocks) notFound()

  return <EssayArticle essay={essay} blocks={blocks} />
}
