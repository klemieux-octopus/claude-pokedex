import { ListControls } from './ListControls'
import { SpeciesList } from './SpeciesList'
import { useSpeciesIndex } from './data/useSpeciesIndex'
import { useSelectedDex } from './hooks/useSelectedDex'
import { useListControls } from './hooks/useListControls'
import { filterAndSort } from './data/filterSort'
import { dexLabel } from './ui/format'

export default function App() {
  const index = useSpeciesIndex()
  const [selectedDex, setSelectedDex] = useSelectedDex()
  const listControls = useListControls()

  const all = index.status === 'ready' ? index.species : []
  const visible = filterAndSort(all, listControls.controls)

  return (
    <div className="app">
      <header className="masthead">
        <span className="dot" aria-hidden="true" />
        <h1>Pokédex</h1>
      </header>

      <div className="browser">
        <section className="list-pane" aria-label="Species list">
          {index.status === 'loading' && <p className="notice">Loading Pokédex…</p>}
          {index.status === 'error' && (
            <p className="notice notice--error" role="alert">
              Couldn’t load the Pokédex: {index.message}
            </p>
          )}
          {index.status === 'ready' && (
            <>
              <ListControls {...listControls} matchCount={visible.length} total={all.length} />
              {visible.length === 0 ? (
                <p className="notice">No Pokémon match your filters.</p>
              ) : (
                <SpeciesList
                  species={visible}
                  selectedDex={selectedDex}
                  shiny={listControls.controls.shiny}
                  onSelect={setSelectedDex}
                />
              )}
            </>
          )}
        </section>

        <section className="detail-pane" aria-label="Details">
          {/* The detail pane's contents land in ticket #13. */}
          <p className="notice">
            {selectedDex
              ? `${dexLabel(selectedDex)} selected — details coming soon.`
              : 'Select a Pokémon to see its details.'}
          </p>
        </section>
      </div>
    </div>
  )
}
