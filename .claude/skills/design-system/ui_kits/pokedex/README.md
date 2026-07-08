# Pokédex App — UI kit

A high-fidelity recreation of the Pokédex handheld: a **retro molded-plastic red shell** wrapping a **modern app screen**. This is the flagship surface of the design system.

## Screens
- **DexListScreen** — search field, elemental type filter row, scrollable stack of `PokemonCard`s.
- **DexDetailScreen** — hero sprite panel on a type gradient, name + dex number, type chips, base-stat bars, flavor text, register-catch action.
- **DeviceShell** — the red device body: lens LED cluster, dark-bezel screen window, speaker grille + home button. Content mounts inside the screen.

## Interaction
`index.html` boots into the list. Tap any card → detail. Back arrow or the shell's ⌂ home button → list. Search + type filters are live. "Register catch" toggles caught state.

## Composition
Built entirely from the system's primitives (`Button`, `IconButton`, `LED`, `SearchInput`, `PokemonCard`, `TypeBadge`, `StatBar`, `Badge`) via `window.PokDexDesignSystem_ec2824`. No primitive is re-implemented here.

## Data
`data.js` holds **original placeholder creatures** (not franchise characters) with a neutral silhouette sprite slot. Swap it for a real dataset and pass `sprite` URLs to `PokemonCard` / the detail hero.
