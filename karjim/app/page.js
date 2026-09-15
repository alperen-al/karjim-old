import ScrollVideoHero from "@/components/ScrollVideoHero";
import HUDOverlay from "@/components/HUDOverlay";
import QuickAccessBar from "@/components/QuickAccessBar";
import CampaignsSection from "@/components/CampaignsSection";
import HoursSection from "@/components/HoursSection";
import ContactSection from "@/components/ContactSection";
import FogLayer from "@/components/FogLayer";
import { siteConfig } from "@/data/siteConfig";

export default function Home() {
  return (
    <div className="relative flex-1 bg-zinc-950 text-zinc-100">
      <FogLayer className="fixed inset-0" />

      <QuickAccessBar />

      <ScrollVideoHero
        revealContent={<CampaignsSection campaigns={siteConfig.campaigns} compact />}
      >
        <HUDOverlay />
      </ScrollVideoHero>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <HoursSection hours={siteConfig.workingHours} />
        <ContactSection contact={siteConfig.contact} />
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs sm:text-sm text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.brand.name} — {siteConfig.brand.subTitle}
      </footer>
    </div>
  );
}
