// Briefing Component - FOMC pre-meeting briefing materials

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const briefingPanelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

window.FedChair.Components.Briefing = function({ briefingData, gameState, setActiveView }) {
  const [activeSection, setActiveSection] = React.useState('beigeBook');

  if (!briefingData) return null;

  const sections = [
    { id: 'beigeBook', label: 'BEIGE BOOK' },
    { id: 'staffProjections', label: 'STAFF FORECAST' },
    { id: 'dataReleases', label: 'DATA RELEASES' },
    { id: 'marketPositioning', label: 'MARKET PRICING' },
    { id: 'conflictingSignals', label: 'SIGNALS' }
  ];

  const labelStyle = {
    fontSize: '10px',
    letterSpacing: '1px',
    color: '#9ca3af',
    textTransform: 'uppercase',
    marginBottom: '8px'
  };

  const valueStyle = {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '16px',
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
                fontSize: '10px',
                letterSpacing: '1.5px',
                color: sentimentColors[report.sentiment],
                marginBottom: '8px',
                fontWeight: '500'
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
      { key: 'gdp', label: 'GDP Growth', unit: '%', color: '#60a5fa' },
      { key: 'inflation', label: 'PCE Inflation', unit: '%', color: '#f97316' },
      { key: 'unemployment', label: 'Unemployment', unit: '%', color: '#a78bfa' },
      { key: 'fedFunds', label: 'Fed Funds Rate', unit: '%', color: '#22c55e' }
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
          fontSize: '10px',
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
                <div style={{ ...labelStyle, fontSize: 'var(--text-sm)' }}>{metric.label}</div>
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
              padding: '14px 16px',
              borderBottom: i < releases.length - 1 ? '1px solid rgba(75, 85, 99, 0.2)' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {/* Left: Name & Source */}
              <div style={{ flex: '1 1 200px' }}>
                <div className="data-release-name" style={{ fontSize: '13px', color: '#e5e7eb', fontWeight: '500' }}>
                  {release.name}
                </div>
                <div style={{ fontSize: '10px', color: '#8b95a5', marginTop: '2px' }}>
                  {release.source}
                </div>
              </div>

              {/* Right: Values */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {/* Previous */}
                <div style={{ textAlign: 'center', minWidth: '55px' }}>
                  <div style={{ fontSize: '9px', color: '#8b95a5', marginBottom: '2px' }}>PREV</div>
                  <div className="data-release-prev" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#8b95a5' }}>
                    {release.previous}
                  </div>
                </div>

                {/* Expected */}
                <div style={{ textAlign: 'center', minWidth: '55px' }}>
                  <div style={{ fontSize: '9px', color: '#8b95a5', marginBottom: '2px' }}>EXP</div>
                  <div className="data-release-exp" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#9ca3af' }}>
                    {release.expected}
                  </div>
                </div>

                {/* Actual */}
                <div style={{ textAlign: 'center', minWidth: '55px' }}>
                  <div style={{ fontSize: '9px', color: '#8b95a5', marginBottom: '2px' }}>ACTUAL</div>
                  <div className="data-release-actual" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: '#f9fafb', fontWeight: '500' }}>
                    {release.actual}
                  </div>
                </div>

                {/* Surprise badge */}
                <div style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '9px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  background: 'rgba(' + (release.surprise === 'beat' ? '34,197,94' : release.surprise === 'miss' ? '239,68,68' : '156,163,175') + ', 0.15)',
                  color: surpriseColors[release.surprise],
                  border: '1px solid rgba(' + (release.surprise === 'beat' ? '34,197,94' : release.surprise === 'miss' ? '239,68,68' : '156,163,175') + ', 0.3)',
                  minWidth: '48px',
                  textAlign: 'center'
                }}>
                  {surpriseLabels[release.surprise]}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Significance note */}
        <div style={{
          fontSize: '10px',
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
          <div style={labelStyle}>FED FUNDS FUTURES PRICING</div>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '28px',
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
                    width: '55px',
                    fontSize: '11px',
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: decisionColors[key],
                    textAlign: 'right'
                  }}>
                    {decisionLabels[key]}
                  </div>
                  <div style={{
                    flex: 1,
                    height: '20px',
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
                    width: '36px',
                    fontSize: '11px',
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

        {/* Forward guidance */}
        <div style={{
          ...briefingPanelStyle,
          padding: '16px',
          borderLeft: '3px solid #eab308'
        }}>
          <div style={labelStyle}>FORWARD RATE EXPECTATIONS</div>
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
  const renderConflictingSignals = () => {
    const signals = briefingData.conflictingSignals;

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
                  <div style={{ fontSize: '14px', color: '#f9fafb', fontWeight: '500' }}>
                    {signal.title}
                  </div>
                  <div style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '9px',
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
      maxWidth: '900px',
      margin: '0 auto',
      padding: '16px'
    }}>
      {/* Classification banner */}
      <div style={{
        background: 'rgba(234, 179, 8, 0.06)',
        border: '1px solid rgba(234, 179, 8, 0.15)',
        borderRadius: '6px',
        padding: '8px 16px',
        textAlign: 'center',
        marginBottom: '16px',
        fontSize: '10px',
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
        <div style={{ fontSize: '11px', color: '#8b95a5', letterSpacing: '1px' }}>
          MEETING {gameState.meetingNumber} OF {gameState.totalMeetings}
        </div>
        <div style={{ fontSize: '16px', color: '#e5e7eb', marginTop: '4px' }}>
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
              padding: '8px 14px',
              fontSize: '10px',
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
              flexShrink: 0
            }}
          >
            {section.label}
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
            padding: '12px 32px',
            fontSize: '12px',
            fontWeight: '500',
            letterSpacing: '1px',
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            border: 'none',
            color: '#fff',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          PROCEED TO DECISION
        </button>
      </div>
    </div>
  );
};
