// IntroButton — Persistent nav button to open the Scenario Intro Briefing
// Matches the CalendarButton pattern: quiet, present, not competing for attention

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.IntroButton = function({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 14px',
        borderRadius: '4px',
        border: '1px solid rgba(75, 85, 99, 0.4)',
        background: 'rgba(75, 85, 99, 0.2)',
        color: '#9ca3af',
        fontFamily: "'Oswald', sans-serif",
        fontSize: 'var(--text-sm)',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        minHeight: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(138, 26, 26, 0.1)';
        e.target.style.borderColor = 'rgba(138, 26, 26, 0.4)';
        e.target.style.color = '#c4b896';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'rgba(75, 85, 99, 0.2)';
        e.target.style.borderColor = 'rgba(75, 85, 99, 0.4)';
        e.target.style.color = '#9ca3af';
      }}
    >
      BRIEFING
    </button>
  );
};
