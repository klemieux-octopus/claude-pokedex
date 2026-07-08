import { useCallback, useState } from 'react'

// The selected Pokémon is kept in the URL (`?dex=<n>`) so a selection is
// linkable and survives reload. No router dependency — just the History API.
const PARAM = 'dex'

function readDexFromUrl(): number | null {
  const raw = new URLSearchParams(window.location.search).get(PARAM)
  if (raw === null) return null
  const n = Number(raw)
  return Number.isInteger(n) && n > 0 ? n : null
}

export function useSelectedDex(): [number | null, (dex: number) => void] {
  const [dex, setDex] = useState<number | null>(readDexFromUrl)

  const select = useCallback((next: number) => {
    setDex(next)
    const url = new URL(window.location.href)
    url.searchParams.set(PARAM, String(next))
    window.history.replaceState(null, '', url)
  }, [])

  return [dex, select]
}
