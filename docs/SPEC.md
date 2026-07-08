# Spec — Pokédex web app

> Status: **ready for agent**. Synthesised from the wayfinder map [Pokédex web app — buildable spec](https://github.com/klemieux-octopus/claude-pokedex/issues/1) (decisions #2–#6). Build lives in `pokedex/` in this repo.

## Problem Statement

I want to look things up about Pokémon — what a Pokémon's stats, types, abilities, evolutions, moves and artwork are — without digging through scattered wikis or hammering an API. I want one fast, pleasant place to browse the whole National Pokédex (all nine generations) and inspect any Pokémon in depth, on my desktop or my phone. It's for my own use.

## Solution

A personal, browser-based **Pokédex** with a single master–detail screen: a searchable, filterable list of every Pokémon on one side, and a rich detail panel on the other. Picking a Pokémon shows its stats, types, abilities, evolution chain, flavour text, physical data, the moves it learns, and a gallery of its sprites/artwork — with a switcher for alternate forms (Mega, regional, Gigantamax, shiny). All Pokémon data is captured **at build time** from PokéAPI into a static snapshot shipped with the app, so browsing is instant, works offline, and never calls PokéAPI at runtime. The look is a warm, playful "Pokédex device" identity, in both light and dark themes.

## User Stories

1. As a user, I want to see a list of every Pokémon across all nine generations, so that I can browse the complete National Pokédex in one place.
2. As a user, I want each list entry to show the Pokémon's dex number, name, a small sprite, and its type(s), so that I can recognise it at a glance.
3. As a user, I want the list ordered by National Pokédex number by default, so that browsing feels familiar.
4. As a user, I want to search by name, so that I can jump straight to a Pokémon I have in mind.
5. As a user, I want to search by dex number, so that I can find a Pokémon when I only remember its number.
6. As a user, I want the list to filter as I type in the search box, so that results narrow immediately.
7. As a user, I want to filter the list by type, so that I can see only (e.g.) Water Pokémon.
8. As a user, I want to filter the list by generation, so that I can focus on one region's roster.
9. As a user, I want to sort the list by name (A–Z) or by total base stats in addition to dex number, so that I can browse in the order that suits my question.
10. As a user, I want a shiny toggle, so that I can see shiny colouring across the list and detail.
11. As a user, I want to see how many Pokémon match my current search and filters, so that I understand what I'm looking at.
12. As a user, I want to select a Pokémon from the list, so that its full detail appears without losing my place in the list.
13. As a user, I want the selected row to stay visibly highlighted, so that I keep my bearings while comparing Pokémon.
14. As a user, I want the detail panel to show the Pokémon's base stats (HP, Attack, Defense, Sp. Atk, Sp. Def, Speed) as labelled bars, so that I can read its strengths quickly.
15. As a user, I want to see the Pokémon's type(s) prominently in the detail panel, so that its matchups are obvious.
16. As a user, I want to see the Pokémon's abilities, including hidden abilities, so that I know what it can do.
17. As a user, I want to see the Pokémon's evolution chain, including branching evolutions (e.g. Eevee), so that I understand how it evolves.
18. As a user, I want to click a Pokémon in the evolution chain to jump to it, so that I can follow an evolutionary line.
19. As a user, I want to read the Pokémon's flavour text, so that I get the flavour and lore.
20. As a user, I want to see physical data (height, weight, generation introduced), so that I have the reference facts.
21. As a user, I want a clear badge when a Pokémon is legendary or mythical, so that its status is unmistakable.
22. As a user, I want to see the list of moves a Pokémon can learn (with how it learns them — level-up, TM), so that I can study its movepool.
23. As a user, I want a gallery of the Pokémon's sprites and official artwork (default, shiny, and artwork), so that I can see how it looks.
24. As a user, I want the primary image to be the high-resolution official artwork, so that the detail view looks crisp.
25. As a user, I want a placeholder shown while an image loads, so that the layout doesn't jump.
26. As a user, I want to switch between a Pokémon's forms/varieties (Mega, regional, Gigantamax), so that I can inspect each form's own stats, types, and sprite.
27. As a user, I want switching forms to update the detail data instantly, so that comparison feels immediate.
28. As a user on a phone, I want tapping a list row to open a full-screen detail view with a back button, so that the layout is usable on a small screen.
29. As a user, I want the app to load and respond instantly, so that browsing never waits on the network.
30. As a user, I want the app to keep working without a connection, so that I can browse offline.
31. As a user, I want the app to honour my system light/dark preference, so that it fits my environment.
32. As a user, I want a manual light/dark toggle, so that I can override the system default.
33. As a user, I want the interface to feel like a friendly Pokédex device, so that browsing is enjoyable, not clinical.
34. As a maintainer, I want the Pokémon data to be refreshable so that new Pokémon appear after a rebuild, so that the dex doesn't drift permanently stale.

## Implementation Decisions

**Application shape**
- A client-side **single-page app** built with **React**, **Vite**, and **TypeScript**. One primary screen (master–detail); no server component at runtime.
- **Master–detail layout:** a persistent list pane and a persistent detail pane on wide viewports. On narrow viewports it collapses to a stack — the list fills the screen; selecting a row pushes a full-screen detail view with a back control. (Prototype: the feature-set mockup, variant B.)
- **Routing:** client routing suited to static hosting on GitHub Pages — a `404.html` fallback (or hash routing) so deep links resolve, and the build's base path set to the repository subpath. Selection should be reflected in the URL so a Pokémon is linkable/reload-stable.

**Data: build-time snapshot (no runtime PokéAPI calls)**
- A **build-time generator** fetches from PokéAPI and emits **static JSON** that ships with the app. The deployed site never calls PokéAPI, which satisfies PokéAPI's mandatory-caching fair-use rule (decision #2) trivially and makes browsing instant and offline-capable.
- The generator fetches in bulk via PokéAPI's **GraphQL** endpoint (REST is acceptable — it runs at build time, so latency and per-call counts don't matter).
- Output is **chunked** to avoid a large initial payload (all generations plus movepools is big):
  - A single compact **species index**: for every species, its dex number, name, type(s), generation, and a thumbnail image URL — loaded at startup to render the list.
  - One **per-species detail** document each: base stats, abilities (incl. hidden), evolution chain, flavour text, physical data, legendary/mythical flags, movepool, the set of forms/varieties (each with its own stats/types/sprite), and sprite/artwork URLs — fetched on demand from the static host when a Pokémon is opened, and held in memory for the session.

**Domain → UI mapping** (PokéAPI's model, per decision #2)
- The **species** is the unit shown in the list; the species' **default variety** supplies the list's sprite and type(s).
- The detail view **merges** species-level data (evolution, flavour, flags) with the **selected variety's** data (stats, types, abilities, moves, sprites).
- The **form switcher** chooses among the species' varieties; every variety is captured in the snapshot so switching needs no fetch.
- **Images** are referenced by their PokéAPI static URLs stored in the snapshot; the browser caches them. Image bytes are not vendored into the repo (revisit only if full offline imagery is wanted later).

**Visual identity** (decision #6 — "Pokédex Device", prototype: the visual-design mockup, direction A)
- Palette expressed as **CSS custom properties**. Light theme: dex-red chrome/accent, cream "screen" ground, warm-brown ink. Dark theme: deep-maroon/charcoal chrome, charcoal ground, cream ink, with type colours kept vivid — derived from tokens, not naïvely inverted.
- The **18 canonical Pokémon type colours** are the working palette: filled type badges, list dots, base-stat bar fills, and image-frame tinting all key off type.
- **Typography:** a self-hosted, open-licensed (OFL) rounded display face (recommended: Nunito), a humanist sans for body, and tabular-lining numerals for dex numbers and stats. No font CDN — the face is bundled/subset. (No web-font is loaded from a third party.)
- **Density:** chunky rounded panels with soft "toy" depth, comfortable list rows, generous detail hero image.
- **Themes:** both ship; default follows `prefers-color-scheme`, with a manual toggle that overrides it.

**Hosting & refresh**
- Deployed as a static build to **GitHub Pages** from this repository.
- The snapshot is regenerated by a **scheduled CI job** (e.g. a monthly GitHub Action) and can be regenerated on demand, so new Pokémon appear after a rebuild. Refresh cadence is a build detail, not a runtime concern.

## Testing Decisions

**What makes a good test here:** exercise **external, user-visible behaviour** through the app's real seams — never internal component state, private helpers, or implementation details that would break on a harmless refactor. The static snapshot is the app's central contract, so tests feed a known snapshot in and assert what the user would see.

**Modules under test:**
- **The app UI, driven against a fixture snapshot (primary seam).** Render the whole master–detail app with a small hand-authored snapshot (a handful of Pokémon spanning one/two types, a legendary, a species with multiple forms, and a branching evolution). Assert user-visible behaviour: searching by name and by number narrows the list; type/generation filters and sort change the list; the shiny toggle takes effect; selecting a row populates the detail pane and highlights the row; the detail pane shows stats, abilities, evolution chain, flavour, physical data, moves, and sprite gallery; clicking an evolution entry navigates; the form switcher swaps the detail data; on a narrow viewport the detail opens full-screen with a working back control; the theme toggle switches themes. No network is involved because data is static — tests are deterministic.
- **The snapshot generator (secondary seam).** It is a pure transform from PokéAPI responses to snapshot JSON. Unit-test the mapping against **recorded PokéAPI fixtures** (never the live API): the species index carries the right fields; per-species detail correctly assembles stats/abilities/evolution/moves/forms/sprite URLs; branching evolutions and multi-variety species are represented; missing/edge fields degrade gracefully.

**Prior art:** none — this is a greenfield app, so this spec *establishes* the testing convention. Use the framework-standard component/integration testing tools for a Vite + React + TypeScript project (a Vitest-style runner with a React Testing Library-style DOM driver). Keep fixtures small and committed alongside the tests.

## Out of Scope

- **Other Pokémon tools:** team builder, damage/battle calculator, and quiz/trivia game. The destination is browse-and-look-up only; these are different apps.
- **Native mobile or desktop apps.** Web only (the web app is responsive down to phone screens, but there is no iOS/Android/Electron build).
- **Accounts, favourites sync, sharing, or any multi-user features.** Personal, single-user use.
- **Any runtime dependence on PokéAPI.** All data is snapshotted at build time; the live site makes no PokéAPI calls.
- **Vendoring image bytes for full offline imagery.** Images are referenced by URL and browser-cached; bundling the image files is explicitly deferred.
- **Competitive/battle mechanics** (type-effectiveness calculators, damage rolls, tier lists). Type data is shown, but no battle math.

## Further Notes

- **Prototypes (throwaway):** the feature-set mockup — https://claude.ai/code/artifact/348ecd37-6d39-4e0b-8637-b9749b9784be (layout & features) — and the visual-design mockup — https://claude.ai/code/artifact/9ec22693-a406-41af-9da0-207fbf39788b (look & feel). Source lives under `pokedex/prototype/`. They exist only to record the decisions above; delete or absorb them once the real app takes shape.
- **`CLAUDE.md` needs updating.** It currently describes this repo as a skills-only knowledge base; the Pokédex app now also lives here (`pokedex/`). Update that description when app work begins.
- **Attribution/licensing:** data comes from PokéAPI (open); "Pokémon" and character names are Nintendo trademarks — attribute PokéAPI and avoid implying Nintendo endorsement. This is a non-commercial personal app. The chosen display font must be OFL-licensed and self-hosted.
- **Data freshness:** because data is snapshotted, the very newest game additions may lag until the snapshot is regenerated — acceptable, and the scheduled refresh keeps drift bounded.
