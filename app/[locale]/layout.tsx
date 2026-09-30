import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDict, LOCALES, type Locale } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });

export const metadata: Metadata = {
  title: "Cuyo Rent a Car — Alquiler de autos en Mendoza",
  description: "Alquilá tu auto en Mendoza: entrega en aeropuerto u hotel, km ilimitados, garantía mínima. Demo conceptual.",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
  const t = getDict(locale);

  return (
    <html lang={locale} className={archivo.variable}>
      <body>
        <Nav t={t} locale={locale as Locale} />
        <main>{children}</main>
        <Footer t={t} />
      </body>
    </html>
  );
}
