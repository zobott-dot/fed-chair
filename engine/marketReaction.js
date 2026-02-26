// Market Reaction Engine - Simulates market response to Fed decisions

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

/**
 * Calculate market reaction based on rate decision and statement tone
 * @param {Object} params
 * @param {number} params.rateDecision - Rate change in basis points
 * @param {number} params.marketExpects - Expected rate change in basis points
 * @param {number} params.hawkScore - Statement tone score
 * @param {Object} params.markets - Current market values
 * @param {Object} params.gdp - GDP data
 * @param {Object} params.unemployment - Unemployment data
 * @param {Object} params.inflationForecast - Inflation forecast data
 * @param {string} params.gameMode - 'quick' or 'full'
 * @param {number} params.statementCount - Number of statements selected
 * @returns {Object} Market reaction data
 */
window.FedChair.Engine.calculateMarketReaction = function({
  rateDecision,
  marketExpects,
  hawkScore,
  markets,
  gdp,
  unemployment,
  inflationForecast,
  gameMode,
  statementCount,
  credibility
}) {
  const surprise = rateDecision - marketExpects;

  // Credibility scales market reaction intensity
  // High credibility (100) = 1.0x, markets trust you
  // Low credibility (50) = 1.5x, markets are jittery
  // Very low credibility (0) = 2.0x, everything is a shock
  const cred = typeof credibility === 'number' ? credibility : 100;
  const credMultiplier = 1 + (100 - cred) / 100;

  let sp500Change = 0, vixChange = 0, yield10yChange = 0, yield2yChange = 0, dxyChange = 0;
  let techChange = 0, financialsChange = 0, utilitiesChange = 0, creditSpreadChange = 0;

  if (surprise < 0) {
    // Dovish surprise - markets rally
    sp500Change = (Math.abs(surprise) * 0.4 + Math.random() * 0.3) * credMultiplier;
    vixChange = (-Math.abs(surprise) * 0.08 - Math.random() * 0.5) * credMultiplier;
    yield10yChange = (-Math.abs(surprise) * 0.03 - Math.random() * 0.02) * credMultiplier;
    yield2yChange = (-Math.abs(surprise) * 0.05 - Math.random() * 0.02) * credMultiplier;
    dxyChange = (-Math.abs(surprise) * 0.1 - Math.random() * 0.1) * credMultiplier;
    techChange = sp500Change * 1.3;
    financialsChange = sp500Change * 0.7;
    utilitiesChange = sp500Change * 0.5;
    creditSpreadChange = -Math.abs(surprise) * 0.5 * credMultiplier;
  } else if (surprise > 0) {
    // Hawkish surprise - markets sell off
    sp500Change = (-surprise * 0.5 - Math.random() * 0.4) * credMultiplier;
    vixChange = (surprise * 0.15 + Math.random() * 0.8) * credMultiplier;
    yield10yChange = (surprise * 0.04 + Math.random() * 0.02) * credMultiplier;
    yield2yChange = (surprise * 0.06 + Math.random() * 0.03) * credMultiplier;
    dxyChange = (surprise * 0.15 + Math.random() * 0.1) * credMultiplier;
    techChange = sp500Change * 1.4;
    financialsChange = sp500Change * 0.6;
    utilitiesChange = sp500Change * 0.8;
    creditSpreadChange = surprise * 0.8 * credMultiplier;
  } else {
    // In line with expectations — high credibility = calmer markets
    const calmFactor = 0.5 + 0.5 * (cred / 100); // 0.5 at cred 0, 1.0 at cred 100
    sp500Change = (Math.random() - 0.5) * 0.3 * calmFactor;
    vixChange = (Math.random() - 0.5) * 0.4 * calmFactor;
    yield10yChange = (Math.random() - 0.5) * 0.02 * calmFactor;
    yield2yChange = (Math.random() - 0.5) * 0.02 * calmFactor;
    dxyChange = (Math.random() - 0.5) * 0.1 * calmFactor;
    techChange = sp500Change * 1.1;
    financialsChange = sp500Change * 0.9;
    utilitiesChange = sp500Change * 0.8;
    creditSpreadChange = (Math.random() - 0.5) * 0.3 * calmFactor;
  }

  // Statement tone affects markets in full mode
  if (gameMode === 'full' && statementCount > 0) {
    const toneEffect = hawkScore * 0.08;
    sp500Change -= toneEffect;
    yield10yChange += toneEffect * 0.01;
    techChange -= toneEffect * 1.2;
  }

  // Economic projection shifts
  let gdpShift = 0, unemploymentShift = 0, inflationShift = 0;
  if (rateDecision < 0) {
    gdpShift = Math.abs(rateDecision) * 0.004;
    unemploymentShift = -Math.abs(rateDecision) * 0.002;
    inflationShift = Math.abs(rateDecision) * 0.003;
  } else if (rateDecision > 0) {
    gdpShift = -rateDecision * 0.006;
    unemploymentShift = rateDecision * 0.003;
    inflationShift = -rateDecision * 0.004;
  }

  // Generate headline
  let headline = '';
  if (surprise < -25) headline = 'Fed Surprises with Aggressive Cut';
  else if (surprise < 0) headline = 'Fed Delivers Dovish Surprise';
  else if (surprise === 0 && rateDecision === 0) headline = 'Fed Holds Steady as Expected';
  else if (surprise > 25) headline = 'Fed Shocks with Aggressive Hike';
  else if (surprise > 0) headline = 'Hawkish Fed Surprises Markets';
  else headline = 'Fed Decision in Line';

  const questions = [
    { outlet: 'WSJ', question: 'What drove today\'s decision?' },
    { outlet: 'CNBC', question: 'When do you expect the next move?' },
    { outlet: 'Reuters', question: 'How do tariffs factor in?' }
  ];

  return {
    sp500: {
      value: markets.sp500.value + (markets.sp500.value * sp500Change / 100),
      change: sp500Change
    },
    vix: {
      value: markets.vix.value + vixChange,
      change: vixChange
    },
    treasury10y: {
      value: markets.treasury10y.value + yield10yChange,
      change: yield10yChange * 100
    },
    treasury2y: {
      value: markets.treasury2y.value + yield2yChange,
      change: yield2yChange * 100
    },
    dxy: {
      value: markets.dxy.value + dxyChange,
      change: dxyChange
    },
    sectors: {
      tech: techChange,
      financials: financialsChange,
      utilities: utilitiesChange
    },
    creditSpread: creditSpreadChange,
    projections: {
      gdp: gdp.forecast + gdpShift,
      unemployment: unemployment.forecast + unemploymentShift,
      inflation: inflationForecast.forecast + inflationShift
    },
    headline,
    surprise,
    questions
  };
};
