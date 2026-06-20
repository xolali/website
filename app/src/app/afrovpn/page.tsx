import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { PricingTable } from "@/components/sections/PricingTable";
import { JsonLd } from "@/components/JsonLd";
import { afrovpnFeatures, afrovpnUseCases } from "@/content/products";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AfroVPN — Private, fast, unrestricted internet",
  description:
    "AfroVPN secures your connection, protects your data, and gives you unrestricted access to the open internet. No-logs, 256-bit encryption, built for African networks.",
  path: "/afrovpn",
});

const benefits = [
  "Protect your privacy from your provider, advertisers, and trackers.",
  "Secure your data on public Wi-Fi — passwords, messages, payments.",
  "Reach the open internet without artificial restrictions.",
  "Browse without throttling or bandwidth caps.",
  "Take your protection everywhere, across all your devices.",
];

const protections = [
  "AES-256 encryption on every connection",
  "Secure protocols (WireGuard & OpenVPN)",
  "Automatic kill switch",
  "DNS leak protection",
];

const noLogs = [
  "No browsing history",
  "No tracking of sites you visit",
  "No IP address linked to activity",
  "No selling or sharing your data",
];

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "AfroVPN",
  description:
    "A no-logs VPN built for African networks. AES-256 encryption, 40+ country servers, kill switch, and a 7-day money-back guarantee.",
  brand: { "@type": "Brand", name: siteConfig.name },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "GHS",
    lowPrice: "32",
    highPrice: "70",
    offerCount: 3,
  },
};

export default function AfroVpnPage() {
  return (
    <>
      <JsonLd data={productJsonLd} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_75%_0%,rgba(255,107,53,0.12),transparent)]"
        />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <Eyebrow>AfroVPN</Eyebrow>
              <Badge tone="live">Available now</Badge>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-quartz sm:text-5xl md:text-display-xl">
              Your internet. Private, fast, and yours.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-400">
              AfroVPN secures your connection, protects your data, and gives you unrestricted
              access to the open internet — from anywhere. Built for African networks. Trusted
              across 40+ countries. No logs, ever.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#pricing" size="lg">
                Get AfroVPN
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="#pricing" variant="secondary" size="lg">
                See pricing
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              {["No-logs policy", "256-bit encryption", "7-day money-back guarantee"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-aurora" aria-hidden /> {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Features */}
      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Features</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Everything you need to take back your connection.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {afrovpnFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <Card className="h-full">
                  <f.icon className="h-6 w-6 text-aurora" aria-hidden />
                  <h3 className="mt-4 font-semibold text-quartz">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{f.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section className="border-y border-white/10 bg-slate-900/30">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Why it matters</Eyebrow>
              <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
                More than privacy. Freedom to use the internet on your terms.
              </h2>
            </Reveal>
            <ul className="space-y-4">
              {benefits.map((b, i) => (
                <Reveal key={b} delay={i * 0.04}>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-aurora/15">
                      <Check className="h-4 w-4 text-aurora" aria-hidden />
                    </span>
                    <span className="text-slate-400">{b}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Built for how Africa actually uses the internet.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {afrovpnUseCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 0.04}>
                <Card interactive className="h-full">
                  <h3 className="font-semibold text-quartz">{u.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{u.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Security */}
      <Section className="border-y border-white/10 bg-slate-900/50">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Security &amp; privacy</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Security isn&apos;t a feature of AfroVPN. It&apos;s the whole point.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full">
                <h3 className="font-semibold text-quartz">How we protect you</h3>
                <ul className="mt-4 space-y-3">
                  {protections.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-slate-400">
                      <Check className="h-4 w-4 shrink-0 text-success" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
            <Reveal delay={0.05}>
              <Card className="h-full">
                <h3 className="font-semibold text-quartz">Our no-logs promise</h3>
                <ul className="mt-4 space-y-3">
                  {noLogs.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-slate-400">
                      <X className="h-4 w-4 shrink-0 text-error" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </div>
          <blockquote className="mx-auto mt-12 max-w-2xl border-l-2 border-aurora pl-5 text-center font-display text-xl italic text-quartz">
            A VPN that logs your activity isn&apos;t protecting your privacy. It&apos;s
            collecting it. We don&apos;t.
          </blockquote>
        </Container>
      </Section>

      {/* Pricing */}
      <Section id="pricing">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Pricing</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Simple, honest pricing. Cancel anytime.
            </h2>
            <p className="mt-4 text-slate-400">
              One plan, every feature. The longer you commit, the more you save. No hidden
              fees, no surprise renewals.
            </p>
          </Reveal>
          <PricingTable />
        </Container>
      </Section>

      <CTASection
        title="Take back your connection today."
        body="Get AfroVPN in minutes. Install the app, tap connect, and you're protected. Backed by a 7-day money-back guarantee — so there's nothing to lose."
        primary={{ label: "Get AfroVPN", href: "#pricing" }}
        secondary={{ label: "Read the FAQ", href: "/faq" }}
        reassurance="7-day money-back guarantee · Cancel anytime · Secured by Paystack"
      />
    </>
  );
}
