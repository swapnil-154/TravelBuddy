const Destination = require('../models/Destination');
const Review = require('../models/Review');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    const { category, featured, sort, limit = 12, page = 1 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';

    const skip = (Number(page) - 1) * Number(limit);
    let sortObj = { createdAt: -1 };
    if (sort === 'rating') sortObj = { rating: -1 };
    if (sort === 'cost-asc') sortObj = { averageCost: 1 };
    if (sort === 'cost-desc') sortObj = { averageCost: -1 };

    const total = await Destination.countDocuments(query);
    const destinations = await Destination.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: destinations.length,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      destinations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search destinations
// @route   GET /api/destinations/search
// @access  Public
exports.searchDestinations = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.json({ success: true, destinations: [] });

    const destinations = await Destination.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { country: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    }).limit(10);

    res.json({ success: true, destinations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create destination (admin)
// @route   POST /api/destinations
// @access  Private/Admin
exports.createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update destination (admin)
// @route   PUT /api/destinations/:id
// @access  Private/Admin
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, destination });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete destination (admin)
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, message: 'Destination deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
