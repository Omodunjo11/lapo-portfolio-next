import Reveal from "@/components/Reveal"
import { HOME_CREDIBILITY } from "@/lib/home"

export default function HomeCredibility() {
  return (
    <section className="home-credibility" aria-label="Experience and education">
      <div className="pad-page home-credibility__inner">
        <Reveal>
          <p className="home-credibility__label">Built inside</p>
          <ul className="home-credibility__list">
            {HOME_CREDIBILITY.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
