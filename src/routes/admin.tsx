import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { CloudinaryUpload } from "@/components/site/CloudinaryUpload";
import { downloadAdmissionPdf } from "@/lib/schoolPdf";
import {
  LogOut, Inbox, GraduationCap, Heart, HandHeart, Loader2, Calendar, Radio, Image as ImageIcon,
  Trash2, Plus, Download, Save, Users,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  ssr: false,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  head: () => ({
    meta: [
      { title: "Admin dashboard — 54 Global Afrikan" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Tab =
  | "admissions" | "donations" | "inquiries" | "prayer"
  | "events" | "registrations" | "live" | "gallery";

function AdminPage() {
  const [tab, setTab] = useState<Tab>("admissions");
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        window.location.href = "/auth";
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", u.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      if (!admin) {
        // Non-admins are not allowed past /auth — sign them out and send back.
        await supabase.auth.signOut();
        window.location.href = "/auth?error=not_admin";
        return;
      }
      setIsAdmin(true);
    })();
  }, []);

  if (isAdmin === null) return <Layout><div className="pt-40 pb-24 text-center"><Loader2 className="h-6 w-6 animate-spin mx-auto" /><p className="mt-3 text-sm text-muted-foreground">Verifying admin access…</p></div></Layout>;

  const tabs: { id: Tab; label: string; Icon: any }[] = [
    { id: "admissions", label: "Admissions", Icon: GraduationCap },
    { id: "registrations", label: "Event registrations", Icon: Users },
    { id: "donations", label: "Donations", Icon: Heart },
    { id: "inquiries", label: "Inquiries", Icon: HandHeart },
    { id: "prayer", label: "Prayer", Icon: Inbox },
    { id: "events", label: "Events", Icon: Calendar },
    { id: "live", label: "Live stream", Icon: Radio },
    { id: "gallery", label: "Galleries", Icon: ImageIcon },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="font-display text-4xl font-bold">Admin dashboard</h1>
            <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/")} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-semibold">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold border transition ${tab === t.id ? "bg-primary text-primary-foreground border-primary" : "glass border-border"}`}>
                <t.Icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "admissions" && <AdmissionsPanel />}
            {tab === "registrations" && <RegistrationsPanel />}
            {tab === "donations" && <SimpleTablePanel table="donations" />}
            {tab === "inquiries" && <SimpleTablePanel table="inquiries" />}
            {tab === "prayer" && <SimpleTablePanel table="prayer_requests" />}
            {tab === "events" && <EventsPanel />}
            {tab === "live" && <LivePanel />}
            {tab === "gallery" && <GalleryPanel />}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/* ============== ADMISSIONS (with download) ============== */
function AdmissionsPanel() {
  const [rows, setRows] = useState<any[] | null>(null);
  useEffect(() => {
    supabase.from("admissions").select("*").order("created_at", { ascending: false }).limit(500)
      .then(({ data }) => setRows(data ?? []));
  }, []);
  if (!rows) return <Loader />;
  if (rows.length === 0) return <Empty msg="No applications yet." />;
  return (
    <div className="rounded-3xl glass p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs uppercase text-muted-foreground">
          <th className="px-3 py-2">Submitted</th><th className="px-3 py-2">Parent</th><th className="px-3 py-2">Child</th><th className="px-3 py-2">Class</th><th className="px-3 py-2">Contact</th><th className="px-3 py-2"></th>
        </tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60 align-top">
              <td className="px-3 py-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="px-3 py-3">{r.parent_name}</td>
              <td className="px-3 py-3">{r.child_name}{r.child_dob ? <div className="text-xs text-muted-foreground">DOB: {r.child_dob}</div> : null}</td>
              <td className="px-3 py-3">{r.class_of_interest}</td>
              <td className="px-3 py-3 text-xs">{r.parent_email}<br />{r.parent_phone}</td>
              <td className="px-3 py-3">
                <button onClick={() => downloadAdmissionPdf(r)} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  <Download className="h-3 w-3" /> PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============== EVENT REGISTRATIONS ============== */
function RegistrationsPanel() {
  const [rows, setRows] = useState<any[] | null>(null);
  const [events, setEvents] = useState<Record<string, any>>({});
  useEffect(() => {
    (async () => {
      const { data: regs } = await (supabase as any).from("event_registrations").select("*").order("created_at", { ascending: false }).limit(500);
      setRows(regs ?? []);
      const { data: evs } = await (supabase as any).from("events").select("id,title");
      const map: Record<string, any> = {};
      (evs ?? []).forEach((e: any) => { map[e.id] = e; });
      setEvents(map);
    })();
  }, []);
  if (!rows) return <Loader />;
  if (rows.length === 0) return <Empty msg="No registrations yet." />;
  return (
    <div className="rounded-3xl glass p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs uppercase text-muted-foreground"><th className="px-3 py-2">Date</th><th className="px-3 py-2">Event</th><th className="px-3 py-2">Name</th><th className="px-3 py-2">Email</th><th className="px-3 py-2">Phone</th><th className="px-3 py-2">Notes</th></tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60">
              <td className="px-3 py-3 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="px-3 py-3">{events[r.event_id]?.title ?? "—"}</td>
              <td className="px-3 py-3">{r.name}</td>
              <td className="px-3 py-3">{r.email}</td>
              <td className="px-3 py-3">{r.phone ?? "—"}</td>
              <td className="px-3 py-3 max-w-xs truncate">{r.notes ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============== GENERIC TABLE ============== */
function SimpleTablePanel({ table }: { table: string }) {
  const [rows, setRows] = useState<any[] | null>(null);
  useEffect(() => {
    (supabase as any).from(table).select("*").order("created_at", { ascending: false }).limit(500)
      .then(({ data }: any) => setRows(data ?? []));
  }, [table]);
  if (!rows) return <Loader />;
  if (rows.length === 0) return <Empty msg="No records yet." />;
  return (
    <div className="rounded-3xl glass p-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead><tr className="text-left text-xs uppercase text-muted-foreground">
          {Object.keys(rows[0]).filter((k) => k !== "id").slice(0, 8).map((k) => <th key={k} className="px-3 py-2">{k}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-border/60">
              {Object.keys(rows[0]).filter((k) => k !== "id").slice(0, 8).map((k) => (
                <td key={k} className="px-3 py-2 align-top max-w-[18rem] truncate">{String(r[k] ?? "")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============== EVENTS PANEL ============== */
function EventsPanel() {
  const [rows, setRows] = useState<any[] | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", location: "", starts_at: "", cover_url: "" });

  async function load() {
    const { data } = await (supabase as any).from("events").select("*").order("starts_at", { ascending: true });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.title || !form.starts_at) return alert("Title and date required");
    const { error } = await (supabase as any).from("events").insert({
      title: form.title, description: form.description || null, location: form.location || null,
      starts_at: new Date(form.starts_at).toISOString(), cover_url: form.cover_url || null,
    });
    if (error) return alert(error.message);
    setAdding(false); setForm({ title: "", description: "", location: "", starts_at: "", cover_url: "" });
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete this event?")) return;
    await (supabase as any).from("events").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button onClick={() => setAdding((v) => !v)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> {adding ? "Cancel" : "New event"}
        </button>
      </div>
      {adding && (
        <div className="rounded-3xl glass p-6 space-y-3">
          <input placeholder="Event title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
          <textarea placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
            <input type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
          </div>
          <CloudinaryUpload value={form.cover_url} onChange={(url) => setForm({ ...form, cover_url: url })} folder="events" label="Upload cover image" />
          <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Save className="h-4 w-4" /> Save event
          </button>
        </div>
      )}
      {rows === null ? <Loader /> : rows.length === 0 ? <Empty msg="No events yet." /> : (
        <div className="grid gap-3">
          {rows.map((e: any) => (
            <div key={e.id} className="rounded-2xl glass p-4 flex gap-4 items-center">
              {e.cover_url && <img src={e.cover_url} className="h-20 w-32 object-cover rounded-lg" alt="" />}
              <div className="flex-1">
                <div className="font-semibold">{e.title}</div>
                <div className="text-xs text-muted-foreground">{new Date(e.starts_at).toLocaleString()} · {e.location}</div>
              </div>
              <button onClick={() => del(e.id)} className="rounded-full bg-destructive/10 text-destructive p-2"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============== LIVE PANEL ============== */
function LivePanel() {
  const [s, setS] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (supabase as any).from("live_settings").select("*").eq("id", "main").maybeSingle()
      .then(({ data }: any) => setS(data ?? { id: "main", is_live: false, youtube_url: "", upcoming_at: "", upcoming_title: "", message: "" }));
  }, []);

  async function save() {
    setSaving(true); setMsg(null);
    const payload = {
      id: "main",
      is_live: !!s.is_live,
      youtube_url: s.youtube_url || null,
      upcoming_at: s.upcoming_at ? new Date(s.upcoming_at).toISOString() : null,
      upcoming_title: s.upcoming_title || null,
      message: s.message || null,
    };
    const { error } = await (supabase as any).from("live_settings").upsert(payload);
    setSaving(false);
    setMsg(error ? error.message : "Saved.");
  }

  if (!s) return <Loader />;
  const upcomingLocal = s.upcoming_at ? new Date(s.upcoming_at).toISOString().slice(0, 16) : "";
  return (
    <div className="rounded-3xl glass p-6 space-y-4 max-w-2xl">
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" checked={!!s.is_live} onChange={(e) => setS({ ...s, is_live: e.target.checked })} className="h-5 w-5" />
        <span className="font-semibold">Live now — show stream on /live</span>
      </label>
      <div>
        <label className="text-xs uppercase text-muted-foreground">YouTube URL (live or video)</label>
        <input value={s.youtube_url ?? ""} onChange={(e) => setS({ ...s, youtube_url: e.target.value })} placeholder="https://youtube.com/watch?v=..." className="mt-1 w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs uppercase text-muted-foreground">Upcoming title</label>
          <input value={s.upcoming_title ?? ""} onChange={(e) => setS({ ...s, upcoming_title: e.target.value })} placeholder="Sunday Service" className="mt-1 w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
        </div>
        <div>
          <label className="text-xs uppercase text-muted-foreground">Upcoming start time</label>
          <input type="datetime-local" value={upcomingLocal} onChange={(e) => setS({ ...s, upcoming_at: e.target.value })} className="mt-1 w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
        </div>
      </div>
      <div>
        <label className="text-xs uppercase text-muted-foreground">Message shown to viewers</label>
        <textarea value={s.message ?? ""} onChange={(e) => setS({ ...s, message: e.target.value })} rows={2} className="mt-1 w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
      </div>
      <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save settings
      </button>
      {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
    </div>
  );
}

/* ============== GALLERY PANEL ============== */
function GalleryPanel() {
  const [section, setSection] = useState<"school" | "church" | "company">("school");
  const [items, setItems] = useState<any[] | null>(null);
  const [form, setForm] = useState({ url: "", kind: "image" as "image" | "video", title: "", caption: "" });
  const [adding, setAdding] = useState(false);

  async function load() {
    const { data } = await (supabase as any).from("gallery_items").select("*").eq("section", section).order("created_at", { ascending: false });
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, [section]);

  async function add() {
    if (!form.url) return alert("Upload a file first");
    const { error } = await (supabase as any).from("gallery_items").insert({
      section, kind: form.kind, url: form.url, title: form.title || null, caption: form.caption || null,
    });
    if (error) return alert(error.message);
    setForm({ url: "", kind: "image", title: "", caption: "" }); setAdding(false);
    load();
  }
  async function del(id: string) {
    if (!confirm("Delete this item?")) return;
    await (supabase as any).from("gallery_items").delete().eq("id", id);
    load();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <div className="flex gap-2">
          {(["school", "church", "company"] as const).map((s) => (
            <button key={s} onClick={() => setSection(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border ${section === s ? "bg-primary text-primary-foreground border-primary" : "glass border-border"}`}>
              {s === "school" ? "School" : s === "church" ? "Church" : "Company"}
            </button>
          ))}
        </div>
        <button onClick={() => setAdding((v) => !v)} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus className="h-4 w-4" /> {adding ? "Cancel" : "Add media"}
        </button>
      </div>

      {adding && (
        <div className="rounded-3xl glass p-6 space-y-3">
          <div className="flex gap-2">
            {(["image", "video"] as const).map((k) => (
              <button key={k} onClick={() => setForm({ ...form, kind: k, url: "" })}
                className={`rounded-full px-4 py-2 text-xs font-semibold border ${form.kind === k ? "bg-primary text-primary-foreground border-primary" : "glass border-border"}`}>
                {k}
              </button>
            ))}
          </div>
          <CloudinaryUpload
            value={form.url}
            onChange={(url) => setForm({ ...form, url })}
            folder={`gallery/${section}`}
            accept={form.kind === "video" ? "video/*" : "image/*"}
            resourceType={form.kind}
            label={`Upload ${form.kind}`}
          />
          <input placeholder="Title (optional)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
          <input placeholder="Caption (optional)" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="w-full rounded-xl bg-input border border-border px-4 py-3 text-sm" />
          <button onClick={add} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            <Save className="h-4 w-4" /> Add to gallery
          </button>
        </div>
      )}

      {items === null ? <Loader /> : items.length === 0 ? <Empty msg="Gallery is empty." /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((it: any) => (
            <div key={it.id} className="relative rounded-2xl overflow-hidden glass group">
              {it.kind === "video" ? (
                <video src={it.url} controls className="w-full aspect-video bg-black object-cover" />
              ) : (
                <img src={it.url} className="w-full aspect-[4/3] object-cover" alt="" />
              )}
              <div className="p-3">
                <div className="font-semibold text-sm">{it.title ?? "—"}</div>
                {it.caption && <div className="text-xs text-muted-foreground">{it.caption}</div>}
              </div>
              <button onClick={() => del(it.id)} className="absolute top-2 right-2 rounded-full bg-black/70 text-white p-1.5">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Loader() { return <div className="py-12 text-center"><Loader2 className="h-5 w-5 animate-spin mx-auto" /></div>; }
function Empty({ msg }: { msg: string }) { return <div className="rounded-3xl glass p-10 text-center text-muted-foreground">{msg}</div>; }
