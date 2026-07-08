import { useEffect, useState } from 'react'
import type { SpeciesIndexEntry } from './types'

// Where the build-time snapshot is served from. It's a static file under the
// app's base path — NOT PokéAPI. The app makes no PokéAPI calls at runtime.
export const INDEX_URL = `${import.meta.env.BASE_URL}data/index.json`

type State =
  | { status: 'loading' }
  | { status: 'ready'; species: SpeciesIndexEntry[] }
  | { status: 'error'; message: string }

/** Fetch and sort the species index (by dex number) from the static snapshot. */
export function useSpeciesIndex(): State {
  const [state, setState] = useState<State>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    fetch(INDEX_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load species index (${res.status})`)
        return res.json() as Promise<SpeciesIndexEntry[]>
      })
      .then((species) => {
        if (cancelled) return
        const sorted = [...species].sort((a, b) => a.dex - b.dex)
        setState({ status: 'ready', species: sorted })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) })
      })
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
