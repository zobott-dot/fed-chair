// IntroSection — Renders a single section of the Volcker Scenario Intro
// Three rendering paths: editorial (1,2,4,5), dossier (3), data-panel (6)

window.FedChair = window.FedChair || {};
window.FedChair.Components = window.FedChair.Components || {};

window.FedChair.Components.IntroSection = function({ section, openDepths, toggleDepth, openCards, toggleCard }) {
  const S = window.FedChair.Components.IntroStyles;
  const isDark = section.type === 'data-panel';

  // ---- Render drop-cap paragraph ----
  function renderDropCap(html) {
    // Extract first character (skip leading HTML tags)
    const stripped = html.replace(/^<[^>]+>/, '');
    const firstChar = stripped.charAt(0);
    const rest = html.replace(/^(<[^>]+>)?[A-Za-z\u00C0-\u024F]/, '$1');
    return (
      <p style={S.paragraph}>
        <span style={S.dropCapLetter}>{firstChar}</span>
        <span dangerouslySetInnerHTML={{ __html: rest }} />
      </p>
    );
  }

  // ---- Render gateway spans with click handlers ----
  function renderParagraphWithGateways(html, blockIndex) {
    // Parse gateway spans and make them interactive
    const parts = [];
    let lastIdx = 0;
    const regex = /<span class="gateway" data-depth="([^"]+)">([^<]+)<\/span>/g;
    let match;

    while ((match = regex.exec(html)) !== null) {
      // Text before the gateway
      if (match.index > lastIdx) {
        parts.push(
          <span key={`pre-${blockIndex}-${lastIdx}`} dangerouslySetInnerHTML={{ __html: html.slice(lastIdx, match.index) }} />
        );
      }
      // The gateway itself
      const depthId = match[1];
      const term = match[2];
      const isOpen = openDepths[depthId];
      parts.push(
        <span
          key={`gw-${depthId}`}
          onClick={(e) => { e.stopPropagation(); toggleDepth(depthId); }}
          style={{
            borderBottom: isOpen ? '2px solid #8a1a1a' : '2px dotted #8a1a1a',
            color: '#1a1815',
            cursor: 'pointer',
            paddingBottom: '1px',
            transition: 'border-bottom 0.15s ease'
          }}
        >
          {term}
        </span>
      );
      lastIdx = match.index + match[0].length;
    }

    // Remaining text
    if (lastIdx < html.length) {
      parts.push(
        <span key={`post-${blockIndex}-${lastIdx}`} dangerouslySetInnerHTML={{ __html: html.slice(lastIdx) }} />
      );
    }

    return parts.length > 0 ? parts : <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  // ---- Section header (shared) ----
  function renderSectionHeader() {
    return (
      <div style={{ marginBottom: '32px' }}>
        <div style={isDark ? S.darkKicker : S.kicker}>{section.kicker}</div>
        <h2 style={S.sectionTitle(isDark)}>{section.title}</h2>
        <div style={S.deck(isDark)}>{section.deck}</div>
        {section.conventions && (
          <div style={S.conventions}>{section.conventions}</div>
        )}
        <hr style={{ ...S.rule, borderTopColor: isDark ? 'rgba(196, 184, 150, 0.2)' : '#c4b896' }} />
      </div>
    );
  }

  // ---- EDITORIAL rendering (Sections 1, 2, 4, 5) ----
  function renderEditorial() {
    const blocks = section.content.blocks;
    const rendered = [];

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];

      if (block.type === 'paragraph') {
        // Check if this paragraph contains gateways
        const hasGateways = block.text.includes('class="gateway"');

        if (block.isFirst) {
          if (hasGateways) {
            // Drop cap with gateways — render first char manually, rest with gateways
            const stripped = block.text.replace(/^<[^>]+>/, '');
            const firstChar = stripped.charAt(0);
            const rest = block.text.replace(/^(<[^>]+>)?[A-Za-z\u00C0-\u024F]/, '$1');
            rendered.push(
              <p key={`p-${i}`} style={S.paragraph}>
                <span style={S.dropCapLetter}>{firstChar}</span>
                {renderParagraphWithGateways(rest, i)}
              </p>
            );
          } else {
            rendered.push(<div key={`p-${i}`}>{renderDropCap(block.text)}</div>);
          }
        } else if (hasGateways) {
          rendered.push(
            <p key={`p-${i}`} style={S.paragraph}>
              {renderParagraphWithGateways(block.text, i)}
            </p>
          );
        } else {
          rendered.push(
            <p key={`p-${i}`} style={S.paragraph} dangerouslySetInnerHTML={{ __html: block.text }} />
          );
        }

        // After each paragraph that contains a gateway, check if we should render its depth panel
        if (hasGateways) {
          // Find all depth IDs referenced in this paragraph
          const gwRegex = /data-depth="([^"]+)"/g;
          let gwMatch;
          while ((gwMatch = gwRegex.exec(block.text)) !== null) {
            const depthId = gwMatch[1];
            // Find the corresponding depth block
            const depthBlock = blocks.find(b => b.type === 'depth' && b.id === depthId);
            if (depthBlock && openDepths[depthId]) {
              rendered.push(
                <div key={`depth-${depthId}`} style={S.depthPanel}>
                  <div style={S.depthLabel}>{depthBlock.label}</div>
                  <div style={S.depthTitle}>{depthBlock.title}</div>
                  {depthBlock.paragraphs.map((p, pi) => (
                    <p key={pi} style={S.depthParagraph} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                  <button
                    style={S.depthClose}
                    onClick={(e) => { e.stopPropagation(); toggleDepth(depthId); }}
                  >
                    Close &times;
                  </button>
                </div>
              );
            }
          }
        }
      } else if (block.type === 'pullquote') {
        rendered.push(
          <div key={`pq-${i}`} style={S.pullquote}>
            <div dangerouslySetInnerHTML={{ __html: block.text }} />
            <div style={S.pullquoteAttribution}>{block.attribution}</div>
          </div>
        );
      } else if (block.type === 'conditions') {
        // Section 5 condition cards
        rendered.push(
          <div key={`cond-${i}`} style={{ margin: '24px 0' }}>
            {block.cards.map((card, ci) => (
              <div key={ci} style={S.conditionCard(card.cardType)}>
                <div style={S.conditionHeader(card.cardType)}>{card.header}</div>
                <div style={S.conditionTitle}>{card.title}</div>
                <div style={S.conditionText}>{card.text}</div>
              </div>
            ))}
          </div>
        );
      }
      // Skip 'depth' blocks here — they're rendered inline after their parent paragraph
    }

    return rendered;
  }

  // ---- DOSSIER rendering (Section 3) ----
  function renderDossier() {
    const { intro, groups, pullquote, civilianGroups, coda } = section.content;

    function renderCard(card) {
      const isOpen = openCards[card.id];
      return (
        <div
          key={card.id}
          style={S.card(card.cardClass)}
          onClick={() => toggleCard(card.id)}
        >
          <div style={S.cardName}>{card.name}</div>
          <div style={S.cardRole}>{card.roleInline}</div>
          <div style={S.cardTagRow}>
            {card.tags.map((tag, ti) => (
              <span key={ti} style={S.cardTag(tag.type)}>{tag.label}</span>
            ))}
          </div>
          <div style={S.cardHook}>{card.hook}</div>
          {isOpen && card.depth && card.depth.length > 0 && (
            <div style={S.cardDepth}>
              {card.depth.map((p, pi) => (
                <p key={pi} style={S.depthParagraph} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
              <button
                style={S.depthClose}
                onClick={(e) => { e.stopPropagation(); toggleCard(card.id); }}
              >
                Close &times;
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <p style={S.paragraph}>{intro}</p>

        {groups.map((group, gi) => (
          <div key={gi}>
            <div style={S.groupHeader}>{group.header}</div>
            {group.note && <div style={S.groupNote}>{group.note}</div>}
            {group.cards.map(renderCard)}
          </div>
        ))}

        {pullquote && (
          <div style={S.pullquote}>
            <div>{pullquote.text}</div>
            <div style={S.pullquoteAttribution}>{pullquote.attribution}</div>
          </div>
        )}

        {civilianGroups && civilianGroups.map((group, gi) => (
          <div key={`civ-${gi}`}>
            <div style={S.groupHeader}>{group.header}</div>
            {group.cards.map(renderCard)}
          </div>
        ))}

        {coda && (
          <div>
            <hr style={S.rule} />
            <p style={{ ...S.paragraph, fontStyle: 'italic' }}>{coda}</p>
          </div>
        )}
      </div>
    );
  }

  // ---- DATA PANEL rendering (Section 6) ----
  function renderDataPanel() {
    const { conditions, meetings, codaParagraphs, finalLine } = section.content;

    return (
      <div>
        {/* Starting conditions grid */}
        <div style={S.dataGrid}>
          {conditions.map((cond, ci) => (
            <div key={ci} style={S.dataCell(cond.accent)}>
              <span style={S.dataCellLabel}>{cond.label}</span>
              <span style={S.dataCellValue(cond.accent)}>{cond.value}</span>
            </div>
          ))}
        </div>

        {/* Meeting schedule */}
        <div style={S.meetingScheduleHeader}>Meeting Schedule</div>
        {meetings.map((m, mi) => (
          <div key={mi} style={S.meetingRow}>
            <span style={S.meetingNumber}>{m.number}</span>
            <span style={S.meetingDate}>{m.date}</span>
            <span style={S.meetingNote}>{m.note}</span>
          </div>
        ))}

        {/* Coda */}
        <div style={{ marginTop: '40px' }}>
          {codaParagraphs.map((p, pi) => (
            <p key={pi} style={S.darkCodaParagraph} dangerouslySetInnerHTML={{ __html: p }} />
          ))}
        </div>

        {/* Final line */}
        <div style={S.finalLine}>{finalLine}</div>
      </div>
    );
  }

  // ---- Main render ----
  return (
    <div style={S.contentArea(isDark)}>
      <div style={S.contentInner}>
        {renderSectionHeader()}
        {section.type === 'editorial' && renderEditorial()}
        {section.type === 'dossier' && renderDossier()}
        {section.type === 'data-panel' && renderDataPanel()}
      </div>
    </div>
  );
};
