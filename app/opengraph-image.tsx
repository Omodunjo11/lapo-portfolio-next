import { ImageResponse } from "next/og"
import { CANONICAL_NAME, LEGAL_NAME, ROLE_TITLE } from "@/lib/site"

export const alt = `${CANONICAL_NAME} — Onaolapo Michael Odunjo · AI Product`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #0F172A 0%, #1e3a5f 45%, #38BDF8 100%)",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 28,
              fontWeight: 800,
              color: "#F8FAFC",
              letterSpacing: "-0.04em",
            }}
          >
            <span>L</span>
            <div style={{ width: 6, height: 6, background: "#F8FAFC" }} />
            <span>O</span>
          </div>
          <span style={{ fontSize: 22, letterSpacing: "0.28em", textTransform: "uppercase", opacity: 0.85 }}>
            {CANONICAL_NAME}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            {LEGAL_NAME}
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.35, color: "#BAE6FD", maxWidth: 820 }}>
            {ROLE_TITLE}
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 20, color: "rgba(248,250,252,0.75)" }}>
          <span>Kinage</span>
          <span>·</span>
          <span>KOVA</span>
          <span>·</span>
          <span>Regulated AI</span>
          <span>·</span>
          <span>Wharton MBA</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
