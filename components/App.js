// Main App Component - State management and view routing
// Now with multi-round simulation support

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const { useState, useEffect, useCallback } = React;
const { LoadingScreen, ModeSelect, Header, MeetingBanner, Footer, Dashboard, Briefing, DecisionPanel, PressConference, Aftermath, Transition, EndGame, LearnTerm } = window.FedChair.Components;
const { calculateMarketReaction } = window.FedChair.Engine;
const { calculateScore, calculateHawkScore, getHawkLabel } = window.FedChair.Engine;
const { createGameState, advanceToNextMeeting, gameStateToEconomicData, generateBriefing, generateCommitteeDots } = window.FedChair.Engine;
const { applyPressConferenceToMarketReaction, calculateEndOfCampaignAssessment } = window.FedChair.Engine;

window.FedChair.Components.App = function() {
  // Game state (persistent across rounds)
  const [gameState, setGameState] = useState(null);
  const [briefingData, setBriefingData] = useState(null);

  // Raw data (loaded before mode selection)
  const [rawData, setRawData] = useState(null);

  // Mode selection
  const [selectedMode, setSelectedMode] = useState(null);

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
  const [pressConferenceImpact, setPressConferenceImpact] = useState(null);
  const [shimmerKey, setShimmerKey] = useState(0);
  const [showTransition, setShowTransition] = useState(false);
  const [endGameAssessment, setEndGameAssessment] = useState(null);
  const [activeStatementPhrases, setActiveStatementPhrases] = useState(null);
  const [learnMode, setLearnMode] = useState(false);
  const [balanceSheetPosture, setBalanceSheetPosture] = useState('hold');
  const [balanceSheetPace, setBalanceSheetPace] = useState(60);

  // Load data on mount (do NOT create gameState yet — wait for mode selection)
  useEffect(() => {
    const loadData = async () => {
      const API = window.FedChair.Data.API;
      const data = await API.getAllGameData();

      setRawData(data);
      setStatementPhrases(data.statementPhrases);
      setBoardOfGovernors(data.boardOfGovernors);
      setRegionalPresidents(data.regionalPresidents);

      // Simulate loading delay for UX
      setTimeout(() => setDataLoaded(true), 1800);
    };

    loadData();
  }, []);

  // Initialize game when user picks a mode
  const initializeGame = useCallback((mode) => {
    if (!rawData) return;
    const gs = createGameState(rawData.economicData, mode);
    generateCommitteeDots(gs);
    setGameState(gs);
    setBriefingData(generateBriefing(gs));
    setSelectedMode(mode);
    setActiveView('dashboard');
  }, [rawData]);

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

  // Dynamic FOMC board: swap to Warsh-era after chair transition
  const activeBoardOfGovernors = gameState?.chairName === 'Warsh'
    ? (window.FedChair.Data.boardOfGovernorsWarshEra || boardOfGovernors)
    : boardOfGovernors;

  // Calculate hawk score from selected statements (use AI phrases when available)
  const effectivePhrases = activeStatementPhrases || statementPhrases;
  const hawkScore = effectivePhrases
    ? calculateHawkScore(selectedStatements, effectivePhrases)
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

    // Phase 7.7: Compute dot shift data for market interpretation
    const dotShiftData = (() => {
      const currentDots = (gameState.dotProjections || []).filter(d => d.placedAtMeeting === gameState.meetingNumber);
      const previousDots = (gameState.dotProjections || []).filter(d => d.placedAtMeeting === gameState.meetingNumber - 1);

      if (currentDots.length === 0) return null;

      // Calculate player's median projection shift
      const currentMedian = currentDots.length > 0
        ? currentDots.reduce((s, d) => s + d.projectedRate, 0) / currentDots.length
        : null;
      const previousMedian = previousDots.length > 0
        ? previousDots.reduce((s, d) => s + d.projectedRate, 0) / previousDots.length
        : null;

      const medianShift = (previousMedian !== null && currentMedian !== null)
        ? currentMedian - previousMedian
        : null;

      // Committee median shift
      const committeeDots = gameState.committeeDots || {};
      const prevCommitteeDots = gameState.previousCommitteeDots || {};

      function getMedian(arr) {
        if (!arr || arr.length === 0) return null;
        const sorted = [...arr].sort((a, b) => a - b);
        return sorted[Math.floor(sorted.length / 2)];
      }

      const nextMeeting = gameState.meetingNumber + 1;
      const currentCommitteeMedian = getMedian(committeeDots[nextMeeting]);
      const prevCommitteeMedian = getMedian(prevCommitteeDots[nextMeeting]);
      const committeeMedianShift = (currentCommitteeMedian !== null && prevCommitteeMedian !== null)
        ? currentCommitteeMedian - prevCommitteeMedian
        : null;

      // Dot-to-action gap: what did the player project for THIS meeting last time vs what they actually did
      const dotForThisMeeting = (gameState.dotProjections || []).find(
        d => d.meeting === gameState.meetingNumber && d.placedAtMeeting < gameState.meetingNumber
      );
      const actualRate = gameState.currentRate;
      const dotToActionGap = dotForThisMeeting
        ? actualRate - dotForThisMeeting.projectedRate
        : null;

      return {
        playerMedianShift: medianShift,
        committeeMedianShift,
        dotForThisMeeting: dotForThisMeeting ? dotForThisMeeting.projectedRate : null,
        actualRate,
        dotToActionGap,
        dotsPlaced: currentDots.length
      };
    })();
    gameState.lastDotShiftData = dotShiftData;

    // Store balance sheet decision in gameState (Phase 7.6)
    if (gameState.balanceSheet) {
      gameState.balanceSheet.currentPosture = balanceSheetPosture;
      gameState.balanceSheet.currentPace = balanceSheetPace;
    }

    setDecisionPublished(true);
    const reaction = computeMarketReaction();
    setMarketReaction(reaction);

    const meetingScore = calculateScore({ reaction, rateDecision, hawkScore });
    setScore(meetingScore);

    setTimeout(() => {
      setActiveView('pressConference');
    }, 400);
  };

  // Handle press conference completion
  const handlePressConferenceComplete = (impact) => {
    setPressConferenceImpact(impact);

    // Track asked question IDs for variety across meetings
    if (gameState) {
      const currentQuestionIds = (gameState.currentPressQuestionIds || []);
      gameState.askedQuestionIds = [
        ...(gameState.askedQuestionIds || []),
        ...currentQuestionIds
      ];
    }

    // Apply mood to market reaction
    const modifiedReaction = applyPressConferenceToMarketReaction(marketReaction, impact);
    setMarketReaction(modifiedReaction);

    // Recalculate score with modified reaction
    const meetingScore = calculateScore({ reaction: modifiedReaction, rateDecision, hawkScore });
    setScore(meetingScore);

    // Record press conference credibility in meeting history (Phase 7)
    if (gameState && gameState.meetingHistory && gameState.meetingHistory.length > 0) {
      const lastEntry = gameState.meetingHistory[gameState.meetingHistory.length - 1];
      lastEntry.pressCredibilityChange = impact.totalCredibilityChange;
    }

    // Transition to aftermath
    setShowReaction(true);
    setActiveView('aftermath');
  };

  // Handle advancing to next meeting
  const handleAdvanceToNextMeeting = () => {
    if (!gameState || !marketReaction || !score) return;

    setTransitioning(true);

    // Apply press conference credibility before advancing
    if (pressConferenceImpact) {
      gameState.credibility = Math.max(0, Math.min(100, gameState.credibility + pressConferenceImpact.totalCredibilityChange));
    }

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
    setActiveStatementPhrases(null);
    setDotSelections({});
    setPressConferenceImpact(null);
    setBalanceSheetPosture('hold');
    setBalanceSheetPace(60);

    // Brief transition animation
    setTimeout(() => {
      setTransitioning(false);
      if (result.ended) {
        // Calculate end-of-campaign assessment (Phase 7)
        if (calculateEndOfCampaignAssessment) {
          setEndGameAssessment(calculateEndOfCampaignAssessment(result.gameState));
        }
        setActiveView('endgame');
        setShowReaction(true);
      } else if (result.gameState.meetingNumber === 3 && result.gameState.chairName === 'Warsh') {
        // Show leadership transition interstitial (Phase 7)
        setShowTransition(true);
      } else {
        setActiveView('dashboard');
      }
    }, 800);
  };

  // Start new game — reset to mode selection
  const handleNewGame = async () => {
    // Re-fetch data in case it changed
    const API = window.FedChair.Data.API;
    const data = await API.getAllGameData();
    setRawData(data);

    // Reset to mode selection
    setSelectedMode(null);
    setGameState(null);
    setBriefingData(null);

    // Reset all meeting state
    setRateDecision(0);
    setSelectedStatements([]);
    setDecisionPublished(false);
    setShowReaction(false);
    setMarketReaction(null);
    setAftermathPhase(0);
    setScore(null);
    setDotSelections({});
    setPressConferenceImpact(null);
    setActiveView('dashboard');
    setShimmerKey(k => k + 1);
    setShowTransition(false);
    setEndGameAssessment(null);
    setActiveStatementPhrases(null);
    setBalanceSheetPosture('hold');
    setBalanceSheetPace(60);
  };

  // Show loading screen until data is ready
  if (!dataLoaded || !rawData) {
    return <LoadingScreen />;
  }

  // Show mode selection if no mode chosen yet
  if (!selectedMode || !gameState) {
    return <ModeSelect onSelectMode={initializeGame} />;
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

  // Show leadership transition interstitial (Phase 7)
  if (showTransition) {
    return (
      <Transition onContinue={() => {
        setShowTransition(false);
        setActiveView('dashboard');
      }} />
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
        gameMode={gameState.mode}
        shimmerKey={shimmerKey}
        learnMode={learnMode}
        setLearnMode={setLearnMode}
      />

      <MeetingBanner
        nextMeeting={economicData.nextMeeting}
        meetingNumber={gameState.meetingNumber}
        totalMeetings={gameState.totalMeetings}
        marketExpects={gameState.marketExpects}
        credibility={gameState.credibility}
      />

      {activeView === 'pressConference' && marketReaction && (
        <PressConference
          gameState={gameState}
          rateDecision={rateDecision}
          hawkScore={hawkScore}
          hawkLabel={hawkLabel}
          marketReaction={marketReaction}
          selectedStatements={selectedStatements}
          onComplete={handlePressConferenceComplete}
          learnMode={learnMode}
        />
      )}

      {activeView === 'endgame' && endGameAssessment && (
        <EndGame
          gameState={gameState}
          assessment={endGameAssessment}
          onNewGame={handleNewGame}
        />
      )}

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
          pressConferenceImpact={pressConferenceImpact}
          learnMode={learnMode}
        />
      )}

      {activeView === 'briefing' && briefingData && (
        <Briefing
          briefingData={briefingData}
          gameState={gameState}
          setActiveView={setActiveView}
          learnMode={learnMode}
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
          onStatementPhrasesChange={setActiveStatementPhrases}
          learnMode={learnMode}
          balanceSheetPosture={balanceSheetPosture}
          setBalanceSheetPosture={setBalanceSheetPosture}
          balanceSheetPace={balanceSheetPace}
          setBalanceSheetPace={setBalanceSheetPace}
        />
      )}

      {activeView === 'dashboard' && (
        <Dashboard
          economicData={economicData}
          boardOfGovernors={activeBoardOfGovernors}
          regionalPresidents={regionalPresidents}
          newsHeadlines={newsHeadlines}
          setActiveView={setActiveView}
          gameState={gameState}
          learnMode={learnMode}
        />
      )}

      <Footer />
    </div>
  );
};
