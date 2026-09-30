import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BG, C, H1, Pop } from "./lib";

// Diagonal brand streaks, dc-racing style
const Streaks: React.FC = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          bottom: 60 + i * 90,
          left: -120 - i * 40,
          width: 620 - i * 90,
          height: 7,
          background: C.brand,
          opacity: 0.5 - i * 0.1,
          transform: "rotate(-14deg)",
          borderRadius: 4,
        }}
      />
    ))}
    <div
      style={{
        position: "absolute",
        top: 90,
        right: -160,
        width: 420,
        height: 7,
        background: C.brand,
        opacity: 0.35,
        transform: "rotate(-14deg)",
        borderRadius: 4,
      }}
    />
  </>
);

// iPhone-style frame around a real screenshot
const Phone: React.FC<{ src?: string; children?: React.ReactNode; delay?: number }> = ({ src, children, delay = 8 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 17, stiffness: 140 } });
  const drift = interpolate(frame, [delay, delay + 130], [0, -18], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: 620,
        margin: "0 auto",
        padding: 14,
        borderRadius: 64,
        background: "#171412",
        border: "2px solid rgba(255,255,255,0.08)",
        boxShadow: "0 60px 140px rgba(0,0,0,0.65), 0 0 0 1px rgba(0,0,0,0.8)",
        opacity: interpolate(s, [0, 1], [0, 1]),
        transform: `translateY(${(1 - s) * 90 + drift}px) scale(${0.94 + s * 0.06})`,
      }}
    >
      <div style={{ position: "relative", borderRadius: 52, overflow: "hidden", background: "#fafaf9", height: 1250 }}>
        {/* notch */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 190,
            height: 42,
            borderRadius: 999,
            background: "#0c0a09",
            zIndex: 10,
          }}
        />
        {src ? <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} /> : children}
      </div>
    </div>
  );
};

const Eyebrow: React.FC<{ n: string; label: string }> = ({ n, label }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
    <span
      style={{
        background: C.brand,
        color: C.white,
        fontSize: 30,
        fontWeight: 900,
        padding: "8px 18px",
        borderRadius: 10,
        letterSpacing: 1,
      }}
    >
      {n}
    </span>
    <span style={{ color: C.brandLight, fontSize: 30, fontWeight: 800, letterSpacing: 5, textTransform: "uppercase" }}>{label}</span>
  </div>
);

const Scene: React.FC<{ n: string; label: string; title: string; sub: string; src?: string; wa?: boolean }> = ({
  n,
  label,
  title,
  sub,
  src,
  wa,
}) => {
  const frame = useCurrentFrame();
  // Exit: whole scene slides up + fades so scenes flow instead of hard-cutting
  const exit = interpolate(frame, [SCENE_FRAMES - 18, SCENE_FRAMES - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        padding: "170px 60px 0",
        opacity: 1 - exit,
        transform: `translateY(${-90 * exit}px)`,
      }}
    >
      <Pop>
        <Eyebrow n={n} label={label} />
      </Pop>
      <Pop delay={8} style={{ marginTop: 26 }}>
        <H1 size={86}>{title}</H1>
      </Pop>
      <Pop delay={14} style={{ marginTop: 16 }}>
        <div style={{ color: C.muted, fontSize: 34, fontWeight: 600, lineHeight: 1.3 }}>{sub}</div>
      </Pop>
      <div style={{ marginTop: 56 }}>
        {wa ? <Phone delay={12}><WhatsAppMock /></Phone> : <Phone delay={12} src={src} />}
      </div>
    </AbsoluteFill>
  );
};

// Fake WhatsApp chat — "la reserva te llega así"
const WhatsAppMock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const b1 = spring({ frame: frame - 45, fps, config: { damping: 14, stiffness: 160 } });
  const tick = spring({ frame: frame - 85, fps, config: { damping: 14, stiffness: 160 } });
  return (
    <div style={{ position: "absolute", inset: 0, background: "#0b141a", padding: "90px 26px 26px", display: "flex", flexDirection: "column" }}>
      {/* WA header */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "14px 6px 22px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ width: 76, height: 76, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", color: C.white, fontWeight: 900, fontSize: 30 }}>
          CR
        </div>
        <div>
          <div style={{ color: C.white, fontSize: 34, fontWeight: 800 }}>Cuyo Rent a Car</div>
          <div style={{ color: "#8696a0", fontSize: 26 }}>en línea</div>
        </div>
      </div>
      {/* outgoing bubble */}
      <div
        style={{
          alignSelf: "flex-end",
          marginTop: 60,
          maxWidth: "82%",
          background: "#005c4b",
          borderRadius: "22px 22px 6px 22px",
          padding: "26px 30px",
          opacity: interpolate(b1, [0, 1], [0, 1]),
          transform: `translateY(${(1 - b1) * 40}px)`,
        }}
      >
        <div style={{ color: "#e7ffdb", fontSize: 31, lineHeight: 1.45, fontWeight: 500 }}>
          Hola! Mi reserva es <b>CUY-MEK752</b> — Fiat Cronos del 02/10 al 06/10. Retiro en Aeropuerto MDZ.
        </div>
        <div style={{ textAlign: "right", color: "#8696a0", fontSize: 24, marginTop: 10 }}>
          10:42 <span style={{ color: "#53bdeb", opacity: tick, fontSize: 28 }}>✓✓</span>
        </div>
      </div>
      {/* incoming reply */}
      <div
        style={{
          alignSelf: "flex-start",
          marginTop: 26,
          maxWidth: "70%",
          background: "#202c33",
          borderRadius: "22px 22px 22px 6px",
          padding: "26px 30px",
          opacity: tick,
          transform: `translateY(${(1 - tick) * 40}px)`,
        }}
      >
        <div style={{ color: "#e9edef", fontSize: 31, lineHeight: 1.45, fontWeight: 500 }}>
          Listo, Martín. Tu Cronos te espera el 02/10 a las 10:00 en el aeropuerto. ✈️
        </div>
        <div style={{ textAlign: "right", color: "#8696a0", fontSize: 24, marginTop: 10 }}>10:43</div>
      </div>
    </div>
  );
};

const SCENES = [
  { n: "01", label: "Inicio", title: "TU MARCA,\nONLINE.", sub: "Landing premium en 3 idiomas, con tus fotos y tu identidad.", src: "shots/hero.png" },
  { n: "02", label: "Flota", title: "TUS AUTOS,\nCON PRECIO.", sub: "Catálogo real: foto, categoría y tarifa por día.", src: "shots/flota.png" },
  { n: "03", label: "Viaje", title: "ARMA SU VIAJE\nEN 1 MINUTO.", sub: "Aeropuerto u hotel, fechas y horario. Todo desde el celu.", src: "shots/reserva-viaje.png" },
  { n: "04", label: "Auto", title: "ELIGE SU AUTO,\nVE EL TOTAL.", sub: "Precio claro desde el primer click. Sin llamar, sin esperar.", src: "shots/reserva-auto.png" },
  { n: "05", label: "Resumen", title: "TODO A LA VISTA.", sub: "Total por día, extras y depósito. Sin letra chica.", src: "shots/reserva-datos.png" },
  { n: "06", label: "Confirmación", title: "VENTA\nCONFIRMADA.", sub: "Código de reserva único. Cada venta queda registrada.", src: "shots/confirmada.png" },
  { n: "07", label: "WhatsApp", title: "TE LLEGA\nAL INSTANTE.", sub: "La reserva llega a tu WhatsApp ya redactada.", wa: true },
  { n: "08", label: "Panel", title: "Y VOS VES\nCADA VENTA.", sub: "Origen, monto y comisión — venta por venta.", src: "shots/panel.png" },
];

const INTRO = 160;
const SCENE_FRAMES = 140;
const OUTRO = 170;

// Continuous progress bar across the scene block
const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [INTRO, INTRO + SCENES.length * SCENE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 10,
        width: "100%",
        background: "rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ height: "100%", width: `${p * 100}%`, background: C.brand, borderRadius: "0 6px 6px 0" }} />
    </div>
  );
};

const IntroCard: React.FC = () => {
  const frame = useCurrentFrame();
  const exit = interpolate(frame, [INTRO - 18, INTRO - 2], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        padding: "0 70px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 40,
        opacity: 1 - exit,
        transform: `translateY(${-90 * exit}px)`,
      }}
    >
      <Pop>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <Img src={staticFile("logo.webp")} style={{ width: 210, height: "auto" }} />
        </div>
      </Pop>
      <Pop delay={14}>
        <div style={{ color: C.brandLight, fontSize: 34, fontWeight: 800, letterSpacing: 6, textTransform: "uppercase" }}>
          Para Cuyo Rent a Car
        </div>
      </Pop>
      <Pop delay={28}>
        <H1 size={104}>
          AUTOMATIZÁ<br />TUS RESERVAS.
        </H1>
      </Pop>
      <Pop delay={52}>
        <H1 size={88}>
          <span style={{ color: C.brand }}>TU WEB COTIZANDO 24/7.</span>
        </H1>
      </Pop>
      <Pop delay={78}>
        <div style={{ color: C.muted, fontSize: 36, fontWeight: 600, lineHeight: 1.4 }}>
          Del click a la reserva confirmada — sin intervención.
        </div>
      </Pop>
    </AbsoluteFill>
  );
};

export const SiteTour: React.FC = () => (
  <BG>
    <Streaks />
    <Progress />

    {/* Intro */}
    <Sequence durationInFrames={INTRO}>
      <IntroCard />
    </Sequence>

    {SCENES.map((s, i) => (
      <Sequence key={s.n} from={INTRO + i * SCENE_FRAMES} durationInFrames={SCENE_FRAMES}>
        <Scene {...s} />
      </Sequence>
    ))}

    {/* Outro */}
    <Sequence from={INTRO + SCENES.length * SCENE_FRAMES} durationInFrames={OUTRO}>
      <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 40, padding: "0 60px" }}>
        <Pop>
          <Img src={staticFile("logo.webp")} style={{ width: 400, height: "auto" }} />
        </Pop>
        <Pop delay={12}>
          <H1 size={72} align="center">ESTO NO ES<br />UNA MAQUETA.</H1>
        </Pop>
        <Pop delay={24}>
          <div style={{ color: C.muted, fontSize: 36, fontWeight: 600, textAlign: "center", lineHeight: 1.4 }}>
            Entrá y probalo desde el celu.
          </div>
        </Pop>
        <Pop delay={34}>
          <div
            style={{
              background: C.brand,
              color: C.white,
              fontSize: 38,
              fontWeight: 900,
              padding: "24px 56px",
              borderRadius: 999,
              letterSpacing: 0.5,
            }}
          >
            cuyo-rent-car-demo.vercel.app
          </div>
        </Pop>
      </AbsoluteFill>
    </Sequence>
  </BG>
);

export const SITETOUR_DURATION = INTRO + SCENES.length * SCENE_FRAMES + OUTRO; // 1040
