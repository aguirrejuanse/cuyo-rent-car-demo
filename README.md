# Cuyo Rent a Car — Demo comercial

Demo de sitio web + motor de reservas para [cuyorentacar.com](https://cuyorentacar.com), construida para presentar una propuesta de trabajo por comisión por venta.

## Stack

- **Next.js 16** (App Router) + React 19 + Tailwind CSS 4
- i18n propio: **ES / EN / PT** (`/es`, `/en`, `/pt`)
- **Remotion 4** para los videos publicitarios (`videos/`)

## Sitio

| Ruta | Contenido |
|---|---|
| `/es` | Landing: hero, buscador, flota, beneficios, destinos, reviews, FAQ |
| `/es/reservar` | Motor de reservas mock en 5 pasos con código `CUY-XXXXXX` |
| `/es/panel` | Panel de ventas: reservas, origen (Instagram/TikTok/Google), comisión 10% |

Las reservas hechas en la demo se guardan en `localStorage` y aparecen en `/panel` — demuestra atribución de ventas en vivo.

## Comandos

```bash
pnpm dev          # dev server
pnpm build        # build producción
cd videos && npm install
npx remotion studio                        # preview de videos
npx remotion render reserva-rapida out/reserva-rapida.mp4
```

Videos generados en `videos/out/` (1080×1920, 30fps):

- `reserva-rapida.mp4` — 18s, muestra el flujo de reserva
- `mendoza-te-espera.mp4` — 16s, aspiracional destinos + km ilimitados
- `sin-vueltas.mp4` — 16s, propuestas de valor + precio ancla
- `site-tour.mp4` — 35s, tour del sitio en mockup de teléfono (estilo pitch: "tu canal de reservas ya está andando") — el video para mostrarle al dueño

`site-tour` usa screenshots reales de la demo capturados con Playwright (`node capture.mjs` → `videos/public/shots/`) y un chat de WhatsApp mockeado en la composición.

## Workflows del negocio actual (detectados)

1. **Adquisición**: Instagram (@cuyorentacar, 18.6K) + TikTok + Google → landing
2. **Contacto**: 100% WhatsApp (`wa.link/y18li7` / wa.me/5492616534148) — el sitio NO tiene booking engine
3. **Reserva**: manual por chat — sin trackeo de origen ni registro
4. **Entrega**: aeropuerto MDZ o domicilio/hotel (costo extra)
5. **Pago**: tarjeta crédito/débito, efectivo; promo Galicia 12 cuotas
6. **Garantía**: depósito $500.000 reembolsable (diferencial: aceptan efectivo)
7. **Post-venta**: WhatsApp para dudas/problemas durante el alquiler

## El pitch

Hoy **ninguna venta queda atribuida a un canal**: todo se cierra por chat. La demo muestra (a) un checkout online con código de reserva, (b) un panel donde cada venta tiene origen y monto — la base para cobrar % por venta trackeable.
