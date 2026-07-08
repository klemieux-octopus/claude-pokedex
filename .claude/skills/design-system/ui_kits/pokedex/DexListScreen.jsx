const { SearchInput, PokemonCard, TypeBadge, Badge } = window.PokDexDesignSystem_ec2824;

/**
 * DexListScreen — the browsing view: search, a type filter row, and a
 * scrollable stack of PokemonCards. Tapping a card opens the detail screen.
 */
function DexListScreen({ onSelect }) {
  const [q, setQ] = React.useState('');
  const [filter, setFilter] = React.useState(null);
  const data = window.DEX || [];

  const filtered = data.filter((p) => {
    const matchQ = p.name.toLowerCase().includes(q.toLowerCase());
    const matchT = !filter || p.types.includes(filter);
    return matchQ && matchT;
  });

  const filters = ['fire', 'water', 'grass', 'electric', 'psychic'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', background: 'var(--white)', borderBottom: '1px solid var(--ink-100)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
          <h1 style={{ margin: 0, font: 'var(--w-semibold) 26px/1 var(--font-display)', color: 'var(--ink-900)', letterSpacing: 'var(--ls-tight)' }}>Kanto Dex</h1>
          <Badge tone="accent">Gen I</Badge>
        </div>
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the dex…" size="sm"
          icon={<span style={{ fontSize: 15 }}>⌕</span>} />
        <div style={{ display: 'flex', gap: 6, marginTop: 12, overflowX: 'auto' }}>
          <button onClick={() => setFilter(null)} style={chip(filter === null)}>All</button>
          {filters.map((t) => (
            <button key={t} onClick={() => setFilter(filter === t ? null : t)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', opacity: filter && filter !== t ? 0.45 : 1 }}>
              <TypeBadge type={t} size="sm" />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'grid', gap: 12, background: 'var(--paper)' }}>
        {filtered.map((p) => (
          <PokemonCard key={p.number} number={p.number} name={p.name} types={p.types} onClick={() => onSelect(p)} />
        ))}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', font: 'var(--w-medium) 14px/1.5 var(--font-ui)', marginTop: 40 }}>No entries match.</p>
        )}
      </div>
    </div>
  );
}

function chip(active) {
  return {
    padding: '5px 14px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
    border: active ? 'none' : '2px solid var(--ink-200)',
    background: active ? 'var(--ink-900)' : 'var(--white)',
    color: active ? 'var(--white)' : 'var(--text-body)',
    font: 'var(--w-semibold) 12px/1 var(--font-ui)', letterSpacing: '0.06em', textTransform: 'uppercase',
  };
}

window.DexListScreen = DexListScreen;
