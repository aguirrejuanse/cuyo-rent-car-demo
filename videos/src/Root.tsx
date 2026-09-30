import React from "react";
import { Composition } from "remotion";
import { Mendoza, MENDOZA_DURATION } from "./Mendoza";
import { Reserva, RESERVA_DURATION } from "./Reserva";
import { SinVueltas, SINVUELTAS_DURATION } from "./SinVueltas";
import { SiteTour, SITETOUR_DURATION } from "./SiteTour";

const W = 1080;
const H = 1920;
const FPS = 30;

export const Root: React.FC = () => (
  <>
    <Composition id="reserva-rapida" component={Reserva} durationInFrames={RESERVA_DURATION} fps={FPS} width={W} height={H} />
    <Composition id="mendoza-te-espera" component={Mendoza} durationInFrames={MENDOZA_DURATION} fps={FPS} width={W} height={H} />
    <Composition id="sin-vueltas" component={SinVueltas} durationInFrames={SINVUELTAS_DURATION} fps={FPS} width={W} height={H} />
    <Composition id="site-tour" component={SiteTour} durationInFrames={SITETOUR_DURATION} fps={FPS} width={W} height={H} />
  </>
);
