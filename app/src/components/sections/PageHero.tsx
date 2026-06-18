import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";
import { Eyebrow } from "@/components/ui/primitives";

/** Standard inner-page hero for non-homepage routes. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-midnight py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-quartz md:text-display-lg">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg text-slate-400">{description}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
