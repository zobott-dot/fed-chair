# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fed Chair: The War Room is a browser-based simulation game where players act as Federal Reserve Chair across 8 FOMC meetings (1 year). Players make interest rate decisions and craft statements while the economy evolves with lagged effects, random shocks, and persistent consequences.

## Architecture

This is a **multi-file web application** with no build system. Everything runs client-side:

- **React 18** loaded via CDN (production build)
- **Tailwind CSS** loaded via CDN
- **Babel standalone** for JSX transformation in-browser
- No bundler, no npm, no server required

### Directory Structure

```
/fed-chair
  index.html              # Entry point - loads CDN scripts and local modules
  /css
    styles.css            # Animations, responsive grids, scrollbar styling
  /data
    economicData.js       # Starting economic indicators, market data
    constants.js          # Statement phrases, FOMC members, news headlines
    index.js              # Data access layer (API-ready async facade)
  /engine
    index.js              # Engine namespace setup
    marketReaction.js     # Immediate market response to decisions
    scoring.js            # Per-meeting performance grading
    simulation.js         # Multi-round simulation engine (GameState, lagged effects, shocks)
  /components
    LoadingScreen.js      # Initial loading animation
    Header.js             # Header, nav tabs, meeting banner, new game button
    Dashboard.js          # Economic data view with "Since Last Meeting" changes
    DecisionPanel.js      # Rate selection and statement builder
    Aftermath.js          # Market reaction, scorecard, game over screen
    App.js                # Main component with GameState management
```

### Module Pattern

All modules attach to the `window.FedChair` global namespace:
- `window.FedChair.Data` - Data layer (economicData, constants, API facade)
- `window.FedChair.Engine` - Game logic (simulation, marketReaction, scoring)
- `window.FedChair.Components` - React components

Plain JS files load first, then JSX components via `<script type="text/babel" src="...">`.

## Simulation Engine

The core game logic lives in `engine/simulation.js`. Key concepts:

### GameState
Persistent state across all 8 meetings:
- `meetingNumber`, `currentRate`, `rateHistory`
- `economy` (gdpGrowth, cpiInflation, pceInflation, unemploymentRate, payrollsChange)
- `markets` (sp500, vix, treasury10y, treasury2y, dxy)
- `credibility` (0-100, affects market sensitivity)
- `pendingEffects` (queued rate effects waiting to take effect)
- `activeShocks` (ongoing economic events)

### Lagged Effects
Rate changes don't affect the economy immediately:
- Effects are queued when a decision is made
- Partial effect at meeting +2, full effect at meeting +3
- This forces players to think ahead

### Economic Evolution
Between meetings, indicators evolve via `evolveEconomy()`:
- GDP mean-reverts toward 2% with noise
- Inflation has momentum (sticky)
- Unemployment correlates inversely with GDP
- Markets drift based on economic conditions

### Random Shocks
9 shock types defined in `SHOCK_TYPES`:
- oil_spike, banking_stress, trade_disruption, labor_surge, tech_selloff, inflation_surprise, growth_scare, consumer_strength, housing_cooldown
- Each has probability, effects, duration, and headline

### Win/Lose Conditions
Checked via `checkWinLoseConditions()`:
- **Win (Soft Landing)**: PCE 1.5-3%, GDP > 0%, unemployment < 6%, credibility > 50
- **Lose**: Recession (GDP < -0.5% for 2 meetings), runaway inflation (> 4%), stagflation, credibility collapse (< 20)
- **Draw**: Avoided losing but didn't achieve soft landing

### Key Functions
- `createGameState(startingData)` - Initialize new game
- `advanceToNextMeeting(gameState, decision, hawkScore, reaction, score)` - Main simulation step
- `applyLaggedEffects(gameState)` - Process pending rate effects
- `evolveEconomy(gameState)` - Natural economic drift
- `rollForShocks(gameState)` - Generate random events
- `gameStateToEconomicData(gameState)` - Convert to component format

## Development

To run locally, serve the directory with any static file server:

```bash
python3 -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000 in a browser.

## Key Files

- **engine/simulation.js** - Core simulation engine, GameState management, lagged effects
- **engine/marketReaction.js** - `calculateMarketReaction()` for immediate market response
- **engine/scoring.js** - `calculateScore()` grades each meeting
- **components/App.js** - Main component, integrates simulation with React state
- **components/Aftermath.js** - Handles "Next Meeting" flow and game over screen
