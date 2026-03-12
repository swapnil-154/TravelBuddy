// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', bookingId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      // Return a mock payment intent for development/demo
      console.log('[Payment] Stripe not configured. Returning mock payment intent.');
      const mockPaymentId = 'mock_pi_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
      return res.json({
        success: true,
        clientSecret: 'mock_secret_' + mockPaymentId,
        paymentId: mockPaymentId,
        mock: true,
        message: 'Stripe not configured. Using mock payment for demo.',
      });
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        bookingId: bookingId || '',
        userId: req.user.id,
      },
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Confirm payment
// @route   POST /api/payments/confirm
// @access  Private
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId, bookingId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ success: false, message: 'Payment ID is required' });
    }

    // Mock confirmation for demo mode
    if (paymentId.startsWith('mock_pi_')) {
      console.log(`[Payment] Mock payment confirmed: ${paymentId}`);
      if (bookingId) {
        const Booking = require('../models/Booking');
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: 'paid',
          paymentId,
          status: 'confirmed',
        });
      }
      return res.json({
        success: true,
        status: 'succeeded',
        paymentId,
        mock: true,
      });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, message: 'Stripe not configured' });
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === 'succeeded') {
      if (bookingId) {
        const Booking = require('../models/Booking');
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: 'paid',
          paymentId: paymentIntent.id,
          status: 'confirmed',
        });
      }
    }

    res.json({
      success: true,
      status: paymentIntent.status,
      paymentId: paymentIntent.id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
