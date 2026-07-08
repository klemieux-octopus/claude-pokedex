import type { SpeciesIndexEntry } from './types'

export type SortKey = 'dex' | 'name' | 'total'

/** The state of every list control. Lives in the URL; see useListControls. */
export interface ListControls {
  q: string
  type: string | null
  gen: number | null
  sort: SortKey
  shiny: boolean
}

export const DEFAULT_CONTROLS: ListControls = {
  q: '',
  type: null,
  gen: null,
  sort: 'dex',
  shiny: false,
}

/** True when any control is off its default — drives the "Clear" affordance. */
export function hasActiveControls(c: ListControls): boolean {
  return (
    c.q.trim() !== DEFAULT_CONTROLS.q ||
    c.type !== DEFAULT_CONTROLS.type ||
    c.gen !== DEFAULT_CONTROLS.gen ||
    c.sort !== DEFAULT_CONTROLS.sort ||
    c.shiny !== DEFAULT_CONTROLS.shiny
  )
}

function matchesQuery(s: SpeciesIndexEntry, q: string): boolean {
  const needle = q.trim().toLowerCase()
  if (needle === '') return true
  return s.name.toLowerCase().includes(needle) || String(s.dex).includes(needle)
}

const SORTERS: Record<SortKey, (a: SpeciesIndexEntry, b: SpeciesIndexEntry) => number> = {
  dex: (a, b) => a.dex - b.dex,
  name: (a, b) => a.name.localeCompare(b.name),
  total: (a, b) => b.statTotal - a.statTotal, // strongest first
}

/**
 * Apply the search/type/generation filters (combined with AND) and sort.
 * `shiny` is not a filter — it only affects imagery — so it's ignored here.
 */
export function filterAndSort(
  species: SpeciesIndexEntry[],
  c: ListControls,
): SpeciesIndexEntry[] {
  const filtered = species.filter(
    (s) =>
      matchesQuery(s, c.q) &&
      (c.type === null || s.types.includes(c.type)) &&
      (c.gen === null || s.generation === c.gen),
  )
  return [...filtered].sort(SORTERS[c.sort])
}
