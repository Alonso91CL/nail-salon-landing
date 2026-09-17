import { ImageResponse } from "next/og";

export const alt = "Magnetica Beauty Bar — Uñas que hipnotizan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 65% 30%, #a1007d 0%, #20001a 45%, #08040b 100%)",
          color: "#f6eaf3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: "50%",
            border: "3px solid #ff3d9a",
            background: "radial-gradient(circle at 35% 30%, #ffffff 0%, #ff3d9a 50%, #20001a 100%)",
            fontSize: 64,
          }}
        >
          M
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 36 }}>Magnetica Beauty Bar</div>
        <div style={{ fontSize: 34, marginTop: 18, color: "#b9a3c4" }}>Uñas que hipnotizan</div>
        <div style={{ fontSize: 24, marginTop: 10, color: "#ff3d9a" }}>
          Manicure · Soft gel · Nail art · San Bernardo
        </div>
      </div>
    ),
    size,
  );
}
