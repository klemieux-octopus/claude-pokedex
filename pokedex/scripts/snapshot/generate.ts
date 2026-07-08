// Build-time CLI: fetch the National Pokédex from PokéAPI and write the static
// snapshot the app consumes. Run with `npm run generate` (optionally
// `-- --limit N` for a quick subset). Never runs in the deployed app.

import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import {
  getEvolutionChain,
  getPokemon,
  getSpecies,
  getSpeciesCount,
  pooled,
} from './fetch'
import {
  buildIndexEntry,
  buildSpeciesDetail,
  defaultVarietyName,
} from './transform'
import type { RawEvolutionChain, SpeciesIndexEntry } from './schema'

const OUT_DIR = resolve(process.cwd(), 'public/data')
const CONCURRENCY = 8
const VARIETY_CONCURRENCY = 4

function parseLimit(argv: string[]): number | null {
  const i = argv.indexOf('--limit')
  if (i !== -1 && argv[i + 1]) return Number(argv[i + 1])
  return null
}

async function buildOneSpecies(dex: number): Promise<SpeciesIndexEntry> {
  const species = await getSpecies(dex)

  const varieties = await pooled(species.varieties, VARIETY_CONCURRENCY, (v) =>
    getPokemon(v.pokemon.name),
  )

  let chain: RawEvolutionChain | null = null
  if (species.evolution_chain?.url) {
    chain = await getEvolutionChain(species.evolution_chain.url)
  }

  const detail = buildSpeciesDetail(species, varieties, chain)
  await writeFile(
    resolve(OUT_DIR, 'species', `${dex}.json`),
    JSON.stringify(detail),
  )

  const defaultName = defaultVarietyName(species)
  const defaultPokemon =
    varieties.find((p) => p.name === defaultName) ?? varieties[0]
  return buildIndexEntry(species, defaultPokemon)
}

async function main(): Promise<void> {
  const limit = parseLimit(process.argv.slice(2))
  const count = limit ?? (await getSpeciesCount())
  console.log(`Generating snapshot for ${count} species → ${OUT_DIR}`)

  await mkdir(resolve(OUT_DIR, 'species'), { recursive: true })

  const dexNumbers = Array.from({ length: count }, (_, i) => i + 1)
  let done = 0
  const index = await pooled(dexNumbers, CONCURRENCY, async (dex) => {
    const entry = await buildOneSpecies(dex)
    done += 1
    if (done % 50 === 0 || done === count) {
      console.log(`  ${done}/${count}`)
    }
    return entry
  })

  index.sort((a, b) => a.dex - b.dex)
  await writeFile(resolve(OUT_DIR, 'index.json'), JSON.stringify(index))
  console.log(`Wrote index.json (${index.length}) + ${index.length} detail files.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
