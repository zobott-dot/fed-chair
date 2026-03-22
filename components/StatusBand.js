// StatusBand - Animated heartbeat bar reflecting atmospheric stress
// Pulses with varying speed and intensity based on economic conditions

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.StatusBand = function({ learnMode }) {
  const atmo = React.useContext(window.FedChair.Components.AtmosphereContext);
  const [showTooltip, setShowTooltip] = React.useState(false);
  const config = window.FedChair.Data.AtmosphereConfig;

  if (!atmo.enabled) return null;

  const channels = atmo.channels || { inflation: 0, recession: 0, financial: 0 };
  const maxStress = Math.max(channels.inflation, channels.recession, channels.financial);
  const isStagflation = atmo.dominant === 'stagflation';

  // Pulse timing from config
  const pulseConfig = config.pulse;
  const pulseDuration = maxStress < 0.2 ? pulseConfig.calm
    : maxStress < 0.5 ? pulseConfig.moderate
    : maxStress < 0.8 ? pulseConfig.elevated
    : pulseConfig.crisis;

  // Glow parameters
  const glowConfig = config.glow;
  const glowIntensity = Math.min(1, maxStress * 1.5);
  const glowSpread = glowConfig.bandBaseSpread + maxStress * (glowConfig.bandMaxSpread - glowConfig.bandBaseSpread);

  // Band color
  const bandColor = atmo.palette ? atmo.palette.band : 'transparent';

  const animationName = isStagflation ? 'stagflationPulse' : 'atmospherePulse';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: config.statusBand.height,
        background: bandColor,
        zIndex: 200,
        animation: `${animationName} ${pulseDuration}s ease-in-out infinite`,
        '--atmo-glow-color': bandColor,
        '--atmo-glow-spread': glowSpread + 'px',
        '--atmo-glow-intensity': glowIntensity,
        '--atmo-warm-band': isStagflation ? config.colors.inflation.band : bandColor,
        '--atmo-cool-band': isStagflation ? config.colors.recession.band : bandColor,
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
          animation: 'none',
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
