import React from 'react';

/**
 * LED — the little indicator lights on a Pokédex shell.
 * Glossy dot with a glow. Blue is the big camera lens; small ones are status.
 */
export function LED({ color = 'blue', size = 14, lit = true, glow = true, style = {} }) {
  const colors = {
    blue: 'var(--led-blue)',
    red: 'var(--led-red)',
    yellow: 'var(--led-yellow)',
    green: 'var(--led-green)',
  };
  const glows = {
    blue: 'var(--led-glow-blue)',
    red: 'var(--led-glow-red)',
    green: 'var(--led-glow-green)',
    yellow: '0 0 8px rgba(255,203,61,0.8)',
  };
  const base = colors[color] || colors.blue;
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: 'var(--r-pill)',
        background: lit
          ? `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${base} 62%)`
          : 'var(--ink-300)',
        border: '2px solid rgba(23,24,28,0.55)',
        boxShadow: lit && glow ? glows[color] : 'inset 0 1px 2px rgba(0,0,0,0.4)',
        ...style,
      }}
    />
  );
}
