import React from 'react';
import { TypeBadge } from './TypeBadge.jsx';

const TYPE_TINT = {
  normal: '--type-normal', fire: '--type-fire', water: '--type-water', grass: '--type-grass',
  electric: '--type-electric', ice: '--type-ice', fighting: '--type-fighting', poison: '--type-poison',
  ground: '--type-ground', flying: '--type-flying', psychic: '--type-psychic', bug: '--type-bug',
  rock: '--type-rock', ghost: '--type-ghost', dragon: '--type-dragon', dark: '--type-dark',
  steel: '--type-steel', fairy: '--type-fairy',
};

/**
 * PokemonCard — the iconic entry tile. Type-tinted panel, dex number in mono,
 * name in rounded display, a sprite slot, and type chips.
 * Provide your own creature art via `sprite`; otherwise a neutral silhouette shows.
 */
export function PokemonCard({
  number = 1,
  name = 'Unknown',
  types = ['normal'],
  sprite = null,
  selected = false,
  onClick,
  style = {},
}) {
  const tint = TYPE_TINT[String(types[0]).toLowerCase()] || TYPE_TINT.normal;
  const dex = '#' + String(number).padStart(4, '0');
  return (
    <button
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        textAlign: 'left',
        padding: 16,
        border: selected ? '3px solid var(--ink-900)' : '3px solid transparent',
        borderRadius: 'var(--r-lg)',
        background: `linear-gradient(150deg, color-mix(in srgb, var(${tint}) 88%, white), color-mix(in srgb, var(${tint}) 60%, white))`,
        boxShadow: 'var(--shadow-2)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'transform var(--dur-fast) var(--ease-pop), box-shadow var(--dur-base) var(--ease-out)',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-3)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
    >
      <span style={{ font: `var(--w-bold) 13px/1 var(--font-mono)`, color: 'rgba(255,255,255,0.85)' }}>{dex}</span>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8, marginTop: 4 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ font: `var(--w-semibold) 22px/1.1 var(--font-display)`, color: 'var(--white)', textShadow: '0 1px 2px rgba(0,0,0,0.25)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
            {types.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
          </div>
        </div>
        <div style={{
          flex: '0 0 auto', width: 76, height: 76, borderRadius: 'var(--r-pill)',
          background: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 60%)',
          border: '2px solid rgba(255,255,255,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        }}>
          {sprite
            ? <img src={sprite} alt={name} style={{ width: '90%', height: '90%', objectFit: 'contain', imageRendering: 'pixelated' }} />
            : <span style={{ font: `var(--fs-h3) var(--font-pixel)`, color: 'rgba(255,255,255,0.7)' }}>?</span>}
        </div>
      </div>
    </button>
  );
}
