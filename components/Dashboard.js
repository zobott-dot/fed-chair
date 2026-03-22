// Dashboard Component - Economic data, FOMC members, markets

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: 'var(--atmo-panel-glow, none)',
  animation: 'var(--atmo-breathing, none)',
};

const getStanceColor = (stance) => {
  const colors = {
    'Very Hawkish': '#dc2626',
    'Hawkish': '#f97316',
    'Centrist': '#a3a3a3',
    'Dovish': '#22c55e',
    'Very Dovish': '#15803d'
  };
  return colors[stance] || '#a3a3a3';
};

const getTrendIcon = (trend) => {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
};

const getTrendColor = (trend, inverse = false) => {
  if (trend === 'up') return inverse ? '#ef4444' : '#22c55e';
  if (trend === 'down') return inverse ? '#22c55e' : '#ef4444';
  return '#9ca3af';
};

const getCredibilityColor = (credibility) => {
  if (credibility >= 80) return '#22c55e';
  if (credibility >= 60) return '#84cc16';
  if (credibility >= 40) return '#eab308';
  if (credibility >= 20) return '#f97316';
  return '#ef4444';
};

window.FedChair.Components.Dashboard = function({
  economicData,
  boardOfGovernors,
  regionalPresidents,
  newsHeadlines,
  setActiveView,
  gameState,
  learnMode
}) {
  const LearnTerm = window.FedChair.Components.LearnTerm;
  const [activePanel, setActivePanel] = React.useState('governors');

  const meetingNumber = gameState?.meetingNumber || 1;
  const totalMeetings = gameState?.totalMeetings || 8;
  const credibility = gameState?.credibility || 100;
  const hasPreviousMeeting = meetingNumber > 1;

  return (
    <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Meeting Progress Bar */}
      {gameState && (
        <div style={{
          background: 'rgba(17, 24, 39, 0.6)',
          border: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1px' }}>
                MEETING {meetingNumber} OF {totalMeetings}
              </span>
              <span style={{ fontSize: 'var(--text-sm)', color: '#60a5fa' }}>
                {economicData.nextMeeting}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '3px' }}>
              {Array.from({ length: totalMeetings }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    background: i < meetingNumber ? '#3b82f6' : 'var(--atmo-border, rgba(75, 85, 99, 0.3))'
                  }}
                />
              ))}
            </div>
          </div>
          <div style={{
            padding: '8px 12px',
            background: `${getCredibilityColor(credibility)}15`,
            border: `1px solid ${getCredibilityColor(credibility)}30`,
            borderRadius: '6px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '1px' }}><LearnTerm term="Credibility" learnMode={learnMode}>CREDIBILITY</LearnTerm></div>
            <div style={{
              fontSize: 'clamp(18px, 2.5vw, 26px)',
              fontFamily: '"IBM Plex Mono", monospace',
              color: getCredibilityColor(credibility)
            }}>
              {Math.round(credibility)}
            </div>
          </div>
        </div>
      )}

      {/* Since Last Meeting Panel */}
      {hasPreviousMeeting && gameState?.economyChanges && (
        <div style={{
          ...panelStyle,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.2) 0%, rgba(17, 24, 39, 0.8) 100%)'
        }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: '#60a5fa', letterSpacing: '1.5px', fontWeight: '600' }}>
              📰 SINCE LAST MEETING
            </span>
          </div>
          <div style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
              {[
                { label: 'GDP', change: gameState.economyChanges.gdpGrowth, inverse: false },
                { label: 'CPI', change: gameState.economyChanges.cpiInflation, inverse: true },
                { label: 'PCE', change: gameState.economyChanges.pceInflation, inverse: true },
                { label: 'Unemployment', change: gameState.economyChanges.unemploymentRate, inverse: true }
              ].filter(item => Math.abs(item.change) > 0.05).map((item, i) => {
                const isGood = item.inverse ? item.change < 0 : item.change > 0;
                return (
                  <div key={i} style={{
                    padding: '6px 10px',
                    background: isGood ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    border: `1px solid ${isGood ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    borderRadius: '4px',
                    fontSize: 'var(--text-sm)'
                  }}>
                    <span style={{ color: '#9ca3af' }}><LearnTerm term={item.label} learnMode={learnMode}>{item.label}</LearnTerm>: </span>
                    <span style={{ color: isGood ? '#22c55e' : '#ef4444', fontFamily: '"IBM Plex Mono", monospace' }}>
                      {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Active Shocks */}
            {gameState.activeShocks?.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                {gameState.activeShocks.map((shock, i) => (
                  <div key={i} style={{
                    padding: '6px 10px',
                    background: 'rgba(234, 179, 8, 0.1)',
                    border: '1px solid rgba(234, 179, 8, 0.3)',
                    borderRadius: '4px',
                    fontSize: 'var(--text-sm)',
                    color: '#eab308',
                    marginBottom: '4px'
                  }}>
                    ⚠️ {shock.name} (ongoing)
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fed Funds Rate Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(17, 24, 39, 0.8) 100%)',
        border: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginBottom: '8px', letterSpacing: '1.5px' }}>
          <LearnTerm term="Federal Funds Rate" learnMode={learnMode}>FEDERAL FUNDS RATE</LearnTerm>
        </div>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 'clamp(32px, 8vw, 48px)',
          color: '#60a5fa',
          marginBottom: '12px'
        }}>
          {economicData.fedFundsRate.target}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '8px 14px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '6px',
            fontSize: 'var(--text-sm)',
            color: '#60a5fa',
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
            {economicData.fedFundsRate.change}
          </span>
          <button
            onClick={() => setActiveView('briefing')}
            style={{
              padding: '10px 20px',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              background: 'rgba(234, 179, 8, 0.12)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              color: '#eab308',
              borderRadius: '6px',
              cursor: 'pointer',
              minHeight: 'auto'
            }}
          >
            📋 REVIEW BRIEFING
          </button>
          <button
            onClick={() => setActiveView('decision')}
            style={{
              padding: '10px 20px',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              minHeight: 'auto'
            }}
          >
            ⚡ MAKE DECISION
          </button>
        </div>
      </div>

      <div className="grid-responsive">
        {/* Inflation */}
        <div style={panelStyle}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', fontWeight: '600' }}><LearnTerm term="Inflation Expectations" learnMode={learnMode}>INFLATION</LearnTerm></span>
          </div>
          <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {Object.entries(economicData.inflation).map(([key, data]) => (
              <div key={key} style={{ padding: '12px', background: 'rgba(17, 24, 39, 0.5)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(22px, 3vw, 32px)', color: '#f9fafb' }}>
                    {data.value}
                  </div>
                  <span style={{ fontSize: 'var(--text-base)', color: getTrendColor(data.trend, true) }}>
                    {getTrendIcon(data.trend)}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '4px' }}>
                  <LearnTerm term={data.label} learnMode={learnMode}>{data.label}</LearnTerm>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employment */}
        <div style={panelStyle}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', fontWeight: '600' }}><LearnTerm term="Maximum Employment" learnMode={learnMode}>EMPLOYMENT</LearnTerm></span>
          </div>
          <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {Object.entries(economicData.employment).map(([key, data]) => (
              <div key={key} style={{ padding: '12px', background: 'rgba(17, 24, 39, 0.5)', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(22px, 3vw, 32px)', color: '#f9fafb' }}>
                    {data.value}
                  </div>
                  <span style={{ fontSize: 'var(--text-base)', color: getTrendColor(data.trend, key.includes('unemployment')) }}>
                    {getTrendIcon(data.trend)}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '4px' }}>
                  <LearnTerm term={data.label === 'Unemployment' ? 'Unemployment Rate' : data.label === 'Payrolls' ? 'Non-Farm Payrolls' : data.label === 'Participation' ? 'Labor Force Participation' : data.label} learnMode={learnMode}>{data.label}</LearnTerm>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOMC */}
        <div style={panelStyle}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', fontWeight: '600' }}><LearnTerm term="FOMC" learnMode={learnMode}>FOMC</LearnTerm></span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setActivePanel('governors')}
                style={{
                  padding: '5px 10px',
                  fontSize: 'var(--text-xs)',
                  background: activePanel === 'governors' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  border: 'none',
                  color: activePanel === 'governors' ? '#60a5fa' : '#8b95a5',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  minHeight: '28px'
                }}
              >
                <LearnTerm term="BOG" learnMode={learnMode}>BOG</LearnTerm>
              </button>
              <button
                onClick={() => setActivePanel('presidents')}
                style={{
                  padding: '5px 10px',
                  fontSize: 'var(--text-xs)',
                  background: activePanel === 'presidents' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  border: 'none',
                  color: activePanel === 'presidents' ? '#60a5fa' : '#8b95a5',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  minHeight: '28px'
                }}
              >
                <LearnTerm term="FRB" learnMode={learnMode}>FRB</LearnTerm>
              </button>
            </div>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {(activePanel === 'governors' ? boardOfGovernors : regionalPresidents).map((person, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(75, 85, 99, 0.15)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: 'var(--text-base)', color: '#f9fafb' }}>
                    <LearnTerm term={person.name} learnMode={learnMode}>{person.name}</LearnTerm>
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5' }}>{person.role || person.bank}</div>
                </div>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '3px',
                  fontSize: 'var(--text-xs)',
                  background: `${getStanceColor(person.stance)}20`,
                  color: getStanceColor(person.stance)
                }}>
                  {person.stance}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* News */}
        <div style={panelStyle}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', fontWeight: '600' }}>NEWS</span>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {newsHeadlines.map((item, i) => (
              <div
                key={i}
                style={{ padding: '12px 16px', borderBottom: '1px solid rgba(75, 85, 99, 0.15)' }}
              >
                <div style={{ fontSize: 'var(--text-base)', fontFamily: 'var(--font-prose)', color: '#f9fafb', lineHeight: 'var(--leading-normal)', marginBottom: '4px' }}>
                  {item.headline}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5' }}>{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Markets */}
      <div style={{ ...panelStyle, marginTop: '16px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--atmo-border, rgba(75, 85, 99, 0.3))' }}>
          <span style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', fontWeight: '600' }}><LearnTerm term="Financial Conditions" learnMode={learnMode}>MARKETS</LearnTerm></span>
        </div>
        <div style={{ padding: '12px' }}>
          <div className="grid-markets">
            {Object.entries(economicData.markets).map(([key, data]) => (
              <div
                key={key}
                style={{
                  padding: '12px 10px',
                  background: 'rgba(17, 24, 39, 0.5)',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}
              >
                <div className="market-value" style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: 'clamp(18px, 2.2vw, 26px)', color: '#f9fafb' }}>
                  {data.display || data.value}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '4px' }}>
                  <LearnTerm term={data.label} learnMode={learnMode}>{data.label}</LearnTerm>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Rate Effects Indicator */}
      {gameState?.pendingEffects?.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(234, 179, 8, 0.1)',
          border: '1px solid rgba(234, 179, 8, 0.3)',
          borderRadius: '8px',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-prose)',
          color: '#eab308'
        }}>
          ⏳ {gameState.pendingEffects.length} past rate decision{gameState.pendingEffects.length > 1 ? 's' : ''} still working through the economy
        </div>
      )}
    </main>
  );
};
