import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  interactive = false,
  highlighted = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-slate-800/40 p-6 transition-all duration-200",
        "border-white/10",
        interactive && "hover:-translate-y-0.5 hover:border-white/20 hover:shadow-md",
        highlighted && "border-aurora/50 shadow-aurora",
        className,
      )}
    >
      {children}
    </div>
  );
}
