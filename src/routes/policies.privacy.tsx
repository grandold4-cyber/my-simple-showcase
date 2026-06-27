import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/community.jpg";

export const Route = createFileRoute("/policies/privacy")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Privacy Policy — 54 Global Afrikan" },
      { name: "description", content: "How 54 Global Afrikan, Praise Church International and Halel School Nairobi collect, use and protect personal data." },
    ],
    links: [{ rel: "canonical", href: "/policies/privacy" }],
  }),
});

function Page() {
  return (
    <Layout>
      <PageHero eyebrow="Privacy" title="Privacy" accent="Policy." subtitle="How we handle your information." image={hero} />
      <article className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
        <p>This policy is maintained by 54 Global Afrikan and applies to praisechurch and halelschool sections of this site.</p>

        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you submit (name, email, phone) via forms.</li>
          <li>School admissions information you choose to share about your child.</li>
          <li>Donation information (amount, designation, method, optional message).</li>
          <li>Basic anonymous analytics about how the site is used.</li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to inquiries, admissions and prayer requests.</li>
          <li>To process and acknowledge donations and partnerships.</li>
          <li>To send ministry, school and community updates if you opt in.</li>
        </ul>

        <h2>How we protect it</h2>
        <p>Data is stored in secure managed databases with access restricted to authorised staff. Child information is handled in line with the Children Act of Kenya and our Child Protection Policy.</p>

        <h2>Sharing</h2>
        <p>We do not sell or rent personal data. We share information only with payment processors and providers necessary to deliver the service you requested, and where required by law.</p>

        <h2>Your rights</h2>
        <p>You may request access, correction or deletion of your data by writing to <strong>privacy@54globalafrikan.org</strong>.</p>

        <h2>Contact</h2>
        <p>Data Protection Officer · privacy@54globalafrikan.org · Nairobi, Kenya.</p>
      </article>
    </Layout>
  );
}
