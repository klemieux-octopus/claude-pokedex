**PokemonCard** — the iconic dex entry tile. Type-tinted gradient panel, zero-padded dex number, rounded-display name, sprite slot, type chips. Provide creature art via `sprite`; a neutral `?` silhouette shows otherwise.

```jsx
<PokemonCard number={4} name="Charmander" types={['fire']} onClick={openDetail} />
```
