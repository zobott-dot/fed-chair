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
