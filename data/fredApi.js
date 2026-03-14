// FRED API Data Fetcher — Live Mode economic data
// Fetches latest indicators from Federal Reserve Economic Data (FRED)
// Falls back to hardcoded data on failure

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

(function() {
  'use strict';

  const API_KEY = '5f1dfeb40783eefa1e7d0d4e3e602597';
  const BASE_URL = 'https://fred-proxy.dave-zobott.workers.dev/fred/series/observations';

  // Cache fetched data to avoid redundant calls within a session
  let cachedLiveData = null;
  let cachedTimestamp = null;
  const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

  /**
   * Fetch observations for a single FRED series
   */
  async function fetchSeries(seriesId, limit) {
    const url = `${BASE_URL}?series_id=${seriesId}&api_key=${API_KEY}&file_type=json&sort_order=desc&limit=${limit || 1}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`FRED API error: ${response.status} for ${seriesId}`);
    const data = await response.json();
    if (!data.observations || data.observations.length === 0) {
      throw new Error(`No observations returned for ${seriesId}`);
    }
    return data.observations;
  }

  /**
   * Get the latest value from a series
   */
  function latestValue(observations) {
    // FRED sometimes returns '.' for missing values — skip those
    for (const obs of observations) {
      if (obs.value && obs.value !== '.') return parseFloat(obs.value);
    }
    return null;
  }

  /**
   * Calculate year-over-year percentage change from monthly index data
   * Needs at least 13 observations (current + 12 months back)
   */
  function calcYoY(observations) {
    // observations are sorted desc (newest first)
    const current = latestValue(observations);
    // Find observation ~12 months back
    const olderObs = observations.filter(o => o.value && o.value !== '.');
    if (olderObs.length < 13) {
      // Try with whatever we have that's closest to 12 months
      const oldest = olderObs[olderObs.length - 1];
      if (oldest) {
        const oldVal = parseFloat(oldest.value);
        if (oldVal > 0 && current !== null) return ((current - oldVal) / oldVal * 100);
      }
      return null;
    }
    const yearAgo = parseFloat(olderObs[12].value);
    if (yearAgo > 0 && current !== null) return ((current - yearAgo) / yearAgo * 100);
    return null;
  }

  /**
   * Calculate monthly change (for payrolls)
   */
  function calcMonthlyChange(observations) {
    const valid = observations.filter(o => o.value && o.value !== '.');
    if (valid.length < 2) return null;
    return parseFloat(valid[0].value) - parseFloat(valid[1].value);
  }

  /**
   * Determine trend from recent observations
   */
  function determineTrend(observations, count) {
    const valid = observations.filter(o => o.value && o.value !== '.').slice(0, count || 3);
    if (valid.length < 2) return 'stable';
    const latest = parseFloat(valid[0].value);
    const prior = parseFloat(valid[1].value);
    const diff = latest - prior;
    if (Math.abs(diff) < 0.05) return 'stable';
    return diff > 0 ? 'up' : 'down';
  }

  /**
   * Fetch all economic data from FRED and map to game format
   * @returns {Promise<Object>} Economic data in the game's expected format
   */
  window.FedChair.Data.fetchFredData = async function() {
    // Return cached data if fresh
    if (cachedLiveData && cachedTimestamp && (Date.now() - cachedTimestamp < CACHE_DURATION_MS)) {
      return cachedLiveData;
    }

    // Fetch all series in parallel for speed
    const [
      fedFundsUpper, fedFundsLower, effr,
      cpiAll, cpiCore, pceAll, pceCore,
      unrate, u6rate, civpart, payems,
      gdp,
      dgs10, dgs2, vix, sp500, dxy,
      walcl
    ] = await Promise.all([
      fetchSeries('DFEDTARU', 1),
      fetchSeries('DFEDTARL', 1),
      fetchSeries('EFFR', 1),
      fetchSeries('CPIAUCSL', 14),    // 14 months for YoY + trend
      fetchSeries('CPILFESL', 14),
      fetchSeries('PCEPI', 14),
      fetchSeries('PCEPILFE', 14),
      fetchSeries('UNRATE', 3),
      fetchSeries('U6RATE', 3),
      fetchSeries('CIVPART', 3),
      fetchSeries('PAYEMS', 3),        // 3 for change + trend
      fetchSeries('A191RL1Q225SBEA', 2), // GDP growth, 2 quarters
      fetchSeries('DGS10', 5),         // 5 business days for trend
      fetchSeries('DGS2', 5),
      fetchSeries('VIXCLS', 5),
      fetchSeries('SP500', 5),
      fetchSeries('DTWEXBGS', 5),
      fetchSeries('WALCL', 2)          // Weekly, 2 for trend
    ]);

    // Parse values
    const upperRate = latestValue(fedFundsUpper);
    const lowerRate = latestValue(fedFundsLower);
    const effectiveRate = latestValue(effr);
    const midpointRate = (upperRate !== null && lowerRate !== null) ? (upperRate + lowerRate) / 2 : null;

    const cpiYoY = calcYoY(cpiAll);
    const cpiCoreYoY = calcYoY(cpiCore);
    const pceYoY = calcYoY(pceAll);
    const pceCoreYoY = calcYoY(pceCore);

    const unemploymentRate = latestValue(unrate);
    const u6 = latestValue(u6rate);
    const lfpr = latestValue(civpart);
    const payrollChange = calcMonthlyChange(payems);

    const gdpGrowth = latestValue(gdp);

    const treasury10y = latestValue(dgs10);
    const treasury2y = latestValue(dgs2);
    const vixLevel = latestValue(vix);
    const sp500Level = latestValue(sp500);
    const dxyLevel = latestValue(dxy);

    // Determine trends
    const cpiTrend = determineTrend(cpiAll);
    const cpiCoreTrend = determineTrend(cpiCore);
    const pceTrend = determineTrend(pceAll);
    const pceCoreTrend = determineTrend(pceCore);
    const unrateTrend = determineTrend(unrate);

    // Format helpers
    const fmt1 = (v) => v !== null ? v.toFixed(1) + '%' : null;
    const fmt2 = (v) => v !== null ? v.toFixed(2) + '%' : null;
    const fmtInt = (v) => v !== null ? Math.round(v).toLocaleString() : null;
    const fmtPayroll = (v) => v !== null ? (v >= 0 ? '+' : '') + Math.round(v) + 'K' : null;

    // Determine latest observation date for display
    const latestDate = unrate[0]?.date || effr[0]?.date || 'Unknown';
    const dateObj = new Date(latestDate + 'T00:00:00');
    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const displayDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    // Yield spread
    const yieldSpread = (treasury10y !== null && treasury2y !== null)
      ? Math.round((treasury10y - treasury2y) * 100)
      : null;

    // Build game-format data object
    const liveData = {
      fedFundsRate: {
        target: (lowerRate !== null && upperRate !== null)
          ? `${lowerRate.toFixed(2)}% - ${upperRate.toFixed(2)}%`
          : '3.50% - 3.75%',
        effective: effectiveRate !== null ? effectiveRate.toFixed(2) + '%' : '3.64%',
        change: 'HOLD',
        lastMeeting: latestDate
      },
      inflation: {
        cpiHeadline: { value: fmt1(cpiYoY) || '2.4%', trend: cpiTrend, label: 'CPI' },
        cpiCore: { value: fmt1(cpiCoreYoY) || '2.5%', trend: cpiCoreTrend, label: 'Core CPI' },
        pceHeadline: { value: fmt1(pceYoY) || '2.9%', trend: pceTrend, label: 'PCE' },
        pceCore: { value: fmt1(pceCoreYoY) || '3.0%', trend: pceCoreTrend, label: 'Core PCE' }
      },
      employment: {
        unemploymentU3: { value: fmt1(unemploymentRate) || '4.3%', trend: unrateTrend, label: 'Unemployment' },
        unemploymentU6: { value: fmt1(u6) || '7.9%', trend: 'stable', label: 'U-6' },
        lfpr: { value: fmt1(lfpr) || '62.3%', trend: 'stable', label: 'LFPR' },
        nfp: { value: fmtPayroll(payrollChange) || '+130K', trend: 'stable', label: 'Payrolls' }
      },
      markets: {
        sp500: { value: sp500Level || 6882, display: fmtInt(sp500Level) || '6,882', label: 'S&P 500' },
        vix: { value: vixLevel || 21.44, display: vixLevel ? vixLevel.toFixed(2) : '21.44', label: 'VIX' },
        treasury10y: { value: treasury10y || 4.04, display: fmt2(treasury10y) || '4.04%', label: '10Y' },
        treasury2y: { value: treasury2y || 3.48, display: fmt2(treasury2y) || '3.48%', label: '2Y' },
        yieldSpread: { value: yieldSpread !== null ? `${yieldSpread >= 0 ? '+' : ''}${yieldSpread} bps` : '+56 bps', label: '2s/10s' },
        dxy: { value: dxyLevel || 98.51, display: dxyLevel ? dxyLevel.toFixed(2) : '98.51', label: 'DXY' }
      },
      gdp: {
        current: gdpGrowth !== null ? gdpGrowth : 1.9,
        forecast: gdpGrowth !== null ? Math.round((gdpGrowth - 0.1) * 10) / 10 : 1.8
      },
      unemployment: {
        current: unemploymentRate || 4.3,
        forecast: unemploymentRate ? Math.round((unemploymentRate + 0.2) * 10) / 10 : 4.5
      },
      inflationForecast: {
        current: pceCoreYoY !== null ? Math.round(pceCoreYoY * 10) / 10 : 3.0,
        forecast: pceCoreYoY !== null ? Math.round((pceCoreYoY - 0.5) * 10) / 10 : 2.5
      },
      currentRate: midpointRate || 3.625,
      marketExpects: 0,

      // Metadata for display
      _liveData: true,
      _fetchedAt: new Date().toISOString(),
      _dataAsOf: displayDate,
      _fredSeriesCount: 18
    };

    // Cache it
    cachedLiveData = liveData;
    cachedTimestamp = Date.now();

    return liveData;
  };

  /**
   * Clear the cache (for manual refresh)
   */
  window.FedChair.Data.clearFredCache = function() {
    cachedLiveData = null;
    cachedTimestamp = null;
  };

})();
