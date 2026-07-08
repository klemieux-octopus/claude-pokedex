import type { SpeciesIndexEntry } from './data/types'
import { typeColor } from './ui/typeColors'
import { dexLabel } from './ui/format'

interface Props {
  species: SpeciesIndexEntry[]
  selectedDex: number | null
  onSelect: (dex: number) => void
}

export function SpeciesList({ species, selectedDex, onSelect }: Props) {
  return (
    <ul className="species-list" aria-label="Pokémon">
      {species.map((s) => (
        <li key={s.dex}>
          <button
            type="button"
            className="species-row"
            aria-current={s.dex === selectedDex ? 'true' : undefined}
            onClick={() => onSelect(s.dex)}
          >
            {s.thumbnail ? (
              <img
                className="species-thumb"
                src={s.thumbnail}
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
      ))}
    </ul>
  )
}
