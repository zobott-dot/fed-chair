// Press Conference Component — Interactive Q&A between decision and aftermath

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const pcPanelStyle = {
  background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 100%)',
  border: '1px solid rgba(75, 85, 99, 0.3)',
  borderRadius: '12px',
  overflow: 'hidden'
};

window.FedChair.Components.PressConference = function({
  gameState,
  rateDecision,
  hawkScore,
  hawkLabel,
  marketReaction,
  selectedStatements,
  onComplete
}) {
  const { useState, useEffect, useMemo } = React;
  const { generatePressConferenceQuestions, scoreResponse, calculatePressConferenceImpact } = window.FedChair.Engine;

  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scoredResponses, setScoredResponses] = useState([]);
  const [currentSelection, setCurrentSelection] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [phase, setPhase] = useState('questions'); // 'questions' | 'summary'
  const [cumulativeMood, setCumulativeMood] = useState(0);
  const [cumulativeCredibility, setCumulativeCredibility] = useState(0);

  // Generate questions once on mount
  useEffect(() => {
    const qs = generatePressConferenceQuestions(gameState, rateDecision, hawkScore, marketReaction, selectedStatements);
    setQuestions(qs);
  }, []);

  if (!questions) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex >= questions.length - 1;

  const getDecisionLabel = (bps) => {
    if (bps === 0) return 'HOLD';
    return `${bps > 0 ? '+' : ''}${bps} bps`;
  };

  const getDecisionColor = (bps) => {
    if (bps < 0) return '#22c55e';
    if (bps > 0) return '#ef4444';
    return '#60a5fa';
  };

  const handleDeliverResponse = () => {
    if (currentSelection === null) return;

    const response = currentQuestion.responses[currentSelection];
    const scored = scoreResponse(response, rateDecision, hawkScore, scoredResponses);

    setScoredResponses(prev => [...prev, scored]);
    setCumulativeMood(prev => prev + scored.hawkShift);
    setCumulativeCredibility(prev => prev + scored.credibilityEffect);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setPhase('summary');
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentSelection(null);
      setShowFeedback(false);
    }
  };

  const handleEndConference = () => {
    const impact = calculatePressConferenceImpact(scoredResponses);
    onComplete(impact);
  };

  // Mood bar position: -10 to +10 mapped to 0-100%
  const moodBarPos = Math.max(0, Math.min(100, 50 + cumulativeMood * 5));

  // ─── Summary Phase ──────────────────────────────────────────────────

  if (phase === 'summary') {
    const impact = calculatePressConferenceImpact(scoredResponses);
    const credColor = impact.totalCredibilityChange >= 0 ? '#22c55e' : '#ef4444';
    const interpColor =
      impact.interpretation === 'mixed signals' ? '#f97316' :
      impact.interpretation.includes('hawkish') ? '#ef4444' :
      impact.interpretation.includes('dovish') ? '#22c55e' : '#60a5fa';

    return (
      <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ ...pcPanelStyle, padding: '32px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', marginBottom: '8px', fontWeight: '600' }}>
              PRESS CONFERENCE ASSESSMENT
            </div>
            <div style={{ width: '40px', height: '2px', background: '#3b82f6', margin: '0 auto' }} />
          </div>

          {/* Credibility Change */}
          <div style={{
            textAlign: 'center',
            padding: '24px',
            background: `${credColor}10`,
            borderRadius: '10px',
            border: `1px solid ${credColor}30`,
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '8px' }}>
              CREDIBILITY IMPACT
            </div>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: '600',
              color: credColor
            }}>
              {impact.totalCredibilityChange >= 0 ? '+' : ''}{impact.totalCredibilityChange}
            </div>
          </div>

          {/* Market Interpretation */}
          <div style={{
            textAlign: 'center',
            padding: '16px',
            background: 'rgba(17, 24, 39, 0.5)',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#8b95a5', marginBottom: '6px' }}>
              MARKET INTERPRETATION
            </div>
            <div style={{
              fontSize: 'clamp(16px, 3vw, 22px)',
              fontWeight: '600',
              color: interpColor,
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              {impact.interpretation}
            </div>
          </div>

          {/* Key Moment */}
          {impact.keyMoment && (
            <div style={{
              padding: '14px 16px',
              background: 'rgba(59, 130, 246, 0.08)',
              borderRadius: '8px',
              borderLeft: '3px solid #3b82f6',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#60a5fa', marginBottom: '4px', fontWeight: '600' }}>
                KEY MOMENT
              </div>
              <div style={{ fontSize: 'var(--text-sm)', fontFamily: 'var(--font-prose)', color: '#d1d5db', lineHeight: 'var(--leading-relaxed)' }}>
                {impact.keyMoment}
              </div>
            </div>
          )}

          {/* Proceed Button */}
          <button
            onClick={handleEndConference}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '2px',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            PROCEED TO MARKET REACTION
          </button>
        </div>
      </main>
    );
  }

  // ─── Questions Phase ────────────────────────────────────────────────

  return (
    <main style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', marginBottom: '6px', fontWeight: '600' }}>
          POST-DECISION PRESS CONFERENCE
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: '#6b7280' }}>
          {gameState.meetingDisplayDate}
        </div>
      </div>

      {/* Decision Summary Strip */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        padding: '10px 16px',
        background: 'rgba(17, 24, 39, 0.6)',
        borderRadius: '8px',
        marginBottom: '16px',
        border: '1px solid rgba(75, 85, 99, 0.2)'
      }}>
        <span style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 'var(--text-sm)',
          fontWeight: '600',
          color: getDecisionColor(rateDecision)
        }}>
          {getDecisionLabel(rateDecision)}
        </span>
        <span style={{ color: 'rgba(75, 85, 99, 0.5)' }}>|</span>
        <span style={{
          fontSize: 'var(--text-xs)',
          color: hawkLabel.color,
          fontWeight: '500',
          letterSpacing: '1px'
        }}>
          {hawkLabel.label}
        </span>
      </div>

      {/* Progress Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
        {questions.map((_, i) => (
          <div key={i} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: i < currentQuestionIndex ? '#3b82f6' :
                         i === currentQuestionIndex ? '#60a5fa' : 'rgba(75, 85, 99, 0.4)',
            transition: 'background 0.3s ease'
          }} />
        ))}
      </div>
      <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280', marginBottom: '16px', letterSpacing: '1px' }}>
        QUESTION {currentQuestionIndex + 1} OF {questions.length}
      </div>

      {/* Market Mood Bar */}
      <div style={{
        marginBottom: '20px',
        padding: '10px 16px',
        background: 'rgba(17, 24, 39, 0.5)',
        borderRadius: '8px',
        border: '1px solid rgba(75, 85, 99, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', color: '#22c55e', letterSpacing: '1px' }}>DOVISH</span>
          <span style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1px' }}>MARKET MOOD</span>
          <span style={{ fontSize: '10px', color: '#ef4444', letterSpacing: '1px' }}>HAWKISH</span>
        </div>
        <div style={{
          height: '6px',
          borderRadius: '3px',
          background: 'linear-gradient(90deg, #22c55e, #6b7280 50%, #ef4444)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '-3px',
            left: `${moodBarPos}%`,
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#fff',
            border: '2px solid #1f2937',
            boxShadow: '0 0 6px rgba(255,255,255,0.3)',
            transition: 'left 0.5s ease'
          }} />
        </div>
      </div>

      {/* Question Card */}
      <div style={{
        ...pcPanelStyle,
        marginBottom: '16px',
        animation: showFeedback ? 'none' : 'slideIn 0.3s ease-out'
      }}>
        <div style={{
          padding: '14px 16px',
          borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
          background: 'rgba(59, 130, 246, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#60a5fa' }}>
              {currentQuestion.reporter}
            </span>
            <span style={{ fontSize: '10px', color: '#6b7280' }}>
              {currentQuestion.outlet}
            </span>
          </div>
        </div>
        <div style={{ padding: '16px 18px' }}>
          <div style={{
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-prose)',
            color: '#e5e7eb',
            fontStyle: 'italic',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            "{currentQuestion.question}"
          </div>
        </div>
      </div>

      {/* Response Cards */}
      {!showFeedback && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {currentQuestion.responses.map((resp, i) => {
            const isSelected = currentSelection === i;
            const strategyColor =
              resp.label === 'Hawkish lean' ? '#ef4444' :
              resp.label === 'Dovish lean' ? '#22c55e' :
              resp.label === 'Deflect' ? '#f97316' :
              resp.label === 'Direct engagement' ? '#8b5cf6' :
              resp.label === 'Substantive redirect' ? '#0ea5e9' :
              resp.label === 'Empathetic' ? '#ec4899' :
              resp.label === 'Technical' ? '#6366f1' :
              '#60a5fa';

            return (
              <button
                key={i}
                onClick={() => setCurrentSelection(i)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '14px 16px',
                  background: isSelected
                    ? 'rgba(59, 130, 246, 0.15)'
                    : 'rgba(17, 24, 39, 0.5)',
                  border: isSelected
                    ? '1px solid rgba(59, 130, 246, 0.5)'
                    : '1px solid rgba(75, 85, 99, 0.3)',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: '#e5e7eb'
                }}
              >
                <div style={{ marginBottom: '6px' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    color: strategyColor,
                    background: `${strategyColor}15`,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>
                    {resp.label}
                  </span>
                </div>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-prose)',
                  color: '#d1d5db',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  "{resp.text}"
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Deliver Response Button */}
      {!showFeedback && (
        <button
          onClick={handleDeliverResponse}
          disabled={currentSelection === null}
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '2px',
            background: currentSelection !== null
              ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)'
              : 'rgba(75, 85, 99, 0.3)',
            border: 'none',
            color: currentSelection !== null ? '#fff' : '#6b7280',
            borderRadius: '8px',
            cursor: currentSelection !== null ? 'pointer' : 'not-allowed',
            boxShadow: currentSelection !== null ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
            marginBottom: '16px',
            transition: 'all 0.2s ease'
          }}
        >
          DELIVER RESPONSE
        </button>
      )}

      {/* Feedback Strip */}
      {showFeedback && (
        <div style={{ marginBottom: '16px' }}>
          {/* Selected Response Recap */}
          <div style={{
            padding: '14px 16px',
            background: 'rgba(17, 24, 39, 0.5)',
            borderRadius: '10px',
            border: '1px solid rgba(75, 85, 99, 0.3)',
            marginBottom: '12px'
          }}>
            <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1px', marginBottom: '6px' }}>YOUR RESPONSE</div>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-prose)',
              color: '#d1d5db',
              lineHeight: 'var(--leading-relaxed)',
              fontStyle: 'italic'
            }}>
              "{currentQuestion.responses[currentSelection].text}"
            </div>
          </div>

          {/* Feedback */}
          {(() => {
            const latest = scoredResponses[scoredResponses.length - 1];
            if (!latest) return null;

            const moodIcon = latest.hawkShift > 0 ? '>' : latest.hawkShift < 0 ? '<' : '=';
            const moodLabel = latest.hawkShift > 0 ? 'Hawkish shift' : latest.hawkShift < 0 ? 'Dovish shift' : 'Neutral';
            const credIcon = latest.credibilityEffect > 0 ? '+' : latest.credibilityEffect < 0 ? '-' : '=';
            const credColor = latest.credibilityEffect >= 0 ? '#22c55e' : '#ef4444';

            return (
              <div style={{
                padding: '14px 16px',
                background: 'rgba(59, 130, 246, 0.08)',
                borderRadius: '10px',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                marginBottom: '12px'
              }}>
                <div style={{ display: 'flex', gap: '16px', marginBottom: latest.feedback ? '10px' : '0' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1px', marginBottom: '4px' }}>MOOD SHIFT</div>
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 'var(--text-sm)',
                      color: latest.hawkShift > 0 ? '#ef4444' : latest.hawkShift < 0 ? '#22c55e' : '#9ca3af'
                    }}>
                      {moodLabel} ({latest.hawkShift >= 0 ? '+' : ''}{latest.hawkShift.toFixed(1)})
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '10px', color: '#6b7280', letterSpacing: '1px', marginBottom: '4px' }}>CREDIBILITY</div>
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: 'var(--text-sm)',
                      color: credColor
                    }}>
                      {latest.credibilityEffect >= 0 ? '+' : ''}{latest.credibilityEffect}
                    </div>
                  </div>
                </div>
                {latest.feedback && (
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-prose)',
                    color: '#9ca3af',
                    fontStyle: 'italic',
                    lineHeight: 'var(--leading-relaxed)',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(75, 85, 99, 0.2)'
                  }}>
                    {latest.feedback}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Next / End Button */}
          <button
            onClick={handleNextQuestion}
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '2px',
              background: isLastQuestion
                ? 'linear-gradient(135deg, #065f46 0%, #059669 100%)'
                : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: isLastQuestion
                ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                : '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          >
            {isLastQuestion ? 'END PRESS CONFERENCE' : 'NEXT QUESTION'}
          </button>
        </div>
      )}
    </main>
  );
};
