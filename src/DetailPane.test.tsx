import { render, screen, within } from '@testing-library/react'
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
      abilities: [
        { name: 'blaze', isHidden: false },
        { name: 'solar-power', isHidden: true },
      ],
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

const withSpecies = (o: Partial<SpeciesDetail>): SpeciesDetail => ({ ...charizard, ...o })

describe('DetailPane — contenu complet (#42)', () => {
  const renderCz = (o: Partial<SpeciesDetail> = {}) =>
    render(<DetailPane detail={withSpecies(o)} shiny={false} shinyHeroUrl={null} />)

  it('affiche les six stats en barres /255 avec leur valeur et le total', () => {
    renderCz()
    const bars: [string, number][] = [
      ['PV', 78],
      ['Attaque', 84],
      ['Défense', 78],
      ['Att. Spé.', 109],
      ['Déf. Spé.', 85],
      ['Vitesse', 100],
    ]
    for (const [label, val] of bars) {
      const bar = screen.getByRole('progressbar', { name: label })
      expect(bar).toHaveAttribute('aria-valuenow', String(val))
      expect(bar).toHaveAttribute('aria-valuemax', '255')
      // La valeur numérique visible de la stat, à côté de sa barre.
      const row = bar.closest('.stat-row') as HTMLElement
      expect(within(row).getByText(String(val))).toBeInTheDocument()
    }
    // Total : 78 + 84 + 78 + 109 + 85 + 100 = 534
    expect(screen.getByText('534')).toBeInTheDocument()
  })

  it('remplit les barres de la couleur du type primaire', () => {
    const { container } = renderCz()
    const fill = container.querySelector('.stat-fill') as HTMLElement
    expect(fill).toHaveStyle({ background: '#EE8130' }) // fire
  })

  it('liste toutes les capacités et tague les cachées « Caché »', () => {
    renderCz()
    const hidden = screen.getByText('solar-power').closest('li') as HTMLElement
    expect(within(hidden).getByText('Caché')).toBeInTheDocument()
    const shown = screen.getByText('blaze').closest('li') as HTMLElement
    expect(within(shown).queryByText('Caché')).not.toBeInTheDocument()
  })

  it('affiche le flavor text', () => {
    renderCz()
    expect(screen.getByText(charizard.flavorText)).toBeInTheDocument()
  })

  it('affiche la taille et le poids en métrique (÷10) et la génération', () => {
    renderCz()
    expect(screen.getByText('1,7 m')).toBeInTheDocument() // 17 dm → 1,7 m
    expect(screen.getByText('90,5 kg')).toBeInTheDocument() // 905 hg → 90,5 kg
    expect(screen.getByText('Gen 1')).toBeInTheDocument()
  })

  it('n’affiche aucun badge légendaire/mythique par défaut', () => {
    renderCz()
    expect(screen.queryByText('Légendaire')).not.toBeInTheDocument()
    expect(screen.queryByText('Mythique')).not.toBeInTheDocument()
  })

  it('affiche « Légendaire » quand isLegendary', () => {
    renderCz({ isLegendary: true })
    expect(screen.getByText('Légendaire')).toBeInTheDocument()
  })

  it('affiche « Mythique » quand isMythical', () => {
    renderCz({ isMythical: true })
    expect(screen.getByText('Mythique')).toBeInTheDocument()
  })
})
