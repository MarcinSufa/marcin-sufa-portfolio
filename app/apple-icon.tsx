import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#131019",
          color: "#f1ece4",
          fontSize: 86,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -2,
        }}
      >
        MS
        <div
          style={{
            position: "absolute",
            right: 34,
            bottom: 56,
            width: 16,
            height: 16,
            borderRadius: 8,
            background: "#ff8a5c",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
