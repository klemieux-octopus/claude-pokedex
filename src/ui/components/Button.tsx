import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'

// Bouton pilule tactile — le contrôle moderne du design system (plastique
// moulé : léger emboss, enfoncement « springy »). Porté en TS.

type Variant = 'primary' | 'secondary' | 'neutral' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const SIZES: Record<Size, { padding: string; height: number; font: number }> = {
  sm: { padding: '0 14px', height: 34, font: 14 },
  md: { padding: '0 20px', height: 42, font: 16 },
  lg: { padding: '0 28px', height: 52, font: 18 },
}

const VARIANTS: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--poke-red)', color: 'var(--text-on-brand)', boxShadow: 'var(--emboss)', border: 'none' },
  secondary: { background: 'var(--poke-blue)', color: 'var(--white)', boxShadow: 'var(--emboss)', border: 'none' },
  neutral: { background: 'var(--surface-card)', color: 'var(--text-strong)', boxShadow: 'var(--shadow-1)', border: '2px solid var(--border-hairline)' },
  ghost: { background: 'transparent', color: 'var(--text-body)', boxShadow: 'none', border: '2px solid transparent' },
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  block?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  children?: ReactNode
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft,
  iconRight,
  style,
  ...rest
}: Props) {
  const s = SIZES[size]
  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: block ? '100%' : 'auto',
        height: s.height,
        padding: s.padding,
        font: `var(--w-semibold) ${s.font}px/1 var(--font-ui)`,
        letterSpacing: '0.01em',
        borderRadius: 'var(--r-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform var(--dur-fast) var(--ease-pop), filter var(--dur-fast) var(--ease-out)',
        ...VARIANTS[variant],
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
