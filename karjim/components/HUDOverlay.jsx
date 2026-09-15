"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Crosshair } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

function CornerBracket({ position }) {
  if (position === "top-left") {
    return (
      <div className="absolute top-4 left-4 h-9 w-9 border-t-2 border-l-2 border-neon-blue drop-shadow-[0_0_6px_rgba(0,243,255,0.8)] sm:top-8 sm:left-8 sm:h-12 sm:w-12" />
    );
  }
  if (position === "top-right") {
    return (
      <div className="absolute top-4 right-4 h-9 w-9 border-t-2 border-r-2 border-neon-blue drop-shadow-[0_0_6px_rgba(0,243,255,0.8)] sm:top-8 sm:right-8 sm:h-12 sm:w-12" />
    );
  }
  if (position === "bottom-left") {
    return (
      <div className="absolute bottom-4 left-4 h-9 w-9 border-b-2 border-l-2 border-neon-blue drop-shadow-[0_0_6px_rgba(0,243,255,0.8)] sm:bottom-8 sm:left-8 sm:h-12 sm:w-12" />
    );
  }
  return (
    <div className="absolute bottom-4 right-4 h-9 w-9 border-b-2 border-r-2 border-neon-blue drop-shadow-[0_0_6px_rgba(0,243,255,0.8)] sm:bottom-8 sm:right-8 sm:h-12 sm:w-12" />
  );
}

function Readout({ icon: Icon, label, value, align = "left" }) {
  return (
    <div
      className={`flex items-center gap-1.5 font-hud text-[9px] sm:text-[11px] tracking-widest uppercase text-neon-blue text-shadow-neon-blue ${
        align === "right" ? "flex-row-reverse text-right" : "text-left"
      }`}
    >
      {Icon && <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
      <span>
        {label} <span className="text-white/80">{value}</span>
      </span>
    </div>
  );
}

export default function HUDOverlay() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const onScroll = () => setShowScrollHint(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      style={{ opacity: "calc(1 - var(--reveal, 0))" }}
    >
      {/* HUD vizör çerçeveleri */}
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      {/* İnce tarama çizgisi */}
      <motion.div
        aria-hidden
        initial={{ top: "-2%" }}
        animate={{ top: "102%" }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-blue/70 to-transparent"
      />

      {/* Hedef kilitleri (CrossFit / Fitness istasyonları) */}
      <Crosshair
        className="absolute left-[15%] top-[32%] hidden h-6 w-6 text-neon-orange/60 sm:block"
        strokeWidth={1}
      />
      <Crosshair
        className="absolute right-[18%] top-[58%] hidden h-6 w-6 text-neon-orange/60 sm:block"
        strokeWidth={1}
      />

      {/* Canlı veri göstergeleri */}
      <div className="absolute left-6 top-6 sm:left-10 sm:top-10">
        <Readout label="FACILITY" value="KARJIM 100. YIL" />
      </div>
      <div className="absolute right-6 top-6 sm:right-10 sm:top-10">
        <Readout label="STATUS" value="OPTIMAL" align="right" />
      </div>

      {/* Marka bloğu - üst-ortada */}
      <div className="absolute inset-x-0 top-16 flex flex-col items-center gap-2 text-center sm:top-20 lg:top-24">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-hud text-3xl sm:text-4xl lg:text-5xl font-black tracking-wide text-white text-shadow-neon-blue"
        >
          {siteConfig.brand.logoText}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-hud text-xs sm:text-sm font-bold tracking-wider text-neon-orange text-shadow-neon-orange"
        >
          {siteConfig.brand.slogan}
        </motion.p>
      </div>

      {/* Scroll ipucu */}
      <motion.div
        animate={{ opacity: showScrollHint ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-hud text-[10px] tracking-[0.4em] text-neon-blue text-shadow-neon-blue">
          AŞAĞI KAYDIR
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <ChevronDown className="h-5 w-5 text-neon-blue" />
        </motion.div>
      </motion.div>
    </div>
  );
}
