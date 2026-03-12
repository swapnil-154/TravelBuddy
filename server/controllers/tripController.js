const Itinerary = require('../models/Itinerary');

// @desc    Get user trips
// @route   GET /api/trips
// @access  Private
exports.getTrips = async (req, res) => {
  try {
    const trips = await Itinerary.find({ user: req.user.id })
      .populate('destination', 'name country images')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: trips.length, trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Private
exports.getTrip = async (req, res) => {
  try {
    const trip = await Itinerary.findById(req.params.id).populate(
      'destination',
      'name country images'
    );
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res) => {
  try {
    const tripData = { ...req.body, user: req.user.id };
    const trip = await Itinerary.create(tripData);
    res.status(201).json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
exports.updateTrip = async (req, res) => {
  try {
    let trip = await Itinerary.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    trip = await Itinerary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ success: true, trip });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Itinerary.findById(req.params.id);
    if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Trip deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
