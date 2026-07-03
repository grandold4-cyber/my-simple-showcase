import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Crown, Sparkles, Check, ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/partnership")({
  component: PartnershipPage,
  head: () => ({
    meta: [
      { title: "Partnership — 54 Global Afrikan | Ministry, School & Leadership" },
      { name: "description", content: "Partner with 54 Global Afrikan. Monthly partners fuel Praise Church International, Halel School Nairobi and our leadership programs across Africa." },
      { property: "og:title", content: "Become a Partner — 54 Global Afrikan" },
      { property: "og:description", content: "Stand with us in ministry, education and leadership. Choose a partnership tier and transform a generation." },
    ],
    links: [{ rel: "canonical", href: "/partnership" }],
  }),
});

const tiers = [
  { name: "Friend", amount: "$10 / mo", Icon: Sparkles, perks: ["Monthly devotional", "Prayer updates", "Impact report"] },
  { name: "Sower", amount: "$40 / mo", Icon: HandHeart, perks: ["All Friend benefits", "Sponsor 1 child meal/month", "Invitations to partner gatherings"], highlight: true },
  { name: "Pillar", amount: "$200 / mo", Icon: Crown, perks: ["All Sower benefits", "Full child scholarship", "Quarterly call with leadership", "Named recognition"] },
];

function PartnershipPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="Partnership"
        title="Stand with us."
        accent="Shape a continent."
        subtitle="A 54 Global Afrikan partner gives monthly to sustain ministry at Praise Church International, education at Halel School, and leadership formation across Africa."
        image={hero}
      />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className={`relative h-full rounded-3xl p-8 ${t.highlight ? "bg-primary text-primary-foreground glow-spirit" : "glass"}`}>
                {t.highlight && <div className="absolute -top-3 left-8 text-[10px] uppercase tracking-[0.3em] bg-accent text-accent-foreground px-3 py-1 rounded-full">Most loved</div>}
                <t.Icon className={`h-7 w-7 ${t.highlight ? "" : "text-primary"}`} />
                <h3 className="mt-4 font-display text-2xl font-bold">{t.name}</h3>
                <p className={`mt-1 text-sm ${t.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{t.amount}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-2"><Check className="h-4 w-4 mt-0.5 shrink-0" /> {p}</li>
                  ))}
                </ul>
                <Link to="/donate" className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${t.highlight ? "bg-white text-primary" : "bg-primary text-primary-foreground"}`}>
                  Become a {t.name} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="rounded-3xl glass-blue p-10 text-center">
              <h3 className="font-display text-3xl font-bold">Corporate & church partnerships</h3>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                We welcome businesses, ministries and foundations to walk alongside us through CSR, mission grants, child sponsorship cohorts and infrastructure giving.
              </p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-spirit">
                Talk to our partnership team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
