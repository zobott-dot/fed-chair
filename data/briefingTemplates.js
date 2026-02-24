// Briefing Templates - Static data for generating FOMC briefing materials

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.briefingTemplates = {

  // The 12 Federal Reserve Districts
  districts: [
    { name: 'Boston', number: 1, sectors: ['tech', 'education', 'biotech'] },
    { name: 'New York', number: 2, sectors: ['finance', 'real_estate', 'media'] },
    { name: 'Philadelphia', number: 3, sectors: ['pharma', 'manufacturing', 'healthcare'] },
    { name: 'Cleveland', number: 4, sectors: ['manufacturing', 'steel', 'auto'] },
    { name: 'Richmond', number: 5, sectors: ['banking', 'government', 'agriculture'] },
    { name: 'Atlanta', number: 6, sectors: ['tourism', 'logistics', 'construction'] },
    { name: 'Chicago', number: 7, sectors: ['manufacturing', 'agriculture', 'commodities'] },
    { name: 'St. Louis', number: 8, sectors: ['agriculture', 'transportation', 'defense'] },
    { name: 'Minneapolis', number: 9, sectors: ['agriculture', 'mining', 'energy'] },
    { name: 'Kansas City', number: 10, sectors: ['agriculture', 'energy', 'aerospace'] },
    { name: 'Dallas', number: 11, sectors: ['energy', 'tech', 'real_estate'] },
    { name: 'San Francisco', number: 12, sectors: ['tech', 'trade', 'real_estate'] }
  ],

  // Qualitative descriptors mapped to numeric ranges
  activityDescriptors: {
    growth: [
      { min: 3.0, desc: 'expanded at a robust pace' },
      { min: 2.0, desc: 'expanded at a moderate pace' },
      { min: 1.0, desc: 'expanded at a modest pace' },
      { min: 0.0, desc: 'was essentially flat' },
      { min: -0.5, desc: 'contracted modestly' },
      { min: -Infinity, desc: 'contracted sharply' }
    ],
    hiring: [
      { min: 200, desc: 'reported strong hiring gains' },
      { min: 120, desc: 'reported modest hiring gains' },
      { min: 50, desc: 'reported flat employment levels' },
      { min: 0, desc: 'reported minimal hiring activity' },
      { min: -Infinity, desc: 'reported layoffs and reduced hours' }
    ],
    prices: [
      { min: 3.5, desc: 'reported significant upward price pressures' },
      { min: 2.5, desc: 'noted moderate price increases' },
      { min: 1.5, desc: 'indicated subdued price pressures' },
      { min: 0.5, desc: 'reported declining prices in several categories' },
      { min: -Infinity, desc: 'reported broad-based price declines' }
    ]
  },

  // Sector-specific narrative templates
  sectorTemplates: {
    manufacturing: [
      'Manufacturing activity in the {district} district {activity}.',
      'Factory orders in the {district} district {activity}, with contacts citing {detail}.',
      'Industrial production in {district} {activity}. Manufacturers noted {detail}.'
    ],
    finance: [
      'Financial services firms in the {district} district {activity}.',
      'Lending activity in {district} {activity}, with bankers reporting {detail}.',
      'Banking contacts in the {district} district {activity}, citing {detail}.'
    ],
    tech: [
      'Technology firms in the {district} district {activity}.',
      'Software and IT services in {district} {activity}, with firms noting {detail}.',
      'The technology sector in {district} {activity}. Contacts reported {detail}.'
    ],
    energy: [
      'Energy sector activity in the {district} district {activity}.',
      'Oil and gas producers in {district} {activity}, with operators citing {detail}.',
      'Energy exploration and production in the {district} district {activity}.'
    ],
    agriculture: [
      'Agricultural conditions in the {district} district {activity}.',
      'Farm income in {district} {activity}, as producers noted {detail}.',
      'Crop yields in the {district} district were mixed, while overall agricultural activity {activity}.'
    ],
    real_estate: [
      'Residential real estate in the {district} district {activity}.',
      'Housing markets in {district} {activity}, with agents reporting {detail}.',
      'Commercial real estate in the {district} district {activity}. Contacts cited {detail}.'
    ],
    tourism: [
      'Tourism and hospitality in the {district} district {activity}.',
      'Leisure and hospitality contacts in {district} {activity}, noting {detail}.'
    ],
    construction: [
      'Construction activity in the {district} district {activity}.',
      'Builders in {district} {activity}, with contractors citing {detail}.'
    ],
    logistics: [
      'Freight and logistics activity in the {district} district {activity}.',
      'Transportation contacts in {district} {activity}, reporting {detail}.'
    ],
    education: [
      'Higher education institutions in the {district} district {activity}.',
      'Education and research sectors in {district} {activity}, with institutions noting {detail}.'
    ],
    healthcare: [
      'Healthcare systems in the {district} district {activity}.',
      'Hospital and healthcare contacts in {district} {activity}, citing {detail}.'
    ],
    biotech: [
      'Biotechnology and life sciences firms in the {district} district {activity}.',
      'Biotech firms in {district} {activity}, with contacts noting {detail}.'
    ],
    pharma: [
      'Pharmaceutical manufacturers in the {district} district {activity}.',
      'Drug makers in {district} {activity}, noting {detail}.'
    ],
    auto: [
      'Auto manufacturing in the {district} district {activity}.',
      'Vehicle production in {district} {activity}, with dealers reporting {detail}.'
    ],
    steel: [
      'Steel production in the {district} district {activity}.',
      'Steelmakers in {district} {activity}, citing {detail}.'
    ],
    banking: [
      'Banking activity in the {district} district {activity}.',
      'Community and regional banks in {district} {activity}, with lenders noting {detail}.'
    ],
    government: [
      'Government services and federal employment in the {district} district {activity}.',
      'Federal and state government activity in {district} {activity}.'
    ],
    media: [
      'Media and entertainment firms in the {district} district {activity}.',
      'Advertising and media contacts in {district} {activity}, reporting {detail}.'
    ],
    commodities: [
      'Commodity markets in the {district} district {activity}.',
      'Commodity traders in {district} {activity}, noting {detail}.'
    ],
    mining: [
      'Mining operations in the {district} district {activity}.',
      'Mining and extraction contacts in {district} {activity}, citing {detail}.'
    ],
    transportation: [
      'Transportation and shipping in the {district} district {activity}.',
      'Freight contacts in {district} {activity}, noting {detail}.'
    ],
    defense: [
      'Defense and aerospace contractors in the {district} district {activity}.',
      'Defense industry contacts in {district} {activity}, reporting {detail}.'
    ],
    aerospace: [
      'Aerospace manufacturers in the {district} district {activity}.',
      'Aerospace contacts in {district} {activity}, citing {detail}.'
    ],
    trade: [
      'Trade and port activity in the {district} district {activity}.',
      'Import and export contacts in {district} {activity}, noting {detail}.'
    ]
  },

  // Flavor text injected into templates
  detailFragments: {
    positive: [
      'robust consumer demand',
      'strong order backlogs',
      'improved supply chain conditions',
      'increased capital investment plans',
      'favorable seasonal conditions',
      'rising export demand',
      'strong new order growth',
      'improved profit margins',
      'a pickup in business confidence',
      'healthy inventory-to-sales ratios'
    ],
    negative: [
      'weakening consumer sentiment',
      'elevated input costs',
      'persistent supply chain bottlenecks',
      'tightening credit conditions',
      'reduced capital spending plans',
      'softening demand from abroad',
      'difficulty filling open positions',
      'margin compression from rising costs',
      'increased customer cancellations',
      'cautious business sentiment'
    ],
    neutral: [
      'mixed signals across subsectors',
      'uncertainty about the near-term outlook',
      'stable but uneven conditions',
      'cautious optimism among contacts',
      'an evolving competitive landscape',
      'varied conditions across firm sizes'
    ]
  },

  // Data release definitions
  dataReleases: [
    { id: 'nfp', name: 'Nonfarm Payrolls', source: 'Bureau of Labor Statistics', unit: 'K', economyKey: 'payrollsChange', format: 'jobs', significance: 'high' },
    { id: 'cpi', name: 'Consumer Price Index (YoY)', source: 'Bureau of Labor Statistics', unit: '%', economyKey: 'cpiInflation', format: 'pct', significance: 'high' },
    { id: 'pce', name: 'PCE Price Index (YoY)', source: 'Bureau of Economic Analysis', unit: '%', economyKey: 'pceInflation', format: 'pct', significance: 'high' },
    { id: 'gdp', name: 'GDP Growth (Q/Q Annualized)', source: 'Bureau of Economic Analysis', unit: '%', economyKey: 'gdpGrowth', format: 'pct', significance: 'high' },
    { id: 'unemployment', name: 'Unemployment Rate', source: 'Bureau of Labor Statistics', unit: '%', economyKey: 'unemploymentRate', format: 'pct', significance: 'high' },
    { id: 'retail', name: 'Retail Sales (MoM)', source: 'Census Bureau', unit: '%', derived: true, format: 'pct', significance: 'medium' },
    { id: 'ism', name: 'ISM Manufacturing PMI', source: 'Institute for Supply Management', unit: '', derived: true, format: 'index', significance: 'medium' },
    { id: 'housing', name: 'Housing Starts (MoM)', source: 'Census Bureau', unit: '%', derived: true, format: 'pct', significance: 'medium' },
    { id: 'claims', name: 'Initial Jobless Claims (Weekly Avg)', source: 'Department of Labor', unit: 'K', derived: true, format: 'claims', significance: 'low' },
    { id: 'consumer_conf', name: 'Consumer Confidence Index', source: 'Conference Board', unit: '', derived: true, format: 'index', significance: 'low' }
  ],

  // Shock-to-sector bias mapping
  shockSectorMap: {
    oil_spike: ['energy'],
    banking_stress: ['finance', 'banking', 'real_estate'],
    trade_disruption: ['manufacturing', 'trade', 'logistics'],
    labor_surge: ['construction', 'tourism', 'logistics'],
    tech_selloff: ['tech', 'biotech', 'media'],
    inflation_surprise: [],
    growth_scare: ['manufacturing', 'construction', 'auto'],
    consumer_strength: ['tourism', 'real_estate', 'trade'],
    housing_cooldown: ['real_estate', 'construction']
  },

  // Overall tone descriptors
  overallTones: [
    { min: 2.5, tone: 'broadly optimistic' },
    { min: 1.5, tone: 'cautiously optimistic' },
    { min: 0.5, tone: 'mixed with modest growth' },
    { min: -0.5, tone: 'mixed with growing caution' },
    { min: -Infinity, tone: 'broadly pessimistic' }
  ],

  // Beige Book summary templates
  summaryTemplates: [
    'Overall economic activity across the twelve Federal Reserve districts {tone} since the last reporting period. {highlight}',
    'Economic conditions were {tone} across most districts in the latest reporting period. {highlight}',
    'The economy {tone} according to contacts across the Federal Reserve system. {highlight}'
  ],

  // Summary highlight fragments
  summaryHighlights: {
    highInflation: 'Price pressures remained a persistent concern, with many contacts reporting elevated input costs.',
    lowInflation: 'Price pressures continued to ease, though some sectors reported sticky cost pressures.',
    strongLabor: 'Labor markets remained tight, with firms continuing to report difficulty attracting workers.',
    weakLabor: 'Hiring slowed across most districts, with some firms announcing hiring freezes.',
    strongGrowth: 'Consumer spending was a bright spot, supporting activity in services and retail.',
    weakGrowth: 'Several districts noted softer consumer spending and increased caution among businesses.'
  },

  // Staff projection narrative fragments
  staffNarratives: {
    inflationAbove: [
      'Staff continues to expect inflation to moderate over the forecast horizon, though the path remains uncertain.',
      'The staff projects gradual disinflation, contingent on current policy remaining sufficiently restrictive.',
      'Inflation is expected to trend lower as the effects of monetary tightening continue to filter through the economy.'
    ],
    inflationNear: [
      'Staff projects inflation to remain near current levels, with risks balanced around the forecast.',
      'The inflation outlook is broadly stable, with the staff expecting only modest changes in coming quarters.'
    ],
    inflationBelow: [
      'Staff notes downside risks to inflation, with the possibility that price pressures could fall below target.',
      'The disinflation process may be moving faster than anticipated, warranting careful monitoring.'
    ],
    growthAbove: [
      'The growth outlook is moderately positive, supported by resilient consumer spending.',
      'Staff expects growth to remain above trend in the near term, though momentum may slow.'
    ],
    growthBelow: [
      'Growth is projected to remain below trend, reflecting the cumulative effects of tighter financial conditions.',
      'Staff has revised growth projections modestly lower, citing softer incoming data.'
    ],
    laggedEffects: 'Staff emphasizes that the full impact of prior policy actions has not yet been fully realized, and conditions are expected to evolve as these effects materialize.',
    uncertaintyHigh: 'The degree of uncertainty around the staff forecast is elevated, reflecting conflicting signals in the incoming data.'
  }
};
