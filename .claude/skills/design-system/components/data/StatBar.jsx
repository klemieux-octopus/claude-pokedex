import React from 'react';

/**
 * StatBar — a labelled base-stat meter (HP, Attack, …).
 * Retro segmented track feel via inset shadow; fill colored by value.
 */
export function StatBar({ label = 'HP', value = 0, max = 255, color, style = {} }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = color || (value >= 100 ? 'var(--led-green)' : value >= 60 ? 'var(--type-electric)' : 'var(--type-fire)');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '84px 40px 1fr', alignItems: 'center', gap: 12, ...style }}>
      <span style={{ font: `var(--w-medium) 12px/1 var(--font-ui)`, letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</span>
      <span style={{ font: `var(--w-bold) 15px/1 var(--font-mono)`, color: 'var(--text-strong)', textAlign: 'right' }}>{value}</span>
      <div style={{ height: 10, borderRadius: 'var(--r-pill)', background: 'var(--ink-100)', boxShadow: 'var(--deboss)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 'var(--r-pill)', background: fill, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)', transition: 'width var(--dur-base) var(--ease-out)' }} />
      </div>
    </div>
  );
}
