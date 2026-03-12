// Scoring Engine - Evaluates player performance

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

/**
 * Get grade info for a score
 * @param {number} score - Score from 0-100
 * @returns {Object} Grade info with letter, color, and text
 */
window.FedChair.Engine.getGrade = function(score) {
  if (score >= 90) return { grade: 'A', color: '#22c55e', text: 'Excellent' };
  if (score >= 80) return { grade: 'B', color: '#84cc16', text: 'Good' };
  if (score >= 70) return { grade: 'C', color: '#eab308', text: 'Adequate' };
  if (score >= 60) return { grade: 'D', color: '#f97316', text: 'Poor' };
  return { grade: 'F', color: '#ef4444', text: 'Failing' };
};

/**
 * Calculate player score based on market reaction and decision consistency
 * @param {Object} params
 * @param {Object} params.reaction - Market reaction data
 * @param {number} params.rateDecision - Rate change in basis points
 * @param {number} params.hawkScore - Statement tone score
 * @returns {Object} Score breakdown
 */
window.FedChair.Engine.calculateScore = function({ reaction, rateDecision, hawkScore }) {
  const getGrade = window.FedChair.Engine.getGrade;

  // ── Market Stability ──
  let marketStability = 100;
  let marketFeedback = '';
  const absSpChange = Math.abs(reaction.sp500.change);
  if (absSpChange > 2) {
    marketStability -= 40;
    marketFeedback = `Markets reacted sharply — the S&P moved ${reaction.sp500.change > 0 ? '+' : ''}${reaction.sp500.change.toFixed(1)}%, signaling your decision caught traders off guard.`;
  } else if (absSpChange > 1) {
    marketStability -= 20;
    marketFeedback = `A notable market move of ${reaction.sp500.change > 0 ? '+' : ''}${reaction.sp500.change.toFixed(1)}% in the S&P suggests your decision wasn't fully priced in.`;
  } else if (absSpChange > 0.5) {
    marketStability -= 10;
    marketFeedback = `Markets adjusted modestly — a measured reaction that suggests your decision was largely anticipated.`;
  } else {
    marketFeedback = `Markets barely moved — your decision was well-telegraphed and fully priced in. This is what the Fed aims for.`;
  }

  // ── Credibility ──
  let credibility = 100;
  let credibilityFeedback = '';
  const actionTone = rateDecision < 0 ? -2 : rateDecision > 0 ? 2 : 0;
  const toneMismatch = Math.abs(hawkScore - actionTone);
  if (toneMismatch > 4) {
    credibility -= 40;
    const actionWord = rateDecision > 0 ? 'hiked' : rateDecision < 0 ? 'cut' : 'held';
    credibilityFeedback = `Your statement tone clashed with your rate action — you ${actionWord} rates but your language pointed the other way. Markets hate mixed signals.`;
  } else if (toneMismatch > 2) {
    credibility -= 20;
    credibilityFeedback = `Some tension between your words and your action — your statement leaned ${hawkScore > 0 ? 'hawkish' : 'dovish'} relative to a ${rateDecision > 0 ? 'hike' : rateDecision < 0 ? 'cut' : 'hold'}. Analysts will parse the contradiction.`;
  } else {
    credibilityFeedback = `Your statement tone aligned well with your rate decision — consistent messaging that reinforces credibility.`;
  }

  // ── Mandate Balance ──
  let mandateBalance = 100;
  let mandateFeedback = '';
  if (rateDecision < -25) {
    mandateBalance -= 20;
    mandateFeedback = `A ${Math.abs(rateDecision)} bps cut is aggressive — it risks signaling panic and could fuel inflation expectations.`;
  } else if (rateDecision > 25) {
    mandateBalance -= 15;
    mandateFeedback = `A ${rateDecision} bps hike is an unusually large move — it may cool inflation but risks overtightening into a downturn.`;
  } else if (rateDecision === 0) {
    mandateFeedback = `Holding steady — a measured approach that preserves optionality. Sometimes the best move is no move.`;
  } else if (rateDecision > 0) {
    mandateFeedback = `A standard ${rateDecision} bps hike — a conventional move that signals resolve on inflation without overreacting.`;
  } else {
    mandateFeedback = `A measured ${Math.abs(rateDecision)} bps cut — providing support without appearing to panic.`;
  }

  const overall = Math.round((marketStability + credibility + mandateBalance) / 3);

  // ── Overall Insight ──
  let insight = '';
  if (overall >= 90) {
    insight = 'Textbook meeting — your action, communication, and market reaction were all in harmony.';
  } else if (overall >= 80) {
    insight = 'A solid performance with minor rough edges. Markets are generally on your side.';
  } else if (overall >= 70) {
    insight = 'An adequate meeting, but there\'s room to tighten the alignment between your words and actions.';
  } else if (overall >= 60) {
    insight = 'This meeting raised some eyebrows. Review where your messaging diverged from your decision.';
  } else {
    insight = 'A difficult meeting — markets are questioning your coherence. Consistency is the path back to credibility.';
  }

  return {
    marketStability: {
      score: Math.max(0, marketStability),
      feedback: marketFeedback,
      ...getGrade(marketStability)
    },
    credibility: {
      score: Math.max(0, credibility),
      feedback: credibilityFeedback,
      ...getGrade(credibility)
    },
    mandateBalance: {
      score: Math.max(0, mandateBalance),
      feedback: mandateFeedback,
      ...getGrade(mandateBalance)
    },
    overall: {
      score: overall,
      insight: insight,
      ...getGrade(overall)
    }
  };
};

/**
 * Calculate hawk/dove score from selected statements
 * @param {Array<string>} selectedStatements - Array of selected statement IDs
 * @param {Object} statementPhrases - Statement phrases by category
 * @returns {number} Hawk score (positive = hawkish, negative = dovish)
 */
window.FedChair.Engine.calculateHawkScore = function(selectedStatements, statementPhrases) {
  return selectedStatements.reduce((sum, id) => {
    for (const category of Object.values(statementPhrases)) {
      const phrase = category.find(p => p.id === id);
      if (phrase) return sum + phrase.hawkScore;
    }
    return sum;
  }, 0);
};

/**
 * Get hawk/dove label and color for a score
 * @param {number} score - Hawk score
 * @returns {Object} Label and color
 */
window.FedChair.Engine.getHawkLabel = function(score) {
  if (score >= 4) return { label: 'VERY HAWKISH', color: '#dc2626' };
  if (score >= 2) return { label: 'HAWKISH', color: '#f97316' };
  if (score >= -1) return { label: 'NEUTRAL', color: '#a3a3a3' };
  if (score >= -3) return { label: 'DOVISH', color: '#22c55e' };
  return { label: 'VERY DOVISH', color: '#15803d' };
};
