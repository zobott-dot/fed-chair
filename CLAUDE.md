# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fed Chair: The War Room is a browser-based simulation game where players act as Federal Reserve Chair, making interest rate decisions and crafting FOMC statements. The game simulates market reactions based on player decisions.

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
    economicData.js       # Current economic indicators, market data
    constants.js          # Statement phrases, FOMC members, news headlines
    index.js              # Data access layer (API-ready async facade)
  /engine
    index.js              # Engine namespace setup
    marketReaction.js     # Market simulation logic
    scoring.js            # Performance grading and hawk/dove scoring
  /components
    LoadingScreen.js      # Initial loading animation
    Header.js             # Header, nav tabs, meeting banner, footer
    Dashboard.js          # Economic data view (inflation, employment, FOMC, markets)
    DecisionPanel.js      # Rate selection and statement builder
    Aftermath.js          # Market reaction display and scorecard
    App.js                # Main component with state management
```

### Module Pattern

All modules attach to the `window.FedChair` global namespace:
- `window.FedChair.Data` - Data layer (economicData, constants, API facade)
- `window.FedChair.Engine` - Game logic (calculateMarketReaction, calculateScore)
- `window.FedChair.Components` - React components

Plain JS files load first, then JSX components via `<script type="text/babel" src="...">`.

### Data Layer (API-Ready)

The data layer uses async methods even for static data, enabling seamless API integration:

```javascript
// Currently returns static data, can be swapped for fetch() calls
const data = await window.FedChair.Data.API.getAllGameData();
```

## Development

To run locally, serve the directory with any static file server:

```bash
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000 in a browser.

## Key Files

- **data/index.js** - API facade with `getAllGameData()`, `getEconomicData()`, etc.
- **engine/marketReaction.js** - `calculateMarketReaction()` computes simulated market moves
- **engine/scoring.js** - `calculateScore()` grades player performance
- **components/App.js** - Main component with all state hooks and view routing
