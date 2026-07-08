import { renderHook, waitFor } from '@testing-library/react'
import { __clearDetailCache, useSpeciesDetail } from './useSpeciesDetail'
import type { SpeciesDetail } from './types'

const detail = (dex: number): SpeciesDetail => ({
  dex,
  name: `mon-${dex}`,
  generation: 1,
  isLegendary: false,
  isMythical: false,
  flavorText: '',
  evolutionChain: null,
  varieties: [
    {
      name: `mon-${dex}`,
      isDefault: true,
      types: ['normal'],
      stats: { hp: 1, attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
      abilities: [],
      height: 1,
      weight: 1,
      moves: [],
      sprites: { default: null, shiny: null, officialArtwork: null },
    },
  ],
})

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  __clearDetailCache()
  fetchMock = vi.fn(async () => ({ ok: true, status: 200, json: async () => detail(6) }))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => vi.unstubAllGlobals())

describe('useSpeciesDetail', () => {
  it('reste idle et ne fetch pas quand dex est null', () => {
    const { result } = renderHook(() => useSpeciesDetail(null))
    expect(result.current.status).toBe('idle')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('charge le détail et passe à ready', async () => {
    const { result } = renderHook(() => useSpeciesDetail(6))
    await waitFor(() => expect(result.current.status).toBe('ready'))
    expect(result.current).toMatchObject({ status: 'ready', detail: { dex: 6, name: 'mon-6' } })
    const url = String(fetchMock.mock.calls[0][0])
    expect(url).toMatch(/data\/species\/6\.json$/)
    expect(url).not.toContain('pokeapi')
  })

  it('passe à not-found sur un 404', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 404, json: async () => ({}) })
    const { result } = renderHook(() => useSpeciesDetail(999))
    await waitFor(() => expect(result.current.status).toBe('notfound'))
  })

  it('passe à error sur un échec réseau', async () => {
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500, json: async () => ({}) })
    const { result } = renderHook(() => useSpeciesDetail(7))
    await waitFor(() => expect(result.current.status).toBe('error'))
  })

  it('sert depuis le cache sans refetch pour une espèce déjà chargée', async () => {
    const first = renderHook(() => useSpeciesDetail(6))
    await waitFor(() => expect(first.result.current.status).toBe('ready'))
    expect(fetchMock).toHaveBeenCalledTimes(1)

    // Un nouveau montage pour le même dex doit être ready immédiatement, sans 2e fetch.
    const second = renderHook(() => useSpeciesDetail(6))
    expect(second.result.current.status).toBe('ready')
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
