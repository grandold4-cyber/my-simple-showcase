import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow, title, accent, subtitle, image,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover" />
        {/* Strong dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-primary/25 blur-3xl animate-pulse-glow" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-white/90 font-semibold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{eyebrow}</p>
          <h1 className="mt-5 font-display text-6xl sm:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tight max-w-5xl text-white" style={{ textShadow: "0 4px 24px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,0.6)" }}>
            {title} {accent && <span className="text-gradient-gold block sm:inline">{accent}</span>}
          </h1>
          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-white/95 leading-relaxed" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}>{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
