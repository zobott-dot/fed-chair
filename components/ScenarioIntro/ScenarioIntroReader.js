// ScenarioIntroReader — Full-screen overlay for the Volcker Scenario Intro Briefing
// Six-section paged reader with progressive-disclosure mechanics
// Follows the EconCalendar overlay pattern (same z-index layer, no game state disruption)

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.ScenarioIntroReader = function({ onClose, scenarioId }) {
  const S = window.FedChair.Components.IntroStyles;
  const IntroSection = window.FedChair.Components.IntroSection;

  // Get scenario data
  const introData = window.FedChair.Data.volckerIntro;
  const sections = introData ? introData.sections : [];

  // Active section (1-indexed for display, 0-indexed internally)
  const [activeSectionIndex, setActiveSectionIndex] = React.useState(0);

  // Scroll positions per section (preserved when switching)
  const scrollPositions = React.useRef({});
  const contentRef = React.useRef(null);

  // Progressive disclosure state — preserved across section switches
  const [openDepths, setOpenDepths] = React.useState({});
  const [openCards, setOpenCards] = React.useState({});

  // Track last-viewed section for re-open persistence
  const lastSectionRef = React.useRef(0);

  // Restore last viewed section on re-open
  React.useEffect(() => {
    setActiveSectionIndex(lastSectionRef.current);
  }, []);

  // Save/restore scroll position when switching sections
  const handleSectionSwitch = React.useCallback((newIndex) => {
    // Save current scroll position
    if (contentRef.current) {
      scrollPositions.current[activeSectionIndex] = contentRef.current.scrollTop;
    }

    setActiveSectionIndex(newIndex);
    lastSectionRef.current = newIndex;

    // Restore scroll position for new section (after render)
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.scrollTop = scrollPositions.current[newIndex] || 0;
      }
    });
  }, [activeSectionIndex]);

  // Toggle depth panel
  const toggleDepth = React.useCallback((depthId) => {
    setOpenDepths(prev => ({ ...prev, [depthId]: !prev[depthId] }));
  }, []);

  // Toggle card
  const toggleCard = React.useCallback((cardId) => {
    setOpenCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  }, []);

  // Close on Escape
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll while overlay is open
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const activeSection = sections[activeSectionIndex];
  if (!activeSection) return null;

  const isDark = activeSection.type === 'data-panel';

  // Section titles for the selector label
  const sectionTitles = sections.map(s => s.title);

  return (
    <div style={S.overlay}>
      {/* ---- Header bar ---- */}
      <div style={S.headerBar}>
        {/* Left: title */}
        <div style={S.headerTitle}>
          VOLCKER SCENARIO
        </div>

        {/* Center: section selector */}
        <div style={S.selectorRow}>
          {sections.map((s, idx) => (
            <button
              key={s.id}
              style={S.selectorButton(idx === activeSectionIndex)}
              onClick={() => handleSectionSwitch(idx)}
              title={s.title}
            >
              {s.number}
            </button>
          ))}
          <span style={S.selectorLabel}>
            {sectionTitles[activeSectionIndex]}
          </span>
        </div>

        {/* Right: close button */}
        <button
          style={S.closeButton}
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.1)';
            e.target.style.borderColor = 'rgba(239, 68, 68, 0.4)';
            e.target.style.color = '#ef4444';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(75, 85, 99, 0.2)';
            e.target.style.borderColor = 'rgba(75, 85, 99, 0.4)';
            e.target.style.color = '#9ca3af';
          }}
        >
          &times;
        </button>
      </div>

      {/* ---- Content area ---- */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          background: isDark ? '#1a1815' : '#f4f1ea'
        }}
      >
        <IntroSection
          section={activeSection}
          openDepths={openDepths}
          toggleDepth={toggleDepth}
          openCards={openCards}
          toggleCard={toggleCard}
        />
      </div>
    </div>
  );
};
