import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BG, C, EndCard, H1, Pop, Safe, Tag } from "./lib";

const Row: React.FC<{ delay: number; children: React.ReactNode }> = ({ delay, children }) => (
  <Pop delay={delay}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        background: "#f5f5f4",
        borderRadius: 20,
        padding: "22px 28px",
        fontSize: 34,
        fontWeight: 700,
        color: "#1c1917",
      }}
    >
      {children}
    </div>
  </Pop>
);

const BookingMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const confirm = spring({ frame: frame - 170, fps, config: { damping: 12, stiffness: 200 } });
  const confirmed = frame >= 170;

  return (
    <Safe center>
      <Pop>
        <div style={{ textAlign: "center", color: C.muted, fontSize: 32, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
          Así de fácil
        </div>
      </Pop>
      <Pop delay={10}>
        <div
          style={{
            background: C.white,
            borderRadius: 40,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
          }}
        >
          <Row delay={20}>
            <span style={{ color: C.brand, fontSize: 40 }}>◈</span> Retiro: Aeropuerto MDZ
          </Row>
          <Row delay={50}>
            <span style={{ color: C.brand, fontSize: 40 }}>◈</span> 10 oct → 14 oct · 4 días
          </Row>
          <Pop delay={85}>
            <div style={{ display: "flex", alignItems: "center", gap: 24, background: "#f5f5f4", borderRadius: 20, padding: "18px 28px" }}>
              <div style={{ width: 170, height: 100, borderRadius: 14, overflow: "hidden", background: C.ink }}>
                <Img src={staticFile("cronos.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: "#1c1917" }}>Fiat Cronos</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: C.brand }}>$60.000/día</div>
              </div>
            </div>
          </Pop>
          <Pop delay={130}>
            <div
              style={{
                marginTop: 8,
                borderRadius: 20,
                padding: "26px 28px",
                textAlign: "center",
                fontSize: 38,
                fontWeight: 900,
                color: C.white,
                background: confirmed ? C.green : C.brand,
                transform: `scale(${confirmed ? 1 : 1 + Math.sin(frame / 8) * 0.02})`,
              }}
            >
              {confirmed ? "✓ RESERVA CONFIRMADA" : "CONFIRMAR RESERVA"}
            </div>
          </Pop>
          {confirmed && (
            <div
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: 800,
                color: "#1c1917",
                letterSpacing: 4,
                opacity: confirm,
                transform: `translateY(${(1 - confirm) * 20}px)`,
              }}
            >
              CUY-7H3T8B
            </div>
          )}
        </div>
      </Pop>
    </Safe>
  );
};

export const Reserva: React.FC = () => {
  return (
    <BG>
      <Sequence durationInFrames={60}>
        <Safe center>
          <Pop>
            <Tag>Alquiler de autos</Tag>
          </Pop>
          <Pop delay={8}>
            <H1 size={104} align="center">
              ¿VENÍS A<br />MENDOZA?
            </H1>
          </Pop>
        </Safe>
      </Sequence>

      <Sequence from={60} durationInFrames={250}>
        <BookingMock />
      </Sequence>

      <Sequence from={310} durationInFrames={90}>
        <Safe center>
          <Pop>
            <H1 size={110} align="center">
              2 MINUTOS.
            </H1>
          </Pop>
          <Pop delay={10}>
            <H1 size={64} align="center">
              <span style={{ color: C.brandLight }}>DESDE EL CELU.</span>
            </H1>
          </Pop>
          <Pop delay={22}>
            <div style={{ textAlign: "center", color: C.muted, fontSize: 36, fontWeight: 600, marginTop: 20 }}>
              Sin oficina. Sin vueltas.
            </div>
          </Pop>
        </Safe>
      </Sequence>

      <Sequence from={400} durationInFrames={140}>
        <EndCard />
      </Sequence>
    </BG>
  );
};

export const RESERVA_DURATION = 540;
