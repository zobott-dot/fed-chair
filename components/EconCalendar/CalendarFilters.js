// CalendarFilters Component - Tier filter toggle bar for Economic Calendar

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.CalendarFilters = function({ activeFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'ALL' },
    { key: 1, label: 'MARKET MOVERS' },
    { key: 2, label: 'KEY INDICATORS' },
    { key: 3, label: 'SUPPORTING' },
    { key: 'other', label: 'OTHER' }
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      padding: '10px 16px',
      background: 'rgba(17, 24, 39, 0.6)',
      borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none'
    }}>
      {filters.map(f => {
        const isActive = activeFilter === f.key;
        return (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            style={{
              padding: '8px 14px',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-data)',
              letterSpacing: '1px',
              background: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
              border: isActive ? '1px solid rgba(59, 130, 246, 0.4)' : '1px solid transparent',
              borderRadius: '4px',
              color: isActive ? '#60a5fa' : '#6b7280',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.15s ease',
              minHeight: 'auto'
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
};
