import { hasActiveControls, type SortKey } from './data/filterSort'
import type { ListControlsApi } from './hooks/useListControls'
import { TYPE_COLORS, typeTextColor } from './ui/typeColors'
import { SearchInput } from './ui/components/SearchInput'
import { Toggle } from './ui/components/Toggle'
import { Button } from './ui/components/Button'

const TYPES = Object.keys(TYPE_COLORS)
const GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface Props extends ListControlsApi {
  matchCount: number
  total: number
}

export function ListControls({
  controls,
  setQuery,
  setType,
  setGen,
  setSort,
  setShiny,
  clear,
  matchCount,
  total,
}: Props) {
  return (
    <div className="controls">
      <SearchInput
        type="search"
        placeholder="Search name or №"
        aria-label="Search Pokémon by name or number"
        icon={<span aria-hidden="true">⌕</span>}
        style={{ width: '100%' }}
        value={controls.q}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="controls-row">
        <label className="control-field">
          <span>Gen</span>
          <select
            aria-label="Filter by generation"
            value={controls.gen ?? ''}
            onChange={(e) => setGen(e.target.value === '' ? null : Number(e.target.value))}
          >
            <option value="">All</option>
            {GENERATIONS.map((g) => (
              <option key={g} value={g}>
                Gen {g}
              </option>
            ))}
          </select>
        </label>

        <label className="control-field">
          <span>Sort</span>
          <select
            aria-label="Sort order"
            value={controls.sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
          >
            <option value="dex">Dex №</option>
            <option value="name">Name A–Z</option>
            <option value="total">Stat total</option>
          </select>
        </label>

        <Toggle checked={controls.shiny} onChange={setShiny} label="Shiny" />

        {hasActiveControls(controls) && (
          <Button type="button" variant="neutral" size="sm" className="control-clear" onClick={clear}>
            Clear
          </Button>
        )}
      </div>

      <div className="controls-types" role="group" aria-label="Filter by type">
        <button
          type="button"
          className="type-chip"
          aria-pressed={controls.type === null}
          onClick={() => setType(null)}
        >
          all
        </button>
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            className="type-chip"
            aria-pressed={controls.type === t}
            style={
              controls.type === t
                ? { background: TYPE_COLORS[t], color: typeTextColor(t), borderColor: 'transparent' }
                : undefined
            }
            onClick={() => setType(controls.type === t ? null : t)}
          >
            {t}
          </button>
        ))}
      </div>

      <p className="controls-count" aria-live="polite">
        {matchCount} of {total}
      </p>
    </div>
  )
}
