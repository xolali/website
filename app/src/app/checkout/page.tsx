import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/primitives";
import { CheckoutClient } from "./CheckoutClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Checkout",
  description: "Subscribe to AfroVPN. Secure payment processed by Paystack.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Checkout"
        title="Subscribe to AfroVPN"
        description="Enter your email to continue to secure payment, processed by Paystack."
      />
      <Section>
        <Container>
          <Suspense fallback={<p className="text-slate-400">Loading…</p>}>
            <CheckoutClient />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
