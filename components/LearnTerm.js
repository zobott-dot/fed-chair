// LearnTerm Component - Inline contextual tooltip for Learn Mode
// Uses position: fixed + portal to escape overflow: hidden containers

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.LearnTerm = function({ term, learnMode, children }) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const termRef = React.useRef(null);
  const tooltipData = window.FedChair.Data.learnTerms && window.FedChair.Data.learnTerms[term];

  if (!learnMode || !tooltipData) {
    return <span>{children}</span>;
  }

  const getTooltipStyle = () => {
    if (!termRef.current) return { position: 'fixed', visibility: 'hidden' };
    const rect = termRef.current.getBoundingClientRect();
    const tooltipWidth = 280;
    const gap = 8;

    // Center horizontally on the term, clamped to viewport
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));

    // Show above the term by default
    const spaceAbove = rect.top;
    const showBelow = spaceAbove < 160; // not enough room above, show below

    const style = {
      position: 'fixed',
      left: left + 'px',
      zIndex: 9999,
      width: tooltipWidth + 'px'
    };

    if (showBelow) {
      style.top = (rect.bottom + gap) + 'px';
    } else {
      style.bottom = (window.innerHeight - rect.top + gap) + 'px';
    }

    return style;
  };

  return (
    <span
      ref={termRef}
      className="learn-term"
      onClick={() => setShowTooltip(!showTooltip)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && ReactDOM.createPortal(
        <span className="learn-tooltip" style={getTooltipStyle()}>
          <strong className="learn-tooltip-title">{tooltipData.title}</strong>
          <p className="learn-tooltip-plain">{tooltipData.plain}</p>
          <p className="learn-tooltip-context">{tooltipData.context}</p>
        </span>,
        document.body
      )}
    </span>
  );
};
