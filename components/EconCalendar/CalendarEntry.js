// CalendarEntry Component - Individual release entry in the Economic Calendar
// Renders release row with tier marker, time, name, source, and tappable tooltip

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.CalendarEntry = function({ release, categories, dimmed }) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [showDeep, setShowDeep] = React.useState(false);
  const [activeLearnTerm, setActiveLearnTerm] = React.useState(null);
  const entryRef = React.useRef(null);
  const tooltipRef = React.useRef(null);

  const isRegistered = !!release._registered;
  const tier = release.tier;

  // Tier markers
  const tierMarker = tier === 1 ? '●' : tier === 2 ? '○' : tier === 3 ? '·' : '';

  // Tier-based text styling
  const nameColor = tier === 1 ? '#f9fafb' : tier === 2 ? '#e5e7eb' : tier === 3 ? '#9ca3af' : '#6b7280';
  const nameWeight = tier === 1 ? '600' : '400';

  // Category info
  const catInfo = release.category && categories ? categories[release.category] : null;

  // Format time for display
  const displayTime = release.typical_time && release.typical_time !== 'N/A'
    ? formatTime(release.typical_time)
    : '';

  function formatTime(t) {
    const [h, m] = t.split(':').map(Number);
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour}:${m.toString().padStart(2, '0')} ${suffix}`;
  }

  // Tooltip positioning (reuses LearnTerm pattern)
  const calcPosition = () => {
    if (!entryRef.current) return null;
    const rect = entryRef.current.getBoundingClientRect();
    const tooltipWidth = 340;
    const tooltipHeight = showDeep ? 380 : 180;
    const gap = 8;
    const pad = 12;

    const spaceAbove = rect.top;
    let top;
    if (spaceAbove >= tooltipHeight + pad) {
      top = rect.top - gap - tooltipHeight;
    } else {
      top = rect.bottom + gap;
    }

    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (left < pad) left = pad;
    if (left + tooltipWidth > window.innerWidth - pad) {
      left = window.innerWidth - tooltipWidth - pad;
    }

    return { top, left, width: tooltipWidth };
  };

  const toggleTooltip = (e) => {
    e.stopPropagation();
    if (!isRegistered) return;
    if (showTooltip) {
      setShowTooltip(false);
      setShowDeep(false);
      setActiveLearnTerm(null);
    } else {
      window.dispatchEvent(new CustomEvent('calendar-tooltip-close'));
      setShowTooltip(true);
    }
  };

  // Close when another tooltip opens
  React.useEffect(() => {
    const handleClose = () => {
      setShowTooltip(false);
      setShowDeep(false);
      setActiveLearnTerm(null);
    };
    window.addEventListener('calendar-tooltip-close', handleClose);
    return () => window.removeEventListener('calendar-tooltip-close', handleClose);
  }, []);

  // Click-outside dismissal
  React.useEffect(() => {
    if (!showTooltip) return;
    const handleClick = (e) => {
      if (entryRef.current && entryRef.current.contains(e.target)) return;
      if (tooltipRef.current && tooltipRef.current.contains(e.target)) return;
      setShowTooltip(false);
      setShowDeep(false);
    };
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [showTooltip]);

  const tooltipPos = showTooltip ? calcPosition() : null;

  // Handle learn term click — show definition inline
  const handleLearnTermClick = (term, e) => {
    e.stopPropagation();
    if (activeLearnTerm === term) {
      setActiveLearnTerm(null);
    } else {
      setActiveLearnTerm(term);
    }
  };

  // Get learn term data
  const learnTermData = activeLearnTerm
    ? (window.FedChair.Data.learnTerms && window.FedChair.Data.learnTerms[activeLearnTerm])
    : null;

  return (
    <div
      ref={entryRef}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        padding: '12px 16px',
        gap: '14px',
        opacity: dimmed ? 0.35 : 1,
        transition: 'opacity 0.2s ease',
        cursor: isRegistered ? 'pointer' : 'default'
      }}
      onClick={toggleTooltip}
    >
      {/* Time */}
      <div style={{
        width: '76px',
        flexShrink: 0,
        fontFamily: 'var(--font-data)',
        fontSize: 'var(--text-sm)',
        color: '#6b7280',
        paddingTop: '2px',
        textAlign: 'right'
      }}>
        {displayTime}
      </div>

      {/* Tier marker */}
      <div style={{
        width: '14px',
        flexShrink: 0,
        fontSize: tier === 3 ? '10px' : 'var(--text-sm)',
        color: tier === 1 ? '#60a5fa' : tier === 2 ? '#9ca3af' : '#6b7280',
        paddingTop: tier === 3 ? '5px' : '2px',
        textAlign: 'center'
      }}>
        {tierMarker}
      </div>

      {/* Name + metadata */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 'var(--text-base)',
          fontWeight: nameWeight,
          color: nameColor,
          lineHeight: 'var(--leading-tight)'
        }}>
          {release.name}
        </div>
        {isRegistered && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '3px',
            fontSize: 'var(--text-xs)'
          }}>
            {release.abbreviation && (
              <span style={{
                color: '#6b7280',
                fontFamily: 'var(--font-data)',
                letterSpacing: '0.5px'
              }}>
                {release.abbreviation}
              </span>
            )}
            {release.abbreviation && catInfo && (
              <span style={{ color: '#374151' }}>|</span>
            )}
            {catInfo && (
              <span style={{
                color: catInfo.color,
                fontFamily: 'var(--font-data)',
                letterSpacing: '1px',
                fontSize: 'var(--text-xs)'
              }}>
                {catInfo.label}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Source */}
      <div style={{
        flexShrink: 0,
        fontSize: 'var(--text-xs)',
        color: '#6b7280',
        fontFamily: 'var(--font-data)',
        letterSpacing: '0.5px',
        paddingTop: '2px'
      }}>
        {release.source_abbr || ''}
      </div>

      {/* Tooltip portal */}
      {showTooltip && tooltipPos && isRegistered && ReactDOM.createPortal(
        <div
          ref={tooltipRef}
          className="learn-tooltip"
          style={{
            position: 'fixed',
            top: tooltipPos.top + 'px',
            left: tooltipPos.left + 'px',
            width: tooltipPos.width + 'px',
            zIndex: 9999,
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <strong className="learn-tooltip-title">{release.name}</strong>
          <p className="learn-tooltip-plain">{release.description_short}</p>

          {!showDeep && release.description_deep && (
            <button
              onClick={(e) => { e.stopPropagation(); setShowDeep(true); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#60a5fa',
                fontSize: 'var(--text-xs)',
                cursor: 'pointer',
                padding: '4px 0',
                minHeight: 'auto',
                fontFamily: 'var(--font-data)',
                letterSpacing: '0.5px'
              }}
            >
              MORE ▸
            </button>
          )}

          {showDeep && (
            <div style={{ marginTop: '6px' }}>
              <p className="learn-tooltip-context" style={{ fontStyle: 'normal' }}>
                {release.description_deep}
              </p>

              {release.learn_terms && release.learn_terms.length > 0 && (
                <div style={{
                  marginTop: '8px',
                  paddingTop: '6px',
                  borderTop: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: '#6b7280',
                    letterSpacing: '1px',
                    fontFamily: 'var(--font-data)',
                    marginBottom: '4px'
                  }}>
                    RELATED TERMS
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {release.learn_terms.map(term => (
                      <button
                        key={term}
                        onClick={(e) => handleLearnTermClick(term, e)}
                        style={{
                          background: activeLearnTerm === term ? 'rgba(217, 119, 6, 0.2)' : 'rgba(217, 119, 6, 0.1)',
                          border: '1px solid rgba(217, 119, 6, ' + (activeLearnTerm === term ? '0.6' : '0.3') + ')',
                          borderRadius: '3px',
                          padding: '3px 10px',
                          fontSize: 'var(--text-xs)',
                          color: '#D97706',
                          cursor: 'pointer',
                          minHeight: 'auto',
                          fontFamily: 'var(--font-data)'
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  {learnTermData && (
                    <div style={{
                      marginTop: '6px',
                      padding: '8px 10px',
                      background: 'rgba(217, 119, 6, 0.05)',
                      border: '1px solid rgba(217, 119, 6, 0.15)',
                      borderRadius: '4px'
                    }}>
                      <strong style={{
                        display: 'block',
                        fontSize: 'var(--text-xs)',
                        color: '#D97706',
                        fontFamily: 'var(--font-data)',
                        letterSpacing: '0.5px',
                        marginBottom: '4px'
                      }}>
                        {learnTermData.title}
                      </strong>
                      <p style={{
                        fontSize: 'var(--text-sm)',
                        color: '#E5E7EB',
                        margin: '0 0 4px 0',
                        lineHeight: '1.5'
                      }}>
                        {learnTermData.plain}
                      </p>
                      <p style={{
                        fontSize: 'var(--text-xs)',
                        color: '#9CA3AF',
                        margin: 0,
                        fontStyle: 'italic',
                        lineHeight: '1.5'
                      }}>
                        {learnTermData.context}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {release.link && (
                <div style={{ marginTop: '8px' }}>
                  <a
                    href={release.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: '#60a5fa',
                      fontFamily: 'var(--font-data)',
                      letterSpacing: '0.5px'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    VIEW SOURCE ↗
                  </a>
                </div>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};
