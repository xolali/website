import { ComingSoonProduct } from "@/components/sections/ComingSoonProduct";
import { PaymentFlow } from "@/components/illustrations/ProductMotifs";
import { dreampayCapabilities } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "DreamPay — Payments infrastructure for Africa (Coming soon)",
  description:
    "DreamPay is payments infrastructure built for Africa — send, receive, and accept money across borders without the friction, delay, or hidden cost. Join the waitlist.",
  path: "/dreampay",
});

export default function DreamPayPage() {
  return (
    <ComingSoonProduct
      name="DreamPay"
      productKey="dreampay"
      title="Money that moves the way you do."
      description="Payments infrastructure built for Africa — send, receive, and accept money across borders without the friction, delay, or hidden cost. Built on a foundation of trust and compliance from day one."
      problems={[
        "Cross-border payments still pass through chains of intermediaries.",
        "Money arrives days later, and smaller than it was sent.",
        "The rails were never designed for movement within Africa.",
      ]}
      capabilities={dreampayCapabilities}
      visual={<PaymentFlow className="mx-auto max-w-[480px]" />}
    />
  );
}
