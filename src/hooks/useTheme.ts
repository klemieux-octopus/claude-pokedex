import { useCallback, useEffect, useState } from 'react'

// Préférence de thème : « system » suit prefers-color-scheme (aucun attribut
// posé, le CSS s'en charge) ; « light » / « dark » forcent le thème via
// <html data-theme> et persistent dans localStorage. Voir src/styles/tokens.css.

export type ThemePref = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'pokedex-theme'
const CYCLE: ThemePref[] = ['system', 'light', 'dark']

function readStored(): ThemePref {
  const v = window.localStorage.getItem(STORAGE_KEY)
  return v === 'light' || v === 'dark' ? v : 'system'
}

// Applique (ou retire) l'attribut data-theme sur <html> selon la préférence.
function apply(pref: ThemePref) {
  const root = document.documentElement
  if (pref === 'system') delete root.dataset.theme
  else root.dataset.theme = pref
}

export interface ThemeApi {
  pref: ThemePref
  setPref: (pref: ThemePref) => void
  cycle: () => void
}

export function useTheme(): ThemeApi {
  const [pref, setPrefState] = useState<ThemePref>(readStored)

  useEffect(() => {
    apply(pref)
    if (pref === 'system') window.localStorage.removeItem(STORAGE_KEY)
    else window.localStorage.setItem(STORAGE_KEY, pref)
  }, [pref])

  const setPref = useCallback((next: ThemePref) => setPrefState(next), [])
  const cycle = useCallback(
    () => setPrefState((p) => CYCLE[(CYCLE.indexOf(p) + 1) % CYCLE.length]),
    [],
  )

  return { pref, setPref, cycle }
}
