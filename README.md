# Fed Chair: The War Room

A browser-based simulation where you serve as Federal Reserve Chair across 8 FOMC meetings. Set interest rates, craft policy statements, and try to achieve the elusive soft landing — while the economy fights back.

**[Play it now →](https://zobott-dot.github.io/fed-chair/)**

## What Is This?

You inherit an economy with 3.6% inflation, 4.3% unemployment, and a fed funds rate of 3.625%. Over the course of a year (8 meetings), you'll read Beige Book reports, parse conflicting economic signals, set rates, and choose your words carefully — because markets are listening to every phrase.

Your rate decisions take 2-3 meetings to hit the real economy. Shocks arrive without warning. Your credibility score determines whether markets trust your guidance or panic at every move. Cut too fast and inflation spirals. Hold too long and you tip into recession. Thread the needle and you get the soft landing.

## How to Play

1. **Read the briefing** — Beige Book district reports, staff forecasts, data releases, market positioning, and conflicting signals all inform your decision.
2. **Set your rate** — Cut 50bp, cut 25bp, hold, hike 25bp, or hike 50bp.
3. **Craft your statement** — Choose phrases about the economy, labor, inflation, and forward guidance. Your words have consequences.
4. **Watch the reaction** — Markets move, press conference questions probe your logic, and a scorecard grades your performance.
5. **Repeat** — The economy evolves, your past decisions create lagged effects, and the pressure builds through 8 meetings.

## Features

- **Multi-round simulation** with persistent economic state across meetings
- **Lagged monetary policy** — rate changes take 2-3 meetings to affect the economy
- **Dramatic arc** — early meetings are calm; late meetings bring compounding crises
- **Phillips curve dynamics** — low unemployment creates inflation pressure
- **Data revisions** — numbers you relied on may get revised between meetings
- **Forward guidance consequences** — contradicting your own statements costs credibility
- **Credibility system** — asymmetric (harder to build, easier to lose) with doom loop potential
- **Random shocks** — oil spikes, banking stress, trade disruptions, and more
- **Responsive design** — optimized typography for both desktop and mobile

## Win Conditions

- **Soft Landing**: PCE inflation 1.5–3%, GDP growth positive, unemployment below 6%, credibility above 50
- **Policy Failure**: Recession, runaway inflation, stagflation, or credibility collapse
- **Muddle Through**: You avoided catastrophe, but it wasn't pretty

## Running Locally

No build step required. Serve the directory with any static file server:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000 in your browser.

## Tech Stack

- React 18 (CDN)
- Tailwind CSS (CDN)
- Babel standalone (in-browser JSX)
- No bundler, no npm, no server-side code
- Three-font typography system: IBM Plex Sans (UI), IBM Plex Mono (data), Source Sans 3 (prose)

## Project Structure

```
├── index.html              Entry point
├── css/styles.css          Animations, responsive grids, type scale
├── components/             React components (JSX via Babel)
│   ├── App.js              Main game state management
│   ├── Briefing.js         Pre-meeting briefing materials
│   ├── Dashboard.js        Economic data overview
│   ├── DecisionPanel.js    Rate selection + statement builder
│   ├── Aftermath.js        Market reaction + scorecard
│   ├── Header.js           Navigation + meeting progress
│   └── LoadingScreen.js    Initial load animation
├── engine/                 Game logic (plain JS)
│   ├── simulation.js       Core simulation engine
│   ├── marketReaction.js   Market response calculations
│   ├── scoring.js          Per-meeting grading
│   └── briefing.js         Briefing content generation
└── data/                   Starting data + constants
    ├── economicData.js     Initial economic indicators
    ├── constants.js        Statement phrases, FOMC members
    └── briefingTemplates.js Beige Book + data release templates
```
