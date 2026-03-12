const express = require('express');
const router = express.Router();
const flightService = require('../services/flightService');

// @route   GET /api/flights/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { from, to, date, passengers, class: cabinClass } = req.query;
    if (!from || !to || !date) {
      return res.status(400).json({ success: false, message: 'From, to, and date are required' });
    }
    const flights = await flightService.searchFlights({ from, to, date, passengers, cabinClass });
    res.json({ success: true, count: flights.length, flights });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
