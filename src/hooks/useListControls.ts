import { useCallback, useState } from 'react'
import {
  DEFAULT_CONTROLS,
  type ListControls,
  type SortKey,
} from '../data/filterSort'

// The list controls live in the URL (alongside ?dex=) so a filtered view is
// shareable and reload-stable. Defaults are omitted from the query string to
// keep links clean. Only these five keys are touched, so ?dex= is preserved.

const SORT_KEYS: SortKey[] = ['dex', 'name', 'total']

function readControls(): ListControls {
  const p = new URLSearchParams(window.location.search)

  const genRaw = p.get('gen')
  const gen = genRaw !== null && Number.isInteger(Number(genRaw)) ? Number(genRaw) : null

  const sortRaw = p.get('sort')
  const sort = SORT_KEYS.includes(sortRaw as SortKey) ? (sortRaw as SortKey) : 'dex'

  return {
    q: p.get('q') ?? '',
    type: p.get('type'),
    gen,
    sort,
    shiny: p.get('shiny') === '1',
  }
}

function setOrDelete(url: URL, key: string, value: string | null): void {
  if (value === null || value === '') url.searchParams.delete(key)
  else url.searchParams.set(key, value)
}

function writeControls(c: ListControls): void {
  const url = new URL(window.location.href)
  setOrDelete(url, 'q', c.q)
  setOrDelete(url, 'type', c.type)
  setOrDelete(url, 'gen', c.gen !== null ? String(c.gen) : null)
  setOrDelete(url, 'sort', c.sort !== DEFAULT_CONTROLS.sort ? c.sort : null)
  setOrDelete(url, 'shiny', c.shiny !== DEFAULT_CONTROLS.shiny ? '1' : null)
  window.history.replaceState(null, '', url)
}

export interface ListControlsApi {
  controls: ListControls
  setQuery: (q: string) => void
  setType: (type: string | null) => void
  setGen: (gen: number | null) => void
  setSort: (sort: SortKey) => void
  setShiny: (shiny: boolean) => void
  clear: () => void
}

export function useListControls(): ListControlsApi {
  const [controls, setControls] = useState<ListControls>(readControls)

  const apply = useCallback((next: ListControls) => {
    setControls(next)
    writeControls(next)
  }, [])

  const patch = useCallback(
    (p: Partial<ListControls>) => apply({ ...controls, ...p }),
    [apply, controls],
  )

  return {
    controls,
    setQuery: (q) => patch({ q }),
    setType: (type) => patch({ type }),
    setGen: (gen) => patch({ gen }),
    setSort: (sort) => patch({ sort }),
    setShiny: (shiny) => patch({ shiny }),
    clear: () => apply(DEFAULT_CONTROLS),
  }
}
