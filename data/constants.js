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
