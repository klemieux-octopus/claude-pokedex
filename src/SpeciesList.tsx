import type { SpeciesIndexEntry } from './data/types'
import { typeColor } from './ui/typeColors'
import { dexLabel } from './ui/format'
import { pickArtwork } from './ui/artwork'

interface Props {
  species: SpeciesIndexEntry[]
  selectedDex: number | null
  shiny: boolean
  onSelect: (dex: number) => void
}

export function SpeciesList({ species, selectedDex, shiny, onSelect }: Props) {
  return (
    <ul className="species-list" aria-label="Pokémon">
      {species.map((s) => {
        const thumb = pickArtwork(shiny, s.thumbnailShiny, s.thumbnail)
        return (
        <li key={s.dex}>
          <button
            type="button"
            className="species-row"
            aria-current={s.dex === selectedDex ? 'true' : undefined}
            onClick={() => onSelect(s.dex)}
          >
            {thumb ? (
              <img
                className="species-thumb"
                src={thumb}
                alt=""
                width={48}
                height={48}
                loading="lazy"
              />
            ) : (
              <span className="species-thumb species-thumb--empty" aria-hidden="true" />
            )}
            <span className="species-num">{dexLabel(s.dex)}</span>
            <span className="species-name">{s.name}</span>
            <span className="species-types">
              {s.types.map((t) => (
                <span key={t} className="type-badge" style={{ background: typeColor(t) }}>
                  {t}
                </span>
              ))}
            </span>
          </button>
        </li>
        )
      })}
    </ul>
  )
}
