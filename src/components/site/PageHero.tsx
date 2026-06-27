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
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={image} alt="" className="h-full w-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-transparent to-transparent" />
        <div className="absolute -top-20 left-1/3 h-80 w-80 rounded-full bg-primary/15 blur-3xl animate-pulse-glow" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold leading-[1.05] max-w-4xl">
            {title} {accent && <span className="text-gradient-gold">{accent}</span>}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </Reveal>
      </div>
    </section>
  );
}
