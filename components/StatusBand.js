// StatusBand - Narrow colored strip at top of viewport reflecting atmospheric state

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.StatusBand = function({ learnMode }) {
  const atmo = React.useContext(window.FedChair.Components.AtmosphereContext);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const config = window.FedChair.Data.AtmosphereConfig;

  if (!atmo.enabled) return null;

  const bandColor = `var(--atmo-band, transparent)`;
  const transMs = `var(--atmo-transition, 0ms)`;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: config.statusBand.height,
        background: bandColor,
        boxShadow: `0 0 ${config.statusBand.blur} 2px ${bandColor}`,
        zIndex: 200,
        transition: `background ${transMs} ease-in-out, box-shadow ${transMs} ease-in-out`,
        cursor: learnMode ? 'pointer' : 'default',
      }}
      onClick={() => learnMode && setShowTooltip(!showTooltip)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Learn Mode tooltip */}
      {learnMode && showTooltip && atmo.explanation && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
          background: '#1a1f2e',
          border: '1px solid var(--color-gold, #D97706)',
          borderRadius: '6px',
          padding: '10px 14px',
          maxWidth: '360px',
          width: 'max-content',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
          zIndex: 201,
          fontSize: '12px',
          lineHeight: '1.5',
          color: '#E5E7EB',
        }}>
          <span style={{
            display: 'block',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '10px',
            fontWeight: 700,
            color: '#D97706',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '4px',
          }}>
            ATMOSPHERE
          </span>
          {atmo.explanation}
        </div>
      )}
    </div>
  );
};
