const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBookingStatus,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', getBookings);
router.get('/:id', getBooking);
router.post('/', createBooking);
router.put('/:id/status', updateBookingStatus);

module.exports = router;
