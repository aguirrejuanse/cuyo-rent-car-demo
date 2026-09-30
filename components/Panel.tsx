"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/lib/i18n";
import { FLEET, formatARS, loadReservations, type StoredReservation } from "@/lib/fleet";

type Row = StoredReservation & { status: "confirmed" | "pending" | "completed" };

const SEED: Row[] = [
  { code: "CUY-9K2M4P", carId: "cronos", pickup: "2026-09-28 10:00", dropoff: "2026-10-02", days: 4, total: 240000, source: "instagram", status: "completed", createdAt: "2026-09-20" },
  { code: "CUY-7H3T8B", carId: "ranger", pickup: "2026-10-03 09:00", dropoff: "2026-10-08", days: 5, total: 650000, source: "google", status: "confirmed", createdAt: "2026-09-26" },
  { code: "CUY-2F6N1Q", carId: "yaris", pickup: "2026-10-05 14:00", dropoff: "2026-10-08", days: 3, total: 225000, source: "tiktok", status: "confirmed", createdAt: "2026-09-27" },
  { code: "CUY-4R8W5D", carId: "spin", pickup: "2026-10-10 11:00", dropoff: "2026-10-14", days: 4, total: 395000, source: "instagram", status: "pending", createdAt: "2026-09-29" },
  { code: "CUY-6T1V9X", carId: "p208", pickup: "2026-10-12 08:30", dropoff: "2026-10-15", days: 3, total: 204000, source: "whatsapp", status: "pending", createdAt: "2026-09-30" },
];

const SOURCE_COLORS: Record<string, string> = {
  instagram: "bg-pink-500/15 text-pink-400",
  tiktok: "bg-cyan-500/15 text-cyan-400",
  google: "bg-blue-500/15 text-blue-400",
  whatsapp: "bg-green-500/15 text-green-400",
  direct: "bg-white/10 text-white/70",
};

const STATUS_COLORS: Record<Row["status"], string> = {
  confirmed: "bg-brand-500/15 text-brand-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  completed: "bg-green-500/15 text-green-400",
};

export default function Panel({ t }: { t: Dict; locale: string }) {
  const [rows, setRows] = useState<Row[]>(SEED);

  useEffect(() => {
    const mine = loadReservations().map((r) => ({ ...r, status: "confirmed" as const }));
    setRows([...mine, ...SEED]);
  }, []);

  const revenue = rows.reduce((s, r) => s + r.total, 0);
  const commission = revenue * 0.1;

  const carName = (id: string) => FLEET.find((c) => c.id === id)?.name ?? id;
  const srcLabel = (s: string) => (t.panel.sources as Record<string, string>)[s] ?? s;

  const kpis = [
    { label: t.panel.kpi.reservations, value: String(rows.length) },
    { label: t.panel.kpi.revenue, value: formatARS(revenue) },
    { label: t.panel.kpi.commission, value: formatARS(commission) },
    { label: t.panel.kpi.conversion, value: "3.4%" },
  ];

  return (
    <div className="mt-8">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-white/50">{k.label}</p>
            <p className="mt-2 text-2xl font-black sm:text-3xl">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-white/5 text-xs font-bold uppercase tracking-widest text-white/50">
              <tr>
                {[t.panel.table.code, t.panel.table.car, t.panel.table.dates, t.panel.table.days, t.panel.table.total, t.panel.table.source, t.panel.table.status].map((h) => (
                  <th key={h} className="px-5 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.code} className="text-white/80">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-white">{r.code}</td>
                  <td className="px-5 py-3.5">{carName(r.carId)}</td>
                  <td className="px-5 py-3.5 text-xs text-white/60">{r.pickup.slice(0, 10)} → {r.dropoff}</td>
                  <td className="px-5 py-3.5">{r.days}</td>
                  <td className="px-5 py-3.5 font-bold">{formatARS(r.total)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${SOURCE_COLORS[r.source] ?? SOURCE_COLORS.direct}`}>
                      {srcLabel(r.source)}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_COLORS[r.status]}`}>
                      {t.panel.status[r.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/40">{t.panel.note}</p>
    </div>
  );
}
