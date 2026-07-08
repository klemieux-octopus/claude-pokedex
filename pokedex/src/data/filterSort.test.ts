import {
  DEFAULT_CONTROLS,
  filterAndSort,
  hasActiveControls,
  type ListControls,
} from './filterSort'
import type { SpeciesIndexEntry } from './types'

const mon = (
  dex: number,
  name: string,
  types: string[],
  generation: number,
  statTotal: number,
): SpeciesIndexEntry => ({ dex, name, types, generation, statTotal, thumbnail: null, thumbnailShiny: null })

const DEX = [
  mon(1, 'bulbasaur', ['grass', 'poison'], 1, 318),
  mon(4, 'charmander', ['fire'], 1, 309),
  mon(6, 'charizard', ['fire', 'flying'], 1, 534),
  mon(25, 'pikachu', ['electric'], 1, 320),
  mon(658, 'greninja', ['water', 'dark'], 6, 530),
]

const controls = (over: Partial<ListControls>): ListControls => ({ ...DEFAULT_CONTROLS, ...over })

describe('filterAndSort', () => {
  it('returns everything in dex order by default', () => {
    expect(filterAndSort(DEX, DEFAULT_CONTROLS).map((s) => s.dex)).toEqual([1, 4, 6, 25, 658])
  })

  it('searches name by case-insensitive substring', () => {
    expect(filterAndSort(DEX, controls({ q: 'CHAR' })).map((s) => s.name)).toEqual([
      'charmander',
      'charizard',
    ])
  })

  it('searches by dex-number substring', () => {
    expect(filterAndSort(DEX, controls({ q: '6' })).map((s) => s.dex)).toEqual([6, 658])
  })

  it('filters by a single type', () => {
    expect(filterAndSort(DEX, controls({ type: 'fire' })).map((s) => s.name)).toEqual([
      'charmander',
      'charizard',
    ])
  })

  it('filters by generation', () => {
    expect(filterAndSort(DEX, controls({ gen: 6 })).map((s) => s.name)).toEqual(['greninja'])
  })

  it('combines search + type + generation with AND', () => {
    expect(
      filterAndSort(DEX, controls({ q: 'char', type: 'flying', gen: 1 })).map((s) => s.name),
    ).toEqual(['charizard'])
  })

  it('sorts by name A–Z', () => {
    expect(filterAndSort(DEX, controls({ sort: 'name' })).map((s) => s.name)).toEqual([
      'bulbasaur',
      'charizard',
      'charmander',
      'greninja',
      'pikachu',
    ])
  })

  it('sorts by stat total descending', () => {
    expect(filterAndSort(DEX, controls({ sort: 'total' })).map((s) => s.dex)).toEqual([
      6, 658, 25, 1, 4,
    ])
  })

  it('returns an empty array when nothing matches', () => {
    expect(filterAndSort(DEX, controls({ q: 'zzz' }))).toEqual([])
  })

  it('does not mutate the input array', () => {
    const before = DEX.map((s) => s.dex)
    filterAndSort(DEX, controls({ sort: 'total' }))
    expect(DEX.map((s) => s.dex)).toEqual(before)
  })
})

describe('hasActiveControls', () => {
  it('is false for defaults', () => {
    expect(hasActiveControls(DEFAULT_CONTROLS)).toBe(false)
  })

  it.each([
    ['search', { q: 'x' }],
    ['type', { type: 'fire' }],
    ['generation', { gen: 2 }],
    ['sort', { sort: 'name' as const }],
    ['shiny', { shiny: true }],
  ])('is true when %s is set', (_label, over) => {
    expect(hasActiveControls(controls(over))).toBe(true)
  })
})
