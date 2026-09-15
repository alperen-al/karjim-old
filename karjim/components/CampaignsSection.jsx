import { Sparkles, Users } from "lucide-react";

// `compact` renders this as the crossfade overlay living on top of the
// hero video (ScrollVideoHero passes it as `revealContent`): tighter
// spacing to fit one screen, and no whileInView animation since opacity
// there is already driven by the video's own fade progress.
export default function CampaignsSection({ campaigns, compact = false }) {
  return (
    <section
      id={compact ? undefined : "kampanyalar"}
      className={compact ? "px-4" : "scroll-mt-24 py-20 sm:py-28"}
    >
      <div className={compact ? "mb-6 text-center" : "mb-10 text-center"}>
        <p className="font-hud text-xs sm:text-sm tracking-[0.3em] text-neon-orange text-shadow-neon-orange">
          KAÇIRMA
        </p>
        <h2 className="mt-2 font-hud text-3xl sm:text-4xl font-bold tracking-wide text-white">
          KAMPANYALAR
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className={`group relative w-full max-w-sm overflow-hidden rounded-2xl border border-neon-blue/30 bg-zinc-900/60 shadow-[0_0_25px_rgba(0,243,255,0.12)] transition-shadow hover:shadow-[0_0_35px_rgba(0,243,255,0.3)] ${
              compact ? "p-5" : "p-6 sm:p-8"
            }`}
          >
            <div className="absolute inset-0 border border-transparent [background:linear-gradient(135deg,rgba(0,243,255,0.08),transparent_40%,rgba(255,107,0,0.08))]" />

            <div className="relative flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-neon-orange/40 bg-neon-orange/10 px-3 py-1 font-hud text-[10px] sm:text-xs tracking-widest text-neon-orange">
                <Sparkles className="h-3.5 w-3.5" />
                {campaign.badge}
              </span>

              <h3 className="font-hud text-2xl sm:text-3xl font-black tracking-wide text-white text-shadow-neon-blue">
                {campaign.title}
              </h3>

              <p className="font-hud text-sm tracking-[0.2em] text-neon-blue">
                {campaign.subtitle}
              </p>

              <p className="text-4xl sm:text-5xl font-extrabold text-white">
                {campaign.price}
              </p>

              <div className="mt-2 flex items-center gap-2 rounded-xl border border-neon-blue/20 bg-black/40 px-4 py-3 text-sm text-zinc-300">
                <Users className="h-4 w-4 shrink-0 text-neon-blue" />
                <span>{campaign.friendOffer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
