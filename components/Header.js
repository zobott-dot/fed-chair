// Header Component - Title bar and navigation

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.Header = function({
  activeView,
  setActiveView,
  showReaction,
  nextMeeting,
  meetingNumber,
  totalMeetings,
  gameEnded,
  onNewGame,
  gameMode,
  shimmerKey,
  learnMode,
  setLearnMode
}) {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const views = ['dashboard', 'briefing', 'decision', ...(showReaction ? ['aftermath'] : [])];

  const handleNewGameClick = () => {
    // If game is over or at meeting 1 with no decisions, no need to confirm
    if (gameEnded || meetingNumber === 1) {
      onNewGame && onNewGame();
    } else {
      setShowConfirm(true);
    }
  };

  const confirmNewGame = () => {
    setShowConfirm(false);
    onNewGame && onNewGame();
  };

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
          <h1
            key={shimmerKey || 0}
            className="title-shimmer"
            style={{
              fontSize: 'clamp(28px, 6vw, 52px)',
              fontWeight: '700',
              letterSpacing: '6px',
              margin: 0
            }}
          >
            FED CHAIR
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Meeting indicator */}
          {meetingNumber && totalMeetings && (
            <div style={{
              padding: '8px 14px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '4px',
              fontSize: 'var(--text-sm)',
              color: '#60a5fa',
              letterSpacing: '1px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {gameEnded ? 'GAME OVER' : `MEETING ${meetingNumber}/${totalMeetings}`}
            </div>
          )}

          {/* New Game Button */}
          <button
            onClick={handleNewGameClick}
            style={{
              padding: '8px 14px',
              background: 'rgba(75, 85, 99, 0.2)',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              borderRadius: '4px',
              fontSize: 'var(--text-sm)',
              color: '#9ca3af',
              letterSpacing: '1px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s',
              minHeight: 'auto'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
              e.target.style.borderColor = 'rgba(239, 68, 68, 0.4)';
              e.target.style.color = '#ef4444';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(75, 85, 99, 0.2)';
              e.target.style.borderColor = 'rgba(75, 85, 99, 0.4)';
              e.target.style.color = '#9ca3af';
            }}
          >
            🔄 NEW
          </button>

          {/* Learn Mode Toggle */}
          <button
            className={`learn-toggle${learnMode ? ' active' : ''}`}
            onClick={() => setLearnMode && setLearnMode(!learnMode)}
            style={{ minHeight: 'auto' }}
          >
            LEARN
          </button>

          <div style={{
            padding: '8px 14px',
            background: gameMode === 'scenario' ? 'rgba(168, 85, 247, 0.1)' : 'rgba(34, 197, 94, 0.1)',
            border: '1px solid ' + (gameMode === 'scenario' ? 'rgba(168, 85, 247, 0.3)' : 'rgba(34, 197, 94, 0.3)'),
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
                background: gameMode === 'scenario' ? '#a855f7' : '#22c55e'
              }}
            />
            <span style={{ fontSize: 'var(--text-sm)', color: gameMode === 'scenario' ? '#a855f7' : '#22c55e', letterSpacing: '1px' }}>
              {gameMode === 'scenario' ? 'SCENARIO' : 'LIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #1a1f2e 0%, #0d1117 100%)',
            border: '1px solid rgba(75, 85, 99, 0.5)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>⚠️</div>
            <div style={{ fontSize: '16px', color: '#f9fafb', marginBottom: '8px' }}>
              Start New Game?
            </div>
            <div style={{ fontSize: '13px', fontFamily: 'var(--font-prose)', color: '#9ca3af', marginBottom: '24px', lineHeight: 'var(--leading-normal)' }}>
              You're currently at Meeting {meetingNumber} of {totalMeetings}.
              Starting a new game will reset all progress.
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: '12px 24px',
                  fontSize: '13px',
                  background: 'rgba(75, 85, 99, 0.3)',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  color: '#9ca3af',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmNewGame}
                style={{
                  padding: '12px 24px',
                  fontSize: '13px',
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Reset Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nav Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
        {views.map(view => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            style={{
              flex: 1,
              maxWidth: '140px',
              padding: '12px',
              fontSize: 'var(--text-sm)',
              letterSpacing: '1px',
              background: activeView === view ? 'rgba(59, 130, 246, 0.2)' : 'rgba(17, 24, 39, 0.5)',
              border: activeView === view ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid rgba(75, 85, 99, 0.3)',
              color: activeView === view ? '#60a5fa' : '#8b95a5',
              borderRadius: '6px',
              cursor: 'pointer',
              minHeight: 'auto'
            }}
          >
            {view === 'dashboard' ? '📊 DATA' : view === 'briefing' ? '📋 BRIEF' : view === 'decision' ? '⚡ DECIDE' : '📈 RESULT'}
          </button>
        ))}
      </div>
    </header>
  );
};

window.FedChair.Components.MeetingBanner = function({
  nextMeeting,
  meetingNumber,
  totalMeetings,
  marketExpects,
  credibility
}) {
  const getExpectationLabel = (bps) => {
    if (bps === 0) return 'HOLD';
    if (bps > 0) return `+${bps}bp`;
    return `${bps}bp`;
  };

  const getExpectationColor = (bps) => {
    if (bps > 0) return '#ef4444';
    if (bps < 0) return '#22c55e';
    return '#60a5fa';
  };

  return (
    <div style={{
      background: 'rgba(30, 58, 138, 0.15)',
      padding: '14px 20px',
      borderBottom: '1px solid rgba(75, 85, 99, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '28px',
      flexWrap: 'wrap'
    }}>
      <div>
        <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>Meeting: </span>
        <span style={{ fontSize: 'var(--text-base)', color: '#60a5fa', fontWeight: '600', fontFamily: 'var(--font-data)' }}>{nextMeeting}</span>
      </div>
      <div>
        <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>Market Expects: </span>
        <span style={{
          fontSize: 'var(--text-base)',
          color: getExpectationColor(marketExpects || 0),
          fontWeight: '600',
          fontFamily: 'var(--font-data)'
        }}>
          {getExpectationLabel(marketExpects || 0)}
        </span>
      </div>
      {credibility !== undefined && (
        <div>
          <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>Credibility: </span>
          <span style={{
            fontSize: 'var(--text-base)',
            color: credibility >= 60 ? '#22c55e' : credibility >= 40 ? '#eab308' : '#ef4444',
            fontWeight: '600',
            fontFamily: 'var(--font-data)'
          }}>
            {credibility}/100
          </span>
        </div>
      )}
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
      color: '#6b7280',
      marginTop: '20px'
    }}>
      <div>Fed Chair: The War Room | Multi-Round Simulation</div>
    </footer>
  );
};
