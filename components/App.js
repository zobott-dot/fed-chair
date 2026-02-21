// Main App Component - State management and view routing

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const { useState, useEffect, useCallback } = React;
const { LoadingScreen, Header, MeetingBanner, Footer, Dashboard, DecisionPanel, Aftermath } = window.FedChair.Components;
const { calculateMarketReaction } = window.FedChair.Engine;
const { calculateScore, calculateHawkScore, getHawkLabel } = window.FedChair.Engine;

window.FedChair.Components.App = function() {
  // Data state
  const [economicData, setEconomicData] = useState(null);
  const [statementPhrases, setStatementPhrases] = useState(null);
  const [boardOfGovernors, setBoardOfGovernors] = useState([]);
  const [regionalPresidents, setRegionalPresidents] = useState([]);
  const [newsHeadlines, setNewsHeadlines] = useState([]);

  // UI state
  const [activeView, setActiveView] = useState('dashboard');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Game state
  const [gameMode, setGameMode] = useState('full');
  const [currentRate, setCurrentRate] = useState(3.625);
  const [rateDecision, setRateDecision] = useState(0);
  const [selectedStatements, setSelectedStatements] = useState([]);
  const [decisionPublished, setDecisionPublished] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [marketReaction, setMarketReaction] = useState(null);
  const [aftermathPhase, setAftermathPhase] = useState(0);
  const [score, setScore] = useState(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      const API = window.FedChair.Data.API;
      const data = await API.getAllGameData();

      setEconomicData(data.economicData);
      setStatementPhrases(data.statementPhrases);
      setBoardOfGovernors(data.boardOfGovernors);
      setRegionalPresidents(data.regionalPresidents);
      setNewsHeadlines(data.newsHeadlines);
      setCurrentRate(data.economicData.currentRate);

      // Simulate loading delay for UX
      setTimeout(() => setDataLoaded(true), 1800);
    };

    loadData();

    const clock = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clock);
  }, []);

  // Aftermath phase progression
  useEffect(() => {
    if (showReaction && aftermathPhase < 5) {
      const timer = setTimeout(() => setAftermathPhase(p => p + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [showReaction, aftermathPhase]);

  // Calculate hawk score from selected statements
  const hawkScore = statementPhrases
    ? calculateHawkScore(selectedStatements, statementPhrases)
    : 0;
  const hawkLabel = getHawkLabel(hawkScore);

  // Handle market reaction calculation
  const computeMarketReaction = useCallback(() => {
    if (!economicData) return null;

    return calculateMarketReaction({
      rateDecision,
      marketExpects: economicData.marketExpects,
      hawkScore,
      markets: economicData.markets,
      gdp: economicData.gdp,
      unemployment: economicData.unemployment,
      inflationForecast: economicData.inflationForecast,
      gameMode,
      statementCount: selectedStatements.length
    });
  }, [rateDecision, economicData, hawkScore, gameMode, selectedStatements.length]);

  // Handle rate decision (quick mode triggers immediate reaction)
  const handleDecision = (bps) => {
    setRateDecision(bps);

    if (gameMode === 'quick') {
      const reaction = calculateMarketReaction({
        rateDecision: bps,
        marketExpects: economicData.marketExpects,
        hawkScore: 0,
        markets: economicData.markets,
        gdp: economicData.gdp,
        unemployment: economicData.unemployment,
        inflationForecast: economicData.inflationForecast,
        gameMode: 'quick',
        statementCount: 0
      });
      setMarketReaction(reaction);
      setScore(calculateScore({ reaction, rateDecision: bps, hawkScore: 0 }));
      setShowReaction(true);
      setActiveView('aftermath');
    }
  };

  // Handle publish (full mode)
  const handlePublish = () => {
    setDecisionPublished(true);
    const reaction = computeMarketReaction();
    setMarketReaction(reaction);
    setScore(calculateScore({ reaction, rateDecision, hawkScore }));

    setTimeout(() => {
      setShowReaction(true);
      setActiveView('aftermath');
    }, 400);
  };

  // Reset game state
  const handleReset = () => {
    setRateDecision(0);
    setSelectedStatements([]);
    setDecisionPublished(false);
    setShowReaction(false);
    setMarketReaction(null);
    setAftermathPhase(0);
    setScore(null);
    setActiveView('decision');
  };

  // Show loading screen until data is ready
  if (!dataLoaded || !economicData) {
    return <LoadingScreen />;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0f1a 0%, #0d1117 100%)',
      color: '#e5e7eb'
    }}>
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        showReaction={showReaction}
        nextMeeting={economicData.nextMeeting}
      />

      <MeetingBanner nextMeeting={economicData.nextMeeting} />

      {activeView === 'aftermath' && showReaction && marketReaction && score && (
        <Aftermath
          marketReaction={marketReaction}
          score={score}
          rateDecision={rateDecision}
          currentRate={currentRate}
          selectedStatements={selectedStatements}
          hawkLabel={hawkLabel}
          aftermathPhase={aftermathPhase}
          economicData={economicData}
          onReset={handleReset}
        />
      )}

      {activeView === 'decision' && (
        <DecisionPanel
          economicData={economicData}
          statementPhrases={statementPhrases}
          currentRate={currentRate}
          gameMode={gameMode}
          setGameMode={setGameMode}
          rateDecision={rateDecision}
          setRateDecision={setRateDecision}
          selectedStatements={selectedStatements}
          setSelectedStatements={setSelectedStatements}
          decisionPublished={decisionPublished}
          hawkLabel={hawkLabel}
          onDecision={handleDecision}
          onPublish={handlePublish}
          onReset={handleReset}
        />
      )}

      {activeView === 'dashboard' && (
        <Dashboard
          economicData={economicData}
          boardOfGovernors={boardOfGovernors}
          regionalPresidents={regionalPresidents}
          newsHeadlines={newsHeadlines}
          setActiveView={setActiveView}
        />
      )}

      <Footer />
    </div>
  );
};
