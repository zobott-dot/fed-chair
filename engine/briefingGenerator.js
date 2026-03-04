// Live Mode Briefing Generators - Data-driven Beige Book and Staff Forecast
// Used for meetings 1-2 in Live Mode when data closely reflects real economic conditions

window.FedChair = window.FedChair || {};
window.FedChair.Engine = window.FedChair.Engine || {};

(function() {
  var templates = function() { return window.FedChair.Data.briefingTemplates; };

  // Duplicated utilities (private inside briefing.js IIFE)
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function getDescriptor(type, value) {
    var descriptors = templates().activityDescriptors[type];
    for (var i = 0; i < descriptors.length; i++) {
      if (value >= descriptors[i].min) return descriptors[i].desc;
    }
    return descriptors[descriptors.length - 1].desc;
  }

  function getDetail(sentiment) {
    var frags = templates().detailFragments;
    if (sentiment > 0.5) return pick(frags.positive);
    if (sentiment < -0.5) return pick(frags.negative);
    return pick(frags.neutral);
  }

  function fillTemplate(template, vars) {
    var result = template;
    for (var key in vars) {
      if (vars.hasOwnProperty(key)) {
        result = result.replace(new RegExp('\\{' + key + '\\}', 'g'), vars[key]);
      }
    }
    return result;
  }

  // ========================================
  // LIVE BEIGE BOOK
  // ========================================

  window.FedChair.Engine.generateLiveBeigeBook = function(gameState) {
    var t = templates();
    var allDistricts = t.districts;
    var economy = gameState.economy;
    var activeShocks = gameState.activeShocks || [];

    // Select 6-8 districts (more than standard 4-6)
    var count = 6 + Math.floor(Math.random() * 3); // 6-8
    var selected = shuffle(allDistricts).slice(0, count);

    var districtReports = selected.map(function(district) {
      var shockBias = 0;
      var map = t.shockSectorMap;
      for (var s = 0; s < activeShocks.length; s++) {
        var affectedSectors = map[activeShocks[s].type] || [];
        var overlap = district.sectors.some(function(sec) { return affectedSectors.indexOf(sec) >= 0; });
        if (overlap) shockBias -= 0.5;
      }

      var regionalGdp = economy.gdpGrowth + rand(-0.4, 0.4) + shockBias;
      var regionalPayrolls = economy.payrollsChange + rand(-30, 30) + shockBias * 40;
      var regionalInflation = economy.cpiInflation + rand(-0.3, 0.3);

      // Pick sector and template
      var sector = pick(district.sectors);
      var sectorTemplateList = t.sectorTemplates[sector] || t.sectorTemplates.manufacturing;
      var template = pick(sectorTemplateList);

      var activity = getDescriptor('growth', regionalGdp);
      var sentiment = regionalGdp > 2.0 ? 1 : regionalGdp < 0.5 ? -1 : 0;
      var detail = getDetail(sentiment + shockBias);

      var narrative = fillTemplate(template, {
        district: district.name,
        activity: activity,
        detail: detail
      });

      // Data-specific observations driven by thresholds (2-3 per district)
      var observations = [];

      // Core PCE price pressure
      if (economy.pceInflation > 2.8) {
        observations.push(
          'Contacts noted persistent price pressures, consistent with core PCE running at ' +
          economy.pceInflation.toFixed(1) + '% nationally.'
        );
      } else if (economy.pceInflation < 2.0) {
        observations.push(
          'Firms reported easing cost pressures, in line with PCE inflation at ' +
          economy.pceInflation.toFixed(1) + '%.'
        );
      }

      // Payrolls / hiring
      if (economy.payrollsChange < 100) {
        observations.push(
          'Several firms reported hiring freezes or reduced headcount, reflecting the broader slowdown in payrolls to +' +
          Math.round(economy.payrollsChange) + 'K.'
        );
      } else if (economy.payrollsChange > 180) {
        observations.push(
          'Firms continued to add staff at a healthy pace, consistent with national payrolls of +' +
          Math.round(economy.payrollsChange) + 'K.'
        );
      }

      // Unemployment concern
      if (economy.unemploymentRate > 4.5) {
        observations.push(
          'Labor market contacts expressed growing concern about softening demand, with unemployment at ' +
          economy.unemploymentRate.toFixed(1) + '%.'
        );
      } else if (economy.unemploymentRate < 3.8) {
        observations.push(
          'Tight labor conditions persisted, with unemployment at just ' +
          economy.unemploymentRate.toFixed(1) + '%, constraining expansion plans.'
        );
      }

      // CPI vs PCE divergence observation
      if (Math.abs(economy.cpiInflation - economy.pceInflation) > 0.3 && observations.length < 3) {
        observations.push(
          'Contacts noted the disconnect between CPI at ' + economy.cpiInflation.toFixed(1) +
          '% and PCE at ' + economy.pceInflation.toFixed(1) +
          '%, creating uncertainty around pricing strategies.'
        );
      }

      // GDP observation
      if (observations.length < 2) {
        if (economy.gdpGrowth < 1.0) {
          observations.push(
            'Businesses expressed caution amid GDP growth of just ' + economy.gdpGrowth.toFixed(1) + '%.'
          );
        } else if (economy.gdpGrowth > 2.5) {
          observations.push(
            'Activity remained supported by above-trend GDP growth of ' + economy.gdpGrowth.toFixed(1) + '%.'
          );
        }
      }

      // Ensure at least 2 observations
      if (observations.length < 2) {
        var hiringDesc = getDescriptor('hiring', regionalPayrolls);
        observations.push('Contacts ' + hiringDesc + '.');
      }

      // Append observations to narrative
      narrative += ' ' + observations.slice(0, 3).join(' ');

      return {
        district: district.name,
        number: district.number,
        narrative: narrative,
        sentiment: sentiment > 0 ? 'positive' : sentiment < 0 ? 'negative' : 'mixed'
      };
    });

    // Sort by district number
    districtReports.sort(function(a, b) { return a.number - b.number; });

    // Overall tone
    var avgGdp = economy.gdpGrowth;
    var overallTone = 'mixed';
    var tones = t.overallTones;
    for (var i = 0; i < tones.length; i++) {
      if (avgGdp >= tones[i].min) {
        overallTone = tones[i].tone;
        break;
      }
    }

    // Data-rich summary referencing actual numbers
    var summaryParts = [
      'Overall economic activity was ' + overallTone + ' across the twelve Federal Reserve districts.'
    ];

    summaryParts.push(
      'PCE inflation stood at ' + economy.pceInflation.toFixed(1) + '%' +
      ' while CPI printed at ' + economy.cpiInflation.toFixed(1) + '%,' +
      ' underscoring a notable divergence between the two gauges.'
    );

    summaryParts.push(
      'Nonfarm payrolls rose by ' + Math.round(economy.payrollsChange) + 'K,' +
      ' with the unemployment rate at ' + economy.unemploymentRate.toFixed(1) + '%.'
    );

    if (economy.gdpGrowth < 1.5) {
      summaryParts.push(
        'GDP growth of ' + economy.gdpGrowth.toFixed(1) + '% suggested a decelerating expansion.'
      );
    } else if (economy.gdpGrowth > 2.5) {
      summaryParts.push(
        'GDP growth of ' + economy.gdpGrowth.toFixed(1) + '% indicated continued above-trend activity.'
      );
    } else {
      summaryParts.push(
        'GDP growth of ' + economy.gdpGrowth.toFixed(1) + '% was broadly in line with trend.'
      );
    }

    return {
      summary: summaryParts.join(' '),
      districtReports: districtReports,
      overallTone: overallTone
    };
  };

  // ========================================
  // LIVE STAFF PROJECTIONS
  // ========================================

  window.FedChair.Engine.generateLiveStaffProjections = function(gameState) {
    var economy = gameState.economy;
    var meeting = gameState.meetingNumber;
    var currentRate = gameState.currentRate;

    var uncertaintyFactor = 1 + (meeting - 1) * 0.08;
    var r1 = function(v) { return Math.round(v * 10) / 10; };

    // --- GDP ---
    var gdpStaff = economy.gdpGrowth + (2.0 - economy.gdpGrowth) * 0.3 + rand(-0.2, 0.2);
    var gdpTrend = gameState.lastMeetingEconomy
      ? economy.gdpGrowth - gameState.lastMeetingEconomy.gdpGrowth
      : 0;
    var gdpMarket = economy.gdpGrowth + gdpTrend * 0.5 + rand(-0.15, 0.15);
    var gdpRange = 0.4 * uncertaintyFactor;

    // --- Inflation (PCE) ---
    var pceStaff = economy.pceInflation + (2.0 - economy.pceInflation) * 0.25 + rand(-0.2, 0.2);
    var pceTrend = gameState.lastMeetingEconomy
      ? economy.pceInflation - gameState.lastMeetingEconomy.pceInflation
      : 0;
    var pceMarket = economy.pceInflation + pceTrend * 0.6 + rand(-0.15, 0.15);
    var pceRange = 0.4 * uncertaintyFactor;

    // --- Unemployment ---
    var unempStaff = economy.unemploymentRate + (4.5 - economy.unemploymentRate) * 0.2 + rand(-0.15, 0.15);
    var unempTrend = gameState.lastMeetingEconomy
      ? economy.unemploymentRate - gameState.lastMeetingEconomy.unemploymentRate
      : 0;
    var unempMarket = economy.unemploymentRate + unempTrend * 0.5 + rand(-0.1, 0.1);
    var unempRange = 0.3 * uncertaintyFactor;

    // --- Fed Funds ---
    var ffStaff = currentRate + (3.0 - currentRate) * 0.15 + rand(-0.125, 0.125);
    var lastDecisions = gameState.rateHistory.slice(-3);
    var avgDecision = lastDecisions.reduce(function(sum, r) { return sum + (r.decision || 0); }, 0) / lastDecisions.length;
    var ffMarket = currentRate + avgDecision / 100 * 0.5 + rand(-0.125, 0.125);
    var ffRange = 0.375 * uncertaintyFactor;

    // Build rich narrative in formal Fed institutional tone
    var parts = [];

    // Inflation outlook (threshold-based on corePCE level)
    var corePCE = economy.pceInflation;
    if (corePCE > 3.0) {
      parts.push(
        'Staff assesses that inflation remains uncomfortably elevated, with core PCE at ' +
        corePCE.toFixed(1) + '% — well above the Committee\'s 2% objective. ' +
        'The persistence of above-target readings suggests that disinflationary progress has stalled, ' +
        'and the staff continues to condition its baseline forecast on a sufficiently restrictive policy stance.'
      );
    } else if (corePCE > 2.5) {
      parts.push(
        'With core PCE inflation at ' + corePCE.toFixed(1) +
        '%, the staff judges that underlying price pressures remain moderately above target. ' +
        'The projected path back to 2% is gradual, contingent on the current degree of policy restraint ' +
        'and continued normalization in supply-side conditions.'
      );
    } else if (corePCE > 2.0) {
      parts.push(
        'Core PCE inflation at ' + corePCE.toFixed(1) +
        '% is approaching the Committee\'s objective, though the staff notes that last-mile progress ' +
        'toward 2% may prove uneven given sticky components in shelter and services.'
      );
    } else {
      parts.push(
        'At ' + corePCE.toFixed(1) +
        '%, core PCE inflation has returned to the vicinity of the 2% target. ' +
        'Staff sees risks tilted toward undershooting if the current policy stance remains unchanged for an extended period.'
      );
    }

    // Growth and labor assessment
    if (economy.gdpGrowth > 2.0 && economy.payrollsChange > 120) {
      parts.push(
        'The real economy continues to demonstrate resilience, with GDP growth at ' +
        economy.gdpGrowth.toFixed(1) + '% and payroll gains of ' +
        Math.round(economy.payrollsChange) + 'K. ' +
        'Labor markets remain firm, with unemployment at ' + economy.unemploymentRate.toFixed(1) +
        '%, suggesting limited slack in the economy.'
      );
    } else if (economy.gdpGrowth < 1.5 || economy.payrollsChange < 100) {
      parts.push(
        'Growth has moderated to ' + economy.gdpGrowth.toFixed(1) +
        '% and payrolls added only ' + Math.round(economy.payrollsChange) + 'K jobs. ' +
        'With unemployment at ' + economy.unemploymentRate.toFixed(1) +
        '%, the staff sees emerging signs of labor market softening that warrant close monitoring.'
      );
    } else {
      parts.push(
        'GDP growth of ' + economy.gdpGrowth.toFixed(1) +
        '% and payroll gains of ' + Math.round(economy.payrollsChange) +
        'K represent a broadly balanced labor market, with unemployment at ' +
        economy.unemploymentRate.toFixed(1) + '%.'
      );
    }

    // Key risks: PCE/CPI divergence
    var pceCpiGap = Math.abs(economy.pceInflation - economy.cpiInflation);
    if (pceCpiGap > 0.3) {
      parts.push(
        'A key source of uncertainty is the ' + pceCpiGap.toFixed(1) +
        ' percentage point divergence between PCE (' + economy.pceInflation.toFixed(1) +
        '%) and CPI (' + economy.cpiInflation.toFixed(1) +
        '%) measures, which complicates the assessment of the true underlying inflation trend.'
      );
    }

    // BLS benchmark revision risk
    parts.push(
      'The staff also flags downside risk from potential BLS benchmark revisions to establishment survey data; ' +
      'preliminary signals suggest payroll levels may be revised lower, ' +
      'which would imply a softer labor market than currently indicated.'
    );

    // Tariff effects
    parts.push(
      'Trade policy uncertainty remains an upside risk to the inflation forecast. ' +
      'If recently announced or pending tariff actions take full effect, ' +
      'staff estimates suggest a 0.2-0.4 percentage point boost to core goods prices over the next four quarters, ' +
      'potentially complicating the Committee\'s disinflation objectives.'
    );

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
      narrative: parts.join(' ')
    };
  };

  // ========================================
  // LIVE DATA RELEASES
  // ========================================

  window.FedChair.Engine.generateLiveDataReleases = function(gameState) {
    var economy = gameState.economy;
    var meeting = gameState.meetingNumber;
    var r1 = function(v) { return Math.round(v * 10) / 10; };

    var releases = [];
    var corePCE = economy.pceInflation;
    var cpi = economy.cpiInflation;
    var payrolls = Math.round(economy.payrollsChange);
    var gdp = economy.gdpGrowth;
    var unemp = economy.unemploymentRate;
    var pceHeadline = r1(corePCE - 0.1);
    var cpiPceDivergence = Math.abs(corePCE - cpi);

    if (meeting === 1) {
      // ---- March 18, 2026 meeting: Jan 28 – Mar 18 inter-meeting period ----

      // 1. Core PCE (December)
      var corePCENote;
      if (corePCE >= 3.0) {
        corePCENote = 'Highest since April 2024. Sticky services — shelter, insurance, healthcare — drive above-target readings. December acceleration casts doubt on the disinflationary narrative.';
      } else if (corePCE >= 2.5) {
        corePCENote = 'Above target but consistent with gradual disinflation. Services inflation remains the primary contributor. Staff expects further deceleration conditional on maintained restraint.';
      } else {
        corePCENote = 'Approaching the 2% objective. Goods disinflation leads the decline while services remain sticky. Last-mile progress may prove uneven.';
      }
      releases.push({
        id: 'core_pce_dec', name: 'Core PCE Price Index (Dec)',
        source: 'BEA — January 31, 2026',
        actual: corePCE.toFixed(1) + '% YoY', expected: '2.9% YoY', previous: '2.8% YoY',
        surprise: corePCE >= 3.0 ? 'miss' : corePCE <= 2.7 ? 'beat' : 'inline',
        significance: 'high', note: corePCENote
      });

      // 2. Nonfarm Payrolls (January)
      var payrollsNote;
      if (payrolls < 100) {
        payrollsNote = 'Material slowdown in hiring. Combined with the BLS benchmark revision slashing 2025 gains by 911K, the labor market is weaker than headlines suggested through much of last year.';
      } else if (payrolls < 150) {
        payrollsNote = 'Moderate hiring pace consistent with gradual cooling. The BLS benchmark revision (−911K to 2025 totals) suggests underlying momentum was weaker than reported.';
      } else {
        payrollsNote = 'Hiring remains resilient despite restrictive policy. The BLS benchmark revision to 2025 data warrants caution in interpreting headline numbers.';
      }
      releases.push({
        id: 'nfp_jan', name: 'Nonfarm Payrolls (Jan)',
        source: 'BLS — February 7, 2026',
        actual: (payrolls >= 0 ? '+' : '') + payrolls + 'K', expected: '+165K', previous: '+170K',
        surprise: payrolls >= 155 ? 'beat' : payrolls <= 135 ? 'miss' : 'inline',
        significance: 'high', note: payrollsNote
      });

      // 3. CPI (January)
      var cpiNote;
      if (cpiPceDivergence > 0.4) {
        cpiNote = 'CPI-PCE divergence has widened to ' + cpiPceDivergence.toFixed(1) + ' pp — largest since 2023. Housing weight and healthcare methodology drive the wedge. Complicates the assessment of underlying inflation.';
      } else if (cpi > 3.0) {
        cpiNote = 'Headline CPI above 3% signals broad-based price pressures. Energy and food components contributed to the overshoot.';
      } else {
        cpiNote = 'CPI continues its descent. Shelter — roughly one-third of the index — is decelerating in line with lagged rent data, supporting the disinflation trend.';
      }
      releases.push({
        id: 'cpi_jan', name: 'CPI All Items (Jan)',
        source: 'BLS — February 12, 2026',
        actual: cpi.toFixed(1) + '% YoY', expected: '2.8% YoY', previous: '2.9% YoY',
        surprise: cpi <= 2.5 ? 'beat' : cpi >= 2.9 ? 'miss' : 'inline',
        significance: 'high', note: cpiNote
      });

      // 4. GDP Q4 2025 (Second Estimate)
      var gdpNote;
      if (gdp < 1.5) {
        gdpNote = 'Growth decelerated from the 2.8% mid-2025 pace. Business investment pulled back as lagged tightening works through credit-sensitive sectors. Consumer spending shows signs of fatigue.';
      } else if (gdp < 2.5) {
        gdpNote = 'Economy expanding near potential. Consumer spending remains the driver, shifting from goods to services. Business fixed investment mixed — structures weak, equipment holding up.';
      } else {
        gdpNote = 'Above-trend growth questions whether the policy stance is sufficiently restrictive. Resilient consumption suggests the neutral rate may be higher than estimated.';
      }
      releases.push({
        id: 'gdp_q4', name: 'GDP Q4 2025 (2nd Est.)',
        source: 'BEA — February 27, 2026',
        actual: gdp.toFixed(1) + '% SAAR', expected: '2.1% SAAR', previous: '2.3% SAAR',
        surprise: gdp >= 2.2 ? 'beat' : gdp <= 1.6 ? 'miss' : 'inline',
        significance: 'high', note: gdpNote
      });

      // 5. Unemployment Rate (January)
      var unempNote;
      if (unemp >= 4.5) {
        unempNote = 'Up ' + (unemp - 3.7).toFixed(1) + ' pp from the 3.7% cycle low. Approaching levels historically associated with broader deterioration. Sahm Rule indicator bears monitoring.';
      } else if (unemp >= 4.0) {
        unempNote = 'Within the range consistent with maximum employment, though the drift from 3.7% suggests normalization from post-pandemic tightness.';
      } else {
        unempNote = 'Exceptionally tight labor market. Wage pressures likely to persist, complicating the inflation outlook even as goods prices moderate.';
      }
      releases.push({
        id: 'unemployment_jan', name: 'Unemployment Rate (Jan)',
        source: 'BLS — February 7, 2026',
        actual: unemp.toFixed(1) + '%', expected: '4.2%', previous: '4.1%',
        surprise: unemp <= 4.1 ? 'beat' : unemp >= 4.4 ? 'miss' : 'inline',
        significance: 'high', note: unempNote
      });

      // 6. PCE (January) — released just before meeting
      var pceJanNote;
      if (corePCE >= 2.8) {
        pceJanNote = 'Released 5 days before this meeting. Goldman and other sell-side firms flagged risk of another hot print. Back-to-back elevated readings would challenge the Committee\'s patience.';
      } else {
        pceJanNote = 'Closely watched for confirmation of the disinflation trend. January seasonal adjustment issues add uncertainty to interpretation.';
      }
      releases.push({
        id: 'pce_jan', name: 'PCE Price Index (Jan)',
        source: 'BEA — March 13, 2026',
        actual: pceHeadline.toFixed(1) + '% YoY', expected: '2.7% YoY', previous: '2.9% YoY',
        surprise: pceHeadline >= 2.9 ? 'miss' : pceHeadline <= 2.6 ? 'beat' : 'inline',
        significance: 'high', note: pceJanNote
      });

    } else {
      // ---- May 6-7, 2026 meeting: Mar 18 – May 6 inter-meeting period ----

      // 1. Core PCE (February)
      var corePCENote2;
      if (corePCE >= 3.0) {
        corePCENote2 = 'Inflation persistence continues to confound expectations. Three consecutive months above target raise questions about the adequacy of the current policy stance.';
      } else if (corePCE >= 2.5) {
        corePCENote2 = 'Disinflation is proceeding but at a frustratingly slow pace. Shelter and services remain the key obstacles to a return to 2%.';
      } else {
        corePCENote2 = 'The downward trend is firmly established. Staff projections now show a return to 2% by early 2027 conditional on the current policy path.';
      }
      releases.push({
        id: 'core_pce_feb', name: 'Core PCE Price Index (Feb)',
        source: 'BEA — March 28, 2026',
        actual: corePCE.toFixed(1) + '% YoY', expected: r1(corePCE + 0.1).toFixed(1) + '% YoY', previous: r1(corePCE + 0.1).toFixed(1) + '% YoY',
        surprise: corePCE >= 3.0 ? 'miss' : 'inline',
        significance: 'high', note: corePCENote2
      });

      // 2. Nonfarm Payrolls (March)
      var payrollsNote2;
      if (payrolls < 100) {
        payrollsNote2 = 'The labor market continues to decelerate. The post-revision data paint a picture of a job market that has been cooling for longer than headline numbers suggested.';
      } else if (payrolls < 150) {
        payrollsNote2 = 'Hiring pace is consistent with a labor market in equilibrium. Neither strong enough to fuel inflation concerns nor weak enough to signal recession.';
      } else {
        payrollsNote2 = 'Job creation remains robust. The resilience of the labor market despite restrictive policy continues to puzzle forecasters.';
      }
      releases.push({
        id: 'nfp_mar', name: 'Nonfarm Payrolls (Mar)',
        source: 'BLS — April 3, 2026',
        actual: (payrolls >= 0 ? '+' : '') + payrolls + 'K', expected: '+145K', previous: '+' + (payrolls + Math.round(rand(-20, 20))) + 'K',
        surprise: payrolls >= 155 ? 'beat' : payrolls <= 120 ? 'miss' : 'inline',
        significance: 'high', note: payrollsNote2
      });

      // 3. CPI (March)
      var cpiNote2;
      if (cpiPceDivergence > 0.4) {
        cpiNote2 = 'The CPI-PCE divergence persists at ' + cpiPceDivergence.toFixed(1) + ' pp. This measurement gap complicates forward guidance and public communication about inflation progress.';
      } else {
        cpiNote2 = 'CPI readings continue to converge toward PCE, reducing one source of uncertainty in the inflation assessment.';
      }
      releases.push({
        id: 'cpi_mar', name: 'CPI All Items (Mar)',
        source: 'BLS — April 10, 2026',
        actual: cpi.toFixed(1) + '% YoY', expected: r1(cpi + 0.1).toFixed(1) + '% YoY', previous: r1(cpi + 0.1).toFixed(1) + '% YoY',
        surprise: cpi <= 2.5 ? 'beat' : cpi >= 3.0 ? 'miss' : 'inline',
        significance: 'high', note: cpiNote2
      });

      // 4. GDP Q1 2026 (Advance)
      var gdpNote2;
      if (gdp < 1.5) {
        gdpNote2 = 'The first quarter reading confirms the growth downshift. The question now is whether this represents a soft patch or the beginning of a more sustained slowdown.';
      } else if (gdp < 2.5) {
        gdpNote2 = 'Growth remains near potential, supporting the soft-landing narrative. The composition — services vs. goods — will be closely examined.';
      } else {
        gdpNote2 = 'Above-trend growth persists, raising the risk that the Committee has underestimated the neutral rate. This complicates the case for near-term easing.';
      }
      releases.push({
        id: 'gdp_q1', name: 'GDP Q1 2026 (Advance)',
        source: 'BEA — April 30, 2026',
        actual: gdp.toFixed(1) + '% SAAR', expected: r1(gdp + 0.2).toFixed(1) + '% SAAR', previous: r1(gdp + 0.3).toFixed(1) + '% SAAR',
        surprise: gdp >= 2.2 ? 'beat' : gdp <= 1.5 ? 'miss' : 'inline',
        significance: 'high', note: gdpNote2
      });

      // 5. Unemployment Rate (March)
      var unempNote2;
      if (unemp >= 4.5) {
        unempNote2 = 'The unemployment rate has now risen for multiple months. The labor market is clearly loosening, adding urgency to the dual-mandate debate.';
      } else if (unemp >= 4.0) {
        unempNote2 = 'Unemployment holds in the range the Committee considers consistent with full employment, though the trend is gradually upward.';
      } else {
        unempNote2 = 'Labor market tightness persists. At these levels, wage growth may remain inconsistent with the 2% inflation target.';
      }
      releases.push({
        id: 'unemployment_mar', name: 'Unemployment Rate (Mar)',
        source: 'BLS — April 3, 2026',
        actual: unemp.toFixed(1) + '%', expected: r1(unemp - 0.1).toFixed(1) + '%', previous: r1(unemp - 0.1).toFixed(1) + '%',
        surprise: unemp <= 4.1 ? 'beat' : unemp >= 4.4 ? 'miss' : 'inline',
        significance: 'high', note: unempNote2
      });

      // 6. PCE (March)
      var pceNote2;
      if (corePCE >= 2.8) {
        pceNote2 = 'Released days before this meeting. Another elevated print would mark three consecutive months above expectations, severely testing the Committee\'s patience framework.';
      } else {
        pceNote2 = 'The March reading provides the freshest signal on the disinflationary trend heading into this meeting.';
      }
      releases.push({
        id: 'pce_mar', name: 'PCE Price Index (Mar)',
        source: 'BEA — May 1, 2026',
        actual: pceHeadline.toFixed(1) + '% YoY', expected: r1(pceHeadline + 0.1).toFixed(1) + '% YoY', previous: r1(pceHeadline + 0.1).toFixed(1) + '% YoY',
        surprise: pceHeadline >= 2.9 ? 'miss' : pceHeadline <= 2.6 ? 'beat' : 'inline',
        significance: 'high', note: pceNote2
      });
    }

    return releases;
  };

  // ========================================
  // LIVE MARKET PRICING
  // ========================================

  window.FedChair.Engine.generateLiveMarketPricing = function(gameState) {
    var economy = gameState.economy;
    var meeting = gameState.meetingNumber;
    var currentRate = gameState.currentRate;
    var markets = gameState.markets;
    var r1 = function(v) { return Math.round(v * 10) / 10; };

    var prob, shiftText, futureGuidance, marketSentiment, ratePathExpectations, drivers;

    if (meeting === 1) {
      // March meeting — real-world CME pricing: ~94% hold
      prob = { cut50: 0, cut25: 3, hold: 94, hike25: 2, hike50: 1 };

      // Adjust if economy diverges from baseline
      if (economy.pceInflation >= 3.2) {
        prob = { cut50: 0, cut25: 1, hold: 86, hike25: 9, hike50: 4 };
      } else if (economy.pceInflation < 2.5) {
        prob = { cut50: 2, cut25: 15, hold: 78, hike25: 4, hike50: 1 };
      }

      shiftText = 'Positioning has been stable since January. Hot PCE data (hawkish) and the massive BLS benchmark revision (dovish) roughly offset, leaving the rate path distribution largely unchanged.';

      drivers = [];
      if (economy.pceInflation >= 2.8) {
        drivers.push('Core PCE at ' + economy.pceInflation.toFixed(1) + '% — well above the 2% target — anchors hold expectations. Several participants raised the possibility of rate increases if inflation persists.');
      } else {
        drivers.push('Inflation progress supports eventual easing, though the Committee has signaled patience through the inter-meeting period.');
      }
      drivers.push('BLS benchmark revision slashing 911K jobs from 2025 creates ambiguity about true labor market conditions, reinforcing the case for a cautious hold.');
      if (economy.gdpGrowth < 1.5) {
        drivers.push('Decelerating GDP (' + economy.gdpGrowth.toFixed(1) + '%) adds urgency to the easing case, but inflation persistence constrains the Committee.');
      } else {
        drivers.push('GDP at ' + economy.gdpGrowth.toFixed(1) + '% and unemployment at ' + economy.unemploymentRate.toFixed(1) + '% suggest the economy can tolerate the current stance.');
      }

      // Market sentiment
      if (economy.pceInflation >= 3.0 && economy.gdpGrowth > 1.5) {
        marketSentiment = 'Markets are pricing a stagflationary undertone — inflation too high to cut, growth too fragile to hike. The VIX at ' + markets.vix.toFixed(1) + ' captures this discomfort.';
      } else if (economy.pceInflation >= 2.5) {
        marketSentiment = 'Risk sentiment is cautious. S&P 500 at ' + Math.round(markets.sp500).toLocaleString() + ' reflects persistent inflation against slowing momentum. The 10Y at ' + markets.treasury10y.toFixed(2) + '% signals higher-for-longer.';
      } else {
        marketSentiment = 'Markets have turned modestly optimistic as inflation decelerates. The 2Y at ' + markets.treasury2y.toFixed(2) + '% prices eventual easing, while equities rally on soft-landing hopes.';
      }

      // Rate path expectations
      ratePathExpectations = [
        { meeting: 'May 2026', expectedRate: r1(currentRate), probability: 78, action: 'HOLD' }
      ];
      if (economy.pceInflation >= 2.8) {
        ratePathExpectations.push({ meeting: 'Jun 2026', expectedRate: r1(currentRate), probability: 62, action: 'HOLD' });
        ratePathExpectations.push({ meeting: 'Sep 2026', expectedRate: r1(currentRate - 0.25), probability: 55, action: '-25 bp' });
        ratePathExpectations.push({ meeting: 'Dec 2026', expectedRate: r1(currentRate - 0.50), probability: 48, action: '-25 bp' });
      } else {
        ratePathExpectations.push({ meeting: 'Jun 2026', expectedRate: r1(currentRate - 0.25), probability: 58, action: '-25 bp' });
        ratePathExpectations.push({ meeting: 'Sep 2026', expectedRate: r1(currentRate - 0.50), probability: 52, action: '-25 bp' });
        ratePathExpectations.push({ meeting: 'Dec 2026', expectedRate: r1(currentRate - 0.75), probability: 40, action: '-25 bp' });
      }

      if (economy.pceInflation >= 2.8) {
        futureGuidance = 'Futures embed two 25bp cuts by year-end 2026, but the pricing has low conviction — implied probabilities for the second cut sit below 50%. If inflation fails to decelerate, markets could reprice toward a hike.';
      } else {
        futureGuidance = 'Markets price 50-75bp in easing through year-end 2026, beginning as early as June. The trajectory assumes continued disinflation and no material growth deterioration.';
      }

    } else {
      // May meeting — adjust based on meeting 1 outcome
      var lastDecision = 0;
      if (gameState.rateHistory.length > 1) {
        lastDecision = gameState.rateHistory[gameState.rateHistory.length - 1].decision || 0;
      }

      if (lastDecision > 0) {
        // Player hiked — markets shift hawkish
        prob = { cut50: 0, cut25: 2, hold: 72, hike25: 20, hike50: 6 };
        shiftText = 'Positioning shifted sharply hawkish after the March rate hike — the first increase since 2023. Markets now price a meaningful probability of further tightening.';
      } else if (lastDecision < 0) {
        // Player cut — markets shift dovish
        prob = { cut50: 8, cut25: 45, hold: 40, hike25: 5, hike50: 2 };
        shiftText = 'The March rate cut triggered a significant dovish repricing. Markets now expect the easing cycle to continue, with cumulative cuts of 75-100bp priced by year-end.';
      } else {
        // Player held — gradual adjustment
        if (economy.pceInflation >= 2.8) {
          prob = { cut50: 0, cut25: 5, hold: 85, hike25: 8, hike50: 2 };
        } else if (economy.pceInflation < 2.3) {
          prob = { cut50: 3, cut25: 35, hold: 55, hike25: 5, hike50: 2 };
        } else {
          prob = { cut50: 1, cut25: 12, hold: 78, hike25: 7, hike50: 2 };
        }
        shiftText = 'Following the March hold, positioning has adjusted modestly based on incoming data. The path forward remains data-dependent.';
      }

      drivers = [];
      drivers.push('The March meeting outcome (' + (lastDecision > 0 ? 'hike' : lastDecision < 0 ? 'cut' : 'hold') + ') reset the baseline for forward expectations.');
      if (economy.pceInflation >= 2.8) {
        drivers.push('Inflation readings remain elevated at ' + economy.pceInflation.toFixed(1) + '%, limiting the scope for near-term easing.');
      } else {
        drivers.push('Continued disinflation to ' + economy.pceInflation.toFixed(1) + '% supports the case for eventual rate reductions.');
      }
      drivers.push('GDP at ' + economy.gdpGrowth.toFixed(1) + '% and payrolls at +' + Math.round(economy.payrollsChange) + 'K inform the growth side of the dual mandate.');

      marketSentiment = 'Post-March-meeting sentiment is ' + (lastDecision > 0 ? 'anxious about the tightening resumption' : lastDecision < 0 ? 'optimistic about the easing cycle' : 'watchful and data-dependent') + '. S&P 500 at ' + Math.round(markets.sp500).toLocaleString() + ', VIX at ' + markets.vix.toFixed(1) + '.';

      ratePathExpectations = [
        { meeting: 'Jun 2026', expectedRate: r1(currentRate + (lastDecision > 0 ? 0.25 : lastDecision < 0 ? -0.25 : 0) * 0.3), probability: 55, action: lastDecision > 0 ? '+25 bp' : lastDecision < 0 ? '-25 bp' : 'HOLD' },
        { meeting: 'Sep 2026', expectedRate: r1(currentRate - 0.25), probability: 45, action: '-25 bp' },
        { meeting: 'Dec 2026', expectedRate: r1(currentRate - 0.50), probability: 38, action: '-25 bp' }
      ];

      futureGuidance = lastDecision > 0
        ? 'The market is divided on whether the March hike signals a new tightening cycle or a one-off hawkish adjustment. The terminal rate has been repriced ' + Math.round(Math.abs(lastDecision) * 0.6) + 'bp higher.'
        : lastDecision < 0
          ? 'Markets have embraced the easing narrative, pricing a cumulative 75bp in cuts by year-end. The risk is that inflation persistence forces a pause or reversal.'
          : 'Rate expectations remain anchored near current levels for the next two meetings, with cuts priced for H2 2026 conditional on further inflation progress.';
    }

    // Normalize probabilities
    var total = 0;
    var key;
    for (key in prob) { if (prob.hasOwnProperty(key)) total += prob[key]; }
    var maxKey = 'hold';
    var maxVal = 0;
    for (key in prob) {
      if (prob.hasOwnProperty(key)) {
        prob[key] = Math.round(prob[key] / total * 100);
        if (prob[key] > maxVal) { maxVal = prob[key]; maxKey = key; }
      }
    }
    var sumNow = 0;
    for (key in prob) { if (prob.hasOwnProperty(key)) sumNow += prob[key]; }
    prob[maxKey] += 100 - sumNow;

    return {
      fedFundsExpected: meeting === 1 ? 0 : (gameState.rateHistory.length > 1 ? (gameState.rateHistory[gameState.rateHistory.length - 1].decision || 0) : 0),
      fedFundsProb: prob,
      shiftSinceLastMeeting: shiftText,
      keyDrivers: drivers.slice(0, 3),
      futureGuidance: futureGuidance,
      marketSentiment: marketSentiment,
      ratePathExpectations: ratePathExpectations
    };
  };

  // ========================================
  // LIVE SIGNALS (Committee Dynamics)
  // ========================================

  window.FedChair.Engine.generateLiveSignals = function(gameState) {
    var economy = gameState.economy;
    var meeting = gameState.meetingNumber;
    var members = window.FedChair.Data.boardOfGovernors;
    var presidents = window.FedChair.Data.regionalPresidents;

    // Classify members into hawk/centrist/dove
    var allMembers = members.concat(presidents);
    var hawks = [];
    var centrists = [];
    var doves = [];
    for (var i = 0; i < allMembers.length; i++) {
      var m = allMembers[i];
      var entry = { name: m.name, role: m.role || m.bank || '', stance: m.stance };
      if (m.stance === 'Very Hawkish' || m.stance === 'Hawkish') {
        hawks.push(entry);
      } else if (m.stance === 'Very Dovish' || m.stance === 'Dovish') {
        doves.push(entry);
      } else {
        centrists.push(entry);
      }
    }

    // Committee sentiment summary — threshold-based
    var sentimentSummary;
    if (economy.pceInflation >= 3.0) {
      sentimentSummary = 'The Committee leans cautiously hawkish. With core PCE at ' + economy.pceInflation.toFixed(1) + '%, even traditionally dovish members have adopted a "patient" posture, while hawks are openly discussing rate increases. The centrist bloc holds the balance of power.';
    } else if (economy.pceInflation >= 2.5) {
      sentimentSummary = 'Sentiment is divided but leaning toward patience. Hawks cite persistent inflation above target; doves point to labor market cooling and the BLS revision. A hold is the consensus floor, but the path forward is contested.';
    } else {
      sentimentSummary = 'The Committee has shifted dovish. With inflation approaching target, the debate has moved from "whether to cut" to "when and how fast." Hawks remain cautious but are increasingly isolated.';
    }

    // Key Voices — threshold-driven quotes from real members
    var keyVoices = [];

    // Powell (Chair, Centrist)
    keyVoices.push({
      member: 'Jerome H. Powell', role: 'Chair', stance: 'Centrist',
      quote: economy.pceInflation >= 2.8
        ? 'We need to see more evidence that inflation is sustainably moving toward 2 percent. The recent data have not given us that greater confidence. We are prepared to maintain the current stance for as long as appropriate.'
        : 'The data are moving in the right direction. We will be looking at the totality of the data as we consider the appropriate path for policy.',
      context: 'Press conference, January 29'
    });

    // Bowman (Hawkish)
    keyVoices.push({
      member: 'Michelle W. Bowman', role: 'Governor', stance: 'Hawkish',
      quote: economy.pceInflation >= 2.8
        ? 'I continue to see upside risks to inflation. If progress stalls, we should be willing to raise rates further. I am not comfortable with the current pace of disinflation.'
        : 'While inflation has moderated, I believe we should maintain a restrictive stance until we have clear and convincing evidence that price stability has been restored.',
      context: 'ABA Banking Conference, February 18'
    });

    // Waller (Dovish)
    keyVoices.push({
      member: 'Christopher J. Waller', role: 'Governor', stance: 'Dovish',
      quote: economy.unemploymentRate >= 4.3
        ? 'The labor market data — especially after the benchmark revision — suggest we may be closer to the point where rate reductions become appropriate. I am increasingly focused on the employment side of our dual mandate.'
        : 'The balance of risks is shifting. I want to see more data, but the BLS revision has changed my assessment of underlying labor market strength.',
      context: 'Brookings Institution, February 11'
    });

    // Kashkari (Dovish, Minneapolis)
    keyVoices.push({
      member: 'Neel Kashkari', role: 'Minneapolis Fed', stance: 'Dovish',
      quote: economy.gdpGrowth < 2.0
        ? 'GDP at ' + economy.gdpGrowth.toFixed(1) + '% tells me policy is biting. The BLS revision tells me the labor market was never as strong as we thought. We should be preparing the ground for easing.'
        : 'The labor market data revisions give me pause. We should not over-tighten in pursuit of the last half-point of inflation.',
      context: 'Minneapolis Fed Town Hall, February 20'
    });

    // Hammack (Hawkish, Cleveland)
    keyVoices.push({
      member: 'Beth M. Hammack', role: 'Cleveland Fed', stance: 'Hawkish',
      quote: economy.pceInflation >= 2.8
        ? 'Core PCE at ' + economy.pceInflation.toFixed(1) + '% is not consistent with our price stability mandate. I am not ready to declare victory on inflation, and all options must remain on the table.'
        : 'Inflation remains above target and I want to see a sustained decline before considering any adjustment to the policy stance.',
      context: 'Cleveland Fed Economic Outlook, February 25'
    });

    // Leadership Transition
    var leadershipTransition = {
      headline: 'Warsh Nomination and Powell Succession',
      details: []
    };

    if (meeting === 1) {
      leadershipTransition.details.push({
        title: 'Warsh Nomination',
        description: 'Kevin Warsh was formally nominated as Fed Chair on February 24. Senate Banking Committee confirmation hearings are scheduled for March. If confirmed, Warsh would take office upon Powell\'s departure. Markets view Warsh as more hawkish on regulatory matters but potentially more dovish on rates.'
      });
      leadershipTransition.details.push({
        title: 'Powell\'s Legal Situation',
        description: 'The DOJ grand jury subpoena over Eccles Building renovation testimony has created unprecedented legal uncertainty. Powell has stated he intends to serve out his term, but the nomination of a successor signals the White House is preparing for a transition. Powell is expected to chair this meeting normally.'
      });
      leadershipTransition.details.push({
        title: 'Miran Seat Status',
        description: 'Governor Miran\'s term expired March 1 but he will continue serving until a successor is confirmed. His vote (Very Dovish) remains on the Committee, though his influence may be diminished as a holdover member.'
      });
    } else {
      leadershipTransition.details.push({
        title: 'Warsh Confirmation Progress',
        description: 'Senate Banking Committee hearings concluded in late March. Warsh signaled continuity on the inflation-fighting mandate while indicating openness to a somewhat lower terminal rate. Full Senate vote is expected in coming weeks.'
      });
      leadershipTransition.details.push({
        title: 'Transition Dynamics',
        description: 'The pending leadership change creates a policy-setting twilight zone. Committee members are balancing their independent assessments against the possibility that the policy framework may shift under new leadership. Some view this as a reason to avoid large policy moves in either direction.'
      });
    }

    // External Pressures
    var externalPressures = [];

    externalPressures.push({
      title: 'Political Pressure on Independence',
      description: 'The Warsh nomination, DOJ probe of Powell, and public comments from administration officials represent an unusual convergence of political pressure on the Federal Reserve. Committee members are expected to reassert independence in communications.',
      severity: 'high'
    });

    externalPressures.push({
      title: 'Trade Policy and Tariff Risk',
      description: 'Announced and pending tariff actions create upside risk to the inflation forecast. Staff estimates a 0.2-0.4 pp boost to core goods prices if tariffs take full effect, complicating the disinflation path.',
      severity: 'medium'
    });

    if (economy.gdpGrowth < 2.0 || gameState.markets.dxy > 100) {
      externalPressures.push({
        title: 'Global Growth Headwinds',
        description: 'European and Chinese growth have decelerated, reducing external demand. The dollar (DXY ' + gameState.markets.dxy.toFixed(1) + ') compounds the external drag. Some members view global weakness as reason for preemptive easing.',
        severity: 'medium'
      });
    }

    externalPressures.push({
      title: 'Financial Stability Monitoring',
      description: 'Commercial real estate stress and regional bank exposure remain on the radar. While systemic risk is assessed as contained, further rate increases could exacerbate vulnerabilities.',
      severity: 'low'
    });

    return {
      type: 'live',
      committeeSentiment: {
        hawks: hawks,
        centrists: centrists,
        doves: doves,
        summary: sentimentSummary
      },
      keyVoices: keyVoices,
      leadershipTransition: leadershipTransition,
      externalPressures: externalPressures
    };
  };

})();
