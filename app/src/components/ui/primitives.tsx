import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

/** Constrains content to the site grid and centers it. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

/** Vertical section rhythm wrapper. */
export function Section({
  children,
  className,
  as: Tag = "section",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("py-16 md:py-24", className)}>
      {children}
    </Tag>
  );
}

/** Small uppercase label above a heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-aurora">
      {children}
    </p>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "live" | "soon" | "neutral";
}) {
  const tones = {
    live: "bg-success/15 text-success ring-success/30",
    soon: "bg-helios/15 text-helios ring-helios/30",
    neutral: "bg-white/5 text-slate-400 ring-white/10",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
