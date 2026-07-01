import { PROFILE_LINKS } from "@/lib/site"

export const PERSONAL_BLURB = `I'm a committed Man United fan in difficult times and a France supporter who thinks Mbappé and Dembélé together is the most exciting forward line in football. I finished Wharton in May 2026 while shipping Kinage in production. I did not sleep enough. I wore a Bleach shirt to a Columbia basketball game, fell over on a ski slope and gave the camera a thumbs up, and still think too hard about why some cities produce disproportionate numbers of people who build things.`

export const PERSONAL_INTRO =
  "I go by Lapo, from Lagos to Bradford to New York. The work is regulated AI and trust systems; the rest is football, anime, books, plants, and figuring out how to belong in every new city."

export const PERSONAL_BULLETS = [
  "Chemical engineer who became a PM because I kept asking why the system failed after the math was right",
  "Co-founded KOVA because I'd seen how credit actually works in Lagos, not how banks pretend it works",
  "Still the kid who reads systems before reading the room",
  "Will show up to a basketball game in an Ichigo Kurosaki shirt and mean it",
  "Believes the best product feedback sounds like your friends laughing at you in a library lounge",
] as const

export const HOME_READING_PICKS = [
  {
    title: "Berlin",
    author: "Bea Setton",
    note: "A novel about arriving somewhere unfamiliar and figuring out who you are in rooms that don't quite fit yet. I keep returning to books about that feeling.",
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
  variant?: "polaroid" | "candid" | "life"
}

/** Café polaroids + home office: work-life overlap on the homepage grid */
export const HOME_POLAROID_PHOTOS: PersonalPhoto[] = [
  {
    src: "/images/personal/polaroid-smile.jpg",
    alt: "Lapo smiling at a café table with laptop and phone",
    caption: "Café build session · NYC",
    variant: "polaroid",
  },
  {
    src: "/images/personal/polaroid-laugh.jpg",
    alt: "Lapo laughing while working at a laptop",
    caption: "The moment the deploy actually worked",
    variant: "polaroid",
  },
  {
    src: "/images/personal/home-plants.jpg",
    alt: "Lapo at home workspace surrounded by plants",
    caption: "Home office · plants as coworkers",
    variant: "candid",
  },
]

/** Horizontal strip on homepage: personality outside the metrics */
export const HOME_LIFE_PHOTOS: PersonalPhoto[] = [
  {
    src: "/images/personal/wharton-nameplates.jpg",
    alt: "Lapo holding Wharton nameplates for Onaolapo and Michael Odunjo",
    caption: "Onaolapo on paper, Michael on the desk, Lapo in real life · Wharton",
    variant: "life",
  },
  {
    src: "/images/personal/columbia-bleach-game.jpg",
    alt: "Lapo with friends at a Columbia basketball game wearing a Bleach anime shirt",
    caption: "Columbia basketball · Bleach shirt, no apologies",
    variant: "life",
  },
  {
    src: "/images/personal/friends-huddle.jpg",
    alt: "Lapo huddled with close friends, laughing",
    caption: "The people who keep you honest",
    variant: "life",
  },
  {
    src: "/images/personal/ski-thumbs-up.jpg",
    alt: "Lapo sitting in snow on skis giving a thumbs up after a fall",
    caption: "Ski trip · still counts as a run",
    variant: "life",
  },
  {
    src: "/images/personal/pool-tropical.jpg",
    alt: "Lapo walking barefoot by a pool in tropical greenery",
    caption: "Off the grid for a minute",
    variant: "life",
  },
  {
    src: "/images/personal/tux-lounge-laugh.jpg",
    alt: "Lapo laughing with a friend in a library lounge, both in tuxedos",
    caption: "Black tie, actual joy",
    variant: "life",
  },
  {
    src: "/images/personal/studio-green-portrait.jpg",
    alt: "Lapo smiling in a studio portrait with a friend",
    caption: "Studio day · green backdrop, real smile",
    variant: "life",
  },
  {
    src: "/images/personal/candid-polo.jpg",
    alt: "Lapo in a cream polo, candid playful expression",
    caption: "Off-duty · somewhere with good light",
    variant: "life",
  },
]

/** Full gallery for About page photo strip */
export const ABOUT_LIFE_PHOTOS: PersonalPhoto[] = [
  ...HOME_POLAROID_PHOTOS,
  {
    src: "/images/personal/polaroid-dual.jpg",
    alt: "Two Polaroid photos of Lapo working at a laptop",
    caption: "Polaroids from a long work afternoon",
    variant: "polaroid",
  },
  ...HOME_LIFE_PHOTOS,
  {
    src: "/images/personal/tux-trio-studio.jpg",
    alt: "Lapo with two friends in tuxedos, playful studio portrait",
    caption: "Tux trio · studio mischief",
    variant: "life",
  },
  {
    src: "/images/personal/friends-studio-green.jpg",
    alt: "Lapo with a friend in matching studio portraits against green",
    caption: "Brothers in blazers",
    variant: "life",
  },
  {
    src: "/images/personal/group-chesterfield.jpg",
    alt: "Large group of friends posed on a Chesterfield sofa at a formal event",
    caption: "The whole crew · celebration night",
    variant: "life",
  },
  {
    src: "/images/personal/blacktie-couple.jpg",
    alt: "Lapo in black tie with a partner at a formal evening event",
    caption: "Black tie · city lights",
    variant: "life",
  },
]

/** @deprecated use HOME_POLAROID_PHOTOS or ABOUT_LIFE_PHOTOS */
export const PERSONAL_PHOTOS = ABOUT_LIFE_PHOTOS

export const HOME_JOURNEY_PICKS = [
  { city: "Lagos", note: "Reading systems before I had words for it." },
  { city: "Bradford", note: "First time being the only one in the room who looked like me." },
  { city: "Philadelphia", note: "Shipped Kinage in production while writing papers. Did not sleep enough." },
  { city: "New York", note: "Back. Building now.", current: true },
] as const
