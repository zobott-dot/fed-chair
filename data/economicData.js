// Economic Data - Current indicators and market data
// This module can be replaced with API calls in the future

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.economicData = {
  fedFundsRate: {
    target: '3.50% - 3.75%',
    effective: '3.64%',
    change: 'HOLD',
    lastMeeting: 'Jan 28, 2026'
  },
  inflation: {
    cpiHeadline: { value: '2.4%', trend: 'down', label: 'CPI' },
    cpiCore: { value: '2.5%', trend: 'down', label: 'Core CPI' },
    pceHeadline: { value: '2.8%', trend: 'stable', label: 'PCE' },
    pceCore: { value: '2.8%', trend: 'stable', label: 'Core PCE' }
  },
  employment: {
    unemploymentU3: { value: '4.3%', trend: 'down', label: 'Unemployment' },
    unemploymentU6: { value: '7.9%', trend: 'stable', label: 'U-6' },
    lfpr: { value: '62.3%', trend: 'stable', label: 'LFPR' },
    nfp: { value: '+130K', trend: 'up', label: 'Payrolls' }
  },
  markets: {
    sp500: { value: 6836, display: '6,836', label: 'S&P 500' },
    vix: { value: 20.60, display: '20.60', label: 'VIX' },
    treasury10y: { value: 4.07, display: '4.07%', label: '10Y' },
    treasury2y: { value: 3.76, display: '3.76%', label: '2Y' },
    yieldSpread: { value: '+31 bps', label: '2s/10s' },
    dxy: { value: 96.88, display: '96.88', label: 'DXY' }
  },
  gdp: { current: 1.9, forecast: 1.8 },
  unemployment: { current: 4.3, forecast: 4.5 },
  inflationForecast: { current: 2.8, forecast: 2.5 },
  nextMeeting: 'March 17-18, 2026',
  marketExpects: 0,
  currentRate: 3.625
};
