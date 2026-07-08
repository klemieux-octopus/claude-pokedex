import type { SpeciesDetail, Stats, Variety } from './data/types'
import { dexLabel, metric } from './ui/format'
import { typeColor } from './ui/typeColors'
import { pickArtwork } from './ui/artwork'
import { TypeBadge } from './ui/components/TypeBadge'
import { StatBar } from './ui/components/StatBar'
import { Badge } from './ui/components/Badge'

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

// Volet de détail — contenu complet (#42), habillé avec le design system (#45) :
// héro dans un cadre teinté du type, TypeBadge, StatBar et Badge. Présentation
// pure sur la variété par défaut ; aucune récupération de données ici.
export function DetailPane({ detail, shiny, shinyHeroUrl }: Props) {
  const variety = defaultVariety(detail)
  const hero = pickArtwork(shiny, shinyHeroUrl, variety.sprites.officialArtwork)
  const primary = typeColor(variety.types[0])
  const total = STAT_ROWS.reduce((sum, [key]) => sum + variety.stats[key], 0)
  // Mythique l'emporte sur légendaire ; aucun badge quand ni l'un ni l'autre.
  const rarity = detail.isMythical ? 'Mythique' : detail.isLegendary ? 'Légendaire' : null

  return (
    <article className="detail">
      <div
        className="detail-hero"
        style={{
          background: `linear-gradient(160deg, color-mix(in srgb, ${primary} 45%, white), color-mix(in srgb, ${primary} 12%, white))`,
        }}
      >
        {hero ? (
          <img src={hero} alt={detail.name} width={200} height={200} />
        ) : (
          <div className="detail-hero--empty" aria-hidden="true" />
        )}
      </div>

      <div className="detail-head">
        <span className="detail-num num">{dexLabel(detail.dex)}</span>
        <h2 className="detail-name">{detail.name}</h2>
        {rarity && (
          <Badge tone={detail.isMythical ? 'accent' : 'brand'} className="detail-rarity">
            {rarity}
          </Badge>
        )}
      </div>

      <div className="types">
        {variety.types.map((t) => (
          <TypeBadge key={t} type={t} size="md" />
        ))}
      </div>

      <p className="detail-flavor">{detail.flavorText}</p>

      <section className="stats" aria-label="Statistiques de base">
        <h3 className="detail-section-title">Stats de base</h3>
        {STAT_ROWS.map(([key, label]) => (
          <StatBar key={key} label={label} value={variety.stats[key]} max={STAT_MAX} color={primary} />
        ))}
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
              {a.isHidden && (
                <Badge tone="neutral" className="ability-hidden">
                  Caché
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </section>

      <dl className="physique">
        <div>
          <dt>Taille</dt>
          <dd className="num">{metric(variety.height, 'm')}</dd>
        </div>
        <div>
          <dt>Poids</dt>
          <dd className="num">{metric(variety.weight, 'kg')}</dd>
        </div>
        <div>
          <dt>Génération</dt>
          <dd>{`Gen ${detail.generation}`}</dd>
        </div>
      </dl>
    </article>
  )
}
