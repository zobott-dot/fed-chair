// Aftermath Component - Market reaction, scorecard, and game progression

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

const getCredibilityColor = (credibility) => {
  if (credibility >= 80) return '#22c55e';
  if (credibility >= 60) return '#84cc16';
  if (credibility >= 40) return '#eab308';
  if (credibility >= 20) return '#f97316';
  return '#ef4444';
};

const getEndResultStyle = (result) => {
  if (result === 'win') return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', color: '#22c55e', icon: '🎉' };
  if (result === 'lose') return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', color: '#ef4444', icon: '📉' };
  return { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.4)', color: '#eab308', icon: '🤷' };
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
  gameState,
  onAdvance,
  onNewGame,
  pressConferenceImpact,
  learnMode
}) {
  const LearnTerm = window.FedChair.Components.LearnTerm;
  const isGameOver = gameState?.gamePhase === 'ended';
  const endResult = gameState?.endResult;
  const endReason = gameState?.endReason;

  // Game Over Screen
  if (isGameOver) {
    const resultStyle = getEndResultStyle(endResult);
    const endMessages = {
      'soft_landing': 'You achieved the elusive soft landing! Inflation is under control, growth is positive, and your credibility remains strong.',
      'recession': 'The economy has entered a recession. Your tight monetary policy pushed growth negative for too long.',
      'runaway_inflation': 'Inflation spiraled out of control. Your loose monetary policy allowed prices to rise unchecked.',
      'stagflation': 'The worst of both worlds: high inflation combined with high unemployment.',
      'credibility_collapse': 'Markets no longer trust Fed guidance. Your inconsistent messaging eroded all credibility.',
      'muddle_through': 'You avoided disaster, but the landing was bumpy. Not a soft landing, but not a catastrophe either.'
    };

    return (
      <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: resultStyle.bg,
          border: `2px solid ${resultStyle.border}`,
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>{resultStyle.icon}</div>
          <div style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: '600',
            color: resultStyle.color,
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            {endResult === 'win' ? 'SOFT LANDING' : endResult === 'lose' ? 'POLICY FAILURE' : 'MUDDLED THROUGH'}
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#9ca3af', lineHeight: 'var(--leading-relaxed)', maxWidth: '500px', margin: '0 auto' }}>
            {endMessages[endReason] || 'The game has ended.'}
          </div>
        </div>

        {/* Final Stats */}
        <div style={{ ...panelStyle, padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>
            FINAL ECONOMIC STATE
          </div>
          <div className="grid-final-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'PCE Inflation', value: `${gameState.economy.pceInflation.toFixed(1)}%`, target: '2.0%', good: gameState.economy.pceInflation >= 1.5 && gameState.economy.pceInflation <= 3.0 },
              { label: 'GDP Growth', value: `${gameState.economy.gdpGrowth.toFixed(1)}%`, target: '> 0%', good: gameState.economy.gdpGrowth > 0 },
              { label: 'Unemployment', value: `${gameState.economy.unemploymentRate.toFixed(1)}%`, target: '< 6%', good: gameState.economy.unemploymentRate < 6 },
              { label: 'Credibility', value: `${gameState.credibility}`, target: '> 50', good: gameState.credibility > 50 }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '16px',
                background: stat.good ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                borderRadius: '8px',
                border: `1px solid ${stat.good ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}><LearnTerm term={stat.label === 'PCE Inflation' ? 'Core PCE' : stat.label === 'GDP Growth' ? 'GDP' : stat.label === 'Unemployment' ? 'Unemployment Rate' : stat.label} learnMode={learnMode}>{stat.label}</LearnTerm></div>
                <div style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  color: stat.good ? '#22c55e' : '#ef4444'
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '4px' }}>Target: {stat.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div style={{ ...panelStyle, padding: '24px', marginBottom: '24px' }}>
          <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '20px', textAlign: 'center', fontWeight: '600' }}>
            YOUR TENURE
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>Meetings</div>
              <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontFamily: '"IBM Plex Mono", monospace', color: '#60a5fa' }}>{gameState.meetingNumber - 1} / 8</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>Average Score</div>
              <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontFamily: '"IBM Plex Mono", monospace', color: '#60a5fa' }}>
                {gameState.meetingScores.length > 0
                  ? Math.round(gameState.totalScore / gameState.meetingScores.length)
                  : 0}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>Final Rate</div>
              <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontFamily: '"IBM Plex Mono", monospace', color: '#60a5fa' }}>{formatRate(gameState.currentRate)}</div>
            </div>
          </div>

          {/* Rate History Mini Chart */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '8px' }}>Rate History</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
              {gameState.rateHistory.map((r, i) => {
                const height = Math.max(10, (r.rate / 5) * 60);
                return (
                  <div key={i} style={{
                    flex: 1,
                    height: `${height}px`,
                    background: r.decision > 0 ? '#ef4444' : r.decision < 0 ? '#22c55e' : '#60a5fa',
                    borderRadius: '2px',
                    opacity: 0.7
                  }} title={`Meeting ${r.meeting}: ${r.rate.toFixed(2)}%`} />
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={onNewGame}
          style={{
            width: '100%',
            padding: '20px',
            fontSize: '16px',
            fontWeight: '600',
            letterSpacing: '2px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            border: 'none',
            color: '#fff',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
            marginTop: '8px'
          }}
        >
          🔄 PLAY AGAIN
        </button>
      </main>
    );
  }

  // Normal Aftermath (during game)
  return (
    <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Breaking Ticker */}
      {marketReaction && (
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
              whiteSpace: 'nowrap'
            }}
          >
            {[0, 1, 2].map(i => (
              <React.Fragment key={i}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'white', marginRight: '40px' }}>
                  📢 {marketReaction.headline}
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.9)', marginRight: '40px', fontFamily: '"IBM Plex Mono", monospace' }}>
                  S&P: {marketReaction.sp500.change >= 0 ? '+' : ''}{marketReaction.sp500.change.toFixed(2)}%
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.9)', marginRight: '40px', fontFamily: '"IBM Plex Mono", monospace' }}>
                  10Y: {marketReaction.treasury10y.change >= 0 ? '+' : ''}{marketReaction.treasury10y.change.toFixed(1)}bps
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <div className="grid-aftermath">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Market Reaction */}
          {aftermathPhase >= 1 && marketReaction && (
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
                <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', fontWeight: '600' }}>
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
                      <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>
                        <LearnTerm term={m.label} learnMode={learnMode}>{m.label}</LearnTerm>
                      </div>
                      <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(16px, 2vw, 22px)', color: '#f9fafb' }}>
                        {m.value}
                      </div>
                      <div style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: 'var(--text-sm)',
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
          {aftermathPhase >= 2 && marketReaction && (
            <div className="animate-d1" style={{ ...panelStyle, padding: '16px' }}>
              <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '12px', fontWeight: '600' }}>
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
                    <div style={{ fontSize: 'var(--text-xs)', color: '#9ca3af', marginBottom: '2px' }}>{s.name}</div>
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 'var(--text-base)',
                      color: (s.unit === 'bp' ? s.change <= 0 : s.change >= 0) ? '#22c55e' : '#ef4444'
                    }}>
                      {s.change >= 0 ? '+' : ''}{s.change.toFixed(s.unit === 'bp' ? 1 : 2)}{s.unit || '%'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deferred Press Conference Summary */}
          {aftermathPhase >= 1 && pressConferenceImpact?.deferred && (
            <div className="animate-d1" style={{
              ...panelStyle,
              padding: '16px 20px',
              marginBottom: '16px',
              borderLeft: '3px solid #6b7280'
            }}>
              <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '8px', fontWeight: '600' }}>
                PRESS CONFERENCE
              </div>
              <div style={{
                fontSize: 'var(--text-sm, 12px)',
                fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
                color: '#9ca3af',
                lineHeight: '1.7',
                marginBottom: '8px'
              }}>
                {pressConferenceImpact.deferSummary}
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                fontFamily: '"IBM Plex Mono", monospace',
                color: pressConferenceImpact.totalCredibilityChange >= 0 ? '#22c55e' : '#eab308'
              }}>
                Credibility: {pressConferenceImpact.totalCredibilityChange >= 0 ? '+' : ''}{pressConferenceImpact.totalCredibilityChange} (includes -2 defer penalty)
              </div>
            </div>
          )}

          {/* Press Conference Recap */}
          {aftermathPhase >= 3 && pressConferenceImpact && !pressConferenceImpact.deferred && (
            <div className="animate-d2" style={panelStyle}>
              <div style={{
                padding: '14px 16px',
                borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
                background: 'rgba(59, 130, 246, 0.1)'
              }}>
                <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', fontWeight: '600' }}>
                  PRESS CONFERENCE RECAP
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(17, 24, 39, 0.5)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}><LearnTerm term="Credibility" learnMode={learnMode}>Credibility</LearnTerm></div>
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 'clamp(16px, 2vw, 22px)',
                      color: pressConferenceImpact.totalCredibilityChange >= 0 ? '#22c55e' : '#ef4444'
                    }}>
                      {pressConferenceImpact.totalCredibilityChange >= 0 ? '+' : ''}{pressConferenceImpact.totalCredibilityChange}
                    </div>
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(17, 24, 39, 0.5)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>Interpretation</div>
                    <div style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: '600',
                      color: pressConferenceImpact.interpretation === 'mixed signals' ? '#f97316' :
                             pressConferenceImpact.interpretation.includes('hawkish') ? '#ef4444' :
                             pressConferenceImpact.interpretation.includes('dovish') ? '#22c55e' : '#60a5fa',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {pressConferenceImpact.interpretation}
                    </div>
                  </div>
                </div>
                {pressConferenceImpact.keyMoment && (
                  <div style={{
                    padding: '10px 12px',
                    background: 'rgba(59, 130, 246, 0.08)',
                    borderRadius: '6px',
                    borderLeft: '3px solid #3b82f6'
                  }}>
                    <div style={{ fontSize: '10px', letterSpacing: '1px', color: '#60a5fa', marginBottom: '4px', fontWeight: '600' }}>KEY MOMENT</div>
                    <div style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-prose)', color: '#9ca3af', lineHeight: 'var(--leading-relaxed)' }}>
                      {pressConferenceImpact.keyMoment}
                    </div>
                  </div>
                )}
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
            <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginBottom: '8px', letterSpacing: '1px' }}>YOUR DECISION</div>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 'clamp(24px, 5vw, 34px)',
              color: getDecisionColor(rateDecision)
            }}>
              {getDecisionLabelFull(rateDecision)}
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', marginTop: '8px' }}>
              New Rate: <span style={{ color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>{formatRate(currentRate + rateDecision / 100)}</span>
            </div>
            {selectedStatements.length > 0 && (
              <div style={{
                marginTop: '12px',
                padding: '8px',
                background: `${hawkLabel.color}15`,
                borderRadius: '6px',
                border: `1px solid ${hawkLabel.color}30`
              }}>
                <span style={{ fontSize: 'var(--text-sm)', color: hawkLabel.color }}>{hawkLabel.label}</span>
              </div>
            )}
          </div>

          {/* Balance Sheet Impact (Phase 7.6) */}
          {gameState?.balanceSheet && gameState.balanceSheet.currentPosture !== undefined && (() => {
            const bs = gameState.balanceSheet;
            const bsData = window.FedChair.Data.balanceSheetData;
            const posture = bsData?.postures?.find(p => p.id === bs.currentPosture);
            const postureLabel = posture
              ? `${posture.sublabel}${bs.currentPosture === 'reduce' ? ` at ${bsData.paceOptions.find(p => p.value === bs.currentPace)?.label || '$60B / month'}` : ''}`
              : bs.currentPosture.toUpperCase();

            // Determine combined signal key
            const rateKey = rateDecision > 0 ? 'hike' : rateDecision < 0 ? 'cut' : 'hold';
            const bsKey = bs.currentPosture === 'expand' ? 'expand' : bs.currentPosture === 'reduce' ? 'reduce' : 'hold';
            const signalKey = `${rateKey}-${bsKey}`;
            const combinedSignal = bsData?.combinedSignals?.[signalKey] || '';

            // Calculate change
            const prevAssets = bs.history.length >= 2
              ? bs.history[bs.history.length - 2].assetsLevel
              : 6800;
            const assetsChange = bs.totalAssets - prevAssets;

            return (
              <div style={{
                ...panelStyle,
                padding: '16px',
                marginBottom: '0'
              }}>
                <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '12px', fontWeight: '600' }}>
                  <LearnTerm term="Balance Sheet" learnMode={learnMode}>BALANCE SHEET</LearnTerm>
                </div>
                <div style={{
                  padding: '10px 12px',
                  background: 'rgba(17, 24, 39, 0.5)',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>POSTURE</div>
                  <div style={{ fontSize: 'var(--text-sm)', color: '#e5e7eb', fontWeight: '500' }}>
                    {postureLabel}
                  </div>
                </div>
                <div style={{
                  padding: '10px 12px',
                  background: 'rgba(17, 24, 39, 0.5)',
                  borderRadius: '6px',
                  marginBottom: '10px'
                }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '4px' }}>FED BALANCE SHEET</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 'var(--text-base)',
                      color: '#60a5fa'
                    }}>
                      ${Math.round(bs.totalAssets).toLocaleString()}B
                    </span>
                    {assetsChange !== 0 && (
                      <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: 'var(--text-xs)',
                        color: assetsChange > 0 ? '#22c55e' : '#ef4444'
                      }}>
                        ({assetsChange > 0 ? '+' : ''}{assetsChange > 0 ? `$${assetsChange}B` : `-$${Math.abs(assetsChange)}B`})
                      </span>
                    )}
                  </div>
                </div>
                {combinedSignal && (
                  <div style={{
                    padding: '10px 12px',
                    background: 'rgba(217, 119, 6, 0.06)',
                    borderRadius: '6px',
                    borderLeft: '3px solid #d97706'
                  }}>
                    <div style={{ fontSize: '10px', letterSpacing: '1px', color: '#d97706', marginBottom: '4px', fontWeight: '600' }}>
                      COMBINED SIGNAL
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#9ca3af', lineHeight: '1.5', fontFamily: 'var(--font-prose)' }}>
                      {combinedSignal}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Credibility */}
          {aftermathPhase >= 1 && gameState && (
            <div className="animate-slideIn" style={{ ...panelStyle, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', fontWeight: '600' }}><LearnTerm term="Credibility" learnMode={learnMode}>CREDIBILITY</LearnTerm></div>
                <div style={{
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  fontFamily: '"IBM Plex Mono", monospace',
                  color: getCredibilityColor(gameState.credibility)
                }}>
                  {gameState.credibility}
                </div>
              </div>
              <div style={{
                height: '8px',
                background: 'rgba(75, 85, 99, 0.3)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${gameState.credibility}%`,
                  height: '100%',
                  background: getCredibilityColor(gameState.credibility),
                  borderRadius: '4px',
                  transition: 'width 0.5s ease-out'
                }} />
              </div>
              {gameState.credibilityHistory.length > 1 && (
                <div style={{ marginTop: '8px', fontSize: 'var(--text-xs)', color: '#8b95a5' }}>
                  {gameState.credibility > gameState.credibilityHistory[gameState.credibilityHistory.length - 2]
                    ? '↑ Credibility improved'
                    : gameState.credibility < gameState.credibilityHistory[gameState.credibilityHistory.length - 2]
                      ? '↓ Credibility declined'
                      : '→ Credibility unchanged'}
                </div>
              )}
            </div>
          )}

          {/* Dot Plot Impact — Phase 7.7 */}
          {aftermathPhase >= 1 && gameState?.lastDotShiftData && gameState.lastDotShiftData.dotsPlaced > 0 && (
            <div className="animate-d1" style={{ ...panelStyle, padding: '16px 20px', marginBottom: '16px' }}>
              <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '12px', fontWeight: '600' }}>
                <LearnTerm term="Dot Plot" learnMode={learnMode}>DOT PLOT SIGNAL</LearnTerm>
              </div>

              {(() => {
                const dsd = gameState.lastDotShiftData;

                // Determine the market read
                let signalText = '';
                let signalColor = '#60a5fa';

                if (dsd.playerMedianShift !== null && Math.abs(dsd.playerMedianShift) >= 0.1) {
                  const direction = dsd.playerMedianShift > 0 ? 'hawkish' : 'dovish';
                  const bpsShift = Math.round(dsd.playerMedianShift * 100);
                  signalText = `Your projected rate path shifted ${Math.abs(bpsShift)} bps ${direction === 'hawkish' ? 'higher' : 'lower'} than last meeting. Markets interpret this as a ${direction} signal — `;
                  if (direction === 'hawkish') {
                    signalText += 'traders are repricing for tighter policy ahead, pushing short-term yields higher.';
                    signalColor = '#ef4444';
                  } else {
                    signalText += 'traders are repricing for easier policy ahead, pushing yields lower and lifting equities.';
                    signalColor = '#22c55e';
                  }
                } else if (dsd.playerMedianShift !== null) {
                  signalText = 'Your projected rate path is largely unchanged from last meeting. Markets read this as steady-as-she-goes — no surprises in your forward guidance.';
                  signalColor = '#60a5fa';
                } else {
                  signalText = 'This is your first set of dot projections. Markets are calibrating their expectations to your indicated rate path.';
                  signalColor = '#60a5fa';
                }

                // Dot-to-action accountability
                let accountabilityText = '';
                let accountabilityColor = '#9ca3af';
                if (dsd.dotToActionGap !== null) {
                  const gapBps = Math.round(dsd.dotToActionGap * 100);
                  if (Math.abs(gapBps) < 2) {
                    accountabilityText = `You projected ${dsd.dotForThisMeeting.toFixed(2)}% for this meeting and delivered exactly that. Follow-through strengthens credibility.`;
                    accountabilityColor = '#22c55e';
                  } else if (Math.abs(gapBps) <= 25) {
                    accountabilityText = `You projected ${dsd.dotForThisMeeting.toFixed(2)}% for this meeting but set ${dsd.actualRate.toFixed(2)}%. A small deviation — markets will note it but won't panic.`;
                    accountabilityColor = '#eab308';
                  } else {
                    accountabilityText = `You projected ${dsd.dotForThisMeeting.toFixed(2)}% for this meeting but set ${dsd.actualRate.toFixed(2)}% — a ${Math.abs(gapBps)} bps gap. Markets had positioned around your projection. This deviation costs credibility.`;
                    accountabilityColor = '#ef4444';
                  }
                }

                return (
                  <>
                    <div style={{
                      fontSize: 'var(--text-sm, 12px)',
                      fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
                      color: '#d1d5db',
                      lineHeight: '1.7',
                      marginBottom: accountabilityText ? '12px' : '0'
                    }}>
                      <span style={{ color: signalColor, fontWeight: '500' }}>MARKET READS YOUR DOTS: </span>
                      {signalText}
                    </div>

                    {accountabilityText && (
                      <div style={{
                        fontSize: 'var(--text-sm, 12px)',
                        fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
                        color: '#d1d5db',
                        lineHeight: '1.7',
                        paddingTop: '10px',
                        borderTop: '1px solid rgba(75, 85, 99, 0.3)'
                      }}>
                        <span style={{ color: accountabilityColor, fontWeight: '500' }}>DOT-TO-ACTION: </span>
                        {accountabilityText}
                      </div>
                    )}
                  </>
                );
              })()}

              {/* Learn Mode: deeper explanation */}
              {learnMode && (
                <div style={{
                  marginTop: '12px',
                  padding: '10px 14px',
                  background: 'rgba(217, 119, 6, 0.06)',
                  borderLeft: '3px solid #D97706',
                  borderRadius: '0 6px 6px 0'
                }}>
                  <div style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
                    color: '#9ca3af',
                    lineHeight: '1.6'
                  }}>
                    {gameState.meetingNumber <= 2 && (
                      'The dot plot is the Fed\'s most watched communication tool after the rate decision. When the median dot shifts, it moves billions of dollars in bond and futures markets instantly. Traders don\'t wait for the Fed to act — they price in the expected path. Your dots ARE policy, in a sense, because they shape financial conditions before your next meeting even arrives.'
                    )}
                    {gameState.meetingNumber >= 3 && gameState.meetingNumber <= 5 && (
                      'Notice the relationship between your dot projections and your credibility score. Markets remember what you projected. If you consistently follow through, your dots become more powerful — markets trust them and adjust preemptively. If you deviate without explanation, your dots lose their signaling value and you lose a key policy tool.'
                    )}
                    {gameState.meetingNumber >= 6 && (
                      'Late in a tenure, dot plot credibility compounds. A chair who has consistently matched projections to actions has enormous signaling power — their dots alone can move markets and tighten or ease financial conditions. A chair whose dots have been unreliable has lost this tool entirely and must rely solely on rate actions, which are blunter and slower.'
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Score Card */}
          {aftermathPhase >= 2 && score && (
            <div className="animate-d1" style={{ ...panelStyle, padding: '20px' }}>
              <div style={{
                fontSize: 'var(--text-sm)',
                letterSpacing: '2px',
                color: '#9ca3af',
                marginBottom: '16px',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                MEETING SCORECARD
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
                <div style={{ fontSize: 'var(--text-sm)', color: score.overall.color, fontWeight: '500' }}>
                  {score.overall.text}
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginTop: '4px' }}>
                  {score.overall.score}/100
                </div>
                {score.overall.insight && (
                  <div style={{
                    fontSize: 'var(--text-sm, 12px)',
                    fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
                    color: '#9ca3af',
                    marginTop: '8px',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                    maxWidth: '400px',
                    margin: '8px auto 0'
                  }}>
                    {score.overall.insight}
                  </div>
                )}
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
                        <span style={{ fontSize: 'var(--text-xs)', color: '#9ca3af' }}><LearnTerm term={item.label} learnMode={learnMode}>{item.label}</LearnTerm></span>
                        <span style={{ fontSize: 'var(--text-xs)', color: item.data.color, fontWeight: '500' }}>
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
                      {item.data.feedback && (
                        <div style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
                          color: '#8b95a5',
                          marginTop: '5px',
                          lineHeight: '1.5'
                        }}>
                          {item.data.feedback}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Meeting Progress */}
          {aftermathPhase >= 3 && gameState && (
            <div className="animate-d2" style={{ ...panelStyle, padding: '16px' }}>
              <div style={{ fontSize: 'var(--text-sm)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '12px', fontWeight: '600' }}>
                PROGRESS
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {Array.from({ length: gameState.totalMeetings }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: '8px',
                      borderRadius: '4px',
                      background: i < gameState.meetingNumber
                        ? '#3b82f6'
                        : 'rgba(75, 85, 99, 0.3)'
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '8px', textAlign: 'center' }}>
                Meeting {gameState.meetingNumber} of {gameState.totalMeetings}
              </div>
            </div>
          )}

          {/* Next Meeting Button */}
          {aftermathPhase >= 4 && (
            <button
              onClick={onAdvance}
              className="animate-d3"
              style={{
                padding: '18px',
                fontSize: 'var(--text-base)',
                fontWeight: '500',
                letterSpacing: '1.5px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                border: 'none',
                color: '#fff',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                minHeight: 'auto'
              }}
            >
              {gameState.meetingNumber >= gameState.totalMeetings
                ? '📊 VIEW FINAL RESULTS'
                : '➡️ NEXT MEETING'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};
