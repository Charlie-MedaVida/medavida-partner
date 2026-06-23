export function money(s?: string | number): string {
  const n = Number(s ?? 0);
  if (Math.abs(n) >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (Math.abs(n) >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

// Serializer rates are fractions (e.g. "0.0221" → 2.21%).
export function pct(s?: string | number): string {
  return `${(Number(s ?? 0) * 100).toFixed(2)}%`;
}

export function num(n?: number): string {
  return (n ?? 0).toLocaleString();
}

export function bps(b?: number): string {
  return `${((b ?? 0) / 100).toFixed(2)}%`;
}
