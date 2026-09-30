"use client";

import { useState } from "react";

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-ink-900 sm:text-base"
          >
            {item.q}
            <span className={`text-brand-500 transition-transform ${open === i ? "rotate-45" : ""}`}>＋</span>
          </button>
          {open === i && <p className="px-5 pb-4 text-sm leading-relaxed text-ink-600">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}
