const Review = require('../models/Review');
const Destination = require('../models/Destination');

// @desc    Get reviews for destination
// @route   GET /api/reviews/destination/:destId
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ destination: req.params.destId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res) => {
  try {
    const reviewData = { ...req.body, user: req.user.id };
    const review = await Review.create(reviewData);

    // Update destination rating
    const allReviews = await Review.find({ destination: review.destination });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    await Destination.findByIdAndUpdate(review.destination, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: allReviews.length,
    });

    const populatedReview = await Review.findById(review._id).populate('user', 'name avatar');
    res.status(201).json({ success: true, review: populatedReview });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this destination' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    let review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    const destId = review.destination;
    await Review.findByIdAndDelete(req.params.id);

    // Update destination rating
    const allReviews = await Review.find({ destination: destId });
    const avgRating =
      allReviews.length > 0
        ? allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length
        : 0;
    await Destination.findByIdAndUpdate(destId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: allReviews.length,
    });

    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
