import Link from "next/link"
import Reveal from "@/components/Reveal"
import { HOME_CURRENTLY } from "@/lib/home"

export default function HomeCurrently() {
  return (
    <section className="home-currently">
      <div className="pad-page home-currently__inner">
        <Reveal>
          <p className="home-section-eyebrow">Right now</p>
          <h2 className="home-section-title">What I&apos;m building in production.</h2>
        </Reveal>
        <div className="home-currently__grid">
          {HOME_CURRENTLY.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.08}>
              <article className="home-currently__card">
                <p className="home-currently__org">{item.org}</p>
                <p className="home-currently__role">{item.role}</p>
                <p className="home-currently__desc">{item.description}</p>
                <Link href={item.href} className="home-currently__link">
                  {item.hrefLabel}
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
