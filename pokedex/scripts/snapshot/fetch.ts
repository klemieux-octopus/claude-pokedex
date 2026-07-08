// I/O layer: pulls raw resources from PokéAPI (REST). Kept separate from the
// pure transform so the transform can be unit-tested without the network.
// Runs only at build time — the deployed app never imports this.

import type { RawEvolutionChain, RawPokemon, RawSpecies } from './schema'

const BASE = 'https://pokeapi.co/api/v2'

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`PokéAPI ${res.status} for ${url}`)
  }
  return (await res.json()) as T
}

/** Total number of species in the National Pokédex (from the list endpoint). */
export async function getSpeciesCount(): Promise<number> {
  const data = await getJson<{ count: number }>(`${BASE}/pokemon-species?limit=1`)
  return data.count
}

export function getSpecies(dex: number): Promise<RawSpecies> {
  return getJson<RawSpecies>(`${BASE}/pokemon-species/${dex}`)
}

export function getPokemon(nameOrId: string | number): Promise<RawPokemon> {
  return getJson<RawPokemon>(`${BASE}/pokemon/${nameOrId}`)
}

export function getEvolutionChain(url: string): Promise<RawEvolutionChain> {
  return getJson<RawEvolutionChain>(url)
}

/** Run `tasks` with at most `concurrency` in flight, preserving input order. */
export async function pooled<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  async function run(): Promise<void> {
    while (next < items.length) {
      const i = next++
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, run),
  )
  return results
}
