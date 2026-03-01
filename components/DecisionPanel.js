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

const getCredibilityColor = (credibility) => {
  if (credibility >= 80) return '#22c55e';
  if (credibility >= 60) return '#84cc16';
  if (credibility >= 40) return '#eab308';
  if (credibility >= 20) return '#f97316';
  return '#ef4444';
};

window.FedChair.Components.DecisionPanel = function({
  economicData,
  statementPhrases,
  currentRate,
  rateDecision,
  setRateDecision,
  selectedStatements,
  setSelectedStatements,
  decisionPublished,
  hawkLabel,
  onDecision,
  onPublish,
  gameState
}) {
  const toggleStatement = (id) => {
    setSelectedStatements(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const meetingNumber = gameState?.meetingNumber || 1;
  const totalMeetings = gameState?.totalMeetings || 8;
  const credibility = gameState?.credibility || 100;
  const marketExpects = gameState?.marketExpects || 0;

  return (
    <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Meeting Context */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        padding: '12px 16px',
        background: 'rgba(17, 24, 39, 0.6)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        borderRadius: '8px'
      }}>
        <div>
          <div style={{ fontSize: '10px', color: '#8b95a5', marginBottom: '2px' }}>Meeting</div>
          <div style={{ fontSize: '14px', color: '#60a5fa' }}>
            {meetingNumber} of {totalMeetings}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#8b95a5', marginBottom: '2px' }}>Market Expects</div>
          <div style={{
            fontSize: '14px',
            color: marketExpects > 0 ? '#ef4444' : marketExpects < 0 ? '#22c55e' : '#60a5fa'
          }}>
            {marketExpects === 0 ? 'HOLD' : `${marketExpects > 0 ? '+' : ''}${marketExpects}bp`}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '10px', color: '#8b95a5', marginBottom: '2px' }}>Credibility</div>
          <div style={{ fontSize: '14px', color: getCredibilityColor(credibility) }}>
            {credibility}/100
          </div>
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
          <div style={{ fontSize: '11px', color: '#8b95a5' }}>
            Set the target rate and craft your statement
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Current Rate */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#8b95a5', marginBottom: '8px', letterSpacing: '1px' }}>
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

          {/* Surprise Indicator */}
          {rateDecision !== marketExpects && (
            <div style={{
              textAlign: 'center',
              padding: '10px',
              marginBottom: '16px',
              background: Math.abs(rateDecision - marketExpects) > 25
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(234, 179, 8, 0.1)',
              border: `1px solid ${Math.abs(rateDecision - marketExpects) > 25
                ? 'rgba(239, 68, 68, 0.3)'
                : 'rgba(234, 179, 8, 0.3)'}`,
              borderRadius: '6px',
              fontSize: '11px'
            }}>
              <span style={{
                color: Math.abs(rateDecision - marketExpects) > 25 ? '#ef4444' : '#eab308'
              }}>
                ⚠️ {Math.abs(rateDecision - marketExpects) > 25 ? 'Major' : 'Mild'} surprise vs market expectations
              </span>
            </div>
          )}

          {/* New Rate Preview */}
          {rateDecision !== 0 && (
            <div style={{
              textAlign: 'center',
              padding: '14px',
              background: 'rgba(17, 24, 39, 0.5)',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: '10px', color: '#8b95a5', marginBottom: '6px' }}>NEW RATE</div>
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
          {!decisionPublished && (
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

              {statementPhrases && Object.entries(statementPhrases).map(([category, phrases]) => (
                <div key={category} style={{ marginBottom: '14px' }}>
                  <div className="statement-category-label" style={{
                    fontSize: '10px',
                    color: '#8b95a5',
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
                          fontSize: 'var(--text-base)',
                          fontFamily: 'var(--font-prose)',
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
                          lineHeight: 'var(--leading-normal)',
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
          {!decisionPublished && (
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

      {/* Pending Effects Reminder */}
      {gameState?.pendingEffects?.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-prose)',
          color: '#60a5fa'
        }}>
          💡 Remember: Your past decisions are still working through the economy. Rate changes take 2-3 meetings to fully impact inflation and growth.
        </div>
      )}
    </main>
  );
};
