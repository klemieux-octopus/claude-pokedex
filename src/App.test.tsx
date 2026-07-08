import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import App from './App'
import { __clearDetailCache } from './data/useSpeciesDetail'
import type { SpeciesDetail, SpeciesIndexEntry } from './data/types'

// Deliberately out of dex order — the app must sort.
const INDEX: SpeciesIndexEntry[] = [
  { dex: 25, name: 'pikachu', types: ['electric'], generation: 1, statTotal: 320, thumbnail: 'pika.png', thumbnailShiny: 'pika-shiny.png' },
  { dex: 1, name: 'bulbasaur', types: ['grass', 'poison'], generation: 1, statTotal: 318, thumbnail: 'bulba.png', thumbnailShiny: null },
  { dex: 4, name: 'charmander', types: ['fire'], generation: 1, statTotal: 309, thumbnail: 'char.png', thumbnailShiny: 'char-shiny.png' },
]

// Document de détail synthétique pour une espèce de l'INDEX.
function detailDoc(dex: number): SpeciesDetail {
  const e = INDEX.find((s) => s.dex === dex)
  const name = e?.name ?? `mon-${dex}`
  return {
    dex,
    name,
    generation: 1,
    isLegendary: false,
    isMythical: false,
    flavorText: '',
    evolutionChain: null,
    varieties: [
      {
        name,
        isDefault: true,
        types: e?.types ?? ['normal'],
        stats: { hp: 1, attack: 1, defense: 1, specialAttack: 1, specialDefense: 1, speed: 1 },
        abilities: [],
        height: 1,
        weight: 1,
        moves: [],
        sprites: { default: null, shiny: null, officialArtwork: `art-${dex}.png` },
      },
    ],
  }
}

let fetchMock: ReturnType<typeof vi.fn>

// Route index.json → INDEX ; data/species/<dex>.json → detailDoc.
beforeEach(() => {
  window.history.replaceState(null, '', '/')
  __clearDetailCache()
  fetchMock = vi.fn(async (url: string) => {
    const u = String(url)
    if (u.includes('index.json')) return { ok: true, status: 200, json: async () => INDEX }
    const m = u.match(/species\/(\d+)\.json$/)
    if (m) return { ok: true, status: 200, json: async () => detailDoc(Number(m[1])) }
    return { ok: false, status: 404, json: async () => ({}) }
  })
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

// Le volet de détail (heading de niveau 2) — distinct du titre h1 « Pokédex ».
const detailName = () => screen.queryByRole('heading', { level: 2 })?.textContent

// Species rows only (excludes control buttons like type chips / Clear).
const rowNames = (c: HTMLElement) =>
  [...c.querySelectorAll('.species-row .species-name')].map((n) => n.textContent)

const selectedName = (c: HTMLElement) =>
  c.querySelector('.species-row[aria-current="true"] .species-name')?.textContent

const typeChip = (name: string) =>
  within(screen.getByRole('group', { name: 'Filter by type' })).getByRole('button', { name })

describe('App — browse the species list', () => {
  it('loads from the static snapshot, sorts by dex, and never calls PokéAPI', async () => {
    const { container } = render(<App />)
    await screen.findByText('bulbasaur')
    expect(rowNames(container)).toEqual(['bulbasaur', 'charmander', 'pikachu']) // 1, 4, 25
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const url = String(fetchMock.mock.calls[0][0])
    expect(url).toMatch(/data\/index\.json$/)
    expect(url).not.toContain('pokeapi')
  })

  it('reflects a selection in the URL and marks the row', async () => {
    const { container } = render(<App />)
    fireEvent.click(await screen.findByText('pikachu'))
    await waitFor(() => expect(window.location.search).toBe('?dex=25'))
    expect(selectedName(container)).toBe('pikachu')
  })

  it('restores the selection from the URL on load (reload-stable)', async () => {
    window.history.replaceState(null, '', '/?dex=4')
    const { container } = render(<App />)
    await screen.findByText('bulbasaur') // liste rendue (nom non sélectionné, unique)
    expect(selectedName(container)).toBe('charmander')
  })
})

describe('App — list controls', () => {
  it('narrows the list by search, updates the count and the URL', async () => {
    const { container } = render(<App />)
    await screen.findByText('bulbasaur')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'char' } })
    expect(rowNames(container)).toEqual(['charmander'])
    expect(screen.getByText('1 of 3')).toBeInTheDocument()
    expect(window.location.search).toContain('q=char')
  })

  it('filters by type via a chip and records it in the URL', async () => {
    const { container } = render(<App />)
    await screen.findByText('bulbasaur')
    fireEvent.click(typeChip('fire'))
    expect(rowNames(container)).toEqual(['charmander'])
    expect(window.location.search).toContain('type=fire')
  })

  it('sorts by stat total (descending) and records it in the URL', async () => {
    const { container } = render(<App />)
    await screen.findByText('bulbasaur')
    fireEvent.change(screen.getByRole('combobox', { name: 'Sort order' }), { target: { value: 'total' } })
    expect(rowNames(container)).toEqual(['pikachu', 'bulbasaur', 'charmander']) // 320, 318, 309
    expect(window.location.search).toContain('sort=total')
  })

  it('shows shiny artwork when the shiny toggle is on', async () => {
    const { container } = render(<App />)
    await screen.findByText('pikachu')
    fireEvent.click(screen.getByLabelText('Shiny'))
    const pikaImg = [...container.querySelectorAll('.species-row')]
      .find((r) => r.querySelector('.species-name')?.textContent === 'pikachu')
      ?.querySelector('img')
    expect(pikaImg?.getAttribute('src')).toBe('pika-shiny.png')
    expect(window.location.search).toContain('shiny=1')
  })

  it('shows an empty state when nothing matches', async () => {
    render(<App />)
    await screen.findByText('bulbasaur')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'zzz' } })
    expect(screen.getByText(/no pokémon match/i)).toBeInTheDocument()
    expect(screen.getByText('0 of 3')).toBeInTheDocument()
  })

  it('clears all controls with the Clear button', async () => {
    const { container } = render(<App />)
    await screen.findByText('bulbasaur')
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'char' } })
    expect(rowNames(container)).toEqual(['charmander'])
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }))
    expect(rowNames(container)).toEqual(['bulbasaur', 'charmander', 'pikachu'])
    expect(screen.getByRole('searchbox')).toHaveValue('')
    expect(window.location.search).toBe('')
  })

  it('keeps the selection even when a filter hides the selected Pokémon', async () => {
    render(<App />)
    fireEvent.click(await screen.findByText('pikachu'))
    await waitFor(() => expect(detailName()).toBe('pikachu')) // détail chargé
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'bulba' } })
    // La ligne de Pikachu est filtrée, mais le volet de détail l'affiche toujours.
    expect(detailName()).toBe('pikachu')
    expect(window.location.search).toContain('dex=25')
    expect(window.location.search).toContain('q=bulba')
  })
})

describe('App — volet de détail (#41)', () => {
  it('charge et affiche le détail de l’espèce sélectionnée, sans appeler PokéAPI', async () => {
    render(<App />)
    fireEvent.click(await screen.findByText('charmander'))
    await waitFor(() => expect(detailName()).toBe('charmander'))
    for (const call of fetchMock.mock.calls) expect(String(call[0])).not.toContain('pokeapi')
    expect(fetchMock.mock.calls.some((c) => /species\/4\.json$/.test(String(c[0])))).toBe(true)
  })

  it('invite à sélectionner un Pokémon quand rien n’est sélectionné', async () => {
    render(<App />)
    await screen.findByText('bulbasaur')
    expect(screen.getByText(/sélectionne un pokémon/i)).toBeInTheDocument()
  })

  it('ne refait pas de fetch en re-sélectionnant une espèce déjà vue', async () => {
    const { container } = render(<App />)
    const clickRow = (name: string) =>
      fireEvent.click(
        [...container.querySelectorAll<HTMLElement>('.species-row')].find(
          (r) => r.querySelector('.species-name')?.textContent === name,
        )!,
      )
    await screen.findByText('bulbasaur')
    const charFetches = () =>
      fetchMock.mock.calls.filter((c) => /species\/4\.json$/.test(String(c[0]))).length

    clickRow('charmander')
    await waitFor(() => expect(detailName()).toBe('charmander'))
    expect(charFetches()).toBe(1)

    clickRow('bulbasaur')
    await waitFor(() => expect(detailName()).toBe('bulbasaur'))

    clickRow('charmander') // revisite → servi depuis le cache
    await waitFor(() => expect(detailName()).toBe('charmander'))
    expect(charFetches()).toBe(1) // aucun refetch
  })
})
