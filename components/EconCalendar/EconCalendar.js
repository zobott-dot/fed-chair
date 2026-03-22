// EconCalendar Component - Full-screen Economic Calendar overlay
// Fetches upcoming FRED release dates and enriches with registry data

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

const { CalendarEntry, CalendarFilters } = window.FedChair.Components;

window.FedChair.Components.EconCalendar = function({ onClose }) {
  const [calendarData, setCalendarData] = React.useState(null);
  const [registry, setRegistry] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [expandedOther, setExpandedOther] = React.useState({});

  const API_KEY = '5f1dfeb40783eefa1e7d0d4e3e602597';
  const PROXY_BASE = 'https://fred-proxy.dave-zobott.workers.dev';

  // Fetch data on mount
  React.useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        // Fetch registry and FRED release dates in parallel
        const [registryRes, calendarRes] = await Promise.all([
          fetch('data/release-registry.json'),
          fetchCalendarDates()
        ]);

        if (cancelled) return;

        if (!registryRes.ok) throw new Error('Failed to load release registry');
        const reg = await registryRes.json();

        setRegistry(reg);
        setCalendarData(calendarRes);
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          console.warn('Calendar fetch error:', err.message);
          setError(true);
          setLoading(false);
        }
      }
    }

    async function fetchCalendarDates() {
      const today = new Date();
      const future = new Date();
      future.setDate(today.getDate() + 45);

      const todayStr = today.toISOString().split('T')[0];
      const futureStr = future.toISOString().split('T')[0];

      // Try the proxy first, fall back to direct FRED API
      const urls = [
        `${PROXY_BASE}/fred/releases/dates?api_key=${API_KEY}&file_type=json&realtime_start=${todayStr}&realtime_end=${futureStr}&include_release_dates_with_no_data=true&sort_order=asc&limit=1000`,
        `https://api.stlouisfed.org/fred/releases/dates?api_key=${API_KEY}&file_type=json&realtime_start=${todayStr}&realtime_end=${futureStr}&include_release_dates_with_no_data=true&sort_order=asc&limit=1000`
      ];

      for (const url of urls) {
        try {
          const res = await fetch(url);
          if (res.ok) {
            const data = await res.json();
            if (data.release_dates) return data;
          }
        } catch (e) {
          // Try next URL
        }
      }
      throw new Error('calendar_unavailable');
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  // Close on Escape
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Build grouped + enriched data
  const groupedDates = React.useMemo(() => {
    if (!calendarData || !registry) return null;

    const registryMap = {};
    registry.releases.forEach(r => {
      registryMap[r.release_id] = r;
    });

    // Group by date
    const groups = {};
    (calendarData.release_dates || []).forEach(item => {
      const date = item.date;
      if (!groups[date]) groups[date] = [];

      const regEntry = registryMap[item.release_id];
      if (regEntry) {
        groups[date].push({
          ...regEntry,
          date,
          _registered: true
        });
      } else {
        groups[date].push({
          release_id: item.release_id,
          name: item.release_name || `Release #${item.release_id}`,
          date,
          _registered: false,
          tier: null,
          typical_time: 'N/A',
          category: null,
          abbreviation: null,
          source_abbr: null
        });
      }
    });

    // Sort within each group: time, then tier, then alpha
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => {
        // Registered before unregistered
        if (a._registered && !b._registered) return -1;
        if (!a._registered && b._registered) return 1;

        // By time
        const timeA = a.typical_time && a.typical_time !== 'N/A' ? a.typical_time : '99:99';
        const timeB = b.typical_time && b.typical_time !== 'N/A' ? b.typical_time : '99:99';
        if (timeA !== timeB) return timeA.localeCompare(timeB);

        // By tier (1 first)
        const tierA = a.tier || 99;
        const tierB = b.tier || 99;
        if (tierA !== tierB) return tierA - tierB;

        // Alphabetical
        return a.name.localeCompare(b.name);
      });
    });

    // Sort dates chronologically
    const sortedDates = Object.keys(groups).sort();
    return sortedDates.map(date => ({
      date,
      releases: groups[date]
    }));
  }, [calendarData, registry]);

  // Today string for badge
  const todayStr = new Date().toISOString().split('T')[0];

  // Format date header
  function formatDateHeader(dateStr) {
    const d = new Date(dateStr + 'T12:00:00');
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return `${days[d.getDay()]}  ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  // Check if entry should be dimmed based on filter
  function isDimmed(release) {
    if (activeFilter === 'all') return false;
    if (activeFilter === 'other') return release._registered;
    return release.tier !== activeFilter;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, #0a0f1a 0%, #0d1117 100%)',
      zIndex: 500,
      display: 'flex',
      flexDirection: 'column',
      color: '#e5e7eb'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 16px 14px',
        borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
        background: 'rgba(10, 15, 26, 0.95)',
        flexShrink: 0
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(20px, 5vw, 28px)',
              fontWeight: '600',
              letterSpacing: '4px',
              margin: 0,
              color: '#e5e7eb'
            }}>
              ECONOMIC CALENDAR
            </h2>
            <div style={{
              fontSize: 'var(--text-sm)',
              color: '#6b7280',
              marginTop: '4px',
              fontFamily: 'var(--font-data)',
              letterSpacing: '0.5px'
            }}>
              Upcoming U.S. economic data releases — sourced from FRED
              <span style={{ marginLeft: '8px', color: '#4b5563' }}>|</span>
              <span style={{ marginLeft: '8px', color: '#9ca3af' }}>Times in CT</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(75, 85, 99, 0.2)',
              border: '1px solid rgba(75, 85, 99, 0.4)',
              borderRadius: '4px',
              color: '#9ca3af',
              fontSize: 'var(--text-lg)',
              cursor: 'pointer',
              padding: '4px 12px',
              minHeight: 'auto',
              lineHeight: '1'
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Filter bar */}
      {!loading && !error && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', flexShrink: 0, padding: '0 16px' }}>
          <CalendarFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      )}

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '0 16px'
      }}>
        {/* Loading skeleton */}
        {loading && (
          <div style={{ padding: '40px 16px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ marginBottom: '32px' }}>
                <div style={{
                  height: '16px',
                  width: '220px',
                  background: 'rgba(75, 85, 99, 0.2)',
                  borderRadius: '3px',
                  marginBottom: '16px'
                }} className="animate-pulse" />
                {[1, 2].map(j => (
                  <div key={j} style={{
                    height: '48px',
                    background: 'rgba(75, 85, 99, 0.1)',
                    borderRadius: '3px',
                    marginBottom: '8px'
                  }} className="animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div style={{
            padding: '60px 16px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 'var(--text-base)', color: '#9ca3af', marginBottom: '8px' }}>
              Economic calendar data is temporarily unavailable.
            </div>
            <div style={{ fontSize: 'var(--text-sm)', color: '#6b7280' }}>
              Please try again later.
            </div>
          </div>
        )}

        {/* Calendar content */}
        {!loading && !error && groupedDates && groupedDates.map(group => {
          const registered = group.releases.filter(r => r._registered);
          const unregistered = group.releases.filter(r => !r._registered);
          const isToday = group.date === todayStr;
          const dateKey = group.date;

          // If only unregistered releases and filter is not 'all' or 'other', skip
          if (registered.length === 0 && activeFilter !== 'all' && activeFilter !== 'other') {
            return null;
          }

          return (
            <div key={dateKey}>
              {/* Date header */}
              <div style={{
                padding: '14px 16px 10px',
                borderTop: '1px solid rgba(75, 85, 99, 0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: isToday ? 'rgba(245, 158, 11, 0.05)' : 'transparent'
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'var(--font-data)',
                  fontWeight: '500',
                  color: isToday ? '#f59e0b' : '#9ca3af',
                  letterSpacing: '2px'
                }}>
                  {formatDateHeader(dateKey)}
                </div>
                {isToday && (
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-data)',
                    letterSpacing: '2px',
                    color: '#f59e0b',
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '3px 10px',
                    borderRadius: '3px'
                  }}>
                    TODAY
                  </span>
                )}
              </div>

              {/* Registered releases */}
              {registered.map((rel, idx) => (
                <CalendarEntry
                  key={`${rel.release_id}-${idx}`}
                  release={rel}
                  categories={registry.categories}
                  dimmed={isDimmed(rel)}
                />
              ))}

              {/* Other (unregistered) releases */}
              {unregistered.length > 0 && (
                <div style={{ padding: '0 16px 8px' }}>
                  <button
                    onClick={() => setExpandedOther(prev => ({
                      ...prev,
                      [dateKey]: !prev[dateKey]
                    }))}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4b5563',
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'var(--font-data)',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      padding: '8px 0',
                      minHeight: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span style={{
                      fontSize: '8px',
                      transform: expandedOther[dateKey] ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.15s ease',
                      display: 'inline-block'
                    }}>▶</span>
                    OTHER FRED RELEASES ({unregistered.length})
                  </button>
                  {expandedOther[dateKey] && (
                    <div style={{ paddingLeft: '14px' }}>
                      {unregistered.map((rel, idx) => (
                        <div
                          key={`other-${rel.release_id}-${idx}`}
                          style={{
                            padding: '5px 0',
                            fontSize: 'var(--text-sm)',
                            color: '#4b5563',
                            opacity: isDimmed(rel) ? 0.35 : 1
                          }}
                        >
                          {rel.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Bottom padding */}
        <div style={{ height: '40px' }} />
      </div>
    </div>
  );
};
