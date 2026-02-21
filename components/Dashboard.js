// Dashboard Component - Economic data, FOMC members, markets

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
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

window.FedChair.Components.Dashboard = function({
  economicData,
  boardOfGovernors,
  regionalPresidents,
  newsHeadlines,
  setActiveView
}) {
  const [activePanel, setActivePanel] = React.useState('governors');

  return (
    <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Fed Funds Rate Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(17, 24, 39, 0.8) 100%)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px', letterSpacing: '1px' }}>
          FEDERAL FUNDS RATE
        </div>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 'clamp(28px, 8vw, 36px)',
          color: '#60a5fa',
          marginBottom: '12px'
        }}>
          {economicData.fedFundsRate.target}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '6px 12px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#60a5fa'
          }}>
            {economicData.fedFundsRate.change}
          </span>
          <button
            onClick={() => setActiveView('decision')}
            style={{
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: '500',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              border: 'none',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ⚡ DECIDE
          </button>
        </div>
      </div>

      <div className="grid-responsive">
        {/* Inflation */}
        <div style={panelStyle}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>INFLATION</span>
          </div>
          <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {Object.entries(economicData.inflation).map(([key, data]) => (
              <div key={key} style={{ padding: '10px', background: 'rgba(17, 24, 39, 0.5)', borderRadius: '6px' }}>
                <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '18px', color: '#f9fafb' }}>
                  {data.value}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>{data.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Employment */}
        <div style={panelStyle}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>EMPLOYMENT</span>
          </div>
          <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {Object.entries(economicData.employment).map(([key, data]) => (
              <div key={key} style={{ padding: '10px', background: 'rgba(17, 24, 39, 0.5)', borderRadius: '6px' }}>
                <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '18px', color: '#f9fafb' }}>
                  {data.value}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>{data.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FOMC */}
        <div style={panelStyle}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>FOMC</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setActivePanel('governors')}
                style={{
                  padding: '4px 8px',
                  fontSize: '10px',
                  background: activePanel === 'governors' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  border: 'none',
                  color: activePanel === 'governors' ? '#60a5fa' : '#6b7280',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  minHeight: '28px'
                }}
              >
                BOG
              </button>
              <button
                onClick={() => setActivePanel('presidents')}
                style={{
                  padding: '4px 8px',
                  fontSize: '10px',
                  background: activePanel === 'presidents' ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  border: 'none',
                  color: activePanel === 'presidents' ? '#60a5fa' : '#6b7280',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  minHeight: '28px'
                }}
              >
                FRB
              </button>
            </div>
          </div>
          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
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
                  <div style={{ fontSize: '12px', color: '#f9fafb' }}>{person.name}</div>
                  <div style={{ fontSize: '10px', color: '#6b7280' }}>{person.role || person.bank}</div>
                </div>
                <span style={{
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontSize: '9px',
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
          <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
            <span style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>NEWS</span>
          </div>
          <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
            {newsHeadlines.map((item, i) => (
              <div
                key={i}
                style={{ padding: '12px 16px', borderBottom: '1px solid rgba(75, 85, 99, 0.15)' }}
              >
                <div style={{ fontSize: '12px', color: '#f9fafb', lineHeight: '1.4', marginBottom: '4px' }}>
                  {item.headline}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>{item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Markets */}
      <div style={{ ...panelStyle, marginTop: '16px' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
          <span style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '1px' }}>MARKETS</span>
        </div>
        <div style={{ padding: '12px' }}>
          <div className="grid-markets">
            {Object.entries(economicData.markets).map(([key, data]) => (
              <div
                key={key}
                style={{
                  padding: '10px',
                  background: 'rgba(17, 24, 39, 0.5)',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '16px', color: '#f9fafb' }}>
                  {data.display || data.value}
                </div>
                <div style={{ fontSize: '10px', color: '#6b7280' }}>{data.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
