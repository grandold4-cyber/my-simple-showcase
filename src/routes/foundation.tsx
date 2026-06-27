import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { HeartHandshake, Users, GraduationCap, Utensils, Droplets, Sparkles, ArrowRight, Loader2, Check, Phone } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/components/site/WhatsAppFab";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/foundation")({
  component: FoundationPage,
  head: () => ({
    meta: [
      { title: "54 Global Foundation — Restoring Hope, One Life at a Time" },
      { name: "description", content: "The humanitarian arm of 54 Global Afrikan: sponsor a child, support widows, feed families, plant churches and transform communities across Africa." },
      { property: "og:title", content: "54 Global Foundation — Community Transformation" },
      { property: "og:description", content: "Restoring Hope. One Life at a Time. Sponsor, volunteer, give — join the mission." },
      { property: "og:url", content: "https://global-afrikan-nexus.lovable.app/foundation" },
    ],
    links: [{ rel: "canonical", href: "https://global-afrikan-nexus.lovable.app/foundation" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NGO",
        name: "54 Global Foundation",
        parentOrganization: { "@type": "Organization", name: "54 Global Afrikan" },
        telephone: "+254715297696",
        url: "https://global-afrikan-nexus.lovable.app/foundation",
      }),
    }],
  }),
});

const causes = [
  { Icon: Users, t: "Orphan Support" },
  { Icon: HeartHandshake, t: "Widow Empowerment" },
  { Icon: GraduationCap, t: "Education for Every Child" },
  { Icon: Utensils, t: "Feeding Programme" },
  { Icon: Sparkles, t: "Street Children Rescue" },
  { Icon: Droplets, t: "Clean Water" },
];

const tiers = [
  { amt: "$30", label: "Sponsor one child every month" },
  { amt: "$50", label: "Feed two vulnerable families" },
  { amt: "$100", label: "Provide school uniforms & materials" },
  { amt: "$250", label: "Equip a classroom" },
  { amt: "$500", label: "Support a widow to start a business" },
  { amt: "$1,000+", label: "Become a Transformation Partner" },
];

const sponsorSchema = z.object({
  sponsor_name: z.string().trim().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  tier: z.string().min(1),
  cause: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
});
const volSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(7).max(40),
  cause: z.string().max(120).optional().or(z.literal("")),
  availability: z.string().max(120).optional().or(z.literal("")),
  skills: z.string().max(500).optional().or(z.literal("")),
});

function FoundationPage() {
  const [sStatus, setSStatus] = useState<"idle" | "saving" | "ok">("idle");
  const [vStatus, setVStatus] = useState<"idle" | "saving" | "ok">("idle");
  const [sErr, setSErr] = useState<string | null>(null);
  const [vErr, setVErr] = useState<string | null>(null);

  async function onSponsor(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = sponsorSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget).entries()));
    if (!parsed.success) { setSErr(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setSStatus("saving"); setSErr(null);
    const { error } = await supabase.from("sponsorships" as any).insert({ ...parsed.data, phone: parsed.data.phone || null, cause: parsed.data.cause || null, message: parsed.data.message || null });
    if (error) { setSErr(error.message); setSStatus("idle"); return; }
    setSStatus("ok"); (e.target as HTMLFormElement).reset();
  }
  async function onVolunteer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = volSchema.safeParse(Object.fromEntries(new FormData(e.currentTarget).entries()));
    if (!parsed.success) { setVErr(parsed.error.issues[0]?.message ?? "Check the form"); return; }
    setVStatus("saving"); setVErr(null);
    const { error } = await supabase.from("volunteer_signups" as any).insert({ ...parsed.data, cause: parsed.data.cause || null, availability: parsed.data.availability || null, skills: parsed.data.skills || null });
    if (error) { setVErr(error.message); setVStatus("idle"); return; }
    setVStatus("ok"); (e.target as HTMLFormElement).reset();
  }

  const F = "rounded-xl bg-input border border-border px-4 py-3 text-sm";

  return (
    <Layout>
      <PageHero
        eyebrow="54 Global Foundation · Humanitarian arm"
        title="Restoring hope."
        accent="One life at a time."
        subtitle="A dedicated platform for donors, churches, NGOs and volunteers to transform African communities together — with radical transparency."
        image={hero}
      />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Our causes</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Where your gift goes.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {causes.map((c, i) => (
              <Reveal key={c.t} delay={i * 40}>
                <div className="aspect-square glass rounded-2xl p-5 flex flex-col items-center justify-center gap-3">
                  <c.Icon className="h-6 w-6 text-primary" />
                  <div className="text-sm font-semibold text-center">{c.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsor" className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Ways to give</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Pick a level. Change a life.</h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((t, i) => (
              <Reveal key={t.amt} delay={i * 60}>
                <div className="glass rounded-2xl p-6 h-full">
                  <div className="font-display text-4xl font-bold text-gradient-gold">{t.amt}</div>
                  <p className="mt-3 text-sm text-muted-foreground">{t.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="rounded-3xl glass p-8">
              <h3 className="font-display text-2xl font-bold">Sponsor a child / cause</h3>
              {sStatus === "ok" ? (
                <div className="mt-6 rounded-2xl bg-primary/10 p-6 text-center">
                  <Check className="h-10 w-10 mx-auto text-primary" />
                  <p className="mt-3 font-semibold">Thank you — our team will contact you with next steps.</p>
                </div>
              ) : (
                <form onSubmit={onSponsor} className="mt-5 grid gap-3">
                  <input name="sponsor_name" required placeholder="Full name" className={F} />
                  <input name="email" type="email" required placeholder="Email" className={F} />
                  <input name="phone" placeholder="Phone (optional)" className={F} />
                  <select name="tier" required defaultValue="" className={F}>
                    <option value="" disabled>Choose tier…</option>
                    {tiers.map((t) => <option key={t.amt} value={t.amt}>{t.amt} — {t.label}</option>)}
                  </select>
                  <select name="cause" defaultValue="" className={F}>
                    <option value="">Any cause</option>
                    {causes.map((c) => <option key={c.t}>{c.t}</option>)}
                  </select>
                  <textarea name="message" rows={3} placeholder="Message (optional)" className={F} />
                  {sErr && <p className="text-sm text-destructive">{sErr}</p>}
                  <button disabled={sStatus === "saving"} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit disabled:opacity-60">
                    {sStatus === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <HeartHandshake className="h-4 w-4" />}
                    Pledge sponsorship
                  </button>
                </form>
              )}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-3xl glass-blue p-8">
              <h3 className="font-display text-2xl font-bold">Volunteer with us</h3>
              {vStatus === "ok" ? (
                <div className="mt-6 rounded-2xl bg-primary/10 p-6 text-center">
                  <Check className="h-10 w-10 mx-auto text-primary" />
                  <p className="mt-3 font-semibold">Welcome to the team — we'll be in touch.</p>
                </div>
              ) : (
                <form onSubmit={onVolunteer} className="mt-5 grid gap-3">
                  <input name="full_name" required placeholder="Full name" className={F} />
                  <input name="email" type="email" required placeholder="Email" className={F} />
                  <input name="phone" required placeholder="Phone" className={F} />
                  <select name="cause" defaultValue="" className={F}>
                    <option value="">Any cause</option>
                    {causes.map((c) => <option key={c.t}>{c.t}</option>)}
                  </select>
                  <input name="availability" placeholder="Availability (e.g. weekends)" className={F} />
                  <textarea name="skills" rows={3} placeholder="Skills / experience" className={F} />
                  {vErr && <p className="text-sm text-destructive">{vErr}</p>}
                  <button disabled={vStatus === "saving"} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground glow-gold disabled:opacity-60">
                    {vStatus === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
                    Join as volunteer
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-r from-rose-600 to-primary text-primary-foreground p-8 sm:p-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] opacity-90">Transparency</p>
                <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold">Annual reports & impact stories on request.</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-4 py-2 text-sm font-semibold">
                  <Phone className="h-4 w-4" /> {CONTACT_PHONE_DISPLAY}
                </a>
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold">
                  Contact us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
