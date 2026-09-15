export default function HoursSection({ hours }) {
  return (
    <section id="saatler" className="scroll-mt-24 pt-6 pb-20 sm:pt-8 sm:pb-28">
      <div className="mb-10 text-center">
        <p className="font-hud text-xs sm:text-sm tracking-[0.3em] text-neon-blue text-shadow-neon-blue">
          NE ZAMAN GELSEN VARIZ
        </p>
        <h2 className="mt-2 font-hud text-3xl sm:text-4xl font-bold tracking-wide text-white">
          ÇALIŞMA SAATLERİ
        </h2>
      </div>

      <div className="mx-auto max-w-2xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-neon-blue/20 bg-zinc-900/50">
        {hours.map(({ day, hours: dayHours }) => (
          <div
            key={day}
            className="flex items-center justify-between px-5 sm:px-8 py-4"
          >
            <span className="font-hud tracking-wide text-zinc-300">{day}</span>
            <span className="text-zinc-400">{dayHours}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
