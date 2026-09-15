"use client";

import { useState } from "react";
import { Phone, MapPin, Copy, Check } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function ContactSection({ contact }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contact.addressText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) - fail silently.
    }
  };

  return (
    <section id="iletisim" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mb-10 text-center">
        <p className="font-hud text-xs sm:text-sm tracking-[0.3em] text-neon-orange text-shadow-neon-orange">
          BİZE ULAŞ
        </p>
        <h2 className="mt-2 font-hud text-3xl sm:text-4xl font-bold tracking-wide text-white">
          İLETİŞİM &amp; KONUM
        </h2>
      </div>

      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-start gap-3 rounded-2xl border border-neon-blue/20 bg-zinc-900/50 p-5 sm:p-6">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-neon-blue" />
          <div className="flex-1">
            <p className="text-sm sm:text-base text-zinc-300">{contact.addressText}</p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Adresi kopyala"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neon-blue/30 text-neon-blue transition-colors hover:bg-neon-blue/10"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={`tel:${contact.phoneCall}`}
            className="flex items-center justify-center gap-3 rounded-2xl border border-neon-blue/30 bg-neon-blue/10 px-5 py-4 font-hud tracking-wide text-neon-blue text-shadow-neon-blue transition-colors hover:bg-neon-blue/20"
          >
            <Phone className="h-5 w-5" />
            {contact.phoneDisplay}
          </a>

          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl border border-neon-orange/30 bg-neon-orange/10 px-5 py-4 font-hud tracking-wide text-neon-orange text-shadow-neon-orange transition-colors hover:bg-neon-orange/20"
          >
            <InstagramIcon className="h-5 w-5" />
            {contact.instagramHandle}
          </a>
        </div>

        <a
          href={contact.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-4 text-sm text-zinc-300 transition-colors hover:border-neon-blue/30 hover:text-white"
        >
          <MapPin className="h-4 w-4" />
          Haritada Aç
        </a>
      </div>
    </section>
  );
}
