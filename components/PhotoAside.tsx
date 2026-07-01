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

  return (
    <Reveal delay={delay}>
      <aside className="photo-moment-band" data-placement={beat.id}>
        <div className="pad-page photo-moment-band__inner">
          {(showIntro || beat.label || beat.note) && (
            <div className="photo-moment-band__copy">
              {showIntro ? <p className="photo-moment-band__intro">{ABOUT_PHOTOS_INTRO}</p> : null}
              {beat.label ? <h3 className="photo-moment-band__title">{beat.label}</h3> : null}
              {beat.note ? <p className="photo-moment-band__note">{beat.note}</p> : null}
            </div>
          )}
          <div className={`photo-moment-band__photos photo-moment-band__photos--${photos.length}`}>
            {photos.map((photo) => (
              <figure key={photo.src} className="photo-moment-band__figure">
                <div
                  className={`photo-moment-band__frame${photo.variant === "polaroid" ? " photo-moment-band__frame--polaroid" : ""}${photo.fit === "contain" ? " photo-moment-band__frame--contain" : ""}`}
                >
                  <div className="photo-moment-band__media">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 92vw, 520px"
                      className="photo-moment-band__img"
                      quality={82}
                    />
                  </div>
                </div>
                {photo.caption ? (
                  <figcaption className="photo-moment-band__caption">{photo.caption}</figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </div>
      </aside>
    </Reveal>
  )
}
