import React, { useState, useEffect, useCallback } from 'react';
import api from '../../services/api';
import { getCurrencies, convert as localConvert } from '../../utils/currencyConverter';
import './CurrencyConverter.css';

const RATE_REFRESH_INTERVAL = 60 * 60 * 1000; // Refresh rates every hour

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [rates, setRates] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRates = useCallback(async () => {
    try {
      const { data } = await api.get('/currency/rates');
      if (data.success && data.rates) {
        setRates(data.rates);
        setLastUpdated(data.lastUpdated);
      }
    } catch (err) {
      console.error('Failed to fetch live rates, using local fallback');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, RATE_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const currencies = rates ? Object.keys(rates).sort() : getCurrencies();

  const convertAmount = (amt, from, to) => {
    if (rates && rates[from] && rates[to]) {
      const fromRate = rates[from];
      const toRate = rates[to];
      return Number(((amt / fromRate) * toRate).toFixed(2));
    }
    return localConvert(amt, from, to);
  };

  const result = convertAmount(amount, fromCurrency, toCurrency);
  const rate = convertAmount(1, fromCurrency, toCurrency);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const date = new Date(lastUpdated);
    return date.toLocaleString();
  };

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <h4><i className="fas fa-exchange-alt me-2"></i>Currency Converter</h4>
        <p className="converter-subtitle">
          {loading ? 'Loading rates...' : 'Live exchange rates'}
        </p>
      </div>

      <div className="converter-body">
        <div className="converter-field">
          <label>Amount</label>
          <input
            type="number"
            className="converter-input"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min="0"
            step="0.01"
          />
        </div>

        <div className="converter-currencies">
          <div className="converter-field">
            <label>From</label>
            <select
              className="converter-select"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <button className="swap-btn" onClick={swapCurrencies} title="Swap currencies">
            <i className="fas fa-exchange-alt"></i>
          </button>

          <div className="converter-field">
            <label>To</label>
            <select
              className="converter-select"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="converter-result">
          <div className="result-from">
            <span className="result-amount">{amount.toLocaleString()}</span>
            <span className="result-currency">{fromCurrency}</span>
          </div>
          <div className="result-arrow">
            <i className="fas fa-equals"></i>
          </div>
          <div className="result-to">
            <span className="result-amount gradient-text">{result.toLocaleString()}</span>
            <span className="result-currency">{toCurrency}</span>
          </div>
        </div>

        <div className="converter-rate">
          <i className="fas fa-info-circle me-1"></i>
          1 {fromCurrency} = {rate} {toCurrency}
          {lastUpdated && (
            <span className="rate-update ms-2">• Updated: {formatLastUpdated()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
