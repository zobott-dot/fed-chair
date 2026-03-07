// Narrative Generator Engine
// Track-record headlines, tenure summaries, and end-game assessment

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

(function() {
  'use strict';

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ── Narrative Headlines (starting meeting 3) ───────────────────────────

  const NARRATIVE_HEADLINES = {
    inflation_rising: [
      'Inflation Ticks Up for Third Straight Month Under Chair\'s Watch',
      'Critics Question Whether Fed Is Behind the Curve on Inflation',
      'Bond Vigilantes Return as Markets Doubt Fed\'s Inflation Resolve',
      'Price Pressures Persist Despite Fed\'s Assurances'
    ],
    inflation_falling: [
      'Disinflation Gains Traction as Fed Policy Takes Hold',
      'Chair\'s Patient Approach Pays Off as Prices Ease',
      'Inflation Retreat Bolsters Case for Fed\'s Strategy'
    ],
    unemployment_rising: [
      'Labor Market Weakening Raises Recession Fears',
      'Fed\'s Tight Policy Faces Scrutiny as Job Losses Mount',
      'Economists Debate Whether Fed Overtightened',
      'Help Wanted Signs Disappear as Hiring Freezes Spread'
    ],
    unemployment_falling: [
      'Jobs Market Defies Skeptics, Hiring Remains Solid',
      'Labor Market Resilience Gives Fed Room to Maneuver'
    ],
    soft_landing: [
      'Goldilocks Economy? Inflation Easing While Jobs Hold Steady',
      'Markets Rally as Fed Navigates Narrow Path Successfully',
      'Chair Earns Praise for Measured Approach to Normalization',
      'Soft Landing Hopes Rise as Data Hits Sweet Spot'
    ],
    credibility_low: [
      'Fed Credibility Gap Widens as Mixed Signals Confuse Markets',
      'Wall Street Analysts: Fed Communication Has Broken Down',
      'VIX Surges as Markets Can\'t Read the Fed',
      'Bond Market Mutiny: Yields Move Against Fed Guidance'
    ],
    credibility_high: [
      'Markets Take Fed at Its Word, Volatility Drops',
      'Chair\'s Consistent Messaging Wins Market Confidence'
    ],
    hawkish_stance: [
      'Fed Chair\'s Hawkish Resolve Tests Market Patience',
      'Wall Street to Fed: How Much Tightening Is Enough?',
      'Rate Hike Campaign Draws Comparisons to Volcker Era'
    ],
    dovish_stance: [
      'Critics Warn Fed Is Too Easy on Inflation',
      'Dovish Fed Fuels Asset Rally, But at What Cost?',
      'Markets Cheer Easing, Economists Sound Alarm on Prices'
    ],
    warsh_transition: [
      'New Chair Warsh Inherits Complex Economic Landscape',
      'Wall Street Sizes Up Warsh\'s Fed: What Changes?',
      'Warsh\'s First Meeting: Markets Watch for Policy Shift'
    ]
  };

  /**
   * Generate 1-2 narrative headlines based on player track record
   * Called from generateHeadlines in simulation.js, starting meeting 3
   */
  window.FedChair.Engine.generateNarrativeHeadlines = function(gameState) {
    if (gameState.meetingNumber < 3) return [];

    const headlines = [];
    const economy = gameState.economy;
    const prev = gameState.lastMeetingEconomy;
    const stance = gameState.cumulativePolicyStance || 0;

    // Check inflation trend (over recent meetings)
    const inflationTrend = prev ? economy.pceInflation - prev.pceInflation : 0;
    if (economy.pceInflation > 2.8 && inflationTrend > 0) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.inflation_rising), source: 'Editorial', type: 'narrative' });
    } else if (economy.pceInflation < 2.3 && inflationTrend < 0) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.inflation_falling), source: 'Editorial', type: 'narrative' });
    }

    // Check unemployment trend
    if (economy.unemploymentRate > 5.0) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.unemployment_rising), source: 'Editorial', type: 'narrative' });
    } else if (economy.unemploymentRate < 4.0 && prev && economy.unemploymentRate < prev.unemploymentRate) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.unemployment_falling), source: 'Editorial', type: 'narrative' });
    }

    // Soft landing conditions
    if (economy.pceInflation >= 1.8 && economy.pceInflation <= 2.5 &&
        economy.gdpGrowth > 1.0 && economy.unemploymentRate < 5.0 &&
        gameState.credibility > 65) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.soft_landing), source: 'Editorial', type: 'narrative' });
    }

    // Credibility commentary
    if (gameState.credibility < 40) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.credibility_low), source: 'Editorial', type: 'narrative' });
    } else if (gameState.credibility > 85 && gameState.meetingNumber >= 4) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.credibility_high), source: 'Editorial', type: 'narrative' });
    }

    // Policy stance commentary (only if clearly directional)
    if (stance > 3 && headlines.length < 2) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.hawkish_stance), source: 'Editorial', type: 'narrative' });
    } else if (stance < -3 && headlines.length < 2) {
      headlines.push({ headline: pick(NARRATIVE_HEADLINES.dovish_stance), source: 'Editorial', type: 'narrative' });
    }

    // Warsh transition headlines (meeting 3 only)
    if (gameState.meetingNumber === 3) {
      headlines.unshift({ headline: pick(NARRATIVE_HEADLINES.warsh_transition), source: 'Reuters', type: 'narrative' });
    }

    // Return at most 2 narrative headlines
    return headlines.slice(0, 2);
  };

  // ── End-of-Campaign Assessment ─────────────────────────────────────────

  /**
   * Calculate comprehensive end-of-campaign grade and summary
   * @param {Object} gameState - Final game state
   * @returns {Object} Assessment with grade, summary, stats, comparison
   */
  window.FedChair.Engine.calculateEndOfCampaignAssessment = function(gameState) {
    const economy = gameState.economy;
    const history = gameState.meetingHistory || [];
    const startingEconomy = gameState.economyHistory.length > 0 ? gameState.economyHistory[0] : null;

    // ── Component scores (0-100 each) ──

    // 1. Inflation management (30%)
    let inflationScore = 100;
    const pce = economy.pceInflation;
    if (pce >= 1.8 && pce <= 2.2) inflationScore = 100;
    else if (pce >= 1.5 && pce <= 2.5) inflationScore = 85;
    else if (pce >= 1.0 && pce <= 3.0) inflationScore = 65;
    else if (pce >= 0.5 && pce <= 3.5) inflationScore = 40;
    else inflationScore = 15;
    // Bonus for downward trend from elevated starting point
    if (startingEconomy && pce < startingEconomy.pceInflation && startingEconomy.pceInflation > 2.5) {
      inflationScore = Math.min(100, inflationScore + 10);
    }

    // 2. Employment stability (25%)
    let employmentScore = 100;
    const unemp = economy.unemploymentRate;
    if (unemp < 4.5) employmentScore = 100;
    else if (unemp < 5.0) employmentScore = 80;
    else if (unemp < 5.5) employmentScore = 60;
    else if (unemp < 6.0) employmentScore = 40;
    else employmentScore = 20;

    // 3. Market stability (15%)
    let marketScore = 100;
    const avgVix = history.length > 0
      ? history.reduce((s, m) => s + (m.vix || 20), 0) / history.length
      : 20;
    if (avgVix < 18) marketScore = 100;
    else if (avgVix < 22) marketScore = 80;
    else if (avgVix < 28) marketScore = 60;
    else if (avgVix < 35) marketScore = 35;
    else marketScore = 15;

    // 4. Credibility maintenance (15%)
    let credibilityScore = gameState.credibility;

    // 5. Projection accuracy (10%)
    let projectionScore = 70; // default if no dots
    const dotHistory = gameState.dotHistory || [];
    if (dotHistory.length > 0) {
      let totalDeviation = 0;
      let dotCount = 0;
      for (const dot of dotHistory) {
        // Find the rate at the meeting the dot projected
        const rateEntry = gameState.rateHistory.find(r => r.meeting === dot.meeting);
        if (rateEntry) {
          totalDeviation += Math.abs(rateEntry.rate - dot.projectedRate);
          dotCount++;
        }
      }
      if (dotCount > 0) {
        const avgDev = totalDeviation / dotCount;
        if (avgDev < 0.125) projectionScore = 100;
        else if (avgDev < 0.25) projectionScore = 85;
        else if (avgDev < 0.5) projectionScore = 65;
        else projectionScore = 35;
      }
    }

    // 6. Communication quality (5%)
    let communicationScore = 70; // default
    if (history.length > 0) {
      const avgCredChange = history.reduce((s, m) => s + (m.pressCredibilityChange || 0), 0) / history.length;
      if (avgCredChange > 2) communicationScore = 95;
      else if (avgCredChange > 0) communicationScore = 80;
      else if (avgCredChange > -2) communicationScore = 60;
      else communicationScore = 30;
    }

    // ── Weighted overall score ──
    const overallScore = Math.round(
      inflationScore * 0.30 +
      employmentScore * 0.25 +
      marketScore * 0.15 +
      credibilityScore * 0.15 +
      projectionScore * 0.10 +
      communicationScore * 0.05
    );

    // ── Letter grade ──
    let grade, gradeColor, gradeText;
    if (overallScore >= 95) { grade = 'A+'; gradeColor = '#22c55e'; gradeText = 'Masterful'; }
    else if (overallScore >= 90) { grade = 'A'; gradeColor = '#22c55e'; gradeText = 'Excellent'; }
    else if (overallScore >= 85) { grade = 'A-'; gradeColor = '#22c55e'; gradeText = 'Very Good'; }
    else if (overallScore >= 80) { grade = 'B+'; gradeColor = '#84cc16'; gradeText = 'Good'; }
    else if (overallScore >= 75) { grade = 'B'; gradeColor = '#84cc16'; gradeText = 'Solid'; }
    else if (overallScore >= 70) { grade = 'B-'; gradeColor = '#84cc16'; gradeText = 'Decent'; }
    else if (overallScore >= 65) { grade = 'C+'; gradeColor = '#eab308'; gradeText = 'Mixed'; }
    else if (overallScore >= 60) { grade = 'C'; gradeColor = '#eab308'; gradeText = 'Adequate'; }
    else if (overallScore >= 55) { grade = 'C-'; gradeColor = '#eab308'; gradeText = 'Below Average'; }
    else if (overallScore >= 50) { grade = 'D+'; gradeColor = '#f97316'; gradeText = 'Poor'; }
    else if (overallScore >= 45) { grade = 'D'; gradeColor = '#f97316'; gradeText = 'Weak'; }
    else { grade = 'F'; gradeColor = '#ef4444'; gradeText = 'Failed'; }

    // ── Tenure summary (2-3 sentences) ──
    const summary = generateTenureSummary(gameState, {
      inflationScore, employmentScore, marketScore,
      credibilityScore, projectionScore, overallScore
    });

    // ── Key statistics ──
    const startRate = gameState.rateHistory.length > 0 ? gameState.rateHistory[0].rate : gameState.currentRate;
    const startSP = startingEconomy ? (gameState.economyHistory[0].sp500 || 0) : 0;
    const spChange = startSP > 0 ? ((gameState.markets.sp500 - startSP) / startSP * 100) : 0;

    const stats = {
      startInflation: startingEconomy ? startingEconomy.pceInflation : pce,
      endInflation: pce,
      startUnemployment: startingEconomy ? startingEconomy.unemploymentRate : unemp,
      endUnemployment: unemp,
      startRate: startRate,
      endRate: gameState.currentRate,
      spChange: spChange,
      finalCredibility: gameState.credibility,
      meetingsPlayed: gameState.meetingNumber - 1,
      totalDissents: history.reduce((s, m) => s + (m.dissents || 0), 0),
      biggestMarketMove: history.length > 0
        ? Math.max(...history.map(m => Math.abs(m.spChange || 0)))
        : 0
    };

    // ── Historical comparison ──
    const comparison = generateHistoricalComparison(overallScore, gameState);

    return {
      overallScore,
      grade,
      gradeColor,
      gradeText,
      components: {
        inflation: { score: inflationScore, weight: 30, label: 'Inflation Management' },
        employment: { score: employmentScore, weight: 25, label: 'Employment Stability' },
        markets: { score: marketScore, weight: 15, label: 'Market Stability' },
        credibility: { score: credibilityScore, weight: 15, label: 'Credibility' },
        projections: { score: projectionScore, weight: 10, label: 'Projection Accuracy' },
        communication: { score: communicationScore, weight: 5, label: 'Communication' }
      },
      summary,
      stats,
      comparison
    };
  };

  function generateTenureSummary(gameState, scores) {
    const economy = gameState.economy;
    const start = gameState.economyHistory.length > 0 ? gameState.economyHistory[0] : null;
    const parts = [];

    // Inflation narrative
    if (start) {
      const inflDelta = economy.pceInflation - start.pceInflation;
      if (inflDelta < -0.5) {
        parts.push(`Under your leadership, inflation fell from ${start.pceInflation.toFixed(1)}% to ${economy.pceInflation.toFixed(1)}%`);
      } else if (inflDelta > 0.5) {
        parts.push(`Inflation rose from ${start.pceInflation.toFixed(1)}% to ${economy.pceInflation.toFixed(1)}% during your tenure`);
      } else {
        parts.push(`Inflation held roughly steady near ${economy.pceInflation.toFixed(1)}%`);
      }

      // Employment narrative
      const unempDelta = economy.unemploymentRate - start.unemploymentRate;
      if (Math.abs(unempDelta) < 0.3) {
        parts[0] += ` while unemployment held steady at ${economy.unemploymentRate.toFixed(1)}%.`;
      } else if (unempDelta > 0) {
        parts[0] += `, though unemployment rose to ${economy.unemploymentRate.toFixed(1)}%.`;
      } else {
        parts[0] += ` as the labor market strengthened to ${economy.unemploymentRate.toFixed(1)}% unemployment.`;
      }
    } else {
      parts.push(`The economy ended with ${economy.pceInflation.toFixed(1)}% inflation and ${economy.unemploymentRate.toFixed(1)}% unemployment.`);
    }

    // Credibility/communication narrative
    if (gameState.credibility > 80) {
      parts.push('Your consistent communication and follow-through earned high credibility with markets.');
    } else if (gameState.credibility > 50) {
      parts.push('Markets generally trusted your guidance, though some missteps tested their confidence.');
    } else {
      parts.push('Mixed messaging and policy reversals eroded market confidence in Fed guidance.');
    }

    return parts.join(' ');
  }

  function generateHistoricalComparison(score, gameState) {
    // Simulated percentile
    const percentile = Math.min(99, Math.max(1, Math.round(score * 0.95 + (Math.random() - 0.5) * 10)));

    let chairComparison;
    if (score >= 90) {
      chairComparison = 'Your tenure rivals Greenspan\'s golden years — steady hand, strong credibility.';
    } else if (score >= 75) {
      chairComparison = 'A solid performance comparable to Yellen\'s careful normalization approach.';
    } else if (score >= 60) {
      chairComparison = 'Like Bernanke during the recovery — navigating turbulence with mixed results.';
    } else if (score >= 45) {
      chairComparison = 'Reminiscent of Burns in the 1970s — policy actions that seemed right at the time but fell short.';
    } else {
      chairComparison = 'A cautionary tale. History will debate where things went wrong.';
    }

    return {
      percentile,
      chairComparison
    };
  }

})();
