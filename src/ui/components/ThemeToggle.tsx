import { useTheme, type ThemePref } from '../../hooks/useTheme'
import { Button } from './Button'

// Bascule de thème à trois états : Auto (suit l'OS) → Clair → Sombre → Auto.
// « Auto » par défaut, choix manuel persistant (#45). Glyphe fonctionnel, pas
// un emoji, conformément au ton du design system.

const FACES: Record<ThemePref, { glyph: string; label: string }> = {
  system: { glyph: '◐', label: 'Auto' },
  light: { glyph: '☀', label: 'Clair' },
  dark: { glyph: '☾', label: 'Sombre' },
}

export function ThemeToggle() {
  const { pref, cycle } = useTheme()
  const face = FACES[pref]
  return (
    <Button
      type="button"
      variant="neutral"
      size="sm"
      onClick={cycle}
      aria-label={`Thème : ${face.label}. Cliquer pour changer.`}
      iconLeft={<span aria-hidden="true">{face.glyph}</span>}
    >
      {face.label}
    </Button>
  )
}
