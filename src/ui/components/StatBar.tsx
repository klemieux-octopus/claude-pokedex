import type { CSSProperties } from 'react'

// Barre de stat de base — libellé + valeur + piste. Porté en TS depuis le
// bundle, avec le rendu « piste rétro en creux » (--deboss) du design system,
// mais en conservant la sémantique accessible attendue par l'app : role
// progressbar nommé par le libellé, et les classes .stat-row / .stat-fill.

interface Props {
  label: string
  value: number
  max?: number
  /** Couleur du remplissage (défaut : couleur du type primaire côté appelant). */
  color: string
  style?: CSSProperties
}

export function StatBar({ label, value, max = 255, color, style }: Props) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className="stat-row" style={style}>
      <span className="stat-label">{label}</span>
      <div
        className="stat-bar"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="stat-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="stat-val num">{value}</span>
    </div>
  )
}
