/**
 * Lightweight className combiner. Avoids extra dependencies (clsx/cva)
 * while supporting conditional classes.
 */
export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) out.push(inner);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
