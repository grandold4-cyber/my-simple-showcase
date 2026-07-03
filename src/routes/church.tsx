import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Baby, Users, Music, HandHeart, BookOpen, Sparkles, Calendar, PlayCircle, ArrowRight, Heart,
  Globe, Church as ChurchIcon, GraduationCap, Compass, HandCoins, Phone,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY, CONTACT_WHATSAPP_URL } from "@/components/site/WhatsAppFab";
import hero from "@/assets/hero-worship.jpg";
import pastor from "@/assets/pastor.png";
import churchLogo from "@/assets/logo.png";
import schoolLogo from "@/assets/halel-school-logo.jpeg.asset.json";

export const Route = createFileRoute("/church")({
  component: ChurchPage,
  head: () => ({
    meta: [
      { title: "Praise Church International Nairobi — Worship, Sermons & Live Stream" },
      { name: "description", content: "Praise Church International Nairobi — Spirit-led worship, sound teaching, ministries and weekly live stream with Pastor Robert Wekesa Simiyu." },
      { name: "keywords", content: "Praise Church International, Praise Church Nairobi, Pastor Robert Wekesa Simiyu, church Nairobi, live stream church Kenya" },
      { property: "og:title", content: "Praise Church International Nairobi" },
      { property: "og:description", content: "A center for worship and spirituality. Join us in person or on the livestream." },
      { property: "og:image", content: "/og-church.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/church" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Church",
        name: "Praise Church International",
        url: "https://54globalafrikan.com/church",
        address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
        sameAs: [
          "https://www.facebook.com/Praisechurchinternational/",
          "https://youtube.com/@praisechurchlive",
        ],
        parentOrganization: { "@type": "Organization", name: "54 Global Afrikan" },
      }),
    }],
  }),
});

const ministries = [
  { Icon: Baby, t: "Children's Ministry", d: "Nurturing little hearts in faith and joy." },
  { Icon: Users, t: "Youth Ministry", d: "Raising bold, Spirit-filled young leaders." },
  { Icon: Music, t: "Worship Ministry", d: "Sounds of heaven released on earth." },
  { Icon: HandHeart, t: "Men's Fellowship", d: "Men of valor walking in covenant." },
  { Icon: Sparkles, t: "Women's Fellowship", d: "Daughters of the King, equipped & empowered." },
  { Icon: BookOpen, t: "Evangelism & Outreach", d: "Reaching cities and nations with the gospel." },
  { Icon: Heart, t: "Prayer & Counseling", d: "A safe place for healing and intercession." },
];

const services = [
  { day: "Sunday", time: "9:00 AM & 11:30 AM", label: "Main Worship Services" },
  { day: "Wednesday", time: "6:30 PM", label: "Midweek Teaching" },
  { day: "Friday", time: "6:30 PM", label: "Night of Prayer" },
];

function ChurchPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Praise Church International · Nairobi"
        title="A Center for"
        accent="Worship & Spirituality."
        subtitle="A Spirit-led community pursuing God's presence, sound teaching, and global impact — led by Pastor Robert Wekesa Simiyu."
        image={hero}
      />

      {/* Service times + Live */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.day} delay={i * 80}>
              <div className="glass rounded-3xl p-7">
                <div className="text-xs uppercase tracking-[0.25em] text-primary">{s.day}</div>
                <div className="mt-3 font-display text-3xl font-bold">{s.time}</div>
                <div className="mt-1 text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto max-w-7xl px-6 mt-10">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 flex flex-col lg:flex-row gap-8 lg:items-center">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Live</p>
                <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Join the broadcast from anywhere.</h3>
                <p className="mt-3 text-muted-foreground">Stream every service on YouTube and join thousands worshipping worldwide.</p>
              </div>
              <a href="https://youtube.com/@praisechurchlive" target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-gold">
                <PlayCircle className="h-5 w-5" /> Watch on YouTube
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pastor profile */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr,1.2fr] gap-12 items-center">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary/40 to-accent/40 blur-2xl rounded-3xl" />
              <img src={pastor} alt="Pastor Robert Wekesa Simiyu" className="relative rounded-3xl w-full" loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Lead Pastor</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Robert Wekesa Simiyu</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A teacher of the Word, intercessor and visionary leader. Pastor Robert
              shepherds Praise Church International with a heart for revival, family,
              and the rising African generation — anchoring the broader 54 Global
              Afrikan mandate.
            </p>
            <blockquote className="mt-8 border-l-2 border-primary/60 pl-5 italic text-foreground/90">
              "We are not just building a congregation — we are raising a generation of
              worshippers, leaders and world-changers."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Ministries</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Find your place to grow & serve.</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ministries.map((m, i) => (
              <Reveal key={m.t} delay={i * 60}>
                <div className="group relative h-full rounded-3xl glass p-6 hover:ring-gold transition">
                  <div className="h-12 w-12 grid place-items-center rounded-2xl bg-accent/15 text-accent">
                    <m.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{m.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
                  <Link
                    to="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2 transition-all"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Missions */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Missions</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Take the gospel to the nations.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Partner with Praise Church International to send missionaries, plant churches, and strengthen the harvest across Africa and beyond.
            </p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { Icon: Globe, t: "Support Missionaries", d: "Sustain field workers on the front lines of the gospel." },
              { Icon: Compass, t: "Mission Trips", d: "Join short-term teams reaching unreached communities." },
              { Icon: ChurchIcon, t: "Plant Churches", d: "Help establish new congregations in villages and cities." },
              { Icon: GraduationCap, t: "Train Pastors", d: "Equip shepherds through discipleship and Bible school." },
              { Icon: BookOpen, t: "Sponsor Evangelism", d: "Fund crusades, tracts, and evangelistic outreaches." },
              { Icon: HandHeart, t: "Support Rural Churches", d: "Come alongside pastors serving in remote regions." },
            ].map((m, i) => (
              <Reveal key={m.t} delay={i * 60}>
                <div className="h-full rounded-3xl glass p-6 hover:ring-gold transition">
                  <div className="h-12 w-12 grid place-items-center rounded-2xl bg-primary/15 text-primary">
                    <m.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{m.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Give */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Give</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Sow into Kingdom work.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Your generosity fuels worship, missions, and mercy. Choose a fund below or use the payment details to give directly.
            </p>
          </Reveal>

          <div className="mt-12 grid lg:grid-cols-[1.1fr,1fr] gap-6">
            {/* Funds */}
            <Reveal>
              <div className="rounded-3xl glass p-8">
                <div className="flex items-center gap-3">
                  <HandCoins className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-2xl font-bold">Giving Funds</h3>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                  {[
                    "Tithes",
                    "Offering",
                    "Building Fund",
                    "Mission Fund",
                    "Feed the Hungry",
                    "Sponsor a Widow",
                    "Sponsor a Child",
                    "Pastors Support Fund",
                    "Emergency Relief Fund",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 rounded-xl bg-white/50 border border-border px-4 py-3 text-sm font-medium">
                      <Heart className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-2xl bg-primary/5 border border-primary/20 p-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">Feed a Child</p>
                  <div className="mt-3 grid sm:grid-cols-3 gap-3">
                    {[
                      { p: "$5", l: "3 meals · 1 day" },
                      { p: "$25", l: "meals for 1 month" },
                      { p: "$75", l: "meals for 1 term" },
                    ].map((x) => (
                      <div key={x.p} className="rounded-xl bg-white p-4 text-center border border-border">
                        <div className="font-display text-2xl font-bold text-gradient-spirit">{x.p}</div>
                        <div className="text-xs text-muted-foreground mt-1">{x.l}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/donate"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit"
                >
                  <Heart className="h-4 w-4" /> Give Now
                </Link>
              </div>
            </Reveal>

            {/* Payment details */}
            <Reveal delay={120}>
              <div className="rounded-3xl bg-white border-2 border-primary/30 p-8 space-y-5 shadow-xl">
                <div className="flex items-center gap-4 pb-3 border-b border-border">
                  <img src={churchLogo} alt="Praise Church" className="h-12 w-12 object-contain" />
                  <img src={schoolLogo.url} alt="Halel School" className="h-12 w-12 object-contain rounded" />
                  <p className="font-display font-bold">Give Directly</p>
                </div>

                <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-500 p-5">
                  <p className="text-sm uppercase tracking-widest text-emerald-700 font-bold">M-Pesa · Buy Goods</p>
                  <p className="mt-2 font-display text-4xl font-black text-emerald-800 tracking-wider">5672838</p>
                  <p className="mt-1 text-base font-bold text-emerald-900">Business: PINPLACE</p>
                </div>

                <div className="rounded-2xl bg-sky-50 border-2 border-sky-500 p-5">
                  <p className="text-sm uppercase tracking-widest text-sky-700 font-bold">M-Pesa Paybill · Rafiki Bank</p>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-sky-900/70">Business No.</p>
                      <p className="font-display text-2xl font-black text-sky-800">802200</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-sky-900/70">Account No.</p>
                      <p className="font-display text-2xl font-black text-sky-800">602743</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-red-50 border-2 border-red-500 p-5">
                  <p className="text-sm uppercase tracking-widest text-red-700 font-bold">Equity Bank Kenya</p>
                  <p className="mt-2 font-display text-2xl font-black text-red-800 break-all">0950183816898</p>
                  <p className="mt-1 text-base font-bold text-red-900">Halel School</p>
                </div>

                <div className="rounded-2xl bg-indigo-50 border-2 border-indigo-500 p-5">
                  <p className="text-sm uppercase tracking-widest text-indigo-700 font-bold">PayPal</p>
                  <a href="https://www.paypal.com/paypalme/RSIMIYU7" target="_blank" rel="noreferrer" className="mt-2 block font-display text-lg font-black text-indigo-800 break-all hover:underline">
                    RSIMIYU7@GMAIL.COM
                  </a>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">
                    <Phone className="h-4 w-4" /> {CONTACT_PHONE_DISPLAY}
                  </a>
                  <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sermons / events teaser */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-3xl glass p-8 h-full">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-3xl font-bold">Upcoming events</h3>
              <ul className="mt-6 divide-y divide-border/60">
                {[
                  { d: "Dec 12", t: "Night of Worship", v: "Main Sanctuary · 7 PM" },
                  { d: "Dec 22", t: "Christmas Crusade", v: "Open Grounds · 5 PM" },
                  { d: "Jan 05", t: "Leaders Conference", v: "54 GA Hall · 9 AM" },
                ].map((e) => (
                  <li key={e.t} className="py-4 flex items-center gap-5">
                    <div className="w-16 text-primary font-display text-lg">{e.d}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{e.t}</div>
                      <div className="text-xs text-muted-foreground">{e.v}</div>
                    </div>
                    <Link to="/events" className="text-xs text-primary">Register →</Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl glass p-8 h-full">
              <Heart className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-3xl font-bold">Submit a prayer request</h3>
              <p className="mt-2 text-muted-foreground">Our intercession team prays over every request received.</p>
              <form onSubmit={(e) => e.preventDefault()} className="mt-6 grid gap-3">
                <input className="rounded-xl bg-input/60 border border-border px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/40" placeholder="Your name" />
                <input className="rounded-xl bg-input/60 border border-border px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/40" placeholder="Email" type="email" />
                <textarea rows={4} className="rounded-xl bg-input/60 border border-border px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/40" placeholder="How can we pray for you?" />
                <button className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-gold">
                  Send prayer request
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
