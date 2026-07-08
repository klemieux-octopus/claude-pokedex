# Pokédex Design System

A **retro-meets-modern** design system for a Pokédex — a creature-catalog device and app. The visual identity leans on the beloved handheld: **molded red plastic, a glowing blue lens, LED status lights, a dark-bezel LCD screen**. But the controls inside are unapologetically **modern**: soft pill buttons, clean grotesk type, generous radii, springy micro-interactions. Retro shell, modern brain.

> **Sources.** This system was built **from a written brief only** — no codebase, Figma, logo, or brand assets were provided. All visual decisions (color, type, motif) are original interpretations of the "retro Pokédex" idea. Creature data throughout is **original placeholder content**, not franchise characters. No franchise logo or mark is reproduced.

---

## CONTENT FUNDAMENTALS

The voice is that of a **field instrument narrating discoveries** — clipped, factual, quietly enthusiastic. Think naturalist's log crossed with a game HUD.

- **Casing.** Product surfaces use sentence case for prose and body. **UPPERCASE + wide tracking** is reserved for system/HUD labels ("BROWSING · 12 SEEN", "BASE STATS", "STANDBY") — it evokes the LED readout. Type names render uppercase inside their chips.
- **Person.** Address the trainer as **you** ("Added to your dex"), and describe creatures in the **third person** ("It stores static in its cheeks"). Never first person.
- **Numbers.** Dex numbers are **zero-padded and mono** (`#0006`). Stats are bare integers. Units are lowercase and abut the number (`90.5kg`, `LV. 36`).
- **Flavor text.** One or two sentences, present tense, one concrete behavioral detail. Evocative but never florid: "Rides coastal currents at dawn. Its fins glow faintly in cold, deep water."
- **Actions.** Verb-first and short: *Register catch*, *Scan*, *Release*. Confirmations are terse and warm: "Registered ✓".
- **Emoji.** Not used in product copy. The only glyphs that appear are functional UI marks (⌂ home, ← back, ⌕ search, ✓) — treated as icons, not emoji.
- **Vibe.** Curious, precise, collectible. It should feel like every entry is a small trophy.

---

## VISUAL FOUNDATIONS

**Color.** The anchor is **Pokédex red** (`--poke-red` #D3222A) for primary actions and the device shell, with **lens blue** (`--poke-blue` #2C74B3) as the secondary/accent. Neutrals run from a near-black **charcoal** (`--ink-900`) used for screen bezels and text, through cool greys, to a warm **paper** off-white (`--paper` #F5F6EF) and a green-tinted **LCD** glass (`--lcd` #DCE6D5). Four **LED** colors (red/yellow/green/blue) supply status accents. A full **18-color elemental type palette** (`--type-fire`, `--type-water`, …) is the domain's data color system — these drive type chips and card tints. Imagery vibe: **saturated, warm-leaning, high-key** — like plastic under bright light.

**Type.** Four families (all Google Fonts — see substitution note): **Fredoka** (rounded, friendly) for display/headings and creature names; **Space Grotesk** for all UI, controls, and body; **Space Mono** for numbers, dex IDs, and tabular data; **Press Start 2P** as a **sparingly-used pixel accent** for tiny HUD/LCD labels only (never body). Display is set tight (`--ls-tight`), HUD labels wide (`--ls-caps`). Scale runs 12 → 72px.

**Spacing & layout.** A **4px base rhythm** (`--sp-*`). Content max width 1120px; the handheld device is a fixed 420px. Layouts favor CSS grid/flex with `gap`.

**Corner radii.** Generous and soft, **never sharp** — this is core to the "modern control" half. Controls are **pills** (`--r-pill`); cards use `--r-lg` (16px); the device body uses `--r-shell` (28px); the LCD glass `--r-screen`. Even small chips are fully rounded.

**Borders.** Hairline `1px` for dividers, `2px` for interactive outlines (neutral buttons, focused inputs), and a **bold `3px` charcoal outline** for the retro "molded" edge (selected cards, screen bezel).

**Shadows — two systems.**
1. *Modern elevation* (`--shadow-1/2/3`): soft, neutral, low-opacity drop shadows for cards and menus.
2. *Retro molded plastic* (`--emboss`, `--deboss`): **inset** highlight-on-top + shadow-on-bottom to make shell buttons look physically raised, and pressed-in wells for grilles, tracks, and toggles. LEDs add an outer **glow** (`--led-glow-*`).

**Backgrounds.** No photographic backgrounds by default. The app screen sits on warm **paper**; the device sits on a dark radial vignette. Type-tinted **linear gradients** (mixed toward white) back cards and detail heroes — the only gradients in the system, always derived from a single type color.

**Transparency & blur.** Used lightly: white-alpha rims and glints on LEDs and sprite orbs; text shadows on names over color. No frosted-glass/backdrop-blur panels.

**Motion.** Two easings: `--ease-pop` (springy overshoot) for **presses and toggles**, and `--ease-out` for **transitions** (fills, hovers). Durations are quick (120–200ms). Signature interaction: buttons **translate down + scale 0.96–0.98 on press** (physical key feel). Cards **lift 3px** on hover with a deeper shadow. No infinite/looping decorative animation.

**Hover / press states.** Hover = lift + shadow deepen (cards) or subtle icon-color shift (inputs). Press = the pop-down. Focus = a 3px blue ring (`--ring`) plus blue border on inputs. Disabled = 50% opacity, `not-allowed`.

**Cards.** Rounded (`--r-lg`), soft drop shadow, no border by default; a **3px charcoal border** appears on selection. Data cards (PokemonCard) are type-tinted gradients with white text; foundation/content cards are white on paper.

---

## ICONOGRAPHY

No custom icon set or icon font was provided, and **none is invented**. The system's approach:

- **Functional glyphs** for the few UI marks it needs — ⌂ (home), ← (back), ⌕ (search), ✓ (confirm), ＋ / ↺ / ✦ on demo icon buttons. These are treated as icons, not emoji, and sit inside `IconButton` / input affordances.
- **Recommended set:** for production, use **[Lucide](https://lucide.dev)** (clean, modern, 2px stroke — matches the "modern control" half). Load from CDN and pass icons as `children` to `IconButton` / as the `icon` prop of `SearchInput`. *This is a recommended substitution, not a provided asset — flag if a specific icon set is required.*
- **Emoji:** never used in product copy.
- **Type chips** double as the primary *data iconography* — the 18 elemental type colors are the most recognizable visual signal in the system.
- **Sprites:** creature artwork is supplied by the consumer via the `sprite` prop. Absent art, components render a neutral **`?` silhouette slot** (pixel font) rather than a drawn placeholder.

No logo/brand mark exists in the sources, so the wordmark **"Pokédex"** is rendered in plain Fredoka display type wherever a mark would go.

---

## FONT SUBSTITUTION — ACTION NEEDED

All four typefaces load from **Google Fonts** because no brand font files were provided:

| Role | Font | Substitute for |
|---|---|---|
| Display | Fredoka | a rounded brand display face |
| UI / body | Space Grotesk | a modern grotesk |
| Mono / numbers | Space Mono | tabular numerals |
| Pixel accent | Press Start 2P | a retro bitmap face |

**If you have official/brand fonts, send them** and I'll swap the `@import` in `tokens/fonts.css` for local `@font-face` rules.

---

## COMPONENTS

Reusable primitives, exposed on `window.PokDexDesignSystem_ec2824`:

- **Button** — primary tactile pill control (primary/secondary/neutral/ghost; sm/md/lg).
- **IconButton** — single-glyph square/round control.
- **LED** — glossy indicator light (blue lens + red/yellow/green status).
- **TypeBadge** — elemental type chip; the signature data atom (18 types).
- **PokemonCard** — the iconic type-tinted dex entry tile.
- **StatBar** — labelled base-stat meter with retro inset track.
- **Badge** — small status/count pill (neutral/brand/accent/success).
- **SearchInput** — rounded search field with blue focus glow.
- **Toggle** — modern pill switch with springy LED knob.

*Intentional additions:* none beyond the brief — the inventory above was authored from scratch to serve a creature-catalog product (no source component library existed).

---

## INDEX / MANIFEST

**Root**
- `styles.css` — global entry point (import-only). Consumers link this.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skill wrapper for portable use.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.

**`components/`**
- `core/` — Button, IconButton, LED (+ `core.card.html`)
- `data/` — TypeBadge, PokemonCard, StatBar, Badge (+ `data.card.html`)
- `forms/` — SearchInput, Toggle (+ `forms.card.html`)

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand groups).

**`ui_kits/pokedex/`** — the Pokédex handheld app: `index.html` (interactive), `DeviceShell.jsx`, `DexListScreen.jsx`, `DexDetailScreen.jsx`, `data.js`, `README.md`.

**Generated (do not edit):** `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.
