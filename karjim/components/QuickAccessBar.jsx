"use client";

import { Phone, MapPin } from "lucide-react";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { siteConfig } from "@/data/siteConfig";

export default function QuickAccessBar() {
  const { contact } = siteConfig;

  const links = [
    {
      href: `tel:${contact.phoneCall}`,
      icon: Phone,
      label: "Ara",
    },
    {
      href: contact.instagramUrl,
      icon: InstagramIcon,
      label: "Instagram",
      external: true,
    },
    {
      href: contact.mapsUrl,
      icon: MapPin,
      label: "Harita",
      external: true,
    },
  ];

  return (
    <nav
      aria-label="Hızlı erişim"
      className="fixed z-50 flex gap-2 rounded-2xl border border-neon-blue/30 bg-zinc-950/85 p-2 shadow-[0_0_20px_rgba(0,243,255,0.25)] backdrop-blur bottom-4 left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:right-6 sm:top-6 sm:translate-x-0"
    >
      {links.map(({ href, icon: Icon, label, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-neon-blue/20 text-neon-blue transition-colors hover:bg-neon-blue/10 hover:text-white"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </nav>
  );
}
