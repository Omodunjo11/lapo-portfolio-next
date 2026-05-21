import type { Metadata } from "next"
import { Playfair_Display, DM_Mono, Syne } from "next/font/google"
import "./globals.css"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Cursor from "@/components/Cursor"

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
  title: "Lapo Odunjo — AI Systems Builder",
  description: "AI systems builder. Infrastructure investor. Wharton MBA.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable} ${syne.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
        <Cursor />
        <Nav />
        <main style={{ paddingTop: 57 }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
