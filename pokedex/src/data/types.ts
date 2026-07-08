// The snapshot contract — the shapes the build-time generator writes and the
// app reads. Single source of truth for both sides (the generator's
// scripts/snapshot/schema.ts re-exports these).

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
