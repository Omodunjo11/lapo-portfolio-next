import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Playfair_Display, DM_Mono, Syne } from "next/font/google";
import {
  CANONICAL_NAME,
  LEGAL_NAME,
  ROLE_TITLE,
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SITE_URL,
} from "@/lib/site";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import StructuredData from "@/components/StructuredData";
import SkipLink from "@/components/SkipLink";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${CANONICAL_NAME} · ${ROLE_TITLE}`, template: `%s · ${CANONICAL_NAME}` },
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: LEGAL_NAME, url: SITE_URL }],
  creator: CANONICAL_NAME,
  publisher: CANONICAL_NAME,
  applicationName: CANONICAL_NAME,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    title: `${CANONICAL_NAME} · ${ROLE_TITLE}`,
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    siteName: CANONICAL_NAME,
    locale: "en_US",
    type: "profile",
    firstName: "Onaolapo",
    lastName: "Odunjo",
    username: "lapoodunjo",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CANONICAL_NAME} · ${ROLE_TITLE}`,
    description: SEO_DESCRIPTION,
    creator: "@Modunjo",
    site: "@Modunjo",
  },
  other: {
    "profile:first_name": "Onaolapo",
    "profile:last_name": "Odunjo",
  },
};

const clerkReady =
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
  !String(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY).includes("placeholder");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const body = (
    <html lang="en" className={`${playfair.variable} ${dmMono.variable} ${syne.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
        <SkipLink />
        <noscript>
          <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <StructuredData />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );

  if (!clerkReady) return body;
  return <ClerkProvider>{body}</ClerkProvider>;
}
