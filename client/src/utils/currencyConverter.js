const rates = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, AUD: 1.53,
  CAD: 1.36, CHF: 0.89, CNY: 7.24, INR: 83.12, MXN: 17.15,
  BRL: 4.97, SGD: 1.34, HKD: 7.82, KRW: 1325.0, THB: 35.1,
  AED: 3.67, SAR: 3.75, NOK: 10.55, SEK: 10.42, DKK: 6.89,
};

export const convert = (amount, from, to) => {
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  return Number(((amount / fromRate) * toRate).toFixed(2));
};

export const getRate = (from, to) => {
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;
  return Number((toRate / fromRate).toFixed(4));
};

export const getCurrencies = () => Object.keys(rates);

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};
