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
    const isBiography = tooltipData.title && tooltipData.title.includes('\u2014');
    const tooltipWidth = isBiography ? 320 : 280;
    const tooltipHeight = isBiography ? 200 : 160;
    const gap = 8;
    const pad = 12;

    // --- Vertical ---
    const spaceAbove = rect.top;
    let top;
    if (spaceAbove >= tooltipHeight + pad) {
      // Place above: bottom edge of tooltip sits gap-px above the term
      top = rect.top - gap - tooltipHeight;
    } else {
      // Place below: top edge of tooltip sits gap-px below the term
      top = rect.bottom + gap;
    }

    // --- Horizontal ---
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    if (left < pad) {
      left = pad;
    } else if (left + tooltipWidth > window.innerWidth - pad) {
      left = window.innerWidth - tooltipWidth - pad;
    }

    return { top, left, width: tooltipWidth };
  };

  const show = () => setTooltipPos(calcPosition());
  const hide = () => setTooltipPos(null);
  const toggle = () => setTooltipPos(prev => prev ? null : calcPosition());

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
        <span className="learn-tooltip" style={{
          position: 'fixed',
          top: tooltipPos.top + 'px',
          left: tooltipPos.left + 'px',
          width: tooltipPos.width + 'px',
          zIndex: 9999
        }}>
          <strong className="learn-tooltip-title">{tooltipData.title}</strong>
          <p className="learn-tooltip-plain">{tooltipData.plain}</p>
          <p className="learn-tooltip-context">{tooltipData.context}</p>
        </span>,
        document.body
      )}
    </span>
  );
};
