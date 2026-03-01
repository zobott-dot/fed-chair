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
  gameState,
  dotSelections,
  setDotSelections
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

          {/* Forward Guidance Dot Plot (Phase 4) */}
          {!decisionPublished && meetingNumber < totalMeetings && (() => {
            const remainingMeetings = [];
            for (let m = meetingNumber + 1; m <= totalMeetings; m++) remainingMeetings.push(m);
            if (remainingMeetings.length === 0) return null;

            const committeeDots = gameState?.committeeDots || {};
            const monthAbbrs = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            const schedule = gameState?.meetingSchedule || [];

            const chartWidth = 600;
            const chartHeight = 220;
            const leftMargin = 50;
            const rightMargin = 10;
            const topMargin = 15;
            const bottomMargin = 35;
            const plotWidth = chartWidth - leftMargin - rightMargin;
            const plotHeight = chartHeight - topMargin - bottomMargin;

            const rateMin = currentRate - 1.0;
            const rateMax = currentRate + 1.0;
            const rateToY = (rate) => topMargin + plotHeight * (rateMax - rate) / (rateMax - rateMin);

            const N = remainingMeetings.length;
            const columnWidth = plotWidth / N;
            const meetingToX = (idx) => leftMargin + (idx + 0.5) * columnWidth;

            // Grid lines at 25bp intervals
            const gridRates = [];
            for (let r = Math.ceil(rateMin / 0.25) * 0.25; r <= rateMax + 0.001; r += 0.25) {
              gridRates.push(Math.round(r * 1000) / 1000);
            }

            // Y-axis labels at 50bp intervals
            const labelRates = [];
            for (let r = Math.ceil(rateMin / 0.5) * 0.5; r <= rateMax + 0.001; r += 0.5) {
              labelRates.push(Math.round(r * 1000) / 1000);
            }

            // Committee medians
            const medians = remainingMeetings.map(m => {
              const dots = committeeDots[m] || [];
              if (dots.length === 0) return null;
              const sorted = [...dots].sort((a, b) => a - b);
              return sorted[Math.floor(sorted.length / 2)];
            });
            const validMedians = medians
              .map((m, i) => m !== null ? [meetingToX(i), rateToY(m)] : null)
              .filter(Boolean);

            // Player dots sorted by meeting
            const playerDotEntries = Object.entries(dotSelections || {})
              .map(([m, r]) => [parseInt(m), r])
              .filter(([m]) => remainingMeetings.includes(m))
              .sort((a, b) => a[0] - b[0]);

            const handleChartClick = (event) => {
              if (!setDotSelections) return;
              const svg = event.currentTarget;
              const rect = svg.getBoundingClientRect();
              const scaleX = chartWidth / rect.width;
              const scaleY = chartHeight / rect.height;
              const x = (event.clientX - rect.left) * scaleX;
              const y = (event.clientY - rect.top) * scaleY;

              if (x < leftMargin || x > chartWidth - rightMargin) return;
              if (y < topMargin || y > chartHeight - bottomMargin) return;

              const colIndex = Math.floor((x - leftMargin) / columnWidth);
              if (colIndex < 0 || colIndex >= N) return;

              const meetingNum = remainingMeetings[colIndex];
              const rate = rateMax - (y - topMargin) / plotHeight * (rateMax - rateMin);
              const snapped = Math.round(rate / 0.25) * 0.25;
              if (snapped < rateMin || snapped > rateMax) return;

              if (dotSelections && dotSelections[meetingNum] !== undefined &&
                  Math.abs(dotSelections[meetingNum] - snapped) < 0.01) {
                setDotSelections(prev => {
                  const next = { ...prev };
                  delete next[meetingNum];
                  return next;
                });
              } else {
                setDotSelections(prev => ({ ...prev, [meetingNum]: snapped }));
              }
            };

            return (
              <div style={{ marginTop: '24px' }}>
                <div style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px', marginBottom: '10px', textAlign: 'center' }}>
                  FORWARD GUIDANCE DOT PLOT
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', fontSize: '10px', color: '#9ca3af', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '10px', height: '10px', background: '#60a5fa', borderRadius: '50%' }} />
                    Your projection
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'rgba(156, 163, 175, 0.4)', borderRadius: '50%' }} />
                    Committee
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '14px', height: '2px', background: 'rgba(156, 163, 175, 0.6)' }} />
                    Median
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '14px', height: '0', borderTop: '2px dashed #60a5fa' }} />
                    Current rate
                  </div>
                </div>

                {/* SVG Chart */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'crosshair'
                }}>
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    style={{ width: '100%', height: '220px', display: 'block' }}
                    onClick={handleChartClick}
                  >
                    {/* Grid lines */}
                    {gridRates.map(r => (
                      <line
                        key={r}
                        x1={leftMargin} y1={rateToY(r)}
                        x2={chartWidth - rightMargin} y2={rateToY(r)}
                        stroke="rgba(75, 85, 99, 0.2)" strokeWidth="1"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {labelRates.map(r => (
                      <text
                        key={'yl-' + r}
                        x={leftMargin - 6} y={rateToY(r) + 3}
                        fill="#8b95a5" fontSize="10"
                        fontFamily="'IBM Plex Mono', monospace"
                        textAnchor="end"
                      >
                        {r.toFixed(2)}%
                      </text>
                    ))}

                    {/* X-axis labels */}
                    {remainingMeetings.map((m, i) => {
                      const meeting = schedule[m - 1];
                      const month = meeting ? monthAbbrs[parseInt(meeting.date.split('-')[1]) - 1] : '';
                      return (
                        <g key={'x-' + m}>
                          <text
                            x={meetingToX(i)} y={chartHeight - bottomMargin + 16}
                            fill="#9ca3af" fontSize="11"
                            fontFamily="'IBM Plex Mono', monospace"
                            textAnchor="middle"
                          >
                            M{m}
                          </text>
                          <text
                            x={meetingToX(i)} y={chartHeight - bottomMargin + 28}
                            fill="#8b95a5" fontSize="9" textAnchor="middle"
                          >
                            {month}
                          </text>
                        </g>
                      );
                    })}

                    {/* Current rate dashed line */}
                    <line
                      x1={leftMargin} y1={rateToY(currentRate)}
                      x2={chartWidth - rightMargin} y2={rateToY(currentRate)}
                      stroke="#60a5fa" strokeWidth="1"
                      strokeDasharray="6,4" opacity="0.5"
                    />

                    {/* Committee median line */}
                    {validMedians.length > 1 && (
                      <polyline
                        points={validMedians.map(([x, y]) => `${x},${y}`).join(' ')}
                        fill="none" stroke="rgba(156, 163, 175, 0.6)" strokeWidth="1.5"
                      />
                    )}

                    {/* Committee dots */}
                    {remainingMeetings.flatMap((m, i) => {
                      const dots = committeeDots[m] || [];
                      return dots.map((rate, j) => {
                        const jitter = (j / 12 - 0.5) * columnWidth * 0.4;
                        return (
                          <circle
                            key={`cd-${m}-${j}`}
                            cx={meetingToX(i) + jitter}
                            cy={rateToY(rate)}
                            r="3" fill="rgba(156, 163, 175, 0.4)"
                          />
                        );
                      });
                    })}

                    {/* Player dot connecting line */}
                    {playerDotEntries.length > 1 && (
                      <polyline
                        points={playerDotEntries.map(([m, r]) => {
                          const idx = remainingMeetings.indexOf(m);
                          return `${meetingToX(idx)},${rateToY(r)}`;
                        }).join(' ')}
                        fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.7"
                      />
                    )}

                    {/* Player dots */}
                    {playerDotEntries.map(([m, r]) => {
                      const idx = remainingMeetings.indexOf(m);
                      return (
                        <circle
                          key={`pd-${m}`}
                          cx={meetingToX(idx)} cy={rateToY(r)}
                          r="6" fill="#60a5fa"
                          stroke="rgba(96, 165, 250, 0.3)" strokeWidth="3"
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Instruction */}
                <div style={{ fontSize: '10px', color: '#8b95a5', marginTop: '10px', textAlign: 'center', lineHeight: '1.5' }}>
                  Project your rate path for upcoming meetings. Markets will price your projections as guidance. You may leave meetings blank to preserve flexibility.
                </div>
              </div>
            );
          })()}

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
