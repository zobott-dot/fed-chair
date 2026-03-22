// CalendarButton Component - Persistent nav button to open Economic Calendar

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.CalendarButton = function({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 14px',
        borderRadius: '4px',
        border: '1px solid rgba(75, 85, 99, 0.4)',
        background: 'rgba(75, 85, 99, 0.2)',
        color: '#9ca3af',
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
        e.target.style.background = 'rgba(59, 130, 246, 0.1)';
        e.target.style.borderColor = 'rgba(59, 130, 246, 0.4)';
        e.target.style.color = '#60a5fa';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'rgba(75, 85, 99, 0.2)';
        e.target.style.borderColor = 'rgba(75, 85, 99, 0.4)';
        e.target.style.color = '#9ca3af';
      }}
    >
      ECON CAL
    </button>
  );
};
