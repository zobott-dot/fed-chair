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
      },
      {
        id: 'dc-shelter-inflation',
        conditions: { onHold: true, onHighInflation: true },
        journalist: 'New York Times economics reporter',
        question: 'Shelter costs continue to drive much of the inflation overshoot. Is the Fed essentially raising rates to solve what many call a housing supply problem?',
        responses: [
          {
            id: 'dc6r1', label: 'Nuanced',
            text: 'Shelter inflation has structural roots, but monetary policy affects demand broadly. We cannot simply exempt the largest component of the price index from our analysis.',
            credibilityImpact: 'positive',
            educationalNote: 'Acknowledging the structural argument while defending the Fed\'s mandate shows analytical sophistication. Markets respect this kind of nuance from a chair.'
          },
          {
            id: 'dc6r2', label: 'Redirect to Supercore',
            text: 'This is precisely why we have been emphasizing supercore inflation — services excluding shelter — as a better gauge of demand-driven pressure. That measure tells a more encouraging story.',
            credibilityImpact: 'neutral',
            educationalNote: 'Pointing to alternative measures is substantive but can seem like cherry-picking the most favorable metric. Markets will note the selective framing.'
          },
          {
            id: 'dc6r3', label: 'Dismiss the Distinction',
            text: 'Households experience one price level. The source of inflation matters less than the outcome. Our mandate is clear, and we pursue it using the tools we have.',
            credibilityImpact: 'neutral',
            educationalNote: 'A blunt framing that projects resolve but misses an opportunity to demonstrate analytical depth. Some may read this as intellectually incurious.'
          }
        ]
      },
      {
        id: 'dc-wage-pressure',
        conditions: { onHike: true },
        journalist: 'CNBC senior economics reporter',
        question: 'Wage growth remains above levels most economists consider consistent with 2% inflation. Is the labor market still too tight for the committee\'s comfort?',
        responses: [
          {
            id: 'dc7r1', label: 'Balanced',
            text: 'Wage growth is moderating but remains elevated relative to productivity gains. We welcome strong real wages — the question is whether the current pace is sustainable without fueling inflation.',
            credibilityImpact: 'positive',
            educationalNote: 'Linking wages to productivity is economically precise and shows the committee is thinking about the right relationship. This framing avoids appearing anti-worker.'
          },
          {
            id: 'dc7r2', label: 'Pro-Worker',
            text: 'Real wages are just now recovering the purchasing power lost during the inflation surge. We do not view the current pace of nominal wage growth as a primary threat to price stability.',
            credibilityImpact: 'neutral',
            educationalNote: 'A sympathetic framing, but it can undercut the case for tightening. If wages aren\'t a concern, why hike?'
          },
          {
            id: 'dc7r3', label: 'Hawkish',
            text: 'The wage-price dynamic is a real concern. Without further rebalancing in labor supply and demand, it will be difficult to achieve the sustained disinflation the committee is looking for.',
            credibilityImpact: 'neutral',
            educationalNote: 'Signaling that the labor market must weaken further is honest but politically uncomfortable. Markets may price in more hikes.'
          }
        ]
      },
      {
        id: 'dc-recession-fears',
        conditions: { onHike: true, onHighUnemployment: true },
        journalist: 'Politico economic policy reporter',
        question: 'Several major forecasters now put recession probability above 40%. Does the committee share that level of concern?',
        responses: [
          {
            id: 'dc8r1', label: 'Reassuring',
            text: 'We do not assign specific recession probabilities. The labor market and consumer balance sheets remain solid. We see a slowdown, not a contraction, as the most likely path.',
            credibilityImpact: 'positive',
            educationalNote: 'Reassurance grounded in specific data points — labor market and balance sheets — is more persuasive than generic optimism. It shows the committee has done its homework.'
          },
          {
            id: 'dc8r2', label: 'Candid',
            text: 'The risk of recession has risen — that is an unavoidable consequence of the tightening we have undertaken. We are weighing that risk carefully against the cost of allowing inflation to persist.',
            credibilityImpact: 'positive',
            educationalNote: 'Acknowledging the tradeoff directly is surprisingly credibility-enhancing. Markets can handle bad news; what they cannot handle is a Fed that seems unaware of the risks.'
          },
          {
            id: 'dc8r3', label: 'Evasive',
            text: 'The committee\'s focus is on setting policy appropriately meeting by meeting. Recession forecasting is not our primary activity — executing our mandate is.',
            credibilityImpact: 'negative',
            educationalNote: 'Deflecting a direct recession question can look evasive and out of touch. When the public is worried about their jobs, the Fed needs to show it is engaged with that concern.'
          }
        ]
      },
      {
        id: 'dc-consumer-resilience',
        conditions: { default: true },
        journalist: 'MarketWatch economics correspondent',
        question: 'Consumer spending has been remarkably resilient despite your rate hikes. Does that mean monetary policy isn\'t restrictive enough, or is something else at work?',
        responses: [
          {
            id: 'dc9r1', label: 'Patient',
            text: 'Monetary policy works with long and variable lags. Spending resilience today does not mean policy is insufficient — it means the transmission is still working through the economy.',
            credibilityImpact: 'positive',
            educationalNote: 'Invoking "long and variable lags" — a concept from Milton Friedman — signals intellectual grounding. It is also the correct answer: rate hikes take 12-18 months to fully transmit.'
          },
          {
            id: 'dc9r2', label: 'Concerned',
            text: 'Consumer strength does suggest there may be more work to do. We are taking that signal seriously in our deliberations about the path of policy.',
            credibilityImpact: 'neutral',
            educationalNote: 'Suggesting more tightening may be needed is hawkish and data-responsive. But it can move markets significantly if unexpected.'
          },
          {
            id: 'dc9r3', label: 'Analytical',
            text: 'Some of that resilience reflects pandemic-era excess savings being drawn down — a one-time tailwind that is fading. We expect a more meaningful slowdown in spending in coming quarters.',
            credibilityImpact: 'neutral',
            educationalNote: 'A specific analytical argument that shows depth. The risk is that if spending doesn\'t slow as predicted, this will look like wishful thinking.'
          }
        ]
      },
      {
        id: 'dc-global-divergence',
        conditions: { default: true },
        journalist: 'Financial Times global economics editor',
        question: 'Other major central banks — the ECB, Bank of England, Bank of Canada — have already begun cutting rates. Is the Fed at risk of falling behind a global trend?',
        responses: [
          {
            id: 'dc10r1', label: 'Independent',
            text: 'We set policy for the US economy. Other central banks face different conditions — different inflation dynamics, different labor markets, different fiscal positions. The right path for the Fed may well diverge from global peers.',
            credibilityImpact: 'positive',
            educationalNote: 'Asserting monetary policy independence from global peers is the textbook answer and projects confidence. It reminds markets that the Fed is not a follower.'
          },
          {
            id: 'dc10r2', label: 'Acknowledging',
            text: 'Global disinflation is a trend worth noting, and it does affect our outlook through trade channels and imported goods prices. But domestic conditions remain the primary driver of our decisions.',
            credibilityImpact: 'neutral',
            educationalNote: 'Acknowledging global conditions without subordinating policy to them is diplomatically skillful. It shows the committee is aware of the world without being reactive to it.'
          },
          {
            id: 'dc10r3', label: 'Assertive',
            text: 'The US economy has been the outlier in strength, which is why our policy path differs. We will not import a rate-cutting cycle that does not fit our domestic data.',
            credibilityImpact: 'neutral',
            educationalNote: 'A strong statement of US exceptionalism. Can sound slightly arrogant but reinforces the message that the Fed follows its own data.'
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
      },
      {
        id: 'fg-neutral-rate',
        conditions: { default: true },
        journalist: 'Reuters financial markets correspondent',
        question: 'Has the committee\'s estimate of the neutral rate changed? Some economists argue that r-star has risen since the pandemic.',
        responses: [
          {
            id: 'fg4r1', label: 'Thoughtful',
            text: 'There is an active debate about r-star among committee participants. If neutral is higher than previously assumed, then current policy may be less restrictive than we believe — that is something we are watching carefully.',
            credibilityImpact: 'positive',
            educationalNote: 'Engaging seriously with the r-star debate shows intellectual honesty. The neutral rate is genuinely uncertain, and acknowledging that uncertainty is itself a form of credibility.'
          },
          {
            id: 'fg4r2', label: 'Dismissive',
            text: 'The neutral rate is a theoretical construct that cannot be measured directly in real time. We focus on observable outcomes — inflation, employment, financial conditions — rather than unobservable variables.',
            credibilityImpact: 'neutral',
            educationalNote: 'A pragmatic stance, but dismissing r-star entirely can seem anti-intellectual. The dot plot\'s longer-run median IS an r-star estimate, so this framing is slightly inconsistent.'
          },
          {
            id: 'fg4r3', label: 'Transparent',
            text: 'The median longer-run dot has moved up modestly in recent projections, reflecting individual reassessments. That is a meaningful shift in the committee\'s collective thinking about the equilibrium rate.',
            credibilityImpact: 'positive',
            educationalNote: 'Pointing to the dot plot as evidence of r-star revision is both transparent and data-grounded. It gives markets a concrete signal to work with.'
          }
        ]
      },
      {
        id: 'fg-insurance-cut',
        conditions: { onCut: true },
        journalist: 'Bloomberg News chief economics correspondent',
        question: 'Is this an insurance cut, or the start of a sustained cutting cycle? Markets need to know how to position.',
        responses: [
          {
            id: 'fg5r1', label: 'Deliberate',
            text: 'We are not pre-committing to a series of reductions. Each meeting is a fresh assessment of conditions. Today\'s action reflects the data we have today — nothing more, nothing less.',
            credibilityImpact: 'positive',
            educationalNote: 'Refusing to characterize a cut as the start of a cycle preserves maximum optionality. This is the classic data-dependent framing that gives the Fed room to maneuver.'
          },
          {
            id: 'fg5r2', label: 'Forward-Looking',
            text: 'I would characterize this as a recalibration of policy toward a stance more consistent with the evolving risk balance. The direction is clear, but the pace will depend on conditions.',
            credibilityImpact: 'neutral',
            educationalNote: '"Recalibration" is a careful word choice — it implies adjustment, not reversal. But saying "the direction is clear" does lean toward signaling more cuts ahead.'
          },
          {
            id: 'fg5r3', label: 'Candid',
            text: 'If you are asking whether there will be more cuts — I would say the committee sees this as appropriate given current conditions, and we will continue to evaluate whether further adjustment is warranted.',
            credibilityImpact: 'neutral',
            educationalNote: 'A more direct answer than most Fed chairs would give. Directness can build trust but also locks the committee into expectations that may need to change.'
          }
        ]
      },
      {
        id: 'fg-soft-landing',
        conditions: { onLate: true },
        journalist: 'Wall Street Journal chief economics correspondent',
        question: 'We\'re well into your tenure now. What are the odds of achieving a soft landing from here?',
        responses: [
          {
            id: 'fg6r1', label: 'Optimistic',
            text: 'A soft landing remains the most likely outcome in the committee\'s assessment. The economy has shown remarkable resilience, and the narrow path we have been navigating remains viable.',
            credibilityImpact: 'positive',
            educationalNote: 'Measured optimism grounded in data resilience. The term "narrow path" is honest about the difficulty without surrendering confidence.'
          },
          {
            id: 'fg6r2', label: 'Candid',
            text: 'The window remains open, but I would be less than honest if I said it hasn\'t narrowed. Every decision from here carries significant weight. There is very little margin for error.',
            credibilityImpact: 'positive',
            educationalNote: 'Radical honesty from a Fed chair is rare and tends to be rewarded by markets — it signals that the person in charge sees the same risks everyone else does.'
          },
          {
            id: 'fg6r3', label: 'Evasive',
            text: 'I do not find it productive to assign probabilities to outcomes. Our job is to make the best decision at each juncture — not to forecast the ending.',
            credibilityImpact: 'negative',
            educationalNote: 'Ducking a soft-landing question late in a tenure looks evasive. By this point, markets expect the chair to have a view.'
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
      },
      {
        id: 'pol-tariffs',
        conditions: { default: true },
        journalist: 'Politico trade policy reporter',
        question: 'New tariffs are being imposed on key trading partners. How is the committee factoring trade policy uncertainty into its economic projections?',
        responses: [
          {
            id: 'pol4r1', label: 'Diplomatic',
            text: 'Trade policy is the purview of elected officials. Our role is to assess the economic consequences and set monetary policy accordingly. Tariffs can affect both inflation and growth — we are modeling both channels.',
            credibilityImpact: 'positive',
            educationalNote: 'The textbook response: acknowledge the issue, defer on the politics, focus on the economics. This framing respects institutional boundaries while being substantive.'
          },
          {
            id: 'pol4r2', label: 'Direct',
            text: 'Tariffs are a supply shock. They raise prices in the near term and can dampen growth over time. The uncertainty itself is a headwind — businesses tell us they are delaying investment decisions.',
            credibilityImpact: 'positive',
            educationalNote: 'Calling tariffs a supply shock is analytically precise and implicitly critical without being partisan. It also signals the Fed won\'t accommodate tariff-driven inflation.'
          },
          {
            id: 'pol4r3', label: 'Evasive',
            text: 'We incorporate a range of assumptions about the economic environment into our projections. I would prefer not to comment on specific trade policy decisions.',
            credibilityImpact: 'negative',
            educationalNote: 'Excessive caution on a topic everyone is asking about looks out of touch. The Fed can discuss economic effects of policy without taking a political position.'
          }
        ]
      },
      {
        id: 'pol-fiscal-deficit',
        conditions: { onLate: true },
        journalist: 'Washington Post fiscal policy reporter',
        question: 'Federal deficits are running at historically high levels outside a recession. Is fiscal policy making the Fed\'s job harder?',
        responses: [
          {
            id: 'pol5r1', label: 'Candid',
            text: 'Sustained fiscal stimulus does create demand that can work at cross-purposes with monetary tightening. That is a reality we incorporate into our models and our deliberations.',
            credibilityImpact: 'positive',
            educationalNote: 'Acknowledging the fiscal-monetary tension is analytically honest and widely shared among economists. It\'s substantive without being partisan.'
          },
          {
            id: 'pol5r2', label: 'Institutional',
            text: 'Fiscal policy is the domain of Congress and the administration. We take the fiscal path as given and set monetary policy to achieve our mandate within that landscape.',
            credibilityImpact: 'neutral',
            educationalNote: 'The safe institutional answer. Correct but somewhat evasive — everyone knows large deficits affect monetary policy transmission.'
          },
          {
            id: 'pol5r3', label: 'Deflect',
            text: 'I would prefer not to comment on fiscal policy choices. The committee is focused on the tools at our disposal.',
            credibilityImpact: 'negative',
            educationalNote: 'A complete deflection on a topic that directly affects your job. Markets may infer that the chair is being politically cautious rather than analytically honest.'
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
      },
      {
        id: 'mi-housing-mortgage',
        conditions: { onHike: true },
        journalist: 'CNBC real estate correspondent',
        question: 'Mortgage rates are at multi-decade highs and home sales have fallen sharply. How does the committee view the impact on the housing market and household wealth?',
        responses: [
          {
            id: 'mi3r1', label: 'Empathetic',
            text: 'Housing affordability is a genuine challenge, and I hear that concern. Higher mortgage rates are one of the most visible channels of monetary policy, and we are acutely aware of the burden they impose.',
            credibilityImpact: 'positive',
            educationalNote: 'Showing empathy for housing hardship while pursuing tight policy is a delicate balance. It demonstrates the committee is not indifferent to distributional effects.'
          },
          {
            id: 'mi3r2', label: 'Analytical',
            text: 'The housing market is rebalancing from an unsustainable pace. Some cooling in residential investment is a necessary part of the inflation reduction process.',
            credibilityImpact: 'neutral',
            educationalNote: 'Technically correct but emotionally cold. Housing is where rate hikes hit hardest, and a purely analytical framing can seem tone-deaf to families struggling to buy or sell.'
          },
          {
            id: 'mi3r3', label: 'Long-Term View',
            text: 'When we achieve price stability, the conditions for a healthier and more affordable housing market will follow. The adjustment is painful in the short run, but it serves affordability in the long run.',
            credibilityImpact: 'neutral',
            educationalNote: 'The "short-term pain for long-term gain" argument. Intellectually sound, but hard to sell to someone whose mortgage rate just doubled.'
          }
        ]
      },
      {
        id: 'mi-dollar-strength',
        conditions: { default: true },
        journalist: 'Financial Times currency markets editor',
        question: 'The dollar has strengthened significantly against major currencies. How does that factor into the committee\'s thinking about imported inflation and export competitiveness?',
        responses: [
          {
            id: 'mi4r1', label: 'Balanced',
            text: 'A stronger dollar has mixed effects for us. It dampens imported inflation, which supports our price stability goal, but it also creates headwinds for exporters and can tighten conditions for emerging markets.',
            credibilityImpact: 'positive',
            educationalNote: 'A well-rounded answer that shows the committee is thinking about multiple channels. The emerging markets mention signals awareness of global interconnections.'
          },
          {
            id: 'mi4r2', label: 'Domestic Focus',
            text: 'We set policy for domestic conditions. Exchange rate movements are an output of relative policy stances globally, not an input to our decisions.',
            credibilityImpact: 'neutral',
            educationalNote: 'The standard Fed line on the dollar. Technically defensible but somewhat dismissive of an important transmission channel.'
          },
          {
            id: 'mi4r3', label: 'Cautious',
            text: 'Dollar strength is tightening financial conditions globally. We are mindful that stress in emerging markets can produce spillback effects that eventually reach the US economy.',
            credibilityImpact: 'neutral',
            educationalNote: 'Acknowledging spillback risk shows sophistication about global financial interconnections. It\'s a more dovish signal than the pure domestic focus framing.'
          }
        ]
      },
      {
        id: 'mi-credit-spreads',
        conditions: { default: true },
        journalist: 'Barron\'s credit markets reporter',
        question: 'Corporate credit spreads have widened notably in recent weeks. Does the committee see signs of stress developing in the credit markets?',
        responses: [
          {
            id: 'mi5r1', label: 'Watchful',
            text: 'We monitor credit conditions as part of our broader assessment of financial conditions. Some spread widening is a natural consequence of tighter policy — we distinguish between healthy repricing and disorderly stress.',
            credibilityImpact: 'positive',
            educationalNote: 'Drawing the line between orderly repricing and disorderly stress is exactly the right framework. It shows the committee has a nuanced view of financial conditions.'
          },
          {
            id: 'mi5r2', label: 'Dismissive',
            text: 'Credit spreads remain well within historical norms. We do not see current conditions as indicating systemic stress in the financial system.',
            credibilityImpact: 'neutral',
            educationalNote: 'Dismissing spread widening can seem complacent. If spreads widen further, this answer will age poorly.'
          },
          {
            id: 'mi5r3', label: 'Dovish Signal',
            text: 'If credit conditions tighten meaningfully, that effectively does some of our tightening for us. We would factor that into our assessment of the overall stance of policy.',
            credibilityImpact: 'neutral',
            educationalNote: 'This is a well-known Fed framework — financial conditions substituting for rate policy. Markets will read this as a signal that the Fed might pause if spreads keep widening.'
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
      },
      {
        id: 'com-fedspeak-confusion',
        conditions: { default: true },
        journalist: 'Associated Press economics writer',
        question: 'Fed officials have made seemingly contradictory public statements between meetings. How should markets distinguish between individual views and committee consensus?',
        responses: [
          {
            id: 'com3r1', label: 'Clarifying',
            text: 'The post-meeting statement and this press conference represent the committee\'s collective view. Individual speeches reflect personal assessments that inform but do not bind the group. I would encourage focusing on the formal channels.',
            credibilityImpact: 'positive',
            educationalNote: 'Establishing a clear hierarchy of Fed communication is genuinely useful guidance. It tells markets which signals to weight most heavily.'
          },
          {
            id: 'com3r2', label: 'Defensive',
            text: 'Members have every right to share their views publicly. It is part of our transparency commitment. I would caution against overinterpreting any single speech.',
            credibilityImpact: 'neutral',
            educationalNote: 'Defending the cacophony of Fedspeak without addressing the confusion it causes. This answer is correct but not especially helpful.'
          },
          {
            id: 'com3r3', label: 'Honest',
            text: 'I take your point. We can do better at ensuring public remarks are consistent with the committee\'s communicated direction. That is something I will continue to work on.',
            credibilityImpact: 'positive',
            educationalNote: 'Admitting a communication problem and committing to improvement is refreshingly honest and tends to be rewarded with credibility.'
          }
        ]
      },
      {
        id: 'com-plain-language',
        conditions: { default: true },
        journalist: 'NPR economics correspondent',
        question: 'Chair, millions of Americans are watching this press conference. Can you explain in plain terms what today\'s decision means for ordinary families — their mortgage, their savings, their job security?',
        responses: [
          {
            id: 'com4r1', label: 'Empathetic',
            text: 'I know prices are still too high at the grocery store and the gas pump. We feel that urgency. Everything we are doing is aimed at bringing costs down while keeping the job market strong. That takes time, but we are committed to it.',
            credibilityImpact: 'positive',
            educationalNote: 'Speaking to kitchen-table concerns in plain language humanizes the institution. This is the kind of communication that builds broad public trust in the Fed.'
          },
          {
            id: 'com4r2', label: 'Technical',
            text: 'Today\'s decision affects borrowing costs throughout the economy — mortgages, car loans, business investment. Those effects take time to work through, typically six to eighteen months.',
            credibilityImpact: 'neutral',
            educationalNote: 'Accurate but clinical. When a reporter asks you to speak plainly, responding with transmission mechanism language misses the human dimension.'
          },
          {
            id: 'com4r3', label: 'Forward-Looking',
            text: 'For families: we are working to make sure the progress on prices continues, so your paycheck goes further. For savers: higher rates mean better returns on savings. For workers: we are trying to cool inflation without causing unnecessary job losses.',
            credibilityImpact: 'positive',
            educationalNote: 'Addressing different constituencies specifically — families, savers, workers — shows the committee is thinking about distributional effects. This is effective public communication.'
          }
        ]
      }
    ]
  },

  // ─── CATEGORY 6: BALANCE SHEET ──────────────────────────────────────────
  balanceSheet: {
    label: 'BALANCE SHEET',
    variants: [
      {
        id: 'bs-qt-while-cutting',
        conditions: { onCut: true },
        journalist: 'Bloomberg News Fed reporter',
        question: 'Chair, you cut the federal funds rate today but you\'re continuing to shrink the balance sheet. Aren\'t those two actions working against each other?',
        responses: [
          {
            id: 'bs1r1',
            label: 'Different Tools, Different Targets',
            text: 'The rate cut and the balance sheet reduction are addressing different dimensions of financial conditions. The rate decision targets short-term borrowing costs; the balance sheet normalization addresses long-term liquidity. Both can operate simultaneously without contradiction.',
            credibilityImpact: 'positive',
            educationalNote: 'This is technically accurate and the right answer. The two tools operate on different parts of the yield curve \u2014 short-term rates vs. long-term rates \u2014 and can legitimately point in different directions.'
          },
          {
            id: 'bs1r2',
            label: 'Acknowledge the Tension',
            text: 'That\'s a fair observation. The committee is navigating a careful balance \u2014 we want to ease the pressure on short-term borrowing costs while continuing to normalize the balance sheet that grew to extraordinary levels during the pandemic.',
            credibilityImpact: 'neutral',
            educationalNote: 'Acknowledging tension is honest but can signal the committee hasn\'t fully resolved its own internal debate. Markets may wonder which tool will blink first.'
          },
          {
            id: 'bs1r3',
            label: 'Suggest a Pause',
            text: 'The committee is actively discussing whether to slow or pause the balance sheet reduction in light of today\'s rate decision. That\'s a live question for upcoming meetings.',
            credibilityImpact: 'negative',
            educationalNote: 'Hinting at a QT pause mid-press-conference, without the committee having decided it, is poor communication discipline. It creates uncertainty and suggests the committee\'s policy framework is unsettled.'
          }
        ]
      },
      {
        id: 'bs-qe-while-hiking',
        conditions: { onHike: true },
        journalist: 'Wall Street Journal Fed correspondent',
        question: 'Chair, you raised rates today but the Fed\'s balance sheet remains historically large. Shouldn\'t you be doing both \u2014 hiking AND reducing the balance sheet \u2014 to fight inflation?',
        responses: [
          {
            id: 'bs2r1',
            label: 'Sequenced Approach',
            text: 'The committee has deliberately chosen to sequence its tightening \u2014 establishing the rate path first, then addressing the balance sheet in a measured way. This sequencing allows us to assess the cumulative effects of tightening before adding additional pressure.',
            credibilityImpact: 'positive',
            educationalNote: 'The sequenced approach is how the Fed actually operated in 2022 \u2014 rate hikes first, QT second. Explaining the sequencing logic is a legitimate and credible answer.'
          },
          {
            id: 'bs2r2',
            label: 'Balance Sheet Is Secondary',
            text: 'The rate decision is the primary tool of monetary policy. The balance sheet will be addressed in due course, but today\'s focus is on the rate path.',
            credibilityImpact: 'neutral',
            educationalNote: 'Calling the balance sheet "secondary" is debatable \u2014 at its peak, QT was removing $95B per month from the financial system, which is anything but secondary.'
          },
          {
            id: 'bs2r3',
            label: 'Defer the Question',
            text: 'The balance sheet is something the committee will be discussing in coming meetings. I don\'t want to get ahead of that discussion today.',
            credibilityImpact: 'negative',
            educationalNote: 'Deferring a direct question about a major policy tool looks evasive. Markets need to understand the committee\'s balance sheet intentions \u2014 especially during an active tightening cycle.'
          }
        ]
      },
      {
        id: 'bs-default',
        conditions: { default: true },
        journalist: 'Reuters financial correspondent',
        question: 'Chair, can you explain the committee\'s current thinking on the balance sheet \u2014 what is the target size, and over what timeline do you expect to normalize it?',
        responses: [
          {
            id: 'bs3r1',
            label: 'Clear Framework',
            text: 'The committee\'s goal is to return the balance sheet to a level consistent with efficiently conducting monetary policy \u2014 we estimate that to be in the range of $5 to $6 trillion over the medium term. The pace will be determined by conditions in money markets and the broader economy.',
            credibilityImpact: 'positive',
            educationalNote: 'Giving a specific target range with a rationale is the gold standard of balance sheet communication. It guides expectations without over-committing to a specific number or timeline.'
          },
          {
            id: 'bs3r2',
            label: 'Vague on Target',
            text: 'The committee will reduce the balance sheet to a level sufficient to implement monetary policy efficiently. We\'ll know the right level when we get there.',
            credibilityImpact: 'neutral',
            educationalNote: '"We\'ll know it when we see it" is honest about uncertainty but frustrating for markets trying to price the terminal balance sheet size. Acceptable but not ideal communication.'
          },
          {
            id: 'bs3r3',
            label: 'Minimize the Issue',
            text: 'The balance sheet is running on autopilot at this point \u2014 the committee doesn\'t actively discuss it at every meeting. Our focus is on the rate path.',
            credibilityImpact: 'negative',
            educationalNote: 'Calling the balance sheet "autopilot" became famously problematic when the Fed used exactly that language in 2018 and then had to walk it back amid market turbulence. Markets take this as a sign the committee isn\'t watching.'
          }
        ]
      },
      {
        id: 'bs-pace-concern',
        conditions: { default: true },
        journalist: 'Reuters financial markets reporter',
        question: 'The balance sheet remains far larger than pre-pandemic levels. What is the committee\'s view on the appropriate long-run size of the Fed\'s balance sheet?',
        responses: [
          {
            id: 'bs4r1', label: 'Thoughtful',
            text: 'The floor system we operate requires a larger balance sheet than the pre-2008 corridor system. The right size is where reserves are ample but not excessive — we will know it when money market conditions tell us.',
            credibilityImpact: 'positive',
            educationalNote: 'Distinguishing between the floor and corridor systems shows genuine understanding of the plumbing. The "we will know it when we see it" framing is honest about the uncertainty.'
          },
          {
            id: 'bs4r2', label: 'Ambitious',
            text: 'We aim to normalize the balance sheet as much as the new operating framework allows. A smaller Fed footprint in financial markets restores more normal price discovery.',
            credibilityImpact: 'neutral',
            educationalNote: 'Framing normalization as restoring market functioning is a strong argument. But it sets expectations for further runoff that may need to be walked back.'
          },
          {
            id: 'bs4r3', label: 'Cautious',
            text: 'The economy has grown, demand for reserves has grown. The balance sheet will be permanently larger than it was before the financial crisis. The question is how much larger — and we are still learning.',
            credibilityImpact: 'neutral',
            educationalNote: 'Managing expectations that the balance sheet will never return to its pre-crisis size is important market communication. The humility about ongoing learning is appropriate.'
          }
        ]
      },
      {
        id: 'bs-mbs-holdings',
        conditions: { default: true },
        journalist: 'Wall Street Journal housing reporter',
        question: 'The Fed still holds trillions in mortgage-backed securities from its purchase programs. Should a central bank be involved in the mortgage market at all?',
        responses: [
          {
            id: 'bs5r1', label: 'Reform-Minded',
            text: 'I share the concern. The committee has discussed whether future asset purchases should be limited to Treasuries. That is a question for the framework review, but I can tell you it is being taken seriously.',
            credibilityImpact: 'positive',
            educationalNote: 'Signaling openness to reform on MBS purchases is forward-thinking and addresses a legitimate criticism of Fed intervention in specific credit markets.'
          },
          {
            id: 'bs5r2', label: 'Institutional',
            text: 'MBS purchases were an emergency tool deployed during extraordinary circumstances. As we normalize, the share of MBS on our balance sheet is declining through natural maturities and prepayments.',
            credibilityImpact: 'neutral',
            educationalNote: 'The standard institutional defense. Accurate but does not engage with the deeper question about the Fed\'s role in housing finance.'
          },
          {
            id: 'bs5r3', label: 'Defensive',
            text: 'The housing market is systemically important. Stabilizing MBS markets during crises serves financial stability, which is a core central bank responsibility.',
            credibilityImpact: 'neutral',
            educationalNote: 'Defending MBS purchases on financial stability grounds is valid but does not address the ongoing distortion of holding a large MBS portfolio in normal times.'
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

  'Median Dot': {
    title: 'The Median Dot',
    plain: 'The middle value when all FOMC participants\' rate projections are arranged from lowest to highest. The median is the single number markets focus on most — it represents the committee\'s "central tendency" for future rates.',
    context: 'A shift in the median dot between meetings is often the day\'s biggest market-moving event. Even a 25 bps shift reprices trillions in fixed-income markets.'
  },

  'Dot Shift': {
    title: 'Dot Shift Between Meetings',
    plain: 'The change in the median dot projection from one meeting to the next. A hawkish shift (higher) signals the committee now expects more tightening; a dovish shift (lower) signals less tightening or more easing.',
    context: 'The shift is often more newsworthy than the absolute level. "The median dot moved up 50 bps" is a headline; "the median dot is at 4.25%" is background.'
  },

  'Dot-to-Action Gap': {
    title: 'Dot-to-Action Gap',
    plain: 'The difference between what a Fed official projected at the previous meeting (their dot) and what actually happened at the current meeting. A large gap suggests the official\'s forecast was wrong or they changed course.',
    context: 'Markets hold the Fed accountable for its projections. Consistent follow-through makes future dots more powerful as a signaling tool. Chronic deviation makes them noise.'
  },

  'Forward Guidance': {
    title: 'Forward Guidance',
    plain: 'Communication by the central bank about the likely future path of monetary policy. The dot plot, post-meeting statement, and press conference all serve as forward guidance tools.',
    context: 'Forward guidance is itself a policy tool — by shaping expectations about future rates, the Fed can affect borrowing costs today without changing the current rate. Your dots are one of the most direct forms of forward guidance.'
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
  },

  // ── ECONOMIC ABBREVIATIONS ──────────────────────────────────────────────

  'PCE': {
    title: 'PCE \u2014 Personal Consumption Expenditures',
    plain: 'The Fed\'s preferred inflation measure. Tracks prices paid by consumers across a broader range of spending than CPI, and adjusts for changes in consumer behavior (e.g., switching from beef to chicken when beef gets expensive).',
    context: 'The Fed officially targets 2% PCE inflation \u2014 not CPI. PCE tends to run slightly lower than CPI. When the two diverge significantly, it signals something interesting about where price pressures are concentrated.'
  },

  'VIX': {
    title: 'VIX \u2014 CBOE Volatility Index',
    plain: 'Nicknamed the "fear gauge," the VIX measures expected volatility in the S&P 500 over the next 30 days, derived from options prices. A high VIX means markets are fearful; a low VIX means markets are calm.',
    context: 'The Fed watches the VIX as a real-time measure of financial stress. A VIX spike often precedes or accompanies financial crises. When the VIX surges above 30-40, markets are pricing in serious uncertainty \u2014 and the Fed may feel pressure to act.'
  },

  'DXY': {
    title: 'DXY \u2014 US Dollar Index',
    plain: 'A measure of the US dollar\'s value relative to a basket of six major foreign currencies (euro, yen, pound, Canadian dollar, Swedish krona, Swiss franc). A higher DXY means a stronger dollar.',
    context: 'A strong dollar makes US exports more expensive and imports cheaper \u2014 which can dampen inflation but hurt US manufacturers. The Fed doesn\'t target the dollar, but dollar strength affects trade, capital flows, and global financial conditions.'
  },

  'MBS': {
    title: 'MBS \u2014 Mortgage-Backed Securities',
    plain: 'Bonds backed by pools of home mortgages. When the Fed buys MBS (during QE), it pushes mortgage rates down directly, stimulating the housing market. The Fed accumulated over $2.7 trillion in MBS at its peak.',
    context: 'MBS purchases are a major channel through which QE reaches ordinary Americans \u2014 lower mortgage rates mean cheaper home loans. When the Fed does QT and stops reinvesting MBS proceeds, mortgage rates tend to rise.'
  },

  'FFR': {
    title: 'FFR \u2014 Federal Funds Rate',
    plain: 'The target interest rate set by the FOMC at which banks lend money to each other overnight. The Fed\'s primary short-term policy tool. All other interest rates in the economy tend to move in relation to the FFR.',
    context: 'This is the number you set at every meeting. Every basis point move ripples through the entire economy \u2014 affecting mortgages, business loans, credit cards, and savings rates across trillions of dollars in outstanding debt.'
  },

  'EFFR': {
    title: 'EFFR \u2014 Effective Federal Funds Rate',
    plain: 'The actual overnight rate at which banks lend to each other, as opposed to the target rate set by the FOMC. The Fed uses open market operations to keep the EFFR within its target range.',
    context: 'The target range is what the committee sets (e.g., 3.50-3.75%). The EFFR is where trades actually clear. The Fed uses tools like the Interest on Reserve Balances (IORB) rate to keep the EFFR near the middle of the target range.'
  },

  'IORB': {
    title: 'IORB \u2014 Interest on Reserve Balances',
    plain: 'The interest rate the Federal Reserve pays to banks for the money they hold in reserve accounts at the Fed. Acts as a floor for the federal funds rate \u2014 banks won\'t lend to each other for less than what the Fed pays them to do nothing.',
    context: 'IORB is one of the technical tools the Fed uses to implement policy. When the FOMC raises the target range, it also raises IORB \u2014 ensuring banks have an incentive to keep the EFFR near the target.'
  },

  'BOG': {
    title: 'BOG \u2014 Board of Governors',
    plain: 'The seven-member governing body of the Federal Reserve System, located in Washington DC. Members are appointed by the President and confirmed by the Senate for 14-year terms. The Chair and Vice Chair serve 4-year terms in those roles.',
    context: 'All seven BOG members are permanent voting members of the FOMC. The regional bank presidents rotate voting rights (except New York, which always votes). As Chair, you lead the BOG and by extension the entire Federal Reserve System.'
  },

  'FRB': {
    title: 'FRB \u2014 Federal Reserve Bank',
    plain: 'One of the 12 regional Federal Reserve Banks that make up the Federal Reserve System, located in major cities across the US (New York, Chicago, San Francisco, etc.). Each has its own president and research staff.',
    context: 'The 12 FRB presidents participate in every FOMC meeting, but only 5 vote at any given time (on a rotating basis, except New York which always votes). Their regional perspective and research teams provide the committee with a ground-level view of economic conditions.'
  },

  'SEP': {
    title: 'SEP \u2014 Summary of Economic Projections',
    plain: 'A quarterly report released after select FOMC meetings showing each committee member\'s anonymous forecasts for GDP growth, unemployment, inflation, and the federal funds rate path. The rate path projections are displayed as the "dot plot."',
    context: 'The SEP is released four times per year (March, June, September, December meetings). When the SEP shows a significant shift in the committee\'s median projections, it can move markets as much as the rate decision itself.'
  },

  'QE': {
    title: 'QE \u2014 Quantitative Easing',
    plain: 'When the Federal Reserve creates new money to purchase Treasury bonds and mortgage-backed securities, expanding its balance sheet. Pushes long-term interest rates down and injects liquidity into the financial system.',
    context: 'QE was considered unconventional before 2008. After the financial crisis and COVID, it became a standard tool. The Fed\'s balance sheet grew from $900B (2008) to nearly $9 trillion (2022) through successive rounds of QE.'
  },

  'QT': {
    title: 'QT \u2014 Quantitative Tightening',
    plain: 'The reverse of QE. The Fed shrinks its balance sheet by allowing bonds to mature without reinvesting the proceeds (passive QT) or actively selling assets. Removes liquidity from the financial system.',
    context: 'QT tightens financial conditions beyond what rate hikes alone achieve \u2014 it puts upward pressure on long-term rates. The 2022-2024 QT cycle ran at up to $95B per month, one of the fastest balance sheet reductions in Fed history.'
  },

  'TIPS': {
    title: 'TIPS \u2014 Treasury Inflation-Protected Securities',
    plain: 'US government bonds whose principal adjusts with inflation. The yield on TIPS is a measure of the "real" interest rate \u2014 the return after stripping out inflation expectations.',
    context: 'The gap between nominal Treasury yields and TIPS yields (the "breakeven rate") tells the Fed what markets expect inflation to be. If breakevens rise sharply, it signals markets are losing confidence in the Fed\'s inflation-fighting credibility.'
  },

  'BLS': {
    title: 'BLS \u2014 Bureau of Labor Statistics',
    plain: 'The federal agency that produces key economic data including the monthly jobs report (non-farm payrolls), the unemployment rate, and the Consumer Price Index (CPI).',
    context: 'BLS releases are among the most market-moving events in the economic calendar. The jobs report (first Friday of each month) and CPI (mid-month) are the two numbers the committee watches most closely between meetings.'
  },

  'BEA': {
    title: 'BEA \u2014 Bureau of Economic Analysis',
    plain: 'The federal agency that produces GDP data and the Personal Consumption Expenditures (PCE) price index \u2014 the Fed\'s preferred inflation measure.',
    context: 'The BEA releases PCE data monthly. Because the Fed explicitly targets PCE inflation at 2%, BEA releases directly inform the committee\'s policy deliberations.'
  },

  'ISM': {
    title: 'ISM \u2014 Institute for Supply Management',
    plain: 'A private organization that surveys purchasing managers at US companies and publishes monthly indexes of manufacturing and services sector activity. An ISM reading above 50 indicates expansion; below 50 indicates contraction.',
    context: 'ISM surveys are forward-looking \u2014 purchasing managers are ordering for future production. When ISM falls sharply, it often signals economic slowdown before it shows up in GDP data. The committee uses ISM as an early warning indicator.'
  },

  'PMI': {
    title: 'PMI \u2014 Purchasing Managers\' Index',
    plain: 'A measure of business activity based on surveys of purchasing managers in manufacturing and services sectors. Like ISM, a reading above 50 = expansion, below 50 = contraction. Published by S&P Global (formerly IHS Markit).',
    context: 'PMI and ISM cover similar ground but use different methodologies. The committee watches both as real-time pulse checks on business conditions. Divergences between the two can signal which sectors are leading or lagging.'
  },

  'JOLTS': {
    title: 'JOLTS \u2014 Job Openings and Labor Turnover Survey',
    plain: 'A monthly BLS survey tracking job openings, hires, quits, and layoffs across the US economy. The job openings number is a key measure of labor demand; the quits rate measures worker confidence.',
    context: 'At the peak of labor market tightness in 2022, there were nearly two job openings for every unemployed worker \u2014 an extreme reading the Fed cited as evidence of overheating. Watching JOLTS normalize was part of how the committee gauged the impact of its rate hikes.'
  },

  'NFP': {
    title: 'NFP \u2014 Non-Farm Payrolls',
    plain: 'The monthly count of jobs added or lost in the US economy, excluding farm workers and a few other categories. Released the first Friday of each month by the BLS. One of the most market-moving economic releases.',
    context: 'A strong NFP print (above ~150K) generally argues against rate cuts. A weak print raises recession fears and argues for easing. Revisions to prior months are often as significant as the new number \u2014 the committee reads the trend, not just the headline.'
  },

  'NAIRU': {
    title: 'NAIRU \u2014 Non-Accelerating Inflation Rate of Unemployment',
    plain: 'The theoretical unemployment rate at which inflation is stable \u2014 neither rising nor falling. Sometimes called the "natural rate" of unemployment. Estimated (not observed) to be around 4-4.5% for the US.',
    context: 'When unemployment falls significantly below NAIRU, wage pressure tends to build and inflation rises. When it rises above NAIRU, inflation tends to fall but at the cost of economic pain. The committee uses NAIRU as a benchmark \u2014 though nobody knows exactly where it is.'
  },

  'S&P': {
    title: 'S&P 500',
    plain: 'A stock market index tracking the 500 largest US publicly traded companies. The most widely followed measure of US equity market performance.',
    context: 'The Fed doesn\'t target the stock market \u2014 but equity prices are part of financial conditions. A sharp S&P selloff tightens financial conditions (wealth effect, corporate borrowing costs) in ways that can substitute for rate hikes.'
  },

  'S&P 500': {
    title: 'S&P 500',
    plain: 'A stock market index tracking the 500 largest US publicly traded companies. The most widely followed measure of US equity market performance.',
    context: 'The Fed doesn\'t target the stock market \u2014 but equity prices are part of financial conditions. A sharp S&P selloff tightens financial conditions (wealth effect, corporate borrowing costs) in ways that can substitute for rate hikes.'
  },

  '2Y': {
    title: '2-Year Treasury Yield',
    plain: 'The interest rate on US government bonds maturing in 2 years. Closely tracks expectations for the federal funds rate over the next two years \u2014 making it the most policy-sensitive point on the yield curve.',
    context: 'When the 2Y yield rises, it signals markets expect the Fed to hike (or hold higher for longer). When it falls, markets are pricing in cuts. The committee watches the 2Y as a real-time read on how markets are interpreting its guidance.'
  },

  '10Y': {
    title: '10-Year Treasury Yield',
    plain: 'The interest rate on US government bonds maturing in 10 years. The benchmark for long-term US interest rates and a key input into mortgage rates, corporate borrowing costs, and equity valuations.',
    context: 'The 10Y is influenced by both Fed policy and longer-run growth and inflation expectations. When QT reduces the Fed\'s bond holdings, it can push the 10Y higher \u2014 tightening financial conditions even without rate hikes.'
  },

  // ── INSTITUTIONAL ABBREVIATIONS ─────────────────────────────────────────

  'Fed': {
    title: 'The Fed \u2014 Federal Reserve System',
    plain: 'The central bank of the United States, established by Congress in 1913. Consists of the Board of Governors in Washington DC and 12 regional Federal Reserve Banks. Responsible for monetary policy, bank supervision, and financial stability.',
    context: 'You are running the Fed. Its dual mandate \u2014 maximum employment and stable prices \u2014 defines the tension at the heart of every decision you make.'
  },

  'Treasury': {
    title: 'US Treasury Department',
    plain: 'The executive branch department responsible for fiscal policy \u2014 government spending, taxation, and debt management. Issues Treasury bonds to finance the federal deficit. Distinct from the Federal Reserve.',
    context: 'The Fed and Treasury are institutionally separate, and the Fed\'s independence from Treasury (and the broader executive branch) is a cornerstone of its credibility. Perceived coordination between the two can undermine confidence in monetary policy.'
  },

  'TBAC': {
    title: 'TBAC \u2014 Treasury Borrowing Advisory Committee',
    plain: 'A committee of major financial institutions that advises the Treasury on debt management and bond issuance strategy. Its quarterly meetings and reports are closely watched by bond markets.',
    context: 'When Treasury issues large amounts of debt, it can compete with the Fed\'s bond sales (QT) for market demand \u2014 a dynamic called "quantitative tightening squared" that can push long-term yields higher than the Fed intends.'
  },

  // ── FOMC MEMBER BIOGRAPHIES ─────────────────────────────────────────────

  'Jerome H. Powell': {
    title: 'Jerome H. Powell \u2014 Chair (Meetings 1-2)',
    plain: 'Lawyer and investment banker by background. Served as a Fed Governor before becoming Chair in 2018. Known for pragmatic, data-driven approach. Led the Fed through COVID-era QE and the 2022-2024 inflation-fighting cycle.',
    context: 'Powell\'s policy approach: cautious incrementalism, strong emphasis on communication, willing to move aggressively when needed (2022 hiking cycle). His legacy is defined by whether the 2022-2024 tightening achieves a soft landing.'
  },

  'Kevin Warsh': {
    title: 'Kevin Warsh \u2014 Chair (Meetings 3-8)',
    plain: 'Former Fed Governor (2006-2011), investment banker, and Hoover Institution fellow. Known as a monetary policy hawk with strong views on Fed independence and balance sheet normalization. Confirmed as Chair in 2026.',
    context: 'Warsh\'s policy philosophy: skeptical of QE\'s long-term effects, favors rules-based policy over discretion, hawkish on inflation. Markets expect a more assertive approach to balance sheet reduction and a higher bar for rate cuts.'
  },

  'Philip N. Jefferson': {
    title: 'Philip N. Jefferson \u2014 Vice Chair',
    plain: 'Economist and former economics professor. Joined the Board of Governors in 2022, became Vice Chair in 2023. Research focus on labor economics and the distributional effects of monetary policy.',
    context: 'Jefferson is considered a pragmatic centrist \u2014 data-dependent and measured. His labor economics background means he weighs the employment side of the dual mandate carefully alongside inflation concerns.'
  },

  'Michelle W. Bowman': {
    title: 'Michelle W. Bowman \u2014 Governor',
    plain: 'Former Kansas state bank commissioner and community banker. Appointed to the Board of Governors in 2018 to fill the seat designated for someone with community banking experience.',
    context: 'Bowman has shown hawkish tendencies, voting to dissent in favor of a larger rate cut in 2024 \u2014 a rare dissent by a Fed Governor. She emphasizes the practical impact of Fed policy on community banks and smaller businesses.'
  },

  'Michael S. Barr': {
    title: 'Michael S. Barr \u2014 Governor (Vice Chair for Supervision)',
    plain: 'Law professor and former Treasury official. Serves as the Fed\'s Vice Chair for Supervision, overseeing bank regulation and stress testing. Nominated in 2022 as part of a push to strengthen bank oversight post-SVB.',
    context: 'Barr\'s primary role is regulatory rather than monetary policy. His presence on the FOMC reflects the Fed\'s dual role as both central bank and bank supervisor. Financial stability considerations sometimes interact with monetary policy decisions.'
  },

  'Lisa D. Cook': {
    title: 'Lisa D. Cook \u2014 Governor',
    plain: 'Economist and Michigan State University professor. First Black woman to serve on the Federal Reserve Board of Governors, confirmed in 2022. Research focuses on innovation, economic history, and the economics of inequality.',
    context: 'Cook tends to vote with the consensus but has emphasized the importance of the employment mandate alongside inflation. Her research background in economic inequality informs her attention to how monetary policy affects different communities.'
  },

  'Christopher J. Waller': {
    title: 'Christopher J. Waller \u2014 Governor',
    plain: 'Economist and former research director at the St. Louis Federal Reserve Bank. Joined the Board of Governors in 2020. Known for clear, direct communication of his policy views and willingness to stake out positions publicly.',
    context: 'Waller is one of the more hawkish voices on the current Board, having argued for aggressive rate hikes during the 2022 inflation surge. He\'s also willing to shift views when the data shifts \u2014 which markets respect as genuine data-dependence.'
  },

  'John C. Williams': {
    title: 'John C. Williams \u2014 President, Federal Reserve Bank of New York',
    plain: 'Economist and career Fed official. President of the NY Fed since 2018, giving him a permanent vote on the FOMC. Previously President of the San Francisco Fed. Known for research on the neutral interest rate (r*).',
    context: 'The NY Fed president always votes and is considered the most important regional bank president. Williams is a close Powell ally and is seen as a centrist. His r* research directly informs debates about how restrictive current policy actually is.'
  },

  'Austan Goolsbee': {
    title: 'Austan Goolsbee \u2014 Former President, Federal Reserve Bank of Chicago',
    plain: 'Economist and University of Chicago professor. Former chair of President Obama\'s Council of Economic Advisers. Known for accessible public communication about the economy.',
    context: 'Goolsbee was notably dovish during the 2023-2024 tightening cycle, frequently cautioning about the risks of over-tightening. Departed the Chicago Fed; his successor is Anna Paulson.'
  },

  'Anna Paulson': {
    title: 'Anna Paulson \u2014 President, Federal Reserve Bank of Chicago',
    plain: 'Economist and career Federal Reserve official. Former executive vice president and director of research at the Chicago Fed before becoming president. Research focuses on financial stability and household finance.',
    context: 'Paulson succeeds Goolsbee as Chicago Fed President. As a career Fed economist, she brings deep institutional knowledge. Her policy stance is still being established \u2014 markets watch her early votes carefully for signals.'
  },

  'Beth M. Hammack': {
    title: 'Beth M. Hammack \u2014 President, Federal Reserve Bank of Cleveland',
    plain: 'Former Goldman Sachs executive who spent decades in financial markets before becoming Cleveland Fed President in 2024. Brings a markets perspective to the FOMC table.',
    context: 'Hammack dissented at a 2024 FOMC meeting in favor of holding rates rather than cutting \u2014 a hawkish signal early in her tenure. Her financial markets background means she pays close attention to how Fed communication lands with investors.'
  },

  'Stephen I. Miran': {
    title: 'Stephen I. Miran \u2014 Governor (serving until successor confirmed)',
    plain: 'Economist and former senior advisor at the Treasury Department. Nominated to the Board of Governors as part of the current administration\'s appointments. Research interests include international economics and monetary policy.',
    context: 'Miran\'s appointment reflects the administration\'s priorities in Fed governance. His Treasury background means he has perspective on the fiscal-monetary policy interface \u2014 a relationship the Fed carefully manages to preserve its independence.'
  },

  'Susan M. Collins': {
    title: 'Susan M. Collins \u2014 President, Federal Reserve Bank of Boston',
    plain: 'Economist and former provost of the University of Michigan. Boston Fed President since 2022. Research background in international economics and labor markets.',
    context: 'Collins is considered a centrist on the FOMC, emphasizing data-dependence and the importance of both sides of the dual mandate. Her international economics background informs her attention to global spillovers from Fed policy.'
  },

  'Raphael Bostic': {
    title: 'Raphael Bostic \u2014 President, Federal Reserve Bank of Atlanta',
    plain: 'Economist and former HUD official. Atlanta Fed President since 2017. Known for emphasizing the distributional effects of monetary policy and how Fed decisions affect low-income communities.',
    context: 'Bostic\'s policy stance has evolved \u2014 early hawkishness on inflation has given way to more cautious advocacy for cuts as inflation moderated. He is known for candid, accessible public communication about Fed thinking.'
  },

  'Neel Kashkari': {
    title: 'Neel Kashkari \u2014 President, Federal Reserve Bank of Minneapolis',
    plain: 'Former Goldman Sachs executive and US Treasury official who oversaw the 2008 TARP bank bailout program. Minneapolis Fed President since 2016. Known for blunt, accessible communication.',
    context: 'Kashkari was famously dovish in his early Fed career but shifted hawkish during the 2021-2022 inflation surge \u2014 becoming one of the most aggressive voices for rate hikes. His public commentary is among the most widely read of any regional president.'
  },

  'Mary C. Daly': {
    title: 'Mary C. Daly \u2014 President, Federal Reserve Bank of San Francisco',
    plain: 'Labor economist who spent her career at the San Francisco Fed before becoming president in 2018. Research focuses on labor markets, wage dynamics, and the economics of disability.',
    context: 'Daly is a centrist who strongly emphasizes the employment side of the dual mandate. Her labor economics background means she is particularly attentive to how rate decisions affect workers \u2014 especially lower-wage workers who are often first affected by Fed tightening.'
  },

  // ── MISSING FRB PRESIDENT BIOGRAPHIES ─────────────────────────────────

  'Patrick T. Harker': {
    title: 'Patrick T. Harker \u2014 President, Federal Reserve Bank of Philadelphia',
    plain: 'Engineer and former university president (University of Delaware). Philadelphia Fed President since 2015. Brings an academic and management perspective to the FOMC. Known for measured, data-driven analysis.',
    context: 'Harker is considered a centrist on the committee. He advocated for an early pause in the 2022-2023 hiking cycle and tends to favor a gradual approach to policy changes. His engineering background shows in his emphasis on quantitative analysis.'
  },

  'Lorie K. Logan': {
    title: 'Lorie K. Logan \u2014 President, Federal Reserve Bank of Dallas',
    plain: 'Career Fed official who spent over two decades at the New York Fed managing the System Open Market Account (SOMA) \u2014 the Fed\'s massive portfolio of Treasury and mortgage-backed securities. Dallas Fed President since 2022.',
    context: 'Logan\'s deep expertise in financial markets and balance sheet operations makes her one of the most technically informed FOMC members. She has been hawkish on inflation and particularly attentive to how QT affects market liquidity and Treasury functioning.'
  },

  'Tom Barkin': {
    title: 'Tom Barkin \u2014 President, Federal Reserve Bank of Richmond',
    plain: 'Former McKinsey senior partner with extensive business consulting experience. Richmond Fed President since 2018. Known for translating complex economic concepts into accessible business language.',
    context: 'Barkin brings a practitioner\'s perspective to the FOMC, drawing on his consulting experience to interpret how businesses are actually responding to economic conditions. He tends toward centrism, emphasizing the importance of seeing sustained inflation progress before easing.'
  },

  'Alberto Musalem': {
    title: 'Alberto Musalem \u2014 President, Federal Reserve Bank of St. Louis',
    plain: 'Former investment executive and economist. Became St. Louis Fed President in 2024, succeeding James Bullard. Background in fixed income and macroeconomic research at major financial institutions.',
    context: 'Musalem took over a bank with a strong monetarist tradition. His financial markets background gives him particular insight into how Fed policy transmits through bond markets and credit conditions.'
  },

  'Jeff Schmid': {
    title: 'Jeff Schmid \u2014 President, Federal Reserve Bank of Kansas City',
    plain: 'Career banking executive and regulator. Kansas City Fed President since 2023. Background in community and regional banking, with experience at the FDIC and in bank leadership.',
    context: 'Schmid\'s banking background gives him a ground-level view of how monetary policy affects lending conditions, especially for smaller banks and businesses in the heartland. He has leaned hawkish in his early tenure.'
  },

  // ── INFLATION MEASURES ────────────────────────────────────────────────

  'Headline Inflation': {
    title: 'Headline Inflation',
    plain: 'The total inflation rate including all items \u2014 food, energy, and everything else. More volatile than "core" measures because food and energy prices swing sharply with supply disruptions, weather, and geopolitics.',
    context: 'Headline inflation is what consumers feel directly at the grocery store and gas pump. The Fed focuses on core measures for policy, but headline inflation shapes public perception and political pressure on the committee.'
  },

  'Core Inflation': {
    title: 'Core Inflation',
    plain: 'Inflation with food and energy prices stripped out. Because food and energy are volatile and often driven by supply factors the Fed can\'t control, core inflation gives a cleaner signal of underlying price trends.',
    context: 'When headline and core inflation diverge, it tells the committee something important. If headline is high but core is falling, the price pressure may be temporary. If both are elevated, the inflation problem is broad-based and harder to solve.'
  },

  'Supercore Inflation': {
    title: 'Supercore Inflation',
    plain: 'Core services inflation excluding housing \u2014 sometimes called "supercore." Closely watched because services prices are heavily influenced by labor costs, making this a proxy for wage-driven inflation.',
    context: 'Fed Chair Powell highlighted supercore as a key metric in 2023. When goods inflation faded but services stayed hot, supercore became the committee\'s preferred gauge of whether inflation was truly coming under control.'
  },

  'Shelter Inflation': {
    title: 'Shelter Inflation (OER)',
    plain: 'The housing component of inflation, measured primarily through Owners\' Equivalent Rent (OER) \u2014 an estimate of what homeowners would pay to rent their own home. Makes up roughly one-third of CPI.',
    context: 'Shelter inflation is notoriously "sticky" and lags real-time rent data by 12-18 months. The committee knows shelter inflation will eventually fall as new lease data feeds through, but it still dominates the headline numbers while it\'s elevated.'
  },

  'Breakeven Rate': {
    title: 'Breakeven Inflation Rate',
    plain: 'The difference between nominal Treasury yields and TIPS (inflation-protected) yields. Represents the market\'s expectation for average annual inflation over a given period (usually 5 or 10 years).',
    context: 'Breakevens are the Fed\'s real-time read on whether markets believe it will hit its 2% target. Rising breakevens signal markets losing confidence in the Fed\'s inflation-fighting credibility. Falling breakevens signal confidence \u2014 or recession fears.'
  },

  'Inflation Target': {
    title: 'The 2% Inflation Target',
    plain: 'The Fed\'s official goal: 2% annual inflation as measured by PCE. Adopted formally in 2012 under Chair Bernanke. In 2020, the Fed shifted to "average inflation targeting" \u2014 allowing temporary overshoots to make up for periods of undershooting.',
    context: 'The 2% target is the anchor of the entire monetary policy framework. It\'s low enough to be manageable but high enough to give the Fed room to cut rates in a downturn (since rates can\'t easily go below zero).'
  },

  // ── UNEMPLOYMENT & LABOR MEASURES ─────────────────────────────────────

  'Unemployment Rate': {
    title: 'Unemployment Rate (U-3)',
    plain: 'The percentage of the labor force that is jobless and actively seeking work. The official (U-3) rate doesn\'t count people who have stopped looking for work or who are underemployed.',
    context: 'The unemployment rate is one half of what the Fed is trying to optimize. Below ~4% is considered very tight; above ~5% raises concern. But the rate alone doesn\'t tell the full story \u2014 the committee also watches participation, wages, and JOLTS data.'
  },

  'Initial Claims': {
    title: 'Initial Jobless Claims',
    plain: 'The number of Americans filing new unemployment insurance claims each week. One of the most timely labor market indicators available \u2014 released every Thursday with only a one-week lag.',
    context: 'Claims below ~220K signal a healthy labor market. A sustained rise above 300K can signal recession is underway. Because it\'s weekly, the committee uses claims as an early warning system between the monthly jobs reports.'
  },

  'Wage Growth': {
    title: 'Wage Growth',
    plain: 'The rate at which workers\' earnings are increasing, measured by Average Hourly Earnings (AHE) or the Employment Cost Index (ECI). Important because wages are the largest cost for most businesses.',
    context: 'The committee watches wages for signs of a "wage-price spiral" \u2014 where higher wages lead to higher prices, which lead to demands for even higher wages. Wage growth of 3-3.5% is roughly consistent with 2% inflation; above 4% raises concerns.'
  },

  'Quits Rate': {
    title: 'Quits Rate',
    plain: 'The percentage of employed workers who voluntarily leave their jobs each month, from the JOLTS survey. A high quits rate signals worker confidence \u2014 people only quit when they believe they can find something better.',
    context: 'The quits rate peaked at 3% in 2022, reflecting extreme labor market tightness. As it normalizes back toward 2.3-2.5%, it signals the labor market is cooling without a sharp deterioration \u2014 exactly what the committee wants to see in a soft landing.'
  },

  // ── GROWTH & ACTIVITY MEASURES ────────────────────────────────────────

  'Potential Output': {
    title: 'Potential Output (Potential GDP)',
    plain: 'The maximum level of economic output an economy can sustain without generating accelerating inflation. Determined by labor supply, capital stock, and productivity growth \u2014 typically estimated around 1.8-2.0% for the US.',
    context: 'When actual GDP exceeds potential (a positive "output gap"), the economy is running hot and inflation pressure builds. When actual GDP falls below potential (a negative output gap), there\'s slack in the economy and inflation tends to fall.'
  },

  'Output Gap': {
    title: 'Output Gap',
    plain: 'The difference between actual GDP and potential GDP. A positive output gap means the economy is producing more than it sustainably can; a negative gap means there\'s unused capacity.',
    context: 'The output gap is central to the Fed\'s framework. A positive gap argues for tighter policy; a negative gap argues for easier policy. The challenge is that potential output is estimated, not observed \u2014 so there\'s always uncertainty about where the gap actually is.'
  },

  'Consumer Spending': {
    title: 'Consumer Spending',
    plain: 'Household expenditures on goods and services. Makes up roughly 70% of US GDP, making it the single most important driver of economic growth. Tracked monthly through retail sales and the PCE report.',
    context: 'When consumers pull back, recession risk rises sharply. The committee watches consumer spending for signs that rate hikes are having their intended effect \u2014 slowing demand enough to reduce inflation without causing a sharp contraction.'
  },

  'Industrial Production': {
    title: 'Industrial Production',
    plain: 'A measure of output from US factories, mines, and utilities, published monthly by the Federal Reserve. Covers about 16% of GDP but is more cyclically sensitive than services.',
    context: 'Industrial production is an early indicator of economic turning points. Manufacturing tends to lead the business cycle \u2014 slowing before the broader economy in downturns and recovering first in expansions.'
  },

  'Housing Starts': {
    title: 'Housing Starts',
    plain: 'The number of new residential construction projects begun each month. Highly sensitive to interest rates because most home purchases are financed with mortgages.',
    context: 'Housing is one of the most interest-rate-sensitive sectors of the economy. When the Fed hikes, housing starts often fall first and fastest. The committee watches housing as a leading indicator of how its rate decisions are transmitting through the economy.'
  },

  'Retail Sales': {
    title: 'Retail Sales',
    plain: 'Monthly measure of total receipts at retail stores, from department stores to online retailers. A key indicator of consumer demand and a major input into GDP estimates.',
    context: 'Strong retail sales can argue against rate cuts (consumers still spending freely), while weak sales raise concerns about demand destruction from tight policy. The committee reads retail sales alongside consumer confidence surveys for a complete picture.'
  },

  // ── FINANCIAL MARKET TERMS ────────────────────────────────────────────

  'Term Premium': {
    title: 'Term Premium',
    plain: 'The extra yield investors demand for holding longer-term bonds instead of rolling over short-term bonds. Compensates for the risk that interest rates, inflation, or economic conditions could change over the bond\'s life.',
    context: 'When the term premium rises, long-term rates increase even if the Fed holds short-term rates steady \u2014 tightening financial conditions automatically. QT can push the term premium higher by increasing the supply of long-term bonds that private markets must absorb.'
  },

  'Risk Premium': {
    title: 'Risk Premium',
    plain: 'The additional return investors require above a risk-free rate (like Treasuries) to hold riskier assets like corporate bonds or stocks. Widens during periods of uncertainty and narrows when confidence is high.',
    context: 'The Fed monitors risk premiums across asset classes as a gauge of financial stress. Sharply widening premiums can signal a "risk-off" episode that tightens financial conditions beyond what the Fed intended.'
  },

  'Flight to Quality': {
    title: 'Flight to Quality',
    plain: 'When investors sell risky assets (stocks, corporate bonds) and buy safe assets (US Treasuries, gold) during periods of fear or uncertainty. Drives Treasury yields down and stock prices lower simultaneously.',
    context: 'A flight to quality can ease financial conditions for the government (lower borrowing costs) while tightening them for everyone else (wider credit spreads, lower stock prices). The committee watches for these episodes as signs of financial stress.'
  },

  'Repo Rate': {
    title: 'Repo Rate (Repurchase Agreement Rate)',
    plain: 'The interest rate in the repurchase agreement market, where financial institutions borrow short-term by selling securities with an agreement to buy them back. The repo market is a critical source of short-term funding for banks and dealers.',
    context: 'Repo market stress can signal broader liquidity problems in the financial system. The Fed operates a Standing Repo Facility as a backstop. Repo rate spikes (like September 2019) can force the Fed to intervene to maintain control of short-term interest rates.'
  },

  'Money Supply': {
    title: 'Money Supply (M2)',
    plain: 'The total amount of money circulating in the economy, including cash, checking deposits, savings deposits, and money market funds. M2 grew explosively during COVID-era stimulus and has since contracted.',
    context: 'Monetarists argue that money supply growth drives inflation. The Fed officially de-emphasized monetary aggregates decades ago, but the sharp M2 growth during 2020-2021 (and its correlation with subsequent inflation) revived the debate.'
  },

  'Liquidity': {
    title: 'Liquidity',
    plain: 'How easily assets can be bought or sold without affecting their price. Also refers to the availability of cash and near-cash in the financial system. The Fed is both a provider and drainer of liquidity through its operations.',
    context: 'QE floods the system with liquidity; QT drains it. When liquidity becomes scarce, markets can become volatile and fragile. The committee monitors reserve levels and money market conditions to ensure QT doesn\'t drain too much too fast.'
  },

  // ── POLICY FRAMEWORK TERMS ────────────────────────────────────────────

  'Taylor Rule': {
    title: 'The Taylor Rule',
    plain: 'A formula proposed by economist John Taylor that suggests what the Fed Funds Rate should be based on current inflation and the output gap. Provides a mechanical benchmark for whether policy is too tight, too loose, or about right.',
    context: 'The committee doesn\'t follow the Taylor Rule mechanically, but it\'s a widely cited benchmark. When the actual rate is well below what the Taylor Rule suggests, hawks argue policy is too loose. When it\'s above, doves argue policy is too restrictive.'
  },

  'Phillips Curve': {
    title: 'The Phillips Curve',
    plain: 'The theoretical inverse relationship between unemployment and inflation \u2014 lower unemployment leads to higher inflation, and vice versa. Named after economist A.W. Phillips. The relationship has been unstable in recent decades.',
    context: 'The Phillips Curve is foundational to the Fed\'s framework, even though it doesn\'t always hold. The 2010s (low unemployment, low inflation) challenged the curve. The 2020s (supply-driven inflation with low unemployment) challenged it again.'
  },

  'Data Dependent': {
    title: 'Data Dependent',
    plain: 'The Fed\'s stated approach of making policy decisions based on incoming economic data rather than following a predetermined path. Essentially means "we\'ll decide at each meeting based on what the numbers show."',
    context: 'Saying the committee is "data dependent" sounds neutral but carries a specific signal: it means the Fed is NOT committing to a particular path. Markets hear it as "anything could happen next meeting" \u2014 which can increase or decrease uncertainty depending on context.'
  },

  'Accommodative': {
    title: 'Accommodative Policy',
    plain: 'When interest rates are set below the neutral rate, policy is "accommodative" \u2014 it is actively stimulating economic activity. The opposite of "restrictive." The committee uses this word carefully because it signals the direction of policy.',
    context: 'Describing policy as "accommodative" implies the committee believes rates need to rise to reach neutral. Shifting language from "accommodative" to "neutral" or "restrictive" is a significant communication event that markets track closely.'
  },

  'Terminal Rate': {
    title: 'Terminal Rate',
    plain: 'The expected peak interest rate in a hiking cycle \u2014 the point where the Fed stops raising rates. Not an official Fed term, but widely used by markets and economists to discuss the endpoint of tightening.',
    context: 'Market expectations for the terminal rate directly affect financial conditions today. If markets think the terminal rate will be 5.5%, long-term rates adjust immediately \u2014 even if the current rate is only 4%. Managing terminal rate expectations is a key part of forward guidance.'
  },

  'Pivot': {
    title: 'Fed Pivot',
    plain: 'A shift in the direction of monetary policy \u2014 from hiking to holding, or from holding to cutting. In market parlance, "the pivot" usually refers to the moment the Fed signals it\'s done tightening.',
    context: 'Markets are constantly trying to anticipate the pivot. Even a hint that the committee is considering a change in direction can cause large asset price moves. Premature pivot expectations can loosen financial conditions in ways that complicate the Fed\'s work.'
  },

  'Taper': {
    title: 'Taper / Tapering',
    plain: 'Gradually reducing the pace of asset purchases (QE) before stopping them entirely. The term became famous during the 2013 "Taper Tantrum," when Chair Bernanke\'s mention of tapering caused a sharp bond market selloff.',
    context: 'Tapering is the bridge between full QE and the end of QE. The 2013 experience taught the Fed that even discussing tapering can roil markets \u2014 so modern Fed chairs telegraph tapering intentions well in advance to avoid surprises.'
  },

  'Moral Hazard': {
    title: 'Moral Hazard',
    plain: 'The risk that protecting people or institutions from the consequences of their actions encourages them to take more risk in the future. In Fed context: if markets believe the Fed will always bail them out, they take on excessive risk.',
    context: 'The "Fed put" \u2014 the belief that the Fed will cut rates or provide liquidity whenever markets fall significantly \u2014 is a form of moral hazard. Critics argue it inflates asset bubbles and encourages reckless risk-taking.'
  },

  'Lender of Last Resort': {
    title: 'Lender of Last Resort',
    plain: 'The Fed\'s role as the ultimate backstop for the financial system. When banks can\'t borrow from anyone else, the Fed can lend to them through the discount window and emergency lending facilities.',
    context: 'This function exists to prevent bank runs and financial panics. But it creates tension with the moral hazard problem: if banks know the Fed will always rescue them, they may take excessive risks. The committee tries to balance stability with market discipline.'
  },

  'Open Market Operations': {
    title: 'Open Market Operations',
    plain: 'The Fed\'s buying and selling of government securities in the open market to implement monetary policy. This is the primary mechanism through which the Fed controls the federal funds rate and manages the money supply.',
    context: 'The New York Fed\'s Open Market Desk executes these operations daily. QE and QT are large-scale versions of open market operations. Even routine operations affect liquidity conditions throughout the financial system.'
  },

  'Soft Landing': {
    title: 'Soft Landing',
    plain: 'The ideal outcome of a rate-hiking cycle: inflation returns to 2% without triggering a recession. Historically rare \u2014 most tightening cycles end in recession. The 1994-95 cycle is the canonical example of success.',
    context: 'Whether you achieve a soft landing depends on your decisions across all 8 meetings. Too aggressive and you may tip into recession; too cautious and inflation stays elevated. Your score reflects this balance.'
  },

  'Hard Landing': {
    title: 'Hard Landing',
    plain: 'When the Fed\'s rate hikes slow the economy so much that it tips into recession. The opposite of a soft landing. Characterized by sharply rising unemployment, falling GDP, and often a financial market crisis.',
    context: 'Most historical tightening cycles have ended in hard landings. The Volcker era (1980-82) is the most dramatic example: inflation was crushed, but at the cost of severe recession and 10%+ unemployment.'
  },

  'Dissent': {
    title: 'FOMC Dissent',
    plain: 'When an FOMC voting member votes against the majority\'s rate decision. Dissents are public and named in the post-meeting statement. They signal internal disagreement on the committee.',
    context: 'Dissents are rare and market-moving. A hawkish dissent (wanting to hike more) signals the committee may be too dovish. A dovish dissent (wanting to cut more) signals it may be too hawkish. Multiple dissents can undermine confidence in the committee\'s consensus.'
  },

  'Mandate Balance': {
    title: 'Mandate Balance',
    plain: 'How well the committee is balancing its two goals: maximum employment and stable prices. A high mandate balance score means you\'re keeping both unemployment and inflation near their targets.',
    context: 'This is one of your three scoring dimensions. When inflation is high and unemployment is low, the mandates pull in opposite directions. When both are near target, you\'re achieving the rare ideal.'
  },

  'Market Stability': {
    title: 'Market Stability',
    plain: 'How your decisions affect financial market conditions \u2014 avoiding excessive volatility, sharp selloffs, or disorderly moves in stocks, bonds, and credit markets.',
    context: 'This is one of your three scoring dimensions. Surprising markets with unexpected decisions or sending contradictory signals creates instability that can amplify the real-economy effects of your policy beyond what you intended.'
  },

  // ── MISSING DATA LABEL TERMS ──────────────────────────────────────────

  'LFPR': {
    title: 'LFPR \u2014 Labor Force Participation Rate',
    plain: 'The percentage of working-age Americans (16+) who are either employed or actively looking for work. A key complement to the unemployment rate \u2014 it shows how many people are engaged with the labor market at all.',
    context: 'A falling LFPR can mask true labor market weakness: unemployment may look low, but only because people have stopped looking for work. The committee watches LFPR alongside unemployment to get the full picture of labor market health.'
  },

  'U-6': {
    title: 'U-6 \u2014 Broad Unemployment Rate',
    plain: 'The broadest official measure of unemployment. Includes the standard unemployed (U-3) plus people who are marginally attached to the labor force and those working part-time for economic reasons (they want full-time work but can\'t find it).',
    context: 'U-6 typically runs 3-4 percentage points above the headline U-3 rate. When the gap between U-3 and U-6 widens, it signals hidden slack in the labor market \u2014 more people are underemployed than the headline number suggests.'
  },

  'Core CPI': {
    title: 'Core CPI \u2014 Consumer Price Index (ex. Food & Energy)',
    plain: 'CPI inflation with food and energy prices removed. Like Core PCE, it strips out volatile components to reveal underlying inflation trends. Core CPI tends to run slightly higher than Core PCE.',
    context: 'While the Fed officially targets Core PCE, Core CPI gets more media attention and shapes public inflation expectations. When Core CPI diverges significantly from Core PCE, it tells the committee which sectors are driving price pressures.'
  },

  '2s/10s': {
    title: '2s/10s \u2014 The 2-Year / 10-Year Treasury Spread',
    plain: 'The difference between the 10-year Treasury yield and the 2-year Treasury yield. When positive, the yield curve is normal (long rates higher than short rates). When negative, the curve is inverted \u2014 a historically reliable recession signal.',
    context: 'The 2s/10s spread is the most watched yield curve indicator. It inverted sharply in 2022 as the Fed hiked the short end aggressively while long-term growth expectations stayed anchored. An inversion does not cause recession \u2014 it reflects market expectations that the Fed will eventually cut rates in response to economic weakness.'
  }

};

window.FedChair.Data.balanceSheetData = {

  orientation: {
    title: 'The Fed\'s Second Tool: The Balance Sheet',
    paragraphs: [
      'Most people know the Fed sets interest rates. But the Fed has a second, equally powerful tool: its balance sheet \u2014 the total value of assets it holds, primarily US Treasury bonds and mortgage-backed securities.',
      'When the Fed BUYS bonds, it creates new money and injects it into the financial system. This pushes long-term interest rates down and makes borrowing easier \u2014 even if the short-term rate stays the same. This is called Quantitative Easing (QE). The Fed used it extensively after the 2008 financial crisis and during COVID.',
      'When the Fed SHRINKS its balance sheet by letting bonds mature without replacing them, it drains money from the system and puts upward pressure on long-term rates. This is called Quantitative Tightening (QT).',
      'The balance sheet and the interest rate work together \u2014 but they can also point in different directions. As Fed Chair, you control both levers at every meeting.',
    ],
    dismissLabel: 'Got it \u2014 make my decision'
  },

  postures: [
    {
      id: 'expand',
      label: 'EXPAND',
      sublabel: 'Quantitative Easing (QE)',
      description: 'Buy Treasury bonds and mortgage-backed securities to inject money into the financial system. Pushes long-term interest rates lower and loosens financial conditions. Used when rate cuts alone aren\'t providing enough stimulus.',
      effect: 'Loosens financial conditions beyond what the rate decision achieves alone.',
      stance: 'dovish',
      icon: '\u2191'
    },
    {
      id: 'hold',
      label: 'HOLD',
      sublabel: 'Maintain Current Holdings',
      description: 'Keep the balance sheet at its current size. New purchases replace maturing bonds (if reinvesting) or the balance sheet gradually shrinks via passive runoff. Neither adding nor removing significant liquidity.',
      effect: 'Neutral \u2014 policy effect comes entirely from the interest rate decision.',
      stance: 'neutral',
      icon: '\u2014'
    },
    {
      id: 'reduce',
      label: 'REDUCE',
      sublabel: 'Quantitative Tightening (QT)',
      description: 'Shrink the balance sheet by allowing bonds to mature without reinvesting the proceeds. Drains liquidity from the financial system and puts upward pressure on long-term interest rates.',
      effect: 'Tightens financial conditions beyond what the rate decision achieves alone.',
      stance: 'hawkish',
      icon: '\u2193'
    }
  ],

  paceOptions: [
    { value: 30,  label: '$30B / month', description: 'Gradual \u2014 minimal market disruption' },
    { value: 60,  label: '$60B / month', description: 'Moderate \u2014 current standard pace' },
    { value: 95,  label: '$95B / month', description: 'Aggressive \u2014 maximum pace, higher market risk' }
  ],

  combinedSignals: {
    'hike-reduce':  'Dual tightening: rate hike + QT. Strong anti-inflation signal. Watch for excessive tightening.',
    'cut-expand':   'Dual easing: rate cut + QE. Strong stimulus signal. Watch for re-igniting inflation.',
    'hike-expand':  'Contradictory signals: hiking rates while expanding balance sheet. Markets may be confused about your intentions.',
    'cut-reduce':   'Contradictory signals: cutting rates while doing QT. Mixed message \u2014 easing with one hand, tightening with the other.',
    'hold-reduce':  'Rate hold + QT. Tightening through balance sheet while keeping rate steady. Subtle but real tightening effect.',
    'hold-expand':  'Rate hold + QE. Easing through balance sheet while keeping rate steady. Subtle but real stimulus effect.',
    'hold-hold':    'Both levers held steady. Fully neutral posture. Policy is on autopilot.'
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
