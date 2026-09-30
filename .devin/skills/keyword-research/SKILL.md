---
name: keyword-research
description: "Trigger: keyword research, keyword mapping, mapear/encontrar keywords, kws para una URL, investigación SEO/SEM, estimar tráfico, SERP de competidores, eventos Mendoza demanda. Runs the Cuyo Rent a Car keyword→landing/ads research loop with the DataForSEO MCP: live SERP per geo, competitor keyword extraction, intent filtering, landing mapping, demand estimate."
metadata:
  author: aguirrejuanse
  version: "1.0"
---

# Cuyo Rent a Car — Keyword Research

Run the keyword→landing/keyword→campaign research loop for Cuyo Rent a Car (alquiler de autos, Mendoza) using real data — never fabricated volumes. Project is a demo site + booking engine pitch; research feeds SEO landings AND Google/Meta Ads planning.

## Prerequisites (manual stack — no paid APIs)

1. **pytrends** (relative demand, seasonality, related queries): venv in `/tmp/trendsv` or install `pip install pytrends` + pin `urllib3<2` (pytrends uses removed `method_whitelist` kwarg). Geo `AR` for local, `BR` for Brazilian inbound. Trends gives relative index (0–100), never absolute volume — always label output as "índice relativo".
2. **Keyword Planner CSVs** for absolute volumes/CPC: user exports from Google Ads → drop in `/keywords/`. Free with any Google Ads account (no spend needed; gives ranges without active campaigns). Label everything "planner-source".
3. **Never invent a number.** No data → "pendiente de confirmar".

## Context to load first (always)

- `README.md` — workflows del negocio (100% WhatsApp hoy, sin booking engine)
- `lib/fleet.ts` — catálogo real de flota y precios (nunca inventar autos ni precios)
- `lib/i18n.ts` — mercados: ES (AR), EN, **PT — Brasil es el 2° origen de turistas internacionales de Mendoza**

## Seed terms (initial, expand from data)

- Core: `alquiler de autos mendoza`, `rent a car mendoza`, `alquiler auto aeropuerto mendoza`, `car rental mendoza airport`
- PT (Brasil inbound): `aluguel de carro mendoza`, `alugar carro mendoza aeroporto`
- Diferenciales: `alquiler auto sin tarjeta de credito mendoza`, `alquiler auto garantia efectivo`, `rent a car mendoza km ilimitado`
- Event-driven (con fecha y spike de demanda): `alquiler autos vendimia`, `auto mendoza fiesta de la cerveza`, `auto para sunsetstrip potrerillos`, `alquiler auto temporada ski las leñas`
- Comparadores: `mejor rent a car mendoza`, `alquiler auto mendoza barato precios`

## Method

1. **SERP scan per seed** — SERP API live, `location_name: "Mendoza,Argentina"` + mirror queries con `location_name: "São Paulo,Brazil"`, `language: pt`, `gl: br` para demanda inbound. Per keyword record: local pack? ads? top organic domains? SERP features?
2. **Competitor classification:**
   - **Directos locales**: Mdz Rent a Car, otras rentadoras mendocinas con sitio indexable
   - **Cadenas nacionales/intl**: Localiza, Hertz, Avis, Europcar, Flexicar — tienen landings + presupuesto ads; anotar pero no tratar como vencibles
   - **P2P**: Rentennials (startup mendocina) — competidor real en SEO/paid
   - **Agregadores/OTAs**: Kayak, DiscoverCars, Booking — cuelgan del intent transaccional, no son competencia directa de marca
   - **Social-only**: perfiles IG sin sitio — señal de mercado, no competencia SEO
3. **Keyword pull (manual).** Per seed: pytrends `related_queries` (top + rising — gold for event/demand keywords) + `interest_over_time` para estacionalidad. Absolute volume/CPC only from Keyword Planner CSVs if the user drops them.
4. **Intent filters:**
   - Drop: flota para empresas/uber/cabify, autos antiguos para eventos/bodas, "renta de autos" mal escrito si no es variante real, alquiler a largo plazo leasing, keywords de otras provincias (salvo cross-border Chile/Brasil que sí viajan)
   - Keep + priorizar: `sin tarjeta`, `garantia en efectivo`, `km ilimitado`, `aeropuerto` — son los diferenciales reales del negocio
   - Event keywords: tag con ventana de spike (vendimia = feb–mar, ski = jun–sep, cerveza+cattaneo = dic) — sirven para campañas estacionales más que landings permanentes
5. **Map keywords → assets:** landing nueva (slug `alquiler-de-autos-<x>-mendoza`), sección FAQ existente, o campaña paid (keyword de ads, no necesita landing). Una intención primaria por URL — flag cannibalization.
6. **Estimate.** Vol × CTR-by-position = tráfico SEO; vol × CPC = costo paid por keyword. Rangos conservador/optimista, documentar supuestos.
7. **Output.** Markdown: tabla `Keyword | Vol | CPC | Intent | Asset propuesto | Nota` + delta competidores + escenarios + next actions. **No tocar código ni textos del sitio sin pedirlo.**

## Guardrails

- **Never fabricate volumes, rankings, CPCs, or competitor data.** API data or explicitly labeled "pendiente de confirmar".
- Local reality: mercado fragmentado, WhatsApp/IG-led — SERP orgánico débil = oportunidad, no error de datos.
- Eventos generan demanda real pero temporal: no construir landings permanentes para keywords de spike salvo que haya recurrencia anual (vendimia, temporada ski sí — un concierto puntual no).
