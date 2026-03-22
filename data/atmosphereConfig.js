// Atmosphere Configuration - All tuning values for the visual atmosphere system
// Edit thresholds, colors, weights, and durations here to adjust the feel.

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.AtmosphereConfig = {
  // Channel computation thresholds
  channels: {
    inflation: {
      // Core PCE distance from 2.0% target
      target: 2.0,
      mildThreshold: 0.5,       // > 0.5% above target = mild stress
      moderateThreshold: 1.5,   // > 1.5% above = moderate
      severeThreshold: 3.0,     // > 3.0% above = severe
      // How much acceleration (worsening trend) amplifies the signal
      accelerationWeight: 0.3,
    },
    recession: {
      // GDP growth thresholds
      healthyGrowth: 2.0,       // above this = no stress
      slowingThreshold: 1.0,    // below this = mild
      contractionThreshold: 0,  // negative = severe
      // Unemployment distance from natural rate
      naturalRate: 4.0,
      unemploymentWeight: 0.5,
      // Worsening trend amplifies signal
      trendWeight: 0.3,
    },
    financial: {
      // VIX thresholds
      vixCalm: 15,
      vixElevated: 20,
      vixStress: 30,
      vixCrisis: 40,
      // Low credibility amplifies financial stress
      credibilityAmplification: 0.15,
    }
  },

  // Color mapping for each channel at full intensity
  colors: {
    neutral: {
      bg: '#0a0f1a',
      bgGradientEnd: '#0d1117',
      border: 'rgba(75, 85, 99, 0.3)',
      accent: '#60a5fa',
      band: 'transparent',
    },
    inflation: {
      bg: '#1f1008',
      bgGradientEnd: '#1a0a04',
      border: 'rgba(220, 90, 10, 0.55)',
      accent: '#f59e0b',
      band: 'rgba(240, 100, 20, 0.85)',
    },
    recession: {
      bg: '#080e1a',
      bgGradientEnd: '#040810',
      border: 'rgba(40, 100, 220, 0.45)',
      accent: '#60a5fa',
      band: 'rgba(40, 90, 200, 0.75)',
    },
    financial: {
      bg: '#121212',
      bgGradientEnd: '#0e0e0e',
      border: 'rgba(140, 140, 140, 0.45)',
      accent: '#9ca3af',
      band: 'rgba(140, 140, 140, 0.7)',
    },
  },

  // Transition durations (ms)
  transitions: {
    betweenMeetings: 1500,
    withinMeeting: 800,
    toggle: 500,
  },

  // Status band configuration
  statusBand: {
    height: '6px',
    position: 'top',
    blur: '12px',
  },

  // Learn Mode atmosphere explanations
  explanations: {
    inflation: {
      mild: 'The environment reflects above-target inflation. Price pressures are building, and the committee is watching closely.',
      moderate: 'Inflation is running well above target. The warm tone reflects the urgency of the price stability mandate.',
      severe: 'Inflation is dangerously elevated. The economy is overheating, and the visual intensity reflects the Fed\'s primary crisis.',
    },
    recession: {
      mild: 'Economic growth is slowing. The cooling environment reflects softening conditions and rising downside risks.',
      moderate: 'The economy is approaching or entering contraction. The weight in the environment reflects the severity of the growth challenge.',
      severe: 'Recessionary conditions are present. Rising unemployment and falling output are creating a heavy economic environment.',
    },
    financial: {
      mild: 'Market volatility is elevated. The muted tones reflect increased uncertainty in financial markets.',
      moderate: 'Financial stress is significant. Credit conditions are tightening and market confidence is eroding.',
      severe: 'Financial markets are in acute stress. The washed-out environment reflects systemic uncertainty and fragility.',
    },
    stagflation: 'The conflicting visual tones reflect the worst-case scenario: inflation and recession simultaneously. There are no easy policy options.',
    stable: 'Economic conditions are broadly balanced. Mandates are being met and financial conditions are orderly.',
  },
};
