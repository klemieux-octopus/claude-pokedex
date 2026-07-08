import type { CSSProperties } from 'react'

// Interrupteur pilule moderne. Off = neutre, on = bleu lentille avec pastille
// LED. Porté en TS avec une base <input type="checkbox"> réellement accessible
// (visuellement masquée) : le libellé associe le contrôle et le clic bascule —
// contrat attendu par les tests (getByLabelText + click). Le rendu visuel
// (piste + knob) est piloté par le CSS via les classes ci-dessous.

interface Props {
  checked: boolean
  onChange: (next: boolean) => void
  disabled?: boolean
  label: string
  style?: CSSProperties
}

export function Toggle({ checked, onChange, disabled = false, label, style }: Props) {
  return (
    <label className="ds-toggle" data-disabled={disabled || undefined} style={style}>
      <input
        type="checkbox"
        className="ds-toggle__input"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ds-toggle__track" aria-hidden="true">
        <span className="ds-toggle__knob" />
      </span>
      <span className="ds-toggle__label">{label}</span>
    </label>
  )
}
