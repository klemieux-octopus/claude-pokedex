/* @ds-bundle: {"format":4,"namespace":"PokDexDesignSystem_ec2824","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"LED","sourcePath":"components/core/LED.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"PokemonCard","sourcePath":"components/data/PokemonCard.jsx"},{"name":"StatBar","sourcePath":"components/data/StatBar.jsx"},{"name":"TypeBadge","sourcePath":"components/data/TypeBadge.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"Toggle","sourcePath":"components/forms/Toggle.jsx"}],"sourceHashes":{"components/core/Button.jsx":"6daa02e97fc7","components/core/IconButton.jsx":"f2af5e8a27fd","components/core/LED.jsx":"9d3cdb84f6be","components/data/Badge.jsx":"aa1617f28cfd","components/data/PokemonCard.jsx":"091a7d80ff81","components/data/StatBar.jsx":"0f62f79b561c","components/data/TypeBadge.jsx":"328b7b5fdd48","components/forms/SearchInput.jsx":"674f6038f40d","components/forms/Toggle.jsx":"863e3c7579b8","ui_kits/pokedex/DeviceShell.jsx":"4e5262a1b388","ui_kits/pokedex/DexDetailScreen.jsx":"530841374132","ui_kits/pokedex/DexListScreen.jsx":"8256a770f3dc","ui_kits/pokedex/data.js":"da851e9d3042"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PokDexDesignSystem_ec2824 = window.PokDexDesignSystem_ec2824 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the primary modern control of the Pokédex system.
 * Molded-plastic feel: soft emboss, springy press. Retro spirit, clean geometry.
 */
function Button({
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
    sm: {
      padding: '0 14px',
      height: 34,
      font: 14
    },
    md: {
      padding: '0 20px',
      height: 42,
      font: 16
    },
    lg: {
      padding: '0 28px',
      height: 52,
      font: 18
    }
  };
  const s = sizes[size] || sizes.md;
  const variants = {
    primary: {
      background: 'var(--poke-red)',
      color: 'var(--text-on-brand)',
      boxShadow: 'var(--emboss)',
      border: 'none'
    },
    secondary: {
      background: 'var(--poke-blue)',
      color: 'var(--white)',
      boxShadow: 'var(--emboss)',
      border: 'none'
    },
    neutral: {
      background: 'var(--white)',
      color: 'var(--text-strong)',
      boxShadow: 'var(--shadow-1)',
      border: '2px solid var(--ink-200)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      boxShadow: 'none',
      border: '2px solid transparent'
    }
  };
  const v = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(2px) scale(0.98)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square/round tactile control holding a single glyph.
 * Pair with Lucide icons (passed as children). Same press physics as Button.
 */
function IconButton({
  children,
  variant = 'neutral',
  size = 'md',
  round = false,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const dim = {
    sm: 34,
    md: 42,
    lg: 52
  }[size] || 42;
  const variants = {
    primary: {
      background: 'var(--poke-red)',
      color: 'var(--white)',
      boxShadow: 'var(--emboss)',
      border: 'none'
    },
    secondary: {
      background: 'var(--poke-blue)',
      color: 'var(--white)',
      boxShadow: 'var(--emboss)',
      border: 'none'
    },
    neutral: {
      background: 'var(--white)',
      color: 'var(--text-strong)',
      boxShadow: 'var(--shadow-1)',
      border: '2px solid var(--ink-200)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      boxShadow: 'none',
      border: '2px solid transparent'
    }
  };
  const v = variants[variant] || variants.neutral;
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    "aria-label": label,
    title: label,
    style: {
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
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(2px) scale(0.96)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/LED.jsx
try { (() => {
/**
 * LED — the little indicator lights on a Pokédex shell.
 * Glossy dot with a glow. Blue is the big camera lens; small ones are status.
 */
function LED({
  color = 'blue',
  size = 14,
  lit = true,
  glow = true,
  style = {}
}) {
  const colors = {
    blue: 'var(--led-blue)',
    red: 'var(--led-red)',
    yellow: 'var(--led-yellow)',
    green: 'var(--led-green)'
  };
  const glows = {
    blue: 'var(--led-glow-blue)',
    red: 'var(--led-glow-red)',
    green: 'var(--led-glow-green)',
    yellow: '0 0 8px rgba(255,203,61,0.8)'
  };
  const base = colors[color] || colors.blue;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: 'var(--r-pill)',
      background: lit ? `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), ${base} 62%)` : 'var(--ink-300)',
      border: '2px solid rgba(23,24,28,0.55)',
      boxShadow: lit && glow ? glows[color] : 'inset 0 1px 2px rgba(0,0,0,0.4)',
      ...style
    }
  });
}
Object.assign(__ds_scope, { LED });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LED.jsx", error: String((e && e.message) || e) }); }

// components/data/Badge.jsx
try { (() => {
/**
 * Badge — small status / count pill for metadata (region, generation, "NEW").
 * Neutral or accent tones; not to be confused with TypeBadge (elemental types).
 */
function Badge({
  children,
  tone = 'neutral',
  style = {}
}) {
  const tones = {
    neutral: {
      background: 'var(--ink-100)',
      color: 'var(--text-body)',
      border: '1px solid var(--ink-200)'
    },
    brand: {
      background: 'color-mix(in srgb, var(--poke-red) 12%, white)',
      color: 'var(--poke-red-deep)',
      border: '1px solid color-mix(in srgb, var(--poke-red) 30%, white)'
    },
    accent: {
      background: 'color-mix(in srgb, var(--poke-blue) 12%, white)',
      color: 'var(--poke-blue)',
      border: '1px solid color-mix(in srgb, var(--poke-blue) 30%, white)'
    },
    success: {
      background: 'color-mix(in srgb, var(--led-green) 16%, white)',
      color: '#1E7A45',
      border: '1px solid color-mix(in srgb, var(--led-green) 34%, white)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 10px',
      font: `var(--w-semibold) 12px/1 var(--font-ui)`,
      letterSpacing: '0.02em',
      borderRadius: 'var(--r-pill)',
      ...t,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Badge.jsx", error: String((e && e.message) || e) }); }

// components/data/StatBar.jsx
try { (() => {
/**
 * StatBar — a labelled base-stat meter (HP, Attack, …).
 * Retro segmented track feel via inset shadow; fill colored by value.
 */
function StatBar({
  label = 'HP',
  value = 0,
  max = 255,
  color,
  style = {}
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = color || (value >= 100 ? 'var(--led-green)' : value >= 60 ? 'var(--type-electric)' : 'var(--type-fire)');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '84px 40px 1fr',
      alignItems: 'center',
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--w-medium) 12px/1 var(--font-ui)`,
      letterSpacing: 'var(--ls-caps)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--w-bold) 15px/1 var(--font-mono)`,
      color: 'var(--text-strong)',
      textAlign: 'right'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 10,
      borderRadius: 'var(--r-pill)',
      background: 'var(--ink-100)',
      boxShadow: 'var(--deboss)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      borderRadius: 'var(--r-pill)',
      background: fill,
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
      transition: 'width var(--dur-base) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { StatBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatBar.jsx", error: String((e && e.message) || e) }); }

// components/data/TypeBadge.jsx
try { (() => {
const TYPE_COLORS = {
  normal: '--type-normal',
  fire: '--type-fire',
  water: '--type-water',
  grass: '--type-grass',
  electric: '--type-electric',
  ice: '--type-ice',
  fighting: '--type-fighting',
  poison: '--type-poison',
  ground: '--type-ground',
  flying: '--type-flying',
  psychic: '--type-psychic',
  bug: '--type-bug',
  rock: '--type-rock',
  ghost: '--type-ghost',
  dragon: '--type-dragon',
  dark: '--type-dark',
  steel: '--type-steel',
  fairy: '--type-fairy'
};

/**
 * TypeBadge — the elemental type chip (Fire, Water, …). Solid color capsule,
 * white uppercase label. The system's most recognizable data atom.
 */
function TypeBadge({
  type = 'normal',
  size = 'md',
  style = {}
}) {
  const key = String(type).toLowerCase();
  const token = TYPE_COLORS[key] || TYPE_COLORS.normal;
  const sizes = {
    sm: {
      padding: '3px 10px',
      font: 11
    },
    md: {
      padding: '5px 14px',
      font: 13
    },
    lg: {
      padding: '7px 18px',
      font: 15
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
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
      ...style
    }
  }, key);
}
Object.assign(__ds_scope, { TypeBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TypeBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/PokemonCard.jsx
try { (() => {
const TYPE_TINT = {
  normal: '--type-normal',
  fire: '--type-fire',
  water: '--type-water',
  grass: '--type-grass',
  electric: '--type-electric',
  ice: '--type-ice',
  fighting: '--type-fighting',
  poison: '--type-poison',
  ground: '--type-ground',
  flying: '--type-flying',
  psychic: '--type-psychic',
  bug: '--type-bug',
  rock: '--type-rock',
  ghost: '--type-ghost',
  dragon: '--type-dragon',
  dark: '--type-dark',
  steel: '--type-steel',
  fairy: '--type-fairy'
};

/**
 * PokemonCard — the iconic entry tile. Type-tinted panel, dex number in mono,
 * name in rounded display, a sprite slot, and type chips.
 * Provide your own creature art via `sprite`; otherwise a neutral silhouette shows.
 */
function PokemonCard({
  number = 1,
  name = 'Unknown',
  types = ['normal'],
  sprite = null,
  selected = false,
  onClick,
  style = {}
}) {
  const tint = TYPE_TINT[String(types[0]).toLowerCase()] || TYPE_TINT.normal;
  const dex = '#' + String(number).padStart(4, '0');
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
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
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-3)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'var(--shadow-2)';
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--w-bold) 13px/1 var(--font-mono)`,
      color: 'rgba(255,255,255,0.85)'
    }
  }, dex), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--w-semibold) 22px/1.1 var(--font-display)`,
      color: 'var(--white)',
      textShadow: '0 1px 2px rgba(0,0,0,0.25)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 10
    }
  }, types.map(t => /*#__PURE__*/React.createElement(__ds_scope.TypeBadge, {
    key: t,
    type: t,
    size: "sm"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 auto',
      width: 76,
      height: 76,
      borderRadius: 'var(--r-pill)',
      background: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.55), rgba(255,255,255,0.05) 60%)',
      border: '2px solid rgba(255,255,255,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, sprite ? /*#__PURE__*/React.createElement("img", {
    src: sprite,
    alt: name,
    style: {
      width: '90%',
      height: '90%',
      objectFit: 'contain',
      imageRendering: 'pixelated'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--fs-h3) var(--font-pixel)`,
      color: 'rgba(255,255,255,0.7)'
    }
  }, "?"))));
}
Object.assign(__ds_scope, { PokemonCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PokemonCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * SearchInput — the modern control counterpart to the retro shell.
 * Rounded field with an LCD-tinted focus glow. Pass a Lucide search icon as `icon`.
 */
function SearchInput({
  value,
  onChange,
  placeholder = 'Search the dex…',
  icon = null,
  size = 'md',
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const h = {
    sm: 38,
    md: 46,
    lg: 54
  }[size] || 46;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: '0 16px',
      background: 'var(--white)',
      border: `2px solid ${focused ? 'var(--poke-blue)' : 'var(--ink-200)'}`,
      borderRadius: 'var(--r-pill)',
      boxShadow: focused ? 'var(--ring)' : 'var(--shadow-1)',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: focused ? 'var(--poke-blue)' : 'var(--ink-300)'
    }
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      font: `var(--w-medium) 16px/1 var(--font-ui)`,
      color: 'var(--text-strong)'
    }
  }, rest)));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/forms/Toggle.jsx
try { (() => {
/**
 * Toggle — modern pill switch. Off is neutral, on is lens-blue with an LED knob.
 */
function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": checked,
    onClick: () => !disabled && onChange && onChange(!checked),
    style: {
      position: 'relative',
      width: 48,
      height: 28,
      borderRadius: 'var(--r-pill)',
      background: checked ? 'var(--poke-blue)' : 'var(--ink-200)',
      boxShadow: 'var(--deboss)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: checked ? 23 : 3,
      width: 22,
      height: 22,
      borderRadius: 'var(--r-pill)',
      background: 'var(--white)',
      boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
      transition: 'left var(--dur-base) var(--ease-pop)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--w-medium) 15px/1 var(--font-ui)`,
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Toggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Toggle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pokedex/DeviceShell.jsx
try { (() => {
const {
  LED
} = window.PokDexDesignSystem_ec2824;

/**
 * DeviceShell — the retro red Pokédex body. Molded plastic, lens LEDs up top,
 * a dark-bezel screen window in the middle, a speaker grille + home button below.
 * Modern content lives inside the screen (children).
 */
function DeviceShell({
  children,
  onHome,
  statusText = 'STANDBY'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 420,
      background: 'linear-gradient(160deg, var(--poke-red-hi), var(--poke-red) 34%, var(--poke-red-deep))',
      borderRadius: 'var(--r-shell)',
      padding: 18,
      boxShadow: 'var(--shadow-3), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -6px 14px rgba(0,0,0,0.28)',
      fontFamily: 'var(--font-ui)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '2px 4px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 58,
      height: 58,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 34% 30%, #cfeaff, var(--poke-blue) 66%)',
      border: '4px solid rgba(255,255,255,0.9)',
      boxShadow: 'var(--led-glow-blue), inset 0 2px 4px rgba(255,255,255,0.6)'
    }
  }), /*#__PURE__*/React.createElement(LED, {
    color: "red",
    size: 16
  }), /*#__PURE__*/React.createElement(LED, {
    color: "yellow",
    size: 16
  }), /*#__PURE__*/React.createElement(LED, {
    color: "green",
    size: 16
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--w-medium) 9px/1 var(--font-pixel)',
      color: 'rgba(255,255,255,0.85)'
    }
  }, "DEX-04")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--r-lg)',
      background: 'var(--ink-900)',
      padding: 12,
      boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 4px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--led-green)',
      boxShadow: 'var(--led-glow-green)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--w-bold) 10px/1 var(--font-mono)',
      color: 'var(--lcd)',
      letterSpacing: '0.14em'
    }
  }, statusText)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 560,
      background: 'var(--paper)',
      borderRadius: 'var(--r-md)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)'
    }
  }, children)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px 6px 2px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onHome,
    "aria-label": "Home",
    style: {
      width: 46,
      height: 46,
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      background: 'radial-gradient(circle at 36% 30%, #fff, var(--ink-100) 70%)',
      boxShadow: 'var(--emboss)',
      font: '18px/1 var(--font-ui)',
      color: 'var(--poke-red)',
      transition: 'transform var(--dur-fast) var(--ease-pop)'
    },
    onMouseDown: e => {
      e.currentTarget.style.transform = 'translateY(2px) scale(0.95)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = 'none';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = 'none';
    }
  }, "\u2302"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 5
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      height: 4,
      borderRadius: 999,
      background: 'rgba(0,0,0,0.22)',
      boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.3)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: 'var(--poke-red-deep)',
      boxShadow: 'var(--deboss)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: 'var(--poke-red-deep)',
      boxShadow: 'var(--deboss)'
    }
  }))));
}
window.DeviceShell = DeviceShell;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pokedex/DeviceShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pokedex/DexDetailScreen.jsx
try { (() => {
const {
  TypeBadge,
  StatBar,
  Badge,
  Button,
  IconButton
} = window.PokDexDesignSystem_ec2824;
const DETAIL_TINT = {
  normal: '--type-normal',
  fire: '--type-fire',
  water: '--type-water',
  grass: '--type-grass',
  electric: '--type-electric',
  ice: '--type-ice',
  fighting: '--type-fighting',
  poison: '--type-poison',
  ground: '--type-ground',
  flying: '--type-flying',
  psychic: '--type-psychic',
  bug: '--type-bug',
  rock: '--type-rock',
  ghost: '--type-ghost',
  dragon: '--type-dragon',
  dark: '--type-dark',
  steel: '--type-steel',
  fairy: '--type-fairy'
};

/**
 * DexDetailScreen — a single entry: hero sprite panel on a type gradient,
 * name + dex number, type chips, base stats, and flavor text.
 */
function DexDetailScreen({
  entry,
  onBack
}) {
  const [caught, setCaught] = React.useState(false);
  const tint = DETAIL_TINT[entry.types[0]] || DETAIL_TINT.normal;
  const dex = '#' + String(entry.number).padStart(4, '0');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '14px 16px 22px',
      background: `linear-gradient(160deg, color-mix(in srgb, var(${tint}) 92%, white), color-mix(in srgb, var(${tint}) 62%, white))`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Back",
    variant: "neutral",
    size: "sm",
    onClick: onBack
  }, "\u2190"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: 'var(--w-bold) 14px/1 var(--font-mono)',
      color: 'rgba(255,255,255,0.9)'
    }
  }, dex)), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '10px auto 12px',
      width: 150,
      height: 150,
      borderRadius: '50%',
      background: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.6), rgba(255,255,255,0.05) 62%)',
      border: '3px solid rgba(255,255,255,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '48px/1 var(--font-pixel)',
      color: 'rgba(255,255,255,0.75)'
    }
  }, "?")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      textAlign: 'center',
      font: 'var(--w-semibold) 34px/1 var(--font-display)',
      color: 'var(--white)',
      textShadow: '0 2px 4px rgba(0,0,0,0.25)'
    }
  }, entry.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      marginTop: 10
    }
  }, entry.types.map(t => /*#__PURE__*/React.createElement(TypeBadge, {
    key: t,
    type: t
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '18px 18px 22px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 18px',
      font: 'var(--w-regular) 15px/1.55 var(--font-ui)',
      color: 'var(--text-body)'
    }
  }, entry.flavor), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--w-bold) 11px/1 var(--font-mono)',
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      marginBottom: 14
    }
  }, "Base stats"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(StatBar, {
    label: "HP",
    value: entry.hp
  }), /*#__PURE__*/React.createElement(StatBar, {
    label: "ATK",
    value: entry.atk
  }), /*#__PURE__*/React.createElement(StatBar, {
    label: "DEF",
    value: entry.def
  }), /*#__PURE__*/React.createElement(StatBar, {
    label: "SPD",
    value: entry.spd
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: caught ? 'neutral' : 'primary',
    block: true,
    onClick: () => setCaught(!caught)
  }, caught ? 'Registered ✓' : 'Register catch')), caught && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "success"
  }, "Added to your dex"))));
}
window.DexDetailScreen = DexDetailScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pokedex/DexDetailScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pokedex/DexListScreen.jsx
try { (() => {
const {
  SearchInput,
  PokemonCard,
  TypeBadge,
  Badge
} = window.PokDexDesignSystem_ec2824;

/**
 * DexListScreen — the browsing view: search, a type filter row, and a
 * scrollable stack of PokemonCards. Tapping a card opens the detail screen.
 */
function DexListScreen({
  onSelect
}) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState(null);
  const data = window.DEX || [];
  const filtered = data.filter(p => {
    const matchQ = p.name.toLowerCase().includes(q.toLowerCase());
    const matchT = !filter || p.types.includes(filter);
    return matchQ && matchT;
  });
  const filters = ['fire', 'water', 'grass', 'electric', 'psychic'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 16px 12px',
      background: 'var(--white)',
      borderBottom: '1px solid var(--ink-100)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--w-semibold) 26px/1 var(--font-display)',
      color: 'var(--ink-900)',
      letterSpacing: 'var(--ls-tight)'
    }
  }, "Kanto Dex"), /*#__PURE__*/React.createElement(Badge, {
    tone: "accent"
  }, "Gen I")), /*#__PURE__*/React.createElement(SearchInput, {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search the dex\u2026",
    size: "sm",
    icon: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15
      }
    }, "\u2315")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 12,
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setFilter(null),
    style: chip(filter === null)
  }, "All"), filters.map(t => /*#__PURE__*/React.createElement("button", {
    key: t,
    onClick: () => setFilter(filter === t ? null : t),
    style: {
      border: 'none',
      background: 'none',
      padding: 0,
      cursor: 'pointer',
      opacity: filter && filter !== t ? 0.45 : 1
    }
  }, /*#__PURE__*/React.createElement(TypeBadge, {
    type: t,
    size: "sm"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 14,
      display: 'grid',
      gap: 12,
      background: 'var(--paper)'
    }
  }, filtered.map(p => /*#__PURE__*/React.createElement(PokemonCard, {
    key: p.number,
    number: p.number,
    name: p.name,
    types: p.types,
    onClick: () => onSelect(p)
  })), filtered.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--text-muted)',
      font: 'var(--w-medium) 14px/1.5 var(--font-ui)',
      marginTop: 40
    }
  }, "No entries match.")));
}
function chip(active) {
  return {
    padding: '5px 14px',
    borderRadius: 'var(--r-pill)',
    cursor: 'pointer',
    border: active ? 'none' : '2px solid var(--ink-200)',
    background: active ? 'var(--ink-900)' : 'var(--white)',
    color: active ? 'var(--white)' : 'var(--text-body)',
    font: 'var(--w-semibold) 12px/1 var(--font-ui)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase'
  };
}
window.DexListScreen = DexListScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pokedex/DexListScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/pokedex/data.js
try { (() => {
// Original placeholder creatures (not franchise characters) for the Pokédex UI kit.
// Consumers swap this for their own dataset; sprite is null → neutral silhouette slot.
window.DEX = [{
  number: 1,
  name: 'Sprigleaf',
  types: ['grass'],
  hp: 60,
  atk: 52,
  def: 58,
  spd: 62,
  flavor: 'A seed sprouts on its back at birth and grows with it, drawing energy from sunlight.'
}, {
  number: 2,
  name: 'Emberpup',
  types: ['fire'],
  hp: 55,
  atk: 68,
  def: 44,
  spd: 74,
  flavor: 'The flame on its tail measures its mood. It flares brightly when the pup is excited.'
}, {
  number: 3,
  name: 'Tidefin',
  types: ['water'],
  hp: 68,
  atk: 50,
  def: 64,
  spd: 58,
  flavor: 'Rides coastal currents at dawn. Its fins glow faintly in cold, deep water.'
}, {
  number: 4,
  name: 'Voltmouse',
  types: ['electric'],
  hp: 40,
  atk: 60,
  def: 40,
  spd: 96,
  flavor: 'Stores static in its cheeks. A startled Voltmouse can light a small room.'
}, {
  number: 5,
  name: 'Pebblox',
  types: ['rock', 'ground'],
  hp: 82,
  atk: 90,
  def: 110,
  spd: 28,
  flavor: 'Its hide is layered stone. It sheds a pebble whenever it takes a heavy hit.'
}, {
  number: 6,
  name: 'Emberwing',
  types: ['fire', 'flying'],
  hp: 78,
  atk: 104,
  def: 78,
  spd: 100,
  flavor: 'Soars above ridgelines at dusk, trailing sparks. Prefers strong opponents.'
}, {
  number: 7,
  name: 'Zephyrling',
  types: ['flying', 'normal'],
  hp: 45,
  atk: 40,
  def: 40,
  spd: 88,
  flavor: 'Weighs almost nothing. Whole flocks drift on warm afternoon thermals.'
}, {
  number: 8,
  name: 'Mystichor',
  types: ['psychic'],
  hp: 72,
  atk: 58,
  def: 62,
  spd: 84,
  flavor: 'Hums a low tone that calms nearby creatures. Its eyes never fully close.'
}, {
  number: 9,
  name: 'Frostkit',
  types: ['ice'],
  hp: 50,
  atk: 48,
  def: 66,
  spd: 54,
  flavor: 'Breathes a fine frost. It nests inside snowbanks through the cold months.'
}, {
  number: 10,
  name: 'Toxiflit',
  types: ['bug', 'poison'],
  hp: 58,
  atk: 63,
  def: 52,
  spd: 90,
  flavor: 'Dust from its wings can numb. It flits between night flowers in silence.'
}, {
  number: 11,
  name: 'Dracembers',
  types: ['dragon', 'fire'],
  hp: 96,
  atk: 118,
  def: 88,
  spd: 82,
  flavor: 'An old-line dragon. The embers in its throat never go out, even in rain.'
}, {
  number: 12,
  name: 'Aquagon',
  types: ['water', 'dragon'],
  hp: 92,
  atk: 88,
  def: 90,
  spd: 70,
  flavor: 'Coils in deep trenches. Sailors take its distant song as a storm warning.'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/pokedex/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.LED = __ds_scope.LED;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.PokemonCard = __ds_scope.PokemonCard;

__ds_ns.StatBar = __ds_scope.StatBar;

__ds_ns.TypeBadge = __ds_scope.TypeBadge;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.Toggle = __ds_scope.Toggle;

})();
