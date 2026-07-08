import React from 'react';

/**
 * Button — the primary modern control of the Pokédex system.
 * Molded-plastic feel: soft emboss, springy press. Retro spirit, clean geometry.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 14px', height: 34, font: 14 },
    md: { padding: '0 20px', height: 42, font: 16 },
    lg: { padding: '0 28px', height: 52, font: 18 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--poke-red)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--emboss)',
      border: 'none',
    },
    secondary: {
      background: 'var(--poke-blue)',
      color: 'var(--white)',
      boxShadow: 'var(--emboss)',
      border: 'none',
    },
    neutral: {
      background: 'var(--white)',
      color: 'var(--text-strong)',
      boxShadow: 'var(--shadow-1)',
      border: '2px solid var(--ink-200)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      boxShadow: 'none',
      border: '2px solid transparent',
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: block ? '100%' : 'auto',
        height: s.height,
        padding: s.padding,
        font: `var(--w-semibold) ${s.font}px/1 var(--font-ui)`,
        letterSpacing: '0.01em',
        borderRadius: 'var(--r-pill)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform var(--dur-fast) var(--ease-pop), filter var(--dur-fast) var(--ease-out)',
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(2px) scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
