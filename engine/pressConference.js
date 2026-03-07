// Press Conference Engine
// Generates reporter questions, scores player responses, and modifies market reaction

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

(function() {
  'use strict';

  // Reporter pool — real Fed press corps names
  const REPORTERS = [
    { name: 'Nick Timiraos', outlet: 'WSJ' },
    { name: 'Steve Liesman', outlet: 'CNBC' },
    { name: 'Jeanna Smialek', outlet: 'NYT' },
    { name: 'Howard Schneider', outlet: 'Reuters' },
    { name: 'Michael McKee', outlet: 'Bloomberg' },
    { name: 'Victoria Guida', outlet: 'POLITICO' },
    { name: 'Colby Smith', outlet: 'FT' },
    { name: 'Rachel Siegel', outlet: 'WaPo' },
    { name: 'Greg Robb', outlet: 'MarketWatch' },
    { name: 'Megan Cassella', outlet: 'Barron\'s' }
  ];

  // ─── Question Template Pool ───────────────────────────────────────────

  const QUESTION_TEMPLATES = {

    data_challenge: [
      {
        id: 'dc_inflation_cut',
        condition: (gs, rd) => gs.economy.pceInflation > 2.5 && rd < 0,
        question: 'Chair, PCE inflation is running at {pce}% — well above your 2% target. How do you justify cutting rates when price pressures remain elevated?',
        responses: [
          { label: 'Measured', text: 'We\'re watching the data carefully. The trajectory matters more than a single reading, and we see disinflationary forces building in the pipeline.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'You raise a fair point. We remain vigilant on inflation and today\'s cut should not be read as complacency. We will not hesitate to reverse course.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'Inflation expectations remain well-anchored. The labor market needs support, and we believe today\'s action balances both sides of our mandate.', hawkShift: -1.5, credibilityEffect: -1 }
        ]
      },
      {
        id: 'dc_gdp_weak_hold',
        condition: (gs, rd) => gs.economy.gdpGrowth < 1.0 && rd === 0,
        question: 'GDP growth has slowed to {gdp}%. Critics say you\'re behind the curve by holding rates steady. What\'s your response?',
        responses: [
          { label: 'Measured', text: 'The economy is in a soft patch, but the labor market remains resilient. We need more data before adjusting our stance.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'Growth is moderating, but inflation is the greater risk right now. We can\'t cut preemptively and risk a 1970s-style mistake.', hawkShift: 1.5, credibilityEffect: 0 },
          { label: 'Dovish lean', text: 'I hear the concern. We\'re closely monitoring downside risks and are prepared to act decisively if the outlook deteriorates further.', hawkShift: -1, credibilityEffect: 1 }
        ]
      },
      {
        id: 'dc_payrolls_hike',
        condition: (gs, rd) => gs.economy.payrollsChange < 100 && rd > 0,
        question: 'Payroll growth has slowed to {payrolls}K. Isn\'t a rate hike in this environment risking unnecessary job losses?',
        responses: [
          { label: 'Measured', text: 'The labor market is normalizing from an overheated state. We believe this pace of job creation is sustainable and consistent with our goals.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'Price stability is the foundation of a healthy labor market. Without it, any short-term job gains would be unsustainable.', hawkShift: 1.5, credibilityEffect: 0 },
          { label: 'Dovish lean', text: 'We\'re mindful of the employment side of our mandate. Today\'s decision was finely balanced, and we\'ll be watching the labor data very closely.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'dc_unemployment_rising',
        condition: (gs) => gs.economy.unemploymentRate > 4.5,
        question: 'Unemployment has risen to {unemployment}%. At what point does the Committee consider this level inconsistent with maximum employment?',
        responses: [
          { label: 'Measured', text: 'We don\'t target a specific unemployment rate. We assess a broad range of labor market indicators, and the picture is mixed.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'The natural rate of unemployment may be higher than pre-pandemic estimates. Some adjustment is a necessary part of restoring price stability.', hawkShift: 1, credibilityEffect: -1 },
          { label: 'Dovish lean', text: 'We take rising unemployment very seriously. It\'s a key factor in our deliberations, and it weighs heavily in favor of a more supportive policy stance.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'dc_mixed_data',
        condition: () => true, // Always eligible fallback
        question: 'We\'re seeing conflicting signals — inflation sticky above target while growth softens. How does the Committee weigh these competing pressures?',
        responses: [
          { label: 'Measured', text: 'That tension is exactly what makes monetary policy challenging right now. We\'re balancing both sides of our dual mandate with each decision.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Hawkish lean', text: 'When there\'s a conflict, price stability must come first. Credibility on inflation is the prerequisite for everything else.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'We believe growth concerns are becoming the more pressing risk. Inflation is trending in the right direction even if it\'s not there yet.', hawkShift: -1.5, credibilityEffect: 0 }
        ]
      },
      {
        id: 'dc_cpi_divergence',
        condition: (gs) => Math.abs(gs.economy.cpiInflation - gs.economy.pceInflation) > 0.5,
        question: 'CPI and PCE are diverging more than usual. Which measure is the Committee putting more weight on right now?',
        responses: [
          { label: 'Measured', text: 'PCE remains our preferred gauge, but we look at the full constellation of price data. Both measures are telling a consistent underlying story.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'Regardless of the measure, price pressures remain too high. We can\'t afford to cherry-pick the more favorable reading.', hawkShift: 1, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'The PCE data, which strips out the shelter distortions that inflate CPI, gives us more confidence that disinflation is underway.', hawkShift: -1, credibilityEffect: 1 }
        ]
      }
    ],

    forward_guidance: [
      {
        id: 'fg_dot_deviation',
        condition: (gs, rd) => {
          const dots = (gs.dotProjections || []).filter(d => d.meeting === gs.meetingNumber);
          if (dots.length === 0) return false;
          const latest = dots[dots.length - 1];
          const actualRate = gs.currentRate + rd / 100;
          return Math.abs(actualRate - latest.projectedRate) > 0.25;
        },
        question: 'Your dot plot from the previous meeting projected a different rate path than where we are today. What changed in your assessment?',
        responses: [
          { label: 'Measured', text: 'The dots represent each participant\'s best assessment at a point in time. The data has evolved, and our projections evolve with it.', hawkShift: 0, credibilityEffect: 1 },
          { label: 'Hawkish lean', text: 'We were prepared to follow through, but incoming data — particularly on prices — demanded a more cautious approach.', hawkShift: 1.5, credibilityEffect: -1 },
          { label: 'Dovish lean', text: 'Economic conditions have shifted, and it would be irresponsible to mechanically follow a projection when the ground has moved.', hawkShift: -1, credibilityEffect: 0 }
        ]
      },
      {
        id: 'fg_guidance_reversal',
        condition: (gs, rd) => {
          if (gs.rateHistory.length < 2) return false;
          const prev = gs.rateHistory[gs.rateHistory.length - 1].decision;
          return (prev > 0 && rd < 0) || (prev < 0 && rd > 0);
        },
        question: 'This decision reverses the direction from your previous meeting. Doesn\'t this whiplash undermine forward guidance?',
        responses: [
          { label: 'Measured', text: 'We are data-dependent, not path-dependent. When the data shifts materially, our response should shift too.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'We won\'t be locked into a trajectory that no longer fits the data. Persistence in the wrong direction would be the real credibility risk.', hawkShift: 1, credibilityEffect: 0 },
          { label: 'Dovish lean', text: 'I understand the concern. But the economic landscape has changed significantly, and flexibility is a feature, not a bug, of good policy.', hawkShift: -1, credibilityEffect: -1 }
        ]
      },
      {
        id: 'fg_pace_question',
        condition: () => true, // Always eligible
        question: 'Can you give us a sense of the pace going forward? Should markets expect moves at consecutive meetings?',
        responses: [
          { label: 'Measured', text: 'We\'ll take it meeting by meeting. No decision has been made about the pace, and we\'ll let the data guide us.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Hawkish lean', text: 'We are prepared to act at any meeting if inflation data warrants it. Nothing is off the table.', hawkShift: 2, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'We see today\'s action as getting policy closer to where it needs to be. The urgency for further moves is diminishing.', hawkShift: -2, credibilityEffect: 0 }
        ]
      },
      {
        id: 'fg_terminal_rate',
        condition: (gs) => gs.meetingNumber >= 3,
        question: 'Where does the Committee see the terminal rate for this cycle? Are we close to the end?',
        responses: [
          { label: 'Measured', text: 'The neutral rate is uncertain, and it\'s not something we can pin down precisely. We\'ll know we\'re in the right neighborhood when the data tells us.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'I wouldn\'t say we\'re near the end. There\'s more work to do, and the Committee is committed to seeing it through.', hawkShift: 2, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'We believe policy is now in restrictive territory. The question is less about how much further and more about how long to stay here.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'fg_data_dependent',
        condition: () => true, // Always eligible
        question: 'You\'ve said "data dependent" repeatedly. Can you be more specific about what data points would change your mind?',
        responses: [
          { label: 'Measured', text: 'We\'re watching the totality of the data — employment, inflation, spending, surveys. No single indicator drives our decisions.', hawkShift: 0, credibilityEffect: 1 },
          { label: 'Hawkish lean', text: 'Inflation coming down sustainably to 2% is what we need to see. Until that happens, the bias is toward restrictive policy.', hawkShift: 1.5, credibilityEffect: 2 },
          { label: 'Dovish lean', text: 'Frankly, if we see further weakening in employment or consumer spending, that would meaningfully shift the calculus.', hawkShift: -1.5, credibilityEffect: 2 }
        ]
      }
    ],

    political: [
      {
        id: 'pol_independence',
        condition: () => true, // Always eligible
        question: 'There\'s been political pressure on the Fed from both sides. How do you maintain independence in this environment?',
        responses: [
          { label: 'Deflect', text: 'We don\'t comment on political matters. Our focus is our statutory mandate: maximum employment and stable prices.', hawkShift: 0, credibilityEffect: 2, isDeflection: true },
          { label: 'Substantive redirect', text: 'The Fed\'s independence is institutional, not personal. Our decisions are guided by data, analysis, and our dual mandate — nothing else.', hawkShift: 0, credibilityEffect: 4 },
          { label: 'Direct engagement', text: 'I welcome scrutiny. Accountability and independence aren\'t in tension — they reinforce each other. We earn independence through good results.', hawkShift: 0, credibilityEffect: 3 }
        ]
      },
      {
        id: 'pol_warsh_transition',
        condition: (gs) => gs.meetingNumber >= 2,
        question: 'With the Warsh nomination still pending, how is the transition uncertainty affecting Committee deliberations?',
        responses: [
          { label: 'Deflect', text: 'Personnel matters are outside the scope of these proceedings. The Committee is focused on policy.', hawkShift: 0, credibilityEffect: 1, isDeflection: true },
          { label: 'Substantive redirect', text: 'The institution is bigger than any individual. The FOMC process ensures continuity regardless of leadership transitions.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Direct engagement', text: 'I assure you the Committee is operating with full focus and unity of purpose. Any transition will be orderly and professional.', hawkShift: 0, credibilityEffect: 2 }
        ]
      },
      {
        id: 'pol_doj_probe',
        condition: (gs) => gs.meetingNumber >= 4,
        question: 'Reports suggest DOJ has been looking into whether the Fed\'s rate decisions have been politically influenced. Your response?',
        responses: [
          { label: 'Deflect', text: 'I\'m not going to comment on speculation. Let\'s focus on the economy and our policy actions today.', hawkShift: 0, credibilityEffect: 0, isDeflection: true },
          { label: 'Substantive redirect', text: 'Every decision we make is grounded in economic analysis and thoroughly documented. Our record speaks for itself.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Direct engagement', text: 'We welcome any review. Transparency is a cornerstone of this institution. You\'ll find our decisions are driven entirely by our mandate.', hawkShift: 0, credibilityEffect: 4 }
        ]
      },
      {
        id: 'pol_miran_disagreement',
        condition: (gs) => gs.meetingNumber >= 3,
        question: 'Council of Economic Advisers Chair Miran has publicly disagreed with your approach. Does that concern you?',
        responses: [
          { label: 'Deflect', text: 'We have great respect for all parts of government, but we conduct monetary policy independently.', hawkShift: 0, credibilityEffect: 1, isDeflection: true },
          { label: 'Substantive redirect', text: 'Healthy debate about economic policy is a strength, not a weakness. The Fed\'s statutory mandate is clear, and that\'s what guides us.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Direct engagement', text: 'I\'ve read his comments carefully. Reasonable people can disagree about the outlook, but our analysis supports the approach we\'ve taken.', hawkShift: 0, credibilityEffect: 3 }
        ]
      }
    ],

    market_impact: [
      {
        id: 'mi_vix_high',
        condition: (gs) => gs.markets.vix > 25,
        question: 'The VIX is elevated at {vix}. Are you concerned about financial stability risks at this point?',
        responses: [
          { label: 'Measured', text: 'Volatility reflects uncertainty, and some uncertainty is natural in a tightening cycle. We\'re monitoring conditions closely but see no systemic risk.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'Markets adjust to policy changes. Volatility that comes from the Fed doing its job on inflation is very different from disorderly conditions.', hawkShift: 1, credibilityEffect: 0 },
          { label: 'Dovish lean', text: 'Financial conditions are a key input to our thinking. Excessive tightening of financial conditions could itself become a risk we need to address.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'mi_sp_swing',
        condition: (gs, rd, hs, mr) => Math.abs(mr.sp500.change) > 1.5,
        question: 'The S&P moved significantly during your statement. Does the Committee worry about triggering market disruptions?',
        responses: [
          { label: 'Measured', text: 'We don\'t target asset prices. Our job is to set monetary policy appropriately, and we trust markets to adjust.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Hawkish lean', text: 'Markets sometimes need to recalibrate expectations. We\'d be more concerned if policy were being set to please markets rather than serve the economy.', hawkShift: 1, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'We\'re watching the market response. If financial conditions tighten excessively, that would be relevant to our outlook and future decisions.', hawkShift: -1, credibilityEffect: 0 }
        ]
      },
      {
        id: 'mi_yield_curve',
        condition: (gs) => (gs.markets.treasury2y - gs.markets.treasury10y) > 0.3,
        question: 'The yield curve remains inverted. Historically that\'s been a recession signal. How does the Committee interpret this?',
        responses: [
          { label: 'Measured', text: 'The yield curve is one of many indicators we watch. Its predictive power may be distorted by QE effects and other structural changes.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'An inverted curve can also reflect confidence that the Fed will bring inflation down. We don\'t see it as a simple recession signal.', hawkShift: 1, credibilityEffect: 0 },
          { label: 'Dovish lean', text: 'We take the curve seriously. It\'s one reason we\'re carefully calibrating the pace and extent of any further tightening.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'mi_banking_stress',
        condition: (gs) => gs.activeShocks && gs.activeShocks.some(s => s.type === 'banking_stress'),
        question: 'With recent banking sector stress, is the Committee concerned about a credit crunch that could amplify the economic slowdown?',
        responses: [
          { label: 'Measured', text: 'The banking system is sound and well-capitalized. We\'re monitoring lending conditions but see no systemic threat at this point.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'Banking stress, to the extent it tightens credit, actually does some of our work for us. We\'ll account for that in calibrating policy.', hawkShift: 1, credibilityEffect: -1 },
          { label: 'Dovish lean', text: 'Financial system stability is always a concern. If credit conditions tighten materially, that reduces the need for further monetary tightening.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      }
    ],

    accountability: [
      {
        id: 'acc_dot_inconsistency',
        condition: (gs) => {
          // Check if player's dot projections have shifted dramatically between meetings
          const dh = gs.dotHistory || [];
          if (dh.length < 4) return false;
          const recent = dh.filter(d => d.placedAtMeeting >= gs.meetingNumber - 2);
          const older = dh.filter(d => d.placedAtMeeting < gs.meetingNumber - 2);
          if (recent.length === 0 || older.length === 0) return false;
          const recentAvg = recent.reduce((s, d) => s + d.projectedRate, 0) / recent.length;
          const olderAvg = older.reduce((s, d) => s + d.projectedRate, 0) / older.length;
          return Math.abs(recentAvg - olderAvg) > 0.4;
        },
        question: 'Your dot plot has shifted significantly from meeting to meeting. How should markets interpret that inconsistency?',
        responses: [
          { label: 'Measured', text: 'The dots reflect evolving assessments as new data arrives. Consistency for its own sake would be a mistake when the economy is changing.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish lean', text: 'The outlook has shifted, and our projections should reflect that honestly. I\'d rather be right than consistent.', hawkShift: 1, credibilityEffect: 0 },
          { label: 'Dovish lean', text: 'I hear the concern. We\'re working to provide more stable forward guidance as the outlook clarifies.', hawkShift: -1, credibilityEffect: 1 }
        ]
      },
      {
        id: 'acc_dot_followthrough',
        condition: (gs) => {
          // Player has been consistent with dots
          const dh = gs.dotHistory || [];
          if (dh.length < 2) return false;
          let matches = 0;
          for (const dot of dh) {
            const rateEntry = gs.rateHistory.find(r => r.meeting === dot.meeting);
            if (rateEntry && Math.abs(rateEntry.rate - dot.projectedRate) < 0.2) matches++;
          }
          return matches >= 2;
        },
        question: 'Markets have noted that your projections have been remarkably consistent. Is that a deliberate communication strategy?',
        responses: [
          { label: 'Measured', text: 'We aim for transparency. When the data confirms our outlook, follow-through is the natural result.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Hawkish lean', text: 'Discipline and predictability are essential to effective monetary policy. Markets should expect us to mean what we say.', hawkShift: 1, credibilityEffect: 2 },
          { label: 'Dovish lean', text: 'Consistency builds trust. That said, we\'ll always adjust if conditions warrant — being data-dependent remains paramount.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'acc_credibility_low',
        condition: (gs) => gs.credibility < 45,
        question: 'Chair, multiple analysts have described Fed communication as "incoherent." How do you respond to the growing credibility concerns?',
        responses: [
          { label: 'Measured', text: 'We hear the criticism and we take it seriously. Our actions going forward will speak louder than any single statement.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Defensive', text: 'The economy presents genuinely difficult tradeoffs. Armchair quarterbacks don\'t have to make these decisions in real time.', hawkShift: 0, credibilityEffect: -3 },
          { label: 'Humble', text: 'Communication is something we can improve on. I\'m committed to being clearer and more consistent going forward.', hawkShift: 0, credibilityEffect: 4 }
        ]
      },
      {
        id: 'acc_predecessor',
        condition: (gs) => gs.meetingNumber >= 3 && gs.meetingNumber <= 5,
        question: 'How does your approach differ from your predecessor\'s? Are you charting a new course for the Fed?',
        responses: [
          { label: 'Measured', text: 'The institution provides continuity. My job is to apply the same rigorous, data-driven approach to whatever conditions we face.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Hawkish lean', text: 'I bring my own perspective to the role. Price stability is the foundation of everything else, and I intend to deliver it.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Dovish lean', text: 'Every chair inherits unique challenges. I\'m focused on the economy we have, not relitigating past decisions.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      }
    ],

    communication: [
      {
        id: 'com_plain_language',
        condition: () => true, // Always eligible
        question: 'Chair, millions of Americans are watching. Can you explain in plain terms what today\'s decision means for ordinary families?',
        responses: [
          { label: 'Measured', text: 'We\'re working to bring inflation down so your dollar goes further, while keeping the job market strong. That balance takes time, but we\'re committed to it.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Empathetic', text: 'I know prices are still too high at the grocery store and the gas pump. We feel that urgency. Everything we do is aimed at making life more affordable.', hawkShift: 0, credibilityEffect: 4 },
          { label: 'Technical', text: 'Our policy actions affect borrowing costs throughout the economy — mortgages, car loans, business investment. These effects work through with a lag.', hawkShift: 0, credibilityEffect: 1 }
        ]
      },
      {
        id: 'com_consensus',
        condition: (gs) => gs.meetingNumber >= 2,
        question: 'Was today\'s decision unanimous, or is there growing dissent within the Committee?',
        responses: [
          { label: 'Measured', text: 'The Committee had a thorough discussion. There\'s a range of views, which is healthy, but we reached a strong consensus on today\'s action.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Empathetic', text: 'Every member brings unique perspective, and I value the debate. Ultimately, we united behind a decision that reflects our collective best judgment.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Technical', text: 'The vote tally will be in the minutes. What I can say is that the deliberative process was rigorous and the policy rationale was well-supported.', hawkShift: 0, credibilityEffect: 1 }
        ]
      },
      {
        id: 'com_mixed_signals',
        condition: (gs, rd, hs) => {
          // Statement tone conflicts with action
          const actionTone = rd < 0 ? -2 : rd > 0 ? 2 : 0;
          return Math.abs(hs - actionTone) > 3;
        },
        question: 'Your statement language seems to conflict with today\'s rate action. Isn\'t the Committee sending mixed signals?',
        responses: [
          { label: 'Measured', text: 'The statement reflects the Committee\'s assessment of risks, which can differ from the immediate action. Policy is multidimensional.', hawkShift: 0, credibilityEffect: 1 },
          { label: 'Empathetic', text: 'I understand the perception. Let me be clear: today\'s action and our forward-looking assessment are internally consistent. The statement signals the direction of travel.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Technical', text: 'The rate decision addresses current conditions. The statement language is forward-looking. These can appear contradictory but serve different purposes.', hawkShift: 0, credibilityEffect: 0 }
        ]
      }
    ]
  };

  // ─── Question Selection Logic ──────────────────────────────────────────

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickReporter(used) {
    const available = REPORTERS.filter(r => !used.has(r.name));
    if (available.length === 0) return REPORTERS[Math.floor(Math.random() * REPORTERS.length)];
    return available[Math.floor(Math.random() * available.length)];
  }

  function fillTemplate(text, gs, mr) {
    return text
      .replace('{pce}', gs.economy.pceInflation.toFixed(1))
      .replace('{gdp}', gs.economy.gdpGrowth.toFixed(1))
      .replace('{payrolls}', Math.round(gs.economy.payrollsChange))
      .replace('{unemployment}', gs.economy.unemploymentRate.toFixed(1))
      .replace('{vix}', gs.markets.vix.toFixed(1));
  }

  /**
   * Generate 4-5 press conference questions based on game state
   */
  window.FedChair.Engine.generatePressConferenceQuestions = function(gameState, rateDecision, hawkScore, marketReaction, selectedStatements) {
    const questions = [];
    const usedIds = new Set();
    const usedReporters = new Set();

    // Gather eligible questions per category
    const eligible = {};
    for (const [cat, templates] of Object.entries(QUESTION_TEMPLATES)) {
      eligible[cat] = templates.filter(t => {
        return t.condition(gameState, rateDecision, hawkScore, marketReaction);
      });
    }

    // Must include: 1 data_challenge, 1 forward_guidance, 1 political
    const required = ['data_challenge', 'forward_guidance', 'political'];
    for (const cat of required) {
      const pool = shuffle(eligible[cat] || []);
      if (pool.length > 0) {
        const tmpl = pool[0];
        usedIds.add(tmpl.id);
        const reporter = pickReporter(usedReporters);
        usedReporters.add(reporter.name);
        questions.push({
          ...tmpl,
          category: cat,
          reporter: reporter.name,
          outlet: reporter.outlet,
          question: fillTemplate(tmpl.question, gameState, marketReaction)
        });
      }
    }

    // Low credibility: guarantee an accountability question (Phase 7)
    const credibility = gameState.credibility || 100;
    const accountabilityPool = shuffle(eligible.accountability || []);
    if (credibility < 60 && accountabilityPool.length > 0) {
      const tmpl = accountabilityPool[0];
      usedIds.add(tmpl.id);
      const reporter = pickReporter(usedReporters);
      usedReporters.add(reporter.name);
      questions.push({
        ...tmpl,
        category: 'accountability',
        reporter: reporter.name,
        outlet: reporter.outlet,
        question: fillTemplate(tmpl.question, gameState, marketReaction)
      });
    }

    // Fill remaining 1-2 slots from most newsworthy unused questions
    const totalTarget = credibility < 50 ? 5 : (Math.random() < 0.5 ? 5 : 4);
    const remainingSlots = totalTarget - questions.length;
    const allRemaining = [];
    for (const [cat, templates] of Object.entries(eligible)) {
      for (const t of templates) {
        if (!usedIds.has(t.id)) {
          // Newsworthy priority: accountability > market_impact > communication > others
          const priority = cat === 'accountability' ? 4 : cat === 'market_impact' ? 3 : cat === 'communication' ? 2 : 1;
          allRemaining.push({ ...t, category: cat, priority });
        }
      }
    }
    // Sort by priority, then shuffle within priority
    allRemaining.sort((a, b) => b.priority - a.priority);

    for (let i = 0; i < remainingSlots && allRemaining.length > 0; i++) {
      // Pick from top priority group with some randomness
      const topPriority = allRemaining[0].priority;
      const topGroup = allRemaining.filter(q => q.priority === topPriority);
      const pick = topGroup[Math.floor(Math.random() * topGroup.length)];
      const idx = allRemaining.indexOf(pick);
      allRemaining.splice(idx, 1);

      usedIds.add(pick.id);
      const reporter = pickReporter(usedReporters);
      usedReporters.add(reporter.name);
      questions.push({
        ...pick,
        reporter: reporter.name,
        outlet: reporter.outlet,
        question: fillTemplate(pick.question, gameState, marketReaction)
      });
    }

    // Shuffle final order
    return shuffle(questions);
  };

  // ─── Response Scoring ─────────────────────────────────────────────────

  /**
   * Score a single response
   */
  window.FedChair.Engine.scoreResponse = function(response, rateDecision, hawkScore, previousResponses) {
    let hawkShift = response.hawkShift;
    let credibilityEffect = response.credibilityEffect;
    let feedback = '';

    // Consistency bonus/penalty: does response tone match decision + statement?
    const actionTone = rateDecision < 0 ? -1.5 : rateDecision > 0 ? 1.5 : 0;
    const statementTone = hawkScore > 2 ? 1 : hawkScore < -2 ? -1 : 0;
    const decisionTone = (actionTone + statementTone) / 2;

    // Response tone direction
    const responseTone = hawkShift;
    const toneAlignment = decisionTone * responseTone; // positive = same direction

    if (toneAlignment > 0) {
      credibilityEffect += 1;
      feedback = 'Consistent messaging reinforces credibility.';
    } else if (toneAlignment < -1) {
      credibilityEffect -= 2;
      feedback = 'Markets detect inconsistency between your words and actions.';
    }

    // Mixed signals check: if this response swings far from running average
    if (previousResponses.length > 0) {
      const avgShift = previousResponses.reduce((s, r) => s + r.hawkShift, 0) / previousResponses.length;
      if (Math.abs(hawkShift - avgShift) > 2.5) {
        credibilityEffect -= 3;
        feedback = 'Erratic tone shift raises concerns about a coherent policy view.';
      }
    }

    // Deflection tracking — 2nd+ deflection penalty
    if (response.isDeflection) {
      const priorDeflections = previousResponses.filter(r => r.isDeflection).length;
      if (priorDeflections >= 1) {
        credibilityEffect -= 2;
        feedback = 'Repeated deflections are starting to look evasive.';
      }
    }

    return {
      hawkShift,
      credibilityEffect,
      feedback,
      isDeflection: !!response.isDeflection
    };
  };

  // ─── Impact Calculation ───────────────────────────────────────────────

  /**
   * Calculate aggregate impact of all press conference responses
   */
  window.FedChair.Engine.calculatePressConferenceImpact = function(scoredResponses) {
    const totalHawkShift = scoredResponses.reduce((s, r) => s + r.hawkShift, 0);
    const totalCredibilityChange = scoredResponses.reduce((s, r) => s + r.credibilityEffect, 0);

    // Determine overall interpretation
    let interpretation;
    if (Math.abs(totalHawkShift) < 1) {
      interpretation = 'neutral';
    } else if (totalHawkShift >= 1) {
      interpretation = totalHawkShift >= 3 ? 'very hawkish' : 'hawkish';
    } else {
      interpretation = totalHawkShift <= -3 ? 'very dovish' : 'dovish';
    }

    // Mixed signals if credibility tanked
    if (totalCredibilityChange < -5) {
      interpretation = 'mixed signals';
    }

    // Key moment: the response with largest absolute credibility effect
    let keyMoment = null;
    let maxAbsCred = 0;
    for (const r of scoredResponses) {
      if (Math.abs(r.credibilityEffect) > maxAbsCred) {
        maxAbsCred = Math.abs(r.credibilityEffect);
        keyMoment = r.feedback || (r.credibilityEffect > 0 ? 'Strong, measured response.' : 'Fumbled response raised eyebrows.');
      }
    }

    return {
      totalHawkShift,
      totalCredibilityChange,
      interpretation,
      keyMoment
    };
  };

  // ─── Market Reaction Modifier ─────────────────────────────────────────

  /**
   * Apply press conference mood shift to base market reaction
   * Returns a new modified reaction object (deep clone)
   */
  window.FedChair.Engine.applyPressConferenceToMarketReaction = function(marketReaction, impact) {
    const mood = impact.totalHawkShift;

    // Deep clone
    const mr = JSON.parse(JSON.stringify(marketReaction));

    // Per hawk point adjustments
    const spAdjust = -0.05 * mood;   // % per hawk point
    const y10Adjust = 5 * mood;       // bps per hawk point
    const y2Adjust = 4 * mood;        // bps per hawk point
    const vixAdjust = 0.3 * mood;     // points per hawk point
    const dxyAdjust = 0.1 * mood;     // % per hawk point

    // Apply to S&P
    mr.sp500.change += spAdjust;
    mr.sp500.value = marketReaction.sp500.value + (marketReaction.sp500.value * mr.sp500.change / 100)
      - (marketReaction.sp500.value * marketReaction.sp500.change / 100)
      + (marketReaction.sp500.value * mr.sp500.change / 100);
    // Simpler: just adjust value proportionally
    mr.sp500.value = marketReaction.sp500.value * (1 + mr.sp500.change / 100);

    // Apply to yields (stored as decimal changes but displayed as bps)
    mr.treasury10y.change += y10Adjust;
    mr.treasury10y.value = marketReaction.treasury10y.value + (mr.treasury10y.change - marketReaction.treasury10y.change) / 100;

    mr.treasury2y.change += y2Adjust;
    mr.treasury2y.value = marketReaction.treasury2y.value + (mr.treasury2y.change - marketReaction.treasury2y.change) / 100;

    // VIX
    mr.vix.change += vixAdjust;
    mr.vix.value = marketReaction.vix.value + (mr.vix.change - marketReaction.vix.change);

    // DXY
    mr.dxy.change += dxyAdjust;
    mr.dxy.value = marketReaction.dxy.value + (mr.dxy.change - marketReaction.dxy.change);

    // Sectors: proportional to S&P adjustment
    mr.sectors.tech += spAdjust * 1.3;
    mr.sectors.financials += spAdjust * 0.7;
    mr.sectors.utilities += spAdjust * 0.5;
    mr.creditSpread += mood * 0.4;

    // Update headline if mood was significant
    if (Math.abs(mood) >= 3) {
      if (mood > 0) {
        mr.headline += ' — Hawkish Press Conference Rattles Markets';
      } else {
        mr.headline += ' — Dovish Presser Soothes Markets';
      }
    } else if (Math.abs(mood) >= 1.5) {
      if (mood > 0) {
        mr.headline += ' — Chair Strikes Hawkish Tone in Q&A';
      } else {
        mr.headline += ' — Chair\'s Dovish Comments Lift Sentiment';
      }
    }

    return mr;
  };

})();
