import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

const SYNE_800 =
  "https://fonts.gstatic.com/s/syne/v24/8vIS7w4qzmVxsWxjBZRjr0FKM_24vj6k.ttf"

export default async function Icon() {
  const syne = await fetch(SYNE_800).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            fontSize: 17,
            fontWeight: 800,
            color: "#0F172A",
            fontFamily: "Syne",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          <span>L</span>
          <div
            style={{
              width: 3,
              height: 3,
              background: "#0F172A",
              flexShrink: 0,
            }}
          />
          <span>O</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Syne", data: syne, weight: 800, style: "normal" }],
    },
  )
}
