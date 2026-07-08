import React from 'react';

/**
 * SearchInput — the modern control counterpart to the retro shell.
 * Rounded field with an LCD-tinted focus glow. Pass a Lucide search icon as `icon`.
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search the dex…',
  icon = null,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const h = { sm: 38, md: 46, lg: 54 }[size] || 46;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      height: h, padding: '0 16px',
      background: 'var(--white)',
      border: `2px solid ${focused ? 'var(--poke-blue)' : 'var(--ink-200)'}`,
      borderRadius: 'var(--r-pill)',
      boxShadow: focused ? 'var(--ring)' : 'var(--shadow-1)',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style,
    }}>
      {icon && <span style={{ display: 'flex', color: focused ? 'var(--poke-blue)' : 'var(--ink-300)' }}>{icon}</span>}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
          font: `var(--w-medium) 16px/1 var(--font-ui)`, color: 'var(--text-strong)',
        }}
        {...rest}
      />
    </div>
  );
}
