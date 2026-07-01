"use client"
import CloudScene from "@/components/CloudScene"
import Ticker from "@/components/Ticker"
import HomeFeaturedWork from "@/components/HomeFeaturedWork"
import HomeCurrently from "@/components/HomeCurrently"
import HomePersonality from "@/components/HomePersonality"
import HomeThinking from "@/components/HomeThinking"
import HomeWriting from "@/components/HomeWriting"
import HomeCredibility from "@/components/HomeCredibility"
import HomeConnectCta from "@/components/HomeConnectCta"
import { HOME_TICKER } from "@/lib/home"

export default function Home() {
  return (
    <>
      <CloudScene />
      <Ticker items={[...HOME_TICKER]} />
      <div className="page-body">
        <HomeFeaturedWork />
        <HomeCurrently />
        <HomePersonality />
        <HomeThinking />
        <HomeWriting />
        <HomeCredibility />
        <HomeConnectCta />
      </div>
    </>
  )
}
