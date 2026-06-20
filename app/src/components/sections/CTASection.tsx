import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/motion/Reveal";

export function CTASection({
  title,
  body,
  primary,
  secondary,
  reassurance,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  reassurance?: string;
}) {
  return (
    <Section>
      <Container>
        <Reveal className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-800/60 to-slate-900 px-6 py-14 text-center md:px-12 md:py-20">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold text-quartz md:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">{body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={primary.href} size="lg">
              {primary.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
          {reassurance && (
            <p className="mt-6 text-sm text-slate-400">{reassurance}</p>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
