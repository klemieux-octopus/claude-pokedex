// Canonical Pokémon type colours, used for type badges. The full "Pokédex
// Device" visual identity (light/dark tokens, etc.) is ticket #17; this is the
// minimum needed to render coloured type badges in the list.
export const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

export function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? '#777'
}

// Luminance relative (WCAG) d'une couleur hex #RRGGBB, dans [0, 1].
function relativeLuminance(hex: string): number {
  const n = parseInt(hex.replace('#', ''), 16)
  const channel = (c: number) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  const r = channel((n >> 16) & 255)
  const g = channel((n >> 8) & 255)
  const b = channel(n & 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Couleur de texte lisible sur un badge de type : encre foncée sur les types
 * clairs (électrik, glace, acier, sol, insecte, plante…), blanc sur les foncés.
 * Évite le texte blanc illisible sur les badges pâles.
 */
export function typeTextColor(type: string): string {
  return relativeLuminance(typeColor(type)) > 0.42 ? '#1b1205' : '#ffffff'
}
