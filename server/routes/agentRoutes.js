const express = require('express');
const router = express.Router();
const {
  getAgentStats,
  getAgentBookings,
  updateBookingStatusAgent,
} = require('../controllers/agentController');
const { protect, agent } = require('../middleware/auth');

router.use(protect, agent);

router.get('/stats', getAgentStats);
router.get('/bookings', getAgentBookings);
router.put('/bookings/:id/status', updateBookingStatusAgent);

module.exports = router;
