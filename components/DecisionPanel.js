// Decision Panel Component - Rate selection and statement builder

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const panelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

const formatRate = (rate) => `${(rate - 0.125).toFixed(2)}% - ${(rate + 0.125).toFixed(2)}%`;

const getDecisionLabel = (bps) => {
  if (bps === -50) return '-50';
  if (bps === -25) return '-25';
  if (bps === 0) return 'HOLD';
  if (bps === 25) return '+25';
  if (bps === 50) return '+50';
  return `${bps}`;
};

const getDecisionColor = (bps) => {
  if (bps < 0) return '#22c55e';
  if (bps > 0) return '#ef4444';
  return '#60a5fa';
};

const getCredibilityColor = (credibility) => {
  if (credibility >= 80) return '#22c55e';
  if (credibility >= 60) return '#84cc16';
  if (credibility >= 40) return '#eab308';
  if (credibility >= 20) return '#f97316';
  return '#ef4444';
};

// --- AI Statement Generation ---

const statementOptionsCache = {};

const STANCE_SCORES = {
  economicAssessment: { hawkish: 1, neutral: 0, dovish: -1 },
  inflationFraming:   { hawkish: 2, neutral: 0, dovish: -1 },
  laborMarket:        { hawkish: 1, neutral: 0, dovish: -1 },
  forwardGuidance:    { hawkish: 2, neutral: 0, dovish: -2 },
  riskBalance:        { hawkish: 1, neutral: 0, dovish: -1 }
};

const EXPANDED_STANCE_SCORES = {
  economy:   { hawkish: 1, neutral: 0, dovish: -1 },
  labor:     { hawkish: 1, neutral: 0, dovish: -1 },
  inflation: { hawkish: 2, neutral: 0, dovish: -1 },
  guidance:  { hawkish: 2, neutral: 0, dovish: -2 },
  risks:     { hawkish: 1, neutral: 0, dovish: -1 }
};

const CATEGORY_LABELS = {
  economic: '📈 Economy', labor: '👥 Labor', inflation: '📊 Inflation', guidance: '🎯 Guidance',
  economicAssessment: '📈 Economy', inflationFraming: '📊 Inflation',
  laborMarket: '👥 Labor', forwardGuidance: '🎯 Guidance', riskBalance: '⚖️ Risk Balance'
};

const STANCE_BADGE = {
  hawkish: { label: 'HAWKISH', bg: 'rgba(249, 115, 22, 0.15)', color: '#f97316', border: 'rgba(249, 115, 22, 0.3)' },
  neutral: { label: 'BALANCED', bg: 'rgba(156, 163, 175, 0.15)', color: '#9ca3af', border: 'rgba(156, 163, 175, 0.3)' },
  dovish:  { label: 'DOVISH', bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)' }
};

const SUBCATEGORY_STANCE_BADGE = {
  hawkish: { label: 'HAWKISH', color: '#D97706', border: '1px solid #D97706', padding: '1px 6px', fontSize: '10px', borderRadius: '3px', fontFamily: 'monospace' },
  neutral: { label: 'NEUTRAL', color: '#6B7280', border: '1px solid #6B7280', padding: '1px 6px', fontSize: '10px', borderRadius: '3px', fontFamily: 'monospace' },
  dovish:  { label: 'DOVISH', color: '#3B82F6', border: '1px solid #3B82F6', padding: '1px 6px', fontSize: '10px', borderRadius: '3px', fontFamily: 'monospace' }
};

function flattenExpandedPhrases(expanded) {
  const flat = {};
  for (const [catKey, cat] of Object.entries(expanded)) {
    const phrases = [];
    const scores = EXPANDED_STANCE_SCORES[catKey] || { hawkish: 1, neutral: 0, dovish: -1 };
    for (const sub of cat.subcategories) {
      for (const phrase of sub.phrases) {
        phrases.push({
          id: phrase.id,
          text: phrase.text,
          hawkScore: scores[sub.stance] || 0,
          stance: sub.stance
        });
      }
    }
    flat[catKey] = phrases;
  }
  return flat;
}

function transformAiOptions(aiResponse) {
  const transformed = {};
  for (const [category, options] of Object.entries(aiResponse)) {
    const scores = STANCE_SCORES[category] || { hawkish: 1, neutral: 0, dovish: -1 };
    transformed[category] = options.map(opt => ({
      id: opt.id,
      text: opt.text,
      hawkScore: scores[opt.stance] || 0,
      stance: opt.stance
    }));
  }
  return transformed;
}

async function generateStatementOptions(gameState, rateDecision) {
  const economy = gameState.economy;
  const previousDecisions = (gameState.meetingHistory || []).map(m => m.decision);
  const chair = gameState.chairName === 'Warsh' ? 'Kevin Warsh' : 'Jerome H. Powell';

  const prompt = `You are generating FOMC statement phrase options for an educational Fed Chair simulation game.

Current economic context:
- Meeting: ${gameState.meetingNumber} of ${gameState.totalMeetings}
- Current Fed Funds Rate: ${gameState.currentRate}%
- Player's rate decision this meeting: ${rateDecision > 0 ? '+' : ''}${rateDecision} bps (${rateDecision === 0 ? 'HOLD' : rateDecision > 0 ? 'HIKE' : 'CUT'})
- Core PCE Inflation: ${economy.pceInflation.toFixed(1)}%
- CPI: ${economy.cpiInflation.toFixed(1)}%
- Unemployment: ${economy.unemploymentRate.toFixed(1)}%
- GDP Growth: ${economy.gdpGrowth.toFixed(1)}%
- Nonfarm Payrolls: ${economy.payrollsChange > 0 ? '+' : ''}${Math.round(economy.payrollsChange)}K
- Fed Chair: ${chair}
- Player Credibility Score: ${gameState.credibility}/100
- Previous rate decisions: ${JSON.stringify(previousDecisions)}

Generate exactly 3 options for each of these 5 FOMC statement categories. Each option should:
1. Reference the specific economic numbers above (not generic language)
2. Be written in authentic Fed-speak — formal, hedged, institutional tone
3. Reflect different policy stances (hawkish / neutral / dovish) within each category
4. Be 1-2 sentences, the length of a real FOMC statement phrase
5. Teach the player something real about how Fed communication works

Categories:
1. ECONOMIC ASSESSMENT — How the committee views overall economic activity
2. INFLATION FRAMING — How the committee characterizes current inflation dynamics
3. LABOR MARKET — How the committee describes employment conditions
4. FORWARD GUIDANCE — What signal the committee gives about future rate path
5. RISK BALANCE — How the committee characterizes risks to the outlook

Respond ONLY with a JSON object in this exact structure, no preamble, no markdown:
{
  "economicAssessment": [
    { "id": "ea1", "text": "...", "stance": "hawkish" },
    { "id": "ea2", "text": "...", "stance": "neutral" },
    { "id": "ea3", "text": "...", "stance": "dovish" }
  ],
  "inflationFraming": [
    { "id": "if1", "text": "...", "stance": "hawkish" },
    { "id": "if2", "text": "...", "stance": "neutral" },
    { "id": "if3", "text": "...", "stance": "dovish" }
  ],
  "laborMarket": [
    { "id": "lm1", "text": "...", "stance": "hawkish" },
    { "id": "lm2", "text": "...", "stance": "neutral" },
    { "id": "lm3", "text": "...", "stance": "dovish" }
  ],
  "forwardGuidance": [
    { "id": "fg1", "text": "...", "stance": "hawkish" },
    { "id": "fg2", "text": "...", "stance": "neutral" },
    { "id": "fg3", "text": "...", "stance": "dovish" }
  ],
  "riskBalance": [
    { "id": "rb1", "text": "...", "stance": "hawkish" },
    { "id": "rb2", "text": "...", "stance": "neutral" },
    { "id": "rb3", "text": "...", "stance": "dovish" }
  ]
}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: controller.signal
    });

    clearTimeout(timeout);
    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    const text = data.content[0].text;
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (e) {
    clearTimeout(timeout);
    throw e;
  }
}

// --- End AI Statement Generation ---

window.FedChair.Components.DecisionPanel = function({
  economicData,
  statementPhrases,
  currentRate,
  rateDecision,
  setRateDecision,
  selectedStatements,
  setSelectedStatements,
  decisionPublished,
  hawkLabel,
  onDecision,
  onPublish,
  gameState,
  dotSelections,
  setDotSelections,
  onStatementPhrasesChange,
  learnMode
}) {
  const LearnTerm = window.FedChair.Components.LearnTerm;
  const expandedPhrases = window.FedChair.Data.statementPhrasesExpanded;
  const useAccordion = !!expandedPhrases;

  // Build lookup: phraseId → categoryKey for one-per-category selection
  const phraseCategoryMap = React.useMemo(() => {
    if (!expandedPhrases) return {};
    const map = {};
    for (const [catKey, cat] of Object.entries(expandedPhrases)) {
      for (const sub of cat.subcategories) {
        for (const phrase of sub.phrases) {
          map[phrase.id] = catKey;
        }
      }
    }
    return map;
  }, []);

  const toggleStatement = (id) => {
    if (useAccordion) {
      const categoryKey = phraseCategoryMap[id];
      setSelectedStatements(prev => {
        if (prev.includes(id)) return prev.filter(s => s !== id);
        // Get all phrase IDs in this category
        const categoryPhraseIds = expandedPhrases[categoryKey].subcategories
          .flatMap(sub => sub.phrases.map(p => p.id));
        return [...prev.filter(s => !categoryPhraseIds.includes(s)), id];
      });
    } else {
      setSelectedStatements(prev =>
        prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
      );
    }
  };

  const meetingNumber = gameState?.meetingNumber || 1;
  const totalMeetings = gameState?.totalMeetings || 8;
  const credibility = gameState?.credibility || 100;
  const marketExpects = gameState?.marketExpects || 0;

  // Accordion state
  const [openCategories, setOpenCategories] = React.useState({});
  const [openSubcategories, setOpenSubcategories] = React.useState({});

  function toggleCategory(categoryId) {
    setOpenCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  }

  function toggleSubcategory(subcategoryId) {
    setOpenSubcategories(prev => ({ ...prev, [subcategoryId]: !prev[subcategoryId] }));
  }

  // AI-generated statement options (only used when accordion is not available)
  const [aiStatementOptions, setAiStatementOptions] = React.useState(null);
  const [aiLoading, setAiLoading] = React.useState(false);

  React.useEffect(() => {
    // When accordion is available, flatten expanded phrases for hawk score calculation
    if (useAccordion) {
      const flat = flattenExpandedPhrases(expandedPhrases);
      if (onStatementPhrasesChange) onStatementPhrasesChange(flat);
      return;
    }

    const meeting = gameState?.meetingNumber;
    if (!meeting) return;

    // Check cache first
    if (statementOptionsCache[meeting]) {
      const transformed = transformAiOptions(statementOptionsCache[meeting]);
      setAiStatementOptions(transformed);
      if (onStatementPhrasesChange) onStatementPhrasesChange(transformed);
      return;
    }

    setAiLoading(true);
    setAiStatementOptions(null);

    generateStatementOptions(gameState, rateDecision)
      .then(options => {
        statementOptionsCache[meeting] = options;
        const transformed = transformAiOptions(options);
        setAiStatementOptions(transformed);
        if (onStatementPhrasesChange) onStatementPhrasesChange(transformed);
        setAiLoading(false);
      })
      .catch(() => {
        // Silent fallback — use static options
        setAiLoading(false);
      });
  }, [gameState?.meetingNumber]);

  const activePhrases = aiStatementOptions || statementPhrases;
  const showLoadingIndicator = !useAccordion && aiLoading && !aiStatementOptions;

  // Dot plot responsive measurement — render SVG at native pixel size for crisp lines
  const dotPlotContainerRef = React.useRef(null);
  const [dotPlotWidth, setDotPlotWidth] = React.useState(0);
  React.useEffect(() => {
    const el = dotPlotContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      setDotPlotWidth(Math.floor(entries[0].contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <main style={{ padding: '16px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Meeting Context */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        padding: '12px 16px',
        background: 'rgba(17, 24, 39, 0.6)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        borderRadius: '8px'
      }}>
        <div>
          <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '1px' }}>Meeting</div>
          <div style={{ fontSize: 'var(--text-lg)', color: '#60a5fa', fontFamily: '"IBM Plex Mono", monospace' }}>
            {meetingNumber} of {totalMeetings}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '1px' }}>Market Expects</div>
          <div style={{
            fontSize: 'var(--text-lg)',
            fontFamily: '"IBM Plex Mono", monospace',
            color: marketExpects > 0 ? '#ef4444' : marketExpects < 0 ? '#22c55e' : '#60a5fa'
          }}>
            {marketExpects === 0 ? 'HOLD' : `${marketExpects > 0 ? '+' : ''}${marketExpects}bp`}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginBottom: '2px', letterSpacing: '1px' }}><LearnTerm term="Credibility" learnMode={learnMode}>Credibility</LearnTerm></div>
          <div style={{ fontSize: 'var(--text-lg)', fontFamily: '"IBM Plex Mono", monospace', color: getCredibilityColor(credibility) }}>
            {credibility}/100
          </div>
        </div>
      </div>

      <div style={panelStyle}>
        <div style={{
          padding: '16px',
          borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
          background: 'rgba(30, 58, 138, 0.2)'
        }}>
          <div style={{ fontSize: 'var(--text-base)', letterSpacing: '2px', color: '#9ca3af', marginBottom: '4px', fontWeight: '600' }}>
            FOMC DECISION
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5' }}>
            Set the target rate and craft your statement
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          {/* Current Rate */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: 'var(--text-sm)', color: '#8b95a5', marginBottom: '8px', letterSpacing: '1.5px' }}>
              <LearnTerm term="Federal Funds Rate" learnMode={learnMode}>CURRENT RATE</LearnTerm>
            </div>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 'clamp(28px, 7vw, 42px)',
              color: '#60a5fa'
            }}>
              {economicData.fedFundsRate.target}
            </div>
          </div>

          {/* Rate Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              fontSize: 'var(--text-sm)',
              color: '#9ca3af',
              marginBottom: '10px',
              letterSpacing: '1.5px',
              textAlign: 'center'
            }}>
              YOUR DECISION
            </div>
            <div className="rate-btn-grid">
              {[-50, -25, 0, 25, 50].map(bps => (
                <button
                  key={bps}
                  onClick={() => onDecision(bps)}
                  disabled={decisionPublished}
                  style={{
                    padding: '16px 8px',
                    fontSize: 'var(--text-base)',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontWeight: '500',
                    background: rateDecision === bps ? `${getDecisionColor(bps)}30` : 'rgba(17, 24, 39, 0.6)',
                    border: rateDecision === bps ? `2px solid ${getDecisionColor(bps)}` : '2px solid rgba(75, 85, 99, 0.3)',
                    color: rateDecision === bps ? getDecisionColor(bps) : '#9ca3af',
                    borderRadius: '8px',
                    cursor: decisionPublished ? 'not-allowed' : 'pointer',
                    opacity: decisionPublished ? 0.5 : 1,
                    minHeight: 'auto'
                  }}
                >
                  {getDecisionLabel(bps)}
                </button>
              ))}
            </div>
          </div>

          {/* Surprise Indicator */}
          {rateDecision !== marketExpects && (
            <div style={{
              textAlign: 'center',
              padding: '10px',
              marginBottom: '16px',
              background: Math.abs(rateDecision - marketExpects) > 25
                ? 'rgba(239, 68, 68, 0.1)'
                : 'rgba(234, 179, 8, 0.1)',
              border: `1px solid ${Math.abs(rateDecision - marketExpects) > 25
                ? 'rgba(239, 68, 68, 0.3)'
                : 'rgba(234, 179, 8, 0.3)'}`,
              borderRadius: '6px',
              fontSize: 'var(--text-sm)'
            }}>
              <span style={{
                color: Math.abs(rateDecision - marketExpects) > 25 ? '#ef4444' : '#eab308'
              }}>
                ⚠️ {Math.abs(rateDecision - marketExpects) > 25 ? 'Major' : 'Mild'} surprise vs market expectations
              </span>
            </div>
          )}

          {/* New Rate Preview */}
          {rateDecision !== 0 && (
            <div style={{
              textAlign: 'center',
              padding: '14px',
              background: 'rgba(17, 24, 39, 0.5)',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginBottom: '6px', letterSpacing: '1px' }}>NEW RATE</div>
              <div style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 'clamp(20px, 3vw, 28px)',
                color: getDecisionColor(rateDecision)
              }}>
                {formatRate(currentRate + rateDecision / 100)}
              </div>
            </div>
          )}

          {/* Statement Builder */}
          {!decisionPublished && (
            <div style={{ marginTop: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                <div style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', fontWeight: '600' }}>
                  BUILD STATEMENT
                </div>
                <div style={{
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: '500',
                  background: `${hawkLabel.color}20`,
                  color: hawkLabel.color,
                  border: `1px solid ${hawkLabel.color}40`
                }}>
                  {hawkLabel.label}
                </div>
              </div>

              {/* Loading indicator (non-accordion fallback) */}
              {showLoadingIndicator && (
                <div className="statement-loading" style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: '#8b95a5',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: 'var(--text-sm)'
                }}>
                  Drafting statement options...
                </div>
              )}

              {/* Accordion Statement Builder */}
              {useAccordion && expandedPhrases && Object.entries(expandedPhrases).map(([catKey, category]) => {
                const isCatOpen = openCategories[catKey];
                const scores = EXPANDED_STANCE_SCORES[catKey] || { hawkish: 1, neutral: 0, dovish: -1 };
                // Check if this category has a selected phrase
                const categoryPhraseIds = category.subcategories.flatMap(sub => sub.phrases.map(p => p.id));
                const hasSelection = categoryPhraseIds.some(id => selectedStatements.includes(id));
                return (
                  <div key={catKey} style={{ marginBottom: '8px' }}>
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(catKey)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 16px',
                        background: hasSelection ? 'rgba(59, 130, 246, 0.1)' : 'rgba(17, 24, 39, 0.6)',
                        border: hasSelection ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(75, 85, 99, 0.3)',
                        borderRadius: isCatOpen ? '8px 8px 0 0' : '8px',
                        cursor: 'pointer',
                        minHeight: '48px'
                      }}
                    >
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        color: hasSelection ? '#93c5fd' : '#9ca3af',
                        letterSpacing: '1.5px',
                        fontWeight: '600',
                        fontFamily: '"IBM Plex Mono", monospace'
                      }}>
                        {category.label}
                      </span>
                      <span style={{ color: '#6B7280', fontSize: '12px' }}>
                        {isCatOpen ? '\u25BC' : '\u25B6'}
                      </span>
                    </button>

                    {/* Subcategories */}
                    {isCatOpen && category.subcategories.map(sub => {
                      const isSubOpen = openSubcategories[sub.id];
                      const badge = SUBCATEGORY_STANCE_BADGE[sub.stance];
                      const subHasSelection = sub.phrases.some(p => selectedStatements.includes(p.id));
                      return (
                        <div key={sub.id}>
                          {/* Subcategory Header */}
                          <button
                            onClick={() => toggleSubcategory(sub.id)}
                            style={{
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '12px 16px 12px 32px',
                              background: subHasSelection ? 'rgba(59, 130, 246, 0.08)' : 'rgba(17, 24, 39, 0.4)',
                              border: '1px solid rgba(75, 85, 99, 0.2)',
                              borderTop: 'none',
                              cursor: 'pointer',
                              minHeight: '44px'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{
                                fontSize: 'var(--text-xs)',
                                color: subHasSelection ? '#93c5fd' : '#8b95a5',
                                letterSpacing: '1px',
                                fontWeight: '500',
                                fontFamily: '"IBM Plex Mono", monospace'
                              }}>
                                {sub.label}
                              </span>
                              {badge && (
                                <span style={{
                                  color: badge.color,
                                  border: badge.border,
                                  padding: badge.padding,
                                  fontSize: badge.fontSize,
                                  borderRadius: badge.borderRadius,
                                  fontFamily: badge.fontFamily,
                                  whiteSpace: 'nowrap'
                                }}>
                                  {badge.label}
                                </span>
                              )}
                            </div>
                            <span style={{ color: '#6B7280', fontSize: '10px' }}>
                              {isSubOpen ? '\u25BC' : '\u25B6'}
                            </span>
                          </button>

                          {/* Phrase List */}
                          {isSubOpen && (
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '4px',
                              padding: '8px 16px 8px 48px',
                              background: 'rgba(17, 24, 39, 0.3)',
                              borderLeft: '1px solid rgba(75, 85, 99, 0.2)',
                              borderRight: '1px solid rgba(75, 85, 99, 0.2)'
                            }}>
                              {sub.phrases.map(phrase => {
                                const isSelected = selectedStatements.includes(phrase.id);
                                return (
                                  <button
                                    key={phrase.id}
                                    onClick={() => toggleStatement(phrase.id)}
                                    style={{
                                      padding: '12px',
                                      fontSize: 'var(--text-base)',
                                      fontFamily: 'var(--font-prose)',
                                      textAlign: 'left',
                                      background: isSelected
                                        ? 'rgba(59, 130, 246, 0.15)'
                                        : 'rgba(17, 24, 39, 0.4)',
                                      border: isSelected
                                        ? '1px solid rgba(59, 130, 246, 0.4)'
                                        : '1px solid rgba(75, 85, 99, 0.15)',
                                      color: isSelected ? '#e5e7eb' : '#9ca3af',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      lineHeight: 'var(--leading-normal)',
                                      minHeight: '48px',
                                      width: '100%'
                                    }}
                                  >
                                    {phrase.text}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Bottom border for open category */}
                    {isCatOpen && (
                      <div style={{
                        height: '1px',
                        background: 'rgba(75, 85, 99, 0.3)',
                        borderRadius: '0 0 8px 8px'
                      }} />
                    )}
                  </div>
                );
              })}

              {/* Flat list fallback (AI options or old static phrases) */}
              {!useAccordion && !showLoadingIndicator && activePhrases && Object.entries(activePhrases).map(([category, phrases]) => (
                <div key={category} style={{ marginBottom: '14px' }}>
                  <div className="statement-category-label" style={{
                    fontSize: 'var(--text-sm)',
                    color: '#8b95a5',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    {CATEGORY_LABELS[category] || category}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {phrases.map(phrase => {
                      const badge = phrase.stance ? STANCE_BADGE[phrase.stance] : null;
                      return (
                        <button
                          key={phrase.id}
                          onClick={() => toggleStatement(phrase.id)}
                          style={{
                            padding: '12px',
                            fontSize: 'var(--text-base)',
                            fontFamily: 'var(--font-prose)',
                            textAlign: 'left',
                            background: selectedStatements.includes(phrase.id)
                              ? 'rgba(59, 130, 246, 0.15)'
                              : 'rgba(17, 24, 39, 0.4)',
                            border: selectedStatements.includes(phrase.id)
                              ? '1px solid rgba(59, 130, 246, 0.4)'
                              : '1px solid rgba(75, 85, 99, 0.2)',
                            color: selectedStatements.includes(phrase.id) ? '#e5e7eb' : '#9ca3af',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            lineHeight: 'var(--leading-normal)',
                            minHeight: '48px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            gap: '8px'
                          }}
                        >
                          <span>{phrase.text}</span>
                          {badge && (
                            <span style={{
                              flexShrink: 0,
                              fontSize: 'var(--text-xs)',
                              padding: '2px 6px',
                              borderRadius: '3px',
                              background: badge.bg,
                              color: badge.color,
                              border: `1px solid ${badge.border}`,
                              whiteSpace: 'nowrap',
                              lineHeight: '1.4'
                            }}>
                              {badge.label}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Forward Guidance Dot Plot (Phase 4) */}
          {!decisionPublished && meetingNumber < totalMeetings && (() => {
            const remainingMeetings = [];
            for (let m = meetingNumber + 1; m <= totalMeetings; m++) remainingMeetings.push(m);
            if (remainingMeetings.length === 0) return null;

            const committeeDots = gameState?.committeeDots || {};
            const monthAbbrs = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            const schedule = gameState?.meetingSchedule || [];

            const chartWidth = dotPlotWidth;
            const chartHeight = 220;
            const leftMargin = 50;
            const rightMargin = 10;
            const topMargin = 15;
            const bottomMargin = 35;
            const plotWidth = chartWidth - leftMargin - rightMargin;
            const plotHeight = chartHeight - topMargin - bottomMargin;

            const rateMin = currentRate - 1.0;
            const rateMax = currentRate + 1.0;
            const rateToY = (rate) => topMargin + plotHeight * (rateMax - rate) / (rateMax - rateMin);

            const N = remainingMeetings.length;
            const columnWidth = plotWidth / N;
            const meetingToX = (idx) => leftMargin + (idx + 0.5) * columnWidth;

            // Grid lines at 25bp intervals
            const gridRates = [];
            for (let r = Math.ceil(rateMin / 0.25) * 0.25; r <= rateMax + 0.001; r += 0.25) {
              gridRates.push(Math.round(r * 1000) / 1000);
            }

            // Y-axis labels at 50bp intervals
            const labelRates = [];
            for (let r = Math.ceil(rateMin / 0.5) * 0.5; r <= rateMax + 0.001; r += 0.5) {
              labelRates.push(Math.round(r * 1000) / 1000);
            }

            // Committee medians
            const medians = remainingMeetings.map(m => {
              const dots = committeeDots[m] || [];
              if (dots.length === 0) return null;
              const sorted = [...dots].sort((a, b) => a - b);
              return sorted[Math.floor(sorted.length / 2)];
            });
            const validMedians = medians
              .map((m, i) => m !== null ? [meetingToX(i), rateToY(m)] : null)
              .filter(Boolean);

            // Player dots sorted by meeting
            const playerDotEntries = Object.entries(dotSelections || {})
              .map(([m, r]) => [parseInt(m), r])
              .filter(([m]) => remainingMeetings.includes(m))
              .sort((a, b) => a[0] - b[0]);

            const handleChartClick = (event) => {
              if (!setDotSelections) return;
              const svg = event.currentTarget;
              const rect = svg.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;

              if (x < leftMargin || x > chartWidth - rightMargin) return;
              if (y < topMargin || y > chartHeight - bottomMargin) return;

              const colIndex = Math.floor((x - leftMargin) / columnWidth);
              if (colIndex < 0 || colIndex >= N) return;

              const meetingNum = remainingMeetings[colIndex];
              const rate = rateMax - (y - topMargin) / plotHeight * (rateMax - rateMin);
              const snapped = Math.round(rate / 0.25) * 0.25;
              if (snapped < rateMin || snapped > rateMax) return;

              if (dotSelections && dotSelections[meetingNum] !== undefined &&
                  Math.abs(dotSelections[meetingNum] - snapped) < 0.01) {
                setDotSelections(prev => {
                  const next = { ...prev };
                  delete next[meetingNum];
                  return next;
                });
              } else {
                setDotSelections(prev => ({ ...prev, [meetingNum]: snapped }));
              }
            };

            return (
              <div style={{ marginTop: '24px' }}>
                <div style={{ fontSize: 'var(--text-sm)', color: '#9ca3af', letterSpacing: '1.5px', marginBottom: '10px', textAlign: 'center', fontWeight: '600' }}>
                  <LearnTerm term="Dot Plot" learnMode={learnMode}>FORWARD GUIDANCE DOT PLOT</LearnTerm>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '10px', fontSize: 'var(--text-xs)', color: '#9ca3af', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '10px', height: '10px', background: '#60a5fa', borderRadius: '50%' }} />
                    Your projection
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'rgba(156, 163, 175, 0.4)', borderRadius: '50%' }} />
                    Committee
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '14px', height: '2px', background: 'rgba(156, 163, 175, 0.6)' }} />
                    Median
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '14px', height: '0', borderTop: '2px dashed #60a5fa' }} />
                    Current rate
                  </div>
                </div>

                {/* SVG Chart */}
                <div ref={dotPlotContainerRef} style={{
                  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '8px',
                  padding: '8px',
                  cursor: 'crosshair',
                  minHeight: chartHeight + 16 + 'px'
                }}>
                  {chartWidth > 0 && <svg
                    width={chartWidth}
                    height={chartHeight}
                    style={{ display: 'block' }}
                    onClick={handleChartClick}
                  >
                    {/* Grid lines */}
                    {gridRates.map(r => (
                      <line
                        key={r}
                        x1={leftMargin} y1={Math.round(rateToY(r)) + 0.5}
                        x2={chartWidth - rightMargin} y2={Math.round(rateToY(r)) + 0.5}
                        stroke="rgba(75, 85, 99, 0.2)" strokeWidth="1"
                        shapeRendering="crispEdges"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {labelRates.map(r => (
                      <text
                        key={'yl-' + r}
                        x={leftMargin - 6} y={rateToY(r) + 4}
                        fill="#8b95a5" fontSize="12"
                        fontFamily="'IBM Plex Mono', monospace"
                        textAnchor="end"
                      >
                        {r.toFixed(2)}%
                      </text>
                    ))}

                    {/* X-axis labels */}
                    {remainingMeetings.map((m, i) => {
                      const meeting = schedule[m - 1];
                      const month = meeting ? monthAbbrs[parseInt(meeting.date.split('-')[1]) - 1] : '';
                      return (
                        <g key={'x-' + m}>
                          <text
                            x={meetingToX(i)} y={chartHeight - bottomMargin + 16}
                            fill="#9ca3af" fontSize="13"
                            fontFamily="'IBM Plex Mono', monospace"
                            textAnchor="middle"
                          >
                            M{m}
                          </text>
                          <text
                            x={meetingToX(i)} y={chartHeight - bottomMargin + 28}
                            fill="#8b95a5" fontSize="11" textAnchor="middle"
                          >
                            {month}
                          </text>
                        </g>
                      );
                    })}

                    {/* Current rate dashed line */}
                    <line
                      x1={leftMargin} y1={Math.round(rateToY(currentRate)) + 0.5}
                      x2={chartWidth - rightMargin} y2={Math.round(rateToY(currentRate)) + 0.5}
                      stroke="#60a5fa" strokeWidth="1"
                      strokeDasharray="6,4" opacity="0.5"
                      shapeRendering="crispEdges"
                    />

                    {/* Committee median line */}
                    {validMedians.length > 1 && (
                      <polyline
                        points={validMedians.map(([x, y]) => `${x},${y}`).join(' ')}
                        fill="none" stroke="rgba(156, 163, 175, 0.6)" strokeWidth="1.5"
                      />
                    )}

                    {/* Committee dots */}
                    {remainingMeetings.flatMap((m, i) => {
                      const dots = committeeDots[m] || [];
                      return dots.map((rate, j) => {
                        const jitter = (j / 12 - 0.5) * columnWidth * 0.4;
                        return (
                          <circle
                            key={`cd-${m}-${j}`}
                            cx={meetingToX(i) + jitter}
                            cy={rateToY(rate)}
                            r="3" fill="rgba(156, 163, 175, 0.4)"
                          />
                        );
                      });
                    })}

                    {/* Player dot connecting line */}
                    {playerDotEntries.length > 1 && (
                      <polyline
                        points={playerDotEntries.map(([m, r]) => {
                          const idx = remainingMeetings.indexOf(m);
                          return `${meetingToX(idx)},${rateToY(r)}`;
                        }).join(' ')}
                        fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.7"
                      />
                    )}

                    {/* Player dots */}
                    {playerDotEntries.map(([m, r]) => {
                      const idx = remainingMeetings.indexOf(m);
                      return (
                        <circle
                          key={`pd-${m}`}
                          cx={meetingToX(idx)} cy={rateToY(r)}
                          r="6" fill="#60a5fa"
                          stroke="rgba(96, 165, 250, 0.3)" strokeWidth="3"
                        />
                      );
                    })}
                  </svg>}
                </div>

                {/* Instruction */}
                <div style={{ fontSize: 'var(--text-xs)', color: '#8b95a5', marginTop: '10px', textAlign: 'center', lineHeight: '1.5' }}>
                  Project your rate path for upcoming meetings. Markets will price your projections as guidance. You may leave meetings blank to preserve flexibility.
                </div>
              </div>
            );
          })()}

          {/* Publish Button */}
          {!decisionPublished && (
            <div style={{ marginTop: '24px' }}>
              <button
                onClick={onPublish}
                style={{
                  width: '100%',
                  padding: '18px',
                  fontSize: 'var(--text-base)',
                  fontWeight: '500',
                  letterSpacing: '1.5px',
                  background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  minHeight: 'auto'
                }}
              >
                📢 PUBLISH DECISION
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Pending Effects Reminder */}
      {gameState?.pendingEffects?.length > 0 && (
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '8px',
          fontSize: 'var(--text-base)',
          fontFamily: 'var(--font-prose)',
          color: '#60a5fa'
        }}>
          💡 Remember: Your past decisions are still working through the economy. Rate changes take 2-3 meetings to fully impact inflation and growth.
        </div>
      )}
    </main>
  );
};
