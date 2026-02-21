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
  { name: 'Stephen I. Miran', role: 'Governor', stance: 'Very Dovish' },
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
  { headline: 'CPI Falls to 2.4% in January — Lowest Since May 2025', source: 'CNBC' },
  { headline: 'Payrolls Surge 130K, Unemployment at 4.3%', source: 'BLS' },
  { headline: 'Markets Price 92% Chance of Hold at March Meeting', source: 'CME' },
  { headline: 'Warsh Confirmation Delayed by Tillis', source: 'CBS' }
];
