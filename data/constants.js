// Game Constants - FOMC members, statement phrases, news headlines

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.statementPhrases = {
  economic: [
    { id: 'ec1', text: 'Economic activity has been expanding at a solid pace.', hawkScore: 1 },
    { id: 'ec2', text: 'Economic activity has been expanding at a moderate pace.', hawkScore: 0 },
    { id: 'ec3', text: 'Economic activity appears to be slowing.', hawkScore: -1 }
  ],
  labor: [
    { id: 'lb1', text: 'Job gains have remained strong.', hawkScore: 1 },
    { id: 'lb2', text: 'Job gains have remained low, with signs of stabilization.', hawkScore: 0 },
    { id: 'lb3', text: 'The labor market has shown signs of cooling.', hawkScore: -1 }
  ],
  inflation: [
    { id: 'in1', text: 'Inflation remains elevated and is a significant concern.', hawkScore: 2 },
    { id: 'in2', text: 'Inflation remains somewhat elevated.', hawkScore: 1 },
    { id: 'in3', text: 'Inflation has made meaningful progress toward 2 percent.', hawkScore: -1 }
  ],
  guidance: [
    { id: 'gd1', text: 'Further rate increases may be appropriate.', hawkScore: 3 },
    { id: 'gd2', text: 'The Committee will carefully assess incoming data.', hawkScore: 1 },
    { id: 'gd3', text: 'The Committee is prepared to adjust policy as appropriate.', hawkScore: -1 },
    { id: 'gd4', text: 'Further easing may be appropriate.', hawkScore: -2 }
  ]
};

window.FedChair.Data.boardOfGovernors = [
  { name: 'Jerome H. Powell', role: 'Chair', stance: 'Centrist' },
  { name: 'Philip N. Jefferson', role: 'Vice Chair', stance: 'Dovish' },
  { name: 'Michelle W. Bowman', role: 'Governor', stance: 'Hawkish' },
  { name: 'Michael S. Barr', role: 'Governor', stance: 'Dovish' },
  { name: 'Lisa D. Cook', role: 'Governor', stance: 'Dovish' },
  { name: 'Stephen I. Miran', role: 'Governor (term expired Mar 1 — serving until successor confirmed)', stance: 'Very Dovish' },
  { name: 'Christopher J. Waller', role: 'Governor', stance: 'Dovish' }
];

// Warsh era (meeting 3+): Powell departs, Warsh takes the chair
window.FedChair.Data.boardOfGovernorsWarshEra = [
  { name: 'Kevin Warsh', role: 'Chair', stance: 'Hawkish' },
  { name: 'Philip N. Jefferson', role: 'Vice Chair', stance: 'Dovish' },
  { name: 'Michelle W. Bowman', role: 'Governor', stance: 'Hawkish' },
  { name: 'Michael S. Barr', role: 'Governor', stance: 'Dovish' },
  { name: 'Lisa D. Cook', role: 'Governor', stance: 'Dovish' },
  { name: 'Stephen I. Miran', role: 'Governor (term expired Mar 1 — serving until successor confirmed)', stance: 'Very Dovish' },
  { name: 'Christopher J. Waller', role: 'Governor', stance: 'Dovish' }
];

window.FedChair.Data.regionalPresidents = [
  { name: 'John C. Williams', bank: 'New York', stance: 'Centrist' },
  { name: 'Beth M. Hammack', bank: 'Cleveland', stance: 'Hawkish' },
  { name: 'Patrick T. Harker', bank: 'Philadelphia', stance: 'Centrist' },
  { name: 'Lorie K. Logan', bank: 'Dallas', stance: 'Hawkish' },
  { name: 'Neel Kashkari', bank: 'Minneapolis', stance: 'Dovish' },
  { name: 'Anna Paulson', bank: 'Chicago', stance: 'Centrist' }
];

window.FedChair.Data.statementPhrasesExpanded = {

  economy: {
    label: 'ECONOMY',
    subcategories: [
      {
        id: 'econ-expanding',
        label: 'EXPANDING',
        stance: 'hawkish',
        phrases: [
          { id: 'e1', text: 'Economic activity has continued to expand at a solid pace, with broad-based gains across most sectors of the economy.' },
          { id: 'e2', text: 'Real GDP growth has exceeded the committee\'s expectations, and domestic demand remains robust despite tighter financial conditions.' },
          { id: 'e3', text: 'The economy continues to demonstrate considerable underlying momentum, supported by resilient consumer spending and strong business fixed investment.' },
          { id: 'e4', text: 'Recent indicators suggest that economic activity has been expanding at a pace above its longer-run trend, placing upward pressure on resource utilization.' },
          { id: 'e5', text: 'The committee observes that economic conditions remain favorable, with output growth running ahead of potential and financial conditions still accommodative on balance.' }
        ]
      },
      {
        id: 'econ-moderate',
        label: 'MODERATE',
        stance: 'neutral',
        phrases: [
          { id: 'e6', text: 'Economic activity has been expanding at a moderate pace, consistent with the committee\'s assessment of the economy\'s longer-run potential.' },
          { id: 'e7', text: 'Recent indicators suggest that growth has been proceeding at a measured pace, with some unevenness across sectors but no broad deterioration in conditions.' },
          { id: 'e8', text: 'The committee judges that economic activity is expanding at a rate broadly in line with potential, supporting continued progress toward the dual mandate.' },
          { id: 'e9', text: 'Available data indicate that the economy is growing at a sustainable pace, with neither the excesses that would warrant restraint nor the weakness that would call for accommodation.' },
          { id: 'e10', text: 'Growth in economic activity has been moderate on balance, consistent with a gradual return to full resource utilization over time.' }
        ]
      },
      {
        id: 'econ-slowing',
        label: 'SLOWING',
        stance: 'dovish',
        phrases: [
          { id: 'e11', text: 'Economic activity appears to have slowed from its earlier pace, and the committee is monitoring incoming data carefully for signs of broader weakness.' },
          { id: 'e12', text: 'Recent indicators point to a moderation in the pace of economic expansion, reflecting in part the effects of tighter financial conditions on interest-sensitive sectors.' },
          { id: 'e13', text: 'The committee notes that growth in economic activity has softened, and that risks to the outlook have become more pronounced than at the time of the previous meeting.' },
          { id: 'e14', text: 'Output growth has decelerated in recent quarters, and the committee will carefully assess whether this moderation is transitory or reflects more persistent headwinds.' },
          { id: 'e15', text: 'The pace of economic expansion has slowed, with weakness becoming more evident across a range of indicators, including consumer spending, business investment, and housing activity.' }
        ]
      }
    ]
  },

  labor: {
    label: 'LABOR MARKET',
    subcategories: [
      {
        id: 'labor-strong',
        label: 'STRONG',
        stance: 'hawkish',
        phrases: [
          { id: 'l1', text: 'Job gains have remained strong, and the unemployment rate has stayed at historically low levels, indicating that the labor market continues to operate near or beyond full employment.' },
          { id: 'l2', text: 'Labor market conditions remain exceptionally tight, with job openings continuing to substantially exceed the number of unemployed workers seeking positions.' },
          { id: 'l3', text: 'The labor market has continued to add jobs at a robust pace, and nominal wage growth, while showing some signs of moderation, remains elevated relative to levels consistent with price stability.' },
          { id: 'l4', text: 'Employment gains have been broad-based and sustained, and the committee judges that the labor market is at or beyond maximum employment as defined in its longer-run goals.' },
          { id: 'l5', text: 'Labor market tightness remains a primary concern, as elevated wage pressures and historically low unemployment continue to impart upside risk to the inflation outlook.' }
        ]
      },
      {
        id: 'labor-stable',
        label: 'STABLE',
        stance: 'neutral',
        phrases: [
          { id: 'l6', text: 'Job gains have remained solid, and the unemployment rate has changed little in recent months, suggesting that the labor market remains broadly in balance.' },
          { id: 'l7', text: 'Labor market conditions continue to be favorable, with steady job creation and an unemployment rate near the committee\'s assessment of its longer-run normal level.' },
          { id: 'l8', text: 'The labor market has shown resilience, with payroll employment growing at a pace sufficient to absorb new entrants to the workforce while keeping the unemployment rate relatively stable.' },
          { id: 'l9', text: 'Indicators of labor market activity suggest that conditions remain healthy, with hiring and separations data consistent with a labor market neither overheating nor deteriorating.' },
          { id: 'l10', text: 'Job gains have moderated to a more sustainable pace, and the unemployment rate has remained low, consistent with the committee\'s assessment of maximum employment.' }
        ]
      },
      {
        id: 'labor-cooling',
        label: 'COOLING',
        stance: 'dovish',
        phrases: [
          { id: 'l11', text: 'Job gains have slowed, and the unemployment rate has moved up somewhat, suggesting that the labor market is gradually coming into better balance.' },
          { id: 'l12', text: 'Labor market conditions have eased from their earlier tightness, with payroll growth moderating and the pace of wage increases showing signs of deceleration.' },
          { id: 'l13', text: 'The committee observes that the labor market, while still healthy, has shown signs of softening, with the unemployment rate rising and job openings declining from their peaks.' },
          { id: 'l14', text: 'Recent labor market data indicate some cooling in conditions, including slower payroll growth and a modest increase in unemployment claims, consistent with the lagged effects of monetary policy tightening.' },
          { id: 'l15', text: 'Labor demand has moderated, and the committee notes that continued softening in labor market conditions, if sustained, could weigh on consumer spending and overall economic activity.' }
        ]
      }
    ]
  },

  inflation: {
    label: 'INFLATION',
    subcategories: [
      {
        id: 'inflation-elevated',
        label: 'ELEVATED',
        stance: 'hawkish',
        phrases: [
          { id: 'i1', text: 'Inflation remains elevated relative to the committee\'s 2 percent longer-run objective, and the committee remains firmly committed to returning inflation to that level over time.' },
          { id: 'i2', text: 'Price pressures have proven more persistent than anticipated, and core inflation continues to run at levels that the committee judges to be inconsistent with price stability.' },
          { id: 'i3', text: 'The committee is acutely aware that high inflation imposes significant hardship on households, particularly those with limited means to absorb higher costs, and is resolved to restore price stability.' },
          { id: 'i4', text: 'Inflation is running well above 2 percent across a broad range of goods and services, and the committee\'s primary concern at this time is restoring price stability without undue delay.' },
          { id: 'i5', text: 'Core PCE inflation remains materially above the committee\'s objective, and without sustained evidence of meaningful disinflation, the committee judges that policy must remain restrictive.' }
        ]
      },
      {
        id: 'inflation-progress',
        label: 'PROGRESS',
        stance: 'neutral',
        phrases: [
          { id: 'i6', text: 'Inflation has eased over the past year but remains somewhat elevated. The committee judges that inflation is on a path toward 2 percent, though progress has been uneven.' },
          { id: 'i7', text: 'The disinflation process has continued, with both headline and core measures moving lower, though the committee requires greater confidence that inflation is moving sustainably toward 2 percent.' },
          { id: 'i8', text: 'Price pressures have moderated appreciably from their peaks, and the committee views the progress made on inflation as meaningful, while remaining alert to the risk of a stalling of this progress.' },
          { id: 'i9', text: 'Inflation has declined substantially but remains above the committee\'s longer-run goal. The committee will need to see continued progress before adjusting the stance of policy.' },
          { id: 'i10', text: 'Recent data suggest that inflation is continuing to move in the right direction, though the committee notes that services inflation remains sticky and warrants careful monitoring.' }
        ]
      },
      {
        id: 'inflation-contained',
        label: 'CONTAINED',
        stance: 'dovish',
        phrases: [
          { id: 'i11', text: 'Inflation has returned to levels broadly consistent with the committee\'s 2 percent objective, and longer-term inflation expectations remain well anchored.' },
          { id: 'i12', text: 'Price pressures have abated substantially, and the committee judges that inflation, on a sustained basis, is approaching levels consistent with price stability.' },
          { id: 'i13', text: 'The committee observes that inflation has declined significantly and that the balance of risks has shifted such that downside risks to employment now warrant consideration alongside inflation risks.' },
          { id: 'i14', text: 'With inflation having moved closer to 2 percent and the labor market showing signs of cooling, the committee judges that the restrictiveness of policy may now exceed what is required to restore price stability.' },
          { id: 'i15', text: 'Inflation expectations remain well anchored at longer horizons, and recent data have given the committee increasing confidence that inflation is on a sustainable path to 2 percent.' }
        ]
      }
    ]
  },

  guidance: {
    label: 'FORWARD GUIDANCE',
    subcategories: [
      {
        id: 'guidance-restrictive',
        label: 'HOLD RESTRICTIVE',
        stance: 'hawkish',
        phrases: [
          { id: 'g1', text: 'The committee judges that the current stance of monetary policy is appropriately restrictive and intends to maintain this posture until inflation has returned sustainably to 2 percent.' },
          { id: 'g2', text: 'In considering any future adjustments to the target range, the committee will require substantially more evidence that inflation is on a durable path to the objective before reducing policy restraint.' },
          { id: 'g3', text: 'The committee is prepared to maintain a restrictive stance of monetary policy for as long as necessary to ensure that inflation returns to its 2 percent objective on a sustained basis.' },
          { id: 'g4', text: 'Policy will remain restrictive until the cumulative evidence across inflation, labor market, and activity data gives the committee confidence that the objectives of the dual mandate are being met.' },
          { id: 'g5', text: 'The committee does not anticipate that it will be appropriate to reduce the target range until it has gained greater confidence that inflation is moving sustainably toward 2 percent.' }
        ]
      },
      {
        id: 'guidance-dependent',
        label: 'DATA DEPENDENT',
        stance: 'neutral',
        phrases: [
          { id: 'g6', text: 'The committee will continue to assess additional information and its implications for monetary policy, and will adjust the stance of policy as appropriate to achieve its dual mandate objectives.' },
          { id: 'g7', text: 'In determining the extent of any future policy adjustments, the committee will carefully assess incoming data, the evolving outlook, and the balance of risks.' },
          { id: 'g8', text: 'The committee remains prepared to adjust the stance of monetary policy as warranted by incoming economic data, emphasizing that no decision has been predetermined and that all options remain available.' },
          { id: 'g9', text: 'Future policy decisions will be made on a meeting-by-meeting basis, taking into account the totality of incoming data and the committee\'s evolving assessment of the economic outlook.' },
          { id: 'g10', text: 'The appropriate path for monetary policy will depend on the evolution of the economy, and the committee will respond to changes in the data with neither a predetermined course of action nor undue inertia.' }
        ]
      },
      {
        id: 'guidance-easing',
        label: 'SIGNAL EASING',
        stance: 'dovish',
        phrases: [
          { id: 'g11', text: 'With inflation having eased and labor market conditions having softened, the committee judges that the risks to achieving its dual mandate goals are now more balanced, and that a less restrictive stance may be warranted.' },
          { id: 'g12', text: 'The committee believes that policy is well positioned to respond to any unexpected weakening in economic conditions, and stands ready to adjust the stance of policy promptly if warranted.' },
          { id: 'g13', text: 'In light of the progress on inflation and the moderation in labor market conditions, the committee will carefully consider the timing and pace of further adjustments to reduce the restrictiveness of policy.' },
          { id: 'g14', text: 'The committee acknowledges that maintaining an overly restrictive stance for too long poses its own risks to the employment mandate, and will weigh these risks carefully in its upcoming deliberations.' },
          { id: 'g15', text: 'The committee notes that the real federal funds rate has risen as inflation has declined, implying that policy has become more restrictive in real terms, which may warrant recalibration over coming meetings.' }
        ]
      }
    ]
  },

  risks: {
    label: 'RISK BALANCE',
    subcategories: [
      {
        id: 'risks-upside',
        label: 'UPSIDE RISKS',
        stance: 'hawkish',
        phrases: [
          { id: 'r1', text: 'The committee judges that the risks to achieving its inflation objective are weighted to the upside, given persistent price pressures and a labor market that remains tight.' },
          { id: 'r2', text: 'Upside risks to inflation remain salient, including the possibility that inflation expectations could become unanchored or that supply-side improvements prove less durable than anticipated.' },
          { id: 'r3', text: 'The committee is attentive to the risk that inflation could re-accelerate if policy is eased prematurely, and will require sustained evidence of disinflation before reducing the degree of policy restraint.' },
          { id: 'r4', text: 'In the committee\'s assessment, the greater risk at this time is that easing policy too quickly could allow inflation to become entrenched, undermining the credibility of the 2 percent objective.' },
          { id: 'r5', text: 'The committee sees the balance of risks as tilted toward higher inflation, reflecting ongoing strength in domestic demand and the possibility that further supply normalization may be limited.' }
        ]
      },
      {
        id: 'risks-balanced',
        label: 'BALANCED',
        stance: 'neutral',
        phrases: [
          { id: 'r6', text: 'The committee sees the risks to achieving its employment and inflation objectives as roughly in balance, and will remain attentive to both sides of its dual mandate.' },
          { id: 'r7', text: 'In the committee\'s judgment, the risks to the dual mandate are broadly balanced, though the committee remains vigilant and will adjust its assessment as new information becomes available.' },
          { id: 'r8', text: 'The committee notes that both upside risks to inflation and downside risks to employment warrant careful monitoring, and that policy remains appropriately positioned to address either contingency.' },
          { id: 'r9', text: 'Uncertainty around the economic outlook remains elevated, and the committee judges that a balanced assessment of risks to both maximum employment and price stability argues for a cautious policy posture.' },
          { id: 'r10', text: 'The committee sees risks to the economic outlook as two-sided, and remains prepared to respond to developments that could cause the economy to deviate materially from the committee\'s baseline projection.' }
        ]
      },
      {
        id: 'risks-downside',
        label: 'DOWNSIDE RISKS',
        stance: 'dovish',
        phrases: [
          { id: 'r11', text: 'The committee judges that the risks to achieving its employment objective have increased, and that the downside risks to economic activity now warrant greater weight in the committee\'s deliberations.' },
          { id: 'r12', text: 'Downside risks to the outlook have become more prominent, including the possibility that the cumulative tightening of monetary policy could weigh more heavily on activity than anticipated.' },
          { id: 'r13', text: 'The committee is mindful that maintaining policy that is more restrictive than necessary poses risks to the employment side of its mandate, and will weigh this consideration carefully going forward.' },
          { id: 'r14', text: 'In the committee\'s assessment, the balance of risks has shifted, with risks of undershooting the employment mandate now more material than the risk of failing to achieve price stability.' },
          { id: 'r15', text: 'The committee notes that tightening financial conditions and slowing global growth represent meaningful headwinds, and that the downside risks to the domestic outlook have become more significant.' }
        ]
      }
    ]
  }

};

window.FedChair.Data.pressConferenceQuestions = {

  // ─── CATEGORY 1: DATA CHALLENGE ───────────────────────────────────────────
  dataChallenge: {
    label: 'DATA CHALLENGE',
    variants: [
      {
        id: 'dc-hold-high-inflation',
        conditions: { onHold: true, onHighInflation: true },
        journalist: 'Reuters financial correspondent',
        question: 'Chair, core PCE is running at {corePCE}% — well above your 2% target — and yet the committee chose to hold today. Aren\'t you falling behind the curve?',
        responses: [
          {
            id: 'dc1r1', label: 'Stand Firm',
            text: 'The committee\'s assessment is that the current stance of policy is sufficiently restrictive to return inflation to 2% over time. We are not behind the curve — we are exercising the patience that durable disinflation requires.',
            credibilityImpact: 'positive',
            educationalNote: 'Confident, measured pushback signals the committee has a clear framework. Markets interpret this as policy credibility — the Fed knows what it\'s doing and won\'t be pressured.'
          },
          {
            id: 'dc1r2', label: 'Acknowledge Tension',
            text: 'That is a fair characterization of the tension the committee is navigating. We are balancing the risk of easing prematurely against the risk of unnecessary damage to employment. Today\'s decision reflects that balance.',
            credibilityImpact: 'neutral',
            educationalNote: 'Acknowledging a difficult tradeoff is honest, but it can signal uncertainty. Markets may read this as the committee lacking conviction in its own framework.'
          },
          {
            id: 'dc1r3', label: 'Open the Door',
            text: 'The committee is watching the inflation data very carefully, and I would not want to prejudge what future meetings may require. We are prepared to act if the data warrant.',
            credibilityImpact: 'negative',
            educationalNote: 'Vague forward guidance after a hold while inflation is high can unsettle markets. It suggests the committee may not have a firm view — which erodes the credibility of the hold itself.'
          }
        ]
      },
      {
        id: 'dc-hike-weak-jobs',
        conditions: { onHike: true, onHighUnemployment: true },
        journalist: 'Wall Street Journal economics reporter',
        question: 'Chair, unemployment has risen to {unemployment}% and payrolls have been softening. Given those conditions, how does the committee justify raising rates today?',
        responses: [
          {
            id: 'dc2r1', label: 'Inflation Mandate First',
            text: 'The committee\'s primary concern at this time is restoring price stability. Experience teaches us that allowing inflation to become entrenched ultimately causes greater damage to employment than the temporary restraint we are applying today.',
            credibilityImpact: 'positive',
            educationalNote: 'Invoking the long-run cost of inflation is the classic Volcker defense. It signals the committee has a theory of the case and is willing to accept short-term pain for long-term stability.'
          },
          {
            id: 'dc2r2', label: 'Labor Market Still Healthy',
            text: 'While we have seen some moderation in labor market conditions, the committee judges that the labor market remains solid overall. The level of unemployment, in our view, remains consistent with our maximum employment objective.',
            credibilityImpact: 'neutral',
            educationalNote: 'Reframing softer data as "moderation from tight conditions" is technically accurate but can seem dismissive. The market will watch future payroll data closely to test this assertion.'
          },
          {
            id: 'dc2r3', label: 'Express Concern',
            text: 'The committee is attentive to the softening in labor market conditions, and I want to be clear that we take the employment side of our mandate seriously. Today\'s decision was not made lightly.',
            credibilityImpact: 'negative',
            educationalNote: 'Expressing concern about the very thing your policy is arguably worsening undercuts the case for the hike. It can signal that the committee is conflicted — which is worse than being wrong.'
          }
        ]
      },
      {
        id: 'dc-cut-inflation-sticky',
        conditions: { onCut: true, onHighInflation: true },
        journalist: 'Bloomberg News Fed watcher',
        question: 'Chair, you\'ve cut rates today but core PCE is still at {corePCE}%. Some economists are calling this a policy mistake. What do you say to them?',
        responses: [
          {
            id: 'dc3r1', label: 'Confident in the Call',
            text: 'The committee\'s judgment is that inflation is on a sustainable path to 2%, and that the balance of risks now warrants a modest recalibration of policy. We are not declaring victory — we are making a careful adjustment.',
            credibilityImpact: 'positive',
            educationalNote: '"Recalibration" rather than "easing" is deliberate Fed communication strategy — it signals a small, conditional adjustment rather than the start of a cutting cycle.'
          },
          {
            id: 'dc3r2', label: 'Point to the Trend',
            text: 'The level of inflation is higher than we would like, but the direction is what matters most to the committee. The trend in core PCE has been consistently downward, and our models suggest this will continue.',
            credibilityImpact: 'neutral',
            educationalNote: 'Emphasizing trend over level is a legitimate argument but leaves the Fed exposed if inflation reaccelerates. Markets will mark this call carefully.'
          },
          {
            id: 'dc3r3', label: 'Hedge Extensively',
            text: 'The committee recognizes the risk inherent in today\'s decision, and I want to be clear that we remain highly attentive to inflation. If we see evidence that today\'s adjustment was premature, we will not hesitate to reverse course.',
            credibilityImpact: 'negative',
            educationalNote: 'Preemptively talking about reversing a decision you just made is a significant credibility cost. It signals the committee lacks confidence in its own call.'
          }
        ]
      },
      {
        id: 'dc-large-move',
        conditions: { onLargeMove: true },
        journalist: 'Financial Times US economics editor',
        question: 'Chair, a {moveSize} basis point move is well outside the committee\'s typical cadence of 25 basis points. What drove the decision to act so aggressively, and what does it say about the committee\'s assessment of conditions?',
        responses: [
          {
            id: 'dc4r1', label: 'Decisive Action',
            text: 'The committee determined that economic conditions warranted a more decisive response than a standard adjustment would provide. We did not make this decision lightly, but we are prepared to act with appropriate force when circumstances demand it.',
            credibilityImpact: 'positive',
            educationalNote: 'Large moves can project decisiveness if framed as a response to exceptional conditions. The risk is that they can also signal panic — the framing here matters enormously.'
          },
          {
            id: 'dc4r2', label: 'Data Driven',
            text: 'The size of today\'s adjustment reflects the committee\'s assessment of the data, which has evolved materially since our last meeting. We follow the data — and today the data argued for a larger response.',
            credibilityImpact: 'neutral',
            educationalNote: 'Attributing a large move to data evolution is defensible but invites follow-up questions about why the committee was surprised. Good if the data genuinely shifted; weak if the move looks reactive.'
          },
          {
            id: 'dc4r3', label: 'Minimize the Move',
            text: 'I would caution against reading too much into the size of today\'s adjustment. The committee evaluates each meeting on its own merits, and today\'s decision should not be taken as a signal about the pace of future moves.',
            credibilityImpact: 'negative',
            educationalNote: 'Trying to downplay a large move after the fact rarely works. Markets have already priced the signal — walking it back creates confusion rather than calm.'
          }
        ]
      },
      {
        id: 'dc-hold-default',
        conditions: { default: true, onHold: true },
        journalist: 'Associated Press economics correspondent',
        question: 'Chair, markets had priced in roughly even odds of a move today. The committee held. What would it take for the committee to act at the next meeting?',
        responses: [
          {
            id: 'dc5r1', label: 'Set Clear Conditions',
            text: 'The committee will be looking for continued progress on inflation, stability in labor market conditions, and confirmation that the economic outlook is evolving as anticipated. We are not in a rush, but we are not passive either.',
            credibilityImpact: 'positive',
            educationalNote: 'Articulating conditions for action — without committing to a timeline — is the ideal form of data-dependent communication. It guides expectations without binding the committee.'
          },
          {
            id: 'dc5r2', label: 'Remain Vague',
            text: 'The committee will continue to assess the totality of incoming data and will act when the time is right. I don\'t want to get ahead of that assessment today.',
            credibilityImpact: 'neutral',
            educationalNote: '"Totality of data" is the Fed\'s favorite hedge. It\'s honest but can frustrate markets looking for guidance — and overuse of this phrase reduces its signaling power.'
          },
          {
            id: 'dc5r3', label: 'Signal Urgency',
            text: 'The committee is very close to the conditions it needs to see. A few more months of data in the same direction could well be sufficient.',
            credibilityImpact: 'negative',
            educationalNote: 'Signaling urgency while holding can create whipsaw expectations. If conditions don\'t cooperate and you don\'t move at the next meeting, credibility suffers significantly.'
          }
        ]
      }
    ]
  },

  // ─── CATEGORY 2: FORWARD GUIDANCE ─────────────────────────────────────────
  forwardGuidance: {
    label: 'FORWARD GUIDANCE',
    variants: [
      {
        id: 'fg-dot-plot',
        conditions: { default: true },
        journalist: 'CNBC anchor',
        question: 'Chair, your dot plot suggests the committee sees {dotImplied} cuts by year end, but market pricing implies a more aggressive path. Who\'s right — the committee or the market?',
        responses: [
          {
            id: 'fg1r1', label: 'Defend the Dots',
            text: 'The committee\'s projections reflect our best assessment of the likely path of policy given our economic outlook. Markets may have a different view of how conditions will evolve, and time will tell whose forecast is more accurate.',
            credibilityImpact: 'positive',
            educationalNote: 'Defending the dot plot without being dismissive of markets is exactly right — it asserts the committee\'s independence while acknowledging legitimate uncertainty.'
          },
          {
            id: 'fg1r2', label: 'Acknowledge Divergence',
            text: 'There is clearly a difference in views between the committee and market participants at this time. We take market pricing seriously as one input into our assessment, but our projections are based on our own economic models and judgment.',
            credibilityImpact: 'neutral',
            educationalNote: 'When the Fed and market pricing diverge sharply, one of them will be wrong. This response hedges without resolving the tension — which may be honest, but can prolong uncertainty.'
          },
          {
            id: 'fg1r3', label: 'Defer to Markets',
            text: 'Markets have a great deal of information embedded in their pricing, and the committee takes that signal seriously. I wouldn\'t dismiss the market\'s view.',
            credibilityImpact: 'negative',
            educationalNote: 'A Fed Chair should never appear to be taking cues from markets — it inverts the relationship. The Fed leads financial conditions; it does not follow them.'
          }
        ]
      },
      {
        id: 'fg-higher-longer',
        conditions: { onHold: true, onHighInflation: true },
        journalist: 'New York Times economics reporter',
        question: 'Chair, how long is the committee prepared to hold rates at current levels? Is "higher for longer" still the operating framework?',
        responses: [
          {
            id: 'fg2r1', label: 'Affirm the Framework',
            text: 'The committee\'s view is that policy needs to remain restrictive until we have gained sufficient confidence that inflation is on a durable path to 2%. That timeline will be determined by the data, not by the calendar.',
            credibilityImpact: 'positive',
            educationalNote: 'Tying duration to data rather than calendar time is the correct formulation — it makes the commitment credible without creating a hostage to fortune.'
          },
          {
            id: 'fg2r2', label: 'Leave Options Open',
            text: 'The committee doesn\'t think in terms of labels like "higher for longer." We think in terms of what the data require. Our posture at any given meeting will reflect the economic conditions prevailing at that time.',
            credibilityImpact: 'neutral',
            educationalNote: 'Refusing the "higher for longer" framing can seem evasive. It\'s technically accurate but may be read as the committee creating wiggle room to pivot sooner than expected.'
          },
          {
            id: 'fg2r3', label: 'Hint at Cuts',
            text: 'The committee is certainly aware that maintaining a restrictive stance for longer than necessary carries its own risks. We will be watching for the right moment to begin adjusting policy.',
            credibilityImpact: 'negative',
            educationalNote: 'Hinting at cuts while inflation is still elevated is a significant credibility risk. It can cause financial conditions to ease prematurely, potentially re-igniting inflation.'
          }
        ]
      },
      {
        id: 'fg-late-game',
        conditions: { onLate: true },
        journalist: 'Politico economics correspondent',
        question: 'Chair, with only {remainingMeetings} meetings left in this campaign, how does the committee\'s sense of urgency change as the end of the term approaches?',
        responses: [
          {
            id: 'fg3r1', label: 'Each Meeting Stands Alone',
            text: 'The committee\'s decisions are made on the merits of the economic data at each meeting. The number of meetings remaining in any given period does not factor into our policy calculus.',
            credibilityImpact: 'positive',
            educationalNote: 'Rejecting time-horizon framing is correct — the Fed shouldn\'t be rushing to complete an agenda. This response reinforces the committee\'s data-dependence and independence.'
          },
          {
            id: 'fg3r2', label: 'Acknowledge the Timeline',
            text: 'We are aware that the economic cycle has its own dynamics, and the committee is committed to making as much progress as possible toward our goals while conditions permit.',
            credibilityImpact: 'neutral',
            educationalNote: 'Vaguely acknowledging the timeline without committing to action is a soft hedge. It neither reassures nor alarms — a low-impact response.'
          },
          {
            id: 'fg3r3', label: 'Signal Urgency',
            text: 'The committee is keenly aware of where we are in the cycle, and there is a shared sense that we should make the most of the current environment to complete the work of bringing inflation durably to 2%.',
            credibilityImpact: 'negative',
            educationalNote: 'Expressing urgency tied to a timeline rather than the data can look like the committee is trying to rush to a conclusion — which undermines the credibility of any actions taken.'
          }
        ]
      }
    ]
  },

  // ─── CATEGORY 3: POLITICAL / INDEPENDENCE ─────────────────────────────────
  political: {
    label: 'POLITICAL',
    variants: [
      {
        id: 'pol-transition',
        conditions: { onTransition: true },
        journalist: 'Washington Post political reporter',
        question: 'Chair Warsh, you are taking over at a moment of significant political pressure on the Fed. How do you intend to preserve the institution\'s independence?',
        responses: [
          {
            id: 'pol1r1', label: 'Assert Independence',
            text: 'The Federal Reserve\'s independence is not a courtesy extended by any administration — it is a statutory reality rooted in the Federal Reserve Act. The committee will make every decision based solely on our mandate and the data. Full stop.',
            credibilityImpact: 'positive',
            educationalNote: 'Citing statutory independence rather than just asserting it is a stronger move — it grounds the claim in law rather than personality. This response projects institutional confidence.'
          },
          {
            id: 'pol1r2', label: 'Acknowledge and Deflect',
            text: 'The committee is always aware of the political environment, but I can assure you that it does not influence our deliberations. Our focus is on price stability and maximum employment.',
            credibilityImpact: 'neutral',
            educationalNote: 'Acknowledging political pressure while deflecting it is honest but creates ambiguity. Markets wonder why you acknowledged it at all if it truly doesn\'t matter.'
          },
          {
            id: 'pol1r3', label: 'Too Conciliatory',
            text: 'The committee values its constructive relationship with the administration and believes that open dialogue serves the public interest. We will always act within our mandate while being mindful of the broader policy context.',
            credibilityImpact: 'negative',
            educationalNote: 'Emphasizing a "constructive relationship" with the administration is the worst answer to an independence question. It suggests the Fed is at least partially deferential to political priorities.'
          }
        ]
      },
      {
        id: 'pol-pressure-default',
        conditions: { default: true },
        journalist: 'NPR economics correspondent',
        question: 'Chair, there has been significant public commentary from political figures about what the Fed should do. Does that commentary influence the committee\'s deliberations in any way?',
        responses: [
          {
            id: 'pol2r1', label: 'Firm Rejection',
            text: 'It does not. The committee\'s deliberations are grounded entirely in the economic data and our assessment of how best to achieve our statutory mandate. External commentary — whatever its source — is not a factor in those deliberations.',
            credibilityImpact: 'positive',
            educationalNote: 'A clear, unambiguous rejection of political influence is the only acceptable answer. Any hedging here destroys the credibility of the response — and of the institution.'
          },
          {
            id: 'pol2r2', label: 'Soften the Rejection',
            text: 'The committee is always listening to a wide range of perspectives on the economy, including from policymakers. But our decisions are made independently based on our assessment of the data.',
            credibilityImpact: 'neutral',
            educationalNote: 'Framing political commentary as just "one of many perspectives" is a subtle mistake — it puts elected officials on the same footing as economists and market participants. Avoid the equivalence.'
          },
          {
            id: 'pol2r3', label: 'Engage the Substance',
            text: 'The committee takes seriously the concerns that have been raised about the impact of monetary policy on the broader economy. We believe our current approach appropriately balances those concerns.',
            credibilityImpact: 'negative',
            educationalNote: 'Engaging with the substance of political criticism implicitly validates it. The Fed Chair should never appear to be adjusting policy in response to political pressure — even obliquely.'
          }
        ]
      },
      {
        id: 'pol-low-credibility',
        conditions: { onLowCredibility: true },
        journalist: 'Fox Business Network anchor',
        question: 'Chair, critics argue the Fed has been inconsistent — changing course repeatedly and surprising markets. Has the committee lost credibility, and how do you plan to rebuild it?',
        responses: [
          {
            id: 'pol3r1', label: 'Own the Difficulty',
            text: 'Monetary policy is conducted in real time with imperfect information, and the committee has had to adjust its views as the data evolved. That is not inconsistency — that is the appropriate response to an uncertain and rapidly changing environment.',
            credibilityImpact: 'positive',
            educationalNote: 'Reframing pivots as "data responsiveness" rather than inconsistency is the right move. Acknowledging difficulty while defending the process is more credible than denying any missteps.'
          },
          {
            id: 'pol3r2', label: 'Deflect the Premise',
            text: 'I would push back on the characterization. The committee has consistently pursued its mandate, even as the economic landscape has shifted significantly. Markets may not always agree with our decisions, but that does not mean we lack a framework.',
            credibilityImpact: 'neutral',
            educationalNote: 'Pushing back on the question is legitimate but can seem defensive. Works best if the criticism is actually unfair; looks evasive if the committee genuinely has been inconsistent.'
          },
          {
            id: 'pol3r3', label: 'Concede the Point',
            text: 'The committee acknowledges that our communication could have been clearer at certain junctures, and we are committed to improving the predictability and transparency of our policy process going forward.',
            credibilityImpact: 'negative',
            educationalNote: 'Conceding a credibility loss in a press conference setting is dangerous — it becomes the headline. Better to defend the process while acknowledging the difficulty of the environment.'
          }
        ]
      }
    ]
  },

  // ─── CATEGORY 4: MARKET IMPACT ────────────────────────────────────────────
  marketImpact: {
    label: 'MARKET IMPACT',
    variants: [
      {
        id: 'mi-market-surprise',
        conditions: { default: true },
        journalist: 'CNBC markets correspondent',
        question: 'Chair, equities sold off sharply following your decision today. Does the market reaction concern the committee, and does it factor into your policy thinking?',
        responses: [
          {
            id: 'mi1r1', label: 'Markets Follow Policy',
            text: 'The committee sets monetary policy to achieve price stability and maximum employment — not to target any particular level of asset prices. Market volatility in response to policy decisions is a normal feature of how monetary transmission works.',
            credibilityImpact: 'positive',
            educationalNote: 'Asserting that asset prices are a byproduct of policy — not a target — is correct and important. A Fed Chair who appears to be managing markets rather than the economy loses credibility fast.'
          },
          {
            id: 'mi1r2', label: 'Monitor Conditions',
            text: 'The committee monitors financial conditions broadly, and significant market moves are one input into our assessment of how policy is transmitting to the economy. We will watch the data carefully in the days ahead.',
            credibilityImpact: 'neutral',
            educationalNote: 'Saying you "monitor" markets is acceptable — the Fed genuinely does. But it can be read as leaving the door open to a policy reversal if markets fall hard enough. Use with care.'
          },
          {
            id: 'mi1r3', label: 'Express Concern',
            text: 'The committee is certainly aware of the market reaction, and we take it seriously as a signal about how today\'s decision was received. We will factor that into our assessment going forward.',
            credibilityImpact: 'negative',
            educationalNote: 'Saying you\'ll factor a market selloff into future assessments is tantamount to admitting the market has a veto over your policy. This is a significant credibility error.'
          }
        ]
      },
      {
        id: 'mi-financial-conditions',
        conditions: { onCut: true },
        journalist: 'Barron\'s senior editor',
        question: 'Chair, financial conditions have eased substantially since you began this rate cutting cycle. Aren\'t you at risk of re-igniting the very inflation you worked so hard to suppress?',
        responses: [
          {
            id: 'mi2r1', label: 'Distinguish Real from Nominal',
            text: 'The committee monitors financial conditions carefully, but I would note that even with today\'s adjustment, the real federal funds rate remains meaningfully positive. Policy is still restraining aggregate demand — just somewhat less than before.',
            credibilityImpact: 'positive',
            educationalNote: 'Real vs. nominal rate framing is the correct technical argument. If the real rate is still positive after a cut, policy is still restrictive — which defuses the re-ignition concern.'
          },
          {
            id: 'mi2r2', label: 'Acknowledge the Risk',
            text: 'The committee is attentive to the risk of easing financial conditions prematurely, which is why we are proceeding carefully and remain data-dependent at each step.',
            credibilityImpact: 'neutral',
            educationalNote: 'Acknowledging the risk while citing data-dependence is a standard hedge. It doesn\'t resolve the tension but signals the committee is watching the right things.'
          },
          {
            id: 'mi2r3', label: 'Minimize the Risk',
            text: 'I don\'t believe the easing in financial conditions we have seen poses a material inflation risk at this time. The economy is in a different place than it was when inflation was at its peak.',
            credibilityImpact: 'negative',
            educationalNote: 'Dismissing an inflation risk while cutting rates is bold — and leaves you exposed if inflation reaccelerates. The phrase "at this time" is an implicit hedge, but it may not be enough.'
          }
        ]
      }
    ]
  },

  // ─── CATEGORY 5: COMMUNICATION / CONSISTENCY ──────────────────────────────
  communication: {
    label: 'COMMUNICATION',
    variants: [
      {
        id: 'comm-dot-deviation',
        conditions: { default: true },
        journalist: 'The Economist US bureau chief',
        question: 'Chair, at your last meeting your dot plot projected a different path than what the committee delivered today. How do you explain the deviation, and what should markets take from that about the reliability of dot plot guidance?',
        responses: [
          {
            id: 'comm1r1', label: 'Data Changed the Calculus',
            text: 'The dot plot reflects the committee\'s best assessment of the likely policy path given the outlook at a point in time. The data we received between meetings changed that outlook materially, and the committee responded accordingly. That is data dependence working as intended.',
            credibilityImpact: 'positive',
            educationalNote: 'Explaining dot plot deviations as responses to new data is the cleanest defense — and it reinforces the correct message that the dot plot is a forecast, not a commitment.'
          },
          {
            id: 'comm1r2', label: 'Reframe the Dot Plot',
            text: 'I want to caution against treating the dot plot as a promise. It is a snapshot of individual committee members\' views at a particular time, not a commitment to any particular course of action. The committee always reserves the right to respond to new information.',
            credibilityImpact: 'neutral',
            educationalNote: 'This framing is technically correct but can backfire — if markets can\'t trust the dot plot as a signal, they lose a valuable communication tool. Overuse of this disclaimer reduces the dot plot\'s value.'
          },
          {
            id: 'comm1r3', label: 'Apologize for Confusion',
            text: 'The committee acknowledges that the deviation between our projected path and today\'s decision may have caused confusion, and we are committed to improving the clarity of our forward guidance going forward.',
            credibilityImpact: 'negative',
            educationalNote: 'Apologizing for a policy decision in a press conference is almost never right. It frames the deviation as a mistake rather than a rational response to new information — and invites more criticism.'
          }
        ]
      },
      {
        id: 'comm-statement-language',
        conditions: { onEarly: true },
        journalist: 'Axios markets reporter',
        question: 'Chair, the committee\'s statement today changed the language around inflation from "elevated" to "somewhat elevated." Is that a deliberate signal, or just editing?',
        responses: [
          {
            id: 'comm2r1', label: 'Every Word Is Deliberate',
            text: 'Every word in the FOMC statement is deliberate and carefully considered by the full committee. Changes in language between meetings are intended to reflect the committee\'s evolving assessment of conditions. I would encourage close reading of the statement.',
            credibilityImpact: 'positive',
            educationalNote: 'This answer teaches the player — and the market — to read the statement carefully. It confirms that language changes are meaningful signals, which enhances the Fed\'s communication toolkit.'
          },
          {
            id: 'comm2r2', label: 'Downplay the Change',
            text: 'I wouldn\'t read too much into specific word choices. The committee is trying to describe conditions accurately, and the language will naturally evolve as conditions evolve.',
            credibilityImpact: 'neutral',
            educationalNote: 'Downplaying a language change after confirming that every word is deliberate creates a contradiction. Markets will draw their own conclusions — and they\'ll probably read the change as significant regardless.'
          },
          {
            id: 'comm2r3', label: 'Confirm the Signal',
            text: 'Yes, that change is intentional and does reflect the committee\'s view that inflation has moderated from where it was. We felt it was important to update the language to reflect current conditions.',
            credibilityImpact: 'negative',
            educationalNote: 'Confirming a dovish language change too explicitly can trigger an outsized market rally in risk assets — easing financial conditions more than intended. Fed Chairs often let the language speak for itself.'
          }
        ]
      },
      {
        id: 'comm-high-credibility',
        conditions: { onHighCredibility: true },
        journalist: 'Harvard economics professor turned commentator',
        question: 'Chair, you\'ve managed to maintain strong credibility through a difficult cycle. What has the committee done right, and what lessons do you draw from this period?',
        responses: [
          {
            id: 'comm3r1', label: 'Credit the Framework',
            text: 'I would attribute whatever success we\'ve had to the committee\'s commitment to its framework — clear objectives, transparent communication, and a willingness to act decisively when the data required. The framework works when you trust it.',
            credibilityImpact: 'positive',
            educationalNote: 'Crediting the framework rather than individual judgment is the right institutional answer. It reinforces the Fed\'s commitment to rule-based policymaking over discretionary decisions.'
          },
          {
            id: 'comm3r2', label: 'Stay Humble',
            text: 'I\'m cautious about drawing too many lessons while we\'re still in the middle of the process. I would rather wait until we can assess the full arc of this period with the benefit of hindsight.',
            credibilityImpact: 'neutral',
            educationalNote: 'Epistemic humility is generally good — but in this context, declining to claim credit might seem like false modesty. A brief acknowledgment of what went right is appropriate.'
          },
          {
            id: 'comm3r3', label: 'Take Personal Credit',
            text: 'I think the committee has benefited from strong, consistent leadership and a clear vision for what needed to be done. There were moments when the path forward was not obvious, and having a firm hand at the wheel made a difference.',
            credibilityImpact: 'negative',
            educationalNote: 'A Fed Chair who takes personal credit for outcomes is violating the collegial norms of the institution. The committee speaks collectively — and individual hubris is remembered when things go wrong.'
          }
        ]
      }
    ]
  }

};

window.FedChair.Data.learnTerms = {

  'Federal Funds Rate': {
    title: 'Federal Funds Rate',
    plain: 'The interest rate at which banks lend money to each other overnight. It\'s the Fed\'s primary policy tool — raising it makes borrowing more expensive throughout the economy; lowering it makes borrowing cheaper.',
    context: 'When you set this rate, you\'re essentially setting the price of money. Every other interest rate — mortgages, car loans, credit cards — tends to move in the same direction.'
  },

  'Basis Points': {
    title: 'Basis Points (bps)',
    plain: 'A unit of measurement for interest rates. One basis point equals 0.01% (one hundredth of a percent). 25 basis points = 0.25%. The Fed typically moves in 25 basis point increments.',
    context: 'A 25 bps hike might sound small, but across trillions of dollars in loans and mortgages, even tiny rate changes have enormous real-world effects.'
  },

  'Real Interest Rate': {
    title: 'Real Interest Rate',
    plain: 'The interest rate after adjusting for inflation. If the Fed Funds Rate is 4% and inflation is 3%, the real rate is roughly 1%. Real rates matter more than nominal rates for economic behavior.',
    context: 'A "high" nominal rate can actually be stimulative if inflation is even higher. That\'s why the committee watches real rates closely — they reveal how tight policy actually is.'
  },

  'Neutral Rate': {
    title: 'Neutral Rate (r*)',
    plain: 'The theoretical interest rate that neither stimulates nor restrains the economy. Rates above neutral are restrictive; rates below neutral are accommodative. Nobody knows exactly where it is.',
    context: 'Much of the debate about whether to hold or move rates comes down to where the committee thinks the neutral rate is — and that\'s genuinely uncertain.'
  },

  'Restrictive': {
    title: 'Restrictive Policy',
    plain: 'When interest rates are set above the neutral rate, policy is "restrictive" — it is actively slowing economic activity to bring inflation down. The opposite is "accommodative."',
    context: 'The committee uses this word deliberately. Calling policy "sufficiently restrictive" signals confidence that rates are high enough. Dropping that word signals a pivot may be coming.'
  },

  'Core PCE': {
    title: 'Core PCE Inflation',
    plain: 'The Fed\'s preferred inflation measure. It tracks prices paid by consumers, excluding food and energy (which are volatile). PCE stands for Personal Consumption Expenditures.',
    context: 'The Fed targets 2% Core PCE — not CPI. When this number is above 2%, the committee feels pressure to hold or hike. Below 2% sustained, it creates room to cut.'
  },

  'CPI': {
    title: 'Consumer Price Index (CPI)',
    plain: 'A widely reported measure of inflation that tracks a basket of consumer goods and services. The Fed watches CPI but officially targets PCE, which weights spending differently.',
    context: 'CPI tends to run slightly higher than PCE. When both are elevated, the inflation signal is unambiguous. When they diverge, it tells the committee something about which sectors are driving prices.'
  },

  'Inflation Expectations': {
    title: 'Inflation Expectations',
    plain: 'What households, businesses, and markets believe inflation will be in the future. If people expect high inflation, they demand higher wages and raise prices preemptively — which causes the very inflation they expect.',
    context: 'Keeping expectations "anchored" at 2% is one of the Fed\'s most important tasks. Once expectations become unanchored, fighting inflation becomes much harder and more painful.'
  },

  'Disinflation': {
    title: 'Disinflation',
    plain: 'When inflation is still positive but falling. Prices are still rising — just more slowly. This is different from deflation, where prices actually fall.',
    context: 'The committee uses "disinflation" carefully. Saying it signals progress without declaring victory. The risk is that disinflation stalls — prices stabilize at a level still above 2%.'
  },

  'Transitory': {
    title: 'Transitory',
    plain: 'A word the Fed used (and later regretted) to describe inflation it expected to be temporary and self-correcting. It became infamous when 2021\'s "transitory" inflation turned out to be persistent.',
    context: 'This word carries enormous historical baggage. Using it in your statement is a high-risk communication choice — it signals confidence that inflation will fade, but it makes you look bad if it doesn\'t.'
  },

  'Maximum Employment': {
    title: 'Maximum Employment',
    plain: 'One half of the Fed\'s dual mandate. It doesn\'t mean zero unemployment — it means the highest level of employment consistent with stable prices. The Fed estimates this but can\'t know it precisely.',
    context: 'When unemployment is very low, the committee worries the labor market is "overheating" — putting upward pressure on wages and inflation. When unemployment rises, the employment mandate gets more weight.'
  },

  'Dual Mandate': {
    title: 'The Dual Mandate',
    plain: 'The Fed\'s two legally assigned goals: maximum employment AND stable prices (2% inflation). Most central banks only target inflation. The Fed\'s dual mandate means it must balance both — which creates genuine tension.',
    context: 'Every rate decision involves a tradeoff between the two mandates. Hiking fights inflation but risks employment. Cutting protects jobs but risks inflation. That tension is the game.'
  },

  'Non-Farm Payrolls': {
    title: 'Non-Farm Payrolls',
    plain: 'The monthly jobs report — how many jobs the US economy added (or lost), excluding farm workers. Released the first Friday of each month. One of the most market-moving data releases.',
    context: 'A strong payrolls number (above ~150K) signals a healthy labor market. A weak number raises recession fears. The committee reads this data carefully before every meeting.'
  },

  'Labor Force Participation': {
    title: 'Labor Force Participation Rate',
    plain: 'The percentage of working-age Americans who are either employed or actively looking for work. A low participation rate can mask unemployment — people may have stopped looking.',
    context: 'When interpreting unemployment numbers, the committee also checks participation. A falling unemployment rate with falling participation may not reflect true labor market strength.'
  },

  'Yield Curve': {
    title: 'Yield Curve',
    plain: 'A chart showing interest rates on government bonds across different time horizons (2-year, 10-year, 30-year). Normally, longer-term bonds pay higher rates. When the curve "inverts" (short-term rates exceed long-term), it often signals recession.',
    context: 'An inverted yield curve is one of the most reliable recession predictors. The committee watches the 2-year/10-year spread closely — if it inverts, growth concerns rise fast.'
  },

  'Financial Conditions': {
    title: 'Financial Conditions',
    plain: 'A broad measure of how easy or tight it is to borrow money across the economy — combining interest rates, stock prices, credit spreads, and the dollar\'s value. The Fed influences but doesn\'t fully control financial conditions.',
    context: 'Sometimes financial conditions ease even when the Fed holds rates — if stock markets rally or credit spreads tighten. This can complicate the Fed\'s work, as looser conditions can re-ignite inflation.'
  },

  'Credit Spreads': {
    title: 'Credit Spreads',
    plain: 'The difference in interest rates between US Treasury bonds (risk-free) and corporate bonds (riskier). Wide spreads signal market stress — investors demanding a higher premium for taking on risk.',
    context: 'When spreads widen suddenly, it\'s a warning sign that the credit markets are tightening beyond what the Fed intended. The committee watches spreads as a real-time gauge of financial stress.'
  },

  'Market Expectations': {
    title: 'Market Expectations',
    plain: 'What financial markets are pricing in for future Fed policy, derived from futures contracts. If markets price in a 90% chance of a hold, a surprise move creates a large, disruptive reaction.',
    context: 'Managing market expectations is a core Fed communication skill. Surprising markets isn\'t inherently bad — but doing it without explanation erodes credibility and creates volatility.'
  },

  'Forward Guidance': {
    title: 'Forward Guidance',
    plain: 'When the Fed signals its likely future policy path to help businesses and markets plan ahead. It\'s a powerful communication tool — words can move markets without changing rates.',
    context: 'The language you choose in your statement IS forward guidance. Phrases like "data dependent" or "prepared to hold for as long as necessary" carry enormous weight in how markets interpret your intentions.'
  },

  'Dot Plot': {
    title: 'The Dot Plot',
    plain: 'A chart showing each FOMC member\'s anonymous projection for where the federal funds rate will be at the end of each year. The median of the dots becomes the committee\'s "signal" to markets.',
    context: 'When your dot projections differ from your actual decisions, credibility suffers. Markets treat dots as implicit commitments even though the Fed insists they\'re just forecasts.'
  },

  'FOMC': {
    title: 'Federal Open Market Committee (FOMC)',
    plain: 'The committee within the Federal Reserve that sets monetary policy. It has 12 voting members: 7 Fed governors plus 5 of the 12 regional bank presidents (on a rotating basis). Meets 8 times per year.',
    context: 'As Chair, you lead the committee but don\'t dictate it. Building consensus matters. A dissenting vote signals internal disagreement — which markets watch closely.'
  },

  'Beige Book': {
    title: 'The Beige Book',
    plain: 'A report published by the Fed 8 times per year gathering anecdotal economic intelligence from businesses across all 12 Federal Reserve districts. Named for its beige cover.',
    context: 'The Beige Book captures what\'s happening on the ground before the official data catches up. If districts are reporting slowing activity, it\'s an early warning the committee takes seriously.'
  },

  'Credibility': {
    title: 'Fed Credibility',
    plain: 'The degree to which businesses, households, and markets believe the Fed will follow through on its stated commitments. High credibility means your words move markets. Low credibility means nobody believes you.',
    context: 'Credibility is earned slowly and lost quickly. Inconsistency between your dot plot projections and your actual decisions, or shifting your stated rationale without explanation, erodes it fast.'
  },

  'Quantitative Easing': {
    title: 'Quantitative Easing (QE)',
    plain: 'When the Fed creates new money to buy Treasury bonds and mortgage-backed securities, injecting liquidity into the financial system and pushing long-term interest rates down. Used when rate cuts alone aren\'t enough.',
    context: 'QE expands the Fed\'s balance sheet. It\'s a powerful but blunt tool — once started, stopping it requires careful management to avoid disrupting markets. The 2013 "Taper Tantrum" showed how sensitive markets are to this.'
  },

  'Quantitative Tightening': {
    title: 'Quantitative Tightening (QT)',
    plain: 'The opposite of QE. The Fed shrinks its balance sheet by allowing bonds to mature without reinvesting the proceeds (passive QT) or by actively selling assets. It tightens financial conditions beyond what rate hikes alone achieve.',
    context: 'QT is a second tightening lever operating alongside rate hikes. The combination of both — as seen in 2022-2024 — creates significant cumulative pressure on borrowing costs throughout the economy.'
  },

  'Balance Sheet': {
    title: 'The Fed\'s Balance Sheet',
    plain: 'The total assets held by the Federal Reserve — primarily US Treasury bonds and mortgage-backed securities (MBS). Grew from ~$900 billion before 2008 to nearly $9 trillion at its 2022 peak.',
    context: 'The size and composition of the balance sheet is itself a policy tool. A larger balance sheet means more liquidity in the system; a smaller one means tighter conditions — independent of what the Fed Funds Rate is doing.'
  },

  'GDP': {
    title: 'Gross Domestic Product (GDP)',
    plain: 'The total value of all goods and services produced in the US economy. The broadest measure of economic output. Two consecutive quarters of negative GDP growth is the informal definition of a recession.',
    context: 'Strong GDP growth is generally good, but if it\'s running too hot, it can fuel inflation. The Fed tries to achieve growth near its "potential" — the pace sustainable without generating price pressure.'
  },

  'Recession': {
    title: 'Recession',
    plain: 'A significant decline in economic activity across the economy, typically defined as two consecutive quarters of negative GDP growth. Characterized by rising unemployment, falling output, and declining consumer spending.',
    context: 'Avoiding recession while fighting inflation is the "soft landing" — the Fed\'s holy grail. Hiking too fast risks causing a recession; hiking too slowly risks entrenching inflation. The committee walks this line every meeting.'
  },

  'Soft Landing': {
    title: 'Soft Landing',
    plain: 'The ideal outcome of a rate-hiking cycle: inflation returns to 2% without triggering a recession. Historically rare — most tightening cycles end in recession. The 1994-95 cycle is the canonical example of success.',
    context: 'Whether you achieve a soft landing depends on your decisions across all 8 meetings. Too aggressive and you may tip into recession; too cautious and inflation stays elevated. Your score reflects this balance.'
  },

  'Stagflation': {
    title: 'Stagflation',
    plain: 'The toxic combination of high inflation AND high unemployment (stagnation). Normally, inflation and unemployment move in opposite directions — stagflation breaks that relationship, making both policy tools less effective.',
    context: 'Stagflation is the Fed\'s nightmare scenario because raising rates fights inflation but worsens unemployment — and cutting rates helps unemployment but worsens inflation. There\'s no clean solution.'
  },

  'Hawkish': {
    title: 'Hawkish',
    plain: 'A policy stance favoring higher interest rates to fight inflation, even at the cost of slower growth. Hawks prioritize price stability over employment in the dual mandate tradeoff.',
    context: 'Hawkish language in your statement — like emphasizing inflation risks or signaling future hikes — tightens financial conditions even before you actually move rates. Markets react to tone as much as action.'
  },

  'Dovish': {
    title: 'Dovish',
    plain: 'A policy stance favoring lower interest rates to support economic growth and employment, accepting some inflation risk. Doves prioritize the employment side of the dual mandate.',
    context: 'Dovish language — like emphasizing downside risks to growth or signaling potential cuts — loosens financial conditions. If markets interpret you as dovish while inflation is elevated, credibility can suffer.'
  }

};

window.FedChair.Data.newsHeadlines = [
  { headline: 'Core PCE Spikes to 3.0% in December — Highest Since April 2024', source: 'BEA' },
  { headline: 'BLS Benchmark Revision Slashes 2025 Job Gains by 911K — Avg Monthly Only 15K', source: 'BLS' },
  { headline: 'Warsh Formally Nominated as Fed Chair Feb 24 — Senate Confirmation Hearings in March', source: 'White House' },
  { headline: 'DOJ Grand Jury Subpoenas Powell Over Eccles Renovation Testimony', source: 'WSJ' },
  { headline: 'Markets Price ~94% Hold at March Meeting, Two Cuts Priced for Later 2026', source: 'CME' },
  { headline: 'Goldman Warns January PCE (Due March 13) Could Also Run Hot', source: 'Goldman Sachs' },
  { headline: 'Gov. Miran Seat Expired March 1 — Will Stay Until Successor Confirmed', source: 'Reuters' },
  { headline: 'Several FOMC Participants Raised Possibility of Rate Increases If Inflation Persists', source: 'Fed Minutes' }
];
