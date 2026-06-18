import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * "Orbit D" brand mark — geometric D with an orbital arc and node dot in Aurora.
 * Inline SVG keeps it crisp, themeable, and zero-request.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Dreamscape Systems — home"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora",
        className,
      )}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        {/* D letterform */}
        <path
          d="M16 14h16c11.046 0 20 8.954 20 20s-8.954 20-20 20H16V14z"
          stroke="currentColor"
          strokeWidth="6"
          className="text-quartz"
          fill="none"
        />
        {/* Orbital arc */}
        <path
          d="M44 12c10 4 16 13 16 22"
          stroke="#FF6B35"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Node dot */}
        <circle cx="52" cy="16" r="4" fill="#FF6B35" />
      </svg>
      {showWordmark && (
        <span className="font-display text-lg font-extrabold uppercase tracking-[0.12em] text-quartz">
          Dreamscape
        </span>
      )}
    </Link>
  );
}
