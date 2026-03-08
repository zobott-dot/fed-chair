// LearnTerm Component - Inline contextual tooltip for Learn Mode

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.LearnTerm = function({ term, learnMode, children }) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipData = window.FedChair.Data.learnTerms && window.FedChair.Data.learnTerms[term];

  if (!learnMode || !tooltipData) {
    return <span>{children}</span>;
  }

  return (
    <span
      className="learn-term"
      onClick={() => setShowTooltip(!showTooltip)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <span className="learn-tooltip">
          <strong className="learn-tooltip-title">{tooltipData.title}</strong>
          <p className="learn-tooltip-plain">{tooltipData.plain}</p>
          <p className="learn-tooltip-context">{tooltipData.context}</p>
        </span>
      )}
    </span>
  );
};
