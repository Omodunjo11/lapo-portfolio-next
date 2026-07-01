import Image from "next/image"
import Reveal from "@/components/Reveal"
import type { PersonalPhoto } from "@/lib/personal"

type Props = {
  photo: PersonalPhoto
  align?: "left" | "right" | "center"
  size?: "sm" | "md"
  delay?: number
}

export default function PersonalityAccent({
  photo,
  align = "right",
  size = "sm",
  delay = 0,
}: Props) {
  const polaroid = photo.variant === "polaroid"

  return (
    <Reveal delay={delay}>
      <figure
        className={`personality-accent personality-accent--${align} personality-accent--${size}`}
      >
        <div className="personality-accent__figure">
          <div
            className={`personality-accent__frame${polaroid ? " personality-accent__frame--polaroid" : ""}`}
          >
            <div className="personality-accent__media">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={size === "md" ? "(max-width: 768px) 88vw, 320px" : "(max-width: 768px) 72vw, 220px"}
                className="personality-accent__img"
                quality={82}
              />
            </div>
          </div>
          {photo.caption ? (
            <figcaption className="personality-accent__caption">{photo.caption}</figcaption>
          ) : null}
        </div>
      </figure>
    </Reveal>
  )
}
