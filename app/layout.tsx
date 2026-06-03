import type { Metadata } from "next"
import { Playfair_Display, DM_Mono, Syne } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Cursor from "@/components/Cursor"
import KonamiCode from "@/components/KonamiCode"
import SkyBackground from "@/components/SkyBackground"
import AchievementToast from "@/components/AchievementToast"
import GameSounds from "@/components/GameSounds"
import ContinueScreen from "@/components/ContinueScreen"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400"],
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://lapo-portfolio-next.vercel.app"),
  title: "Lapo Odunjo · AI Systems Builder",
  description: "Staff TPM building production AI systems for regulated industries. Kinage · Amazon · TD Bank · Capital One · Wharton MBA.",
  openGraph: {
    title: "Lapo Odunjo · AI Systems Builder",
    description: "Staff TPM building production AI systems for regulated industries. LLM evaluation, agentic workflows, enterprise data platforms.",
    url: "https://lapo-portfolio-next.vercel.app",
    siteName: "Lapo Odunjo",
    images: [{ url: "/images/IMG_3437.jpg", width: 1200, height: 630, alt: "Lapo Odunjo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lapo Odunjo · AI Systems Builder",
    description: "Staff TPM building production AI systems for regulated industries.",
    images: ["/images/IMG_3437.jpg"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable} ${syne.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
        <SkyBackground />
        <Cursor />
        <KonamiCode />
        <AchievementToast />
        <GameSounds />
        <ContinueScreen />
        <Nav />
        <main style={{ paddingTop: 57 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
