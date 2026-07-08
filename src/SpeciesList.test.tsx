import { fireEvent, render, screen } from '@testing-library/react'
import { SpeciesList } from './SpeciesList'
import type { SpeciesIndexEntry } from './data/types'

const fixture: SpeciesIndexEntry[] = [
  { dex: 1, name: 'bulbasaur', types: ['grass', 'poison'], generation: 1, statTotal: 318, thumbnail: 'bulba.png', thumbnailShiny: 'bulba-shiny.png' },
  { dex: 25, name: 'pikachu', types: ['electric'], generation: 1, statTotal: 320, thumbnail: 'pika.png', thumbnailShiny: null },
  { dex: 133, name: 'eevee', types: ['normal'], generation: 1, statTotal: 325, thumbnail: null, thumbnailShiny: null },
]

describe('SpeciesList', () => {
  it('renders one row per species in the given order', () => {
    render(<SpeciesList species={fixture} selectedDex={null} shiny={false} onSelect={() => {}} />)
    const names = screen.getAllByRole('button').map((b) => b.querySelector('.species-name')?.textContent)
    expect(names).toEqual(['bulbasaur', 'pikachu', 'eevee'])
  })

  it('shows dex number, name, and a badge per type', () => {
    render(<SpeciesList species={fixture} selectedDex={null} shiny={false} onSelect={() => {}} />)
    expect(screen.getByText('#0025')).toBeInTheDocument()
    expect(screen.getByText('pikachu')).toBeInTheDocument()
    expect(screen.getByText('grass')).toBeInTheDocument()
    expect(screen.getByText('poison')).toBeInTheDocument()
  })

  it('renders a thumbnail image when present and a placeholder when null', () => {
    const { container } = render(
      <SpeciesList species={fixture} selectedDex={null} shiny={false} onSelect={() => {}} />,
    )
    expect(container.querySelectorAll('img.species-thumb')).toHaveLength(2)
    expect(container.querySelectorAll('.species-thumb--empty')).toHaveLength(1)
  })

  it('uses shiny artwork when shiny is on, falling back to default when absent', () => {
    const { container } = render(
      <SpeciesList species={fixture} selectedDex={null} shiny onSelect={() => {}} />,
    )
    const srcs = [...container.querySelectorAll('img.species-thumb')].map((img) => img.getAttribute('src'))
    // Bulbasaur has a shiny url; Pikachu (no shiny) falls back to its default.
    expect(srcs).toContain('bulba-shiny.png')
    expect(srcs).toContain('pika.png')
  })

  it('marks the selected row', () => {
    render(<SpeciesList species={fixture} selectedDex={25} shiny={false} onSelect={() => {}} />)
    const selected = screen.getAllByRole('button').filter((b) => b.getAttribute('aria-current') === 'true')
    expect(selected).toHaveLength(1)
    expect(selected[0].querySelector('.species-name')?.textContent).toBe('pikachu')
  })

  it('calls onSelect with the dex number when a row is clicked', () => {
    const onSelect = vi.fn()
    render(<SpeciesList species={fixture} selectedDex={null} shiny={false} onSelect={onSelect} />)
    fireEvent.click(screen.getByText('bulbasaur'))
    expect(onSelect).toHaveBeenCalledWith(1)
  })
})
