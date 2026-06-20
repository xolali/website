import Link from "next/link";
import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora focus-visible:ring-offset-2 focus-visible:ring-offset-midnight disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-aurora text-white hover:bg-aurora-600 shadow-sm hover:shadow-aurora",
  secondary:
    "border border-slate-400/40 text-quartz hover:border-aurora hover:text-aurora bg-transparent",
  ghost: "text-quartz hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base min-h-[52px]",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, className, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      const isExternal = href.startsWith("http");
      if (isExternal) {
        return (
          <a href={href} className={classes} target="_blank" rel="noreferrer">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
