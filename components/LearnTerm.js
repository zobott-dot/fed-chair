// LearnTerm Component - Inline contextual tooltip for Learn Mode
// Uses position: fixed + portal to escape overflow: hidden containers

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.LearnTerm = function({ term, learnMode, children }) {
  const [tooltipPos, setTooltipPos] = React.useState(null);
  const termRef = React.useRef(null);
  const tooltipData = window.FedChair.Data.learnTerms && window.FedChair.Data.learnTerms[term];

  if (!learnMode || !tooltipData) {
    return <span>{children}</span>;
  }

  const calcPosition = () => {
    if (!termRef.current) return null;
    const rect = termRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;
    const tooltipWidth = isMobile ? 240 : 280;
    const edgePad = isMobile ? 8 : 12;
    const gap = 8;

    // --- Horizontal positioning ---
    // Start centered over the term
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;

    // Would overflow right edge?
    if (left + tooltipWidth > vw - edgePad) {
      // Align tooltip right edge to term right edge (or viewport edge)
      left = Math.min(rect.right - tooltipWidth, vw - tooltipWidth - edgePad);
    }

    // Would overflow left edge?
    if (left < edgePad) {
      // Align tooltip left edge to term left edge (or viewport edge)
      left = Math.max(rect.left, edgePad);
    }

    // --- Vertical positioning ---
    // Default: above the term
    // If not enough space above (< 150px), show below
    let top;
    const showBelow = rect.top < 150;

    if (showBelow) {
      top = rect.bottom + gap;
    } else {
      // Position above: we don't know exact tooltip height, so use bottom
      // with fixed positioning. Calculate from viewport bottom.
      top = null;
    }

    return {
      top: top,
      bottom: showBelow ? null : (vh - rect.top + gap),
      left: left,
      width: tooltipWidth
    };
  };

  const show = () => {
    setTooltipPos(calcPosition());
  };

  const hide = () => {
    setTooltipPos(null);
  };

  const toggle = () => {
    setTooltipPos(prev => prev ? null : calcPosition());
  };

  const tooltipStyle = tooltipPos ? {
    position: 'fixed',
    left: tooltipPos.left + 'px',
    width: tooltipPos.width + 'px',
    zIndex: 9999,
    ...(tooltipPos.top !== null
      ? { top: tooltipPos.top + 'px' }
      : { bottom: tooltipPos.bottom + 'px' }
    )
  } : null;

  return (
    <span
      ref={termRef}
      className="learn-term"
      onClick={toggle}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {children}
      {tooltipPos && ReactDOM.createPortal(
        <span className="learn-tooltip" style={tooltipStyle}>
          <strong className="learn-tooltip-title">{tooltipData.title}</strong>
          <p className="learn-tooltip-plain">{tooltipData.plain}</p>
          <p className="learn-tooltip-context">{tooltipData.context}</p>
        </span>,
        document.body
      )}
    </span>
  );
};
