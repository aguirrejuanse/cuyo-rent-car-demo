import React from "react";
import { Img, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BG, C, EndCard, H1, Pop, Safe } from "./lib";

const CAR_SLIDE = ["cronos.webp", "onix.webp", "p208.webp", "yaris.webp", "spin.webp", "ranger.webp"];

const Punch: React.FC<{ top: string; main: React.ReactNode; sub?: string }> = ({ top, main, sub }) => (
  <Safe center>
    <Pop>
      <div style={{ textAlign: "center", color: C.brandLight, fontSize: 32, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>
        {top}
      </div>
    </Pop>
    <Pop delay={8}>
      <H1 size={86} align="center">
        {main}
      </H1>
    </Pop>
    {sub && (
      <Pop delay={18}>
        <div style={{ textAlign: "center", color: C.muted, fontSize: 36, fontWeight: 600 }}>{sub}</div>
      </Pop>
    )}
  </Safe>
);

const CarStrip: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const x = -(frame * 6) % 1300;
  return (
    <div style={{ display: "flex", gap: 30, transform: `translateX(${x}px)`, width: width * 3 }}>
      {[...CAR_SLIDE, ...CAR_SLIDE].map((f, i) => (
        <div key={i} style={{ width: 380, height: 228, borderRadius: 24, overflow: "hidden", flexShrink: 0, background: "#1c1917" }}>
          <Img src={staticFile(f)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}
    </div>
  );
};

export const SinVueltas: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const price = spring({ frame, fps, config: { damping: 11, stiffness: 130 } });

  return (
    <BG>
      <Sequence durationInFrames={70}>
        <Punch top="Alquilar un auto" main={<>NO TIENE QUE SER<br />UN TRÁMITE</>} />
      </Sequence>

      <Sequence from={70} durationInFrames={70}>
        <Punch
          top="Cero burocracia"
          main={<>LLEGÁS Y EN 5 MIN<br />ESTÁS MANEJANDO</>}
        />
      </Sequence>

      <Sequence from={140} durationInFrames={70}>
        <Punch
          top="Únicos en Mendoza"
          main={<>GARANTÍA<br />EN EFECTIVO</>}
          sub="No hace falta tarjeta de crédito"
        />
      </Sequence>

      <Sequence from={210} durationInFrames={70}>
        <Punch
          top="Mejor precio"
          main={<>¿MÁS BARATO<br />EN OTRO LADO?</>}
          sub="Lo igualamos. Garantizado."
        />
      </Sequence>

      <Sequence from={280} durationInFrames={110}>
        <Safe>
          <Pop>
            <div style={{ textAlign: "center", color: C.muted, fontSize: 32, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>
              Desde
            </div>
          </Pop>
          <div style={{ transform: `scale(${price})`, textAlign: "center" }}>
            <H1 size={120} align="center">
              <span style={{ color: C.brand }}>$60.000</span>
            </H1>
            <div style={{ color: C.white, fontSize: 44, fontWeight: 800, letterSpacing: 6 }}>POR DÍA</div>
          </div>
          <div style={{ marginTop: 50 }}>
            <CarStrip />
          </div>
        </Safe>
      </Sequence>

      <Sequence from={390} durationInFrames={90}>
        <EndCard />
      </Sequence>
    </BG>
  );
};

export const SINVUELTAS_DURATION = 480;
