// Decorative, very subtle drifting fog blobs used as a background-depth
// layer behind page content. Purely visual - no interaction, so it stays
// out of the accessibility tree and never blocks clicks/taps.
//
// `className` must include a position utility (e.g. "fixed" or "absolute")
// plus inset-0 and a z-index - left to the caller since that depends on
// the surrounding stacking context.
export default function FogLayer({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none overflow-hidden ${className}`}
    >
      <div className="fog-blob-a absolute -left-1/4 top-0 h-[70vh] w-[70vh] rounded-full bg-zinc-400/[0.07] blur-3xl" />
      <div className="fog-blob-b absolute right-[-15%] top-1/3 h-[60vh] w-[60vh] rounded-full bg-slate-300/[0.06] blur-3xl" />
      <div className="fog-blob-a absolute bottom-0 left-1/4 h-[55vh] w-[55vh] rounded-full bg-zinc-500/[0.06] blur-3xl" />
    </div>
  );
}
