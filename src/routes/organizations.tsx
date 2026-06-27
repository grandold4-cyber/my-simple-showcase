import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Church, GraduationCap, Building2, Plane, HeartHandshake } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/organizations")({
  component: OrganizationsPage,
  head: () => ({
    meta: [
      { title: "Our Organizations — 54 Global Afrikan" },
      { name: "description", content: "Five ministries and businesses under 54 Global Afrikan — Praise Church, Halel School, Sinap Properties, Praise Adventures & Tours, and 54 Global Foundation." },
      { property: "og:title", content: "Our Organizations — 54 Global Afrikan" },
      { property: "og:description", content: "Explore the five subsidiaries that make up the 54 Global Afrikan ecosystem." },
      { property: "og:url", content: "https://global-afrikan-nexus.lovable.app/organizations" },
    ],
    links: [{ rel: "canonical", href: "https://global-afrikan-nexus.lovable.app/organizations" }],
  }),
});

const orgs = [
  { to: "/church", Icon: Church, name: "Praise Church Nairobi", tag: "Faith", tagline: "A Church Transforming Lives Beyond Sunday.", accent: "from-purple-500/30 to-primary/20" },
  { to: "/school", Icon: GraduationCap, name: "Halel School Nairobi", tag: "Education", tagline: "Raising Godly Leaders. Inspiring Academic Excellence.", accent: "from-pink-500/30 to-primary/20" },
  { to: "/properties", Icon: Building2, name: "Sinap Properties", tag: "Real Estate", tagline: "Creating Wealth Through Smart Property Investment.", accent: "from-emerald-500/30 to-primary/20" },
  { to: "/tours", Icon: Plane, name: "Praise Adventures & Tours", tag: "Tourism", tagline: "Discover Kenya. Experience Africa. Travel With Purpose.", accent: "from-orange-500/30 to-accent/20" },
  { to: "/foundation", Icon: HeartHandshake, name: "54 Global Foundation", tag: "Humanitarian", tagline: "Restoring Hope. One Life at a Time.", accent: "from-rose-500/30 to-primary/20" },
] as const;

function OrganizationsPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="One vision · Five organizations"
        title="The 54 Global Afrikan"
        accent="ecosystem."
        subtitle="Faith, education, community transformation, real estate, and tourism — five independent organizations working together under one calling."
        image={hero}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgs.map((o, i) => (
            <Reveal key={o.to} delay={i * 80}>
              <Link to={o.to} className="group relative block h-full overflow-hidden rounded-3xl glass p-8 hover:ring-gold transition">
                <div className={`absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br ${o.accent} blur-3xl`} />
                <div className="relative">
                  <div className="h-12 w-12 grid place-items-center rounded-2xl bg-primary/10 text-primary">
                    <o.Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-5 text-xs uppercase tracking-[0.3em] text-primary">{o.tag}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{o.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.tagline}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Enter site <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
