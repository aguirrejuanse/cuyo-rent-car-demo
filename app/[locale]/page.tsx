import Image from "next/image";
import Link from "next/link";
import BookingWidget from "@/components/BookingWidget";
import Faq from "@/components/Faq";
import {
  IconBag,
  IconBolt,
  IconGear,
  IconPin,
  IconShield,
  IconStar,
  IconTag,
  IconUsers,
  IconWhatsApp,
} from "@/components/icons";
import { FLEET, formatARS, WHATSAPP_URL } from "@/lib/fleet";
import { getDict, type Locale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const benefitIcons = [IconBolt, IconTag, IconShield];

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[92vh] flex-col justify-end overflow-hidden bg-ink-950">
        <Image src="/images/hero.jpg" alt="Ruta de Mendoza con los Andes" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/30 to-ink-950/90" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 pt-32 sm:px-6">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-brand-400" />
            {t.hero.badge}
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-[1.05] text-white sm:text-6xl">
            {t.hero.titleA}
            <br />
            <span className="text-brand-400">{t.hero.titleB}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">{t.hero.subtitle}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#widget"
              className="rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              {t.hero.cta}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              <IconWhatsApp /> {t.hero.secondary}
            </a>
          </div>
          <div id="widget" className="mt-10 scroll-mt-24">
            <BookingWidget t={t} locale={locale as Locale} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-ink-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-5 sm:px-6 md:grid-cols-4">
          {[
            { top: "4.9 ★", bottom: t.trust.rating },
            { top: "18.6K", bottom: t.trust.followers },
            { top: "∞", bottom: t.trust.km },
            { top: "5 min", bottom: t.trust.delivery },
          ].map((s) => (
            <div key={s.bottom} className="text-center">
              <p className="text-2xl font-black text-ink-900">{s.top}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{s.bottom}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FLEET */}
      <section id="flota" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-black text-ink-900 sm:text-4xl">{t.fleet.title}</h2>
          <p className="mt-2 text-ink-600">{t.fleet.subtitle}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FLEET.map((car) => (
              <article
                key={car.id}
                className="group overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="relative h-44 bg-ink-950">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-800">
                    {t.fleet.categories[car.category]}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">{car.name}</h3>
                      <p className="text-xs text-ink-400">{t.fleet.orSimilar}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-ink-400">{t.fleet.from}</p>
                      <p className="text-lg font-black text-brand-600">
                        {formatARS(car.pricePerDay)}
                        <span className="text-xs font-semibold text-ink-400">{t.fleet.perDay}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs font-medium text-ink-500">
                    <span className="inline-flex items-center gap-1.5"><IconUsers /> {car.seats} {t.fleet.seats}</span>
                    <span className="inline-flex items-center gap-1.5"><IconBag /> {car.bags} {t.fleet.bags}</span>
                    <span className="inline-flex items-center gap-1.5"><IconGear /> {car.transmission}</span>
                    <span className="inline-flex items-center gap-1.5 text-brand-600"><IconBolt /> {t.fleet.unlimited}</span>
                  </div>
                  <Link
                    href={`/${locale}/reservar?car=${car.id}`}
                    className="mt-5 block rounded-xl bg-ink-900 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-600"
                  >
                    {t.fleet.book}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="beneficios" className="scroll-mt-20 bg-ink-950 py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-black sm:text-4xl">{t.benefits.title}</h2>
          <p className="mt-2 text-white/60">{t.benefits.subtitle}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.benefits.items.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl font-black text-ink-900 sm:text-4xl">{t.destinations.title}</h2>
          <p className="mt-2 text-ink-600">{t.destinations.subtitle}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.destinations.items.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between rounded-2xl border border-ink-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <IconPin />
                  </span>
                  <div>
                    <p className="font-bold text-ink-900">{d.name}</p>
                    <p className="text-xs text-ink-500">{d.desc}</p>
                  </div>
                </div>
                <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-bold text-ink-600">{d.dist}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="opiniones" className="scroll-mt-20 bg-brand-50/60 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-black text-ink-900 sm:text-4xl">{t.reviews.title}</h2>
            <Image src="/images/stars.webp" alt="5 estrellas" width={130} height={26} className="h-6 w-auto" />
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.reviews.items.map((r) => (
              <blockquote key={r.name} className="flex flex-col rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex gap-0.5 text-brand-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-ink-700">“{r.text}”</p>
                <footer className="mt-4 text-sm font-bold text-ink-900">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-3xl font-black text-ink-900 sm:text-4xl">{t.faq.title}</h2>
          <Faq items={t.faq.items} />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink-950 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-black sm:text-5xl">{t.cta.title}</h2>
          <p className="mt-4 text-white/70">{t.cta.sub}</p>
          <Link
            href={`/${locale}/reservar`}
            className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3.5 text-base font-bold text-white transition hover:bg-brand-600"
          >
            {t.cta.button}
          </Link>
        </div>
      </section>

      {/* WhatsApp float */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition hover:scale-110"
      >
        <IconWhatsApp className="h-6 w-6" />
      </a>
    </>
  );
}
