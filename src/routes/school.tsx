import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  GraduationCap, BookOpen, Trophy, Music2, Palette, HeartHandshake,
  ShieldCheck, Sparkles, ArrowRight, Heart, HandHeart, Check, Loader2, Download, Phone,
} from "lucide-react";

import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import { downloadAdmissionPdf, type AdmissionData } from "@/lib/schoolPdf";
import { CONTACT_PHONE, CONTACT_PHONE_DISPLAY } from "@/components/site/WhatsAppFab";
import school from "@/assets/school-hero.jpg";


export const Route = createFileRoute("/school")({
  component: SchoolPage,
  head: () => ({
    meta: [
      { title: "Halel School Nairobi — Christian CBC School | Enroll Your Child" },
      { name: "description", content: "Halel School Nairobi: modern Christ-centered CBC education. Lower & Upper Primary. Enroll your child or sponsor a scholarship today." },
      { name: "keywords", content: "Halel School, Halel School Nairobi, Christian school Nairobi, CBC school Nairobi, primary school Nairobi, Buruburu school" },
      { property: "og:title", content: "Halel School Nairobi — Growing Faith, Nurturing Futures" },
      { property: "og:description", content: "Modern Christ-centered CBC education in Nairobi. Enroll your child today." },
      { property: "og:image", content: "/og-school.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/school" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "School",
        name: "Halel School Nairobi",
        description: "Christ-centered CBC school in Nairobi offering Lower & Upper Primary.",
        address: { "@type": "PostalAddress", streetAddress: "Second Avenue, Buruburu Farm", addressLocality: "Nairobi", addressCountry: "KE" },
        telephone: "+254715297696",
        url: "https://54globalafrikan.com/school",
        parentOrganization: { "@type": "Organization", name: "54 Global Afrikan" },
      }),
    }],
  }),
});

const admSchema = z.object({
  // Choice
  choice_level: z.enum(["Lower Primary", "Upper Primary"]),
  preferred_grade: z.string().max(40).optional().or(z.literal("")),
  // Learner
  child_name: z.string().trim().min(2).max(120),
  child_dob: z.string().optional().or(z.literal("")),
  learner_gender: z.string().max(20).optional().or(z.literal("")),
  place_of_birth: z.string().max(120).optional().or(z.literal("")),
  nationality: z.string().max(80).optional().or(z.literal("")),
  religion: z.string().max(80).optional().or(z.literal("")),
  home_language: z.string().max(80).optional().or(z.literal("")),
  special_needs: z.string().max(300).optional().or(z.literal("")),
  // Parent
  parent_name: z.string().trim().min(2).max(120),
  parent_relationship: z.string().max(60).optional().or(z.literal("")),
  parent_id_no: z.string().max(40).optional().or(z.literal("")),
  parent_phone: z.string().trim().min(7).max(40),
  parent_email: z.string().trim().email().max(200),
  parent_address: z.string().max(300).optional().or(z.literal("")),
  // Academic background
  current_school: z.string().max(200).optional().or(z.literal("")),
  last_grade: z.string().max(60).optional().or(z.literal("")),
  kcpe_index: z.string().max(40).optional().or(z.literal("")),
  other_remarks: z.string().max(500).optional().or(z.literal("")),
  // Notes
  message: z.string().max(1000).optional().or(z.literal("")),
});

function SchoolPage() {
  const activities = [
    { Icon: Trophy, t: "Sports" }, { Icon: Music2, t: "Music" },
    { Icon: BookOpen, t: "Bible Club" }, { Icon: Sparkles, t: "Drama" },
    { Icon: Palette, t: "Creative Arts" }, { Icon: HeartHandshake, t: "Leadership" },
  ];

  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastApp, setLastApp] = useState<AdmissionData | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = admSchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form"); return; }
    const p = parsed.data;

    setStatus("saving");
    // Insert first to obtain the auto-generated application_no
    const academicYear = `${new Date().getFullYear()} / ${new Date().getFullYear() + 1}`;
    const insertPayload = {
      parent_name: p.parent_name,
      parent_email: p.parent_email,
      parent_phone: p.parent_phone,
      parent_relationship: p.parent_relationship || null,
      parent_id_no: p.parent_id_no || null,
      parent_address: p.parent_address || null,
      child_name: p.child_name,
      child_dob: p.child_dob || null,
      class_of_interest: p.choice_level, // legacy column kept in sync
      choice_level: p.choice_level,
      preferred_grade: p.preferred_grade || null,
      learner_gender: p.learner_gender || null,
      place_of_birth: p.place_of_birth || null,
      nationality: p.nationality || null,
      religion: p.religion || null,
      home_language: p.home_language || null,
      special_needs: p.special_needs || null,
      current_school: p.current_school || null,
      last_grade: p.last_grade || null,
      kcpe_index: p.kcpe_index || null,
      other_remarks: p.other_remarks || null,
      message: p.message || null,
      academic_year: academicYear,
    } as any;
    const { data: inserted, error } = await supabase.from("admissions").insert(insertPayload).select("*").single();
    if (error) { setStatus("error"); setError(error.message); return; }

    const pdfData: AdmissionData = {
      ...(inserted as any),
      // ensure required fields are present even if select omitted anything
      child_name: p.child_name,
      parent_name: p.parent_name,
      parent_email: p.parent_email,
      parent_phone: p.parent_phone,
    };
    downloadAdmissionPdf(pdfData);
    setLastApp(pdfData);
    setStatus("ok");
    (e.target as HTMLFormElement).reset();
  }

  const F = "rounded-xl bg-input border border-border px-4 py-3 text-sm";

  return (
    <Layout>
      <PageHero
        eyebrow="Halel School · Nairobi"
        title="Growing Faith,"
        accent="Nurturing Futures."
        subtitle="A safe, joyful, Christ-centered learning home — preparing children for excellence in academics, character and calling."
        image={school}
      />

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 sm:p-10 flex flex-col lg:flex-row gap-6 lg:items-center justify-between glow-spirit">
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.3em] opacity-90">Sponsor a child</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">Keep a child at Halel School this term.</h2>
              <p className="mt-3 opacity-90">Books, meals, uniform and a Christ-centered education — your gift lasts a lifetime. Term fees shared on visit or consultation.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-5 py-3 text-sm font-semibold">
                <Heart className="h-4 w-4" /> Sponsor a child
              </Link>
              <Link to="/partnership" className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-sm font-semibold glow-gold">
                <HandHeart className="h-4 w-4" /> Become a partner
              </Link>
              <a href={`tel:${CONTACT_PHONE}`} className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold">
                <Phone className="h-4 w-4" /> Call {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: "350+", l: "Pupils enrolled" },
            { v: "25+", l: "Qualified educators" },
            { v: "CBC", l: "Aligned curriculum" },
            { v: "100%", l: "Christ-centered" },
          ].map((s) => (
            <Reveal key={s.l}>
              <div className="glass rounded-2xl p-6">
                <div className="font-display text-3xl font-bold text-gradient-spirit">{s.v}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Academics</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold max-w-2xl">A CBC journey, designed with care.</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">Our learning philosophy blends competency-based education with biblical values — equipping the heart, mind and hands of every learner.</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            {[
              { t: "Lower Primary", d: "Grades 1 – 3 · Foundations for excellence." },
              { t: "Upper Primary", d: "Grades 4 – 6 · Mastery, character and calling." },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 70}>
                <div className="group relative h-full rounded-3xl glass p-7 hover:ring-sapphire transition">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <h3 className="mt-5 font-display text-2xl font-bold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Co-curricular</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">Beyond the classroom.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {activities.map((a, i) => (
              <Reveal key={a.t} delay={i * 50}>
                <div className="aspect-square rounded-2xl glass p-5 flex flex-col items-center justify-center gap-3 hover:ring-sapphire transition">
                  <a.Icon className="h-6 w-6 text-primary" />
                  <div className="text-sm font-semibold text-center">{a.t}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/gallery" search={{ section: "school" as const }} className="inline-flex items-center gap-2 rounded-full glass px-5 py-3 text-sm font-semibold">
              View school gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Admissions form — matches the official enrollment PDF */}
      <section id="admissions" className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.4fr,1fr] gap-6">
          <Reveal>
            <div className="rounded-3xl glass p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">Admissions</p>
              <h3 className="mt-3 font-display text-3xl font-bold">Online Enrollment Form</h3>
              <p className="mt-3 text-muted-foreground">
                Complete this form to enroll your child at Halel School. On submission, you'll receive a unique
                application number and a downloadable copy of the form — bring it with you when visiting the school.
              </p>

              {status === "ok" ? (
                <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
                  <Check className="h-10 w-10 mx-auto text-primary" />
                  <h4 className="mt-3 font-display text-2xl font-bold">Application received & form downloaded</h4>
                  {lastApp?.application_no && (
                    <p className="mt-2 text-sm">
                      Application No. <span className="font-mono font-bold text-primary">{lastApp.application_no}</span>
                    </p>
                  )}
                  <p className="mt-2 text-sm text-muted-foreground">Please print the downloaded form and bring it when visiting the school.</p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    {lastApp && (
                      <button onClick={() => downloadAdmissionPdf(lastApp)} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold">
                        <Download className="h-4 w-4" /> Download again
                      </button>
                    )}
                    <button onClick={() => { setStatus("idle"); setLastApp(null); }} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                      Submit another
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 space-y-6">
                  {/* 1. Choice of Class */}
                  <fieldset className="rounded-2xl border border-border p-5">
                    <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">1. Choice of Class</legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 text-sm"><input type="radio" name="choice_level" value="Lower Primary" required /> Lower Primary (Grades 1 – 3)</label>
                      <label className="flex items-center gap-2 text-sm"><input type="radio" name="choice_level" value="Upper Primary" /> Upper Primary (Grades 4 – 6)</label>
                      <input name="preferred_grade" placeholder="Preferred grade / unit" className={`${F} sm:col-span-2`} />
                    </div>
                  </fieldset>

                  {/* 2. Learner's Personal Details */}
                  <fieldset className="rounded-2xl border border-border p-5">
                    <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">2. Learner's Personal Details</legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input name="child_name" required placeholder="Full name (as per birth certificate)*" className={`${F} sm:col-span-2`} />
                      <input name="child_dob" type="date" placeholder="Date of birth" className={F} />
                      <select name="learner_gender" defaultValue="" className={F}>
                        <option value="">Gender…</option><option>Male</option><option>Female</option>
                      </select>
                      <input name="place_of_birth" placeholder="Place of birth" className={F} />
                      <input name="nationality" placeholder="Nationality" className={F} />
                      <input name="religion" placeholder="Religion" className={F} />
                      <input name="home_language" placeholder="Home language" className={F} />
                      <textarea name="special_needs" rows={2} placeholder="Any special need / medical condition" className={`${F} sm:col-span-2`} />
                    </div>
                  </fieldset>

                  {/* 3. Parent / Guardian */}
                  <fieldset className="rounded-2xl border border-border p-5">
                    <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">3. Parent / Guardian Information</legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input name="parent_name" required placeholder="Full name*" className={`${F} sm:col-span-2`} />
                      <input name="parent_relationship" placeholder="Relationship to learner*" className={F} />
                      <input name="parent_id_no" placeholder="ID / Passport No.*" className={F} />
                      <input name="parent_phone" required placeholder="Phone number*" className={F} />
                      <input name="parent_email" type="email" required placeholder="Email address" className={F} />
                      <textarea name="parent_address" rows={2} placeholder="Physical address*" className={`${F} sm:col-span-2`} />
                    </div>
                  </fieldset>

                  {/* 4. Academic Background */}
                  <fieldset className="rounded-2xl border border-border p-5">
                    <legend className="px-2 text-xs font-bold uppercase tracking-wider text-primary">4. Academic Background</legend>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <input name="current_school" placeholder="Previous school (if any)" className={F} />
                      <input name="last_grade" placeholder="Last grade completed" className={F} />
                      <input name="kcpe_index" placeholder="KCPE Index No. (if applicable)" className={`${F} sm:col-span-2`} />
                      <textarea name="other_remarks" rows={2} placeholder="Any other remarks" className={`${F} sm:col-span-2`} />
                    </div>
                  </fieldset>

                  <textarea name="message" rows={3} placeholder="Notes for admissions (optional)" className={`${F} w-full`} />

                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <button disabled={status === "saving"} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit disabled:opacity-60">
                    {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    Submit & download form
                  </button>
                  <p className="text-xs text-muted-foreground">
                    By submitting you agree to our <Link to="/policies/privacy" className="text-primary">privacy</Link> and{" "}
                    <Link to="/policies/child-protection" className="text-primary">child protection</Link> policies.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl glass-blue p-8 h-full">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-3xl font-bold">Our promise</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>· Strict child protection & safeguarding</li>
                <li>· Health & safety standards</li>
                <li>· Christ-centered character formation</li>
                <li>· Active parent partnership</li>
                <li>· Scholarships for vulnerable children</li>
              </ul>
              <div className="mt-6 rounded-2xl bg-primary/10 p-5">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">School fees</p>
                <p className="mt-1 font-semibold">Shared on visit or consultation.</p>
                <a href={`tel:${CONTACT_PHONE}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  <Phone className="h-4 w-4" /> {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
              <Link to="/policies/child-protection" className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-semibold">
                Read child protection policy <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
