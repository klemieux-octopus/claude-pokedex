import { ListControls } from './ListControls'
import { SpeciesList } from './SpeciesList'
import { DetailPane } from './DetailPane'
import { useSpeciesIndex } from './data/useSpeciesIndex'
import { useSpeciesDetail } from './data/useSpeciesDetail'
import { useSelectedDex } from './hooks/useSelectedDex'
import { useListControls } from './hooks/useListControls'
import { filterAndSort } from './data/filterSort'

export default function App() {
  const index = useSpeciesIndex()
  const [selectedDex, setSelectedDex] = useSelectedDex()
  const listControls = useListControls()
  const detail = useSpeciesDetail(selectedDex)

  const all = index.status === 'ready' ? index.species : []
  const visible = filterAndSort(all, listControls.controls)

  // L'artwork shiny de l'espèce vit dans l'entrée d'index (thumbnailShiny) ;
  // on le transmet au volet pour que le héro respecte le toggle shiny.
  const shinyHeroUrl = all.find((s) => s.dex === selectedDex)?.thumbnailShiny ?? null

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

        <section className="detail-pane" aria-label="Détails">
          {detail.status === 'idle' && (
            <p className="notice">Sélectionne un Pokémon pour voir son détail.</p>
          )}
          {detail.status === 'loading' && <p className="notice">Chargement du détail…</p>}
          {detail.status === 'notfound' && <p className="notice">Pokémon introuvable.</p>}
          {detail.status === 'error' && (
            <p className="notice notice--error" role="alert">
              Échec du chargement du détail : {detail.message}
            </p>
          )}
          {detail.status === 'ready' && (
            <DetailPane
              detail={detail.detail}
              shiny={listControls.controls.shiny}
              shinyHeroUrl={shinyHeroUrl}
            />
          )}
        </section>
      </div>
    </div>
  )
}
