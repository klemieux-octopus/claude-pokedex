import React from 'react';

/**
 * Toggle — modern pill switch. Off is neutral, on is lens-blue with an LED knob.
 */
export function Toggle({ checked = false, onChange, disabled = false, label, style = {} }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, ...style }}>
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          position: 'relative', width: 48, height: 28, borderRadius: 'var(--r-pill)',
          background: checked ? 'var(--poke-blue)' : 'var(--ink-200)',
          boxShadow: 'var(--deboss)',
          transition: 'background var(--dur-base) var(--ease-out)',
        }}
      >
        <span style={{
          position: 'absolute', top: 3, left: checked ? 23 : 3, width: 22, height: 22,
          borderRadius: 'var(--r-pill)', background: 'var(--white)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
          transition: 'left var(--dur-base) var(--ease-pop)',
        }} />
      </span>
      {label && <span style={{ font: `var(--w-medium) 15px/1 var(--font-ui)`, color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
