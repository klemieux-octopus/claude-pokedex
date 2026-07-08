import React from 'react';

/**
 * Badge — small status / count pill for metadata (region, generation, "NEW").
 * Neutral or accent tones; not to be confused with TypeBadge (elemental types).
 */
export function Badge({ children, tone = 'neutral', style = {} }) {
  const tones = {
    neutral: { background: 'var(--ink-100)', color: 'var(--text-body)', border: '1px solid var(--ink-200)' },
    brand:   { background: 'color-mix(in srgb, var(--poke-red) 12%, white)', color: 'var(--poke-red-deep)', border: '1px solid color-mix(in srgb, var(--poke-red) 30%, white)' },
    accent:  { background: 'color-mix(in srgb, var(--poke-blue) 12%, white)', color: 'var(--poke-blue)', border: '1px solid color-mix(in srgb, var(--poke-blue) 30%, white)' },
    success: { background: 'color-mix(in srgb, var(--led-green) 16%, white)', color: '#1E7A45', border: '1px solid color-mix(in srgb, var(--led-green) 34%, white)' },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px',
      font: `var(--w-semibold) 12px/1 var(--font-ui)`,
      letterSpacing: '0.02em',
      borderRadius: 'var(--r-pill)',
      ...t, ...style,
    }}>{children}</span>
  );
}
