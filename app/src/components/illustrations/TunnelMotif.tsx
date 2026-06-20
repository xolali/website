import { cn } from "@/lib/utils";

/**
 * TunnelMotif — a phone connected through an encrypted tunnel to the open
 * internet (node cloud). Used on the AfroVPN hero. Decorative, on-brand.
 */
export function TunnelMotif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      role="img"
      aria-label="A phone connected through an encrypted tunnel to the open internet"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id="tm-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tm-tunnel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F5C842" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect width="480" height="420" fill="url(#tm-glow)" />

      {/* phone */}
      <g>
        <rect x="46" y="120" width="96" height="180" rx="16" fill="#111827" stroke="#FF6B35" strokeWidth="2" />
        <rect x="58" y="138" width="72" height="120" rx="6" fill="#0A0F1E" />
        <circle cx="94" cy="278" r="7" fill="#FF6B35" />
        {/* shield on screen */}
        <path d="M94 158 l22 9 v16 c0 16 -10 28 -22 33 c-12 -5 -22 -17 -22 -33 v-16 z" fill="#FF6B35" fillOpacity="0.25" stroke="#FF6B35" strokeWidth="2" />
        <path d="M85 186 l6 7 l12 -14" stroke="#FF6B35" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* encrypted tunnel (hexagon segments) */}
      <g stroke="url(#tm-tunnel)" strokeWidth="2.5" fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${168 + i * 40} 168 l20 12 v40 l-20 12 l-20 -12 v-40 z`}
            className={i % 2 === 0 ? "ds-node-pulse" : undefined}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </g>

      {/* open-internet node cloud */}
      <g>
        <line x1="350" y1="200" x2="410" y2="140" stroke="#FF6B35" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="350" y1="200" x2="430" y2="230" stroke="#FF6B35" strokeOpacity="0.3" strokeWidth="1.5" />
        <line x1="350" y1="200" x2="400" y2="300" stroke="#FF6B35" strokeOpacity="0.3" strokeWidth="1.5" />
        <circle cx="350" cy="200" r="10" fill="#FF6B35" />
        <circle cx="410" cy="140" r="6" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2" />
        <circle cx="430" cy="230" r="5" fill="#0A0F1E" stroke="#F5C842" strokeWidth="2" />
        <circle cx="400" cy="300" r="7" fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2" />
      </g>
    </svg>
  );
}
