import { cn } from "@/lib/utils";

/**
 * NetworkMap — the signature Dreamscape motif.
 * Geometric nodes + orbital arcs + connection lines, with a denser cluster
 * (an abstract African node concentration) emphasised in Aurora. Decorative,
 * theme-matched, dependency-free. Subtle node pulses respect reduced motion
 * via the global rule in globals.css.
 */
export function NetworkMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 460"
      fill="none"
      role="img"
      aria-label="Abstract network of connected nodes representing digital infrastructure"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id="nm-glow" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nm-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#F5C842" />
        </linearGradient>
      </defs>

      <rect width="480" height="460" fill="url(#nm-glow)" />

      {/* connection lines */}
      <g stroke="#FF6B35" strokeOpacity="0.25" strokeWidth="1.5">
        <line x1="90" y1="120" x2="220" y2="80" />
        <line x1="220" y1="80" x2="360" y2="140" />
        <line x1="220" y1="80" x2="240" y2="220" />
        <line x1="90" y1="120" x2="150" y2="250" />
        <line x1="150" y1="250" x2="240" y2="220" />
        <line x1="240" y1="220" x2="360" y2="140" />
        <line x1="240" y1="220" x2="320" y2="320" />
        <line x1="150" y1="250" x2="200" y2="370" />
        <line x1="200" y1="370" x2="320" y2="320" />
        <line x1="360" y1="140" x2="410" y2="250" />
        <line x1="320" y1="320" x2="410" y2="250" />
      </g>

      {/* orbital arcs (from the logo system) */}
      <g stroke="url(#nm-arc)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M60 230 A 180 180 0 0 1 250 60" strokeOpacity="0.45" />
        <path d="M300 410 A 200 200 0 0 0 430 220" strokeOpacity="0.35" />
      </g>

      {/* edge nodes */}
      <g>
        <Node x={90} y={120} r={6} />
        <Node x={360} y={140} r={7} />
        <Node x={410} y={250} r={5} />
        <Node x={200} y={370} r={6} />
        <Node x={320} y={320} r={7} />
      </g>

      {/* emphasised cluster (abstract African concentration) */}
      <g>
        <Node x={220} y={80} r={9} hub />
        <Node x={240} y={220} r={11} hub pulse />
        <Node x={150} y={250} r={8} hub pulse />
      </g>
    </svg>
  );
}

function Node({
  x,
  y,
  r,
  hub = false,
  pulse = false,
}: {
  x: number;
  y: number;
  r: number;
  hub?: boolean;
  pulse?: boolean;
}) {
  return (
    <g>
      {pulse && (
        <circle cx={x} cy={y} r={r + 6} fill="#FF6B35" fillOpacity="0.12" className="ds-node-pulse" />
      )}
      <circle cx={x} cy={y} r={r} fill={hub ? "#FF6B35" : "#0A0F1E"} stroke="#FF6B35" strokeWidth="2" />
      {hub && <circle cx={x} cy={y} r={r - 4} fill="#FFF" fillOpacity="0.2" />}
    </g>
  );
}
