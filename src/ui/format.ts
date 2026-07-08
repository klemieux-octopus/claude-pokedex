/** Format a dex number as a zero-padded label, e.g. 25 → "#0025". */
export function dexLabel(dex: number): string {
  return `#${String(dex).padStart(4, '0')}`
}
