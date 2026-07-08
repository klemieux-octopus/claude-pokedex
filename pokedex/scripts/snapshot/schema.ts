// The snapshot schema — the contract between the build-time generator and the
// runtime app. The app reads these shapes; PokéAPI is never called at runtime.

// ---- Output: what the app consumes ----
// The output types are defined once in the app (the runtime contract) and
// re-exported here so the generator and the app can never drift apart.
export type {
  Ability,
  EvolutionNode,
  Move,
  SpeciesDetail,
  SpeciesIndexEntry,
  Sprites,
  Stats,
  Variety,
} from '../../src/data/types'

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
