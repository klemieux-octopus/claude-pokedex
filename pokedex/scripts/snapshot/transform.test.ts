import {
  buildEvolutionTree,
  buildIndexEntry,
  buildSpeciesDetail,
  generationNumber,
} from './transform'
import type {
  RawEvolutionChain,
  RawPokemon,
  RawSpecies,
} from './schema'

const ref = (name: string, url = '') => ({ name, url })

function pokemon(overrides: Partial<RawPokemon>): RawPokemon {
  return {
    id: 1,
    name: 'x',
    height: 10,
    weight: 100,
    types: [{ slot: 1, type: ref('normal') }],
    stats: [
      { base_stat: 10, stat: ref('hp') },
      { base_stat: 20, stat: ref('attack') },
      { base_stat: 30, stat: ref('defense') },
      { base_stat: 40, stat: ref('special-attack') },
      { base_stat: 50, stat: ref('special-defense') },
      { base_stat: 60, stat: ref('speed') },
    ],
    abilities: [{ ability: ref('overgrow'), is_hidden: false }],
    moves: [],
    sprites: { front_default: 'd.png', front_shiny: 's.png' },
    ...overrides,
  }
}

// --- Eevee: branching evolution + hidden ability + move learn methods ---
const eeveeSpecies: RawSpecies = {
  id: 133,
  name: 'eevee',
  generation: ref('generation-i'),
  is_legendary: false,
  is_mythical: false,
  flavor_text_entries: [
    { flavor_text: 'Its genetic code\fis\nirregular.', language: ref('en') },
    { flavor_text: 'Ignore me', language: ref('fr') },
  ],
  varieties: [{ is_default: true, pokemon: ref('eevee', '/pokemon/133/') }],
  evolution_chain: { url: '/evolution-chain/67/' },
}
const eeveePokemon = pokemon({
  id: 133,
  name: 'eevee',
  types: [{ slot: 1, type: ref('normal') }],
  abilities: [
    { ability: ref('run-away'), is_hidden: false },
    { ability: ref('adaptability'), is_hidden: true },
  ],
  moves: [
    {
      move: ref('tackle'),
      version_group_details: [
        { level_learned_at: 1, move_learn_method: ref('level-up') },
      ],
    },
    {
      move: ref('swift'),
      version_group_details: [
        { level_learned_at: 0, move_learn_method: ref('machine') },
      ],
    },
  ],
  sprites: {
    front_default: 'd.png',
    front_shiny: 's.png',
    other: { 'official-artwork': { front_default: 'art.png', front_shiny: 'art-s.png' } },
  },
})
const eeveeChain: RawEvolutionChain = {
  chain: {
    species: ref('eevee', '/pokemon-species/133/'),
    evolves_to: [
      { species: ref('vaporeon', '/pokemon-species/134/'), evolves_to: [] },
      { species: ref('jolteon', '/pokemon-species/135/'), evolves_to: [] },
      { species: ref('flareon', '/pokemon-species/136/'), evolves_to: [] },
    ],
  },
}

// --- Charizard: multi-variety (default + Mega X with different type/stats) ---
const charizardSpecies: RawSpecies = {
  id: 6,
  name: 'charizard',
  generation: ref('generation-i'),
  is_legendary: false,
  is_mythical: false,
  flavor_text_entries: [{ flavor_text: 'Spits fire.', language: ref('en') }],
  varieties: [
    { is_default: true, pokemon: ref('charizard', '/pokemon/6/') },
    { is_default: false, pokemon: ref('charizard-mega-x', '/pokemon/10034/') },
  ],
  evolution_chain: { url: '/evolution-chain/2/' },
}
const charizardDefault = pokemon({
  id: 6,
  name: 'charizard',
  types: [{ slot: 1, type: ref('fire') }, { slot: 2, type: ref('flying') }],
  sprites: {
    front_default: 'char.png',
    front_shiny: 'char-s.png',
    other: { 'official-artwork': { front_default: 'char-art.png', front_shiny: null } },
  },
})
const charizardMegaX = pokemon({
  id: 10034,
  name: 'charizard-mega-x',
  types: [{ slot: 1, type: ref('fire') }, { slot: 2, type: ref('dragon') }],
})

describe('generationNumber', () => {
  it('maps roman-numeral generation names to numbers', () => {
    expect(generationNumber('generation-i')).toBe(1)
    expect(generationNumber('generation-ix')).toBe(9)
  })
})

describe('buildEvolutionTree', () => {
  it('builds a branching tree with dex numbers parsed from species urls', () => {
    expect(buildEvolutionTree(eeveeChain)).toEqual({
      dex: 133,
      name: 'eevee',
      evolvesTo: [
        { dex: 134, name: 'vaporeon', evolvesTo: [] },
        { dex: 135, name: 'jolteon', evolvesTo: [] },
        { dex: 136, name: 'flareon', evolvesTo: [] },
      ],
    })
  })

  it('returns null when there is no chain', () => {
    expect(buildEvolutionTree(null)).toBeNull()
  })
})

describe('buildSpeciesDetail', () => {
  const eevee = buildSpeciesDetail(eeveeSpecies, [eeveePokemon], eeveeChain)

  it('maps species-level fields and normalizes English flavor text', () => {
    expect(eevee.dex).toBe(133)
    expect(eevee.generation).toBe(1)
    expect(eevee.isLegendary).toBe(false)
    expect(eevee.flavorText).toBe('Its genetic code is irregular.')
  })

  it('maps the default variety: stats, hidden abilities, moves, sprites', () => {
    expect(eevee.varieties).toHaveLength(1)
    const v = eevee.varieties[0]
    expect(v.isDefault).toBe(true)
    expect(v.types).toEqual(['normal'])
    expect(v.stats.specialAttack).toBe(40)
    expect(v.abilities).toContainEqual({ name: 'adaptability', isHidden: true })
    expect(v.moves).toContainEqual({ name: 'tackle', learnMethod: 'level-up', level: 1 })
    expect(v.moves).toContainEqual({ name: 'swift', learnMethod: 'machine', level: null })
    expect(v.sprites.officialArtwork).toBe('art.png')
  })

  it('carries the branching evolution chain', () => {
    expect(eevee.evolutionChain?.evolvesTo).toHaveLength(3)
  })

  it('maps multiple varieties, each with its own type/stats', () => {
    const char = buildSpeciesDetail(
      charizardSpecies,
      [charizardDefault, charizardMegaX],
      null,
    )
    expect(char.varieties).toHaveLength(2)
    expect(char.varieties[0]).toMatchObject({ name: 'charizard', isDefault: true, types: ['fire', 'flying'] })
    expect(char.varieties[1]).toMatchObject({ name: 'charizard-mega-x', isDefault: false, types: ['fire', 'dragon'] })
  })
})

describe('buildIndexEntry', () => {
  it('summarizes a species for the list from its default variety', () => {
    expect(buildIndexEntry(charizardSpecies, charizardDefault)).toEqual({
      dex: 6,
      name: 'charizard',
      types: ['fire', 'flying'],
      generation: 1,
      statTotal: 210, // 10+20+30+40+50+60
      thumbnail: 'char-art.png',
    })
  })
})

describe('missing/edge fields degrade gracefully', () => {
  const bare: RawSpecies = {
    id: 999,
    name: 'missingno',
    generation: ref('generation-i'),
    is_legendary: false,
    is_mythical: false,
    flavor_text_entries: [], // no English entry
    varieties: [{ is_default: true, pokemon: ref('missingno', '/pokemon/999/') }],
    evolution_chain: null, // no chain
  }
  const barePokemon = pokemon({
    id: 999,
    name: 'missingno',
    sprites: { front_default: null, front_shiny: null }, // no official artwork
  })

  it('produces empty flavor text, no artwork, and a null chain', () => {
    const detail = buildSpeciesDetail(bare, [barePokemon], null)
    expect(detail.flavorText).toBe('')
    expect(detail.evolutionChain).toBeNull()
    expect(detail.varieties[0].sprites.officialArtwork).toBeNull()
  })

  it('yields a null thumbnail in the index when artwork is absent', () => {
    expect(buildIndexEntry(bare, barePokemon).thumbnail).toBeNull()
  })
})
