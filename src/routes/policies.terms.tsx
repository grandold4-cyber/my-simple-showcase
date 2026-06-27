import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import hero from "@/assets/hero-worship.jpg";

export const Route = createFileRoute("/policies/terms")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Terms & Conditions — 54 Global Afrikan" },
      { name: "description", content: "Terms governing the use of 54 Global Afrikan, Praise Church International and Halel School Nairobi digital platforms." },
    ],
    links: [{ rel: "canonical", href: "/policies/terms" }],
  }),
});

function Page() {
  return (
    <Layout>
      <PageHero eyebrow="Legal" title="Terms &" accent="Conditions." subtitle="The rules that govern your use of this site." image={hero} />
      <article className="mx-auto max-w-3xl px-6 py-16 prose prose-slate">
        <h2>1. Acceptance</h2>
        <p>By using 54globalafrikan.org you agree to these terms. If you do not agree, please discontinue use.</p>
        <h2>2. Use of content</h2>
        <p>All text, imagery, sermons and learning materials are owned by 54 Global Afrikan or its sub-brands. Personal, non-commercial use is permitted with attribution.</p>
        <h2>3. Donations</h2>
        <p>Donations are voluntary and non-refundable except where required by law or in cases of demonstrable error. We reserve the right to redirect designated gifts to the area of greatest need if a designation is over-funded.</p>
        <h2>4. Admissions</h2>
        <p>Submitting an admissions form is an expression of interest only and does not constitute enrolment. Final admission is at the discretion of the Halel School leadership and subject to capacity, interview and policy compliance.</p>
        <h2>5. User conduct</h2>
        <p>You agree not to misuse the site, submit unlawful content, or attempt to gain unauthorised access to admin or payment systems.</p>
        <h2>6. Limitation of liability</h2>
        <p>The site is provided "as is" without warranty. To the maximum extent permitted by law we are not liable for indirect or consequential loss arising from its use.</p>
        <h2>7. Governing law</h2>
        <p>These terms are governed by the laws of Kenya.</p>
        <h2>8. Contact</h2>
        <p>legal@54globalafrikan.org · Nairobi, Kenya.</p>
      </article>
    </Layout>
  );
}
