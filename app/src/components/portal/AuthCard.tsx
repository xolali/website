import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";
import { Logo } from "@/components/layout/Logo";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="flex min-h-[80vh] items-center bg-gradient-to-b from-slate-900/40 to-midnight py-16">
      <Container>
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-800/40 p-6 sm:p-8">
            <h1 className="font-display text-2xl font-bold text-quartz">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
          {footer && <p className="mt-6 text-center text-sm text-slate-400">{footer}</p>}
        </div>
      </Container>
    </section>
  );
}
