// Aftermath Component - Market reaction and scorecard

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

const formatRate = (rate) => `${(rate - 0.125).toFixed(2)}% - ${(rate + 0.125).toFixed(2)}%`;

const getDecisionLabelFull = (bps) => {
  if (bps === 0) return 'HOLD';
  return `${bps > 0 ? '+' : ''}${bps} bps`;
};

const getDecisionColor = (bps) => {
  if (bps < 0) return '#22c55e';
  if (bps > 0) return '#ef4444';
  return '#60a5fa';
};

window.FedChair.Components.Aftermath = function({
  marketReaction,
  score,
  rateDecision,
  currentRate,
  selectedStatements,
  hawkLabel,
  aftermathPhase,
  economicData,
  onReset
}) {
  return (
    <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Breaking Ticker */}
      <div style={{
        background: 'linear-gradient(90deg, #0891b2, #0d9488)',
        padding: '8px 0',
        marginBottom: '16px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <div
          className="ticker-scroll"
          style={{
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            paddingLeft: '100%'
          }}
        >
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'white', marginRight: '40px' }}>
            📢 {marketReaction.headline}
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginRight: '40px' }}>
            S&P: {marketReaction.sp500.change >= 0 ? '+' : ''}{marketReaction.sp500.change.toFixed(2)}%
          </span>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.9)', marginRight: '40px' }}>
            10Y: {marketReaction.treasury10y.change >= 0 ? '+' : ''}{marketReaction.treasury10y.change.toFixed(1)}bps
          </span>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'white', marginRight: '40px' }}>
            📢 {marketReaction.headline}
          </span>
        </div>
      </div>

      <div className="grid-aftermath">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Market Reaction */}
          {aftermathPhase >= 1 && (
            <div className="animate-slideIn" style={panelStyle}>
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
                background: marketReaction.surprise < 0
                  ? 'rgba(34, 197, 94, 0.1)'
                  : marketReaction.surprise > 0
                    ? 'rgba(239, 68, 68, 0.1)'
                    : 'rgba(59, 130, 246, 0.1)'
              }}>
                <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#9ca3af' }}>
                  MARKET REACTION
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <div className="grid-markets" style={{ marginBottom: '12px' }}>
                  {[
                    { label: 'S&P 500', value: marketReaction.sp500.value.toLocaleString(undefined, { maximumFractionDigits: 0 }), change: marketReaction.sp500.change, unit: '%' },
                    { label: 'VIX', value: marketReaction.vix.value.toFixed(2), change: marketReaction.vix.change, unit: '', inv: true },
                    { label: '10Y', value: marketReaction.treasury10y.value.toFixed(2) + '%', change: marketReaction.treasury10y.change, unit: 'bp', inv: true },
                    { label: '2Y', value: marketReaction.treasury2y.value.toFixed(2) + '%', change: marketReaction.treasury2y.change, unit: 'bp', inv: true },
                    { label: 'DXY', value: marketReaction.dxy.value.toFixed(2), change: marketReaction.dxy.change, unit: '%' }
                  ].map((m, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '12px',
                        background: 'rgba(17, 24, 39, 0.5)',
                        borderRadius: '8px',
                        border: `1px solid ${(m.inv ? m.change <= 0 : m.change >= 0) ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`
                      }}
                    >
                      <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>{m.label}</div>
                      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', color: '#f9fafb' }}>
                        {m.value}
                      </div>
                      <div style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '12px',
                        color: (m.inv ? m.change <= 0 : m.change >= 0) ? '#22c55e' : '#ef4444'
                      }}>
                        {m.change >= 0 ? '+' : ''}{m.change.toFixed(m.unit === 'bp' ? 1 : 2)}{m.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sectors */}
          {aftermathPhase >= 2 && (
            <div className="animate-d1" style={{ ...panelStyle, padding: '16px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#9ca3af', marginBottom: '12px' }}>
                SECTORS
              </div>
              <div className="grid-sectors">
                {[
                  { name: 'Tech', change: marketReaction.sectors.tech, icon: '💻' },
                  { name: 'Banks', change: marketReaction.sectors.financials, icon: '🏦' },
                  { name: 'Utilities', change: marketReaction.sectors.utilities, icon: '⚡' },
                  { name: 'Credit', change: marketReaction.creditSpread, icon: '📊', unit: 'bp' }
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px',
                      background: 'rgba(17, 24, 39, 0.5)',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '18px', marginBottom: '6px' }}>{s.icon}</div>
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '2px' }}>{s.name}</div>
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '14px',
                      color: (s.unit === 'bp' ? s.change <= 0 : s.change >= 0) ? '#22c55e' : '#ef4444'
                    }}>
                      {s.change >= 0 ? '+' : ''}{s.change.toFixed(s.unit === 'bp' ? 1 : 2)}{s.unit || '%'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projections */}
          {aftermathPhase >= 3 && (
            <div className="animate-d2" style={{ ...panelStyle, padding: '16px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#9ca3af', marginBottom: '12px' }}>
                2026 PROJECTIONS (REVISED)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { label: 'GDP', before: economicData.gdp.forecast, after: marketReaction.projections.gdp, good: 'up' },
                  { label: 'Unemp.', before: economicData.unemployment.forecast, after: marketReaction.projections.unemployment, good: 'down' },
                  { label: 'PCE', before: economicData.inflationForecast.forecast, after: marketReaction.projections.inflation, good: 'down' }
                ].map((p, i) => {
                  const diff = p.after - p.before;
                  const isGood = p.good === 'up' ? diff > 0 : diff < 0;
                  return (
                    <div
                      key={i}
                      style={{
                        padding: '12px',
                        background: 'rgba(17, 24, 39, 0.5)',
                        borderRadius: '8px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '6px' }}>{p.label}</div>
                      <div style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '16px',
                        color: isGood ? '#22c55e' : '#ef4444'
                      }}>
                        {p.after.toFixed(1)}%
                      </div>
                      <div style={{ fontSize: '10px', color: '#6b7280' }}>was {p.before.toFixed(1)}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Press Q&A */}
          {aftermathPhase >= 4 && (
            <div className="animate-d3" style={panelStyle}>
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
                background: 'rgba(59, 130, 246, 0.1)'
              }}>
                <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#9ca3af' }}>
                  🎤 PRESS CONFERENCE
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                {marketReaction.questions.map((q, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px',
                      background: i % 2 === 0 ? 'rgba(17, 24, 39, 0.3)' : 'transparent',
                      borderRadius: '6px',
                      marginBottom: '6px'
                    }}
                  >
                    <div style={{ fontSize: '10px', color: '#60a5fa', marginBottom: '2px' }}>{q.outlet}</div>
                    <div style={{ fontSize: '12px', color: '#e5e7eb', fontStyle: 'italic' }}>"{q.question}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Decision Summary */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(17, 24, 39, 0.8) 100%)',
            border: '1px solid rgba(75, 85, 99, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>YOUR DECISION</div>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '28px',
              color: getDecisionColor(rateDecision)
            }}>
              {getDecisionLabelFull(rateDecision)}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px' }}>
              New Rate: <span style={{ color: '#60a5fa' }}>{formatRate(currentRate + rateDecision / 100)}</span>
            </div>
            {selectedStatements.length > 0 && (
              <div style={{
                marginTop: '12px',
                padding: '8px',
                background: `${hawkLabel.color}15`,
                borderRadius: '6px',
                border: `1px solid ${hawkLabel.color}30`
              }}>
                <span style={{ fontSize: '11px', color: hawkLabel.color }}>{hawkLabel.label}</span>
              </div>
            )}
          </div>

          {/* Score Card */}
          {aftermathPhase >= 2 && (
            <div className="animate-d1" style={{ ...panelStyle, padding: '20px' }}>
              <div style={{
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#9ca3af',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                SCORECARD
              </div>

              <div className="grade-reveal" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: `${score.overall.color}20`,
                  border: `3px solid ${score.overall.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 10px'
                }}>
                  <span style={{ fontSize: '32px', fontWeight: '600', color: score.overall.color }}>
                    {score.overall.grade}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: score.overall.color, fontWeight: '500' }}>
                  {score.overall.text}
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  {score.overall.score}/100
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Market Stability', data: score.marketStability, icon: '📊' },
                  { label: 'Credibility', data: score.credibility, icon: '🎯' },
                  { label: 'Mandate Balance', data: score.mandateBalance, icon: '⚖️' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '14px' }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <span style={{ fontSize: '10px', color: '#9ca3af' }}>{item.label}</span>
                        <span style={{ fontSize: '10px', color: item.data.color, fontWeight: '500' }}>
                          {item.data.grade}
                        </span>
                      </div>
                      <div style={{
                        height: '5px',
                        background: 'rgba(75, 85, 99, 0.3)',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${item.data.score}%`,
                          height: '100%',
                          background: item.data.color,
                          borderRadius: '3px',
                          transition: 'width 0.8s ease-out'
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Try Again */}
          {aftermathPhase >= 4 && (
            <button
              onClick={onReset}
              className="animate-d3"
              style={{
                padding: '16px',
                fontSize: '13px',
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
              🔄 TRY AGAIN
            </button>
          )}
        </div>
      </div>
    </main>
  );
};
