const axios = require('axios');

const EXCHANGE_RATE_API = 'https://open.er-api.com/v6/latest/USD';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Fallback rates used when the API is unreachable
const fallbackRates = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53,
  CAD: 1.36, CHF: 0.89, CNY: 7.24, INR: 83.12, MXN: 17.15,
  BRL: 4.97, SGD: 1.34, HKD: 7.82, KRW: 1325.0, THB: 35.1,
  AED: 3.67, SAR: 3.75, NOK: 10.55, SEK: 10.42, DKK: 6.89,
};

let cachedRates = { ...fallbackRates };
let lastFetchedAt = null;

const fetchLiveRates = async () => {
  // Return cached rates if they are still fresh
  if (lastFetchedAt && Date.now() - lastFetchedAt < CACHE_TTL_MS) {
    return;
  }

  try {
    const { data } = await axios.get(EXCHANGE_RATE_API, { timeout: 10000 });
    if (data && data.rates) {
      cachedRates = data.rates;
      lastFetchedAt = Date.now();
      console.log('Currency rates updated from live API');
    }
  } catch (error) {
    console.error('Failed to fetch live exchange rates, using cached/fallback rates:', error.message);
    // Keep using whatever rates we already have (cached or fallback)
  }
};

// Fetch rates on startup
fetchLiveRates();

// Refresh rates automatically every 24 hours
setInterval(fetchLiveRates, CACHE_TTL_MS);

const getCurrentRates = () => cachedRates;

exports.getRates = async (baseCurrency = 'USD') => {
  await fetchLiveRates();
  const rates = getCurrentRates();
  const base = rates[baseCurrency] || 1;
  const converted = {};
  Object.keys(rates).forEach((currency) => {
    converted[currency] = Number((rates[currency] / base).toFixed(4));
  });
  return {
    base: baseCurrency,
    rates: converted,
    lastUpdated: lastFetchedAt ? new Date(lastFetchedAt).toISOString() : new Date().toISOString(),
  };
};

exports.convert = async (amount, from, to) => {
  await fetchLiveRates();
  const rates = getCurrentRates();
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  const result = (amount / fromRate) * toRate;
  return {
    from,
    to,
    amount: Number(amount),
    result: Number(result.toFixed(2)),
    rate: Number((toRate / fromRate).toFixed(4)),
    lastUpdated: lastFetchedAt ? new Date(lastFetchedAt).toISOString() : new Date().toISOString(),
  };
};
