"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LOCALES, LOCALE_LABELS, type Dict, type Locale } from "@/lib/i18n";

export default function Nav({ t, locale }: { t: Dict; locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const localizedPath = (l: Locale) => pathname.replace(/^\/(es|en|pt)/, `/${l}`);
  const anchor = (id: string) => `/${locale}/#${id}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/images/logo.webp" alt="Cuyo Rent a Car" width={120} height={44} className="h-9 w-auto" />
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
          <a href={anchor("flota")} className="hover:text-white">{t.nav.fleet}</a>
          <a href={anchor("beneficios")} className="hover:text-white">{t.nav.benefits}</a>
          <a href={anchor("opiniones")} className="hover:text-white">{t.nav.reviews}</a>
          <a href={anchor("faq")} className="hover:text-white">{t.nav.faq}</a>
          <Link href={`/${locale}/panel`} className="hover:text-white">{t.nav.panel}</Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full border border-white/15 p-1 text-xs font-semibold text-white/70 sm:flex">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={localizedPath(l)}
                className={`rounded-full px-2 py-1 uppercase ${l === locale ? "bg-brand-500 text-white" : "hover:text-white"}`}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={`/${locale}/reservar`}
            className="rounded-full bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600"
          >
            {t.nav.book}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white md:hidden"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink-950 px-4 pb-4 pt-2 text-sm text-white/80 md:hidden">
          {[["flota", t.nav.fleet], ["beneficios", t.nav.benefits], ["opiniones", t.nav.reviews], ["faq", t.nav.faq]].map(
            ([id, label]) => (
              <a key={id} href={anchor(id)} onClick={() => setOpen(false)} className="block py-2">
                {label}
              </a>
            ),
          )}
          <Link href={`/${locale}/panel`} onClick={() => setOpen(false)} className="block py-2">
            {t.nav.panel}
          </Link>
          <div className="mt-2 flex gap-2 border-t border-white/10 pt-3">
            {LOCALES.map((l) => (
              <Link key={l} href={localizedPath(l)} className={`rounded-full px-3 py-1 text-xs uppercase ${l === locale ? "bg-brand-500 text-white" : "border border-white/15"}`}>
                {LOCALE_LABELS[l]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
