// IntroStyles — Period-newspaper aesthetic for the Volcker Scenario Intro Reader
// Cream paper for sections 1-5, dark data panel for section 6

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.IntroStyles = {

  // ---- Color palette ----
  colors: {
    creamPaper: '#f4f1ea',
    darkerCream: '#ebe6d9',
    depthBg: '#e8e2ce',
    nearBlack: '#1a1815',
    secondary: '#5a5448',
    tertiary: '#7a6f5c',
    ruleLine: '#c4b896',
    oxblood: '#8a1a1a',
    doveGreen: '#3a5a3a',
    darkBg: '#1a1815',
    darkText: '#c4b896',
    darkTextLight: '#e8e2ce',
    darkTextMuted: '#a09680'
  },

  // ---- Font families ----
  fonts: {
    body: "'Source Serif 4', Georgia, serif",
    headline: "'Playfair Display', Georgia, serif",
    italic: "'Libre Caslon Text', Georgia, serif",
    data: "'IBM Plex Mono', monospace",
    label: "'Oswald', sans-serif"
  },

  // ---- Overlay container (full-screen) ----
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    background: '#0a0f1a'
  },

  // ---- Header bar (dark, matches game nav) ----
  headerBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'rgba(10, 15, 26, 0.98)',
    borderBottom: '1px solid rgba(75, 85, 99, 0.3)',
    backdropFilter: 'blur(10px)',
    flexShrink: 0,
    minHeight: '56px'
  },

  headerTitle: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '13px',
    letterSpacing: '2px',
    color: '#9ca3af',
    textTransform: 'uppercase'
  },

  closeButton: {
    padding: '8px 14px',
    background: 'rgba(75, 85, 99, 0.2)',
    border: '1px solid rgba(75, 85, 99, 0.4)',
    borderRadius: '4px',
    color: '#9ca3af',
    fontSize: '14px',
    cursor: 'pointer',
    minHeight: 'auto',
    letterSpacing: '1px',
    transition: 'all 0.15s ease'
  },

  // ---- Section selector (numbered indicators) ----
  selectorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  selectorButton: (isActive) => ({
    width: '36px',
    height: '36px',
    minHeight: 'auto',
    borderRadius: '4px',
    border: isActive ? '1px solid #8a1a1a' : '1px solid rgba(75, 85, 99, 0.3)',
    background: isActive ? 'rgba(138, 26, 26, 0.2)' : 'rgba(75, 85, 99, 0.1)',
    color: isActive ? '#e8e2ce' : '#6b7280',
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    fontWeight: isActive ? '500' : '400',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease',
    padding: 0
  }),

  selectorLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    letterSpacing: '1px',
    color: '#7a6f5c',
    textTransform: 'uppercase',
    marginLeft: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '160px'
  },

  // ---- Content area (scrollable) ----
  contentArea: (isDark) => ({
    flex: 1,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    background: isDark ? '#1a1815' : '#f4f1ea'
  }),

  contentInner: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '40px 24px 80px'
  },

  // ---- Section header (kicker, title, deck) ----
  kicker: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#8a1a1a',
    marginBottom: '12px'
  },

  sectionTitle: (isDark) => ({
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: 'clamp(32px, 6vw, 48px)',
    fontWeight: '700',
    color: isDark ? '#e8e2ce' : '#1a1815',
    lineHeight: 1.15,
    marginBottom: '12px'
  }),

  deck: (isDark) => ({
    fontFamily: "'Libre Caslon Text', Georgia, serif",
    fontSize: '18px',
    fontStyle: 'italic',
    color: isDark ? '#a09680' : '#5a5448',
    lineHeight: 1.5,
    marginBottom: '8px'
  }),

  conventions: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#7a6f5c',
    lineHeight: 1.5,
    marginBottom: '24px'
  },

  rule: {
    border: 'none',
    borderTop: '1px solid #c4b896',
    margin: '24px 0'
  },

  // ---- Body paragraphs ----
  paragraph: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '17px',
    lineHeight: 1.75,
    color: '#1a1815',
    marginBottom: '20px'
  },

  // Drop cap for first paragraph
  dropCapLetter: {
    float: 'left',
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '72px',
    lineHeight: '56px',
    paddingTop: '4px',
    paddingRight: '8px',
    color: '#8a1a1a',
    fontWeight: '700'
  },

  // ---- Pullquote ----
  pullquote: {
    borderLeft: '3px solid #8a1a1a',
    paddingLeft: '20px',
    margin: '32px 0',
    fontFamily: "'Libre Caslon Text', Georgia, serif",
    fontSize: '19px',
    fontStyle: 'italic',
    lineHeight: 1.6,
    color: '#1a1815'
  },

  pullquoteAttribution: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '13px',
    fontStyle: 'normal',
    color: '#7a6f5c',
    marginTop: '8px'
  },

  // ---- Depth panels (expandable) ----
  depthPanel: {
    background: '#e8e2ce',
    borderRadius: '6px',
    padding: '20px 24px',
    marginBottom: '20px',
    borderLeft: '3px solid #8a1a1a'
  },

  depthLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#8a1a1a',
    marginBottom: '6px'
  },

  depthTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '20px',
    fontWeight: '700',
    color: '#1a1815',
    lineHeight: 1.3,
    marginBottom: '16px'
  },

  depthParagraph: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#1a1815',
    marginBottom: '14px'
  },

  depthClose: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    letterSpacing: '1px',
    color: '#7a6f5c',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    marginTop: '4px',
    minHeight: 'auto'
  },

  // ---- Dossier cards (Section 3) ----
  groupHeader: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '14px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#8a1a1a',
    marginTop: '32px',
    marginBottom: '4px'
  },

  groupNote: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '13px',
    fontStyle: 'italic',
    color: '#7a6f5c',
    marginBottom: '16px'
  },

  card: (cardClass) => ({
    background: '#ebe6d9',
    borderRadius: '6px',
    padding: '16px 20px',
    marginBottom: '10px',
    cursor: 'pointer',
    borderLeft: cardClass === 'voting' ? '3px solid #8a1a1a'
      : cardClass === 'nonvoting' ? '3px solid #9ca3af'
      : '3px solid #4b5563',
    transition: 'background 0.15s ease'
  }),

  cardName: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1815',
    marginBottom: '2px'
  },

  cardRole: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '13px',
    color: '#5a5448',
    marginBottom: '8px'
  },

  cardTagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '8px'
  },

  cardTag: (tagType) => {
    let bg, color;
    switch (tagType) {
      case 'vote':
        bg = 'rgba(138, 26, 26, 0.12)';
        color = '#8a1a1a';
        break;
      case 'novote':
        bg = 'rgba(107, 114, 128, 0.12)';
        color = '#6b7280';
        break;
      case 'hawk':
        bg = 'rgba(138, 26, 26, 0.12)';
        color = '#8a1a1a';
        break;
      case 'dove':
        bg = 'rgba(58, 90, 58, 0.12)';
        color = '#3a5a3a';
        break;
      case 'mod':
        bg = 'rgba(90, 84, 72, 0.12)';
        color = '#5a5448';
        break;
      case 'civ':
      default:
        bg = 'rgba(75, 85, 99, 0.12)';
        color = '#4b5563';
        break;
    }
    return {
      fontFamily: "'Oswald', sans-serif",
      fontSize: '11px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      padding: '3px 8px',
      borderRadius: '3px',
      background: bg,
      color: color
    };
  },

  cardHook: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#5a5448',
    lineHeight: 1.5
  },

  cardDepth: {
    marginTop: '14px',
    paddingTop: '14px',
    borderTop: '1px solid #c4b896'
  },

  // ---- Condition cards (Section 5) ----
  conditionCard: (cardType) => ({
    background: cardType === 'win' ? 'rgba(58, 90, 58, 0.08)' : 'rgba(138, 26, 26, 0.08)',
    border: '1px solid ' + (cardType === 'win' ? 'rgba(58, 90, 58, 0.25)' : 'rgba(138, 26, 26, 0.25)'),
    borderRadius: '6px',
    padding: '16px 20px',
    marginBottom: '10px'
  }),

  conditionHeader: (cardType) => ({
    fontFamily: "'Oswald', sans-serif",
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: cardType === 'win' ? '#3a5a3a' : '#8a1a1a',
    marginBottom: '4px'
  }),

  conditionTitle: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '18px',
    fontWeight: '700',
    color: '#1a1815',
    marginBottom: '8px'
  },

  conditionText: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '14px',
    lineHeight: 1.6,
    color: '#5a5448'
  },

  // ---- Data panel (Section 6, dark theme) ----
  darkKicker: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#8a1a1a',
    marginBottom: '12px'
  },

  dataGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2px',
    marginBottom: '40px'
  },

  dataCell: (accent) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: 'rgba(232, 226, 206, 0.06)',
    borderBottom: '1px solid rgba(196, 184, 150, 0.1)'
  }),

  dataCellLabel: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '12px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: '#a09680'
  },

  dataCellValue: (accent) => ({
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '15px',
    fontWeight: '500',
    color: accent ? '#e8e2ce' : '#a09680'
  }),

  meetingScheduleHeader: {
    fontFamily: "'Oswald', sans-serif",
    fontSize: '13px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#a09680',
    marginBottom: '16px'
  },

  meetingRow: {
    display: 'flex',
    gap: '16px',
    padding: '12px 0',
    borderBottom: '1px solid rgba(196, 184, 150, 0.1)',
    alignItems: 'baseline'
  },

  meetingNumber: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '14px',
    fontWeight: '500',
    color: '#e8e2ce',
    minWidth: '24px'
  },

  meetingDate: {
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '13px',
    color: '#c4b896',
    minWidth: '160px'
  },

  meetingNote: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#7a6f5c',
    lineHeight: 1.5
  },

  darkCodaParagraph: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '15px',
    lineHeight: 1.7,
    color: '#a09680',
    marginBottom: '20px'
  },

  finalLine: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: '22px',
    fontWeight: '700',
    color: '#e8e2ce',
    lineHeight: 1.4,
    marginTop: '40px',
    paddingTop: '24px',
    borderTop: '1px solid rgba(196, 184, 150, 0.2)'
  }
};
