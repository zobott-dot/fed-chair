// Briefing Component - FOMC pre-meeting briefing materials

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const briefingPanelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

window.FedChair.Components.Briefing = function({ briefingData, gameState, setActiveView, learnMode }) {
  const LearnTerm = window.FedChair.Components.LearnTerm;
  const [activeSection, setActiveSection] = React.useState('beigeBook');

  if (!briefingData) return null;

  const sections = [
    { id: 'beigeBook', label: 'BEIGE BOOK', term: 'Beige Book' },
    { id: 'staffProjections', label: 'STAFF FORECAST' },
    { id: 'dataReleases', label: 'DATA RELEASES' },
    { id: 'marketPositioning', label: 'MARKET PRICING' },
    { id: 'conflictingSignals', label: 'SIGNALS' }
  ];

  const labelStyle = {
    fontSize: 'var(--text-sm)',
    letterSpacing: '1.5px',
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: '8px',
    fontWeight: '600'
  };

  const valueStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: 'var(--text-lg)',
    color: '#f9fafb'
  };

  // ========================================
  // BEIGE BOOK SECTION
  // ========================================
  const renderBeigeBook = () => {
    const bb = briefingData.beigeBook;
    const sentimentColors = {
      positive: '#22c55e',
      negative: '#ef4444',
      mixed: '#eab308'
    };

    return (
      <div className="animate-slideIn">
        {/* Summary */}
        <div style={{
          ...briefingPanelStyle,
          padding: '16px',
          marginBottom: '16px',
          borderLeft: '3px solid #60a5fa'
        }}>
          <div style={labelStyle}>SUMMARY</div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#e5e7eb', lineHeight: 'var(--leading-relaxed)', fontWeight: '500' }}>
            {bb.summary}
          </div>
        </div>

        {/* District Reports */}
        <div style={labelStyle}>DISTRICT REPORTS</div>
        <div className="grid-briefing-districts">
          {bb.districtReports.map(report => (
            <div key={report.number} style={{
              ...briefingPanelStyle,
              padding: '14px',
              borderLeft: '3px solid ' + sentimentColors[report.sentiment]
            }}>
              <div style={{
                fontSize: 'var(--text-xs)',
                letterSpacing: '1.5px',
                color: sentimentColors[report.sentiment],
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                {report.district.toUpperCase()} — DISTRICT {report.number}
              </div>
              <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)' }}>
                {report.narrative}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ========================================
  // STAFF PROJECTIONS SECTION
  // ========================================
  const renderStaffProjections = () => {
    const sp = briefingData.staffProjections;

    const metrics = [
      { key: 'gdp', label: 'GDP Growth', unit: '%', color: '#60a5fa', term: 'GDP' },
      { key: 'inflation', label: 'PCE Inflation', unit: '%', color: '#f97316', term: 'Core PCE' },
      { key: 'unemployment', label: 'Unemployment', unit: '%', color: '#a78bfa', term: 'Maximum Employment' },
      { key: 'fedFunds', label: 'Fed Funds Rate', unit: '%', color: '#22c55e', term: 'Federal Funds Rate' }
    ];

    const renderRangeBar = (metric) => {
      const data = sp[metric.key];
      const barMin = data.range[0] - 0.3;
      const barMax = data.range[1] + 0.3;
      const barSpan = barMax - barMin;
      if (barSpan <= 0) return null;

      const toPercent = (val) => Math.max(0, Math.min(100, ((val - barMin) / barSpan) * 100));

      return (
        <div style={{ position: 'relative', height: '32px', marginTop: '10px' }}>
          {/* Range band */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: toPercent(data.range[0]) + '%',
            width: (toPercent(data.range[1]) - toPercent(data.range[0])) + '%',
            height: '8px',
            background: 'rgba(75, 85, 99, 0.3)',
            borderRadius: '4px'
          }} />
          {/* Current marker */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: 'calc(' + toPercent(data.current) + '% - 1px)',
            width: '3px',
            height: '16px',
            background: '#f9fafb',
            borderRadius: '1px'
          }} />
          {/* Staff forecast marker */}
          <div style={{
            position: 'absolute',
            top: '6px',
            left: 'calc(' + toPercent(data.staffForecast) + '% - 5px)',
            width: '10px',
            height: '10px',
            background: '#3b82f6',
            borderRadius: '50%',
            border: '2px solid #1e3a5f'
          }} />
          {/* Market forecast marker */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: 'calc(' + toPercent(data.marketForecast) + '% - 4px)',
            width: '0',
            height: '0',
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderBottom: '8px solid #eab308'
          }} />
          {/* Labels */}
          <div style={{
            position: 'absolute',
            top: '-2px',
            left: '0',
            fontSize: 'var(--text-xs)',
            color: '#8b95a5'
          }}>{data.range[0].toFixed(1)}</div>
          <div style={{
            position: 'absolute',
            top: '-2px',
            right: '0',
            fontSize: 'var(--text-xs)',
            color: '#8b95a5'
          }}>{data.range[1].toFixed(1)}</div>
        </div>
      );
    };

    return (
      <div className="animate-slideIn">
        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '16px',
          fontSize: 'var(--text-xs)',
          color: '#9ca3af',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '3px', height: '12px', background: '#f9fafb', borderRadius: '1px' }} />
            Current
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }} />
            Staff Forecast
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '0', height: '0', borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '6px solid #eab308' }} />
            Market Forecast
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '20px', height: '6px', background: 'rgba(75, 85, 99, 0.3)', borderRadius: '3px' }} />
            Staff Range
          </div>
        </div>

        <div className="grid-staff-projections">
          {metrics.map(metric => {
            const data = sp[metric.key];
            return (
              <div key={metric.key} className="staff-forecast-card" style={{
                ...briefingPanelStyle,
                padding: '20px'
              }}>
                <div style={{ ...labelStyle, fontSize: 'var(--text-sm)' }}>{metric.term ? <LearnTerm term={metric.term} learnMode={learnMode}>{metric.label}</LearnTerm> : metric.label}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <div>
                    <span className="staff-current-value" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'var(--text-xl)', color: '#f9fafb' }}>
                      {data.current.toFixed(1)}{metric.unit}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginLeft: '8px' }}>current</span>
                  </div>
                </div>
                <div className="staff-forecast-values" style={{ display: 'flex', gap: '20px', fontSize: 'var(--text-base)', marginTop: '10px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ color: '#3b82f6', fontFamily: "'IBM Plex Mono', monospace" }}>
                      {data.staffForecast.toFixed(1)}{metric.unit}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginLeft: '4px' }}>staff</span>
                  </div>
                  <div>
                    <span style={{ color: '#eab308', fontFamily: "'IBM Plex Mono', monospace" }}>
                      {data.marketForecast.toFixed(1)}{metric.unit}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginLeft: '4px' }}>market</span>
                  </div>
                </div>
                {renderRangeBar(metric)}
              </div>
            );
          })}
        </div>

        {/* Staff Narrative */}
        <div style={{
          ...briefingPanelStyle,
          padding: '16px',
          marginTop: '16px',
          borderLeft: '3px solid #3b82f6'
        }}>
          <div style={labelStyle}>STAFF ASSESSMENT</div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
            {sp.narrative}
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // DATA RELEASES SECTION
  // ========================================
  const renderDataReleases = () => {
    const releases = briefingData.dataReleases;

    const surpriseColors = {
      beat: '#22c55e',
      miss: '#ef4444',
      inline: '#9ca3af'
    };
    const surpriseLabels = {
      beat: 'BEAT',
      miss: 'MISS',
      inline: 'IN LINE'
    };

    return (
      <div className="animate-slideIn">
        <div style={{
          ...briefingPanelStyle,
          overflow: 'hidden'
        }}>
          {releases.map((release, i) => (
            <div key={release.id} style={{
              borderBottom: i < releases.length - 1 ? '1px solid rgba(75, 85, 99, 0.2)' : 'none'
            }}>
              <div style={{
                padding: '14px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {/* Left: Name & Source */}
                <div style={{ flex: '1 1 200px' }}>
                  <div className="data-release-name" style={{ fontSize: 'var(--text-base)', color: '#e5e7eb', fontWeight: '500' }}>
                    {release.name}
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '2px' }}>
                    {release.source}
                  </div>
                </div>

                {/* Right: Values */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  {/* Previous */}
                  <div style={{ textAlign: 'center', minWidth: '60px' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '0.5px' }}>PREV</div>
                    <div className="data-release-prev" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'var(--text-sm)', color: '#8b95a5' }}>
                      {release.previous}
                    </div>
                  </div>

                  {/* Expected */}
                  <div style={{ textAlign: 'center', minWidth: '60px' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '0.5px' }}>EXP</div>
                    <div className="data-release-exp" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'var(--text-sm)', color: '#9ca3af' }}>
                      {release.expected}
                    </div>
                  </div>

                  {/* Actual */}
                  <div style={{ textAlign: 'center', minWidth: '60px' }}>
                    <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '0.5px' }}>ACTUAL</div>
                    <div className="data-release-actual" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'var(--text-base)', color: '#f9fafb', fontWeight: '500' }}>
                      {release.actual}
                    </div>
                  </div>

                  {/* Surprise badge */}
                  <div style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    background: 'rgba(' + (release.surprise === 'beat' ? '34,197,94' : release.surprise === 'miss' ? '239,68,68' : '156,163,175') + ', 0.15)',
                    color: surpriseColors[release.surprise],
                    border: '1px solid rgba(' + (release.surprise === 'beat' ? '34,197,94' : release.surprise === 'miss' ? '239,68,68' : '156,163,175') + ', 0.3)',
                    minWidth: '54px',
                    textAlign: 'center'
                  }}>
                    {surpriseLabels[release.surprise]}
                  </div>
                </div>
              </div>
              {release.note && (
                <div style={{
                  padding: '0 16px 14px 16px',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-prose)',
                  color: '#8b95a5',
                  lineHeight: 'var(--leading-relaxed)',
                  fontStyle: 'italic'
                }}>
                  {release.note}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Significance note */}
        <div style={{
          fontSize: 'var(--text-xs)',
          color: '#8b95a5',
          marginTop: '12px',
          fontStyle: 'italic'
        }}>
          Data reflects releases since the previous FOMC meeting. "Expected" values represent consensus forecasts prior to release.
        </div>
      </div>
    );
  };

  // ========================================
  // MARKET POSITIONING SECTION
  // ========================================
  const renderMarketPositioning = () => {
    const mp = briefingData.marketPositioning;

    const decisionLabels = {
      cut50: '-50 bp',
      cut25: '-25 bp',
      hold: 'HOLD',
      hike25: '+25 bp',
      hike50: '+50 bp'
    };

    const decisionColors = {
      cut50: '#15803d',
      cut25: '#22c55e',
      hold: '#60a5fa',
      hike25: '#f97316',
      hike50: '#ef4444'
    };

    // Find the most probable outcome
    const maxProb = Object.entries(mp.fedFundsProb).sort((a, b) => b[1] - a[1])[0];
    const expectedLabel = decisionLabels[maxProb[0]];

    return (
      <div className="animate-slideIn">
        {/* Main expectation */}
        <div style={{
          ...briefingPanelStyle,
          padding: '20px',
          textAlign: 'center',
          marginBottom: '16px'
        }}>
          <div style={labelStyle}><LearnTerm term="Market Expectations" learnMode={learnMode}>FED FUNDS FUTURES PRICING</LearnTerm></div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 'clamp(28px, 5vw, 42px)',
            color: decisionColors[maxProb[0]],
            fontWeight: '500',
            margin: '8px 0'
          }}>
            {expectedLabel}
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#9ca3af' }}>
            {maxProb[1]}% implied probability
          </div>
        </div>

        {/* Probability bars */}
        <div style={{
          ...briefingPanelStyle,
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={labelStyle}>PROBABILITY DISTRIBUTION</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
            {Object.entries(mp.fedFundsProb)
              .filter(([, prob]) => prob > 0)
              .map(([key, prob]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="prob-label" style={{
                    width: '70px',
                    fontSize: 'var(--text-sm)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: decisionColors[key],
                    textAlign: 'right'
                  }}>
                    {decisionLabels[key]}
                  </div>
                  <div style={{
                    flex: 1,
                    height: '26px',
                    background: 'rgba(17, 24, 39, 0.6)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div
                      className="animate-bar-fill"
                      style={{
                        height: '100%',
                        background: decisionColors[key],
                        opacity: 0.6,
                        borderRadius: '4px',
                        '--target-width': prob + '%'
                      }}
                    />
                  </div>
                  <div className="prob-pct" style={{
                    width: '44px',
                    fontSize: 'var(--text-sm)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: '#9ca3af',
                    textAlign: 'right'
                  }}>
                    {prob}%
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Shift + Drivers */}
        <div style={{
          ...briefingPanelStyle,
          padding: '16px',
          marginBottom: '16px'
        }}>
          <div style={labelStyle}>POSITIONING SHIFT</div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#e5e7eb', marginBottom: '16px' }}>
            {mp.shiftSinceLastMeeting}
          </div>

          <div style={labelStyle}>KEY DRIVERS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mp.keyDrivers.map((driver, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-normal)' }}>
                <span style={{ color: '#60a5fa', flexShrink: 0 }}>•</span>
                {driver}
              </div>
            ))}
          </div>
        </div>

        {/* Market Sentiment (live mode) */}
        {mp.marketSentiment && (
          <div style={{
            ...briefingPanelStyle,
            padding: '16px',
            marginBottom: '16px',
            borderLeft: '3px solid #a78bfa'
          }}>
            <div style={labelStyle}>MARKET SENTIMENT</div>
            <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)' }}>
              {mp.marketSentiment}
            </div>
          </div>
        )}

        {/* Rate Path Expectations (live mode) */}
        {mp.ratePathExpectations && mp.ratePathExpectations.length > 0 && (
          <div style={{
            ...briefingPanelStyle,
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={labelStyle}>RATE PATH EXPECTATIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {mp.ratePathExpectations.map((rp, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: 'rgba(17, 24, 39, 0.4)',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af' }}>{rp.meeting}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 'var(--text-base)',
                      color: rp.action === 'HOLD' ? '#60a5fa' : rp.action.startsWith('-') ? '#22c55e' : '#f97316',
                      fontWeight: '500'
                    }}>
                      {rp.action}
                    </span>
                    <span style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 'var(--text-sm)',
                      color: '#8b95a5'
                    }}>
                      {rp.expectedRate.toFixed(2)}%
                    </span>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: '#8b95a5',
                      padding: '2px 6px',
                      background: 'rgba(75, 85, 99, 0.2)',
                      borderRadius: '3px'
                    }}>
                      {rp.probability}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Your Previous Projections (Phase 4) */}
        {(() => {
          const dots = gameState?.dotProjections || [];
          const projections = [];
          for (let m = gameState.meetingNumber; m <= gameState.totalMeetings; m++) {
            const dotsForMeeting = dots.filter(d => d.meeting === m && d.placedAtMeeting < gameState.meetingNumber);
            if (dotsForMeeting.length > 0) {
              projections.push(dotsForMeeting[dotsForMeeting.length - 1]);
            }
          }
          if (projections.length === 0) return null;
          return (
            <div style={{
              ...briefingPanelStyle,
              padding: '16px',
              marginBottom: '16px',
              borderLeft: '3px solid #60a5fa'
            }}>
              <div style={labelStyle}>YOUR PREVIOUS PROJECTIONS</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {projections.map(d => {
                  const isCurrentMeeting = d.meeting === gameState.meetingNumber;
                  const matchesRate = isCurrentMeeting && Math.abs(d.projectedRate - gameState.currentRate) < 0.01;
                  return (
                    <div key={`${d.meeting}-${d.placedAtMeeting}`} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 'var(--text-base)',
                      fontFamily: "'IBM Plex Mono', monospace"
                    }}>
                      <span style={{ color: '#9ca3af' }}>Meeting {d.meeting}:</span>
                      <span style={{ color: isCurrentMeeting ? '#60a5fa' : '#d1d5db' }}>
                        {d.projectedRate.toFixed(3)}%
                        {isCurrentMeeting && (
                          <span style={{ marginLeft: '8px', fontSize: 'var(--text-sm)', color: matchesRate ? '#22c55e' : '#eab308' }}>
                            (current: {gameState.currentRate.toFixed(3)}%{matchesRate ? ' \u2713' : ''})
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Forward guidance */}
        <div style={{
          ...briefingPanelStyle,
          padding: '16px',
          borderLeft: '3px solid #eab308'
        }}>
          <div style={labelStyle}><LearnTerm term="Forward Guidance" learnMode={learnMode}>FORWARD RATE EXPECTATIONS</LearnTerm></div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
            {mp.futureGuidance}
          </div>
        </div>
      </div>
    );
  };

  // ========================================
  // CONFLICTING SIGNALS SECTION
  // ========================================

  const stanceColors = {
    'Very Hawkish': '#ef4444',
    'Hawkish': '#f97316',
    'Centrist': '#60a5fa',
    'Dovish': '#22c55e',
    'Very Dovish': '#15803d'
  };

  const renderLiveSignals = (signals) => {
    const sevColors = {
      high: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
      medium: { bg: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)', text: '#eab308' },
      low: { bg: 'rgba(156, 163, 175, 0.1)', border: 'rgba(156, 163, 175, 0.3)', text: '#9ca3af' }
    };

    return (
      <div className="animate-slideIn">
        {/* Committee Sentiment */}
        <div style={{ ...briefingPanelStyle, padding: '16px', marginBottom: '16px', borderLeft: '3px solid #60a5fa' }}>
          <div style={labelStyle}>COMMITTEE SENTIMENT</div>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)', marginBottom: '16px' }}>
            {signals.committeeSentiment.summary}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', letterSpacing: '1.5px', color: '#f97316', marginBottom: '8px', fontWeight: '600' }}>
                <LearnTerm term="Hawkish" learnMode={learnMode}>HAWKS</LearnTerm> ({signals.committeeSentiment.hawks.length})
              </div>
              {signals.committeeSentiment.hawks.map(m => (
                <div key={m.name} style={{ fontSize: 'var(--text-sm)', color: '#e5e7eb', marginBottom: '6px', lineHeight: '1.3' }}>
                  <div style={{ fontWeight: '500' }}>{m.name.split(' ').pop()}</div>
                  <div style={{ color: '#8b95a5', fontSize: 'var(--text-xs)' }}>{m.role}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', letterSpacing: '1.5px', color: '#60a5fa', marginBottom: '8px', fontWeight: '600' }}>
                CENTRISTS ({signals.committeeSentiment.centrists.length})
              </div>
              {signals.committeeSentiment.centrists.map(m => (
                <div key={m.name} style={{ fontSize: 'var(--text-sm)', color: '#e5e7eb', marginBottom: '6px', lineHeight: '1.3' }}>
                  <div style={{ fontWeight: '500' }}>{m.name.split(' ').pop()}</div>
                  <div style={{ color: '#8b95a5', fontSize: 'var(--text-xs)' }}>{m.role}</div>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', letterSpacing: '1.5px', color: '#22c55e', marginBottom: '8px', fontWeight: '600' }}>
                <LearnTerm term="Dovish" learnMode={learnMode}>DOVES</LearnTerm> ({signals.committeeSentiment.doves.length})
              </div>
              {signals.committeeSentiment.doves.map(m => (
                <div key={m.name} style={{ fontSize: 'var(--text-sm)', color: '#e5e7eb', marginBottom: '6px', lineHeight: '1.3' }}>
                  <div style={{ fontWeight: '500' }}>{m.name.split(' ').pop()}</div>
                  <div style={{ color: '#8b95a5', fontSize: 'var(--text-xs)' }}>{m.role}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Voices */}
        <div style={labelStyle}>KEY VOICES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {signals.keyVoices.map((voice, i) => {
            const voiceColor = stanceColors[voice.stance] || '#60a5fa';
            const isHawk = voice.stance.includes('Hawkish');
            const isDove = voice.stance.includes('Dovish');
            const rgbStr = isHawk ? '239,68,68' : isDove ? '34,197,94' : '96,165,250';
            return (
              <div key={i} style={{
                ...briefingPanelStyle,
                padding: '16px',
                borderLeft: '3px solid ' + voiceColor
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', gap: '8px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: 'var(--text-base)', color: '#f9fafb', fontWeight: '500' }}>
                      <LearnTerm term={voice.member} learnMode={learnMode}>{voice.member}</LearnTerm>
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginLeft: '8px' }}>{voice.role}</span>
                  </div>
                  <div style={{
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    background: 'rgba(' + rgbStr + ', 0.15)',
                    border: '1px solid rgba(' + rgbStr + ', 0.3)',
                    color: voiceColor
                  }}>
                    {voice.stance.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic', marginBottom: '8px' }}>
                  &ldquo;{voice.quote}&rdquo;
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5' }}>
                  — {voice.context}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leadership Transition */}
        <div style={{ ...briefingPanelStyle, padding: '16px', marginBottom: '16px', borderLeft: '3px solid #a855f7' }}>
          <div style={labelStyle}>{signals.leadershipTransition.headline.toUpperCase()}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {signals.leadershipTransition.details.map((detail, i) => (
              <div key={i}>
                <div style={{ fontSize: 'var(--text-base)', color: '#e5e7eb', fontWeight: '500', marginBottom: '4px' }}>{detail.title}</div>
                <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-prose)', color: '#9ca3af', lineHeight: 'var(--leading-relaxed)' }}>
                  {detail.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Pressures */}
        <div style={labelStyle}>EXTERNAL PRESSURES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {signals.externalPressures.map((pressure, i) => {
            const colors = sevColors[pressure.severity] || sevColors.medium;
            return (
              <div key={i} style={{
                ...briefingPanelStyle,
                padding: '16px',
                borderLeft: '3px solid ' + colors.text
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  gap: '12px'
                }}>
                  <div style={{ fontSize: 'var(--text-lg)', color: '#f9fafb', fontWeight: '500' }}>
                    {pressure.title}
                  </div>
                  <div style={{
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    background: colors.bg,
                    border: '1px solid ' + colors.border,
                    color: colors.text,
                    flexShrink: 0
                  }}>
                    {pressure.severity.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)' }}>
                  {pressure.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderConflictingSignals = () => {
    const signals = briefingData.conflictingSignals;

    // Detect live signals format
    if (signals && signals.type === 'live') {
      return renderLiveSignals(signals);
    }

    const implColors = {
      hawkish: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
      dovish: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' },
      ambiguous: { bg: 'rgba(234, 179, 8, 0.1)', border: 'rgba(234, 179, 8, 0.3)', text: '#eab308' }
    };

    return (
      <div className="animate-slideIn">
        {/* Intro banner */}
        <div style={{
          ...briefingPanelStyle,
          padding: '14px 16px',
          marginBottom: '16px',
          borderLeft: '3px solid #eab308'
        }}>
          <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#eab308', lineHeight: 'var(--leading-normal)' }}>
            The following data points present conflicting interpretations. Your assessment of their relative weight is critical to the policy decision.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {signals.map((signal, i) => {
            const colors = implColors[signal.implication];
            return (
              <div key={i} style={{
                ...briefingPanelStyle,
                padding: '16px',
                borderLeft: '3px solid ' + colors.text
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '10px',
                  gap: '12px'
                }}>
                  <div style={{ fontSize: 'var(--text-lg)', color: '#f9fafb', fontWeight: '500' }}>
                    {signal.title}
                  </div>
                  <div style={{
                    padding: '3px 10px',
                    borderRadius: '4px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    background: colors.bg,
                    border: '1px solid ' + colors.border,
                    color: colors.text,
                    flexShrink: 0
                  }}>
                    {signal.implication.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)' }}>
                  {signal.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ========================================
  // SECTION ROUTER
  // ========================================
  const renderSection = () => {
    switch (activeSection) {
      case 'beigeBook': return renderBeigeBook();
      case 'staffProjections': return renderStaffProjections();
      case 'dataReleases': return renderDataReleases();
      case 'marketPositioning': return renderMarketPositioning();
      case 'conflictingSignals': return renderConflictingSignals();
      default: return renderBeigeBook();
    }
  };

  // ========================================
  // MAIN RENDER
  // ========================================
  return (
    <div className="briefing-container" style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px'
    }}>
      {/* Classification banner */}
      <div style={{
        background: 'rgba(234, 179, 8, 0.06)',
        border: '1px solid rgba(234, 179, 8, 0.15)',
        borderRadius: '6px',
        padding: '10px 16px',
        textAlign: 'center',
        marginBottom: '16px',
        fontSize: 'var(--text-xs)',
        letterSpacing: '2px',
        color: '#eab308'
      }}>
        FOMC PRE-MEETING BRIEFING MATERIALS — RESTRICTED FR
      </div>

      {/* Meeting context */}
      <div style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', letterSpacing: '1.5px' }}>
          MEETING {gameState.meetingNumber} OF {gameState.totalMeetings}
        </div>
        <div style={{ fontSize: 'var(--text-xl)', color: '#e5e7eb', marginTop: '6px' }}>
          {gameState.meetingDisplayDate}
        </div>
      </div>

      {/* Sub-navigation */}
      <div className="grid-briefing-nav" style={{ marginBottom: '20px' }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              padding: '10px 18px',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.5px',
              background: activeSection === section.id
                ? 'rgba(59, 130, 246, 0.2)'
                : 'rgba(17, 24, 39, 0.5)',
              border: activeSection === section.id
                ? '1px solid rgba(59, 130, 246, 0.4)'
                : '1px solid rgba(75, 85, 99, 0.3)',
              color: activeSection === section.id ? '#60a5fa' : '#8b95a5',
              borderRadius: '6px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              minHeight: 'auto'
            }}
          >
            {section.term ? <LearnTerm term={section.term} learnMode={learnMode}>{section.label}</LearnTerm> : section.label}
          </button>
        ))}
      </div>

      {/* Section content */}
      {renderSection()}

      {/* Proceed button */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button
          onClick={() => setActiveView('decision')}
          style={{
            padding: '16px 40px',
            fontSize: 'var(--text-base)',
            fontWeight: '500',
            letterSpacing: '1.5px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            border: 'none',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer',
            minHeight: 'auto'
          }}
        >
          PROCEED TO DECISION
        </button>
      </div>
    </div>
  );
};
