// Recorded-fixture tests: the transform run against real PokéAPI responses
// captured under ./fixtures/ (see AC — "recorded fixtures, no live API"). These
// catch drift between our assumed shapes and PokéAPI's actual ones, which the
// hand-authored unit tests in transform.test.ts can't.

import { buildIndexEntry, buildSpeciesDetail } from './transform'
import type { RawEvolutionChain, RawPokemon, RawSpecies } from './schema'

import eeveeSpeciesJson from './fixtures/eevee-species.json'
import eeveeJson from './fixtures/eevee.json'
import eeveeChainJson from './fixtures/eevee-evolution-chain.json'
import charizardSpeciesJson from './fixtures/charizard-species.json'
import charizardJson from './fixtures/charizard.json'
import charizardMegaXJson from './fixtures/charizard-mega-x.json'

const eeveeSpecies = eeveeSpeciesJson as unknown as RawSpecies
const eevee = eeveeJson as unknown as RawPokemon
const eeveeChain = eeveeChainJson as unknown as RawEvolutionChain
const charizardSpecies = charizardSpeciesJson as unknown as RawSpecies
const charizard = charizardJson as unknown as RawPokemon
const charizardMegaX = charizardMegaXJson as unknown as RawPokemon

describe('transform against recorded PokéAPI fixtures', () => {
  describe('Eevee (branching evolution)', () => {
    const detail = buildSpeciesDetail(eeveeSpecies, [eevee], eeveeChain)

    it('maps species-level fields', () => {
      expect(detail.dex).toBe(133)
      expect(detail.name).toBe('eevee')
      expect(detail.generation).toBe(1)
      expect(detail.isLegendary).toBe(false)
    })

    it('normalizes flavor text (no control whitespace)', () => {
      expect(detail.flavorText.length).toBeGreaterThan(0)
      expect(detail.flavorText).not.toMatch(/[\n\f\r]/)
    })

    it('flags the hidden ability correctly (Anticipation is hidden, Adaptability is not)', () => {
      expect(detail.varieties[0].abilities).toContainEqual({
        name: 'anticipation',
        isHidden: true,
      })
      expect(detail.varieties[0].abilities).toContainEqual({
        name: 'adaptability',
        isHidden: false,
      })
    })

    it('maps all eight evolution branches', () => {
      expect(detail.evolutionChain?.name).toBe('eevee')
      const names = detail.evolutionChain?.evolvesTo.map((e) => e.name) ?? []
      expect(names).toEqual(
        expect.arrayContaining([
          'vaporeon', 'jolteon', 'flareon', 'espeon',
          'umbreon', 'leafeon', 'glaceon', 'sylveon',
        ]),
      )
      expect(names).toHaveLength(8)
    })

    it('captures a real official-artwork url and a non-empty movepool', () => {
      expect(detail.varieties[0].sprites.officialArtwork).toContain('official-artwork')
      expect(detail.varieties[0].moves.length).toBeGreaterThan(0)
      expect(detail.varieties[0].moves.every((m) => typeof m.learnMethod === 'string')).toBe(true)
    })
  })

  describe('Charizard (multiple varieties)', () => {
    // species.varieties lists 4 forms; we provide the default + Mega X, so the
    // transform maps exactly those two (missing forms are skipped).
    const detail = buildSpeciesDetail(charizardSpecies, [charizard, charizardMegaX], null)

    it('maps each provided variety with its own types/flags', () => {
      expect(detail.varieties).toHaveLength(2)
      expect(detail.varieties[0]).toMatchObject({
        name: 'charizard',
        isDefault: true,
        types: ['fire', 'flying'],
      })
      expect(detail.varieties[1]).toMatchObject({
        name: 'charizard-mega-x',
        isDefault: false,
        types: ['fire', 'dragon'],
      })
    })

    it('summarizes the species for the index from its default variety', () => {
      expect(buildIndexEntry(charizardSpecies, charizard)).toEqual({
        dex: 6,
        name: 'charizard',
        types: ['fire', 'flying'],
        generation: 1,
        statTotal: 534,
        thumbnail: expect.stringContaining('official-artwork'),
        thumbnailShiny: expect.stringContaining('official-artwork/shiny'),
      })
    })
  })
})
