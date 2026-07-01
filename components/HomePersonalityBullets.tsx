"use client"

import { useState } from "react"
import { PERSONAL_BULLETS, PERSONAL_BULLETS_VISIBLE_COUNT } from "@/lib/personal"

export default function HomePersonalityBullets() {
  const [expanded, setExpanded] = useState(false)
  const hidden = PERSONAL_BULLETS.length > PERSONAL_BULLETS_VISIBLE_COUNT
  const visible = expanded
    ? PERSONAL_BULLETS
    : PERSONAL_BULLETS.slice(0, PERSONAL_BULLETS_VISIBLE_COUNT)

  return (
    <>
      <ul className="home-personality__bullets">
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {hidden ? (
        <button
          type="button"
          className="home-personality__more"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
        >
          {expanded ? "▾ show less" : "▸ show more"}
        </button>
      ) : null}
    </>
  )
}
