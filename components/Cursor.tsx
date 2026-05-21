"use client"
import { useEffect } from "react"

export default function Cursor() {
  useEffect(() => {
    const cur = document.getElementById("cursor")
    const ring = document.getElementById("cursor-ring")
    const bar = document.getElementById("bar")

    const onMove = (e: MouseEvent) => {
      if (cur) { cur.style.left = e.clientX + "px"; cur.style.top = e.clientY + "px" }
      if (ring) { ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px" }
    }
    const onScroll = () => {
      if (bar) {
        const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        bar.style.width = pct + "%"
      }
    }

    document.addEventListener("mousemove", onMove)
    window.addEventListener("scroll", onScroll)
    return () => {
      document.removeEventListener("mousemove", onMove)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <>
      <div id="cursor" />
      <div id="cursor-ring" />
      <div id="bar" />
    </>
  )
}
