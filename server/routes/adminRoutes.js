const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllBookings,
  getDashboardStats,
  updateUserRole,
  updateBookingStatusAdmin,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.use(protect, admin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/bookings', getAllBookings);
router.put('/users/:id/role', updateUserRole);
router.put('/bookings/:id/status', updateBookingStatusAdmin);

module.exports = router;
