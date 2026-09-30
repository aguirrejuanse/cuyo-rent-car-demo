"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { todayPlus } from "@/lib/fleet";

export default function BookingWidget({ t, locale }: { t: Dict; locale: Locale }) {
  const router = useRouter();
  const [pickup, setPickup] = useState("airport");
  const [dropoff, setDropoff] = useState("airport");
  const [from, setFrom] = useState(todayPlus(2));
  const [to, setTo] = useState(todayPlus(6));

  const locOpts = Object.entries(t.widget.locations) as [string, string][];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/${locale}/reservar?pickup=${pickup}&dropoff=${dropoff}&from=${from}&to=${to}`);
  }

  const field = "w-full rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm font-medium text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

  return (
    <form
      onSubmit={submit}
      className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur md:grid-cols-5 md:p-5"
    >
      <label className="flex flex-col gap-1 text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t.widget.pickup}</span>
        <select value={pickup} onChange={(e) => setPickup(e.target.value)} className={field}>
          {locOpts.map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t.widget.return}</span>
        <select value={dropoff} onChange={(e) => setDropoff(e.target.value)} className={field}>
          {locOpts.map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t.widget.pickupDate}</span>
        <input type="date" value={from} min={todayPlus(0)} onChange={(e) => setFrom(e.target.value)} className={field} />
      </label>
      <label className="flex flex-col gap-1 text-left">
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-500">{t.widget.returnDate}</span>
        <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className={field} />
      </label>
      <button
        type="submit"
        className="col-span-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 md:col-span-1 md:self-end"
      >
        {t.widget.search}
      </button>
    </form>
  );
}
