/** Format a dex number as a zero-padded label, e.g. 25 → "#0025". */
export function dexLabel(dex: number): string {
  return `#${String(dex).padStart(4, '0')}`
}

/**
 * Convertit une unité brute PokéAPI (décimètres / hectogrammes) en métrique en
 * divisant par 10, puis la formate avec son unité et le séparateur décimal
 * français. Ex. : 17 dm → "1,7 m", 905 hg → "90,5 kg", 20 dm → "2 m".
 */
export function metric(raw: number, unit: string): string {
  const value = raw / 10
  const text = Number.isInteger(value) ? String(value) : value.toFixed(1)
  return `${text.replace('.', ',')} ${unit}`
}
