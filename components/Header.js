// Header Component - Title bar and navigation

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.Header = function({ activeView, setActiveView, showReaction, nextMeeting }) {
  const views = ['dashboard', 'decision', ...(showReaction ? ['aftermath'] : [])];

  return (
    <header style={{
      padding: '12px 16px',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
      background: 'rgba(10, 15, 26, 0.95)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(18px, 5vw, 24px)',
            fontWeight: '200',
            letterSpacing: '3px',
            margin: 0,
            color: '#60a5fa'
          }}>
            FED CHAIR
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            padding: '6px 10px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div
              className="animate-pulse"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e'
              }}
            />
            <span style={{ fontSize: '9px', color: '#22c55e', letterSpacing: '1px' }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
        {views.map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            style={{
              flex: 1,
              maxWidth: '110px',
              padding: '10px',
              fontSize: '10px',
              letterSpacing: '1px',
              background: activeView === view ? 'rgba(59, 130, 246, 0.2)' : 'rgba(17, 24, 39, 0.5)',
              border: activeView === view ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(75, 85, 99, 0.3)',
              color: activeView === view ? '#60a5fa' : '#6b7280',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {view === 'dashboard' ? '📊 DATA' : view === 'decision' ? '⚡ DECIDE' : '📈 RESULT'}
          </button>
        ))}
      </div>
    </header>
  );
};

window.FedChair.Components.MeetingBanner = function({ nextMeeting }) {
  return (
    <div style={{
      background: 'rgba(30, 58, 138, 0.15)',
      padding: '10px 16px',
      borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
      textAlign: 'center'
    }}>
      <span style={{ fontSize: '11px', color: '#9ca3af' }}>Next FOMC: </span>
      <span style={{ fontSize: '12px', color: '#60a5fa', fontWeight: '500' }}>{nextMeeting}</span>
      <span style={{ fontSize: '11px', color: '#6b7280', marginLeft: '12px' }}>Market: 92% HOLD</span>
    </div>
  );
};

window.FedChair.Components.Footer = function() {
  return (
    <footer style={{
      padding: '16px',
      borderTop: '1px solid rgba(75, 85, 99, 0.2)',
      textAlign: 'center',
      fontSize: '10px',
      color: '#4b5563',
      marginTop: '20px'
    }}>
      <div>Data: February 15, 2026 | Fed Chair: The War Room</div>
    </footer>
  );
};
