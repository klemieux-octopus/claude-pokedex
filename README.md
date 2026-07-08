# claude-pokedex

A personal, browser-based Pokédex — browse and look up Pokémon across all
generations, backed by a build-time snapshot of [PokéAPI](https://pokeapi.co).
See the spec comment on [issue #1](https://github.com/klemieux-octopus/claude-pokedex/issues/1) for the full spec.

React + Vite + TypeScript SPA, deployed to GitHub Pages. The app lives at the
repository root; a vendored library of agent skills also lives under `.claude/skills/`.

## Develop

```bash
npm install
npm run dev        # local dev server
npm run test       # run the test suite once
npm run test:watch # watch mode
npm run typecheck  # type-check without emitting
npm run generate   # rebuild the PokéAPI snapshot into public/data/
npm run build      # type-check + static production build → dist/
npm run preview    # serve the production build locally
```

## Deploy

Pushes to `main` that touch the app trigger the
[deploy workflow](.github/workflows/pokedex-deploy.yml), which builds and
publishes `dist/` to GitHub Pages at `https://<owner>.github.io/claude-pokedex/`.
The Vite `base` is `/claude-pokedex/`; a `public/404.html` fallback re-routes
deep links back into the SPA. Requires Pages enabled with **Source: GitHub
Actions** in the repository settings.
