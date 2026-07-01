import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/Reveal"
import type { PersonalPhoto } from "@/lib/personal"

type Props = {
  photos: PersonalPhoto[]
  label?: string
  linkHref?: string
  linkLabel?: string
  delay?: number
  compact?: boolean
  layout?: "scroll" | "grid"
  inset?: boolean
  polaroid?: boolean
}

export default function HomeLifeStrip({
  photos,
  label,
  linkHref = "/about",
  linkLabel = "More on About →",
  delay = 0,
  compact = false,
  layout = "scroll",
  inset = false,
  polaroid = false,
}: Props) {
  if (photos.length === 0) return null

  const usePolaroid = polaroid || photos.every((p) => p.variant === "polaroid")

  const stripClass = [
    "home-life-strip",
    compact && "home-life-strip--compact",
    layout === "grid" && "home-life-strip--grid",
    layout === "grid" && usePolaroid && "home-life-strip--polaroid-grid",
    inset && "home-life-strip--inset",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Reveal delay={delay}>
      <div className={stripClass}>
        {(label || linkHref) && (
          <div className="home-life-strip__header">
            {label ? <p className="home-life-strip__label">{label}</p> : <span />}
            {linkHref ? (
              <Link href={linkHref} className="home-personality__link">
                {linkLabel}
              </Link>
            ) : null}
          </div>
        )}
        <div className="home-life-strip__track">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={`home-life-strip__card${usePolaroid ? " home-life-strip__card--polaroid" : ""} home-life-strip__card--${i + 1}`}
            >
              {usePolaroid ? (
                <div className="home-life-strip__polaroid">
                  <div className="home-life-strip__polaroid-media">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 42vw, 190px"
                      className="home-life-strip__img"
                    />
                  </div>
                </div>
              ) : (
                <div className="home-life-strip__frame">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="240px"
                    className="home-life-strip__img"
                  />
                </div>
              )}
              <figcaption className="home-life-strip__caption">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Reveal>
  )
}
