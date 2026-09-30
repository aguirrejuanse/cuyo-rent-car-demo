import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

export const C = {
  brand: "#f97316",
  brandLight: "#fdba74",
  ink: "#0c0a09",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.65)",
  green: "#25D366",
};

export const FONT = '-apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif';

export const BG: React.FC<{ children?: React.ReactNode; dim?: number }> = ({ children, dim = 0 }) => (
  <AbsoluteFill style={{ background: `radial-gradient(120% 90% at 50% 0%, #292524 0%, ${C.ink} 60%)`, fontFamily: FONT }}>
    {dim > 0 && <AbsoluteFill style={{ background: `rgba(12,10,9,${dim})` }} />}
    {children}
  </AbsoluteFill>
);

export const Safe: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <AbsoluteFill
    style={{
      padding: "220px 64px 260px",
      display: "flex",
      flexDirection: "column",
      justifyContent: center ? "center" : "flex-start",
      gap: 32,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Pop: React.FC<{ delay?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  delay = 0,
  children,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 160 } });
  return (
    <div
      style={{
        opacity: interpolate(s, [0, 1], [0, 1]),
        transform: `translateY(${(1 - s) * 60}px) scale(${0.92 + s * 0.08})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "inline-block",
      padding: "14px 28px",
      borderRadius: 999,
      border: `2px solid ${C.brand}`,
      color: C.brandLight,
      fontSize: 34,
      fontWeight: 800,
      letterSpacing: 4,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

export const H1: React.FC<{ children: React.ReactNode; size?: number; align?: "left" | "center" }> = ({
  children,
  size = 96,
  align = "left",
}) => (
  <h1 style={{ margin: 0, color: C.white, fontSize: size, fontWeight: 900, lineHeight: 1.02, letterSpacing: -2, textAlign: align }}>
    {children}
  </h1>
);

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const pulse = 1 + Math.sin(frame / 12) * 0.02;
  return (
    <Safe center>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36, transform: `scale(${s * pulse})` }}>
        <Img src={staticFile("logo.webp")} style={{ width: 420, height: "auto" }} />
        <div style={{ color: C.muted, fontSize: 34, fontWeight: 600, letterSpacing: 1 }}>Alquiler de autos en Mendoza</div>
        <div
          style={{
            background: C.brand,
            color: C.white,
            fontSize: 44,
            fontWeight: 900,
            padding: "24px 64px",
            borderRadius: 999,
            letterSpacing: 1,
          }}
        >
          RESERVÁ TU AUTO
        </div>
        <div style={{ color: C.white, fontSize: 40, fontWeight: 800, letterSpacing: 2 }}>CUYORENTACAR.COM</div>
        <div style={{ color: C.green, fontSize: 30, fontWeight: 700 }}>WhatsApp · @cuyorentacar</div>
      </div>
    </Safe>
  );
};
