const express = require('express');
const router = express.Router();
const currencyService = require('../services/currencyService');

// @route   GET /api/currency/rates
// @access  Public
router.get('/rates', (req, res) => {
  try {
    const { base } = req.query;
    const data = currencyService.getRates(base);
    res.json({ success: true, ...data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/currency/convert
// @access  Public
router.get('/convert', (req, res) => {
  try {
    const { amount, from, to } = req.query;
    if (!amount || !from || !to) {
      return res.status(400).json({ success: false, message: 'Amount, from, and to are required' });
    }
    const result = currencyService.convert(Number(amount), from, to);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
