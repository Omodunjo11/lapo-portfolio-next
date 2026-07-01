import { PROFILE_LINKS } from "@/lib/site"

export const PERSONAL_BLURB = `I'm a committed Man United fan in difficult times and a France supporter who thinks Mbappé and Dembélé together is the most exciting forward line in football. I finished Wharton in May 2026 while shipping Kinage in production. I did not sleep enough. I read more than I should and think too hard about why some cities produce disproportionate numbers of people who build things.`

export const PERSONAL_INTRO =
  "I go by Lapo, from Lagos to Bradford to New York. The work is regulated AI and trust systems; the rest is football, books, plants, and figuring out how to belong in every new city."

export const PERSONAL_BULLETS = [
  "Chemical engineer who became a PM because I kept asking why the system failed after the math was right",
  "Co-founded KOVA because I'd seen how credit actually works in Lagos, not how banks pretend it works",
  "Still the kid who reads systems before reading the room",
] as const

export const HOME_READING_PICKS = [
  {
    title: "Berlin",
    author: "Bea Setton",
    note: "A novel about arriving somewhere unfamiliar and figuring out who you are in rooms that don't quite fit yet.",
  },
  {
    title: "Team of Teams",
    author: "Stanley McChrystal",
    note: "The most useful management book I've read for thinking about AI systems that need human judgment in the loop.",
  },
] as const

export const GOODREADS_LINK = PROFILE_LINKS.goodreads

export type PersonalPhoto = {
  src: string
  alt: string
  caption: string
  variant?: "polaroid" | "candid"
}

export const PERSONAL_PHOTOS: PersonalPhoto[] = [
  {
    src: "/images/personal/polaroid-smile.jpg",
    alt: "Lapo smiling at a café table with laptop and phone",
    caption: "Café build session · NYC",
    variant: "polaroid",
  },
  {
    src: "/images/personal/polaroid-dual.jpg",
    alt: "Two Polaroid photos of Lapo working at a laptop",
    caption: "Polaroids from a long work afternoon",
    variant: "polaroid",
  },
  {
    src: "/images/personal/polaroid-laugh.jpg",
    alt: "Lapo laughing while working at a laptop",
    caption: "The moment the deploy actually worked",
    variant: "polaroid",
  },
  {
    src: "/images/personal/candid-polo.jpg",
    alt: "Lapo in a cream polo, candid playful expression",
    caption: "Off-duty · somewhere with good light",
    variant: "candid",
  },
  {
    src: "/images/personal/home-plants.jpg",
    alt: "Lapo at home workspace surrounded by plants",
    caption: "Home office · plants as coworkers",
    variant: "candid",
  },
]

export const HOME_JOURNEY_PICKS = [
  { city: "Lagos", note: "Reading systems before I had words for it." },
  { city: "Bradford", note: "First time being the only one in the room who looked like me." },
  { city: "Philadelphia", note: "Shipped Kinage in production while writing papers. Did not sleep enough." },
  { city: "New York", note: "Back. Building now.", current: true },
] as const
