import { Suspense } from "react";
import BookingFlow from "@/components/BookingFlow";
import { getDict, type Locale } from "@/lib/i18n";

export default async function ReservarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);

  return (
    <div className="min-h-screen bg-ink-50 pb-20 pt-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h1 className="text-3xl font-black text-ink-900 sm:text-4xl">{t.booking.title}</h1>
        <Suspense>
          <BookingFlow t={t} locale={locale as Locale} />
        </Suspense>
      </div>
    </div>
  );
}
