// Mode Selection Screen - Choose between Live and Scenario modes

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.ModeSelect = function({ onSelectMode }) {
  const [hovered, setHovered] = React.useState(null);
  const [dataStatus, setDataStatus] = React.useState('checking'); // 'checking' | 'live' | 'fallback' | 'refreshing'
  const [dataDate, setDataDate] = React.useState(null);
  const [fetchError, setFetchError] = React.useState(null);

  const cardBase = {
    background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
    border: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))',
    borderRadius: '12px',
    padding: '32px 24px',
    textAlign: 'center',
    transition: 'all 0.2s ease'
  };

  // Check data status on mount
  React.useEffect(() => {
    checkDataStatus();
  }, []);

  const checkDataStatus = async () => {
    setDataStatus('checking');
    setFetchError(null);
    try {
      const data = await window.FedChair.Data.fetchFredData();
      if (data && data._liveData) {
        setDataStatus('live');
        setDataDate(data._dataAsOf);
      } else {
        setDataStatus('fallback');
      }
    } catch (err) {
      setDataStatus('fallback');
      setFetchError(err.message);
    }
  };

  const handleRefresh = async () => {
    setDataStatus('refreshing');
    setFetchError(null);
    window.FedChair.Data.clearFredCache();
    try {
      const data = await window.FedChair.Data.fetchFredData();
      if (data && data._liveData) {
        setDataStatus('live');
        setDataDate(data._dataAsOf);
      } else {
        setDataStatus('fallback');
      }
    } catch (err) {
      setDataStatus('fallback');
      setFetchError(err.message);
    }
  };

  const statusBadge = () => {
    if (dataStatus === 'checking' || dataStatus === 'refreshing') {
      return {
        text: dataStatus === 'checking' ? 'Checking FRED data...' : 'Refreshing...',
        bg: 'rgba(96, 165, 250, 0.1)',
        border: 'rgba(96, 165, 250, 0.3)',
        color: '#60a5fa'
      };
    }
    if (dataStatus === 'live') {
      return {
        text: `Live data \u2014 ${dataDate || 'latest available'}`,
        bg: 'rgba(34, 197, 94, 0.1)',
        border: 'rgba(34, 197, 94, 0.3)',
        color: '#22c55e'
      };
    }
    return {
      text: fetchError ? 'FRED unavailable \u2014 using saved data' : 'Using saved data',
      bg: 'rgba(234, 179, 8, 0.1)',
      border: 'rgba(234, 179, 8, 0.3)',
      color: '#eab308'
    };
  };

  const badge = statusBadge();

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
          fontSize: 'var(--text-sm)',
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
          disabled={dataStatus === 'checking' || dataStatus === 'refreshing'}
          style={{
            ...cardBase,
            cursor: (dataStatus === 'checking' || dataStatus === 'refreshing') ? 'wait' : 'pointer',
            borderColor: hovered === 'live' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(34, 197, 94, 0.3)',
            boxShadow: hovered === 'live' ? '0 0 20px rgba(34, 197, 94, 0.15)' : 'none',
            opacity: (dataStatus === 'checking' || dataStatus === 'refreshing') ? 0.7 : 1
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>
            {dataStatus === 'live' ? '\uD83D\uDCE1' : dataStatus === 'fallback' ? '\uD83D\uDCC1' : '\u23F3'}
          </div>
          <div style={{
            fontSize: 'var(--text-lg)',
            fontWeight: '500',
            letterSpacing: '2px',
            color: '#22c55e',
            marginBottom: '12px'
          }}>
            LIVE MODE
          </div>
          <div style={{
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-prose)',
            color: '#9ca3af',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            Play with real economic data from the Federal Reserve. Make decisions based on actual conditions.
          </div>
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            background: badge.bg,
            border: `1px solid ${badge.border}`,
            borderRadius: '4px',
            fontSize: 'var(--text-xs)',
            letterSpacing: '1px',
            color: badge.color
          }}>
            {badge.text}
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
            fontSize: 'var(--text-xs)',
            letterSpacing: '1px',
            color: '#a855f7',
            fontWeight: '600'
          }}>
            COMING SOON
          </div>
          <div style={{ fontSize: '36px', marginBottom: '16px' }}>{'\uD83C\uDFAE'}</div>
          <div style={{
            fontSize: 'var(--text-lg)',
            fontWeight: '500',
            letterSpacing: '2px',
            color: '#a855f7',
            marginBottom: '12px'
          }}>
            SCENARIO MODE
          </div>
          <div style={{
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-prose)',
            color: '#9ca3af',
            lineHeight: '1.6'
          }}>
            Navigate historical crises and custom scenarios. Oil shocks, banking panics, and more.
          </div>
        </div>
      </div>

      {/* Refresh Button — below the cards */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button
          onClick={handleRefresh}
          disabled={dataStatus === 'checking' || dataStatus === 'refreshing'}
          style={{
            padding: '8px 20px',
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            background: 'transparent',
            border: '1px solid rgba(75, 85, 99, 0.4)',
            color: '#6b7280',
            borderRadius: '6px',
            cursor: (dataStatus === 'checking' || dataStatus === 'refreshing') ? 'wait' : 'pointer',
            minHeight: 'auto'
          }}
        >
          {dataStatus === 'refreshing' ? 'Refreshing...' : 'Refresh Data'}
        </button>
        <div style={{ fontSize: '10px', color: '#4b5563', marginTop: '6px' }}>
          Fetches latest data from FRED (Federal Reserve Economic Data)
        </div>
      </div>
    </div>
  );
};
