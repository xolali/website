import { ShieldCheck } from "lucide-react";
import { Container, Section, Eyebrow, Badge } from "@/components/ui/primitives";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { Button } from "@/components/ui/Button";
import type { Feature } from "@/content/products";

export function ComingSoonProduct({
  name,
  productKey,
  title,
  description,
  problems,
  capabilities,
}: {
  name: string;
  productKey: string;
  title: string;
  description: string;
  problems: string[];
  capabilities: Feature[];
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_75%_0%,rgba(245,200,66,0.10),transparent)]"
        />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2">
              <Eyebrow>{name}</Eyebrow>
              <Badge tone="soon">Coming soon</Badge>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-quartz sm:text-5xl md:text-display-xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-400">{description}</p>
            <div className="mt-8">
              <WaitlistForm product={productKey} />
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>The problem</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              The friction is structural — and it&apos;s solvable.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p} delay={i * 0.05}>
                <Card className="h-full">
                  <p className="text-slate-400">{p}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-white/10 bg-slate-900/30">
        <Container>
          <Reveal className="max-w-2xl">
            <Eyebrow>Our approach</Eyebrow>
            <h2 className="font-display text-3xl font-bold text-quartz md:text-4xl">
              What {name} will do.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.04}>
                <Card className="h-full">
                  <c.icon className="h-6 w-6 text-aurora" aria-hidden />
                  <h3 className="mt-4 font-semibold text-quartz">{c.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{c.description}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="rounded-xl border border-white/10 bg-slate-800/40 p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-aurora">
                  <ShieldCheck className="h-5 w-5" aria-hidden />
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    Built on trust
                  </span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold text-quartz">
                  Compliance and security from day one.
                </h2>
                <p className="mt-2 text-slate-400">
                  {name} is being built to meet data-protection and financial-services
                  standards before we have to — not after. Learn how we approach security.
                </p>
              </div>
              <Button href="/about" variant="secondary" size="lg">
                Our approach
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="border-t border-white/10">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl font-bold text-quartz">
              Join the {name} waitlist
            </h2>
            <p className="mt-3 text-slate-400">
              Waitlist members are notified first when early access opens — and help shape the
              product before launch.
            </p>
            <div className="mt-6 flex justify-center">
              <WaitlistForm product={productKey} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
