import React from 'react';

/**
 * IconButton — square/round tactile control holding a single glyph.
 * Pair with Lucide icons (passed as children). Same press physics as Button.
 */
export function IconButton({
  children,
  variant = 'neutral',
  size = 'md',
  round = false,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const dim = { sm: 34, md: 42, lg: 52 }[size] || 42;

  const variants = {
    primary: { background: 'var(--poke-red)', color: 'var(--white)', boxShadow: 'var(--emboss)', border: 'none' },
    secondary: { background: 'var(--poke-blue)', color: 'var(--white)', boxShadow: 'var(--emboss)', border: 'none' },
    neutral: { background: 'var(--white)', color: 'var(--text-strong)', boxShadow: 'var(--shadow-1)', border: '2px solid var(--ink-200)' },
    ghost: { background: 'transparent', color: 'var(--text-body)', boxShadow: 'none', border: '2px solid transparent' },
  };
  const v = variants[variant] || variants.neutral;

  return (
    <button
      disabled={disabled}
      aria-label={label}
      title={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: round ? 'var(--r-pill)' : 'var(--r-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform var(--dur-fast) var(--ease-pop)',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(2px) scale(0.96)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
