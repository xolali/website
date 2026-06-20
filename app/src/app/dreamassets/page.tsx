import { ComingSoonProduct } from "@/components/sections/ComingSoonProduct";
import { dreamassetsCapabilities } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "DreamAssets — Secure digital assets infrastructure (Coming soon)",
  description:
    "DreamAssets is infrastructure for holding and growing digital value securely and transparently. Participate in the global digital economy without leaving your money exposed. Join the waitlist.",
  path: "/dreamassets",
});

export default function DreamAssetsPage() {
  return (
    <ComingSoonProduct
      name="DreamAssets"
      productKey="dreamassets"
      title="Hold and grow value, securely."
      description="Infrastructure for digital assets, designed to be secure, transparent, and accessible. Participate in the global digital economy without leaving your money exposed."
      problems={[
        "Holding digital value often means exposing it to unnecessary risk.",
        "Access to global asset infrastructure is uneven across Africa.",
        "Transparency and clear risk disclosure are too often missing.",
      ]}
      capabilities={dreamassetsCapabilities}
    />
  );
}
