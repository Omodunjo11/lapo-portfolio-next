import type { MetadataRoute } from "next"
import { CANONICAL_NAME, ROLE_TITLE } from "@/lib/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${CANONICAL_NAME}, ${ROLE_TITLE}`,
    short_name: CANONICAL_NAME,
    description:
      "Portfolio of Lapo Odunjo, AI product leader building trust systems for regulated industries.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8FAFC",
    theme_color: "#0F172A",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  }
}
