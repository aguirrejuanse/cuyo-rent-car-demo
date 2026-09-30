import Image from "next/image";
import type { Dict } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/fleet";

export default function Footer({ t }: { t: Dict }) {
  return (
    <footer className="bg-ink-950 py-10 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center text-sm sm:px-6">
        <Image src="/images/logo.webp" alt="Cuyo Rent a Car" width={110} height={40} className="h-8 w-auto" />
        <p>{t.footer.tagline} {t.footer.address}.</p>
        <div className="flex gap-5 text-white/80">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a>
          <a href="https://www.instagram.com/cuyorentacar/" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
          <a href="https://cuyorentacar.com" target="_blank" rel="noreferrer" className="hover:text-white">cuyorentacar.com</a>
        </div>
        <p className="text-xs text-white/40">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
