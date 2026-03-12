// LearnTerm Component - Inline contextual tooltip for Learn Mode
// Click-to-toggle on all platforms. Click outside or click another term to dismiss.
// Uses position: fixed + portal to escape overflow: hidden containers

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.LearnTerm = function({ term, learnMode, children }) {
  const [tooltipPos, setTooltipPos] = React.useState(null);
  const termRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  const tooltipData = window.FedChair.Data.learnTerms && window.FedChair.Data.learnTerms[term];

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
      top = rect.top - gap - tooltipHeight;
    } else {
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

  const open = () => {
    // Close any other open tooltip first
    window.dispatchEvent(new CustomEvent('learnterm-close'));
    setTooltipPos(calcPosition());
  };

  const close = () => setTooltipPos(null);

  const toggle = (e) => {
    e.stopPropagation();
    if (tooltipPos) {
      close();
    } else {
      open();
    }
  };

  // Listen for other LearnTerms opening — close this one
  React.useEffect(() => {
    const handleOtherOpen = () => setTooltipPos(null);
    window.addEventListener('learnterm-close', handleOtherOpen);
    return () => window.removeEventListener('learnterm-close', handleOtherOpen);
  }, []);

  // Click-outside dismissal
  React.useEffect(() => {
    if (!tooltipPos) return;

    const handleClickOutside = (e) => {
      if (termRef.current && termRef.current.contains(e.target)) return;
      if (tooltipRef.current && tooltipRef.current.contains(e.target)) return;
      close();
    };

    // Use setTimeout to avoid the opening click from immediately triggering dismiss
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [tooltipPos]);

  if (!learnMode || !tooltipData) {
    return <span>{children}</span>;
  }

  const isOpen = !!tooltipPos;

  return (
    <span
      ref={termRef}
      className={`learn-term${isOpen ? ' learn-term-active' : ''}`}
      onClick={toggle}
    >
      {children}
      {isOpen && ReactDOM.createPortal(
        <span
          ref={tooltipRef}
          className="learn-tooltip"
          style={{
            position: 'fixed',
            top: tooltipPos.top + 'px',
            left: tooltipPos.left + 'px',
            width: tooltipPos.width + 'px',
            zIndex: 9999
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <strong className="learn-tooltip-title">{tooltipData.title}</strong>
          <p className="learn-tooltip-plain">{tooltipData.plain}</p>
          <p className="learn-tooltip-context">{tooltipData.context}</p>
        </span>,
        document.body
      )}
    </span>
  );
};
