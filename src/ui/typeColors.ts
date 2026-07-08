// Couleurs de type Pokémon, alignées sur la palette `--type-*` du design system
// (#45 ; voir src/styles/tokens.css et le skill design-system). Valeurs en dur
// ici car elles alimentent des styles inline / la couleur de remplissage des
// StatBar ; elles ne varient pas entre thèmes clair et sombre (types = vifs).
export const TYPE_COLORS: Record<string, string> = {
  normal: '#9199A2',
  fire: '#F0803C',
  water: '#4C90D5',
  electric: '#F3D23B',
  grass: '#63BB5B',
  ice: '#74CEC0',
  fighting: '#CE4265',
  poison: '#AB6AC8',
  ground: '#D97845',
  flying: '#8FA9DE',
  psychic: '#F85888',
  bug: '#90C12C',
  rock: '#C5B78C',
  ghost: '#5269AC',
  dragon: '#0A6DC4',
  dark: '#5A5366',
  steel: '#5A8EA1',
  fairy: '#EC8FE6',
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
