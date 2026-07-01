import Link from "next/link"
import type { EssayBlock } from "@/lib/essay-content"
import type { Essay } from "@/lib/writing"

type Props = {
  essay: Essay
  blocks: EssayBlock[]
}

export default function EssayArticle({ essay, blocks }: Props) {
  return (
    <article className="essay-article">
      <header className="essay-article__header pad-page">
        <Link href="/writing" className="essay-article__back">
          ← All writing
        </Link>
        <p className="essay-article__meta">
          <span>{essay.category}</span>
          <span>{essay.year}</span>
          {essay.readingTime ? <span>{essay.readingTime} read</span> : null}
        </p>
        <h1 className="essay-article__title">{essay.title}</h1>
        <p className="essay-article__deck">{essay.description}</p>
      </header>

      <div className="essay-article__body pad-page">
        {blocks.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2 key={i} className="essay-article__h2">
                {block.text}
              </h2>
            )
          }
          if (block.type === "pull") {
            return (
              <blockquote key={i} className="essay-article__pull">
                {block.text}
              </blockquote>
            )
          }
          return (
            <p key={i} className="essay-article__p">
              {block.text}
            </p>
          )
        })}
      </div>

      <footer className="essay-article__footer pad-page">
        <p className="essay-article__footer-note">
          Published on lapoodunjo.com · More essays on{" "}
          <Link href="/writing">Writing</Link>
        </p>
      </footer>
    </article>
  )
}
