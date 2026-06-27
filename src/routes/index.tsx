import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight, Church, GraduationCap, Users, Sparkles, PlayCircle,
  Heart, BookOpen, Globe2, Star, Award, Calendar, Quote,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Reveal } from "@/components/site/Reveal";
import { Logo } from "@/components/site/Logo";
import heroImg from "@/assets/hero-worship.jpg";
import schoolImg from "@/assets/school-hero.jpg";
import communityImg from "@/assets/community.jpg";
import pastorImg from "@/assets/pastor.png";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "54 Global Afrikan — Faith, Education & Leadership" },
      {
        name: "description",
        content:
          "54 Global Afrikan is a unified ecosystem of Praise Church International, Halel School Nairobi, and community leadership programs transforming generations across Africa.",
      },
      { property: "og:title", content: "54 Global Afrikan" },
      {
        property: "og:description",
        content:
          "Faith. Excellence. Leadership. Transformation. Community. Explore our ministries, school, and leadership initiatives.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const rotating = [
  "Transforming Lives Through Faith, Education & Leadership.",
  "Raising Spirit-Led Leaders Across Generations.",
  "A Center for Worship, Wisdom & Transformation.",
  "Modern African Excellence, Rooted in Eternal Truth.",
];

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % rotating.length), 4200);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative min-h-[100svh] flex items-center pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Worship gathering"
          className="h-full w-full object-cover opacity-50"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-accent/10" />
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-accent/30 blur-3xl animate-pulse-glow" />
        {/* light streaks */}
        <div className="absolute top-1/3 left-0 h-px w-full overflow-hidden opacity-60">
          <div className="h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent shimmer" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 w-full">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            A Unified Ecosystem
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.02] max-w-5xl">
            <span className="text-gradient-gold">{rotating[i].split(" ").slice(0, 2).join(" ")}</span>{" "}
            <span className="text-foreground">{rotating[i].split(" ").slice(2).join(" ")}</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Building spiritually empowered communities, nurturing future leaders,
            and inspiring transformation across generations — under one vision.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/church"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-gold hover:brightness-110 transition"
            >
              Explore Ministries <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <a
              href="https://youtube.com/@praisechurchlive"
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:text-primary transition"
            >
              <PlayCircle className="h-4 w-4" /> Watch Live
            </a>
            <Link
              to="/school"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold hover:text-accent transition"
            >
              Admissions Open <GraduationCap className="h-4 w-4" />
            </Link>
            <Link
              to="/community"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-white/5 transition"
            >
              Join the Vision
            </Link>
          </div>
        </Reveal>

        {/* Stats */}
        <Reveal delay={400}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
            {[
              { v: "12K+", l: "Lives Touched" },
              { v: "350+", l: "Students Enrolled" },
              { v: "40+", l: "Leaders Raised" },
              { v: "7", l: "Ministries Active" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl font-bold text-gradient-gold">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Floating logo orb */}
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 animate-float-slow">
        <div className="relative h-72 w-72">
          <div className="absolute inset-0 rounded-full bg-accent/30 blur-3xl" />
          <Logo className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}

function About() {
  const pillars = [
    { Icon: Church, t: "Faith & Ministry", d: "Worship, discipleship and spiritual formation." },
    { Icon: GraduationCap, t: "Education", d: "Christ-centered learning for the next generation." },
    { Icon: Users, t: "Leadership", d: "Mentorship that raises principled African leaders." },
    { Icon: Heart, t: "Community", d: "Outreach, transformation and empowerment." },
    { Icon: BookOpen, t: "Mentorship", d: "Wisdom passed across generations." },
    { Icon: Globe2, t: "Continental Vision", d: "From Nairobi to the nations." },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">About 54 Global Afrikan</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold max-w-3xl">
            One vision uniting <span className="text-gradient-gold">faith, education</span> and{" "}
            <span className="text-gradient-spirit">leadership</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            54 Global Afrikan is the umbrella ecosystem connecting ministries, schools,
            outreach and leadership initiatives — a movement raising whole people for
            whole transformation across the continent.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 60}>
              <div className="group relative h-full rounded-3xl glass p-6 hover:ring-gold transition">
                <div className="absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="h-12 w-12 grid place-items-center rounded-2xl bg-primary/10 text-primary glow-gold">
                  <p.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Institutions() {
  const cards = [
    { tag: "Faith", title: "Praise Church Nairobi", desc: "A church transforming lives beyond Sunday — worship, discipleship and outreach.", to: "/church", img: heroImg, accent: "from-primary/40 to-cross/30" },
    { tag: "Education", title: "Halel School Nairobi", desc: "Raising Godly leaders. Inspiring academic excellence. Modern CBC learning rooted in Christ.", to: "/school", img: schoolImg, accent: "from-spirit/40 to-primary/30" },
    { tag: "Real Estate", title: "Sinap Properties", desc: "Creating wealth through smart property investment across Nairobi's growth corridors.", to: "/properties", img: communityImg, accent: "from-emerald-500/40 to-primary/20" },
    { tag: "Tourism", title: "Praise Adventures & Tours", desc: "Discover Kenya. Experience Africa. Travel with purpose — every trip funds transformation.", to: "/tours", img: heroImg, accent: "from-orange-500/40 to-accent/20" },
    { tag: "Humanitarian", title: "54 Global Foundation", desc: "Restoring hope, one life at a time — sponsor a child, support a widow, feed a family.", to: "/foundation", img: communityImg, accent: "from-rose-500/40 to-primary/20" },
  ] as const;
  return (
    <section className="relative py-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-30" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Our Organizations</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
                Step into the <span className="text-gradient-gold">ecosystem</span>.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">Five independent organizations. One shared calling — transformed African communities.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <Link to={c.to} className="group relative block overflow-hidden rounded-3xl border border-border min-h-[24rem]">
                <img src={c.img} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-br ${c.accent} mix-blend-overlay opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-8">
                  <span className="self-start text-[10px] uppercase tracking-[0.3em] text-primary glass rounded-full px-3 py-1">{c.tag}</span>
                  <h3 className="mt-4 font-display text-2xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-md">{c.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Enter <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leader() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden glass p-2">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primary/40 via-accent/30 to-cross/30 blur-2xl opacity-60" />
            <img src={pastorImg} alt="Pastor Robert Wekesa Simiyu" className="relative rounded-2xl w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Leadership</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
            Pastor <span className="text-gradient-gold">Robert Wekesa Simiyu</span>
          </h2>
          <p className="mt-3 text-sm uppercase tracking-wider text-muted-foreground">
            Lead Pastor — Praise Church International, Nairobi
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A passionate servant of God committed to raising a generation rooted in
            Christ and equipped to transform Africa. Pastor Robert leads the 54 Global
            Afrikan vision with humility, prophetic clarity, and a heart for the nations.
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              { Icon: Star, t: "Spirit-Led" },
              { Icon: Award, t: "Excellence" },
              { Icon: Heart, t: "Servant Heart" },
            ].map((v) => (
              <div key={v.t} className="glass rounded-2xl p-4">
                <v.Icon className="h-5 w-5 text-primary" />
                <div className="mt-2 text-sm font-semibold">{v.t}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonies() {
  const items = [
    { q: "This is more than a church — it's a movement that has shaped my family's future.", a: "Grace M., Nairobi" },
    { q: "Halel School gave my daughter both academic excellence and a strong foundation of faith.", a: "John & Mary, Parents" },
    { q: "The leadership program rewired how I see purpose. I'm now leading in my community.", a: "Brian O., Mentee" },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Testimonies</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold max-w-2xl">
            Lives changed. Generations <span className="text-gradient-spirit">transformed</span>.
          </h2>
        </Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="h-full rounded-3xl glass p-8 relative">
                <Quote className="h-8 w-8 text-primary/60" />
                <blockquote className="mt-4 text-lg font-display leading-snug">"{t.q}"</blockquote>
                <figcaption className="mt-6 text-sm text-muted-foreground">— {t.a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] p-10 sm:p-16 glass">
            <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.4fr,1fr] gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Join the Vision</p>
                <h3 className="mt-3 font-display text-4xl sm:text-5xl font-bold">
                  Walk with us into a transformed Africa.
                </h3>
                <p className="mt-4 text-muted-foreground max-w-xl">
                  Partner, give, pray, or enroll. Every step plants a seed in the next generation.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/contact" className="inline-flex items-center justify-between gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground glow-gold">
                  Partner With Us <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/events" className="inline-flex items-center justify-between gap-2 rounded-full glass px-6 py-4 text-sm font-semibold">
                  Upcoming Events <Calendar className="h-4 w-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center justify-between gap-2 rounded-full border border-border px-6 py-4 text-sm font-semibold">
                  Submit a Prayer Request <Heart className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Institutions />
      <Leader />
      <Testimonies />
      <CTA />
    </Layout>
  );
}
