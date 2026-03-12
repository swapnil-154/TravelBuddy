const User = require('../models/User');
const Booking = require('../models/Booking');
const Destination = require('../models/Destination');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await User.countDocuments(query);
    const users = await User.find(query).select('-password').sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({ success: true, count: users.length, total, pages: Math.ceil(total / Number(limit)), currentPage: Number(page), users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query).populate('user', 'name email role').sort({ createdAt: -1 }).skip(skip).limit(Number(limit));

    res.json({ success: true, count: bookings.length, total, pages: Math.ceil(total / Number(limit)), currentPage: Number(page), bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalDestinations = await Destination.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalCost' } } },
    ]);

    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);

    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const recentBookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(5);
    const recentUsers = await User.find().select('-password').sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalBookings,
        totalDestinations,
        totalRevenue: totalRevenue[0]?.total || 0,
        usersByRole,
        bookingsByStatus,
        recentBookings,
        recentUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin', 'agent'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update booking status (admin)
// @route   PUT /api/admin/bookings/:id/status
// @access  Private/Admin
exports.updateBookingStatusAdmin = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const update = {};
    if (status) update.status = status;
    if (paymentStatus) update.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(req.params.id, update, { new: true }).populate('user', 'name email');
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
