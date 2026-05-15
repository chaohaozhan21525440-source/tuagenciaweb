import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: 180, height: 180, background: "#2C5BFF", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 120, fontWeight: 800, fontFamily: "sans-serif" }}>
        t
      </div>
    ),
    { ...size },
  );
}
