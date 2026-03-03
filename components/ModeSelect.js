// Mode Selection Screen - Choose between Live and Scenario modes

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.ModeSelect = function({ onSelectMode }) {
  const cardBase = {
    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
    border: '1px solid rgba(75, 85, 99, 0.3)',
    borderRadius: '12px',
    padding: '32px 24px',
    textAlign: 'center',
    transition: 'all 0.2s ease'
  };

  const [hovered, setHovered] = React.useState(null);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0f1a 0%, #0d1117 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      color: '#e5e7eb'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: 'clamp(24px, 6vw, 36px)',
          fontWeight: '200',
          letterSpacing: '4px',
          margin: '0 0 8px 0',
          color: '#60a5fa'
        }}>
          FED CHAIR
        </h1>
        <div style={{
          fontSize: '11px',
          letterSpacing: '2px',
          color: '#8b95a5'
        }}>
          SELECT MODE
        </div>
      </div>

      <div className="grid-mode-select" style={{ width: '100%', padding: '0 16px' }}>
        {/* Live Mode Card */}
        <button
          onClick={() => onSelectMode('live')}
          onMouseEnter={() => setHovered('live')}
          onMouseLeave={() => setHovered(null)}
          style={{
            ...cardBase,
            cursor: 'pointer',
            borderColor: hovered === 'live' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(34, 197, 94, 0.3)',
            boxShadow: hovered === 'live' ? '0 0 20px rgba(34, 197, 94, 0.15)' : 'none'
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>📡</div>
          <div style={{
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '2px',
            color: '#22c55e',
            marginBottom: '12px'
          }}>
            LIVE MODE
          </div>
          <div style={{
            fontSize: '13px',
            fontFamily: 'var(--font-prose)',
            color: '#9ca3af',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            Play with real economic data. Make decisions based on actual Fed conditions as of March 2026.
          </div>
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '4px',
            fontSize: '10px',
            letterSpacing: '1px',
            color: '#22c55e'
          }}>
            Current data as of March 2026
          </div>
        </button>

        {/* Scenario Mode Card (disabled) */}
        <div
          style={{
            ...cardBase,
            opacity: 0.5,
            cursor: 'not-allowed',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '3px 8px',
            background: 'rgba(168, 85, 247, 0.15)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '4px',
            fontSize: '9px',
            letterSpacing: '1px',
            color: '#a855f7',
            fontWeight: '600'
          }}>
            COMING SOON
          </div>
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>🎮</div>
          <div style={{
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '2px',
            color: '#a855f7',
            marginBottom: '12px'
          }}>
            SCENARIO MODE
          </div>
          <div style={{
            fontSize: '13px',
            fontFamily: 'var(--font-prose)',
            color: '#9ca3af',
            lineHeight: '1.6'
          }}>
            Navigate historical crises and custom scenarios. Oil shocks, banking panics, and more.
          </div>
        </div>
      </div>
    </div>
  );
};
