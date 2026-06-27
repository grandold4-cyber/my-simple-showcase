import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import hero from "@/assets/hero-worship.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — 54 Global Afrikan" },
      { name: "description", content: "54 Global Afrikan is a unified ecosystem of faith, education, community transformation, real estate and tourism — raising leaders across Africa." },
      { property: "og:title", content: "About Us — 54 Global Afrikan" },
      { property: "og:description", content: "Who we are, what we believe, and the vision that unites five organizations under one calling." },
      { property: "og:url", content: "https://global-afrikan-nexus.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://global-afrikan-nexus.lovable.app/about" }],
  }),
});

function AboutPage() {
  const values = [
    { t: "Christ at the centre", d: "Every ministry, business and program flows from a Christ-first foundation." },
    { t: "Excellence with integrity", d: "We do ordinary things extraordinarily well, and we do them honestly." },
    { t: "Community transformation", d: "A percentage of every business we run is reinvested into the vulnerable." },
    { t: "Continental vision", d: "Rooted in Nairobi, released to the nations of Africa and beyond." },
  ];
  return (
    <Layout>
      <PageHero eyebrow="About 54 Global Afrikan" title="One vision." accent="Many hands." subtitle="An umbrella organisation weaving together faith, education, humanitarian work, real estate and tourism into a single movement of transformation." image={hero} />
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-10">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Our story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              54 Global Afrikan Incorporated was born out of a conviction that the African continent flourishes when faith, family and enterprise move together. What began as a local church and a school in Nairobi has grown into a family of five organisations — each independent, each excellent, each accountable to a common vision of transformed communities.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To raise Christ-centered leaders, families and communities across Africa through worship, learning, enterprise and compassion.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Vision</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A transformed Africa where every child is educated, every widow supported, every family housed, every visitor welcomed and every heart pointed to Christ.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 60}>
                <div className="glass rounded-2xl p-6 h-full">
                  <h3 className="font-display text-xl font-bold">{v.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
