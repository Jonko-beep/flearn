// FLearn simulated market — static ticker universe.
// basePrice anchors the seeded price simulation in src/lib/prices.js;
// volatility is the max daily move (fraction) used by the random walk.

export const stocks = [
  { ticker: "AAPL", name: "Apple", sector: "Technology", basePrice: 232.5, volatility: 0.022 },
  { ticker: "MSFT", name: "Microsoft", sector: "Technology", basePrice: 428.9, volatility: 0.02 },
  { ticker: "GOOGL", name: "Alphabet", sector: "Communication Services", basePrice: 176.4, volatility: 0.022 },
  { ticker: "AMZN", name: "Amazon", sector: "Consumer Discretionary", basePrice: 205.1, volatility: 0.024 },
  { ticker: "NVDA", name: "NVIDIA", sector: "Technology", basePrice: 134.8, volatility: 0.035 },
  { ticker: "TSLA", name: "Tesla", sector: "Consumer Discretionary", basePrice: 248.6, volatility: 0.04 },
  { ticker: "JPM", name: "JPMorgan Chase", sector: "Financials", basePrice: 211.3, volatility: 0.016 },
  { ticker: "V", name: "Visa", sector: "Financials", basePrice: 284.7, volatility: 0.014 },
  { ticker: "JNJ", name: "Johnson & Johnson", sector: "Healthcare", basePrice: 153.2, volatility: 0.011 },
  { ticker: "PG", name: "Procter & Gamble", sector: "Consumer Staples", basePrice: 169.8, volatility: 0.01 },
  { ticker: "KO", name: "Coca-Cola", sector: "Consumer Staples", basePrice: 63.4, volatility: 0.009 },
  { ticker: "PEP", name: "PepsiCo", sector: "Consumer Staples", basePrice: 171.9, volatility: 0.01 },
  { ticker: "WMT", name: "Walmart", sector: "Consumer Staples", basePrice: 84.6, volatility: 0.012 },
  { ticker: "DIS", name: "Disney", sector: "Communication Services", basePrice: 96.3, volatility: 0.02 },
  { ticker: "NFLX", name: "Netflix", sector: "Communication Services", basePrice: 692.4, volatility: 0.026 },
  { ticker: "SCHD", name: "Schwab US Dividend Equity ETF", sector: "Index Funds & ETFs", basePrice: 28.4, volatility: 0.008 },
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", sector: "Index Funds & ETFs", basePrice: 521.7, volatility: 0.01 },
  { ticker: "SPY", name: "SPDR S&P 500 ETF", sector: "Index Funds & ETFs", basePrice: 566.2, volatility: 0.01 },
  { ticker: "GLD", name: "SPDR Gold Shares", sector: "Tangible Assets", basePrice: 246.8, volatility: 0.011 },
  { ticker: "SLV", name: "iShares Silver Trust", sector: "Tangible Assets", basePrice: 28.1, volatility: 0.019 },
];

export const sectorColors = {
  Technology: "#0EA5E9",
  "Communication Services": "#6366F1",
  "Consumer Discretionary": "#EC4899",
  Financials: "#7C3AED",
  Healthcare: "#059669",
  "Consumer Staples": "#F59E0B",
  "Index Funds & ETFs": "#0D9488",
  "Tangible Assets": "#D97706",
};

export function getStock(ticker) {
  return stocks.find((s) => s.ticker === ticker) ?? null;
}
