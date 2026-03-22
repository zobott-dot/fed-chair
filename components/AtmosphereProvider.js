// AtmosphereProvider - Visual atmosphere system based on economic conditions
// Sets CSS custom properties on document.documentElement for global availability
// and exposes palette through React context for direct access.

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const AtmosphereContext = React.createContext({
  enabled: false,
  setEnabled: () => {},
  channels: { inflation: 0, recession: 0, financial: 0 },
  dominant: null,
  severity: 'stable',
  explanation: '',
  palette: null,
});

window.FedChair.Components.AtmosphereContext = AtmosphereContext;

// --- Color utilities ---

function parseHex(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
}

function toHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [clamp(r), clamp(g), clamp(b)].map(v => v.toString(16).padStart(2, '0')).join('');
}

function parseRgba(str) {
  const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+))?\s*\)/);
  if (!m) return null;
  return { r: parseFloat(m[1]), g: parseFloat(m[2]), b: parseFloat(m[3]), a: m[4] !== undefined ? parseFloat(m[4]) : 1 };
}

function toRgba(r, g, b, a) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;
}

function lerpColor(colorA, colorB, t) {
  if (colorA === 'transparent' && colorB === 'transparent') return 'transparent';
  if (colorA === 'transparent') colorA = 'rgba(0,0,0,0)';
  if (colorB === 'transparent') colorB = 'rgba(0,0,0,0)';

  const isRgbaA = colorA.startsWith('rgba') || colorA.startsWith('rgb');
  const isRgbaB = colorB.startsWith('rgba') || colorB.startsWith('rgb');

  if (isRgbaA || isRgbaB) {
    const a = isRgbaA ? parseRgba(colorA) : { ...parseHex(colorA), a: 1 };
    const b = isRgbaB ? parseRgba(colorB) : { ...parseHex(colorB), a: 1 };
    if (!a || !b) return colorB;
    return toRgba(
      a.r + (b.r - a.r) * t,
      a.g + (b.g - a.g) * t,
      a.b + (b.b - a.b) * t,
      a.a + (b.a - a.a) * t
    );
  }

  // Both hex
  const ca = parseHex(colorA);
  const cb = parseHex(colorB);
  return toHex(
    ca.r + (cb.r - ca.r) * t,
    ca.g + (cb.g - ca.g) * t,
    ca.b + (cb.b - ca.b) * t
  );
}

// --- Channel computation ---

function computeInflationStress(economy, lastEconomy, config) {
  const pce = economy.pceInflation || 0;
  const target = config.target;
  const distance = pce - target;

  if (distance <= 0) return 0;

  const { mildThreshold, moderateThreshold, severeThreshold } = config;
  let stress;
  if (distance <= mildThreshold) {
    stress = (distance / mildThreshold) * 0.2;
  } else if (distance <= moderateThreshold) {
    stress = 0.2 + ((distance - mildThreshold) / (moderateThreshold - mildThreshold)) * 0.3;
  } else if (distance <= severeThreshold) {
    stress = 0.5 + ((distance - moderateThreshold) / (severeThreshold - moderateThreshold)) * 0.4;
  } else {
    stress = 0.9 + Math.min(0.1, (distance - severeThreshold) * 0.05);
  }

  // Acceleration bonus
  if (lastEconomy) {
    const prevPce = lastEconomy.pceInflation || 0;
    const change = pce - prevPce;
    if (change > 0) {
      stress += change * config.accelerationWeight;
    }
  }

  return Math.max(0, Math.min(1, stress));
}

function computeRecessionStress(economy, lastEconomy, config) {
  const gdp = economy.gdpGrowth || 0;
  const unemployment = economy.unemploymentRate || 0;

  // GDP component
  let gdpStress;
  if (gdp >= config.healthyGrowth) {
    gdpStress = 0;
  } else if (gdp >= config.slowingThreshold) {
    gdpStress = ((config.healthyGrowth - gdp) / (config.healthyGrowth - config.slowingThreshold)) * 0.3;
  } else if (gdp >= config.contractionThreshold) {
    gdpStress = 0.3 + ((config.slowingThreshold - gdp) / config.slowingThreshold) * 0.4;
  } else {
    gdpStress = 0.7 + Math.min(0.3, Math.abs(gdp) * 0.15);
  }

  // Unemployment component
  const unemploymentExcess = Math.max(0, unemployment - config.naturalRate);
  const unemploymentStress = Math.min(0.5, unemploymentExcess * config.unemploymentWeight * 0.25);

  let stress = Math.min(1, gdpStress + unemploymentStress);

  // Trend bonus
  if (lastEconomy && config.trendWeight) {
    const prevGdp = lastEconomy.gdpGrowth || 0;
    const prevUnemp = lastEconomy.unemploymentRate || 0;
    if (gdp < prevGdp) stress += (prevGdp - gdp) * config.trendWeight * 0.1;
    if (unemployment > prevUnemp) stress += (unemployment - prevUnemp) * config.trendWeight * 0.1;
  }

  return Math.max(0, Math.min(1, stress));
}

function computeFinancialStress(markets, credibility, config) {
  const vix = markets.vix || 15;
  let stress;

  if (vix <= config.vixCalm) {
    stress = 0;
  } else if (vix <= config.vixElevated) {
    stress = ((vix - config.vixCalm) / (config.vixElevated - config.vixCalm)) * 0.2;
  } else if (vix <= config.vixStress) {
    stress = 0.2 + ((vix - config.vixElevated) / (config.vixStress - config.vixElevated)) * 0.4;
  } else if (vix <= config.vixCrisis) {
    stress = 0.6 + ((vix - config.vixStress) / (config.vixCrisis - config.vixStress)) * 0.4;
  } else {
    stress = 1.0;
  }

  // Yield curve inversion
  if (markets.treasury10y && markets.treasury2y) {
    const spread = markets.treasury10y - markets.treasury2y;
    if (spread < 0) {
      stress += Math.min(0.2, Math.abs(spread) * 0.1);
    }
  }

  // Low credibility amplifies financial stress
  if (credibility !== undefined && credibility < 60) {
    const credPenalty = ((60 - credibility) / 60) * config.credibilityAmplification;
    stress += credPenalty;
  }

  return Math.max(0, Math.min(1, stress));
}

// --- Blending ---

function blendAtmosphere(inflationStress, recessionStress, financialStress, colors) {
  const total = inflationStress + recessionStress + financialStress;
  if (total < 0.05) return { ...colors.neutral };

  // Relative weights
  const wi = inflationStress / total;
  const wr = recessionStress / total;
  const wf = financialStress / total;

  // Overall intensity driven by max channel
  const intensity = Math.max(inflationStress, recessionStress, financialStress);

  // Build weighted channel target for each color property
  const props = ['bg', 'bgGradientEnd', 'border', 'accent', 'band'];
  const result = {};

  for (const prop of props) {
    // Weighted mix of channel colors
    const channelMix = lerpColor(
      lerpColor(colors.inflation[prop], colors.recession[prop], wr / (wi + wr + 0.001)),
      colors.financial[prop],
      wf
    );
    // Interpolate from neutral toward channel mix at intensity rate
    result[prop] = lerpColor(colors.neutral[prop], channelMix, intensity);
  }

  return result;
}

// --- Severity / explanation ---

function getSeverity(stress) {
  if (stress < 0.2) return 'mild';
  if (stress < 0.6) return 'moderate';
  return 'severe';
}

function getExplanation(inflationStress, recessionStress, financialStress, config) {
  const explanations = config.explanations;

  // Stagflation check
  if (inflationStress > 0.4 && recessionStress > 0.4) {
    return { dominant: 'stagflation', text: explanations.stagflation };
  }

  const max = Math.max(inflationStress, recessionStress, financialStress);
  if (max < 0.05) {
    return { dominant: 'stable', text: explanations.stable };
  }

  let dominant, channelExplanations;
  if (inflationStress >= recessionStress && inflationStress >= financialStress) {
    dominant = 'inflation';
    channelExplanations = explanations.inflation;
  } else if (recessionStress >= financialStress) {
    dominant = 'recession';
    channelExplanations = explanations.recession;
  } else {
    dominant = 'financial';
    channelExplanations = explanations.financial;
  }

  const severity = getSeverity(max);
  return { dominant, text: channelExplanations[severity] };
}

// --- Provider Component ---

window.FedChair.Components.AtmosphereProvider = function({ gameState, enabled, setEnabled, children }) {
  const [transitionDuration, setTransitionDuration] = React.useState(0);
  const prevMeetingRef = React.useRef(null);

  const config = window.FedChair.Data.AtmosphereConfig;

  // Compute channels from game state
  const channels = React.useMemo(() => {
    if (!gameState || !gameState.economy) {
      return { inflation: 0, recession: 0, financial: 0 };
    }

    const economy = gameState.economy;
    const lastEconomy = gameState.lastMeetingEconomy || null;
    const markets = gameState.markets || {};
    const credibility = gameState.credibility;

    const infStress = computeInflationStress(economy, lastEconomy, config.channels.inflation);
    const recStress = computeRecessionStress(economy, lastEconomy, config.channels.recession);
    const finStress = computeFinancialStress(markets, credibility, config.channels.financial);
    console.log('ATMO DEBUG:', { enabled, pce: economy.pceInflation, gdp: economy.gdpGrowth, unemp: economy.unemploymentRate, vix: (gameState.markets || {}).vix, credibility: gameState.credibility, infStress, recStress, finStress });
    return {
      inflation: infStress,
      recession: recStress,
      financial: finStress,
    };
  }, [
    gameState?.economy?.pceInflation,
    gameState?.economy?.gdpGrowth,
    gameState?.economy?.unemploymentRate,
    gameState?.markets?.vix,
    gameState?.markets?.treasury10y,
    gameState?.markets?.treasury2y,
    gameState?.credibility,
    gameState?.lastMeetingEconomy?.pceInflation,
    gameState?.lastMeetingEconomy?.gdpGrowth,
  ]);

  // Compute blended palette
  const palette = React.useMemo(() => {
    if (!enabled) return config.colors.neutral;
    return blendAtmosphere(channels.inflation, channels.recession, channels.financial, config.colors);
  }, [enabled, channels.inflation, channels.recession, channels.financial]);

  // Get explanation
  const explanationData = React.useMemo(() => {
    return getExplanation(channels.inflation, channels.recession, channels.financial, config);
  }, [channels.inflation, channels.recession, channels.financial]);

  // Manage transition timing for meeting changes
  React.useEffect(() => {
    if (!gameState) return;
    const currentMeeting = gameState.meetingNumber;
    if (prevMeetingRef.current !== null && prevMeetingRef.current !== currentMeeting) {
      setTransitionDuration(config.transitions.betweenMeetings);
    }
    prevMeetingRef.current = currentMeeting;
  }, [gameState?.meetingNumber]);

  // Set CSS custom properties on document.documentElement for global availability
  React.useEffect(() => {
    console.log('ATMO PALETTE SET:', { enabled, bg: palette.bg, border: palette.border, band: palette.band });
    const root = document.documentElement;
    root.style.setProperty('--atmo-bg', palette.bg);
    root.style.setProperty('--atmo-bg-end', palette.bgGradientEnd);
    root.style.setProperty('--atmo-border', palette.border);
    root.style.setProperty('--atmo-accent', palette.accent);
    root.style.setProperty('--atmo-band', palette.band);
    root.style.setProperty('--atmo-transition', (transitionDuration || 0) + 'ms');
  }, [palette, transitionDuration]);

  // Reset transition duration after animation completes
  React.useEffect(() => {
    if (transitionDuration > 0) {
      const timer = setTimeout(() => setTransitionDuration(0), transitionDuration + 50);
      return () => clearTimeout(timer);
    }
  }, [transitionDuration]);

  // Clean up document vars on unmount
  React.useEffect(() => {
    return () => {
      const root = document.documentElement;
      const neutral = config.colors.neutral;
      root.style.setProperty('--atmo-bg', neutral.bg);
      root.style.setProperty('--atmo-bg-end', neutral.bgGradientEnd);
      root.style.setProperty('--atmo-border', neutral.border);
      root.style.setProperty('--atmo-accent', neutral.accent);
      root.style.setProperty('--atmo-band', neutral.band);
      root.style.setProperty('--atmo-transition', '0ms');
    };
  }, []);

  // Handle toggle transitions
  const handleToggle = React.useCallback((newEnabled) => {
    console.log('HANDLE TOGGLE CALLED:', newEnabled);
    setTransitionDuration(config.transitions.toggle);
    setEnabled(newEnabled);
  }, [setEnabled]);

  const contextValue = React.useMemo(() => ({
    enabled,
    setEnabled: handleToggle,
    channels,
    dominant: explanationData.dominant,
    severity: explanationData.dominant === 'stagflation' ? 'severe' : getSeverity(Math.max(channels.inflation, channels.recession, channels.financial)),
    explanation: explanationData.text,
    palette,
  }), [enabled, handleToggle, channels, explanationData, palette]);

  return (
    <AtmosphereContext.Provider value={contextValue}>
      {children}
    </AtmosphereContext.Provider>
  );
};
