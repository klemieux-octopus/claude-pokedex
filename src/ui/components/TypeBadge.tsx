import type { CSSProperties } from 'react'
import { typeTextColor } from '../typeColors'

// Chip de type élémentaire — l'atome de données signature du design system.
// Porté en TS depuis le bundle (.claude/skills/design-system/components/data).
// Capsule pleine à la couleur du type, libellé en capitales. La couleur du
// texte vient de typeTextColor (encre foncée sur les types clairs, blanc sinon)
// pour garder un contraste accessible — le bundle mettait du blanc en dur, qui
// échoue sur electric/ice/rock… (critère #45).

const TYPE_TOKENS: Record<string, string> = {
  normal: '--type-normal', fire: '--type-fire', water: '--type-water',
  grass: '--type-grass', electric: '--type-electric', ice: '--type-ice',
  fighting: '--type-fighting', poison: '--type-poison', ground: '--type-ground',
  flying: '--type-flying', psychic: '--type-psychic', bug: '--type-bug',
  rock: '--type-rock', ghost: '--type-ghost', dragon: '--type-dragon',
  dark: '--type-dark', steel: '--type-steel', fairy: '--type-fairy',
}

const SIZES = {
  sm: { padding: '3px 10px', font: 11 },
  md: { padding: '5px 14px', font: 13 },
  lg: { padding: '7px 18px', font: 15 },
} as const

interface Props {
  type: string
  size?: keyof typeof SIZES
  style?: CSSProperties
}

export function TypeBadge({ type, size = 'md', style }: Props) {
  const key = type.toLowerCase()
  const token = TYPE_TOKENS[key] ?? TYPE_TOKENS.normal
  const s = SIZES[size]
  return (
    <span
      className="type-badge"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: s.padding,
        background: `var(${token})`,
        color: typeTextColor(key),
        font: `var(--w-semibold) ${s.font}px/1 var(--font-ui)`,
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        borderRadius: 'var(--r-pill)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)',
        ...style,
      }}
    >
      {key}
    </span>
  )
}
