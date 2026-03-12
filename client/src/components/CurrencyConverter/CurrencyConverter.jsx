import React, { useState } from 'react';
import { convert, getCurrencies, formatCurrency } from '../../utils/currencyConverter';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const currencies = getCurrencies();

  const result = convert(amount, fromCurrency, toCurrency);
  const rate = convert(1, fromCurrency, toCurrency);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="currency-converter">
      <div className="converter-header">
        <h4><i className="fas fa-exchange-alt me-2"></i>Currency Converter</h4>
        <p className="converter-subtitle">Live exchange rates</p>
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
          <span className="rate-update ms-2">• Simulated rates</span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
