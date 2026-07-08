---
name: design-system
description: Use this skill to generate well-branded interfaces and assets for the Pokédex design system — a retro-shell / modern-control creature-catalog aesthetic — for production or throwaway prototypes/mocks. Contains design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (`tokens/`, `components/`, `guidelines/`, `ui_kits/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and create static HTML files for the user to view. Link `styles.css` for tokens and fonts; mount components from `window.PokDexDesignSystem_ec2824` after loading `_ds_bundle.js`. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
