// End-of-Campaign Assessment Component
// Comprehensive scorecard shown after all 8 meetings or early termination

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const endGamePanelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

window.FedChair.Components.EndGame = function({ gameState, assessment, onNewGame }) {
  const [revealPhase, setRevealPhase] = React.useState(0);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setRevealPhase(1), 400),
      setTimeout(() => setRevealPhase(2), 1000),
      setTimeout(() => setRevealPhase(3), 1600),
      setTimeout(() => setRevealPhase(4), 2200),
      setTimeout(() => setRevealPhase(5), 2800)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!assessment) return null;

  const endResult = gameState.endResult;
  const endReason = gameState.endReason;

  const resultBanner = {
    win: { bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.4)', color: '#22c55e', label: 'SOFT LANDING' },
    lose: { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.4)', color: '#ef4444', label: 'POLICY FAILURE' },
    draw: { bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.4)', color: '#eab308', label: 'MUDDLED THROUGH' }
  };
  const banner = resultBanner[endResult] || resultBanner.draw;

  const endMessages = {
    'soft_landing': 'You achieved the elusive soft landing. Inflation is under control, growth is positive, and your credibility remains strong.',
    'recession': 'The economy has entered a recession. Tight monetary policy pushed growth negative for too long.',
    'runaway_inflation': 'Inflation spiraled out of control. Loose monetary policy allowed prices to rise unchecked.',
    'stagflation': 'The worst of both worlds: high inflation combined with high unemployment.',
    'credibility_collapse': 'Markets no longer trust Fed guidance. Inconsistent messaging eroded all credibility.',
    'muddle_through': 'You avoided disaster, but the landing was bumpy. Not a soft landing, but not a catastrophe either.'
  };

  const formatRate = (rate) => `${(rate - 0.125).toFixed(2)}% - ${(rate + 0.125).toFixed(2)}%`;

  return (
    <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Result Banner */}
      <div style={{
        background: banner.bg,
        border: `2px solid ${banner.border}`,
        borderRadius: '16px',
        padding: '28px 24px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: 'clamp(22px, 5vw, 34px)',
          fontWeight: '600',
          color: banner.color,
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '3px'
        }}>
          {banner.label}
        </div>
        <div style={{
          fontSize: 'var(--text-base, 14px)',
          fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
          color: '#9ca3af',
          lineHeight: '1.7',
          maxWidth: '520px',
          margin: '0 auto'
        }}>
          {endMessages[endReason] || 'The game has ended.'}
        </div>
      </div>

      {/* Overall Grade */}
      {revealPhase >= 1 && (
        <div className="animate-slideIn" style={{
          ...endGamePanelStyle,
          padding: '28px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '16px', fontWeight: '600' }}>
            OVERALL ASSESSMENT
          </div>
          <div className="grade-glow" style={{
            '--grade-color': assessment.gradeColor,
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            background: `${assessment.gradeColor}18`,
            border: `3px solid ${assessment.gradeColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <span style={{
              fontSize: '40px',
              fontWeight: '600',
              color: assessment.gradeColor,
              fontFamily: '"IBM Plex Mono", monospace'
            }}>
              {assessment.grade}
            </span>
          </div>
          <div style={{ fontSize: 'var(--text-base, 14px)', color: assessment.gradeColor, fontWeight: '500', marginBottom: '4px' }}>
            {assessment.gradeText}
          </div>
          <div style={{ fontSize: 'var(--text-sm, 12px)', color: '#6b7280' }}>
            {assessment.overallScore}/100
          </div>
        </div>
      )}

      {/* Component Breakdown */}
      {revealPhase >= 2 && (
        <div className="animate-slideIn" style={{ ...endGamePanelStyle, padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '16px', fontWeight: '600', textAlign: 'center' }}>
            PERFORMANCE BREAKDOWN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.values(assessment.components).map((comp, i) => {
              const barColor = comp.score >= 80 ? '#22c55e' : comp.score >= 60 ? '#84cc16' : comp.score >= 40 ? '#eab308' : '#ef4444';
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: 'var(--text-xs, 11px)', color: '#9ca3af' }}>{comp.label}</span>
                    <span style={{ fontSize: 'var(--text-xs, 11px)', color: barColor, fontFamily: '"IBM Plex Mono", monospace' }}>
                      {comp.score} <span style={{ color: '#6b7280' }}>({comp.weight}%)</span>
                    </span>
                  </div>
                  <div style={{
                    height: '6px',
                    background: 'rgba(75, 85, 99, 0.3)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${comp.score}%`,
                      height: '100%',
                      background: barColor,
                      borderRadius: '3px',
                      transition: 'width 0.8s ease-out'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tenure Summary */}
      {revealPhase >= 3 && (
        <div className="animate-slideIn" style={{ ...endGamePanelStyle, padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '14px', fontWeight: '600', textAlign: 'center' }}>
            TENURE SUMMARY
          </div>
          <div style={{
            fontSize: 'var(--text-base, 14px)',
            fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
            color: '#d1d5db',
            lineHeight: '1.8',
            padding: '0 8px'
          }}>
            {assessment.summary}
          </div>
        </div>
      )}

      {/* Key Statistics */}
      {revealPhase >= 4 && (
        <div className="animate-slideIn" style={{ ...endGamePanelStyle, padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '16px', fontWeight: '600', textAlign: 'center' }}>
            KEY STATISTICS
          </div>
          <div className="grid-final-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            {[
              {
                label: 'PCE Inflation',
                start: `${assessment.stats.startInflation.toFixed(1)}%`,
                end: `${assessment.stats.endInflation.toFixed(1)}%`,
                good: assessment.stats.endInflation >= 1.5 && assessment.stats.endInflation <= 3.0
              },
              {
                label: 'Unemployment',
                start: `${assessment.stats.startUnemployment.toFixed(1)}%`,
                end: `${assessment.stats.endUnemployment.toFixed(1)}%`,
                good: assessment.stats.endUnemployment < 5.5
              },
              {
                label: 'Fed Funds Rate',
                start: `${assessment.stats.startRate.toFixed(2)}%`,
                end: `${assessment.stats.endRate.toFixed(2)}%`,
                good: true
              },
              {
                label: 'Credibility',
                start: '100',
                end: `${assessment.stats.finalCredibility}`,
                good: assessment.stats.finalCredibility > 50
              },
              {
                label: 'Meetings',
                start: '',
                end: `${assessment.stats.meetingsPlayed} / 8`,
                good: assessment.stats.meetingsPlayed >= 8
              },
              {
                label: 'Biggest Mkt Move',
                start: '',
                end: `${assessment.stats.biggestMarketMove.toFixed(1)}%`,
                good: assessment.stats.biggestMarketMove < 2.0
              }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '14px 12px',
                background: stat.good ? 'rgba(34, 197, 94, 0.06)' : 'rgba(239, 68, 68, 0.06)',
                borderRadius: '8px',
                border: `1px solid ${stat.good ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '6px', letterSpacing: '0.5px' }}>{stat.label}</div>
                {stat.start && (
                  <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '2px' }}>
                    {stat.start} <span style={{ color: '#4b5563' }}>&rarr;</span>
                  </div>
                )}
                <div style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 'clamp(16px, 2.5vw, 22px)',
                  color: stat.good ? '#22c55e' : '#ef4444'
                }}>
                  {stat.end}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Historical Comparison */}
      {revealPhase >= 5 && assessment.comparison && (
        <div className="animate-slideIn" style={{ ...endGamePanelStyle, padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '14px', fontWeight: '600', textAlign: 'center' }}>
            HISTORICAL COMPARISON
          </div>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: 'var(--text-sm, 12px)', color: '#9ca3af' }}>Better than </span>
            <span style={{
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontFamily: '"IBM Plex Mono", monospace',
              color: '#60a5fa',
              fontWeight: '500'
            }}>
              {assessment.comparison.percentile}%
            </span>
            <span style={{ fontSize: 'var(--text-sm, 12px)', color: '#9ca3af' }}> of simulated chairs</span>
          </div>
          <div style={{
            padding: '12px 16px',
            background: 'rgba(59, 130, 246, 0.06)',
            borderRadius: '8px',
            borderLeft: '3px solid #3b82f6'
          }}>
            <div style={{
              fontSize: 'var(--text-sm, 12px)',
              fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
              color: '#9ca3af',
              lineHeight: '1.7',
              fontStyle: 'italic'
            }}>
              "{assessment.comparison.chairComparison}"
            </div>
          </div>
        </div>
      )}

      {/* Rate History Chart */}
      {revealPhase >= 5 && (
        <div className="animate-slideIn" style={{ ...endGamePanelStyle, padding: '24px', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '6px', fontWeight: '600', textAlign: 'center' }}>
            RATE HISTORY
          </div>
          {/* Color legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '14px' }}>
            {[
              { label: 'Hike', color: '#ef4444' },
              { label: 'Hold', color: '#60a5fa' },
              { label: 'Cut', color: '#22c55e' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color, opacity: 0.8 }} />
                <span style={{ fontSize: '10px', color: '#6b7280' }}>{item.label}</span>
              </div>
            ))}
          </div>
          {(() => {
            const history = gameState.rateHistory.slice(1);
            if (history.length === 0) return null;
            const rates = history.map(r => r.rate);
            const minRate = Math.min(...rates);
            const maxRate = Math.max(...rates);
            const range = Math.max(maxRate - minRate, 0.5);
            const baselineRate = gameState.rateHistory[0].rate;

            return (
              <div style={{ position: 'relative', padding: '0 8px' }}>
                {/* Baseline reference line */}
                {(() => {
                  const baselinePos = Math.max(0, Math.min(100, ((baselineRate - minRate + 0.25) / (range + 0.5)) * 100));
                  return (
                    <div style={{
                      position: 'absolute',
                      left: '8px',
                      right: '8px',
                      bottom: `${baselinePos * 0.8 + 20}px`,
                      borderTop: '1px dashed rgba(156, 163, 175, 0.3)',
                      zIndex: 1
                    }}>
                      <span style={{
                        position: 'absolute',
                        right: '-2px',
                        top: '-8px',
                        fontSize: '8px',
                        color: '#6b7280',
                        fontFamily: '"IBM Plex Mono", monospace'
                      }}>
                        start
                      </span>
                    </div>
                  );
                })()}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100px' }}>
                  {history.map((r, i) => {
                    const normalizedHeight = ((r.rate - minRate + 0.25) / (range + 0.5)) * 80;
                    const height = Math.max(20, normalizedHeight);
                    const barColor = r.decision > 0 ? '#ef4444' : r.decision < 0 ? '#22c55e' : '#60a5fa';
                    const decisionLabel = r.decision > 0 ? `+${r.decision}` : r.decision < 0 ? `${r.decision}` : 'HOLD';

                    return (
                      <div key={i} style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '3px'
                      }}>
                        <div style={{
                          fontSize: '9px',
                          fontFamily: '"IBM Plex Mono", monospace',
                          color: '#9ca3af',
                          fontWeight: '500'
                        }}>
                          {r.rate.toFixed(2)}%
                        </div>
                        <div style={{
                          width: '100%',
                          height: `${height}px`,
                          background: barColor,
                          borderRadius: '3px',
                          opacity: 0.8,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'height 0.6s ease-out'
                        }} title={`Meeting ${r.meeting}: ${r.rate.toFixed(2)}% (${decisionLabel} bps)`}>
                          <span style={{
                            fontSize: '8px',
                            fontFamily: '"IBM Plex Mono", monospace',
                            color: 'rgba(255,255,255,0.7)',
                            fontWeight: '600'
                          }}>
                            {decisionLabel}
                          </span>
                        </div>
                        <div style={{ fontSize: '9px', color: '#6b7280' }}>M{r.meeting}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Play Again */}
      {revealPhase >= 5 && (
        <button
          onClick={onNewGame}
          className="animate-slideIn play-again-shine"
          style={{
            width: '100%',
            padding: '18px',
            fontSize: '15px',
            fontWeight: '600',
            letterSpacing: '2px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            border: 'none',
            color: '#fff',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
            marginBottom: '40px'
          }}
        >
          PLAY AGAIN
        </button>
      )}
    </main>
  );
};
