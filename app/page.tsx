"use client"
import CloudScene from "@/components/CloudScene"
import HomeFeaturedWork from "@/components/HomeFeaturedWork"

export default function Home() {
  return (
    <>
      <CloudScene />
      <div className="page-body">
        <HomeFeaturedWork />
      </div>
    </>
  )
}
