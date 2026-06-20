import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe2, Layers, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/primitives";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { products } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "African Digital Infrastructure",
  description:
    "Dreamscape Systems builds the digital infrastructure — connectivity, payments, and assets — that lets Africans participate fully in the global digital economy. Start with AfroVPN.",
  path: "/",
});

const features = [
  {
    icon: ShieldCheck,
    title: "Security by default",
    body: "Encryption, privacy, and security aren't features we add — they're the foundation we start from.",
  },
  {
    icon: Globe2,
    title: "African-first, globally connected",
    body: "Designed for African networks and devices, then connected to the rest of the world. Mobile-first and fast.",
  },
  {
    icon: Layers,
    title: "One platform, many products",
    body: "AfroVPN today. DreamPay and DreamAssets next. One account, one standard, one company accountable.",
  },
  {
    icon: Eye,
    title: "Transparent by design",
    body: "Clear pricing. Plain-language policies. A real company with real people. No hidden anything.",
  },
];

const stats = [
  { value: "40+", label: "countries connected" },
  { value: "256-bit", label: "encryption on every connection" },
  { value: "0", label: "activity logs kept" },
  { value: "24/7", label: "support coverage" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgba(255,107,53,0.12),transparent)]"
        />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <Eyebrow>African Digital Infrastructure</Eyebrow>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-quartz sm:text-5xl md:text-display-2xl">
              The infrastructure for Africa&apos;s place in the global economy.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-400">
              Dreamscape Systems builds the digital foundations — connectivity, payments,
              and assets — that let Africans participate fully, securely, and on their own
              terms. We start with private, fast internet. We&apos;re building the rest.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/afrovpn" size="lg">
                Get AfroVPN
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button href="/about" variant="secondary" size="lg">
                Explore our vision
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aurora" /> Trusted in 40+ countries
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aurora" /> No-logs by design
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aurora" /> Secured payments
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <Section>
        <Container>
          <Reveal className="max-w-3xl">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Africa isn&apos;t behind. It&apos;s been building without the foundations.
            </h2>
            <p className="mt-5 text-slate-400">
              The global digital economy runs on infrastructure most people never see — the
              networks that move data, the rails that move money, the systems that hold
              value. For most of the world, that infrastructure is assumed. For Africa,
              it&apos;s been an afterthought. That&apos;s the gap we&apos;re closing.
            </p>
            <blockquote className="mt-8 border-l-2 border-aurora pl-5 font-display text-xl italic text-quartz">
              Our products are the roads. The open internet is the destination.
            </blockquote>
          </Reveal>
        </Container>
      </Section>

      {/* Features */}
      <Section className="border-y border-white/10 bg-slate-900/30">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>What sets us apart</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Built to a standard the world already trusts.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <Card className="h-full">
                  <f.icon className="h-6 w-6 text-aurora" aria-hidden />
                  <h3 className="mt-4 font-semibold text-quartz">{f.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{f.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Platform / products */}
      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>The Dreamscape platform</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Three layers of digital infrastructure. One mission.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Card
                  interactive
                  highlighted={p.status === "Live"}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center justify-between">
                    <p.icon className="h-7 w-7 text-aurora" aria-hidden />
                    <Badge tone={p.status === "Live" ? "live" : "soon"}>{p.status}</Badge>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-quartz">{p.name}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-400">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm text-slate-400">{p.description}</p>
                  <Link
                    href={p.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-aurora hover:gap-2.5 transition-all"
                  >
                    {p.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trust */}
      <Section className="border-y border-white/10 bg-slate-900/30">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Why people trust Dreamscape</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              Trust isn&apos;t a tagline. It&apos;s the product.
            </h2>
            <p className="mt-5 text-slate-400">
              We sell privacy, security, and one day your money. We&apos;ve built the company
              to earn that responsibility — a registered business, a genuine no-logs
              commitment, secure payments, and compliance from the start.
            </p>
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-midnight p-6 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-extrabold text-aurora">
                    {s.value}
                  </span>
                  <span className="mt-1 block text-sm text-slate-400">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CTASection
        title="Start with private internet. Grow with us."
        body="AfroVPN is live today. DreamPay and DreamAssets are next. Get started in minutes and be part of the infrastructure Africa is building for itself."
        primary={{ label: "Get AfroVPN", href: "/afrovpn" }}
        secondary={{ label: "Talk to our team", href: "/contact" }}
        reassurance="Cancel anytime · 7-day money-back guarantee · Secured by Paystack"
      />
    </>
  );
}
