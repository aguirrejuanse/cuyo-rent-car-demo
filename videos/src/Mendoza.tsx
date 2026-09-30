import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C, EndCard, H1, Pop, Safe, Tag } from "./lib";

const DESTINOS = [
  { name: "Potrerillos", desc: "Dique, kayak y montaña", dist: "45 min" },
  { name: "Cacheuta", desc: "Termas en precordillera", dist: "40 min" },
  { name: "Valle de Uco", desc: "Bodegas de altura", dist: "1 h 15" },
  { name: "Aconcagua", desc: "El techo de América", dist: "2 h 30" },
  { name: "Villavicencio", desc: "Serpentina histórica", dist: "1 h" },
  { name: "Cañón del Atuel", desc: "Sur mendocino", dist: "3 h" },
];

const HeroBG: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, 480], [1.05, 1.3], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Img
        src={staticFile("hero.jpg")}
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})` }}
      />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(12,10,9,0.55) 0%, rgba(12,10,9,0.25) 45%, rgba(12,10,9,0.85) 100%)" }} />
    </AbsoluteFill>
  );
};

const Chip: React.FC<{ d: (typeof DESTINOS)[number]; i: number }> = ({ d, i }) => (
  <Pop delay={i * 28}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255,255,255,0.92)",
        borderRadius: 24,
        padding: "24px 32px",
      }}
    >
      <div>
        <div style={{ fontSize: 42, fontWeight: 900, color: "#1c1917" }}>{d.name}</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: "#78716c" }}>{d.desc}</div>
      </div>
      <div
        style={{
          background: C.brand,
          color: C.white,
          fontSize: 30,
          fontWeight: 800,
          padding: "10px 22px",
          borderRadius: 999,
          whiteSpace: "nowrap",
        }}
      >
        {d.dist}
      </div>
    </div>
  </Pop>
);

export const Mendoza: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: '-apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif' }}>
      <HeroBG />

      <Sequence durationInFrames={80}>
        <Safe center>
          <Pop>
            <div style={{ textAlign: "center" }}>
              <Tag>Mendoza</Tag>
            </div>
          </Pop>
          <Pop delay={10}>
            <H1 size={100} align="center">
              SE RECORRE
              <br />
              EN AUTO
            </H1>
          </Pop>
        </Safe>
      </Sequence>

      <Sequence from={80} durationInFrames={230}>
        <Safe>
          <div style={{ marginTop: 30 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {DESTINOS.map((d, i) => (
              <Chip key={d.name} d={d} i={i} />
            ))}
          </div>
        </Safe>
      </Sequence>

      <Sequence from={310} durationInFrames={80}>
        <Safe center>
          <Pop>
            <H1 size={120} align="center">
              KM<br />ILIMITADOS
            </H1>
          </Pop>
          <Pop delay={12}>
            <div style={{ textAlign: "center", color: C.white, fontSize: 38, fontWeight: 700, marginTop: 16 }}>
              dentro de toda la provincia
            </div>
          </Pop>
        </Safe>
      </Sequence>

      <Sequence from={390} durationInFrames={90}>
        <AbsoluteFill style={{ background: "rgba(12,10,9,0.88)" }} />
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};

export const MENDOZA_DURATION = 480;
