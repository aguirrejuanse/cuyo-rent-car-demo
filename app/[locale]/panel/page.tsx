import Panel from "@/components/Panel";
import { getDict, type Locale } from "@/lib/i18n";

export default async function PanelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <div className="min-h-screen bg-ink-950 pb-20 pt-24 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="inline-block rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-400">
          {t.panel.badge}
        </p>
        <h1 className="mt-4 text-3xl font-black sm:text-4xl">{t.panel.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">{t.panel.subtitle}</p>
        <Panel t={t} locale={locale as Locale} />
      </div>
    </div>
  );
}
