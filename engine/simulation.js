// Multi-Round Simulation Engine
// Handles game state, economic evolution, lagged effects, and random shocks

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

// 2026 FOMC Meeting Schedule
const MEETING_SCHEDULE = [
  { meeting: 1, date: '2026-03-18', displayDate: 'March 17-18, 2026' },
  { meeting: 2, date: '2026-05-06', displayDate: 'May 5-6, 2026' },
  { meeting: 3, date: '2026-06-17', displayDate: 'June 16-17, 2026' },
  { meeting: 4, date: '2026-07-29', displayDate: 'July 28-29, 2026' },
  { meeting: 5, date: '2026-09-16', displayDate: 'September 15-16, 2026' },
  { meeting: 6, date: '2026-11-04', displayDate: 'November 3-4, 2026' },
  { meeting: 7, date: '2026-12-16', displayDate: 'December 15-16, 2026' },
  { meeting: 8, date: '2027-01-27', displayDate: 'January 26-27, 2027' }
];

// Economic shock types that can occur between meetings
const SHOCK_TYPES = [
  {
    id: 'oil_spike',
    name: 'Oil Price Spike',
    probability: 0.08,
    effects: { cpiInflation: 0.4, gdpGrowth: -0.2, pceInflation: 0.3 },
    duration: 2,
    headline: 'Oil Prices Surge on Supply Disruption'
  },
  {
    id: 'banking_stress',
    name: 'Banking Sector Stress',
    probability: 0.05,
    effects: { gdpGrowth: -0.3, vix: 5, treasury2y: -0.2 },
    duration: 2,
    headline: 'Regional Banks Face Liquidity Pressures'
  },
  {
    id: 'trade_disruption',
    name: 'Trade Disruption',
    probability: 0.06,
    effects: { cpiInflation: 0.2, gdpGrowth: -0.15 },
    duration: 3,
    headline: 'New Tariffs Disrupt Supply Chains'
  },
  {
    id: 'labor_surge',
    name: 'Strong Labor Market',
    probability: 0.10,
    effects: { payrollsChange: 80, unemploymentRate: -0.2, cpiInflation: 0.1 },
    duration: 1,
    headline: 'Hiring Accelerates Across Sectors'
  },
  {
    id: 'tech_selloff',
    name: 'Tech Sector Correction',
    probability: 0.07,
    effects: { sp500: -3, vix: 4 },
    duration: 1,
    headline: 'Tech Stocks Slide on Valuation Concerns'
  },
  {
    id: 'inflation_surprise',
    name: 'Inflation Surprise',
    probability: 0.08,
    effects: { cpiInflation: 0.3, pceInflation: 0.25, coreInflation: 0.2 },
    duration: 1,
    headline: 'Consumer Prices Rise More Than Expected'
  },
  {
    id: 'growth_scare',
    name: 'Growth Scare',
    probability: 0.06,
    effects: { gdpGrowth: -0.4, sp500: -2, treasury10y: -0.15 },
    duration: 1,
    headline: 'Economic Data Signals Potential Slowdown'
  },
  {
    id: 'consumer_strength',
    name: 'Consumer Spending Surge',
    probability: 0.08,
    effects: { gdpGrowth: 0.3, cpiInflation: 0.15, sp500: 1.5 },
    duration: 1,
    headline: 'Retail Sales Beat Expectations'
  },
  {
    id: 'housing_cooldown',
    name: 'Housing Market Cooling',
    probability: 0.07,
    effects: { gdpGrowth: -0.15, cpiInflation: -0.1 },
    duration: 2,
    headline: 'Home Sales Decline as Rates Bite'
  }
];

// Rate change effect magnitudes (applied with lag)
const RATE_EFFECTS = {
  50:  { gdpGrowth: -0.25, cpiInflation: -0.15, pceInflation: -0.12, unemploymentRate: 0.15 },
  25:  { gdpGrowth: -0.12, cpiInflation: -0.08, pceInflation: -0.06, unemploymentRate: 0.08 },
  0:   { gdpGrowth: 0, cpiInflation: 0, pceInflation: 0, unemploymentRate: 0 },
  '-25': { gdpGrowth: 0.10, cpiInflation: 0.06, pceInflation: 0.05, unemploymentRate: -0.06 },
  '-50': { gdpGrowth: 0.20, cpiInflation: 0.12, pceInflation: 0.10, unemploymentRate: -0.12 }
};

/**
 * Create initial game state
 * @param {Object} startingData - Initial economic data from data/economicData.js
 * @returns {Object} Initial game state
 */
window.FedChair.Engine.createGameState = function(startingData) {
  return {
    // Meeting info
    meetingNumber: 1,
    meetingDate: MEETING_SCHEDULE[0].date,
    meetingDisplayDate: MEETING_SCHEDULE[0].displayDate,
    meetingSchedule: MEETING_SCHEDULE,
    totalMeetings: 8,

    // Rate tracking
    currentRate: startingData.currentRate || 3.625,
    rateHistory: [{
      meeting: 0,
      date: '2026-01-29',
      rate: startingData.currentRate || 3.625,
      decision: 0,
      hawkScore: 0
    }],

    // Pending lagged effects
    pendingEffects: [],

    // Economic indicators
    economy: {
      gdpGrowth: startingData.gdp?.current || 1.9,
      cpiInflation: parseFloat(startingData.inflation?.cpiHeadline?.value) || 2.4,
      pceInflation: parseFloat(startingData.inflation?.pceHeadline?.value) || 2.8,
      coreInflation: parseFloat(startingData.inflation?.cpiCore?.value) || 2.5,
      unemploymentRate: parseFloat(startingData.employment?.unemploymentU3?.value) || 4.3,
      payrollsChange: parseInt(startingData.employment?.nfp?.value?.replace(/[^0-9-]/g, '')) || 130,
      inflationMomentum: 0
    },

    // Market levels
    markets: {
      sp500: startingData.markets?.sp500?.value || 6836,
      vix: startingData.markets?.vix?.value || 20.6,
      treasury10y: startingData.markets?.treasury10y?.value || 4.07,
      treasury2y: startingData.markets?.treasury2y?.value || 3.76,
      dxy: startingData.markets?.dxy?.value || 96.88
    },

    // Player performance
    credibility: 100,
    credibilityHistory: [100],
    totalScore: 0,
    meetingScores: [],

    // Events and shocks
    activeShocks: [],
    pastEvents: [],
    recentHeadlines: [],

    // Game status
    gamePhase: 'playing', // 'playing' | 'ended'
    endResult: null,      // 'win' | 'lose' | 'draw'
    endReason: null,

    // Track what changed since last meeting
    lastMeetingEconomy: null,
    lastMeetingMarkets: null,
    economyChanges: null
  };
};

/**
 * Queue a rate decision's effects for future meetings
 * @param {Object} gameState - Current game state
 * @param {number} decision - Rate change in basis points
 * @param {number} hawkScore - Statement tone score
 */
window.FedChair.Engine.queueRateEffects = function(gameState, decision, hawkScore) {
  if (decision === 0) return;

  // Effects start at meeting +2, full effect at meeting +3
  const currentMeeting = gameState.meetingNumber;

  gameState.pendingEffects.push({
    meeting: currentMeeting,
    decision: decision,
    hawkScore: hawkScore,
    partialEffectMeeting: currentMeeting + 2,
    fullEffectMeeting: currentMeeting + 3,
    applied: false
  });
};

/**
 * Apply lagged rate effects that are now due
 * @param {Object} gameState - Current game state
 * @returns {Object} Changes applied
 */
window.FedChair.Engine.applyLaggedEffects = function(gameState) {
  const currentMeeting = gameState.meetingNumber;
  const changes = { gdpGrowth: 0, cpiInflation: 0, pceInflation: 0, unemploymentRate: 0 };

  gameState.pendingEffects.forEach(effect => {
    if (effect.applied) return;

    const effectKey = effect.decision.toString();
    const baseEffects = RATE_EFFECTS[effectKey] || RATE_EFFECTS['0'];

    if (currentMeeting >= effect.fullEffectMeeting) {
      // Full effect
      Object.keys(baseEffects).forEach(key => {
        changes[key] += baseEffects[key];
      });
      effect.applied = true;
    } else if (currentMeeting >= effect.partialEffectMeeting) {
      // Partial effect (50%)
      Object.keys(baseEffects).forEach(key => {
        changes[key] += baseEffects[key] * 0.5;
      });
    }
  });

  // Apply changes to economy
  Object.keys(changes).forEach(key => {
    if (gameState.economy[key] !== undefined) {
      gameState.economy[key] += changes[key];
    }
  });

  // Clean up fully applied effects
  gameState.pendingEffects = gameState.pendingEffects.filter(e => !e.applied);

  return changes;
};

/**
 * Evolve the economy naturally between meetings
 * @param {Object} gameState - Current game state
 * @returns {Object} Natural changes
 */
window.FedChair.Engine.evolveEconomy = function(gameState) {
  const economy = gameState.economy;
  const changes = {};

  // GDP: Mean reversion toward 2.0% with noise
  const gdpTarget = 2.0;
  const gdpReversion = (gdpTarget - economy.gdpGrowth) * 0.1;
  const gdpNoise = (Math.random() - 0.5) * 0.2;
  changes.gdpGrowth = gdpReversion + gdpNoise;
  economy.gdpGrowth += changes.gdpGrowth;

  // Inflation: Sticky with momentum
  const inflationTarget = 2.0;
  economy.inflationMomentum = economy.inflationMomentum * 0.7 + (Math.random() - 0.5) * 0.1;
  const inflationReversion = (inflationTarget - economy.cpiInflation) * 0.05;
  const inflationNoise = (Math.random() - 0.5) * 0.15 + economy.inflationMomentum;
  changes.cpiInflation = inflationReversion + inflationNoise;
  economy.cpiInflation += changes.cpiInflation;

  // PCE tracks CPI with slight lag
  changes.pceInflation = (economy.cpiInflation - economy.pceInflation) * 0.3 + (Math.random() - 0.5) * 0.1;
  economy.pceInflation += changes.pceInflation;

  // Core inflation is smoother
  changes.coreInflation = (economy.cpiInflation - economy.coreInflation) * 0.2 + (Math.random() - 0.5) * 0.08;
  economy.coreInflation += changes.coreInflation;

  // Unemployment: Inverse relationship with GDP, floors at 3.5%
  const unemploymentFromGDP = -economy.gdpGrowth * 0.15;
  const unemploymentNoise = (Math.random() - 0.5) * 0.15;
  changes.unemploymentRate = unemploymentFromGDP + unemploymentNoise;
  economy.unemploymentRate = Math.max(3.5, economy.unemploymentRate + changes.unemploymentRate);

  // Payrolls: Correlated with GDP
  const payrollsBase = economy.gdpGrowth * 50;
  const payrollsNoise = (Math.random() - 0.5) * 60;
  changes.payrollsChange = payrollsBase + payrollsNoise - economy.payrollsChange * 0.2;
  economy.payrollsChange = Math.round(Math.max(-200, Math.min(400, economy.payrollsChange + changes.payrollsChange)));

  return changes;
};

/**
 * Evolve markets between meetings
 * @param {Object} gameState - Current game state
 * @returns {Object} Market changes
 */
window.FedChair.Engine.evolveMarkets = function(gameState) {
  const markets = gameState.markets;
  const economy = gameState.economy;
  const changes = {};

  // S&P 500: Responds to GDP and inflation expectations
  const earningsEffect = economy.gdpGrowth * 0.5;
  const inflationDrag = (economy.cpiInflation - 2.0) * -0.3;
  const marketNoise = (Math.random() - 0.5) * 1.5;
  changes.sp500 = earningsEffect + inflationDrag + marketNoise;
  markets.sp500 = Math.round(markets.sp500 * (1 + changes.sp500 / 100));

  // VIX: Higher when uncertainty/stress
  const vixBase = 18 + Math.abs(economy.cpiInflation - 2.0) * 2 + Math.abs(economy.gdpGrowth - 2.0) * 1.5;
  const vixNoise = (Math.random() - 0.5) * 3;
  changes.vix = (vixBase - markets.vix) * 0.3 + vixNoise;
  markets.vix = Math.max(12, Math.min(40, markets.vix + changes.vix));

  // 10Y Treasury: Inflation expectations + growth
  const yield10yBase = 2.5 + economy.cpiInflation * 0.5 + economy.gdpGrowth * 0.2;
  const yield10yNoise = (Math.random() - 0.5) * 0.1;
  changes.treasury10y = (yield10yBase - markets.treasury10y) * 0.2 + yield10yNoise;
  markets.treasury10y = Math.max(2.0, Math.min(6.0, markets.treasury10y + changes.treasury10y));

  // 2Y Treasury: More sensitive to Fed policy expectations
  const yield2yBase = gameState.currentRate * 0.9 + economy.cpiInflation * 0.1;
  const yield2yNoise = (Math.random() - 0.5) * 0.08;
  changes.treasury2y = (yield2yBase - markets.treasury2y) * 0.25 + yield2yNoise;
  markets.treasury2y = Math.max(1.5, Math.min(5.5, markets.treasury2y + changes.treasury2y));

  // DXY: Rate differential and growth
  const dxyBase = 95 + (gameState.currentRate - 3.5) * 2 + economy.gdpGrowth * 0.5;
  const dxyNoise = (Math.random() - 0.5) * 0.8;
  changes.dxy = (dxyBase - markets.dxy) * 0.15 + dxyNoise;
  markets.dxy = Math.max(85, Math.min(110, markets.dxy + changes.dxy));

  return changes;
};

/**
 * Roll for random economic shocks
 * @param {Object} gameState - Current game state
 * @returns {Array} New shocks that occurred
 */
window.FedChair.Engine.rollForShocks = function(gameState) {
  const newShocks = [];
  const activeShockIds = gameState.activeShocks.map(s => s.id);

  SHOCK_TYPES.forEach(shockType => {
    // Don't duplicate active shocks
    if (activeShockIds.includes(shockType.id)) return;

    // Roll for each shock type
    if (Math.random() < shockType.probability) {
      const shock = {
        ...shockType,
        startMeeting: gameState.meetingNumber,
        endMeeting: gameState.meetingNumber + shockType.duration
      };
      newShocks.push(shock);
      gameState.activeShocks.push(shock);
      gameState.pastEvents.push({
        meeting: gameState.meetingNumber,
        type: 'shock',
        shock: shockType.id,
        headline: shockType.headline
      });
    }
  });

  return newShocks;
};

/**
 * Apply active shock effects to economy and markets
 * @param {Object} gameState - Current game state
 */
window.FedChair.Engine.applyShockEffects = function(gameState) {
  gameState.activeShocks.forEach(shock => {
    Object.entries(shock.effects).forEach(([key, value]) => {
      if (gameState.economy[key] !== undefined) {
        gameState.economy[key] += value;
      } else if (gameState.markets[key] !== undefined) {
        if (key === 'sp500') {
          gameState.markets[key] = gameState.markets[key] * (1 + value / 100);
        } else {
          gameState.markets[key] += value;
        }
      }
    });
  });

  // Expire old shocks
  gameState.activeShocks = gameState.activeShocks.filter(
    shock => shock.endMeeting > gameState.meetingNumber
  );
};

/**
 * Generate headlines explaining what changed
 * @param {Object} gameState - Current game state
 * @param {Object} economyChanges - Changes to economic indicators
 * @param {Array} newShocks - New shocks that occurred
 * @returns {Array} Headlines
 */
window.FedChair.Engine.generateHeadlines = function(gameState, economyChanges, newShocks) {
  const headlines = [];

  // Add shock headlines
  newShocks.forEach(shock => {
    headlines.push({ headline: shock.headline, source: 'Reuters', type: 'shock' });
  });

  // Generate headlines based on significant changes
  const economy = gameState.economy;

  if (economyChanges.cpiInflation > 0.2) {
    headlines.push({ headline: `Inflation Ticks Up to ${economy.cpiInflation.toFixed(1)}%`, source: 'BLS', type: 'data' });
  } else if (economyChanges.cpiInflation < -0.2) {
    headlines.push({ headline: `Inflation Cools to ${economy.cpiInflation.toFixed(1)}%`, source: 'BLS', type: 'data' });
  }

  if (economyChanges.gdpGrowth > 0.2) {
    headlines.push({ headline: `GDP Growth Accelerates to ${economy.gdpGrowth.toFixed(1)}%`, source: 'BEA', type: 'data' });
  } else if (economyChanges.gdpGrowth < -0.2) {
    headlines.push({ headline: `Economic Growth Slows to ${economy.gdpGrowth.toFixed(1)}%`, source: 'BEA', type: 'data' });
  }

  if (economy.payrollsChange > 200) {
    headlines.push({ headline: `Jobs Report Blows Past Expectations: +${economy.payrollsChange}K`, source: 'BLS', type: 'data' });
  } else if (economy.payrollsChange < 50) {
    headlines.push({ headline: `Hiring Slows: Only ${economy.payrollsChange}K Jobs Added`, source: 'BLS', type: 'data' });
  }

  if (economyChanges.unemploymentRate > 0.2) {
    headlines.push({ headline: `Unemployment Rises to ${economy.unemploymentRate.toFixed(1)}%`, source: 'BLS', type: 'data' });
  } else if (economyChanges.unemploymentRate < -0.2) {
    headlines.push({ headline: `Unemployment Falls to ${economy.unemploymentRate.toFixed(1)}%`, source: 'BLS', type: 'data' });
  }

  // Market headlines
  const markets = gameState.markets;
  if (Math.abs(gameState.lastMeetingMarkets?.sp500 - markets.sp500) / gameState.lastMeetingMarkets?.sp500 > 0.03) {
    const direction = markets.sp500 > gameState.lastMeetingMarkets?.sp500 ? 'Rallies' : 'Slides';
    headlines.push({ headline: `S&P 500 ${direction} to ${markets.sp500.toLocaleString()}`, source: 'CNBC', type: 'market' });
  }

  // Always have at least one headline
  if (headlines.length === 0) {
    headlines.push({ headline: 'Markets Await Fed Decision', source: 'Bloomberg', type: 'general' });
  }

  return headlines.slice(0, 4); // Max 4 headlines
};

/**
 * Calculate what the market expects the Fed to do
 * @param {Object} gameState - Current game state
 * @returns {number} Expected rate change in basis points
 */
window.FedChair.Engine.calculateMarketExpectations = function(gameState) {
  const economy = gameState.economy;

  // Base expectation from Taylor Rule-like logic
  let expectedMove = 0;

  // Inflation above target suggests hikes
  if (economy.pceInflation > 3.0) {
    expectedMove += 25;
  } else if (economy.pceInflation > 2.5) {
    expectedMove += 12.5;
  } else if (economy.pceInflation < 1.5) {
    expectedMove -= 25;
  }

  // Weak growth/high unemployment suggests cuts
  if (economy.gdpGrowth < 1.0) {
    expectedMove -= 25;
  } else if (economy.unemploymentRate > 5.0) {
    expectedMove -= 12.5;
  }

  // Recent Fed actions influence expectations
  const recentDecisions = gameState.rateHistory.slice(-3);
  const avgRecentHawkScore = recentDecisions.reduce((sum, d) => sum + d.hawkScore, 0) / recentDecisions.length;
  expectedMove += avgRecentHawkScore * 5;

  // Round to nearest 25
  return Math.round(expectedMove / 25) * 25;
};

/**
 * Update player credibility based on decision
 * @param {Object} gameState - Current game state
 * @param {number} decision - Rate change in basis points
 * @param {number} hawkScore - Statement tone score
 * @param {Object} marketReaction - Market reaction data
 * @returns {number} New credibility score
 */
window.FedChair.Engine.updateCredibility = function(gameState, decision, hawkScore, marketReaction) {
  let credibilityChange = 0;

  // Consistency: Does action match rhetoric?
  const actionTone = decision < 0 ? -2 : decision > 0 ? 2 : 0;
  const toneMismatch = Math.abs(hawkScore - actionTone);
  if (toneMismatch > 3) {
    credibilityChange -= 8; // Severe mismatch
  } else if (toneMismatch > 1) {
    credibilityChange -= 3; // Mild mismatch
  } else {
    credibilityChange += 2; // Consistent
  }

  // Market stability: Avoid big surprises
  if (Math.abs(marketReaction.sp500.change) > 2) {
    credibilityChange -= 5;
  } else if (Math.abs(marketReaction.sp500.change) < 0.5) {
    credibilityChange += 2;
  }

  // Appropriate response to conditions
  const economy = gameState.economy;
  if (economy.pceInflation > 3.0 && decision < 0) {
    credibilityChange -= 5; // Cutting with high inflation
  } else if (economy.pceInflation < 2.0 && decision > 0) {
    credibilityChange -= 3; // Hiking with low inflation
  } else if (economy.gdpGrowth < 0.5 && decision > 0) {
    credibilityChange -= 4; // Hiking into weakness
  }

  // Apply change with bounds
  gameState.credibility = Math.max(0, Math.min(100, gameState.credibility + credibilityChange));
  gameState.credibilityHistory.push(gameState.credibility);

  return gameState.credibility;
};

/**
 * Check win/lose conditions
 * @param {Object} gameState - Current game state
 * @returns {Object|null} End result if game should end
 */
window.FedChair.Engine.checkWinLoseConditions = function(gameState) {
  const economy = gameState.economy;

  // Immediate lose conditions (can happen any meeting)
  if (gameState.credibility < 20) {
    return { result: 'lose', reason: 'credibility_collapse', message: 'Your credibility has collapsed. Markets no longer trust Fed guidance.' };
  }

  // Track recession
  const recentGDP = gameState.rateHistory.slice(-2).map(r => {
    // Approximate GDP at that meeting (simplified)
    return economy.gdpGrowth;
  });
  if (economy.gdpGrowth < -0.5 && gameState.meetingNumber > 2) {
    // Check if this is 2+ meetings of negative
    const previousMeetingGDP = gameState.lastMeetingEconomy?.gdpGrowth || economy.gdpGrowth;
    if (previousMeetingGDP < 0) {
      return { result: 'lose', reason: 'recession', message: 'The economy has entered a recession.' };
    }
  }

  // Only check final conditions at end of game
  if (gameState.meetingNumber < gameState.totalMeetings) {
    return null;
  }

  // Final meeting checks
  // Stagflation check
  if (economy.pceInflation > 3.5 && economy.unemploymentRate > 5.5) {
    return { result: 'lose', reason: 'stagflation', message: 'Stagflation: High inflation combined with high unemployment.' };
  }

  // Runaway inflation
  if (economy.pceInflation > 4.0) {
    return { result: 'lose', reason: 'runaway_inflation', message: 'Inflation has spiraled out of control.' };
  }

  // Win conditions (soft landing)
  const softLanding =
    economy.pceInflation >= 1.5 && economy.pceInflation <= 3.0 &&
    economy.gdpGrowth > 0 &&
    economy.unemploymentRate < 6 &&
    gameState.credibility > 50;

  if (softLanding) {
    return { result: 'win', reason: 'soft_landing', message: 'Congratulations! You achieved a soft landing.' };
  }

  // Draw (muddling through)
  return { result: 'draw', reason: 'muddle_through', message: 'You avoided disaster, but the landing was bumpy.' };
};

/**
 * Record a decision and advance to next meeting
 * @param {Object} gameState - Current game state
 * @param {number} decision - Rate change in basis points
 * @param {number} hawkScore - Statement tone score
 * @param {Object} marketReaction - Market reaction data
 * @param {number} meetingScore - Score for this meeting
 * @returns {Object} Updated state and transition info
 */
window.FedChair.Engine.advanceToNextMeeting = function(gameState, decision, hawkScore, marketReaction, meetingScore) {
  // Store current state for comparison
  gameState.lastMeetingEconomy = { ...gameState.economy };
  gameState.lastMeetingMarkets = { ...gameState.markets };

  // Record the decision
  gameState.rateHistory.push({
    meeting: gameState.meetingNumber,
    date: gameState.meetingDate,
    rate: gameState.currentRate + decision / 100,
    decision: decision,
    hawkScore: hawkScore
  });

  // Update current rate
  gameState.currentRate += decision / 100;

  // Queue lagged effects
  window.FedChair.Engine.queueRateEffects(gameState, decision, hawkScore);

  // Update credibility
  window.FedChair.Engine.updateCredibility(gameState, decision, hawkScore, marketReaction);

  // Record score
  gameState.meetingScores.push(meetingScore);
  gameState.totalScore += meetingScore;

  // Apply immediate market reaction to market levels
  gameState.markets.sp500 = marketReaction.sp500.value;
  gameState.markets.vix = marketReaction.vix.value;
  gameState.markets.treasury10y = marketReaction.treasury10y.value;
  gameState.markets.treasury2y = marketReaction.treasury2y.value;
  gameState.markets.dxy = marketReaction.dxy.value;

  // Check for early end conditions
  const earlyEnd = window.FedChair.Engine.checkWinLoseConditions(gameState);
  if (earlyEnd && earlyEnd.result === 'lose') {
    gameState.gamePhase = 'ended';
    gameState.endResult = earlyEnd.result;
    gameState.endReason = earlyEnd.reason;
    return {
      gameState,
      ended: true,
      endResult: earlyEnd
    };
  }

  // Advance meeting number
  gameState.meetingNumber++;

  // Check if game is over
  if (gameState.meetingNumber > gameState.totalMeetings) {
    const endResult = window.FedChair.Engine.checkWinLoseConditions(gameState);
    gameState.gamePhase = 'ended';
    gameState.endResult = endResult.result;
    gameState.endReason = endResult.reason;
    return {
      gameState,
      ended: true,
      endResult
    };
  }

  // Update meeting date
  const nextMeeting = MEETING_SCHEDULE[gameState.meetingNumber - 1];
  gameState.meetingDate = nextMeeting.date;
  gameState.meetingDisplayDate = nextMeeting.displayDate;

  // Apply lagged rate effects
  const laggedChanges = window.FedChair.Engine.applyLaggedEffects(gameState);

  // Evolve economy naturally
  const naturalChanges = window.FedChair.Engine.evolveEconomy(gameState);

  // Roll for shocks
  const newShocks = window.FedChair.Engine.rollForShocks(gameState);

  // Apply shock effects
  window.FedChair.Engine.applyShockEffects(gameState);

  // Evolve markets
  const marketChanges = window.FedChair.Engine.evolveMarkets(gameState);

  // Combine changes for reporting
  const economyChanges = {};
  ['gdpGrowth', 'cpiInflation', 'pceInflation', 'unemploymentRate'].forEach(key => {
    economyChanges[key] = (laggedChanges[key] || 0) + (naturalChanges[key] || 0);
  });
  gameState.economyChanges = economyChanges;

  // Generate headlines
  gameState.recentHeadlines = window.FedChair.Engine.generateHeadlines(gameState, economyChanges, newShocks);

  // Update market expectations
  gameState.marketExpects = window.FedChair.Engine.calculateMarketExpectations(gameState);

  return {
    gameState,
    ended: false,
    economyChanges,
    newShocks,
    headlines: gameState.recentHeadlines
  };
};

/**
 * Format rate as target range string
 * @param {number} rate - Rate midpoint
 * @returns {string} Formatted range
 */
window.FedChair.Engine.formatRateRange = function(rate) {
  return `${(rate - 0.125).toFixed(2)}% - ${(rate + 0.125).toFixed(2)}%`;
};

/**
 * Convert game state to economic data format for components
 * @param {Object} gameState - Current game state
 * @returns {Object} Economic data in component format
 */
window.FedChair.Engine.gameStateToEconomicData = function(gameState) {
  const formatTrend = (current, previous) => {
    if (!previous) return 'stable';
    const diff = current - previous;
    if (Math.abs(diff) < 0.1) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  const prevEconomy = gameState.lastMeetingEconomy || gameState.economy;

  return {
    fedFundsRate: {
      target: window.FedChair.Engine.formatRateRange(gameState.currentRate),
      effective: `${(gameState.currentRate - 0.01).toFixed(2)}%`,
      change: gameState.rateHistory.length > 1 ?
        (gameState.rateHistory[gameState.rateHistory.length - 1].decision === 0 ? 'HOLD' :
         `${gameState.rateHistory[gameState.rateHistory.length - 1].decision > 0 ? '+' : ''}${gameState.rateHistory[gameState.rateHistory.length - 1].decision} bps`) : 'HOLD',
      lastMeeting: gameState.meetingNumber > 1 ? MEETING_SCHEDULE[gameState.meetingNumber - 2]?.displayDate : 'Jan 28, 2026'
    },
    inflation: {
      cpiHeadline: { value: `${gameState.economy.cpiInflation.toFixed(1)}%`, trend: formatTrend(gameState.economy.cpiInflation, prevEconomy.cpiInflation), label: 'CPI' },
      cpiCore: { value: `${gameState.economy.coreInflation.toFixed(1)}%`, trend: formatTrend(gameState.economy.coreInflation, prevEconomy.coreInflation), label: 'Core CPI' },
      pceHeadline: { value: `${gameState.economy.pceInflation.toFixed(1)}%`, trend: formatTrend(gameState.economy.pceInflation, prevEconomy.pceInflation), label: 'PCE' },
      pceCore: { value: `${gameState.economy.pceInflation.toFixed(1)}%`, trend: formatTrend(gameState.economy.pceInflation, prevEconomy.pceInflation), label: 'Core PCE' }
    },
    employment: {
      unemploymentU3: { value: `${gameState.economy.unemploymentRate.toFixed(1)}%`, trend: formatTrend(gameState.economy.unemploymentRate, prevEconomy.unemploymentRate), label: 'Unemployment' },
      unemploymentU6: { value: `${(gameState.economy.unemploymentRate * 1.8).toFixed(1)}%`, trend: 'stable', label: 'U-6' },
      lfpr: { value: '62.3%', trend: 'stable', label: 'LFPR' },
      nfp: { value: `${gameState.economy.payrollsChange >= 0 ? '+' : ''}${gameState.economy.payrollsChange}K`, trend: formatTrend(gameState.economy.payrollsChange, prevEconomy.payrollsChange), label: 'Payrolls' }
    },
    markets: {
      sp500: { value: Math.round(gameState.markets.sp500), display: Math.round(gameState.markets.sp500).toLocaleString(), label: 'S&P 500' },
      vix: { value: gameState.markets.vix, display: gameState.markets.vix.toFixed(2), label: 'VIX' },
      treasury10y: { value: gameState.markets.treasury10y, display: `${gameState.markets.treasury10y.toFixed(2)}%`, label: '10Y' },
      treasury2y: { value: gameState.markets.treasury2y, display: `${gameState.markets.treasury2y.toFixed(2)}%`, label: '2Y' },
      yieldSpread: { value: `${((gameState.markets.treasury10y - gameState.markets.treasury2y) * 100).toFixed(0)} bps`, label: '2s/10s' },
      dxy: { value: gameState.markets.dxy, display: gameState.markets.dxy.toFixed(2), label: 'DXY' }
    },
    gdp: { current: gameState.economy.gdpGrowth, forecast: gameState.economy.gdpGrowth - 0.1 },
    unemployment: { current: gameState.economy.unemploymentRate, forecast: gameState.economy.unemploymentRate + 0.2 },
    inflationForecast: { current: gameState.economy.pceInflation, forecast: gameState.economy.pceInflation - 0.3 },
    nextMeeting: gameState.meetingDisplayDate,
    marketExpects: gameState.marketExpects || 0,
    currentRate: gameState.currentRate
  };
};

// Export constants for use elsewhere
window.FedChair.Engine.MEETING_SCHEDULE = MEETING_SCHEDULE;
window.FedChair.Engine.SHOCK_TYPES = SHOCK_TYPES;
