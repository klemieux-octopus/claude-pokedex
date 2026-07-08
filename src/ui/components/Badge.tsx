import type { CSSProperties, ReactNode } from 'react'

// Petite pastille de statut / métadonnée (rareté, « Caché », génération…).
// À ne pas confondre avec TypeBadge (types élémentaires). Porté en TS.

type Tone = 'neutral' | 'brand' | 'accent' | 'success'

const TONES: Record<Tone, CSSProperties> = {
  neutral: { background: 'var(--surface-inset)', color: 'var(--text-body)', border: '1px solid var(--border-hairline)' },
  brand: { background: 'color-mix(in srgb, var(--poke-red) 12%, white)', color: 'var(--poke-red-deep)', border: '1px solid color-mix(in srgb, var(--poke-red) 30%, white)' },
  accent: { background: 'color-mix(in srgb, var(--poke-blue) 12%, white)', color: 'var(--poke-blue)', border: '1px solid color-mix(in srgb, var(--poke-blue) 30%, white)' },
  success: { background: 'color-mix(in srgb, var(--led-green) 16%, white)', color: '#1E7A45', border: '1px solid color-mix(in srgb, var(--led-green) 34%, white)' },
}

interface Props {
  children: ReactNode
  tone?: Tone
  className?: string
  style?: CSSProperties
}

export function Badge({ children, tone = 'neutral', className, style }: Props) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '3px 10px',
        font: 'var(--w-semibold) 12px/1 var(--font-ui)',
        letterSpacing: '0.02em',
        borderRadius: 'var(--r-pill)',
        ...TONES[tone],
        ...style,
      }}
    >
      {children}
    </span>
  )
}
