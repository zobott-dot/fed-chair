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
      },
      {
        id: 'dc_shelter_inflation',
        condition: (gs) => gs.economy.pceInflation > 2.3,
        question: 'Shelter costs continue to drive much of the inflation overshoot. Should the Fed really be raising rates to fight what some call a housing supply problem?',
        responses: [
          { label: 'Nuanced', text: 'Shelter inflation has structural roots, but monetary policy affects demand broadly. We can\'t ignore the largest component of the price index.', hawkShift: 0.5, credibilityEffect: 3 },
          { label: 'Hawkish', text: 'The source of inflation matters less than the outcome. Households experience one price level, and it\'s our job to bring it down.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Sympathetic', text: 'You\'re right that supply constraints play a role. That\'s why we\'re watching supercore inflation — services excluding shelter — as a better gauge of demand-driven pressure.', hawkShift: -1, credibilityEffect: 2 }
        ]
      },
      {
        id: 'dc_wage_growth',
        condition: (gs) => gs.economy.unemploymentRate < 4.5,
        question: 'Wage growth remains above levels consistent with 2% inflation. Is the labor market still too tight?',
        responses: [
          { label: 'Balanced', text: 'Wage growth is moderating but still elevated. We welcome strong wages that are consistent with price stability — the question is the pace of adjustment.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish', text: 'The wage-price dynamic is a real concern. Without further labor market rebalancing, sustainable disinflation is difficult to achieve.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Pro-worker', text: 'Real wages are just now catching up to inflation. We don\'t see current wage growth as a threat — it\'s a delayed recovery of purchasing power.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'dc_consumer_spending',
        condition: (gs) => gs.economy.gdpGrowth > 2.0,
        question: 'Consumer spending has been resilient despite rate hikes. Does that mean monetary policy isn\'t restrictive enough?',
        responses: [
          { label: 'Patient', text: 'Monetary policy works with long and variable lags. Spending resilience today doesn\'t mean policy isn\'t working — it means the transmission is ongoing.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Concerned', text: 'Consumer strength does suggest there may be more work to do. We\'re taking that signal seriously in our deliberations.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Dismissive', text: 'Spending is being supported by pandemic-era savings drawdowns. That tailwind is fading, and we expect a meaningful slowdown ahead.', hawkShift: -1, credibilityEffect: 0 }
        ]
      },
      {
        id: 'dc_global_disinflation',
        condition: () => true,
        question: 'Other central banks — the ECB, Bank of England — have already started cutting. Is the Fed falling behind the global trend?',
        responses: [
          { label: 'Independent', text: 'We set policy for the U.S. economy. Other central banks face different conditions. The right path for the Fed may diverge from global peers.', hawkShift: 0.5, credibilityEffect: 3 },
          { label: 'Dovish', text: 'We\'re monitoring global developments closely. If disinflation is a global trend, that does affect our outlook through trade and financial channels.', hawkShift: -1, credibilityEffect: 1 },
          { label: 'Assertive', text: 'The U.S. economy has been the outlier in strength, which is why our policy path differs. We won\'t import a rate-cutting cycle that doesn\'t fit our data.', hawkShift: 1.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'dc_services_inflation',
        condition: (gs) => gs.economy.pceInflation > 2.0,
        question: 'Core services inflation remains sticky. How much patience does the Committee have for this gradual disinflation?',
        responses: [
          { label: 'Measured', text: 'We\'re in the last mile of disinflation, which we always expected to be the hardest. Patience is not passivity — it\'s discipline.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Impatient', text: 'Our patience is not unlimited. If services inflation doesn\'t show clearer improvement in coming months, the Committee will need to reassess.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Confident', text: 'The trajectory is right even if the pace is slow. We don\'t need to see 2% in every component — we need to see the trend pointing there convincingly.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'dc_recession_probability',
        condition: (gs) => gs.economy.gdpGrowth < 1.5,
        question: 'Several forecasters now put the probability of recession above 40%. Does the Committee share that assessment?',
        responses: [
          { label: 'Cautious', text: 'We don\'t assign specific recession probabilities. But we\'re attentive to the balance of risks and they are moving toward the downside.', hawkShift: -0.5, credibilityEffect: 2 },
          { label: 'Reassuring', text: 'The labor market and consumer balance sheets remain solid. We see a slowdown, not a contraction, as the most likely path.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Blunt', text: 'The risk of recession has risen. That\'s a direct consequence of the tightening we\'ve done, and it\'s something we\'re weighing carefully against inflation progress.', hawkShift: -1, credibilityEffect: 3 }
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
      },
      {
        id: 'fg_restrictive_level',
        condition: (gs) => gs.currentRate > 3.0,
        question: 'At what point does the Committee believe rates become sufficiently restrictive? And how do you know when you\'re there?',
        responses: [
          { label: 'Humble', text: 'Honestly, we can\'t know the precise level in real time. We assess it through the lens of financial conditions, credit growth, and the economy\'s response.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Hawkish', text: 'We\'ll know we\'re sufficiently restrictive when inflation is convincingly headed to 2%. The rate level matters less than the outcome.', hawkShift: 1, credibilityEffect: 2 },
          { label: 'Dovish', text: 'Given the tightening already in the pipeline from previous actions, I believe we\'re at or near a sufficiently restrictive stance.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'fg_insurance_cut',
        condition: (gs, rd) => rd < 0 && gs.economy.pceInflation < 2.5,
        question: 'Is this an insurance cut, or the beginning of a cutting cycle? How should markets distinguish between the two?',
        responses: [
          { label: 'Deliberate', text: 'We\'re not pre-committing to a series. Each meeting is a fresh assessment. This action reflects the data we have today.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Forward-looking', text: 'The direction of travel is clear, but the pace and extent will depend on the evolution of the economy. We\'re not on autopilot.', hawkShift: -1, credibilityEffect: 2 },
          { label: 'Cautious', text: 'Call it a recalibration. Policy was calibrated for a different risk profile. The risks have shifted, and our stance is adjusting accordingly.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'fg_higher_for_longer',
        condition: (gs, rd) => rd === 0 && gs.currentRate > 3.5,
        question: 'The market narrative is "higher for longer." Is that how you\'d characterize the Committee\'s view?',
        responses: [
          { label: 'Measured', text: 'We don\'t adopt market slogans. We\'ll maintain a restrictive stance for as long as appropriate, and that depends entirely on the incoming data.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Confirming', text: 'If "higher for longer" means we\'re committed to not cutting prematurely, then yes — that\'s consistent with our outlook.', hawkShift: 1.5, credibilityEffect: 2 },
          { label: 'Pushing back', text: 'That framing is too rigid. Policy is dynamic, and we could find ourselves adjusting sooner or later than any slogan implies.', hawkShift: -1, credibilityEffect: 1 }
        ]
      },
      {
        id: 'fg_soft_landing_odds',
        condition: (gs) => gs.meetingNumber >= 4,
        question: 'Midway through your tenure — what are the odds of a soft landing? Is it still achievable from here?',
        responses: [
          { label: 'Optimistic', text: 'I believe a soft landing remains the most likely outcome. The economy has been remarkably resilient, and we\'re navigating a narrow path but a viable one.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Candid', text: 'The window is still open, but it\'s narrower than I\'d like. Every meeting from here matters — there\'s very little margin for error.', hawkShift: 0, credibilityEffect: 4 },
          { label: 'Evasive', text: 'I don\'t like to put odds on outcomes. Our job is to make the best decision at each juncture, not to forecast the ending.', hawkShift: 0, credibilityEffect: 0 }
        ]
      },
      {
        id: 'fg_neutral_rate',
        condition: () => true,
        question: 'Has the Committee\'s estimate of the neutral rate changed? Some argue r-star has risen since the pandemic.',
        responses: [
          { label: 'Thoughtful', text: 'There\'s an active debate about r-star among Committee members. If neutral is higher, then current policy may be less restrictive than we think — that\'s something we\'re watching.', hawkShift: 0.5, credibilityEffect: 3 },
          { label: 'Dismissive', text: 'The neutral rate is a theoretical construct that can\'t be measured directly. We focus on observable outcomes rather than unobservable variables.', hawkShift: 0, credibilityEffect: 1 },
          { label: 'Transparent', text: 'The median long-run dot has moved up slightly, reflecting individual reassessments. That\'s a legitimate shift in the Committee\'s collective thinking.', hawkShift: 0.5, credibilityEffect: 2 }
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
      },
      {
        id: 'pol_tariff_impact',
        condition: (gs) => gs.meetingNumber >= 2,
        question: 'New tariffs are being imposed on key trading partners. How is the Committee factoring trade policy uncertainty into its forecast?',
        responses: [
          { label: 'Diplomatic', text: 'Trade policy is the purview of elected officials. Our job is to assess the economic consequences — tariffs can affect both inflation and growth — and set monetary policy accordingly.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Direct', text: 'Tariffs are a supply shock. They raise prices in the near term and can dampen growth over time. We\'re modeling both channels carefully.', hawkShift: 0.5, credibilityEffect: 2 },
          { label: 'Cautious', text: 'The uncertainty itself is a headwind. Businesses tell us they\'re delaying investment decisions. That caution is showing up in the data.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'pol_fiscal_deficit',
        condition: (gs) => gs.meetingNumber >= 3,
        question: 'Federal deficits are running at historically high levels. Is fiscal policy making the Fed\'s job harder?',
        responses: [
          { label: 'Diplomatic', text: 'Fiscal policy is Congress\'s domain. We take the fiscal path as given and set monetary policy to achieve our mandate within that landscape.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Candid', text: 'Sustained fiscal stimulus does create demand that can work at cross-purposes with monetary tightening. That\'s a reality we factor into our models.', hawkShift: 0.5, credibilityEffect: 3 },
          { label: 'Evasive', text: 'I\'d prefer not to comment on fiscal policy choices. The Committee is focused on the tools at our disposal.', hawkShift: 0, credibilityEffect: -1 }
        ]
      },
      {
        id: 'pol_election_timing',
        condition: (gs) => gs.meetingNumber >= 5,
        question: 'Critics say the Fed is timing its moves to influence the election. How do you respond to that charge?',
        responses: [
          { label: 'Firm', text: 'The Federal Reserve does not factor elections into monetary policy. We would be derelict in our duty if we did — and we would be derelict if we refrained from acting when action was warranted.', hawkShift: 0, credibilityEffect: 4 },
          { label: 'Deflect', text: 'We don\'t engage with political timing speculation. The data speaks for itself, and our actions are fully documented and transparent.', hawkShift: 0, credibilityEffect: 1, isDeflection: true },
          { label: 'Historical', text: 'The Fed has acted during election years many times — Volcker, Greenspan, Bernanke. We set policy based on economic conditions, full stop.', hawkShift: 0, credibilityEffect: 3 }
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
      },
      {
        id: 'mi_credit_spreads',
        condition: () => true,
        question: 'Corporate credit spreads have widened recently. Is the Committee concerned about stress in the credit markets?',
        responses: [
          { label: 'Watchful', text: 'We monitor credit conditions closely. Some spread widening is a natural consequence of tighter policy. We distinguish between healthy repricing and disorderly stress.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish', text: 'Spread widening reflects markets appropriately reassessing risk. We don\'t view that as a reason to ease — it\'s a sign that policy is working.', hawkShift: 1, credibilityEffect: 1 },
          { label: 'Concerned', text: 'If credit conditions tighten sharply, that does some of our tightening for us. We\'d need to consider that in the overall policy stance.', hawkShift: -1, credibilityEffect: 1 }
        ]
      },
      {
        id: 'mi_dollar_strength',
        condition: () => true,
        question: 'The dollar has strengthened significantly. How does that factor into the Committee\'s thinking on imported inflation and export competitiveness?',
        responses: [
          { label: 'Balanced', text: 'A stronger dollar has mixed effects — it dampens imported inflation, which helps our price stability goal, but it also creates headwinds for exporters and emerging markets.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Focused', text: 'We set policy for domestic conditions. Exchange rate movements are an output of relative policy stances, not an input to our decisions.', hawkShift: 0.5, credibilityEffect: 1 },
          { label: 'Global-minded', text: 'Dollar strength is tightening financial conditions globally. We\'re mindful that spillback effects from stressed emerging markets could affect the U.S. eventually.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'mi_housing_market',
        condition: (gs) => gs.currentRate > 3.0,
        question: 'Mortgage rates are at multi-decade highs. How does the Committee view the impact on the housing market and household wealth?',
        responses: [
          { label: 'Empathetic', text: 'Housing affordability is a real challenge. Higher mortgage rates are one of the most visible channels of monetary policy, and we\'re aware of the pain they cause.', hawkShift: -0.5, credibilityEffect: 2 },
          { label: 'Analytical', text: 'The housing market is rebalancing from an unsustainable pace. Some cooling in housing is a necessary part of the inflation-reduction process.', hawkShift: 0.5, credibilityEffect: 2 },
          { label: 'Forward-looking', text: 'When we achieve price stability, the conditions for a healthier housing market will follow. Short-term pain serves long-term affordability.', hawkShift: 1, credibilityEffect: 1 }
        ]
      },
      {
        id: 'mi_financial_conditions',
        condition: () => true,
        question: 'Financial conditions have loosened considerably despite rate hikes — equities up, spreads tight. Is the market undermining your policy?',
        responses: [
          { label: 'Pragmatic', text: 'Markets price in expectations, not just current policy. If they expect cuts ahead, conditions ease. That\'s a signal we factor into our assessment.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish', text: 'If financial conditions aren\'t sufficiently restrictive, it raises the question of whether we\'ve done enough. We\'re paying close attention.', hawkShift: 1.5, credibilityEffect: 2 },
          { label: 'Dismissive', text: 'We set the policy rate. Markets set asset prices. Both are doing their jobs. We don\'t try to manage day-to-day market movements.', hawkShift: 0, credibilityEffect: 0 }
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
      },
      {
        id: 'acc_transitory_mistake',
        condition: (gs) => gs.economy.pceInflation > 2.5,
        question: 'The Fed called inflation "transitory" and was wrong. How do you avoid repeating that mistake — either by waiting too long or acting too aggressively?',
        responses: [
          { label: 'Humble', text: 'That experience taught the institution a valuable lesson about conviction in the face of uncertainty. We\'re more responsive to upside inflation surprises now.', hawkShift: 0.5, credibilityEffect: 4 },
          { label: 'Defensive', text: 'The "transitory" call was reasonable given the data available at the time. Monetary policy involves judgment under genuine uncertainty.', hawkShift: 0, credibilityEffect: -1 },
          { label: 'Forward-looking', text: 'I\'m focused on getting it right from here. The risk management framework is now calibrated to take inflation persistence more seriously.', hawkShift: 0.5, credibilityEffect: 3 }
        ]
      },
      {
        id: 'acc_mandate_priority',
        condition: (gs) => gs.economy.pceInflation > 2.3 && gs.economy.unemploymentRate > 4.5,
        question: 'Both sides of the mandate are stressed — inflation above target and unemployment rising. Which takes priority right now?',
        responses: [
          { label: 'Balanced', text: 'The dual mandate is a dual mandate — we don\'t rank them. Right now, the risks to both goals are elevated, and we\'re trying to thread the needle.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Inflation-first', text: 'History is clear: without price stability, the labor market can\'t function effectively. Getting inflation down is the precondition for everything else.', hawkShift: 1.5, credibilityEffect: 1 },
          { label: 'Employment-focused', text: 'The employment side of the mandate deserves more weight right now. Inflation is coming down on its own — jobs lost in a recession don\'t come back easily.', hawkShift: -1.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'acc_svb_lessons',
        condition: (gs) => gs.meetingNumber >= 3,
        question: 'In hindsight, the SVB failure exposed supervisory gaps. Are you confident the banking system can handle the current rate environment?',
        responses: [
          { label: 'Reassuring', text: 'The banking system is well-capitalized and liquid. We\'ve applied lessons from SVB — better monitoring of unrealized losses and interest rate risk.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Candid', text: 'SVB was a reminder that rapid rate changes create winners and losers in the financial system. We\'re vigilant but can\'t eliminate all tail risks.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Dismissive', text: 'SVB was an idiosyncratic failure of management and supervision, not a monetary policy problem. The system is fundamentally sound.', hawkShift: 0, credibilityEffect: -1 }
        ]
      },
      {
        id: 'acc_inequality',
        condition: () => true,
        question: 'Critics argue that Fed policy disproportionately affects lower-income households. How do you weigh distributional impacts in your decisions?',
        responses: [
          { label: 'Empathetic', text: 'We\'re acutely aware that inflation is a regressive tax. Lower-income families spend more of their income on essentials. Getting prices stable IS the most pro-equality policy we can pursue.', hawkShift: 0.5, credibilityEffect: 3 },
          { label: 'Institutional', text: 'Congress gave us a specific mandate — maximum employment and stable prices. We pursue those goals knowing that success on both fronts benefits all households.', hawkShift: 0, credibilityEffect: 1 },
          { label: 'Transparent', text: 'We study distributional effects carefully. The research is clear: sustained high inflation hurts the most vulnerable. That motivates our resolve.', hawkShift: 0, credibilityEffect: 2 }
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
      },
      {
        id: 'com_minutes_dissent',
        condition: (gs) => gs.meetingNumber >= 3,
        question: 'The minutes from recent meetings suggest growing disagreement among members. Is the Committee losing cohesion?',
        responses: [
          { label: 'Reassuring', text: 'Vigorous debate is a feature, not a bug. The diversity of views strengthens the final outcome. We are united in our commitment to the mandate.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Transparent', text: 'Different economic outlooks naturally lead to different policy preferences. The minutes reflect an honest deliberative process.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Minimizing', text: 'I wouldn\'t read too much into nuances in the minutes. The vote was clear, and the Committee stands behind today\'s decision.', hawkShift: 0, credibilityEffect: 0 }
        ]
      },
      {
        id: 'com_fed_speak',
        condition: () => true,
        question: 'Fed officials have made seemingly conflicting public statements. How should markets parse the difference between individual views and Committee consensus?',
        responses: [
          { label: 'Clarifying', text: 'The statement and press conference represent the Committee\'s collective view. Individual speeches reflect personal assessments that inform but don\'t bind the group.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Candid', text: 'I\'d encourage focusing on the post-meeting statement and the dots. Public remarks between meetings are data points, not policy signals.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Defensive', text: 'Members have a right to share their views publicly. It\'s part of our transparency commitment. The formal channels are what set the direction.', hawkShift: 0, credibilityEffect: 1 }
        ]
      },
      {
        id: 'com_forward_guidance_trap',
        condition: (gs) => gs.meetingNumber >= 4,
        question: 'Some scholars argue forward guidance can become a trap — that it constrains the Fed even when conditions change. Has that been your experience?',
        responses: [
          { label: 'Thoughtful', text: 'Forward guidance is a powerful tool, but it requires humility. We\'ve learned to frame guidance in terms of conditions, not calendar dates. That preserves flexibility.', hawkShift: 0, credibilityEffect: 4 },
          { label: 'Pragmatic', text: 'Any guidance has to be conditional on the outlook. We\'ve moved away from rigid commitments precisely because the economy doesn\'t follow a script.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Confident', text: 'Our guidance has been well-calibrated. Markets understand the conditionality, and our credibility allows us to adjust when warranted.', hawkShift: 0, credibilityEffect: 1 }
        ]
      }
    ],

    balance_sheet: [
      {
        id: 'bs_pace_question',
        condition: (gs) => gs.balanceSheet && gs.balanceSheet.currentPosture === 'reduce',
        question: 'You\'re continuing balance sheet runoff. At what point would the Committee slow the pace or stop altogether?',
        responses: [
          { label: 'Measured', text: 'We\'re watching reserve levels and money market conditions closely. When reserves approach ample — not scarce — levels, we\'ll taper the runoff.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Hawkish', text: 'The balance sheet is still far larger than necessary. We have considerable room to continue normalization at the current pace.', hawkShift: 1, credibilityEffect: 1 },
          { label: 'Dovish', text: 'We\'re being cautious about the pace. The 2019 repo market disruption taught us that reserve scarcity can arrive faster than expected.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'bs_dual_signal',
        condition: (gs) => {
          if (!gs.balanceSheet) return false;
          const rateDir = gs.rateHistory.length > 1 ? gs.rateHistory[gs.rateHistory.length - 1].decision : 0;
          const bsPosture = gs.balanceSheet.currentPosture;
          return (rateDir < 0 && bsPosture === 'reduce') || (rateDir > 0 && bsPosture === 'expand');
        },
        question: 'You\'re sending mixed signals with rates and the balance sheet pulling in opposite directions. Can you reconcile that?',
        responses: [
          { label: 'Strategic', text: 'The rate tool and the balance sheet serve different purposes. Rates target the policy stance while the balance sheet addresses market functioning and reserve levels. They can move independently.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Defensive', text: 'I understand the perception, but these are distinct instruments with distinct objectives. The Committee is comfortable with both settings.', hawkShift: 0, credibilityEffect: 0 },
          { label: 'Transparent', text: 'You\'re raising a fair point, and it\'s been debated within the Committee. There\'s a balance between normalizing the balance sheet and the appropriate policy rate stance.', hawkShift: 0, credibilityEffect: 3 }
        ]
      },
      {
        id: 'bs_size_question',
        condition: (gs) => gs.balanceSheet && gs.balanceSheet.totalAssets > 6000,
        question: 'The Fed\'s balance sheet is still enormous by historical standards. What\'s the right long-run size?',
        responses: [
          { label: 'Thoughtful', text: 'The floor system requires a larger balance sheet than pre-2008. The right size is where reserves are ample but not excessive — we\'ll know it when market signals tell us.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Ambitious', text: 'We aim to normalize fully. A smaller balance sheet reduces the Fed\'s footprint in financial markets and restores more normal market functioning.', hawkShift: 0.5, credibilityEffect: 1 },
          { label: 'Pragmatic', text: 'The economy has grown, demand for reserves has grown. The balance sheet will be larger than pre-crisis permanently — the question is how much larger.', hawkShift: -0.5, credibilityEffect: 2 }
        ]
      },
      {
        id: 'bs_qe_criticism',
        condition: (gs) => gs.balanceSheet && gs.balanceSheet.currentPosture === 'expand',
        question: 'Asset purchases pump liquidity directly into financial markets. Aren\'t you just inflating asset prices and worsening inequality?',
        responses: [
          { label: 'Defensive', text: 'Asset purchases work by lowering borrowing costs across the economy — mortgages, business investment, auto loans. The benefits extend well beyond financial markets.', hawkShift: -0.5, credibilityEffect: 1 },
          { label: 'Candid', text: 'There are distributional side effects to QE, and we take that criticism seriously. But the alternative — inaction during a severe downturn — would cause far greater harm to all households.', hawkShift: 0, credibilityEffect: 4 },
          { label: 'Technical', text: 'Our asset purchases target the term premium in longer-duration securities. The portfolio balance channel supports the recovery through lower real borrowing costs.', hawkShift: -0.5, credibilityEffect: 1 }
        ]
      },
      {
        id: 'bs_mbs_question',
        condition: (gs) => gs.balanceSheet,
        question: 'The Fed still holds substantial MBS from previous purchase programs. Should a central bank be involved in the mortgage market at all?',
        responses: [
          { label: 'Institutional', text: 'MBS purchases were an emergency tool deployed during the financial crisis and the pandemic. As we normalize, the share of MBS on our balance sheet is declining naturally through maturities.', hawkShift: 0, credibilityEffect: 2 },
          { label: 'Reform-minded', text: 'I share the concern. The Committee has discussed whether future asset purchases should be limited to Treasuries only. That\'s a discussion for the framework review.', hawkShift: 0, credibilityEffect: 3 },
          { label: 'Defensive', text: 'The housing market is systemically important. Stabilizing MBS markets during crises serves financial stability — a core Fed responsibility.', hawkShift: -0.5, credibilityEffect: 1 }
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
          const priority = cat === 'accountability' ? 5 : cat === 'balance_sheet' ? 4 : cat === 'market_impact' ? 3 : cat === 'communication' ? 2 : 1;
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
