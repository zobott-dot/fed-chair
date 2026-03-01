// Main App Component - State management and view routing
// Now with multi-round simulation support

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const { useState, useEffect, useCallback } = React;
const { LoadingScreen, Header, MeetingBanner, Footer, Dashboard, Briefing, DecisionPanel, Aftermath } = window.FedChair.Components;
const { calculateMarketReaction } = window.FedChair.Engine;
const { calculateScore, calculateHawkScore, getHawkLabel } = window.FedChair.Engine;
const { createGameState, advanceToNextMeeting, gameStateToEconomicData, generateBriefing, generateCommitteeDots } = window.FedChair.Engine;

window.FedChair.Components.App = function() {
  // Game state (persistent across rounds)
  const [gameState, setGameState] = useState(null);
  const [briefingData, setBriefingData] = useState(null);

  // Static data
  const [statementPhrases, setStatementPhrases] = useState(null);
  const [boardOfGovernors, setBoardOfGovernors] = useState([]);
  const [regionalPresidents, setRegionalPresidents] = useState([]);

  // UI state
  const [activeView, setActiveView] = useState('dashboard');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Current meeting decision state
  const [rateDecision, setRateDecision] = useState(0);
  const [selectedStatements, setSelectedStatements] = useState([]);
  const [decisionPublished, setDecisionPublished] = useState(false);
  const [showReaction, setShowReaction] = useState(false);
  const [marketReaction, setMarketReaction] = useState(null);
  const [aftermathPhase, setAftermathPhase] = useState(0);
  const [score, setScore] = useState(null);
  const [dotSelections, setDotSelections] = useState({});

  // Load data and initialize game on mount
  useEffect(() => {
    const loadData = async () => {
      const API = window.FedChair.Data.API;
      const data = await API.getAllGameData();

      // Initialize game state from starting data
      const initialGameState = createGameState(data.economicData);
      generateCommitteeDots(initialGameState);
      setGameState(initialGameState);
      setBriefingData(generateBriefing(initialGameState));

      setStatementPhrases(data.statementPhrases);
      setBoardOfGovernors(data.boardOfGovernors);
      setRegionalPresidents(data.regionalPresidents);

      // Simulate loading delay for UX
      setTimeout(() => setDataLoaded(true), 1800);
    };

    loadData();
  }, []);

  // Aftermath phase progression
  useEffect(() => {
    if (showReaction && aftermathPhase < 5) {
      const timer = setTimeout(() => setAftermathPhase(p => p + 1), 500);
      return () => clearTimeout(timer);
    }
  }, [showReaction, aftermathPhase]);

  // Derive economic data from game state for components
  const economicData = gameState ? gameStateToEconomicData(gameState) : null;
  const currentRate = gameState?.currentRate || 3.625;
  const newsHeadlines = gameState?.recentHeadlines?.length > 0
    ? gameState.recentHeadlines
    : window.FedChair.Data.newsHeadlines || [];

  // Calculate hawk score from selected statements
  const hawkScore = statementPhrases
    ? calculateHawkScore(selectedStatements, statementPhrases)
    : 0;
  const hawkLabel = getHawkLabel(hawkScore);

  // Handle market reaction calculation
  const computeMarketReaction = useCallback(() => {
    if (!economicData || !gameState) return null;

    // Credibility affects market sensitivity
    const credibilityFactor = gameState.credibility / 100;

    return calculateMarketReaction({
      rateDecision,
      marketExpects: gameState.marketExpects || 0,
      hawkScore,
      markets: economicData.markets,
      gdp: economicData.gdp,
      unemployment: economicData.unemployment,
      inflationForecast: economicData.inflationForecast,
      gameMode: 'full',
      statementCount: selectedStatements.length,
      credibility: gameState.credibility,
      dotProjections: gameState.dotProjections,
      meetingNumber: gameState.meetingNumber,
      currentRate: gameState.currentRate
    });
  }, [rateDecision, economicData, gameState, hawkScore, selectedStatements.length]);

  // Handle publish decision
  const handlePublish = () => {
    // Store dot projections in gameState (Phase 4)
    const newDots = Object.entries(dotSelections).map(([meeting, rate]) => ({
      meeting: parseInt(meeting),
      placedAtMeeting: gameState.meetingNumber,
      projectedRate: rate
    }));
    if (newDots.length > 0) {
      gameState.dotProjections = [...(gameState.dotProjections || []), ...newDots];
      gameState.dotHistory = [...(gameState.dotHistory || []), ...newDots];
    }

    setDecisionPublished(true);
    const reaction = computeMarketReaction();
    setMarketReaction(reaction);

    const meetingScore = calculateScore({ reaction, rateDecision, hawkScore });
    setScore(meetingScore);

    setTimeout(() => {
      setShowReaction(true);
      setActiveView('aftermath');
    }, 400);
  };

  // Handle advancing to next meeting
  const handleAdvanceToNextMeeting = () => {
    if (!gameState || !marketReaction || !score) return;

    setTransitioning(true);

    // Advance the simulation (pass selectedStatements for guidance tracking)
    const result = advanceToNextMeeting(
      gameState,
      rateDecision,
      hawkScore,
      marketReaction,
      score.overall.score,
      selectedStatements
    );

    // Update game state
    setGameState({ ...result.gameState });
    setBriefingData(generateBriefing(result.gameState));

    // Reset meeting-specific state
    setRateDecision(0);
    setSelectedStatements([]);
    setDecisionPublished(false);
    setShowReaction(false);
    setMarketReaction(null);
    setAftermathPhase(0);
    setScore(null);
    setDotSelections({});

    // Brief transition animation
    setTimeout(() => {
      setTransitioning(false);
      if (result.ended) {
        setActiveView('aftermath');
        setShowReaction(true);
      } else {
        setActiveView('dashboard');
      }
    }, 800);
  };

  // Start new game
  const handleNewGame = async () => {
    const API = window.FedChair.Data.API;
    const data = await API.getAllGameData();
    const newGameState = createGameState(data.economicData);
    generateCommitteeDots(newGameState);
    setGameState(newGameState);
    setBriefingData(generateBriefing(newGameState));

    // Reset all state
    setRateDecision(0);
    setSelectedStatements([]);
    setDecisionPublished(false);
    setShowReaction(false);
    setMarketReaction(null);
    setAftermathPhase(0);
    setScore(null);
    setDotSelections({});
    setActiveView('dashboard');
  };

  // Show loading screen until data is ready
  if (!dataLoaded || !gameState) {
    return <LoadingScreen />;
  }

  // Show transition screen
  if (transitioning) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0f1a 0%, #0d1117 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#e5e7eb'
      }}>
        <div style={{ fontSize: '14px', color: '#60a5fa', letterSpacing: '2px', marginBottom: '20px' }}>
          ADVANCING TO NEXT MEETING
        </div>
        <div style={{ fontSize: '24px', color: '#9ca3af' }}>
          {gameState.meetingDisplayDate}
        </div>
        <div style={{
          marginTop: '30px',
          width: '200px',
          height: '2px',
          background: '#1f2937',
          borderRadius: '1px',
          overflow: 'hidden'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            animation: 'loadingBar 0.8s ease-in-out forwards'
          }} />
        </div>
      </div>
    );
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
        meetingNumber={gameState.meetingNumber}
        totalMeetings={gameState.totalMeetings}
        gameEnded={gameState.gamePhase === 'ended'}
        onNewGame={handleNewGame}
      />

      <MeetingBanner
        nextMeeting={economicData.nextMeeting}
        meetingNumber={gameState.meetingNumber}
        totalMeetings={gameState.totalMeetings}
        marketExpects={gameState.marketExpects}
        credibility={gameState.credibility}
      />

      {activeView === 'aftermath' && showReaction && (
        <Aftermath
          marketReaction={marketReaction}
          score={score}
          rateDecision={rateDecision}
          currentRate={currentRate}
          selectedStatements={selectedStatements}
          hawkLabel={hawkLabel}
          aftermathPhase={aftermathPhase}
          economicData={economicData}
          gameState={gameState}
          onAdvance={handleAdvanceToNextMeeting}
          onNewGame={handleNewGame}
        />
      )}

      {activeView === 'briefing' && briefingData && (
        <Briefing
          briefingData={briefingData}
          gameState={gameState}
          setActiveView={setActiveView}
        />
      )}

      {activeView === 'decision' && (
        <DecisionPanel
          economicData={economicData}
          statementPhrases={statementPhrases}
          currentRate={currentRate}
          gameMode="full"
          setGameMode={() => {}}
          rateDecision={rateDecision}
          setRateDecision={setRateDecision}
          selectedStatements={selectedStatements}
          setSelectedStatements={setSelectedStatements}
          decisionPublished={decisionPublished}
          hawkLabel={hawkLabel}
          onDecision={(bps) => setRateDecision(bps)}
          onPublish={handlePublish}
          onReset={() => {}}
          gameState={gameState}
          dotSelections={dotSelections}
          setDotSelections={setDotSelections}
        />
      )}

      {activeView === 'dashboard' && (
        <Dashboard
          economicData={economicData}
          boardOfGovernors={boardOfGovernors}
          regionalPresidents={regionalPresidents}
          newsHeadlines={newsHeadlines}
          setActiveView={setActiveView}
          gameState={gameState}
        />
      )}

      <Footer />
    </div>
  );
};
