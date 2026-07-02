import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { ShieldCheck } from "lucide-react";
import hero from "@/assets/school-hero.jpg";

export const Route = createFileRoute("/policies/child-protection")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Child Protection Policy — Halel School Nairobi & 54 Global Afrikan" },
      { name: "description", content: "Our child protection and safeguarding commitments at Halel School Nairobi, Praise Church International and 54 Global Afrikan." },
    ],
    links: [{ rel: "canonical", href: "/policies/child-protection" }],
  }),
});

function Page() {
  return (
    <Layout>
      <PageHero eyebrow="Safeguarding" title="Child Protection" accent="Policy." subtitle="Every child in our care is safe, valued and heard." image={hero} />
      <article className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
        <p><ShieldCheck className="inline h-5 w-5 text-primary mr-2" /> This policy is maintained by 54 Global Afrikan to describe how Halel School Nairobi, Praise Church International and our community programs protect children.</p>

        <h2>1. Our commitment</h2>
        <p>We believe every child is created in the image of God and is entitled to safety, dignity, education and spiritual nurture. We have zero tolerance for any form of abuse, neglect, exploitation or harm.</p>

        <h2>2. Scope</h2>
        <p>This policy applies to all staff, teachers, pastors, volunteers, interns and partners interacting with children in any 54 Global Afrikan programme or facility.</p>

        <h2>3. Safer recruitment</h2>
        <ul>
          <li>Police clearance and reference checks for every staff and volunteer working with children.</li>
          <li>Mandatory induction on this policy before any contact with children.</li>
          <li>Annual safeguarding refresher training.</li>
        </ul>

        <h2>4. Code of conduct</h2>
        <ul>
          <li>Adults are never alone with a child out of sight of others.</li>
          <li>No private one-to-one digital communication with children.</li>
          <li>Photographs of children require written parental consent.</li>
          <li>Physical contact is appropriate, non-intrusive and never in private.</li>
        </ul>

        <h2>5. Reporting concerns</h2>
        <p>Any concern, disclosure or suspicion of abuse must be reported immediately to the Designated Safeguarding Lead at <strong>rsimiyu7@gmail.com</strong> or <strong>+254 715 297 696</strong>. Concerns are documented, investigated and, where required, referred to the relevant Kenyan authorities.</p>

        <h2>6. Confidentiality</h2>
        <p>Information is shared only with those who need to know, in line with the Children Act of Kenya and applicable data protection law.</p>

        <h2>7. Review</h2>
        <p>This policy is reviewed annually by the 54 Global Afrikan board and the Halel School leadership team.</p>
      </article>
    </Layout>
  );
}
