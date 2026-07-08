// Pure transforms: PokéAPI REST shapes → the snapshot schema. No I/O here —
// this is the tested seam. The fetch layer feeds raw objects in; the app reads
// the objects out.

import type {
  Ability,
  EvolutionNode,
  Move,
  RawEvolutionChain,
  RawPokemon,
  RawSpecies,
  SpeciesDetail,
  SpeciesIndexEntry,
  Sprites,
  Stats,
  Variety,
} from './schema'

const ROMAN_TO_NUMBER: Record<string, number> = {
  i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9,
}

/** "generation-iii" → 3. Returns 0 for anything unrecognized. */
export function generationNumber(name: string): number {
  const roman = name.replace(/^generation-/, '')
  return ROMAN_TO_NUMBER[roman] ?? 0
}

/** Trailing id from a PokéAPI resource url, e.g. ".../pokemon-species/25/" → 25. */
export function idFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  return match ? Number(match[1]) : 0
}

function englishFlavorText(species: RawSpecies): string {
  const entry = species.flavor_text_entries.find((e) => e.language.name === 'en')
  if (!entry) return ''
  // PokéAPI flavor text is littered with \f, \n, and soft hyphens from the games.
  return entry.flavor_text.replace(/\s+/g, ' ').trim()
}

const STAT_KEY: Record<string, keyof Stats> = {
  hp: 'hp',
  attack: 'attack',
  defense: 'defense',
  'special-attack': 'specialAttack',
  'special-defense': 'specialDefense',
  speed: 'speed',
}

function mapStats(p: RawPokemon): Stats {
  const stats: Stats = {
    hp: 0, attack: 0, defense: 0, specialAttack: 0, specialDefense: 0, speed: 0,
  }
  for (const s of p.stats) {
    const key = STAT_KEY[s.stat.name]
    if (key) stats[key] = s.base_stat
  }
  return stats
}

export function statTotal(stats: Stats): number {
  return Object.values(stats).reduce((sum, value) => sum + value, 0)
}

function mapTypes(p: RawPokemon): string[] {
  return [...p.types].sort((a, b) => a.slot - b.slot).map((t) => t.type.name)
}

function mapAbilities(p: RawPokemon): Ability[] {
  return p.abilities.map((a) => ({ name: a.ability.name, isHidden: a.is_hidden }))
}

/**
 * One entry per move. A move often repeats across version groups; keep the
 * first learn method seen, preferring a level-up level over 0.
 */
function mapMoves(p: RawPokemon): Move[] {
  return p.moves
    .map((m): Move => {
      const detail =
        m.version_group_details.find((d) => d.level_learned_at > 0) ??
        m.version_group_details[0]
      const learnMethod = detail?.move_learn_method.name ?? 'unknown'
      const level = detail && detail.level_learned_at > 0 ? detail.level_learned_at : null
      return { name: m.move.name, learnMethod, level }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

function officialArtwork(p: RawPokemon): string | null {
  return p.sprites.other?.['official-artwork']?.front_default ?? null
}

function officialArtworkShiny(p: RawPokemon): string | null {
  return p.sprites.other?.['official-artwork']?.front_shiny ?? null
}

function mapSprites(p: RawPokemon): Sprites {
  return {
    default: p.sprites.front_default,
    shiny: p.sprites.front_shiny,
    officialArtwork: officialArtwork(p),
  }
}

function mapVariety(p: RawPokemon, isDefault: boolean): Variety {
  return {
    name: p.name,
    isDefault,
    types: mapTypes(p),
    stats: mapStats(p),
    abilities: mapAbilities(p),
    height: p.height,
    weight: p.weight,
    moves: mapMoves(p),
    sprites: mapSprites(p),
  }
}

export function buildEvolutionTree(
  chain: RawEvolutionChain | null,
): EvolutionNode | null {
  if (!chain) return null
  const walk = (link: RawEvolutionChain['chain']): EvolutionNode => ({
    dex: idFromUrl(link.species.url),
    name: link.species.name,
    evolvesTo: link.evolves_to.map(walk),
  })
  return walk(chain.chain)
}

export function buildIndexEntry(
  species: RawSpecies,
  defaultPokemon: RawPokemon,
): SpeciesIndexEntry {
  return {
    dex: species.id,
    name: species.name,
    types: mapTypes(defaultPokemon),
    generation: generationNumber(species.generation.name),
    statTotal: statTotal(mapStats(defaultPokemon)),
    thumbnail: officialArtwork(defaultPokemon),
    thumbnailShiny: officialArtworkShiny(defaultPokemon),
  }
}

export function buildSpeciesDetail(
  species: RawSpecies,
  varieties: RawPokemon[],
  chain: RawEvolutionChain | null,
): SpeciesDetail {
  const byName = new Map(varieties.map((p) => [p.name, p]))
  const mappedVarieties: Variety[] = species.varieties
    .map((entry) => {
      const p = byName.get(entry.pokemon.name)
      return p ? mapVariety(p, entry.is_default) : null
    })
    .filter((v): v is Variety => v !== null)

  return {
    dex: species.id,
    name: species.name,
    generation: generationNumber(species.generation.name),
    isLegendary: species.is_legendary,
    isMythical: species.is_mythical,
    flavorText: englishFlavorText(species),
    evolutionChain: buildEvolutionTree(chain),
    varieties: mappedVarieties,
  }
}

/** Find the default variety's pokemon name for a species (for the index). */
export function defaultVarietyName(species: RawSpecies): string | undefined {
  return species.varieties.find((v) => v.is_default)?.pokemon.name
}
