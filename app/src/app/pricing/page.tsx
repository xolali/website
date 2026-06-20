import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/primitives";
import { PricingTable } from "@/components/sections/PricingTable";
import { Accordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Simple, honest AfroVPN pricing. One plan, every feature. Monthly, annual, or 2-year. Cancel anytime, backed by a 7-day money-back guarantee.",
  path: "/pricing",
});

const pricingFaqs = [
  {
    id: "cancel-anytime",
    question: "Can I cancel anytime?",
    answer:
      "Yes. There are no lock-ins beyond your chosen billing period. Cancel from your account dashboard and you won't be charged again.",
  },
  {
    id: "auto-charge",
    question: "Will I be charged automatically?",
    answer:
      "Your plan renews at the end of each period so your protection never lapses. We email you before every renewal, and you can turn off auto-renewal anytime.",
  },
  {
    id: "methods",
    question: "What payment methods do you accept?",
    answer:
      "Cards (Visa, Mastercard, Verve) and supported local payment methods, all processed securely via Paystack.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple, honest pricing. Cancel anytime."
        description="One plan, every feature. The longer you commit, the more you save. No hidden fees, no surprise renewals you didn't agree to."
      />
      <Section>
        <Container>
          <PricingTable />
        </Container>
      </Section>
      <Section className="border-t border-white/10">
        <Container>
          <h2 className="font-display text-2xl font-bold text-quartz">Pricing questions</h2>
          <Accordion items={pricingFaqs} className="mt-6 max-w-2xl" />
        </Container>
      </Section>
      <CTASection
        title="Ready to get started?"
        body="Protect your connection in minutes, backed by a 7-day money-back guarantee."
        primary={{ label: "Get AfroVPN", href: "/afrovpn#pricing" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
      />
    </>
  );
}
