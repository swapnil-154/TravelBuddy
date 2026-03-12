const express = require('express');
const router = express.Router();
const hotelService = require('../services/hotelService');

// @route   GET /api/hotels/search
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { destination, checkIn, checkOut, guests, rooms } = req.query;
    if (!destination) {
      return res.status(400).json({ success: false, message: 'Destination is required' });
    }
    const hotels = await hotelService.searchHotels({ destination, checkIn, checkOut, guests, rooms });
    res.json({ success: true, count: hotels.length, hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
