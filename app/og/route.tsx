import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Tuagenciaweb";
  const subtitle = searchParams.get("subtitle") ?? "Webs profesionales para tu negocio";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0B1426", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 12, background: "#2C5BFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800 }}>t</div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1 }}>tuagenciaweb</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>{title}</div>
          <div style={{ marginTop: 24, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>{subtitle}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
