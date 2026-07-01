"use client"
import CloudScene from "@/components/CloudScene"
import Ticker from "@/components/Ticker"
import HomeFeaturedWork from "@/components/HomeFeaturedWork"
import HomeCurrently from "@/components/HomeCurrently"
import HomeLifeStrip from "@/components/HomeLifeStrip"
import HomePersonality from "@/components/HomePersonality"
import HomeThinking from "@/components/HomeThinking"
import HomeWriting from "@/components/HomeWriting"
import HomeCredibility from "@/components/HomeCredibility"
import HomeConnectCta from "@/components/HomeConnectCta"
import { HOME_TICKER } from "@/lib/home"
import { HOME_LIFE_STRIP } from "@/lib/personal"

export default function Home() {
  return (
    <>
      <CloudScene />
      <Ticker items={[...HOME_TICKER]} />
      <div className="page-body">
        <HomeFeaturedWork />
        <HomeCurrently />
        <section className="photo-moment-band photo-moment-band--home">
          <div className="pad-page">
            <HomeLifeStrip photos={HOME_LIFE_STRIP} label="Life lately" delay={0.05} compact />
          </div>
        </section>
        <HomePersonality />
        <HomeThinking />
        <HomeWriting />
        <HomeCredibility />
        <HomeConnectCta />
      </div>
    </>
  )
}
