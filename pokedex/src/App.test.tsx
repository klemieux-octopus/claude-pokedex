import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import App from './App'
import type { SpeciesIndexEntry } from './data/types'

// Deliberately out of dex order — the app must sort.
const INDEX: SpeciesIndexEntry[] = [
  { dex: 25, name: 'pikachu', types: ['electric'], generation: 1, statTotal: 320, thumbnail: 'pika.png', thumbnailShiny: 'pika-shiny.png' },
  { dex: 1, name: 'bulbasaur', types: ['grass', 'poison'], generation: 1, statTotal: 318, thumbnail: 'bulba.png', thumbnailShiny: null },
  { dex: 4, name: 'charmander', types: ['fire'], generation: 1, statTotal: 309, thumbnail: 'char.png', thumbnailShiny: 'char-shiny.png' },
]

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  fetchMock = vi.fn(async () => ({ ok: true, json: async () => INDEX }))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

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
    await screen.findByText('charmander')
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
    await waitFor(() => expect(window.location.search).toContain('dex=25'))
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'bulba' } })
    // Pikachu's row is filtered out, but the detail pane still shows it.
    expect(screen.getByText(/#0025 selected/)).toBeInTheDocument()
    expect(window.location.search).toContain('dex=25')
    expect(window.location.search).toContain('q=bulba')
  })
})
