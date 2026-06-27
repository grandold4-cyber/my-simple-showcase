import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Smartphone, Building2, CreditCard, Globe, Check, Loader2 } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/donate")({
  component: DonatePage,
  head: () => ({
    meta: [
      { title: "Donate — 54 Global Afrikan | Praise Church & Halel School" },
      { name: "description", content: "Give to 54 Global Afrikan. Your gift sponsors a child at Halel School, plants a church, and raises African leaders. M-Pesa, card, bank transfer & PayPal." },
      { property: "og:title", content: "Donate — 54 Global Afrikan" },
      { property: "og:description", content: "Sponsor a child, plant a church, raise a leader. Give securely via M-Pesa, card, bank transfer or PayPal." },
      { property: "og:image", content: "/og-donate.jpg" },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
});

const schema = z.object({
  donor_name: z.string().trim().min(2).max(120),
  donor_email: z.string().trim().email().max(200),
  donor_phone: z.string().trim().max(40).optional().or(z.literal("")),
  amount: z.coerce.number().positive().max(10_000_000),
  currency: z.enum(["KES", "USD", "EUR", "GBP"]),
  designation: z.enum(["general", "church", "school", "scholarship", "community"]),
  method: z.enum(["mpesa", "card", "bank", "paypal"]),
  frequency: z.enum(["one-time", "monthly"]),
  message: z.string().max(500).optional().or(z.literal("")),
});

const presets = [500, 1000, 2500, 5000, 10000];

function DonatePage() {
  const [amount, setAmount] = useState<number>(2500);
  const [method, setMethod] = useState<"mpesa" | "card" | "bank" | "paypal">("mpesa");
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      donor_name: fd.get("donor_name"),
      donor_email: fd.get("donor_email"),
      donor_phone: fd.get("donor_phone"),
      amount: fd.get("amount"),
      currency: fd.get("currency"),
      designation: fd.get("designation"),
      method: fd.get("method"),
      frequency: fd.get("frequency"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setStatus("saving");
    const { error } = await supabase.from("donations").insert({
      ...parsed.data,
      donor_phone: parsed.data.donor_phone || null,
      message: parsed.data.message || null,
      status: "pledged",
    });
    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }
    setStatus("ok");
  }

  return (
    <Layout>
      <PageHero
        eyebrow="Give · Sow · Transform"
        title="Your gift"
        accent="changes generations."
        subtitle="Every shilling you give sponsors a child at Halel School, supports gospel work at Praise Church International, and equips the next wave of African leaders."
        image={hero}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-3 gap-4">
          {[
            { v: "A meal", l: "feeds a child for a school day" },
            { v: "Learning kit", l: "books, pencils and a uniform piece" },
            { v: "Full sponsorship", l: "keeps one child in school for a term" },
          ].map((s) => (
            <Reveal key={s.l}>
              <div className="glass rounded-3xl p-7">
                <div className="font-display text-3xl font-bold text-gradient-spirit">{s.v}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.2fr,1fr] gap-8">
          <Reveal>
            <div className="rounded-3xl glass p-8">
              <h2 className="font-display text-3xl font-bold">Give securely</h2>
              <p className="mt-2 text-muted-foreground">Choose an amount and method. You'll receive a receipt by email.</p>

              {status === "ok" ? (
                <div className="mt-8 rounded-2xl bg-primary/10 p-6 text-center">
                  <Check className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="mt-3 font-display text-2xl font-bold">Thank you!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Your pledge is logged. Use the payment details on the right to complete your gift, or our team will reach out to confirm.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Amount</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {presets.map((p) => (
                        <button key={p} type="button" onClick={() => setAmount(p)}
                          className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${amount === p ? "bg-primary text-primary-foreground border-primary" : "border-border bg-white hover:border-primary"}`}>
                          {p.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-[1fr,auto] gap-2">
                      <input name="amount" type="number" min={1} value={amount} onChange={(e) => setAmount(Number(e.target.value))}
                        className="rounded-xl bg-input border border-border px-4 py-3 text-sm outline-none focus:ring-2 ring-primary/40" />
                      <select name="currency" defaultValue="KES" className="rounded-xl bg-input border border-border px-3 py-3 text-sm">
                        <option>KES</option><option>USD</option><option>EUR</option><option>GBP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Designation</label>
                    <select name="designation" defaultValue="general" className="mt-2 w-full rounded-xl bg-input border border-border px-4 py-3 text-sm">
                      <option value="general">Where most needed</option>
                      <option value="church">Praise Church International</option>
                      <option value="school">Halel School Nairobi</option>
                      <option value="scholarship">Child Scholarship Fund</option>
                      <option value="community">Community & Leadership</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Method</label>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { v: "mpesa", l: "M-Pesa", Icon: Smartphone },
                        { v: "card", l: "Card", Icon: CreditCard },
                        { v: "bank", l: "Bank", Icon: Building2 },
                        { v: "paypal", l: "PayPal", Icon: Globe },
                      ].map((m) => (
                        <button key={m.v} type="button" onClick={() => setMethod(m.v as typeof method)}
                          className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl border text-sm font-semibold transition ${method === m.v ? "bg-primary text-primary-foreground border-primary" : "border-border bg-white hover:border-primary"}`}>
                          <m.Icon className="h-4 w-4" /> {m.l}
                        </button>
                      ))}
                      <input type="hidden" name="method" value={method} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <select name="frequency" defaultValue="one-time" className="rounded-xl bg-input border border-border px-4 py-3 text-sm">
                      <option value="one-time">One-time gift</option>
                      <option value="monthly">Monthly partnership</option>
                    </select>
                    <input name="donor_phone" placeholder="Phone (optional)" className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
                  </div>

                  <input name="donor_name" placeholder="Full name" required className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
                  <input name="donor_email" type="email" placeholder="Email" required className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />
                  <textarea name="message" rows={3} placeholder="Note (optional)" className="rounded-xl bg-input border border-border px-4 py-3 text-sm" />

                  {error && <p className="text-sm text-destructive">{error}</p>}

                  <button disabled={status === "saving"} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground glow-spirit disabled:opacity-60">
                    {status === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4" />}
                    Give {amount ? `KES ${amount.toLocaleString()}` : ""}
                  </button>
                  <p className="text-xs text-muted-foreground">Card & PayPal checkout opens after we confirm your pledge. For instant giving use M-Pesa or bank transfer details on the right.</p>
                </form>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-3xl glass-blue p-8 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">M-Pesa Paybill</p>
                <div className="mt-2 font-display text-3xl font-bold">Paybill: <span className="text-gradient-spirit">400 200</span></div>
                <div className="text-sm text-muted-foreground">Account: <strong>54GA</strong> (or CHURCH / SCHOOL)</div>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">Bank transfer</p>
                <ul className="mt-2 text-sm space-y-1">
                  <li>Bank: Equity Bank, Kenya</li>
                  <li>Account name: 54 Global Afrikan</li>
                  <li>Account no.: <strong>0123 4567 8910</strong></li>
                  <li>Swift: EQBLKENA</li>
                </ul>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-primary">PayPal</p>
                <p className="mt-2 text-sm">give@54globalafrikan.org</p>
              </div>
              <div className="h-px bg-border" />
              <div className="text-xs text-muted-foreground">
                54 Global Afrikan is a registered faith-based organisation. Gifts are used for ministry, education and community work. All donor data is handled per our <a href="/policies/privacy" className="text-primary">privacy policy</a>.
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
