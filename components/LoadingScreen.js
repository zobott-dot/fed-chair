// Loading Screen Component

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.LoadingScreen = function() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 50%, #0d1117 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e5e7eb',
      padding: '20px'
    }}>
      <div style={{
        fontSize: 'clamp(28px, 8vw, 48px)',
        fontWeight: '200',
        letterSpacing: '4px',
        marginBottom: '16px',
        color: '#60a5fa',
        textAlign: 'center'
      }}>
        FED CHAIR
      </div>
      <div style={{
        fontSize: 'clamp(10px, 3vw, 14px)',
        letterSpacing: '3px',
        color: '#6b7280',
        marginBottom: '40px'
      }}>
        THE WAR ROOM
      </div>
      <div style={{
        width: 'min(200px, 60vw)',
        height: '2px',
        background: '#1f2937',
        borderRadius: '1px',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
          animation: 'loadingBar 1.8s ease-in-out forwards'
        }} />
      </div>
      <div style={{
        marginTop: '20px',
        fontSize: '11px',
        color: '#4b5563',
        fontFamily: '"IBM Plex Mono", monospace'
      }}>
        INITIALIZING...
      </div>
    </div>
  );
};
