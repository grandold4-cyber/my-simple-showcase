import { createFileRoute } from "@tanstack/react-router";
import { Users, HandHeart, Sparkles, BookOpen, Globe2, HeartHandshake } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import img from "@/assets/community.jpg";

export const Route = createFileRoute("/community")({
  component: CommunityPage,
  head: () => ({
    meta: [
      { title: "Community & Leadership — 54 Global Afrikan" },
      { name: "description", content: "Empowerment, mentorship and transformation programs raising the next generation of African leaders." },
    ],
    links: [{ rel: "canonical", href: "/community" }],
  }),
});

function CommunityPage() {
  const programs = [
    { Icon: Users, t: "Youth Leadership Academy", d: "12-week immersive for emerging African leaders." },
    { Icon: HandHeart, t: "Community Outreach", d: "Feeding, clothing and rebuilding lives across Nairobi." },
    { Icon: BookOpen, t: "Mentorship Circles", d: "Peer-to-peer formation rooted in scripture and excellence." },
    { Icon: HeartHandshake, t: "Marriage & Family", d: "Strong families, generational legacies." },
    { Icon: Sparkles, t: "Women of Impact", d: "Equipping women to lead in every sphere." },
    { Icon: Globe2, t: "Marketplace Leaders", d: "Faith-driven leadership in business & policy." },
  ];
  return (
    <Layout>
      <PageHero
        eyebrow="Community & Leadership"
        title="Transforming communities,"
        accent="raising leaders."
        subtitle="From mentorship circles to community outreach, our programs equip people to lead with integrity, courage and faith."
        image={img}
      />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <div className="group relative h-full rounded-3xl glass p-7 hover:ring-gold transition">
                <div className="h-12 w-12 grid place-items-center rounded-2xl bg-primary/10 text-primary glow-gold">
                  <p.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
