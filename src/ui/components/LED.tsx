import type { CSSProperties } from 'react'

// LED — petite lampe témoin de la coque Pokédex. Point brillant avec halo.
// Le bleu est la grosse lentille ; les petites sont des statuts. Porté en TS.

type Color = 'blue' | 'red' | 'yellow' | 'green'

const COLORS: Record<Color, string> = {
  blue: 'var(--led-blue)',
  red: 'var(--led-red)',
  yellow: 'var(--led-yellow)',
  green: 'var(--led-green)',
}

const GLOWS: Record<Color, string> = {
  blue: 'var(--led-glow-blue)',
  red: 'var(--led-glow-red)',
  green: 'var(--led-glow-green)',
  yellow: '0 0 8px rgba(255,203,61,0.8)',
}

interface Props {
  color?: Color
  /** Diamètre en px. La grosse lentille fait ~48. */
  size?: number
  lit?: boolean
  glow?: boolean
  style?: CSSProperties
}

export function LED({ color = 'blue', size = 14, lit = true, glow = true, style }: Props) {
  const base = COLORS[color]
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: 'var(--r-pill)',
        background: lit
          ? `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${base} 62%)`
          : 'var(--ink-300)',
        border: '2px solid rgba(23,24,28,0.55)',
        boxShadow: lit && glow ? GLOWS[color] : 'inset 0 1px 2px rgba(0,0,0,0.4)',
        ...style,
      }}
    />
  )
}
