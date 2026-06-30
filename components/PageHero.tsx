import type { ReactNode } from "react"

type PageHeroProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  variant?: "default" | "ink"
  size?: "default" | "tall" | "compact"
  narrow?: boolean
  children?: ReactNode
  className?: string
}

export default function PageHero({
  eyebrow,
  title,
  description,
  variant = "default",
  size = "default",
  narrow = false,
  children,
  className = "",
}: PageHeroProps) {
  const ink = variant === "ink"
  const classes = [
    "page-hero",
    ink && "page-hero--ink",
    size === "tall" && "page-hero--tall",
    size === "compact" && "page-hero--compact",
    narrow && "page-hero--narrow",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <header className={classes}>
      <p className={`page-hero-eyebrow${ink ? " page-hero-eyebrow--light" : ""}`}>{eyebrow}</p>
      <h1 className={`page-hero-title${ink ? " page-hero-title--light" : ""}`}>{title}</h1>
      {description ? (
        <p className={`page-hero-desc${ink ? " page-hero-desc--light" : ""}`}>{description}</p>
      ) : null}
      {children}
    </header>
  )
}
