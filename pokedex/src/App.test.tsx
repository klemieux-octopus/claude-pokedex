import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import App from './App'
import type { SpeciesIndexEntry } from './data/types'

// Deliberately out of dex order — the app must sort.
const INDEX: SpeciesIndexEntry[] = [
  { dex: 25, name: 'pikachu', types: ['electric'], generation: 1, statTotal: 320, thumbnail: 'pika.png' },
  { dex: 1, name: 'bulbasaur', types: ['grass', 'poison'], generation: 1, statTotal: 318, thumbnail: 'bulba.png' },
  { dex: 4, name: 'charmander', types: ['fire'], generation: 1, statTotal: 309, thumbnail: 'char.png' },
]

let fetchMock: ReturnType<typeof vi.fn>

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  fetchMock = vi.fn(async () => ({
    ok: true,
    json: async () => INDEX,
  }))
  vi.stubGlobal('fetch', fetchMock)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App — browse the species list', () => {
  it('loads the list from the static snapshot and sorts by dex number', async () => {
    render(<App />)
    await screen.findByText('bulbasaur')
    const names = screen.getAllByRole('button').map((b) => b.querySelector('.species-name')?.textContent)
    expect(names).toEqual(['bulbasaur', 'charmander', 'pikachu']) // 1, 4, 25
  })

  it('fetches the snapshot index and never calls PokéAPI', async () => {
    render(<App />)
    await screen.findByText('bulbasaur')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const url = String(fetchMock.mock.calls[0][0])
    expect(url).toMatch(/data\/index\.json$/)
    expect(url).not.toContain('pokeapi')
  })

  it('reflects a selection in the URL and marks the row', async () => {
    render(<App />)
    fireEvent.click(await screen.findByText('pikachu'))
    await waitFor(() => expect(window.location.search).toBe('?dex=25'))
    const selected = screen
      .getAllByRole('button')
      .find((b) => b.getAttribute('aria-current') === 'true')
    expect(selected?.querySelector('.species-name')?.textContent).toBe('pikachu')
  })

  it('restores the selection from the URL on load (reload-stable)', async () => {
    window.history.replaceState(null, '', '/?dex=4')
    render(<App />)
    await screen.findByText('charmander')
    const selected = screen
      .getAllByRole('button')
      .find((b) => b.getAttribute('aria-current') === 'true')
    expect(selected?.querySelector('.species-name')?.textContent).toBe('charmander')
  })
})
