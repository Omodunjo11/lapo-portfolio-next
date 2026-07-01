import { PROFILE_LINKS } from "@/lib/site"

export const PERSONAL_BLURB = `I'm a committed Man United fan in difficult times and a France supporter who thinks Mbappé, Dembélé, and Olise together is the most exciting forward line in football, with a soft spot for Cherki. I've lived in Lagos, Bradford, New York, Atlanta, and Philadelphia, and I'm still not sure which one actually counts as home. I've been to 36 countries and have strong, unsolicited opinions about airport lounges. I'm already planning a Brazil trip for Carnival 2027, which is either excellent foresight or a sign I have too many group chats, alongside a family trip to Mauritius that's somehow easier to plan than either.`

export const PERSONAL_INTRO =
  "I go by Lapo, from Lagos to Bradford to New York. The work is regulated AI and trust systems; the rest is football, anime, books, plants, and figuring out how to belong in every new city."

export const PERSONAL_BULLETS = [
  "Chemical engineer who became a PM because I kept asking why the system failed after the math was right",
  "Co-founded KOVA because I'd seen how credit actually works in Lagos, not how banks pretend it works",
  "Still the kid who reads systems before reading the room",
  "Will show up to a basketball game in an Ichigo Kurosaki shirt and mean it",
  "Believes the best product feedback sounds like your friends laughing at you in a library lounge",
  "Treats the gym like a standing meeting I refuse to cancel",
  "Will start an argument about which African city is the next Lagos and won't back down",
  "Ran for Wharton Graduate Association President because someone had to, and then actually enjoyed the job",
  "Can debate whether Jollof is better from Lagos or Accra with more conviction than I bring to most business decisions",
  "Building a Fellowship backed by the Ford Foundation and Mastercard by day, still the guy who reads manga past bedtime by night",
  "Once mapped an entire African credit system before I mapped out where I'd actually be living that year",
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
  fit?: "cover" | "contain"
}

/** Single candid beside homepage copy */
export const HOME_PERSONALITY_PHOTO: PersonalPhoto = {
  src: "/images/personal/polaroid-smile.jpg",
  alt: "Lapo smiling at a café table with laptop and phone",
  caption: "Café build session · NYC",
  variant: "polaroid",
}

/** Life lately: horizontal polaroid scroll on homepage */
export const HOME_LIFE_STRIP: PersonalPhoto[] = [
  {
    src: "/images/personal/wharton-nameplates.jpg",
    alt: "Lapo holding Wharton nameplates for Onaolapo and Michael Odunjo",
    caption: "Two nameplates, one person",
    variant: "polaroid",
  },
  {
    src: "/images/personal/wharton-wga-grad.jpg",
    alt: "Lapo laughing on a rooftop in a suit with Wharton WGA Executive Board stole",
    caption: "WGA board · Class of 2026",
    variant: "polaroid",
  },
  {
    src: "/images/personal/tennis-court-watch.jpg",
    alt: "Lapo on a tennis court checking his watch between points, racket in hand",
    caption: "Between sets · court time",
    variant: "polaroid",
  },
  {
    src: "/images/personal/street-friends-laugh.jpg",
    alt: "Lapo laughing with a friend on a sunny city street",
    caption: "Sunny block · couldn't stop laughing",
    variant: "polaroid",
  },
  {
    src: "/images/personal/friends-huddle.jpg",
    alt: "Lapo huddled with close friends, laughing",
    caption: "The people who keep you honest",
    variant: "polaroid",
  },
  {
    src: "/images/personal/brick-wall-selfie.jpg",
    alt: "Lapo and a friend smiling in a brick wall selfie",
    caption: "Brick wall · wrong angle, right vibe",
    variant: "polaroid",
  },
  {
    src: "/images/personal/couple-brick-building.jpg",
    alt: "Lapo with a partner on a sunny afternoon in front of a brick building",
    caption: "Summer afternoon · no agenda",
    variant: "polaroid",
  },
  {
    src: "/images/personal/captain-hat-party.jpg",
    alt: "Lapo at a party wearing a captain's hat with drinks",
    caption: "Captain's hat · boat drinks",
    variant: "polaroid",
  },
  {
    src: "/images/personal/pool-tropical.jpg",
    alt: "Lapo walking barefoot by a pool in tropical greenery",
    caption: "Off the grid for a minute",
    variant: "polaroid",
  },
]

export const EXPERIENCE_ACCENT_PHOTO: PersonalPhoto = {
  src: "/images/personal/polaroid-smile.jpg",
  alt: "Lapo smiling at a café table with laptop and phone",
  caption: "Embedded with teams, building between meetings",
  variant: "polaroid",
}

export const CONNECT_ACCENT_PHOTO: PersonalPhoto = {
  src: "/images/personal/studio-green-portrait.jpg",
  alt: "Lapo smiling in a studio portrait with a friend",
  caption: "Happy to talk adoption, not just demos",
  variant: "life",
}

export const WRITING_ACCENT_PHOTO: PersonalPhoto = {
  src: "/images/personal/friends-studio-green.jpg",
  alt: "Lapo with a friend in matching studio portraits against green",
  caption: "Thinking out loud, usually with company",
  variant: "life",
}

export type ScatteredPhotoBeat = {
  id: string
  label?: string
  note?: string
  photos: PersonalPhoto[]
  align?: "left" | "right" | "center"
}

export type PhotoAccentBeat = ScatteredPhotoBeat & { placement?: string }

export const ABOUT_PHOTOS_INTRO =
  "Not a highlight reel. Just a few scenes from the years between Lagos and New York: school, friends, and the off-duty hours when nobody is asking about precision metrics."

/** Photos placed between About sections, not in one gallery */
export const ABOUT_SCATTERED_BEATS: ScatteredPhotoBeat[] = [
  {
    id: "journey",
    label: "Different rooms, different names",
    note: "Onaolapo on paper, Michael on the desk, Lapo in real life.",
    photos: [
      {
        src: "/images/personal/wharton-nameplates.jpg",
        alt: "Lapo holding Wharton nameplates for Onaolapo and Michael Odunjo",
        caption: "Wharton · two nameplates, one person",
        variant: "life",
      },
      {
        src: "/images/personal/wharton-wga-grad.jpg",
        alt: "Lapo on a rooftop with Wharton WGA Executive Board stole",
        caption: "WGA board · Class of 2026",
        variant: "life",
      },
      {
        src: "/images/personal/polaroid-laugh.jpg",
        alt: "Lapo laughing while working at a laptop",
        caption: "The moment the deploy actually worked",
        variant: "polaroid",
      },
    ],
  },
  {
    id: "people",
    label: "Usually not alone",
    note: "The work is solo sometimes. The life almost never is.",
    photos: [
      {
        src: "/images/personal/wharton-grad-crew.jpg",
        alt: "Lapo in graduation gown with friends and flowers outdoors",
        caption: "Graduation day · flowers and the crew",
        variant: "life",
        fit: "contain",
      },
      {
        src: "/images/personal/mirror-selfie-crew.jpg",
        alt: "Large group mirror selfie in a building lobby",
        caption: "Lobby mirror · everyone in frame",
        variant: "life",
      },
    ],
  },
  {
    id: "off-duty",
    label: "When the laptop closes",
    note: "Tennis courts, ski falls, plants as coworkers.",
    photos: [
      {
        src: "/images/personal/tennis-court-watch.jpg",
        alt: "Lapo on a tennis court checking his watch between points, racket in hand",
        caption: "Between sets · court time",
        variant: "life",
      },
      {
        src: "/images/personal/tennis-court-back.jpg",
        alt: "Lapo on a blue tennis court from behind, racket at his side, trees beyond the fence",
        caption: "Court 12 · no scoreboard",
        variant: "life",
      },
      {
        src: "/images/personal/ski-thumbs-up.jpg",
        alt: "Lapo sitting in snow on skis giving a thumbs up after a fall",
        caption: "Still counts as a run",
        variant: "life",
      },
    ],
  },
]

export const ABOUT_JOURNEY_BEAT = ABOUT_SCATTERED_BEATS[0]
export const ABOUT_PEOPLE_BEAT = ABOUT_SCATTERED_BEATS[1]
export const ABOUT_OFFDUTY_BEAT = ABOUT_SCATTERED_BEATS[2]

/** @deprecated use ABOUT_SCATTERED_BEATS */
export const ABOUT_LIFE_PHOTOS: PersonalPhoto[] = ABOUT_SCATTERED_BEATS.flatMap((b) => b.photos)

/** @deprecated use ABOUT_SCATTERED_BEATS */
export const PERSONAL_PHOTOS = ABOUT_LIFE_PHOTOS

export const HOME_JOURNEY_PICKS = [
  { city: "Lagos", note: "Reading systems before I had words for it." },
  { city: "Bradford", note: "First time being the only one in the room who looked like me." },
  { city: "Philadelphia", note: "Shipped Kinage in production while writing papers. Did not sleep enough." },
  { city: "New York", note: "Back. Building now.", current: true },
] as const

/** @deprecated use HOME_LIFE_STRIP */
export const HOME_LIFE_STRIP_A: PersonalPhoto[] = HOME_LIFE_STRIP.slice(0, 2)

/** @deprecated use HOME_LIFE_STRIP */
export const HOME_LIFE_STRIP_B: PersonalPhoto[] = HOME_LIFE_STRIP.slice(2)

/** @deprecated use HOME_LIFE_STRIP */
export const HOME_LIFE_PHOTOS: PersonalPhoto[] = HOME_LIFE_STRIP

/** @deprecated use HOME_PERSONALITY_PHOTO */
export const HOME_POLAROID_PHOTOS: PersonalPhoto[] = [HOME_PERSONALITY_PHOTO]
