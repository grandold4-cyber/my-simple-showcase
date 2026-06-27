import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Building2, MapPin, TrendingUp, ShieldCheck, ArrowRight, Loader2, Check, Phone } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/components/site/WhatsAppFab";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/properties")({
  component: PropertiesPage,
  head: () => ({
    meta: [
      { title: "Sinap Properties — Land, Housing & Investment in Kenya" },
      { name: "description", content: "Sinap Properties: land sales, residential and commercial plots, affordable housing, property management and investment advisory across Nairobi, Kamulu, Athi River, Kitengela, Machakos and Kajiado." },
      { property: "og:title", content: "Sinap Properties — Secure Your Future Through Land Ownership" },
      { property: "og:description", content: "Creating wealth through smart property investment. Buy land, invest, build — with a company that gives back." },
      { property: "og:url", content: "https://global-afrikan-nexus.lovable.app/properties" },
    ],
    links: [{ rel: "canonical", href: "https://global-afrikan-nexus.lovable.app/properties" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        name: "Sinap Properties",
        parentOrganization: { "@type": "Organization", name: "54 Global Afrikan" },
        areaServed: ["Nairobi", "Kamulu", "Athi River", "Kitengela", "Machakos", "Kajiado"],
        telephone: "+254715297696",
        url: "https://global-afrikan-nexus.lovable.app/properties",
      }),
    }],
  }),
});

const inqSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  interest: z.string().min(2).max(120),
  message: z.string().max(1000).optional().or(z.literal("")),
});

const services = [
  "Land Sales", "Residential Plots", "Commercial Plots", "Affordable Housing",
  "Property Management", "Construction Consultancy", "Investment Advisory",
  "Title Processing", "Land Survey", "Property Valuation",
];
const projects = [
  { t: "Kamulu", d: "50 x 100 titled plots, prime access to Kangundo Road." },
  { t: "Athi River", d: "Residential & commercial plots in a fast-growing corridor." },
  { t: "Kitengela", d: "Modern gated developments minutes from SGR." },
  { t: "Machakos", d: "Serene countryside plots for weekend homes and farming." },
  { t: "Kajiado", d: "Large acreage for ranching, agri-business and investment." },
];

function PropertiesPage() {
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = inqSchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) { setErr(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setStatus("saving"); setErr(null);
    const { error } = await supabase.from("inquiries").insert({
      name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone,
      subject: `Sinap Properties: ${parsed.data.interest}`,
      message: parsed.data.message || parsed.data.interest,
      category: "properties",
    } as any);
    if (error) { setStatus("error"); setErr(error.message); return; }
    setStatus("ok"); (e.target as HTMLFormElement).reset();
  }

  const F = "rounded-xl bg-input border border-border px-4 py-3 text-sm";

  return (
    <Layout>
      <PageHero
        eyebrow="Sinap Properties · A 54 Global Afrikan company"
        title="Secure your future through"
        accent="land ownership."
        subtitle="Titled plots, residential estates and investment-grade real estate across Nairobi and its growth corridors — with a portion of every sale reinvested in the community."
        image={hero}
      />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-3 gap-4">
          {[
            { Icon: TrendingUp, t: "Investment-grade", d: "Every project vetted for ROI and title clarity." },
            { Icon: ShieldCheck, t: "Fully titled", d: "We only sell land with clean, ready title deeds." },
            { Icon: Building2, t: "Build-ready", d: "Turn-key construction & management available." },
          ].map((s, i) => (
            <Reveal key={s.t} delay={i * 70}>
              <div className="glass rounded-2xl p-6">
                <s.Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Our services</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Everything you need — one company.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Current projects</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Where we're building.</h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, i) => (
              <Reveal key={p.t} delay={i * 60}>
                <div className="glass rounded-2xl p-6 h-full">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-display text-2xl font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 to-primary text-primary-foreground p-8 sm:p-10">
            <p className="text-xs uppercase tracking-[0.3em] opacity-90">Community impact</p>
            <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold">A percentage of every property sale funds:</h3>
            <ul className="mt-5 grid sm:grid-cols-3 gap-3 text-sm opacity-95">
              {["Education for vulnerable children", "Widow empowerment", "Orphan support", "Church missions", "Youth empowerment", "Community health"].map((x) => (
                <li key={x} className="rounded-xl bg-white/10 px-4 py-3">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="rounded-3xl glass p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Talk to an advisor</p>
              <h3 className="mt-3 font-display text-3xl font-bold">Book a site visit</h3>
              <p className="mt-3 text-muted-foreground">Tell us what you're looking for and we'll call you back within one working day.</p>
              {status === "ok" ? (
                <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
                  <Check className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-3 font-display text-2xl font-bold">Request received</h4>
                  <p className="mt-2 text-sm text-muted-foreground">Our advisor will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid sm:grid-cols-2 gap-3">
                  <input name="name" required placeholder="Full name" className={F} />
                  <input name="phone" required placeholder="Phone" className={F} />
                  <input name="email" type="email" required placeholder="Email" className={`${F} sm:col-span-2`} />
                  <input name="interest" required placeholder="Interested in (e.g. Kitengela plot)" className={`${F} sm:col-span-2`} />
                  <textarea name="message" rows={3} placeholder="Notes (optional)" className={`${F} sm:col-span-2`} />
                  {err && <p className="text-sm text-destructive sm:col-span-2">{err}</p>}
                  <button disabled={status === "saving"} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit disabled:opacity-60">
                    {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    Request site visit
                  </button>
                </form>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold">
                  <Phone className="h-4 w-4" /> Call {CONTACT_PHONE_DISPLAY}
                </a>
                <Link to="/organizations" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
                  Back to organizations
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
