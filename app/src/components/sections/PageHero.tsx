import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";
import { Eyebrow } from "@/components/ui/primitives";

/** Standard inner-page hero for non-homepage routes. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  visual,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Optional decorative illustration shown beside the copy on desktop. */
  visual?: ReactNode;
}) {
  return (
    <section className="border-b border-white/10 bg-gradient-to-b from-slate-900 to-midnight py-16 md:py-24">
      <Container>
        <div
          className={
            visual
              ? "grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]"
              : undefined
          }
        >
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-quartz md:text-display-lg">
              {title}
            </h1>
            {description && (
              <p className="mt-5 max-w-xl text-lg text-slate-400">{description}</p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {visual && (
            <div aria-hidden className="relative hidden lg:block">
              {visual}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
