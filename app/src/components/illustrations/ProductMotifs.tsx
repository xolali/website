import { cn } from "@/lib/utils";

/** PaymentFlow — value tokens moving across nodes (DreamPay). Helios-forward. */
export function PaymentFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      role="img"
      aria-label="Value moving between connected nodes across a border"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id="pf-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#F5C842" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#F5C842" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="420" fill="url(#pf-glow)" />

      {/* dashed border line */}
      <line x1="240" y1="40" x2="240" y2="380" stroke="#F5C842" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="6 8" />

      {/* directional flow */}
      <g stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M110 150 H360" strokeOpacity="0.4" markerEnd="url(#pf-arrow)" />
        <path d="M360 270 H110" strokeOpacity="0.4" markerEnd="url(#pf-arrow)" />
      </g>
      <defs>
        <marker id="pf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" fill="#FF6B35" />
        </marker>
      </defs>

      {/* value tokens */}
      <g>
        <circle cx="200" cy="150" r="10" fill="#F5C842" className="ds-node-pulse" />
        <circle cx="290" cy="270" r="8" fill="#FF6B35" className="ds-node-pulse" style={{ animationDelay: "0.6s" }} />
      </g>

      {/* nodes */}
      <Endpoint x={110} y={150} />
      <Endpoint x={360} y={150} />
      <Endpoint x={110} y={270} />
      <Endpoint x={360} y={270} />
    </svg>
  );
}

/** AssetLattice — hexagonal node lattice with growth lines (DreamAssets). */
export function AssetLattice({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 420"
      fill="none"
      role="img"
      aria-label="A lattice of hexagonal nodes with upward growth lines"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <radialGradient id="al-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FF6B35" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="420" fill="url(#al-glow)" />

      {/* growth line */}
      <path d="M70 340 L180 250 L260 290 L410 110" stroke="#FF6B35" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M390 110 l20 0 l0 20" stroke="#FF6B35" strokeOpacity="0.5" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* hexagon lattice */}
      {[
        { x: 150, y: 180, r: 34, c: "#FF6B35", pulse: true },
        { x: 230, y: 230, r: 26, c: "#F5C842" },
        { x: 300, y: 160, r: 30, c: "#FF6B35" },
        { x: 200, y: 300, r: 22, c: "#F5C842", pulse: true },
        { x: 340, y: 250, r: 24, c: "#FF6B35" },
      ].map((h, i) => (
        <Hex key={i} {...h} />
      ))}
    </svg>
  );
}

function Endpoint({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={9} fill="#0A0F1E" stroke="#FF6B35" strokeWidth="2.5" />;
}

function Hex({
  x,
  y,
  r,
  c,
  pulse = false,
}: {
  x: number;
  y: number;
  r: number;
  c: string;
  pulse?: boolean;
}) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
  return (
    <polygon
      points={pts}
      fill={c}
      fillOpacity="0.12"
      stroke={c}
      strokeWidth="2"
      className={pulse ? "ds-node-pulse" : undefined}
    />
  );
}
