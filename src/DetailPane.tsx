import type { SpeciesDetail, Variety } from './data/types'
import { dexLabel } from './ui/format'
import { typeColor } from './ui/typeColors'
import { pickArtwork } from './ui/artwork'

/** La variété par défaut de l'espèce (sinon la première). */
function defaultVariety(detail: SpeciesDetail): Variety {
  return detail.varieties.find((v) => v.isDefault) ?? detail.varieties[0]
}

interface Props {
  detail: SpeciesDetail
  shiny: boolean
  /** URL de l'artwork shiny de l'espèce (index `thumbnailShiny`), fournie par App. */
  shinyHeroUrl: string | null
}

// Volet de détail — squelette (#41) : héro + nom + numéro dex + types.
// Le contenu riche (stats, capacités, physique, badges) arrive en #42.
export function DetailPane({ detail, shiny, shinyHeroUrl }: Props) {
  const variety = defaultVariety(detail)
  const hero = pickArtwork(shiny, shinyHeroUrl, variety.sprites.officialArtwork)

  return (
    <article className="detail">
      <div className="detail-hero">
        {hero ? (
          <img src={hero} alt={detail.name} width={180} height={180} />
        ) : (
          <div className="detail-hero--empty" aria-hidden="true" />
        )}
      </div>

      <div className="detail-head">
        <span className="detail-num num">{dexLabel(detail.dex)}</span>
        <h2 className="detail-name">{detail.name}</h2>
      </div>

      <div className="types">
        {variety.types.map((t) => (
          <span key={t} className="type-badge" style={{ background: typeColor(t) }}>
            {t}
          </span>
        ))}
      </div>
    </article>
  )
}
