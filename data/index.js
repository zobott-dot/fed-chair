// Data Access Layer - API-ready facade
// Currently returns static data, can be replaced with fetch() calls

window.FedChair = window.FedChair || {};
window.FedChair.Data = window.FedChair.Data || {};

window.FedChair.Data.API = {
  /**
   * Get current economic indicators and market data
   * @param {boolean} useLiveData - If true, attempt to fetch from FRED first
   * @returns {Promise<Object>} Economic data object
   */
  async getEconomicData(useLiveData) {
    if (useLiveData && window.FedChair.Data.fetchFredData) {
      try {
        const liveData = await window.FedChair.Data.fetchFredData();
        if (liveData) return liveData;
      } catch (err) {
        console.warn('FRED data fetch failed, using fallback:', err.message);
      }
    }
    return window.FedChair.Data.economicData;
  },

  /**
   * Get FOMC statement phrase options
   * @returns {Promise<Object>} Statement phrases by category
   */
  async getStatementPhrases() {
    // Future: return fetch('/api/statement-phrases').then(r => r.json())
    return window.FedChair.Data.statementPhrases;
  },

  /**
   * Get Board of Governors members
   * @returns {Promise<Array>} Array of governor objects
   */
  async getBoardOfGovernors() {
    // Future: return fetch('/api/fomc/governors').then(r => r.json())
    return window.FedChair.Data.boardOfGovernors;
  },

  /**
   * Get Regional Fed Presidents
   * @returns {Promise<Array>} Array of president objects
   */
  async getRegionalPresidents() {
    // Future: return fetch('/api/fomc/presidents').then(r => r.json())
    return window.FedChair.Data.regionalPresidents;
  },

  /**
   * Get current news headlines
   * @returns {Promise<Array>} Array of headline objects
   */
  async getNewsHeadlines() {
    // Future: return fetch('/api/news').then(r => r.json())
    return window.FedChair.Data.newsHeadlines;
  },

  /**
   * Get all game data in one call
   * @param {boolean} useLiveData - If true, attempt to fetch from FRED first
   * @returns {Promise<Object>} All data needed for the game
   */
  async getAllGameData(useLiveData) {
    const [economicData, statementPhrases, boardOfGovernors, regionalPresidents, newsHeadlines] =
      await Promise.all([
        this.getEconomicData(useLiveData),
        this.getStatementPhrases(),
        this.getBoardOfGovernors(),
        this.getRegionalPresidents(),
        this.getNewsHeadlines()
      ]);

    return {
      economicData,
      statementPhrases,
      boardOfGovernors,
      regionalPresidents,
      newsHeadlines
    };
  }
};
