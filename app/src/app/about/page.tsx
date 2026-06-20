import { PageHero } from "@/components/sections/PageHero";
import { NetworkMap } from "@/components/illustrations/NetworkMap";
import { Container, Section, Eyebrow } from "@/components/ui/primitives";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Dreamscape Systems is an African digital infrastructure company building the connectivity, payments, and asset infrastructure Africa was owed.",
  path: "/about",
});

const values = [
  { title: "Trust is earned, then protected.", body: "We treat the responsibility of protecting privacy, security, and money as sacred — earned through transparency and verifiable claims." },
  { title: "Africa first, world-class always.", body: "We build for African networks and conditions, and hold ourselves to the highest global standards. Both, not either." },
  { title: "Build foundations, not features.", body: "We think in decades. We build infrastructure meant to last and to carry the products that come after it." },
  { title: "Transparency by default.", body: "Clear pricing. Plain-language policies. Real people you can reach. No fine print designed to confuse." },
  { title: "Security is the foundation.", body: "We start from secure and build outward. The safe choice is always the default choice." },
  { title: "We ship.", body: "Vision without execution is just a pitch. We build, release, learn, and improve." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dreamscape Systems"
        title="We're building the digital infrastructure Africa was owed."
        description="Dreamscape Systems is an African digital infrastructure company. We build the foundational systems — connectivity, payments, and assets — that let Africans participate fully in the global digital economy."
        visual={<NetworkMap className="mx-auto max-w-[480px]" />}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
              <h2 className="font-display text-3xl font-bold text-quartz">
                It started with a simple, frustrating observation.
              </h2>
              <div className="mt-5 space-y-4 text-slate-400">
                <p>
                  Africa has the talent, the ambition, and a generation of builders ready to
                  compete with anyone, anywhere. What it hasn&apos;t had is the
                  infrastructure.
                </p>
                <p>
                  When a developer in Lagos ships a product, she stitches together services
                  built for other markets. When an entrepreneur in Accra accepts a payment,
                  it disappears into a chain of intermediaries and returns smaller. These
                  barriers don&apos;t exist because of a shortage of talent. They exist
                  because the infrastructure was never built for Africa.
                </p>
                <p>
                  So we decided to build it. We are not a VPN company. We are a digital
                  infrastructure company — and we&apos;re building for the long term.
                </p>
              </div>
            </Reveal>
            <div className="space-y-6">
              <Reveal>
                <Card>
                  <Eyebrow>Our mission</Eyebrow>
                  <p className="text-lg font-medium text-quartz">
                    To build the digital infrastructure that lets Africans participate fully
                    in the global digital economy.
                  </p>
                </Card>
              </Reveal>
              <Reveal delay={0.05}>
                <Card>
                  <Eyebrow>Our vision</Eyebrow>
                  <p className="text-lg font-medium text-quartz">
                    A future where African builders compete on equal footing — anywhere in
                    the world.
                  </p>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/10 bg-slate-900/30">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>What we stand for</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              The principles behind everything we build.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.04}>
                <Card className="h-full">
                  <h3 className="font-semibold text-quartz">{v.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{v.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <Eyebrow>The company</Eyebrow>
            <h2 className="font-display text-2xl font-bold text-quartz">
              A real company, accountable to the people it serves.
            </h2>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                ["Legal entity", siteConfig.legalName],
                ["Registration", siteConfig.company.registrationNumber],
                ["Headquarters", siteConfig.company.address],
                ["Live product", "AfroVPN"],
                ["In development", "DreamPay, DreamAssets"],
                ["Contact", siteConfig.company.email],
              ].map(([k, v]) => (
                <div key={k} className="bg-midnight p-5">
                  <dt className="text-xs uppercase tracking-wide text-slate-400">{k}</dt>
                  <dd className="mt-1 text-quartz">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title="Build with us."
        body="Whether you want to protect your connection today, partner with us, invest in what we're building, or join the team — we'd like to hear from you."
        primary={{ label: "Get AfroVPN", href: "/afrovpn" }}
        secondary={{ label: "Contact our team", href: "/contact" }}
      />
    </>
  );
}
