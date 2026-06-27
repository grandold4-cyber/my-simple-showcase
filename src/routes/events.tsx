import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, MapPin, Loader2, Check, Users, ArrowRight } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import img from "@/assets/hero-worship.jpg";

export const Route = createFileRoute("/events")({
  component: EventsPage,
  head: () => ({
    meta: [
      { title: "Events — 54 Global Afrikan" },
      { name: "description", content: "Worship nights, conferences, crusades and outreach across the 54 Global Afrikan ecosystem. Register to attend upcoming events." },
      { property: "og:title", content: "Upcoming Events — 54 Global Afrikan" },
      { property: "og:description", content: "Join us at our next conference, worship night or outreach mission. Register online." },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
});

type Ev = {
  id: string; title: string; description: string | null; location: string | null;
  starts_at: string; cover_url: string | null;
};

function Countdown({ to }: { to: Date }) {
  const [t, setT] = useState(() => to.getTime() - Date.now());
  useEffect(() => {
    const i = setInterval(() => setT(to.getTime() - Date.now()), 1000);
    return () => clearInterval(i);
  }, [to]);
  const s = Math.max(0, Math.floor(t / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const cell = (v: number, l: string) => (
    <div className="glass rounded-xl px-4 py-3 text-center min-w-[68px]">
      <div className="font-display text-2xl font-bold text-gradient-gold">{String(v).padStart(2, "0")}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
  return <div className="flex gap-2 flex-wrap">{cell(d, "Days")}{cell(h, "Hrs")}{cell(m, "Min")}{cell(sec, "Sec")}</div>;
}

const regSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notes: z.string().max(500).optional().or(z.literal("")),
});

function RegisterPanel({ eventId, onDone }: { eventId: string; onDone: () => void }) {
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = regSchema.safeParse(Object.fromEntries(fd.entries()));
    if (!parsed.success) { setErr(parsed.error.issues[0]?.message ?? "Check form"); return; }
    setStatus("saving");
    const { error } = await (supabase as any).from("event_registrations").insert({
      event_id: eventId,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      notes: parsed.data.notes || null,
    });
    if (error) { setStatus("error"); setErr(error.message); return; }
    setStatus("ok");
    setTimeout(onDone, 1500);
  }
  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-primary/10 p-5 text-center">
        <Check className="h-8 w-8 mx-auto text-primary" />
        <p className="mt-2 font-semibold">You're registered. See you there!</p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-2">
      <input name="name" required placeholder="Full name" className="rounded-xl bg-input border border-border px-4 py-3 text-sm sm:col-span-2" />
      <input name="email" type="email" required placeholder="Email" className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
      <input name="phone" placeholder="Phone (optional)" className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
      <textarea name="notes" rows={2} placeholder="Anything we should know?" className="rounded-xl bg-input border border-border px-4 py-3 text-sm sm:col-span-2" />
      {err && <p className="text-sm text-destructive sm:col-span-2">{err}</p>}
      <button disabled={status === "saving"} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60">
        {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
        Confirm registration
      </button>
    </form>
  );
}

function EventsPage() {
  const [events, setEvents] = useState<Ev[] | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    (supabase as any).from("events").select("*").gte("starts_at", new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString()).order("starts_at", { ascending: true })
      .then(({ data }: any) => setEvents((data ?? []) as Ev[]));
  }, []);

  return (
    <Layout>
      <PageHero
        eyebrow="Events"
        title="Moments where heaven"
        accent="meets earth."
        subtitle="Conferences, worship nights, crusades and outreach missions across the ecosystem."
        image={img}
      />
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 space-y-6">
          {events === null && <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>}
          {events && events.length === 0 && (
            <div className="rounded-3xl glass p-10 text-center">
              <Calendar className="h-8 w-8 mx-auto text-primary" />
              <p className="mt-3 font-display text-2xl font-bold">No events scheduled right now</p>
              <p className="text-sm text-muted-foreground mt-1">Check back soon — new gatherings are added regularly.</p>
            </div>
          )}
          {events?.map((e, i) => {
            const when = new Date(e.starts_at);
            return (
              <Reveal key={e.id} delay={i * 80}>
                <div className="rounded-3xl glass overflow-hidden">
                  {e.cover_url && (
                    <img src={e.cover_url} alt={e.title} className="w-full h-56 object-cover" />
                  )}
                  <div className="p-7 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
                        <Calendar className="h-3.5 w-3.5" />
                        {when.toLocaleString(undefined, { dateStyle: "long", timeStyle: "short" })}
                      </div>
                      <h3 className="mt-2 font-display text-3xl font-bold">{e.title}</h3>
                      {e.location && <div className="mt-1 text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.location}</div>}
                      {e.description && <p className="mt-3 text-sm text-muted-foreground max-w-2xl">{e.description}</p>}
                    </div>
                    <Countdown to={when} />
                    <button
                      onClick={() => setOpenId(openId === e.id ? null : e.id)}
                      className="self-start lg:self-auto rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit inline-flex items-center gap-2"
                    >
                      Register <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {openId === e.id && (
                    <div className="p-7 pt-0">
                      <RegisterPanel eventId={e.id} onDone={() => setOpenId(null)} />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
