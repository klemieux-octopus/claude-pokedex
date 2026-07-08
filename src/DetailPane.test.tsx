import { render, screen } from '@testing-library/react'
import { DetailPane } from './DetailPane'
import type { SpeciesDetail } from './data/types'

const stats = { hp: 78, attack: 84, defense: 78, specialAttack: 109, specialDefense: 85, speed: 100 }

const charizard: SpeciesDetail = {
  dex: 6,
  name: 'charizard',
  generation: 1,
  isLegendary: false,
  isMythical: false,
  flavorText: 'Crache un feu très chaud.',
  evolutionChain: null,
  varieties: [
    {
      name: 'charizard',
      isDefault: true,
      types: ['fire', 'flying'],
      stats,
      abilities: [{ name: 'blaze', isHidden: false }],
      height: 17,
      weight: 905,
      moves: [],
      sprites: { default: 'd.png', shiny: 's.png', officialArtwork: 'art.png' },
    },
    {
      name: 'charizard-mega-x',
      isDefault: false,
      types: ['fire', 'dragon'],
      stats,
      abilities: [],
      height: 17,
      weight: 1105,
      moves: [],
      sprites: { default: null, shiny: null, officialArtwork: 'megax.png' },
    },
  ],
}

describe('DetailPane (squelette #41)', () => {
  it('affiche le nom, le numéro dex et les types de la variété par défaut', () => {
    render(<DetailPane detail={charizard} shiny={false} shinyHeroUrl={null} />)
    expect(screen.getByRole('heading', { name: 'charizard' })).toBeInTheDocument()
    expect(screen.getByText('#0006')).toBeInTheDocument()
    // Variété par défaut (fire/flying), pas la Méga-X (fire/dragon).
    expect(screen.getByText('fire')).toBeInTheDocument()
    expect(screen.getByText('flying')).toBeInTheDocument()
    expect(screen.queryByText('dragon')).not.toBeInTheDocument()
  })

  it('utilise l’artwork par défaut quand shiny est désactivé', () => {
    render(<DetailPane detail={charizard} shiny={false} shinyHeroUrl="shiny.png" />)
    expect(screen.getByRole('img', { name: 'charizard' })).toHaveAttribute('src', 'art.png')
  })

  it('utilise l’URL héro shiny quand shiny est activé', () => {
    render(<DetailPane detail={charizard} shiny shinyHeroUrl="shiny.png" />)
    expect(screen.getByRole('img', { name: 'charizard' })).toHaveAttribute('src', 'shiny.png')
  })

  it('retombe sur l’artwork par défaut quand shiny est activé mais l’URL shiny manque', () => {
    render(<DetailPane detail={charizard} shiny shinyHeroUrl={null} />)
    expect(screen.getByRole('img', { name: 'charizard' })).toHaveAttribute('src', 'art.png')
  })
})
