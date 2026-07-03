import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { supabase } from "@/integrations/supabase/client";
import { staticGallery } from "@/lib/staticGallery";
import img from "@/assets/school-hero.jpg";

const searchSchema = z.object({
  section: z.enum(["school", "church", "company"]).catch("school"),
});

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Gallery — 54 Global Afrikan" },
      { name: "description", content: "Photos and videos from Halel School, Praise International Church and the 54 Global Afrikan ecosystem." },
      { property: "og:title", content: "Gallery — 54 Global Afrikan" },
      { property: "og:description", content: "Browse photos and videos from across our school, church and community." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});


type Item = { id: string; section: string; kind: string; url: string; title: string | null; caption: string | null; created_at: string };

function GalleryPage() {
  const { section } = useSearch({ from: "/gallery" });
  const [items, setItems] = useState<Item[] | null>(null);
  const [lightbox, setLightbox] = useState<Item | null>(null);

  useEffect(() => {
    setItems(null);
    (supabase as any).from("gallery_items").select("*").eq("section", section).order("created_at", { ascending: false })
      .then(({ data }: any) => {
        const dbItems = (data ?? []) as Item[];
        const fallback = staticGallery.filter((s) => s.section === section) as unknown as Item[];
        const seen = new Set(dbItems.map((d) => d.url));
        setItems([...dbItems, ...fallback.filter((f) => !seen.has(f.url))]);
      });
  }, [section]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const titles: Record<string, { eyebrow: string; title: string; accent: string; sub: string }> = {
    school: { eyebrow: "Halel School Gallery", title: "Life at", accent: "Halel.", sub: "A peek into our classrooms, events and student journey." },
    church: { eyebrow: "Praise International Church Gallery", title: "Moments of", accent: "worship.", sub: "Services, conferences, baptisms and outreach." },
    company: { eyebrow: "54 Global Afrikan Gallery", title: "Stories of", accent: "impact.", sub: "Programs, partnerships and people across our ecosystem." },
  };
  const t = titles[section];

  return (
    <Layout>
      <PageHero eyebrow={t.eyebrow} title={t.title} accent={t.accent} subtitle={t.sub} image={img} />

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {(["school", "church", "company"] as const).map((s) => (
              <Link key={s} to="/gallery" search={{ section: s }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold border transition ${section === s ? "bg-primary text-primary-foreground border-primary" : "glass border-border hover:bg-muted"}`}>
                {s === "school" ? "Halel School" : s === "church" ? "Praise Church" : "54 Global"}
              </Link>
            ))}
          </div>

          {items === null ? (
            <div className="text-center py-16"><Loader2 className="h-6 w-6 animate-spin mx-auto" /></div>
          ) : items.length === 0 ? (
            <div className="rounded-3xl glass p-12 text-center">
              <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground" />
              <p className="mt-3 font-display text-2xl font-bold">Gallery coming soon</p>
              <p className="text-sm text-muted-foreground mt-1">We'll be uploading photos and videos here shortly.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <figure key={it.id} className="group relative rounded-2xl overflow-hidden glass">
                  {it.kind === "video" ? (
                    <video src={it.url} controls className="w-full aspect-video bg-black object-cover" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setLightbox(it)}
                      className="block w-full text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Open ${it.title ?? "image"} in full view`}
                    >
                      <img src={it.url} alt={it.title ?? ""} loading="lazy" className="w-full aspect-[4/3] object-cover transition-transform group-hover:scale-105" />
                    </button>
                  )}
                  {(it.title || it.caption) && (
                    <figcaption className="p-4">
                      {it.title && <h3 className="font-semibold">{it.title}</h3>}
                      {it.caption && <p className="text-sm text-muted-foreground mt-1">{it.caption}</p>}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute top-4 right-4 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white text-2xl flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.title ?? ""}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Layout>
  );
}
