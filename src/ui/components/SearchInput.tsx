import { useState, type CSSProperties, type InputHTMLAttributes, type ReactNode } from 'react'

// Champ de recherche arrondi avec halo de focus bleu (lentille). Porté en TS.
// Les attributs non gérés (type, aria-label, value, onChange…) sont transmis
// à l'<input> via ...rest, ce qui préserve le rôle « searchbox » attendu.

type Size = 'sm' | 'md' | 'lg'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Glyphe de tête, typiquement une loupe. */
  icon?: ReactNode
  size?: Size
  style?: CSSProperties
}

const HEIGHTS: Record<Size, number> = { sm: 38, md: 46, lg: 54 }

export function SearchInput({ icon, size = 'md', style, ...rest }: Props) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="ds-search"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: HEIGHTS[size],
        padding: '0 16px',
        background: 'var(--surface-card)',
        border: `2px solid ${focused ? 'var(--poke-blue)' : 'var(--border-hairline)'}`,
        borderRadius: 'var(--r-pill)',
        boxShadow: focused ? 'var(--ring)' : 'var(--shadow-1)',
        transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
    >
      {icon && (
        <span style={{ display: 'flex', color: focused ? 'var(--poke-blue)' : 'var(--ink-300)' }}>{icon}</span>
      )}
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1,
          minWidth: 0,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          font: 'var(--w-medium) 16px/1 var(--font-ui)',
          color: 'var(--text-strong)',
        }}
        {...rest}
      />
    </div>
  )
}
