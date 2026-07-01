import Image from "next/image"
import Reveal from "@/components/Reveal"
import { ABOUT_PHOTOS_INTRO, type ScatteredPhotoBeat } from "@/lib/personal"

type Props = {
  beat: ScatteredPhotoBeat
  showIntro?: boolean
  delay?: number
}

export default function PhotoAside({ beat, showIntro = false, delay = 0 }: Props) {
  const photos = beat.photos.slice(0, 2)
  if (photos.length === 0) return null

  const align = beat.align ?? "right"

  return (
    <Reveal delay={delay}>
      <aside
        className={`photo-aside photo-aside--${align} photo-aside--count-${photos.length}`}
        data-placement={beat.id}
      >
        {showIntro ? <p className="photo-aside__intro">{ABOUT_PHOTOS_INTRO}</p> : null}
        {beat.label ? <p className="photo-aside__label">{beat.label}</p> : null}
        {beat.note ? <p className="photo-aside__note">{beat.note}</p> : null}
        <div className="photo-aside__photos">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="photo-aside__figure"
            >
              <div
                className={`photo-aside__frame${photo.variant === "polaroid" ? " photo-aside__frame--polaroid" : ""}`}
              >
                <div className="photo-aside__media">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 44vw, 240px"
                    className="photo-aside__img"
                    quality={82}
                  />
                </div>
              </div>
              {photo.caption ? (
                <figcaption className="photo-aside__caption">{photo.caption}</figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </aside>
    </Reveal>
  )
}
