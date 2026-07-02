import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/site/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  beforeLoad: async () => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" });
  },
  head: () => ({
    meta: [
      { title: "Admin sign in — 54 Global Afrikan" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const fn = mode === "signin"
      ? supabase.auth.signInWithPassword({ email, password })
      : supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    const { data, error } = await fn;
    if (error) { setLoading(false); setError(error.message); return; }

    // Enforce admin-only access — any non-admin is signed out immediately.
    const userId = data.user?.id ?? (await supabase.auth.getUser()).data.user?.id;
    if (!userId) { setLoading(false); setError("Sign-in failed. Please try again."); return; }
    const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", userId);
    const isAdmin = !!roles?.some((r) => r.role === "admin");
    if (!isAdmin) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("Access denied. This account does not have admin privileges.");
      return;
    }
    window.location.href = "/admin";
  }

  return (
    <Layout>
      <section className="pt-40 pb-24">
        <div className="mx-auto max-w-md px-6">
          <div className="rounded-3xl glass p-8">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-primary" />
              <h1 className="font-display text-3xl font-bold">Admin {mode === "signin" ? "sign in" : "register"}</h1>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Restricted area. New accounts must be granted the <code>admin</code> role before they can access the dashboard.
            </p>
            <form onSubmit={onSubmit} className="mt-6 grid gap-3">
              <input name="email" type="email" required placeholder="email@54globalafrikan.org" className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
              <input name="password" type="password" required minLength={6} placeholder="Password" className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground glow-spirit disabled:opacity-60">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
              <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-xs text-primary">
                {mode === "signin" ? "Need an account? Register" : "Have an account? Sign in"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
