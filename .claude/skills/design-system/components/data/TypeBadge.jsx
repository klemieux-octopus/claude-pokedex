import React from 'react';

const TYPE_COLORS = {
  normal: '--type-normal', fire: '--type-fire', water: '--type-water',
  grass: '--type-grass', electric: '--type-electric', ice: '--type-ice',
  fighting: '--type-fighting', poison: '--type-poison', ground: '--type-ground',
  flying: '--type-flying', psychic: '--type-psychic', bug: '--type-bug',
  rock: '--type-rock', ghost: '--type-ghost', dragon: '--type-dragon',
  dark: '--type-dark', steel: '--type-steel', fairy: '--type-fairy',
};

/**
 * TypeBadge — the elemental type chip (Fire, Water, …). Solid color capsule,
 * white uppercase label. The system's most recognizable data atom.
 */
export function TypeBadge({ type = 'normal', size = 'md', style = {} }) {
  const key = String(type).toLowerCase();
  const token = TYPE_COLORS[key] || TYPE_COLORS.normal;
  const sizes = {
    sm: { padding: '3px 10px', font: 11 },
    md: { padding: '5px 14px', font: 13 },
    lg: { padding: '7px 18px', font: 15 },
  };
  const s = sizes[size] || sizes.md;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: s.padding,
        background: `var(${token})`,
        color: 'var(--white)',
        font: `var(--w-semibold) ${s.font}px/1 var(--font-ui)`,
        letterSpacing: 'var(--ls-caps)',
        textTransform: 'uppercase',
        borderRadius: 'var(--r-pill)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.35)',
        ...style,
      }}
    >
      {key}
    </span>
  );
}
