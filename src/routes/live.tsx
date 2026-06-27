import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Radio, Loader2, Calendar, Tv } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import img from "@/assets/hero-worship.jpg";

export const Route = createFileRoute("/live")({
  component: LivePage,
  head: () => ({
    meta: [
      { title: "Watch Live — 54 Global Afrikan" },
      { name: "description", content: "Stream live services, conferences and worship nights from Praise International Church and 54 Global Afrikan." },
      { property: "og:title", content: "Watch Live — 54 Global Afrikan" },
      { property: "og:description", content: "Join us live online for worship and the word." },
    ],
    links: [{ rel: "canonical", href: "/live" }],
  }),
});

type Live = {
  id: string; is_live: boolean; youtube_url: string | null;
  upcoming_at: string | null; upcoming_title: string | null; message: string | null;
};

function toEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}?autoplay=1`;
      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "live" && parts[1]) return `https://www.youtube.com/embed/${parts[1]}?autoplay=1`;
      if (parts[0] === "embed" && parts[1]) return url;
    }
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
  } catch {}
  return null;
}

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
    <div className="glass rounded-2xl px-5 py-4 text-center min-w-[80px]">
      <div className="font-display text-3xl font-bold text-gradient-gold">{String(v).padStart(2, "0")}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
    </div>
  );
  return <div className="flex gap-3 flex-wrap justify-center">{cell(d, "Days")}{cell(h, "Hrs")}{cell(m, "Min")}{cell(sec, "Sec")}</div>;
}

function LivePage() {
  const [live, setLive] = useState<Live | null | undefined>(undefined);

  useEffect(() => {
    (supabase as any).from("live_settings").select("*").eq("id", "main").maybeSingle()
      .then(({ data }: any) => setLive(data as Live | null));
    const ch = (supabase as any).channel("live-watch")
      .on("postgres_changes", { event: "*", schema: "public", table: "live_settings" }, (p: any) => {
        if (p.new) setLive(p.new as Live);
      }).subscribe();
    return () => { (supabase as any).removeChannel(ch); };
  }, []);

  const embed = live?.is_live && live.youtube_url ? toEmbed(live.youtube_url) : null;
  const upcoming = live?.upcoming_at ? new Date(live.upcoming_at) : null;
  const upcomingPending = upcoming && upcoming.getTime() > Date.now();

  return (
    <Layout>
      <PageHero
        eyebrow="Watch Live"
        title="Worship with us,"
        accent="wherever you are."
        subtitle="Stream live services, conferences and worship nights directly from our channel."
        image={img}
      />

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          {live === undefined && <div className="text-center py-12"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>}

          {live !== undefined && embed && (
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-bold text-destructive-foreground animate-pulse-glow">
                <Radio className="h-4 w-4" /> LIVE NOW
              </div>
              <div className="rounded-3xl overflow-hidden glass">
                <div className="aspect-video bg-black">
                  <iframe
                    src={embed}
                    title="Live stream"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              {live?.message && <p className="text-sm text-muted-foreground text-center">{live.message}</p>}
            </div>
          )}

          {live !== undefined && !embed && (
            <div className="rounded-3xl glass p-10 text-center space-y-6">
              <Tv className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <h2 className="font-display text-3xl font-bold">No live session right now</h2>
                <p className="mt-2 text-muted-foreground">
                  {live?.message || "We aren't streaming at the moment. Check back during our next scheduled service."}
                </p>
              </div>

              {upcomingPending && upcoming && (
                <div className="mt-4 space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold text-primary">
                    <Calendar className="h-4 w-4" /> Upcoming: {live?.upcoming_title || "Next live service"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {upcoming.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                  </p>
                  <Countdown to={upcoming} />
                </div>
              )}
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}
