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

  let marketStability = 100;
  let credibility = 100;
  let mandateBalance = 100;

  // Market stability - penalize large market moves
  const absSpChange = Math.abs(reaction.sp500.change);
  if (absSpChange > 2) marketStability -= 40;
  else if (absSpChange > 1) marketStability -= 20;
  else if (absSpChange > 0.5) marketStability -= 10;

  // Credibility - penalize mismatch between action and statement tone
  const actionTone = rateDecision < 0 ? -2 : rateDecision > 0 ? 2 : 0;
  const toneMismatch = Math.abs(hawkScore - actionTone);
  if (toneMismatch > 4) credibility -= 40;
  else if (toneMismatch > 2) credibility -= 20;

  // Mandate balance - penalize extreme moves
  if (rateDecision < -25) mandateBalance -= 20;
  if (rateDecision > 25) mandateBalance -= 15;

  const overall = Math.round((marketStability + credibility + mandateBalance) / 3);

  return {
    marketStability: {
      score: Math.max(0, marketStability),
      ...getGrade(marketStability)
    },
    credibility: {
      score: Math.max(0, credibility),
      ...getGrade(credibility)
    },
    mandateBalance: {
      score: Math.max(0, mandateBalance),
      ...getGrade(mandateBalance)
    },
    overall: {
      score: overall,
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
