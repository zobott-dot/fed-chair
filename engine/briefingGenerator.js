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

})();
