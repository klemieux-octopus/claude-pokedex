import '@testing-library/jest-dom'

// jsdom (via vitest, sous Node 22) n'expose pas window.localStorage. On fournit
// un polyfill mémoire minimal pour que les tests reposant sur la persistance
// (préférence de thème) disposent d'un Storage fonctionnel. Sans effet dans un
// vrai navigateur, où window.localStorage existe déjà.
if (typeof window !== 'undefined' && !window.localStorage) {
  const store = new Map<string, string>()
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => void store.set(k, String(v)),
      removeItem: (k: string) => void store.delete(k),
      clear: () => store.clear(),
      key: (i: number) => [...store.keys()][i] ?? null,
      get length() {
        return store.size
      },
    },
  })
}
