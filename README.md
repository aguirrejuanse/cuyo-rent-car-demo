# Cuyo Rent a Car — Demo

Trilingual marketing site + booking engine demo built for
[cuyorentacar.com](https://cuyorentacar.com), a car rental company in
Mendoza, Argentina. Includes a sales panel that attributes each mock
reservation to its acquisition channel.

**Live demo:** https://cuyo-rent-car-demo.vercel.app

## What it does

- **Trilingual landing** — ES / EN / PT (`/es`, `/en`, `/pt`): hero,
  search widget, fleet, benefits, destinations, reviews, FAQ.
- **Booking engine** — 5-step reservation flow issuing `CUY-XXXXXX`
  confirmation codes.
- **Sales panel** — every reservation made through the demo shows up with
  its origin (Instagram / TikTok / Google via `utm_source`), amount and
  commission — live sales-attribution demo with zero backend.
- **Programmatic ad creatives** — four vertical videos (1080×1920, 30fps)
  rendered with Remotion, including a site tour built from real
  Playwright-captured screenshots inside a phone mockup.

## Routes

| Route | Content |
|---|---|
| `/es` | Landing: hero, search, fleet, benefits, destinations, reviews, FAQ |
| `/es/reservar` | 5-step mock booking engine, `CUY-XXXXXX` code |
| `/es/panel` | Sales panel: reservations, channel origin, 10% commission |

Reservations persist in `localStorage` and surface in `/panel` — the
attribution loop is demoable end to end in one browser.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 ·
Remotion 4 · pnpm

## Engineering notes

- **Custom i18n routing** — locale-prefixed routes (`/[locale]/…`) for
  ES, EN and PT without a framework dependency.
- **Channel attribution with no backend** — the `utm_source` param is
  carried through the booking flow into the persisted reservation, so
  every sale in `/panel` shows where it came from.
- **Code-based reservations** — `CUY-XXXXXX` confirmation codes make the
  flow feel real without a database.
- **Video pipeline** — `videos/capture.mjs` drives Playwright to capture
  real screenshots of the running demo into `videos/public/shots/`, which
  the Remotion composition assembles into a phone-mockup site tour with a
  mocked WhatsApp chat.

## Getting started

```bash
pnpm install
pnpm dev         # http://localhost:3000
```

No environment variables needed.

### Videos

```bash
cd videos && npm install
npx remotion studio                                        # preview
npx remotion render reserva-rapida out/reserva-rapida.mp4  # render
```

Renders land in `videos/out/`: `reserva-rapida` (18s, booking flow),
`mendoza-te-espera` (16s, destinations), `sin-vueltas` (16s, value props
+ price anchor), `site-tour` (35s, full site tour in phone mockup).
