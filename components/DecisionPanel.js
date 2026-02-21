// Decision Panel Component - Rate selection and statement builder

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

const formatRate = (rate) => `${(rate - 0.125).toFixed(2)}% - ${(rate + 0.125).toFixed(2)}%`;

const getDecisionLabel = (bps) => {
  if (bps === -50) return '-50';
  if (bps === -25) return '-25';
  if (bps === 0) return 'HOLD';
  if (bps === 25) return '+25';
  if (bps === 50) return '+50';
  return `${bps}`;
};

const getDecisionColor = (bps) => {
  if (bps < 0) return '#22c55e';
  if (bps > 0) return '#ef4444';
  return '#60a5fa';
};

window.FedChair.Components.DecisionPanel = function({
  economicData,
  statementPhrases,
  currentRate,
  gameMode,
  setGameMode,
  rateDecision,
  setRateDecision,
  selectedStatements,
  setSelectedStatements,
  decisionPublished,
  hawkLabel,
  onDecision,
  onPublish,
  onReset
}) {
  const toggleStatement = (id) => {
    setSelectedStatements(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Mode Toggle */}
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'flex',
          background: 'rgba(17, 24, 39, 0.8)',
          borderRadius: '8px',
          padding: '4px',
          border: '1px solid rgba(75, 85, 99, 0.3)'
        }}>
          <button
            onClick={() => { setGameMode('quick'); onReset(); }}
            style={{
              padding: '12px 20px',
              fontSize: '11px',
              letterSpacing: '1px',
              background: gameMode === 'quick' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: gameMode === 'quick' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
              color: gameMode === 'quick' ? '#60a5fa' : '#6b7280',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ⚡ QUICK
          </button>
          <button
            onClick={() => { setGameMode('full'); onReset(); }}
            style={{
              padding: '12px 20px',
              fontSize: '11px',
              letterSpacing: '1px',
              background: gameMode === 'full' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: gameMode === 'full' ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
              color: gameMode === 'full' ? '#60a5fa' : '#6b7280',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            📋 FULL
          </button>
        </div>
      </div>

      <div style={panelStyle}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
          background: 'rgba(30, 58, 138, 0.2)'
        }}>
          <div style={{ fontSize: '12px', letterSpacing: '2px', color: '#9ca3af', marginBottom: '4px' }}>
            FOMC DECISION
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>
            {gameMode === 'quick' ? 'Tap a rate to see reaction' : 'Set rate, build statement, publish'}
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Current Rate */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px', letterSpacing: '1px' }}>
              CURRENT RATE
            </div>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 'clamp(24px, 7vw, 32px)',
              color: '#60a5fa'
            }}>
              {economicData.fedFundsRate.target}
            </div>
          </div>

          {/* Rate Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: '11px',
              color: '#9ca3af',
              marginBottom: '10px',
              letterSpacing: '1px',
              textAlign: 'center'
            }}>
              YOUR DECISION
            </div>
            <div className="rate-btn-grid">
              {[-50, -25, 0, 25, 50].map(bps => (
                <button
                  key={bps}
                  onClick={() => onDecision(bps)}
                  disabled={decisionPublished}
                  style={{
                    padding: '14px 8px',
                    fontSize: '14px',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: '500',
                    background: rateDecision === bps ? `${getDecisionColor(bps)}30` : 'rgba(17, 24, 39, 0.6)',
                    border: rateDecision === bps ? `2px solid ${getDecisionColor(bps)}` : '2px solid rgba(75, 85, 99, 0.3)',
                    color: rateDecision === bps ? getDecisionColor(bps) : '#9ca3af',
                    borderRadius: '8px',
                    cursor: decisionPublished ? 'not-allowed' : 'pointer',
                    opacity: decisionPublished ? 0.5 : 1
                  }}
                >
                  {getDecisionLabel(bps)}
                </button>
              ))}
            </div>
          </div>

          {/* New Rate Preview */}
          {rateDecision !== 0 && (
            <div style={{
              textAlign: 'center',
              padding: '14px',
              background: 'rgba(17, 24, 39, 0.5)',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '6px' }}>NEW RATE</div>
              <div style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '20px',
                color: getDecisionColor(rateDecision)
              }}>
                {formatRate(currentRate + rateDecision / 100)}
              </div>
            </div>
          )}

          {/* Statement Builder */}
          {gameMode === 'full' && !decisionPublished && (
            <div style={{ marginTop: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>
                  BUILD STATEMENT
                </div>
                <div style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: '500',
                  background: `${hawkLabel.color}20`,
                  color: hawkLabel.color,
                  border: `1px solid ${hawkLabel.color}40`
                }}>
                  {hawkLabel.label}
                </div>
              </div>

              {Object.entries(statementPhrases).map(([category, phrases]) => (
                <div key={category} style={{ marginBottom: '14px' }}>
                  <div style={{
                    fontSize: '10px',
                    color: '#6b7280',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {category === 'economic' && '📈 Economy'}
                    {category === 'labor' && '👥 Labor'}
                    {category === 'inflation' && '📊 Inflation'}
                    {category === 'guidance' && '🎯 Guidance'}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {phrases.map(phrase => (
                      <button
                        key={phrase.id}
                        onClick={() => toggleStatement(phrase.id)}
                        style={{
                          padding: '12px',
                          fontSize: '12px',
                          textAlign: 'left',
                          background: selectedStatements.includes(phrase.id)
                            ? 'rgba(59, 130, 246, 0.15)'
                            : 'rgba(17, 24, 39, 0.4)',
                          border: selectedStatements.includes(phrase.id)
                            ? '1px solid rgba(59, 130, 246, 0.4)'
                            : '1px solid rgba(75, 85, 99, 0.2)',
                          color: selectedStatements.includes(phrase.id) ? '#e5e7eb' : '#9ca3af',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          lineHeight: '1.4',
                          minHeight: '48px'
                        }}
                      >
                        {phrase.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Publish Button */}
          {gameMode === 'full' && !decisionPublished && (
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={onPublish}
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '1px',
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
              >
                📢 PUBLISH DECISION
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
