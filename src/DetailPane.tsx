import type { SpeciesDetail, Stats, Variety } from './data/types'
import { dexLabel, metric } from './ui/format'
import { typeColor } from './ui/typeColors'
import { pickArtwork } from './ui/artwork'

// Échelle fixe des barres de stat : la stat de base maximale du jeu. Une barre
// pleine = 255, pour que la longueur soit comparable d'un Pokémon à l'autre.
const STAT_MAX = 255

// Les six stats de base, dans l'ordre d'affichage, avec leur libellé.
const STAT_ROWS: [keyof Stats, string][] = [
  ['hp', 'PV'],
  ['attack', 'Attaque'],
  ['defense', 'Défense'],
  ['specialAttack', 'Att. Spé.'],
  ['specialDefense', 'Déf. Spé.'],
  ['speed', 'Vitesse'],
]

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

// Volet de détail — contenu complet (#42) : héro + nom + numéro dex + types,
// puis flavor text, stats de base, capacités et physique. Présentation pure sur
// la variété par défaut ; aucune récupération de données ici.
export function DetailPane({ detail, shiny, shinyHeroUrl }: Props) {
  const variety = defaultVariety(detail)
  const hero = pickArtwork(shiny, shinyHeroUrl, variety.sprites.officialArtwork)
  const primary = typeColor(variety.types[0])
  const total = STAT_ROWS.reduce((sum, [key]) => sum + variety.stats[key], 0)
  // Mythique l'emporte sur légendaire ; aucun badge quand ni l'un ni l'autre.
  const rarity = detail.isMythical ? 'Mythique' : detail.isLegendary ? 'Légendaire' : null

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
        {rarity && <span className="detail-rarity">{rarity}</span>}
      </div>

      <div className="types">
        {variety.types.map((t) => (
          <span key={t} className="type-badge" style={{ background: typeColor(t) }}>
            {t}
          </span>
        ))}
      </div>

      <p className="detail-flavor">{detail.flavorText}</p>

      <section className="stats" aria-label="Statistiques de base">
        {STAT_ROWS.map(([key, label]) => {
          const value = variety.stats[key]
          return (
            <div className="stat-row" key={key}>
              <span className="stat-label">{label}</span>
              <div
                className="stat-bar"
                role="progressbar"
                aria-label={label}
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={STAT_MAX}
              >
                <div
                  className="stat-fill"
                  style={{ width: `${(value / STAT_MAX) * 100}%`, background: primary }}
                />
              </div>
              <span className="stat-val num">{value}</span>
            </div>
          )
        })}
        <div className="stat-row stat-row--total">
          <span className="stat-label">Total</span>
          <span className="stat-val num">{total}</span>
        </div>
      </section>

      <section className="abilities" aria-label="Capacités">
        <h3 className="detail-section-title">Capacités</h3>
        <ul className="ability-list">
          {variety.abilities.map((a) => (
            <li key={a.name} className="ability">
              <span className="ability-name">{a.name}</span>
              {a.isHidden && <span className="ability-hidden">Caché</span>}
            </li>
          ))}
        </ul>
      </section>

      <dl className="physique">
        <div>
          <dt>Taille</dt>
          <dd>{metric(variety.height, 'm')}</dd>
        </div>
        <div>
          <dt>Poids</dt>
          <dd>{metric(variety.weight, 'kg')}</dd>
        </div>
        <div>
          <dt>Génération</dt>
          <dd>{`Gen ${detail.generation}`}</dd>
        </div>
      </dl>
    </article>
  )
}
