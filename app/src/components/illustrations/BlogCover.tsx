import { cn } from "@/lib/utils";

/**
 * BlogCover — a deterministic geometric cover keyed off the post category, so
 * the blog feels like one publication without needing photography. 16:9.
 */
export function BlogCover({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const variant = category.toLowerCase();
  return (
    <svg
      viewBox="0 0 480 270"
      role="img"
      aria-label={`${category} article cover`}
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id={`bc-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#111827" />
          <stop offset="100%" stopColor="#0A0F1E" />
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill={`url(#bc-${variant})`} />

      {variant.includes("privacy") ? (
        <g>
          <path d="M240 70 l46 18 v34 c0 34 -22 58 -46 68 c-24 -10 -46 -34 -46 -68 V88 z" fill="#FF6B35" fillOpacity="0.15" stroke="#FF6B35" strokeWidth="2.5" />
          <path d="M222 138 l12 13 l24 -28" stroke="#FF6B35" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : variant.includes("payment") ? (
        <g stroke="#F5C842" fill="none">
          <line x1="120" y1="135" x2="360" y2="135" strokeWidth="2" strokeDasharray="6 8" strokeOpacity="0.6" />
          <circle cx="120" cy="135" r="12" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2.5" />
          <circle cx="360" cy="135" r="12" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2.5" />
          <circle cx="240" cy="135" r="10" fill="#F5C842" stroke="none" />
        </g>
      ) : (
        // infrastructure / default — mini network
        <g>
          <g stroke="#FF6B35" strokeOpacity="0.3" strokeWidth="1.5">
            <line x1="120" y1="90" x2="220" y2="150" />
            <line x1="220" y1="150" x2="330" y2="100" />
            <line x1="220" y1="150" x2="300" y2="200" />
            <line x1="120" y1="90" x2="170" y2="190" />
            <line x1="170" y1="190" x2="300" y2="200" />
          </g>
          <circle cx="120" cy="90" r="6" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2" />
          <circle cx="330" cy="100" r="6" fill="#0A0F1E" stroke="#F5C842" strokeWidth="2" />
          <circle cx="300" cy="200" r="6" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2" />
          <circle cx="170" cy="190" r="6" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2" />
          <circle cx="220" cy="150" r="11" fill="#FF6B35" />
        </g>
      )}
    </svg>
  );
}
