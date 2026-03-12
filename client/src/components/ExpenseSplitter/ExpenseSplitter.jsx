import React, { useState } from 'react';
import './ExpenseSplitter.css';

const ExpenseSplitter = () => {
  const [travelers, setTravelers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Hotel', amount: 600, paidBy: 1 },
    { id: 2, description: 'Flights', amount: 450, paidBy: 2 },
  ]);
  const [newTraveler, setNewTraveler] = useState('');
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', paidBy: 1 });

  const addTraveler = () => {
    if (newTraveler.trim()) {
      setTravelers([...travelers, { id: Date.now(), name: newTraveler.trim() }]);
      setNewTraveler('');
    }
  };

  const removeTraveler = (id) => {
    setTravelers(travelers.filter((t) => t.id !== id));
    setExpenses(expenses.filter((e) => e.paidBy !== id));
  };

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, id: Date.now(), amount: Number(newExpense.amount) }]);
      setNewExpense({ description: '', amount: '', paidBy: travelers[0]?.id || 1 });
    }
  };

  const removeExpense = (id) => setExpenses(expenses.filter((e) => e.id !== id));

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const perPerson = travelers.length > 0 ? totalExpense / travelers.length : 0;

  const calculateBalances = () => {
    const paid = {};
    travelers.forEach((t) => { paid[t.id] = 0; });
    expenses.forEach((e) => { paid[e.paidBy] = (paid[e.paidBy] || 0) + e.amount; });

    const balances = {};
    travelers.forEach((t) => {
      balances[t.id] = (paid[t.id] || 0) - perPerson;
    });
    return balances;
  };

  const balances = calculateBalances();

  return (
    <div className="expense-splitter">
      <div className="splitter-header">
        <h4><i className="fas fa-receipt me-2"></i>Expense Splitter</h4>
        <p>Split trip costs fairly among travelers</p>
      </div>

      <div className="splitter-body">
        {/* Travelers */}
        <div className="splitter-section">
          <h6 className="section-label">Travelers ({travelers.length})</h6>
          <div className="travelers-list">
            {travelers.map((t) => (
              <div key={t.id} className="traveler-chip">
                <span>{t.name.charAt(0).toUpperCase()}</span>
                <span>{t.name}</span>
                <button onClick={() => removeTraveler(t.id)}><i className="fas fa-times"></i></button>
              </div>
            ))}
          </div>
          <div className="add-row">
            <input
              type="text"
              className="add-input"
              placeholder="Add traveler name"
              value={newTraveler}
              onChange={(e) => setNewTraveler(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTraveler()}
            />
            <button className="add-btn" onClick={addTraveler}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Expenses */}
        <div className="splitter-section">
          <h6 className="section-label">Expenses</h6>
          {expenses.map((e) => (
            <div key={e.id} className="expense-row">
              <span className="expense-desc">{e.description}</span>
              <span className="expense-paid-by">
                by {travelers.find((t) => t.id === e.paidBy)?.name || 'Unknown'}
              </span>
              <span className="expense-amount">${e.amount}</span>
              <button className="remove-btn" onClick={() => removeExpense(e.id)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          ))}

          <div className="add-expense-form">
            <input
              type="text"
              className="add-input"
              placeholder="Description"
              value={newExpense.description}
              onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            />
            <input
              type="number"
              className="add-input"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <select
              className="add-select"
              value={newExpense.paidBy}
              onChange={(e) => setNewExpense({ ...newExpense, paidBy: Number(e.target.value) })}
            >
              {travelers.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <button className="add-btn" onClick={addExpense}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="splitter-summary">
          <div className="summary-total">
            <span>Total:</span>
            <span className="total-amount">${totalExpense.toFixed(2)}</span>
          </div>
          <div className="summary-per-person">
            <span>Per person:</span>
            <span className="per-amount">${perPerson.toFixed(2)}</span>
          </div>
        </div>

        {/* Balances */}
        <div className="splitter-section">
          <h6 className="section-label">Balances</h6>
          {travelers.map((t) => {
            const bal = balances[t.id] || 0;
            return (
              <div key={t.id} className="balance-row">
                <span className="balance-name">{t.name}</span>
                <span className={`balance-amount ${bal >= 0 ? 'positive' : 'negative'}`}>
                  {bal >= 0 ? `+$${bal.toFixed(2)} (gets back)` : `-$${Math.abs(bal).toFixed(2)} (owes)`}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExpenseSplitter;
