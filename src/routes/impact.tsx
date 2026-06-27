import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/impact")({
  component: ImpactPage,
  head: () => ({
    meta: [
      { title: "Our Impact — 54 Global Afrikan" },
      { name: "description", content: "Lives touched, students enrolled, widows supported and communities transformed — the measurable impact of the 54 Global Afrikan ecosystem." },
      { property: "og:title", content: "Our Impact — 54 Global Afrikan" },
      { property: "og:url", content: "https://global-afrikan-nexus.lovable.app/impact" },
    ],
    links: [{ rel: "canonical", href: "https://global-afrikan-nexus.lovable.app/impact" }],
  }),
});

function ImpactPage() {
  const stats = [
    { v: "12,000+", l: "Lives touched" },
    { v: "350+", l: "Pupils enrolled" },
    { v: "40+", l: "Leaders raised" },
    { v: "15+", l: "Communities reached" },
    { v: "120+", l: "Widows supported" },
    { v: "2,500+", l: "Meals served" },
  ];
  return (
    <Layout>
      <PageHero eyebrow="Our Impact" title="Transformation you can" accent="measure." subtitle="Every service, every classroom, every land sale and every safari plants a seed in the next generation of Africans." image={hero} />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.l} delay={i * 60}>
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="font-display text-5xl font-bold text-gradient-gold">{s.v}</div>
                  <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/foundation" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground glow-spirit">
              Join the mission <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
