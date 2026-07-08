const { TypeBadge, StatBar, Badge, Button, IconButton } = window.PokDexDesignSystem_ec2824;

const DETAIL_TINT = {
  normal: '--type-normal', fire: '--type-fire', water: '--type-water', grass: '--type-grass',
  electric: '--type-electric', ice: '--type-ice', fighting: '--type-fighting', poison: '--type-poison',
  ground: '--type-ground', flying: '--type-flying', psychic: '--type-psychic', bug: '--type-bug',
  rock: '--type-rock', ghost: '--type-ghost', dragon: '--type-dragon', dark: '--type-dark',
  steel: '--type-steel', fairy: '--type-fairy',
};

/**
 * DexDetailScreen — a single entry: hero sprite panel on a type gradient,
 * name + dex number, type chips, base stats, and flavor text.
 */
function DexDetailScreen({ entry, onBack }) {
  const [caught, setCaught] = React.useState(false);
  const tint = DETAIL_TINT[entry.types[0]] || DETAIL_TINT.normal;
  const dex = '#' + String(entry.number).padStart(4, '0');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--white)' }}>
      {/* Hero */}
      <div style={{
        position: 'relative', padding: '14px 16px 22px',
        background: `linear-gradient(160deg, color-mix(in srgb, var(${tint}) 92%, white), color-mix(in srgb, var(${tint}) 62%, white))`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton label="Back" variant="neutral" size="sm" onClick={onBack}>←</IconButton>
          <span style={{ font: 'var(--w-bold) 14px/1 var(--font-mono)', color: 'rgba(255,255,255,0.9)' }}>{dex}</span>
        </div>
        <div style={{
          margin: '10px auto 12px', width: 150, height: 150, borderRadius: '50%',
          background: 'radial-gradient(circle at 38% 32%, rgba(255,255,255,0.6), rgba(255,255,255,0.05) 62%)',
          border: '3px solid rgba(255,255,255,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ font: '48px/1 var(--font-pixel)', color: 'rgba(255,255,255,0.75)' }}>?</span>
        </div>
        <h1 style={{ margin: 0, textAlign: 'center', font: 'var(--w-semibold) 34px/1 var(--font-display)', color: 'var(--white)', textShadow: '0 2px 4px rgba(0,0,0,0.25)' }}>{entry.name}</h1>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 10 }}>
          {entry.types.map((t) => <TypeBadge key={t} type={t} />)}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 22px' }}>
        <p style={{ margin: '0 0 18px', font: 'var(--w-regular) 15px/1.55 var(--font-ui)', color: 'var(--text-body)' }}>{entry.flavor}</p>

        <div style={{ font: 'var(--w-bold) 11px/1 var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 14 }}>Base stats</div>
        <div style={{ display: 'grid', gap: 10 }}>
          <StatBar label="HP" value={entry.hp} />
          <StatBar label="ATK" value={entry.atk} />
          <StatBar label="DEF" value={entry.def} />
          <StatBar label="SPD" value={entry.spd} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <Button variant={caught ? 'neutral' : 'primary'} block onClick={() => setCaught(!caught)}>
            {caught ? 'Registered ✓' : 'Register catch'}
          </Button>
        </div>
        {caught && <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}><Badge tone="success">Added to your dex</Badge></div>}
      </div>
    </div>
  );
}

window.DexDetailScreen = DexDetailScreen;
