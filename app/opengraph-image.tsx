import { ImageResponse } from "next/og";
import { hero } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export const alt = "Marcin Sufa — AI-native Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const domain = siteUrl.replace(/^https?:\/\//, "");

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#131019",
          backgroundImage:
            "radial-gradient(900px circle at 80% 12%, rgba(255,138,92,0.22), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#ff8a5c",
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#1c1925",
              border: "1px solid #302a39",
              color: "#f1ece4",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            MS
          </div>
          {hero.badge}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.02,
              color: "#f1ece4",
            }}
          >
            <span style={{ color: "#ff8a5c" }}>{hero.headlineAccent}</span>
            <span>&nbsp;{hero.headlineRest}</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 29,
              color: "#aaa39b",
              maxWidth: 900,
            }}
          >
            {hero.subhead}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#76707b",
            fontSize: 26,
          }}
        >
          <span style={{ color: "#f1ece4", fontWeight: 600 }}>Marcin Sufa</span>
          <span>{domain}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
