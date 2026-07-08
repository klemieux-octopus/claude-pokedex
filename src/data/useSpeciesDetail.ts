import { useEffect, useState } from 'react'
import type { SpeciesDetail } from './types'

// Emplacement du document de détail statique d'une espèce (produit par le
// générateur de snapshot). Servi depuis le base path de l'app — PAS PokéAPI.
export const detailUrl = (dex: number): string =>
  `${import.meta.env.BASE_URL}data/species/${dex}.json`

// Cache mémoire partagé entre tous les usages du hook : re-sélectionner une
// espèce déjà chargée est instantané, sans second fetch.
const cache = new Map<number, SpeciesDetail>()

/** Réinitialise le cache — réservé aux tests. */
export function __clearDetailCache(): void {
  cache.clear()
}

export type SpeciesDetailState =
  | { status: 'idle' } // aucune sélection
  | { status: 'loading' }
  | { status: 'ready'; detail: SpeciesDetail }
  | { status: 'notfound' }
  | { status: 'error'; message: string }

// État immédiat (synchrone) pour un dex : aucune sélection → idle, en cache →
// ready, sinon loading (le fetch asynchrone prend le relais).
function immediateState(dex: number | null): SpeciesDetailState {
  if (dex === null) return { status: 'idle' }
  const cached = cache.get(dex)
  return cached ? { status: 'ready', detail: cached } : { status: 'loading' }
}

/**
 * Charge à la demande le détail de l'espèce `dex` depuis le snapshot statique.
 * `dex` à `null` → état `idle` (aucune sélection). Les résultats sont mis en
 * cache par numéro dex. Aucun appel PokéAPI au runtime.
 */
export function useSpeciesDetail(dex: number | null): SpeciesDetailState {
  const [state, setState] = useState<SpeciesDetailState>(() => immediateState(dex))

  useEffect(() => {
    if (dex === null) {
      setState({ status: 'idle' })
      return
    }
    const cached = cache.get(dex)
    if (cached) {
      setState({ status: 'ready', detail: cached })
      return
    }

    let cancelled = false
    setState({ status: 'loading' })
    fetch(detailUrl(dex))
      .then((res) => {
        if (res.status === 404) return null // espèce absente du snapshot
        if (!res.ok) throw new Error(`Échec du chargement du détail (${res.status})`)
        return res.json() as Promise<SpeciesDetail>
      })
      .then((detail) => {
        if (cancelled) return
        if (detail === null) {
          setState({ status: 'notfound' })
          return
        }
        cache.set(dex, detail)
        setState({ status: 'ready', detail })
      })
      .catch((err: unknown) => {
        if (cancelled) return
        setState({ status: 'error', message: err instanceof Error ? err.message : String(err) })
      })
    return () => {
      cancelled = true
    }
  }, [dex])

  return state
}
