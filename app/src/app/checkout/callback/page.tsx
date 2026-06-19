import { Suspense } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Container, Section } from "@/components/ui/primitives";
import { CallbackClient } from "./CallbackClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Payment confirmation",
  description: "Confirming your AfroVPN subscription.",
  path: "/checkout/callback",
  noIndex: true,
});

export default function CheckoutCallbackPage() {
  return (
    <>
      <PageHero eyebrow="Checkout" title="Payment confirmation" />
      <Section>
        <Container>
          <Suspense fallback={<p className="text-slate-400">Confirming your payment…</p>}>
            <CallbackClient />
          </Suspense>
        </Container>
      </Section>
    </>
  );
}
