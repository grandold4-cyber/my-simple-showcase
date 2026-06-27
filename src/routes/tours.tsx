import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Plane, MapPin, Compass, Church, ArrowRight, Loader2, Check, Phone } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/components/site/WhatsAppFab";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/tours")({
  component: ToursPage,
  head: () => ({
    meta: [
      { title: "Praise Adventures & Tours — Kenya Safaris, Holidays & Pilgrimage" },
      { name: "description", content: "Safaris, holiday packages, pilgrimage tours, school trips and corporate travel across Kenya, East Africa and Israel — every trip supports community transformation." },
      { property: "og:title", content: "Praise Adventures & Tours — Travel With Purpose" },
      { property: "og:description", content: "Discover Kenya. Experience Africa. Every booking funds education, widows and outreach." },
      { property: "og:url", content: "https://global-afrikan-nexus.lovable.app/tours" },
    ],
    links: [{ rel: "canonical", href: "https://global-afrikan-nexus.lovable.app/tours" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "Praise Adventures & Tours",
        parentOrganization: { "@type": "Organization", name: "54 Global Afrikan" },
        telephone: "+254715297696",
        url: "https://global-afrikan-nexus.lovable.app/tours",
      }),
    }],
  }),
});

const bookSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  package: z.string().min(2).max(120),
  travel_date: z.string().optional().or(z.literal("")),
  adults: z.coerce.number().int().min(1).max(50).default(1),
  children: z.coerce.number().int().min(0).max(50).default(0),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

const packages = [
  "Maasai Mara", "Amboseli", "Tsavo", "Diani", "Watamu", "Naivasha",
  "Nakuru", "Mt Kenya", "Uganda", "Tanzania", "Rwanda", "Israel Pilgrimage",
];
const services = [
  "Hotel Booking", "Air Ticketing", "Visa Assistance", "Airport Transfers",
  "Travel Insurance", "Conference Travel", "School Excursions", "Mission Trips",
];

function ToursPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = bookSchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) { setErr(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setStatus("saving"); setErr(null);
    const p = parsed.data;
    const { error } = await supabase.from("tour_bookings" as any).insert({
      full_name: p.full_name, email: p.email, phone: p.phone,
      package: p.package, travel_date: p.travel_date || null,
      adults: p.adults, children: p.children, notes: p.notes || null,
    });
    if (error) { setStatus("error"); setErr(error.message); return; }
    setStatus("ok"); (e.target as HTMLFormElement).reset();
  }

  const F = "rounded-xl bg-input border border-border px-4 py-3 text-sm";

  return (
    <Layout>
      <PageHero
        eyebrow="Praise Adventures & Tours · A 54 Global Afrikan company"
        title="Explore God's beautiful"
        accent="creation."
        subtitle="Safaris, pilgrimages, school trips and corporate travel — proudly Kenyan, purposefully global. Every booking helps educate children and support widows through 54 Global Foundation."
        image={hero}
      />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Destinations</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Popular tour packages.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {packages.map((p, i) => (
              <Reveal key={p} delay={i * 30}>
                <div className="glass rounded-2xl p-5 hover:ring-gold transition">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-semibold">{p}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Travel services</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">One partner, every arrangement.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {services.map((s, i) => (
              <Reveal key={s} delay={i * 30}>
                <div className="glass rounded-xl p-4 text-sm font-semibold text-center">{s}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-orange-600 to-accent text-white p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Church className="h-6 w-6" />
              <p className="text-xs uppercase tracking-[0.3em] opacity-90">Mission tourism</p>
            </div>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Travel with purpose.</h3>
            <p className="mt-3 max-w-3xl opacity-95">
              Every trip booked with Praise Adventures contributes to community transformation — helping educate vulnerable children, support widows and fund outreach programs through 54 Global Foundation.
            </p>
          </div>
        </div>
      </section>

      <section id="book" className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="rounded-3xl glass p-8">
              <div className="flex items-center gap-3">
                <Plane className="h-6 w-6 text-primary" />
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Book now</p>
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold">Plan your next adventure</h3>
              {status === "ok" ? (
                <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
                  <Check className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-3 font-display text-2xl font-bold">Booking request received</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Our travel desk will call you within one working day.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-3">
                  <input name="full_name" required placeholder="Full name" className={F} />
                  <input name="phone" required placeholder="Phone" className={F} />
                  <input name="email" type="email" required placeholder="Email" className={`${F} sm:col-span-2`} />
                  <select name="package" required defaultValue="" className={F}>
                    <option value="" disabled>Select package…</option>
                    {packages.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  <input name="travel_date" type="date" className={F} />
                  <input name="adults" type="number" min={1} defaultValue={1} placeholder="Adults" className={F} />
                  <input name="children" type="number" min={0} defaultValue={0} placeholder="Children" className={F} />
                  <textarea name="notes" rows={3} placeholder="Special requests (optional)" className={`${F} sm:col-span-2`} />
                  {err && <p className="text-sm text-destructive sm:col-span-2">{err}</p>}
                  <button disabled={status === "saving"} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit disabled:opacity-60">
                    {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    Send booking request
                  </button>
                </form>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold">
                  <Phone className="h-4 w-4" /> Call {CONTACT_PHONE_DISPLAY}
                </a>
                <Link to="/foundation" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
                  Support the mission <Compass className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
