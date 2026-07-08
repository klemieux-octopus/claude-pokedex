const { LED } = window.PokDexDesignSystem_ec2824;

/**
 * DeviceShell — the retro red Pokédex body. Molded plastic, lens LEDs up top,
 * a dark-bezel screen window in the middle, a speaker grille + home button below.
 * Modern content lives inside the screen (children).
 */
function DeviceShell({ children, onHome, statusText = 'STANDBY' }) {
  return (
    <div style={{
      width: 420,
      background: 'linear-gradient(160deg, var(--poke-red-hi), var(--poke-red) 34%, var(--poke-red-deep))',
      borderRadius: 'var(--r-shell)',
      padding: 18,
      boxShadow: 'var(--shadow-3), inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -6px 14px rgba(0,0,0,0.28)',
      fontFamily: 'var(--font-ui)',
    }}>
      {/* Top lens cluster */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '2px 4px 16px' }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%',
          background: 'radial-gradient(circle at 34% 30%, #cfeaff, var(--poke-blue) 66%)',
          border: '4px solid rgba(255,255,255,0.9)',
          boxShadow: 'var(--led-glow-blue), inset 0 2px 4px rgba(255,255,255,0.6)',
        }} />
        <LED color="red" size={16} />
        <LED color="yellow" size={16} />
        <LED color="green" size={16} />
        <div style={{ flex: 1 }} />
        <span style={{ font: 'var(--w-medium) 9px/1 var(--font-pixel)', color: 'rgba(255,255,255,0.85)' }}>DEX-04</span>
      </div>

      {/* Screen window */}
      <div style={{
        borderRadius: 'var(--r-lg)',
        background: 'var(--ink-900)',
        padding: 12,
        boxShadow: 'inset 0 3px 10px rgba(0,0,0,0.5)',
      }}>
        {/* mini status strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px 8px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--led-green)', boxShadow: 'var(--led-glow-green)' }} />
          <span style={{ font: 'var(--w-bold) 10px/1 var(--font-mono)', color: 'var(--lcd)', letterSpacing: '0.14em' }}>{statusText}</span>
        </div>
        <div style={{
          height: 560,
          background: 'var(--paper)',
          borderRadius: 'var(--r-md)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.15)',
        }}>
          {children}
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 6px 2px' }}>
        <button
          onClick={onHome}
          aria-label="Home"
          style={{
            width: 46, height: 46, borderRadius: '50%', border: 'none', cursor: 'pointer',
            background: 'radial-gradient(circle at 36% 30%, #fff, var(--ink-100) 70%)',
            boxShadow: 'var(--emboss)', font: '18px/1 var(--font-ui)', color: 'var(--poke-red)',
            transition: 'transform var(--dur-fast) var(--ease-pop)',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translateY(2px) scale(0.95)'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'none'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
        >⌂</button>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ height: 4, borderRadius: 999, background: 'rgba(0,0,0,0.22)', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.3)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--poke-red-deep)', boxShadow: 'var(--deboss)' }} />
          <span style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--poke-red-deep)', boxShadow: 'var(--deboss)' }} />
        </div>
      </div>
    </div>
  );
}

window.DeviceShell = DeviceShell;
