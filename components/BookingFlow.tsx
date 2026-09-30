"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import {
  DEPOSIT_ARS,
  daysBetween,
  FLEET,
  formatARS,
  genCode,
  saveReservation,
  todayPlus,
  WHATSAPP_URL,
} from "@/lib/fleet";
import { IconBolt, IconPin, IconWhatsApp } from "@/components/icons";

type Extras = { delivery: boolean; seat: boolean; driver: boolean; coverage: boolean };

const input =
  "w-full rounded-xl border border-ink-200 bg-white px-3.5 py-2.5 text-sm font-medium text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20";

export default function BookingFlow({ t, locale }: { t: Dict; locale: Locale }) {
  const sp = useSearchParams();
  const [step, setStep] = useState(0);
  const [pickup, setPickup] = useState(sp.get("pickup") ?? "airport");
  const [dropoff, setDropoff] = useState(sp.get("dropoff") ?? "airport");
  const [from, setFrom] = useState(sp.get("from") ?? todayPlus(2));
  const [to, setTo] = useState(sp.get("to") ?? todayPlus(6));
  const [time, setTime] = useState("10:00");
  const [carId, setCarId] = useState(sp.get("car") ?? FLEET[0].id);
  const [extras, setExtras] = useState<Extras>({ delivery: false, seat: false, driver: false, coverage: false });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [license, setLicense] = useState("");
  const [payment, setPayment] = useState<"card" | "cash">("card");
  const [code, setCode] = useState<string | null>(null);

  const days = Math.max(1, daysBetween(from, to));
  const car = FLEET.find((c) => c.id === carId) ?? FLEET[0];
  const locOpts = Object.entries(t.widget.locations) as [string, string][];
  const extrasList = Object.entries(t.booking.extras) as [keyof Extras, { name: string; desc: string; price: number }][];

  const extrasTotal = useMemo(
    () =>
      extrasList.reduce((sum, [key, e]) => {
        if (!extras[key]) return sum;
        return sum + (key === "delivery" ? e.price : e.price * days);
      }, 0),
    [extras, extrasList, days],
  );
  const total = car.pricePerDay * days + extrasTotal;

  function confirm() {
    const c = genCode();
    setCode(c);
    saveReservation({
      code: c,
      carId: car.id,
      pickup: `${from} ${time}`,
      dropoff: to,
      days,
      total,
      source: sp.get("utm_source") ?? "direct",
      createdAt: new Date().toISOString(),
    });
    setStep(4);
    window.scrollTo({ top: 0 });
  }

  const step0ok = days > 0 && from < to;
  const step3ok = name.trim() && /\S+@\S+\.\S+/.test(email) && phone.trim().length >= 6;

  return (
    <div className="mt-8">
      {/* Stepper */}
      <ol className="mb-8 flex flex-wrap items-center gap-2 text-xs font-bold">
        {t.booking.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full ${
                i <= step ? "bg-brand-500 text-white" : "bg-ink-200 text-ink-500"
              }`}
            >
              {i + 1}
            </span>
            <span className={i <= step ? "text-ink-900" : "text-ink-400"}>{s}</span>
            {i < t.booking.steps.length - 1 && <span className="mx-1 h-px w-6 bg-ink-300" />}
          </li>
        ))}
      </ol>

      {/* STEP 0 — trip */}
      {step === 0 && (
        <div className="rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.pickupPlace}</span>
              <select value={pickup} onChange={(e) => setPickup(e.target.value)} className={input}>
                {locOpts.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.returnPlace}</span>
              <select value={dropoff} onChange={(e) => setDropoff(e.target.value)} className={input}>
                {locOpts.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.pickupDate}</span>
              <input type="date" value={from} min={todayPlus(0)} onChange={(e) => setFrom(e.target.value)} className={input} />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.returnDate}</span>
                <input type="date" value={to} min={from} onChange={(e) => setTo(e.target.value)} className={input} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.time}</span>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={input} />
              </label>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-600">
              {days} {days === 1 ? t.booking.day : t.booking.days}
            </p>
            <button
              onClick={() => setStep(1)}
              disabled={!step0ok}
              className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-40"
            >
              {t.booking.next}
            </button>
          </div>
        </div>
      )}

      {/* STEP 1 — car */}
      {step === 1 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-ink-900">{t.booking.selectCar}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {FLEET.map((c) => (
              <button
                key={c.id}
                onClick={() => setCarId(c.id)}
                className={`flex items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left transition ${
                  carId === c.id ? "border-brand-500 shadow-md" : "border-ink-200 hover:border-ink-300"
                }`}
              >
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-ink-950">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-ink-900">{c.name}</p>
                  <p className="text-xs text-ink-500">{t.fleet.categories[c.category]} · {c.seats} {t.fleet.seats}</p>
                  <p className="mt-1 font-black text-brand-600">
                    {formatARS(c.pricePerDay * days)}
                    <span className="text-xs font-medium text-ink-400"> / {days} {days === 1 ? t.booking.day : t.booking.days}</span>
                  </p>
                </div>
                {carId === c.id && <span className="text-brand-500">✓</span>}
              </button>
            ))}
          </div>
          <Nav step={step} setStep={setStep} nextLabel={t.booking.next} backLabel={t.booking.back} />
        </div>
      )}

      {/* STEP 2 — extras */}
      {step === 2 && (
        <div>
          <h2 className="mb-4 text-lg font-bold text-ink-900">{t.booking.extrasTitle}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {extrasList.map(([key, e]) => (
              <label
                key={key}
                className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 bg-white p-4 transition ${
                  extras[key] ? "border-brand-500" : "border-ink-200 hover:border-ink-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={extras[key]}
                  onChange={(ev) => setExtras({ ...extras, [key]: ev.target.checked })}
                  className="mt-1 h-4 w-4 accent-brand-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-ink-900">{e.name}</p>
                  <p className="text-xs text-ink-500">{e.desc}</p>
                </div>
                <p className="text-sm font-bold text-ink-900">
                  {formatARS(e.price)}
                  <span className="block text-right text-[10px] font-medium text-ink-400">
                    {key === "delivery" ? t.booking.once : t.booking.perDay}
                  </span>
                </p>
              </label>
            ))}
          </div>
          <Nav step={step} setStep={setStep} nextLabel={t.booking.next} backLabel={t.booking.back} />
        </div>
      )}

      {/* STEP 3 — details + summary */}
      {step === 3 && (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-ink-200 bg-white p-6 lg:col-span-3">
            <h2 className="mb-4 text-lg font-bold text-ink-900">{t.booking.driverTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.name}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className={input} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.email}</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.phone}</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={input} />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.license}</span>
                <input value={license} onChange={(e) => setLicense(e.target.value)} className={input} />
              </label>
              <div className="sm:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-500">{t.booking.payment}</span>
                <div className="mt-1.5 grid grid-cols-2 gap-3">
                  {(["card", "cash"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPayment(p)}
                      className={`rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition ${
                        payment === p ? "border-brand-500 bg-brand-50 text-brand-700" : "border-ink-200 text-ink-600"
                      }`}
                    >
                      {t.booking.paymentOpts[p]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-ink-200 bg-white p-6 lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">{t.booking.summary}</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="relative h-14 w-22 overflow-hidden rounded-lg bg-ink-950" style={{ width: 88 }}>
                <Image src={car.image} alt={car.name} fill className="object-cover" />
              </div>
              <div>
                <p className="font-bold text-ink-900">{car.name}</p>
                <p className="text-xs text-ink-500">
                  {from} → {to} · {days} {days === 1 ? t.booking.day : t.booking.days}
                </p>
                <p className="inline-flex items-center gap-1 text-xs text-ink-500">
                  <IconPin className="h-3.5 w-3.5" />
                  {t.widget.locations[pickup as keyof typeof t.widget.locations]}
                </p>
              </div>
            </div>
            <dl className="mt-4 space-y-2 border-t border-ink-100 pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-600">{car.name} × {days}</dt>
                <dd className="font-semibold">{formatARS(car.pricePerDay * days)}</dd>
              </div>
              {extrasList.filter(([k]) => extras[k]).map(([k, e]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-ink-600">{e.name}</dt>
                  <dd className="font-semibold">{formatARS(k === "delivery" ? e.price : e.price * days)}</dd>
                </div>
              ))}
              <div className="flex justify-between text-ink-500">
                <dt>{t.booking.deposit}</dt>
                <dd>{formatARS(DEPOSIT_ARS)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink-100 pt-3 text-base font-black text-ink-900">
                <dt>{t.booking.total}</dt>
                <dd className="text-brand-600">{formatARS(total)}</dd>
              </div>
            </dl>
            <button
              onClick={confirm}
              disabled={!step3ok}
              className="mt-5 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition hover:bg-brand-600 disabled:opacity-40"
            >
              {t.booking.confirm}
            </button>
            <p className="mt-2 text-center text-xs text-ink-400">{t.booking.confirmNote}</p>
          </aside>
        </div>
      )}
      {step === 3 && <Nav step={step} setStep={setStep} nextLabel="" backLabel={t.booking.back} hideNext />}

      {/* STEP 4 — confirmation */}
      {step === 4 && code && (
        <div className="mx-auto max-w-lg rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
            ✓
          </div>
          <h2 className="text-2xl font-black text-ink-900">{t.booking.confirmedTitle}</h2>
          <p className="mt-2 text-sm text-ink-600">{t.booking.confirmedSub}</p>
          <div className="mt-6 rounded-xl border-2 border-dashed border-brand-300 bg-brand-50 px-4 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-700">{t.booking.code}</p>
            <p className="text-2xl font-black tracking-widest text-brand-700">{code}</p>
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-white">
            <IconBolt className="h-3.5 w-3.5 text-brand-400" /> {t.booking.tracked}
          </p>
          <p className="mt-4 text-xs text-ink-500">{t.booking.manage}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <a
              href={`${WHATSAPP_URL}?text=${encodeURIComponent(`Hola! Mi reserva es ${code} — ${car.name} del ${from} al ${to}`)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white"
            >
              <IconWhatsApp /> WhatsApp
            </a>
            <Link
              href={`/${locale}`}
              className="rounded-xl border border-ink-200 px-5 py-2.5 text-sm font-bold text-ink-700 hover:bg-ink-50"
            >
              {t.booking.backHome}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Nav({
  step,
  setStep,
  nextLabel,
  backLabel,
  hideNext,
}: {
  step: number;
  setStep: (n: number) => void;
  nextLabel: string;
  backLabel: string;
  hideNext?: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <button onClick={() => setStep(step - 1)} className="text-sm font-bold text-ink-500 hover:text-ink-900">
        ← {backLabel}
      </button>
      {!hideNext && (
        <button
          onClick={() => setStep(step + 1)}
          className="rounded-xl bg-brand-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
