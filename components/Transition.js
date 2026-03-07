// Leadership Transition Interstitial Screen
// Shows between meetings 2 and 3 when Powell -> Warsh transition occurs

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.Transition = function({ onContinue }) {
  const [phase, setPhase] = React.useState(0);

  React.useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      setTimeout(() => setPhase(4), 4500)
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0f1a 0%, #0d1117 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e5e7eb',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* Date header */}
        <div style={{
          fontSize: '12px',
          letterSpacing: '3px',
          color: '#60a5fa',
          marginBottom: '40px',
          opacity: phase >= 0 ? 1 : 0,
          transition: 'opacity 0.8s ease'
        }}>
          MAY 2026
        </div>

        {/* Transition title */}
        <div style={{
          fontSize: 'clamp(20px, 4vw, 32px)',
          fontWeight: '200',
          fontFamily: 'var(--font-heading, "IBM Plex Sans", sans-serif)',
          color: '#f9fafb',
          marginBottom: '32px',
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease'
        }}>
          LEADERSHIP TRANSITION
        </div>

        {/* Narrative text */}
        <div style={{
          fontSize: 'var(--text-base, 14px)',
          fontFamily: 'var(--font-prose, "Source Sans 3", sans-serif)',
          color: '#9ca3af',
          lineHeight: '1.8',
          marginBottom: '40px',
          opacity: phase >= 2 ? 1 : 0,
          transform: phase >= 2 ? 'translateY(0)' : 'translateY(15px)',
          transition: 'opacity 1s ease, transform 1s ease'
        }}>
          <p style={{ marginBottom: '16px' }}>
            Chair Powell's term has concluded. After a contentious confirmation process,
            <span style={{ color: '#f9fafb', fontWeight: '500' }}> Kevin Warsh </span>
            has been sworn in as the 17th Chair of the Federal Reserve.
          </p>
          <p>
            Markets are watching closely. The committee dynamics may shift under new leadership,
            but the dual mandate remains the same: maximum employment and stable prices.
          </p>
        </div>

        {/* Divider */}
        <div style={{
          width: '80px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
          margin: '0 auto 32px',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 1s ease'
        }} />

        {/* New chair notice */}
        <div style={{
          fontSize: '11px',
          letterSpacing: '2px',
          color: '#6b7280',
          marginBottom: '8px',
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 0.6s ease'
        }}>
          YOU ARE NOW
        </div>
        <div style={{
          fontSize: 'clamp(16px, 3vw, 22px)',
          fontWeight: '500',
          color: '#f9fafb',
          marginBottom: '40px',
          opacity: phase >= 3 ? 1 : 0,
          transform: phase >= 3 ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease'
        }}>
          Chair Kevin Warsh
        </div>

        {/* Continue button */}
        {phase >= 4 && (
          <button
            onClick={onContinue}
            style={{
              padding: '16px 48px',
              fontSize: 'var(--text-base, 14px)',
              fontWeight: '500',
              letterSpacing: '2px',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
              opacity: 0,
              animation: 'fadeInUp 0.6s ease forwards'
            }}
          >
            CONTINUE TO MEETING 3
          </button>
        )}
      </div>
    </div>
  );
};
