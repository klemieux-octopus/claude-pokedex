// The snapshot schema — the contract between the build-time generator and the
// runtime app. The app reads these shapes; PokéAPI is never called at runtime.

// ---- Output: what the app consumes ----

/** One row in the master list. Small: everything the browse list needs. */
export interface SpeciesIndexEntry {
  dex: number
  name: string
  types: string[]
  generation: number
  statTotal: number
  thumbnail: string | null
}

export interface Stats {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface Ability {
  name: string
  isHidden: boolean
}

export interface Move {
  name: string
  learnMethod: string
  level: number | null
}

export interface Sprites {
  default: string | null
  shiny: string | null
  officialArtwork: string | null
}

/** A concrete form/variety of a species (default, Mega, regional, …). */
export interface Variety {
  name: string
  isDefault: boolean
  types: string[]
  stats: Stats
  abilities: Ability[]
  height: number
  weight: number
  moves: Move[]
  sprites: Sprites
}

export interface EvolutionNode {
  dex: number
  name: string
  evolvesTo: EvolutionNode[]
}

/** The full detail document for one species, fetched on demand by the app. */
export interface SpeciesDetail {
  dex: number
  name: string
  generation: number
  isLegendary: boolean
  isMythical: boolean
  flavorText: string
  evolutionChain: EvolutionNode | null
  varieties: Variety[]
}

// ---- Input: the subset of PokéAPI REST shapes the transform reads ----

export interface RawNamedRef {
  name: string
  url: string
}

export interface RawSpecies {
  id: number
  name: string
  generation: RawNamedRef
  is_legendary: boolean
  is_mythical: boolean
  flavor_text_entries: { flavor_text: string; language: RawNamedRef }[]
  varieties: { is_default: boolean; pokemon: RawNamedRef }[]
  evolution_chain: { url: string } | null
}

export interface RawPokemon {
  id: number
  name: string
  height: number
  weight: number
  types: { slot: number; type: RawNamedRef }[]
  stats: { base_stat: number; stat: RawNamedRef }[]
  abilities: { ability: RawNamedRef; is_hidden: boolean }[]
  moves: {
    move: RawNamedRef
    version_group_details: {
      level_learned_at: number
      move_learn_method: RawNamedRef
    }[]
  }[]
  sprites: {
    front_default: string | null
    front_shiny: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
        front_shiny: string | null
      }
    }
  }
}

export interface RawChainLink {
  species: RawNamedRef
  evolves_to: RawChainLink[]
}

export interface RawEvolutionChain {
  chain: RawChainLink
}
