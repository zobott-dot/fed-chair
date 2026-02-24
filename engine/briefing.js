// Briefing Engine - Generates FOMC pre-meeting briefing materials from GameState

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

(function() {
  const templates = () => window.FedChair.Data.briefingTemplates;

  // Utility: pick random item from array
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Utility: shuffle array (Fisher-Yates)
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Utility: random in range
  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  // Utility: clamp
  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  // Look up a qualitative descriptor for a numeric value
  function getDescriptor(type, value) {
    const descriptors = templates().activityDescriptors[type];
    for (const d of descriptors) {
      if (value >= d.min) return d.desc;
    }
    return descriptors[descriptors.length - 1].desc;
  }

  // Get detail fragment based on sentiment
  function getDetail(sentiment) {
    const frags = templates().detailFragments;
    if (sentiment > 0.5) return pick(frags.positive);
    if (sentiment < -0.5) return pick(frags.negative);
    return pick(frags.neutral);
  }

  // Fill template placeholders
  function fillTemplate(template, vars) {
    let result = template;
    for (const [key, value] of Object.entries(vars)) {
      result = result.replace(new RegExp('\\{' + key + '\\}', 'g'), value);
    }
    return result;
  }

  // Check if a district's sectors overlap with shock-affected sectors
  function getShockBias(district, activeShocks) {
    const map = templates().shockSectorMap;
    let bias = 0;
    for (const shock of activeShocks) {
      const affectedSectors = map[shock.type] || [];
      const overlap = district.sectors.some(s => affectedSectors.includes(s));
      if (overlap) {
        bias -= 0.5; // Negative bias for shock-affected districts
      }
    }
    return bias;
  }

  // ========================================
  // BEIGE BOOK GENERATION
  // ========================================

  function generateBeigeBook(gameState) {
    const t = templates();
    const allDistricts = t.districts;
    const economy = gameState.economy;
    const activeShocks = gameState.activeShocks || [];

    // Select 4-6 districts with geographic spread
    const count = 4 + Math.floor(Math.random() * 3); // 4-6
    const selected = shuffle(allDistricts).slice(0, count);

    const districtReports = selected.map(district => {
      // Regional variation: noise around national numbers
      const shockBias = getShockBias(district, activeShocks);
      const regionalGdp = economy.gdpGrowth + rand(-0.4, 0.4) + shockBias;
      const regionalPayrolls = economy.payrollsChange + rand(-30, 30) + shockBias * 40;
      const regionalInflation = economy.cpiInflation + rand(-0.3, 0.3);

      // Pick a sector for this district and find a template
      const sector = pick(district.sectors);
      const sectorTemplateList = t.sectorTemplates[sector] || t.sectorTemplates.manufacturing;
      const template = pick(sectorTemplateList);

      // Get qualitative descriptors
      const activity = getDescriptor('growth', regionalGdp);
      const sentiment = regionalGdp > 2.0 ? 1 : regionalGdp < 0.5 ? -1 : 0;
      const detail = getDetail(sentiment + shockBias);

      // Build narrative by filling template
      let narrative = fillTemplate(template, {
        district: district.name,
        activity: activity,
        detail: detail
      });

      // Add hiring context ~50% of the time
      if (Math.random() > 0.5) {
        const hiringDesc = getDescriptor('hiring', regionalPayrolls);
        narrative += ' Contacts ' + hiringDesc + '.';
      }

      // Add price context ~40% of the time
      if (Math.random() > 0.6) {
        const priceDesc = getDescriptor('prices', regionalInflation);
        narrative += ' Firms ' + priceDesc + '.';
      }

      return {
        district: district.name,
        number: district.number,
        narrative: narrative,
        sentiment: sentiment > 0 ? 'positive' : sentiment < 0 ? 'negative' : 'mixed'
      };
    });

    // Sort by district number for clean presentation
    districtReports.sort((a, b) => a.number - b.number);

    // Overall tone
    const avgGdp = economy.gdpGrowth;
    let overallTone = 'mixed';
    for (const tone of t.overallTones) {
      if (avgGdp >= tone.min) {
        overallTone = tone.tone;
        break;
      }
    }

    // Summary
    let highlight = '';
    if (economy.cpiInflation > 3.0) highlight = t.summaryHighlights.highInflation;
    else if (economy.cpiInflation < 2.0) highlight = t.summaryHighlights.lowInflation;
    else if (economy.payrollsChange > 180) highlight = t.summaryHighlights.strongLabor;
    else if (economy.payrollsChange < 60) highlight = t.summaryHighlights.weakLabor;
    else if (economy.gdpGrowth > 2.5) highlight = t.summaryHighlights.strongGrowth;
    else if (economy.gdpGrowth < 1.0) highlight = t.summaryHighlights.weakGrowth;
    else highlight = 'Conditions varied across sectors and regions, with no single theme dominating reports.';

    const summary = fillTemplate(pick(t.summaryTemplates), {
      tone: overallTone,
      highlight: highlight
    });

    return {
      summary: summary,
      districtReports: districtReports,
      overallTone: overallTone
    };
  }

  // ========================================
  // STAFF ECONOMIC PROJECTIONS
  // ========================================

  function generateStaffProjections(gameState) {
    const t = templates();
    const economy = gameState.economy;
    const meeting = gameState.meetingNumber;
    const pendingEffects = gameState.pendingEffects || [];

    // Uncertainty grows with meeting number
    const uncertaintyFactor = 1 + (meeting - 1) * 0.08;

    // --- GDP ---
    // Staff biases toward 2% mean reversion
    const gdpStaff = economy.gdpGrowth + (2.0 - economy.gdpGrowth) * 0.3 + rand(-0.2, 0.2);
    // Market extends recent trend
    const gdpTrend = gameState.lastMeetingEconomy
      ? economy.gdpGrowth - gameState.lastMeetingEconomy.gdpGrowth
      : 0;
    const gdpMarket = economy.gdpGrowth + gdpTrend * 0.5 + rand(-0.15, 0.15);
    const gdpRange = 0.4 * uncertaintyFactor;

    // --- Inflation (PCE) ---
    const pceStaff = economy.pceInflation + (2.0 - economy.pceInflation) * 0.25 + rand(-0.2, 0.2);
    const pceTrend = gameState.lastMeetingEconomy
      ? economy.pceInflation - gameState.lastMeetingEconomy.pceInflation
      : 0;
    const pceMarket = economy.pceInflation + pceTrend * 0.6 + rand(-0.15, 0.15);
    const pceRange = 0.4 * uncertaintyFactor;

    // --- Unemployment ---
    const unempStaff = economy.unemploymentRate + (4.5 - economy.unemploymentRate) * 0.2 + rand(-0.15, 0.15);
    const unempTrend = gameState.lastMeetingEconomy
      ? economy.unemploymentRate - gameState.lastMeetingEconomy.unemploymentRate
      : 0;
    const unempMarket = economy.unemploymentRate + unempTrend * 0.5 + rand(-0.1, 0.1);
    const unempRange = 0.3 * uncertaintyFactor;

    // --- Fed Funds ---
    const currentRate = gameState.currentRate;
    // Staff expects gradual normalization toward neutral (~3.0%)
    const ffStaff = currentRate + (3.0 - currentRate) * 0.15 + rand(-0.125, 0.125);
    // Market uses recent rate trend
    const lastDecisions = gameState.rateHistory.slice(-3);
    const avgDecision = lastDecisions.reduce((sum, r) => sum + (r.decision || 0), 0) / lastDecisions.length;
    const ffMarket = currentRate + avgDecision / 100 * 0.5 + rand(-0.125, 0.125);
    const ffRange = 0.375 * uncertaintyFactor;

    // Round everything to 1 decimal
    const r1 = v => Math.round(v * 10) / 10;

    // Build narrative
    const narrativeParts = [];
    if (economy.pceInflation > 2.5) {
      narrativeParts.push(pick(t.staffNarratives.inflationAbove));
    } else if (economy.pceInflation > 1.8) {
      narrativeParts.push(pick(t.staffNarratives.inflationNear));
    } else {
      narrativeParts.push(pick(t.staffNarratives.inflationBelow));
    }

    if (economy.gdpGrowth > 2.0) {
      narrativeParts.push(pick(t.staffNarratives.growthAbove));
    } else {
      narrativeParts.push(pick(t.staffNarratives.growthBelow));
    }

    if (pendingEffects.length > 0) {
      narrativeParts.push(t.staffNarratives.laggedEffects);
    }

    // Add uncertainty note for later meetings
    if (meeting >= 4) {
      narrativeParts.push(t.staffNarratives.uncertaintyHigh);
    }

    return {
      gdp: {
        current: r1(economy.gdpGrowth),
        staffForecast: r1(gdpStaff),
        marketForecast: r1(gdpMarket),
        range: [r1(gdpStaff - gdpRange), r1(gdpStaff + gdpRange)]
      },
      inflation: {
        current: r1(economy.pceInflation),
        staffForecast: r1(pceStaff),
        marketForecast: r1(pceMarket),
        range: [r1(pceStaff - pceRange), r1(pceStaff + pceRange)]
      },
      unemployment: {
        current: r1(economy.unemploymentRate),
        staffForecast: r1(unempStaff),
        marketForecast: r1(unempMarket),
        range: [r1(unempStaff - unempRange), r1(unempStaff + unempRange)]
      },
      fedFunds: {
        current: r1(currentRate),
        staffForecast: r1(ffStaff),
        marketForecast: r1(ffMarket),
        range: [r1(ffStaff - ffRange), r1(ffStaff + ffRange)]
      },
      narrative: narrativeParts.join(' ')
    };
  }

  // ========================================
  // KEY DATA RELEASES
  // ========================================

  function generateDataReleases(gameState) {
    const t = templates();
    const economy = gameState.economy;
    const prevEconomy = gameState.lastMeetingEconomy;

    const releases = [];

    for (const release of t.dataReleases) {
      let actual, previous, expected;

      if (release.derived) {
        // Generate derived data from economic conditions
        switch (release.id) {
          case 'retail':
            actual = economy.gdpGrowth * 0.25 + rand(-0.3, 0.3);
            previous = prevEconomy ? prevEconomy.gdpGrowth * 0.25 + rand(-0.2, 0.2) : actual - rand(-0.2, 0.3);
            break;
          case 'ism':
            actual = 50 + economy.gdpGrowth * 1.8 + rand(-1.5, 1.5);
            previous = prevEconomy ? 50 + prevEconomy.gdpGrowth * 1.8 + rand(-1, 1) : actual - rand(-1, 1.5);
            break;
          case 'housing':
            // Higher rates suppress housing
            actual = (3.5 - gameState.currentRate) * 0.8 + rand(-0.5, 0.5);
            previous = prevEconomy ? actual + rand(-0.4, 0.4) : actual - rand(-0.3, 0.5);
            break;
          case 'claims':
            // Inverse of payrolls strength
            actual = 250 - economy.payrollsChange * 0.3 + rand(-15, 15);
            previous = prevEconomy ? 250 - prevEconomy.payrollsChange * 0.3 + rand(-10, 10) : actual + rand(-10, 15);
            break;
          case 'consumer_conf':
            // Correlates with GDP and market performance
            actual = 100 + economy.gdpGrowth * 5 + (gameState.markets.sp500 - 6500) * 0.005 + rand(-3, 3);
            previous = prevEconomy ? actual + rand(-4, 4) : actual - rand(-3, 5);
            break;
          default:
            continue;
        }
      } else {
        // Direct from economy
        actual = economy[release.economyKey];
        previous = prevEconomy ? prevEconomy[release.economyKey] : null;
      }

      // Generate "expected" value — close to actual but with noise to create beats/misses
      const noiseScale = release.format === 'jobs' ? 15 :
                         release.format === 'claims' ? 8 :
                         release.format === 'index' ? 1.5 : 0.15;
      expected = actual + rand(-noiseScale, noiseScale);

      // Determine surprise direction
      let surprise;
      const surpriseThreshold = release.format === 'jobs' ? 10 :
                                 release.format === 'claims' ? 5 :
                                 release.format === 'index' ? 1.0 : 0.1;

      // For unemployment and claims, lower actual = beat (inverse)
      const inverse = release.id === 'unemployment' || release.id === 'claims';
      const diff = inverse ? (expected - actual) : (actual - expected);

      if (diff > surpriseThreshold) surprise = 'beat';
      else if (diff < -surpriseThreshold) surprise = 'miss';
      else surprise = 'inline';

      // Format values for display
      const formatValue = (val, fmt, unit) => {
        if (val === null || val === undefined) return '—';
        switch (fmt) {
          case 'jobs': return (val >= 0 ? '+' : '') + Math.round(val) + 'K';
          case 'pct': return val.toFixed(1) + '%';
          case 'index': return val.toFixed(1);
          case 'claims': return Math.round(val) + 'K';
          default: return val.toFixed(1) + unit;
        }
      };

      releases.push({
        id: release.id,
        name: release.name,
        source: release.source,
        actual: formatValue(actual, release.format, release.unit),
        expected: formatValue(expected, release.format, release.unit),
        previous: formatValue(previous, release.format, release.unit),
        surprise: surprise,
        significance: release.significance
      });
    }

    // Always include high-significance releases, then add some medium/low
    const high = releases.filter(r => r.significance === 'high');
    const others = shuffle(releases.filter(r => r.significance !== 'high'));
    const extraCount = 1 + Math.floor(Math.random() * 2); // 1-2 extras
    const selected = [...high, ...others.slice(0, extraCount)];

    return selected;
  }

  // ========================================
  // MARKET POSITIONING
  // ========================================

  function generateMarketPositioning(gameState) {
    const marketExpects = gameState.marketExpects || 0;
    const credibility = gameState.credibility;

    // Build probability distribution from market expectations
    const prob = { cut50: 0, cut25: 0, hold: 0, hike25: 0, hike50: 0 };

    if (marketExpects <= -50) {
      prob.cut50 = 60 + rand(-5, 5);
      prob.cut25 = 25 + rand(-5, 5);
      prob.hold = 10 + rand(-3, 3);
      prob.hike25 = 3 + rand(-1, 2);
      prob.hike50 = 2;
    } else if (marketExpects <= -25) {
      prob.cut50 = 5 + rand(-2, 3);
      prob.cut25 = 65 + rand(-8, 8);
      prob.hold = 22 + rand(-5, 5);
      prob.hike25 = 5 + rand(-2, 3);
      prob.hike50 = 1;
    } else if (marketExpects === 0) {
      prob.cut50 = 1;
      prob.cut25 = 10 + rand(-3, 5);
      prob.hold = 75 + rand(-8, 8);
      prob.hike25 = 10 + rand(-3, 5);
      prob.hike50 = 1;
    } else if (marketExpects >= 50) {
      prob.cut50 = 2;
      prob.cut25 = 3 + rand(-1, 2);
      prob.hold = 10 + rand(-3, 3);
      prob.hike25 = 25 + rand(-5, 5);
      prob.hike50 = 60 + rand(-5, 5);
    } else {
      // +25
      prob.cut50 = 1;
      prob.cut25 = 5 + rand(-2, 3);
      prob.hold = 22 + rand(-5, 5);
      prob.hike25 = 65 + rand(-8, 8);
      prob.hike50 = 5 + rand(-2, 3);
    }

    // Widen distribution if credibility is low
    if (credibility < 50) {
      const spread = (50 - credibility) * 0.2;
      prob.hold -= spread;
      prob.cut25 += spread * 0.3;
      prob.hike25 += spread * 0.3;
      prob.cut50 += spread * 0.2;
      prob.hike50 += spread * 0.2;
    }

    // Normalize to 100%
    const total = Object.values(prob).reduce((s, v) => s + Math.max(0, v), 0);
    for (const key of Object.keys(prob)) {
      prob[key] = Math.max(0, Math.round(prob[key] / total * 100));
    }
    // Fix rounding to sum to 100
    const sumNow = Object.values(prob).reduce((s, v) => s + v, 0);
    const maxKey = Object.entries(prob).sort((a, b) => b[1] - a[1])[0][0];
    prob[maxKey] += 100 - sumNow;

    // Shift since last meeting
    let shiftText = 'Baseline positioning';
    if (gameState.rateHistory.length > 1) {
      const prevDecision = gameState.rateHistory[gameState.rateHistory.length - 1].decision || 0;
      if (prevDecision > 0) {
        shiftText = 'Shifted hawkish after last rate hike';
      } else if (prevDecision < 0) {
        shiftText = 'Shifted dovish after last rate cut';
      } else {
        // Look at economic changes
        if (gameState.economyChanges) {
          const pceChange = gameState.economyChanges.pceInflation || 0;
          if (pceChange > 0.1) shiftText = 'Shifted hawkish on rising inflation data';
          else if (pceChange < -0.1) shiftText = 'Shifted dovish on falling inflation data';
          else shiftText = 'Largely unchanged since last meeting';
        } else {
          shiftText = 'Largely unchanged since last meeting';
        }
      }
    }

    // Key drivers
    const drivers = [];
    const economy = gameState.economy;

    if (economy.pceInflation > 2.5) {
      drivers.push('Persistent inflation readings above 2.5% support expectations for tighter policy.');
    } else if (economy.pceInflation < 2.0) {
      drivers.push('Inflation trending below target supports expectations for accommodation.');
    }

    if (economy.gdpGrowth < 1.0) {
      drivers.push('Slowing growth data has shifted expectations toward policy easing.');
    } else if (economy.gdpGrowth > 2.5) {
      drivers.push('Above-trend growth reduces urgency for rate cuts.');
    }

    if (credibility < 50) {
      drivers.push('Reduced Fed credibility has widened the distribution of expected outcomes.');
    }

    if (economy.unemploymentRate > 5.0) {
      drivers.push('Rising unemployment is increasing pressure for accommodative policy.');
    } else if (economy.payrollsChange > 200) {
      drivers.push('Strong payrolls growth argues against near-term easing.');
    }

    // Ensure at least 2 drivers
    if (drivers.length < 2) {
      drivers.push('Markets are broadly aligned with recent Fed communication and guidance.');
    }

    // Future guidance
    let futureGuidance;
    if (marketExpects > 0) {
      futureGuidance = 'Forward rate expectations embed additional tightening over the next two meetings, with markets pricing a terminal rate modestly above current levels.';
    } else if (marketExpects < 0) {
      futureGuidance = 'Futures markets continue to price in easing over the coming meetings, reflecting expectations that the rate cycle has peaked.';
    } else {
      futureGuidance = 'Rate expectations beyond this meeting are relatively flat, suggesting markets expect a prolonged pause at current levels.';
    }

    return {
      fedFundsExpected: marketExpects,
      fedFundsProb: prob,
      shiftSinceLastMeeting: shiftText,
      keyDrivers: drivers.slice(0, 3),
      futureGuidance: futureGuidance
    };
  }

  // ========================================
  // CONFLICTING SIGNALS
  // ========================================

  function generateConflictingSignals(gameState) {
    const economy = gameState.economy;
    const markets = gameState.markets;
    const pendingEffects = gameState.pendingEffects || [];

    const allSignals = [];

    // 1. Inflation measures diverge
    if (Math.abs(economy.cpiInflation - economy.pceInflation) > 0.25) {
      const cpiLower = economy.cpiInflation < economy.pceInflation;
      allSignals.push({
        title: 'Inflation Measures Diverge',
        description: 'CPI headline inflation at ' + economy.cpiInflation.toFixed(1) + '% paints a ' +
          (cpiLower ? 'more benign' : 'more concerning') + ' picture than PCE at ' +
          economy.pceInflation.toFixed(1) + '%, the Fed\'s preferred gauge. The divergence complicates the assessment of underlying price pressures.',
        implication: economy.pceInflation > 2.5 ? 'hawkish' : 'ambiguous'
      });
    }

    // 2. Strong hiring + weak growth
    if (economy.payrollsChange > 120 && economy.gdpGrowth < 1.5) {
      allSignals.push({
        title: 'Strong Hiring Despite Weak Growth',
        description: 'Payrolls added ' + Math.round(economy.payrollsChange) + 'K jobs even as GDP growth slowed to ' +
          economy.gdpGrowth.toFixed(1) + '%. This disconnect raises questions about labor hoarding, productivity trends, and whether growth data will eventually catch up — or employment will weaken.',
        implication: 'ambiguous'
      });
    }

    // 3. Weak hiring + OK growth
    if (economy.payrollsChange < 80 && economy.gdpGrowth > 1.8) {
      allSignals.push({
        title: 'Growth Resilient Despite Soft Hiring',
        description: 'GDP continues to grow at ' + economy.gdpGrowth.toFixed(1) + '% while payrolls have moderated to ' +
          Math.round(economy.payrollsChange) + 'K. This may signal a productivity-led expansion or an impending growth slowdown.',
        implication: 'ambiguous'
      });
    }

    // 4. Markets vs fundamentals
    if ((markets.sp500 > 7000 && economy.gdpGrowth < 1.5) || (markets.sp500 < 6200 && economy.gdpGrowth > 2.5)) {
      const disconnect = markets.sp500 > 7000 ? 'elevated' : 'depressed';
      const fundamental = markets.sp500 > 7000 ? 'softening' : 'improving';
      allSignals.push({
        title: 'Markets Decouple from Fundamentals',
        description: 'Equity markets appear ' + disconnect + ' relative to ' + fundamental +
          ' economic fundamentals. The S&P 500 at ' + Math.round(markets.sp500).toLocaleString() +
          ' may be pricing in expectations that diverge from the current data.',
        implication: markets.sp500 > 7000 ? 'dovish' : 'hawkish'
      });
    }

    // 5. Yield curve signal
    const spread = markets.treasury10y - markets.treasury2y;
    if (spread < 0) {
      allSignals.push({
        title: 'Yield Curve Inverted',
        description: 'The 2s/10s spread sits at ' + Math.round(spread * 100) +
          'bps — an inversion historically associated with pending recession. However, other indicators including labor market data suggest the economy retains underlying momentum.',
        implication: 'dovish'
      });
    }

    // 6. Consumer sentiment vs spending
    if (economy.gdpGrowth > 1.5) {
      const confUp = Math.random() > 0.5;
      allSignals.push({
        title: 'Consumer Sentiment vs. Spending Gap',
        description: 'Consumer confidence surveys have ' + (confUp ? 'improved' : 'deteriorated') +
          ' recently, even as actual consumer spending shows ' + (confUp ? 'more cautious' : 'surprisingly resilient') +
          ' momentum. The divergence between soft survey data and hard spending data muddies the demand outlook.',
        implication: confUp ? 'ambiguous' : 'ambiguous'
      });
    }

    // 7. Lagged effects warning
    if (pendingEffects.length > 0) {
      const unapplied = pendingEffects.filter(e => !e.applied);
      if (unapplied.length > 0) {
        const lastEffect = unapplied[unapplied.length - 1];
        allSignals.push({
          title: 'Prior Policy Still Transmitting',
          description: unapplied.length + ' prior rate decision(s) have not yet fully transmitted into the real economy. ' +
            'Full effects expected by Meeting ' + lastEffect.fullEffectMeeting +
            '. Current economic readings may not yet reflect the impact of past actions.',
          implication: 'ambiguous'
        });
      }
    }

    // 8. VIX elevated despite calm data
    if (markets.vix > 22 && economy.gdpGrowth > 1.5 && economy.unemploymentRate < 5.0) {
      allSignals.push({
        title: 'Elevated Volatility Despite Stable Data',
        description: 'The VIX at ' + markets.vix.toFixed(1) +
          ' signals heightened market anxiety, yet hard economic data — GDP at ' + economy.gdpGrowth.toFixed(1) +
          '%, unemployment at ' + economy.unemploymentRate.toFixed(1) + '% — remains relatively stable. Markets may be pricing in risks not yet visible in the data.',
        implication: 'dovish'
      });
    }

    // 9. Dollar signal
    if (markets.dxy > 100 && economy.gdpGrowth < 1.5) {
      allSignals.push({
        title: 'Strong Dollar Headwind',
        description: 'The dollar index at ' + markets.dxy.toFixed(1) +
          ' is creating headwinds for exporters and multinationals, while growth has already slowed to ' +
          economy.gdpGrowth.toFixed(1) + '%. Tighter financial conditions via the dollar may be doing some of the Fed\'s work.',
        implication: 'dovish'
      });
    }

    // Ensure we have at least 2 signals
    // If not enough triggered, add the consumer sentiment one (it always works)
    if (allSignals.length < 2) {
      if (!allSignals.find(s => s.title === 'Consumer Sentiment vs. Spending Gap')) {
        allSignals.push({
          title: 'Consumer Sentiment vs. Spending Gap',
          description: 'Survey-based measures of consumer confidence and hard spending data continue to send mixed signals about the underlying strength of household demand.',
          implication: 'ambiguous'
        });
      }
    }
    if (allSignals.length < 2) {
      allSignals.push({
        title: 'Global Spillovers Uncertain',
        description: 'International economic conditions are sending mixed signals, with some trading partners showing resilience while others face headwinds. The net effect on the domestic outlook is uncertain.',
        implication: 'ambiguous'
      });
    }

    // Ensure at least one hawkish and one dovish/ambiguous signal if we have 3+
    let selected = allSignals.slice(0, 3);
    if (selected.length >= 2) {
      const hasHawkish = selected.some(s => s.implication === 'hawkish');
      const hasDovish = selected.some(s => s.implication === 'dovish' || s.implication === 'ambiguous');
      if (!hasHawkish) {
        // Replace last signal with a hawkish one
        selected[selected.length - 1] = {
          title: 'Sticky Services Inflation',
          description: 'While headline inflation has moderated, services prices — particularly shelter, insurance, and healthcare — remain stubbornly elevated, suggesting underlying price pressures may be more persistent than top-line numbers suggest.',
          implication: 'hawkish'
        };
      }
      if (!hasDovish) {
        selected[selected.length - 1] = {
          title: 'Credit Conditions Tightening',
          description: 'Bank lending surveys indicate tightening credit standards and weakening loan demand. Tighter financial conditions may act as a brake on economic activity even without further rate increases.',
          implication: 'dovish'
        };
      }
    }

    return selected;
  }

  // ========================================
  // MAIN ENTRY POINT
  // ========================================

  window.FedChair.Engine.generateBriefing = function(gameState) {
    return {
      beigeBook: generateBeigeBook(gameState),
      staffProjections: generateStaffProjections(gameState),
      dataReleases: generateDataReleases(gameState),
      marketPositioning: generateMarketPositioning(gameState),
      conflictingSignals: generateConflictingSignals(gameState)
    };
  };

})();
