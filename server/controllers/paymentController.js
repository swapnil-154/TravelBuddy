const Booking = require('../models/Booking');

// Initialize Stripe if configured
const getStripe = () => {
  if (process.env.STRIPE_SECRET_KEY) {
    return require('stripe')(process.env.STRIPE_SECRET_KEY);
  }
  return null;
};

// Generate a unique mock payment ID for demo/development mode
const generateMockPaymentId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 11);
  return 'mock_pi_' + timestamp + randomPart;
};

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', bookingId } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    const stripe = getStripe();

    // Check if Stripe is configured
    if (!stripe) {
      // Return a mock payment intent for development/demo
      console.log('[Payment] Stripe not configured. Returning mock payment intent.');
      const mockPaymentId = generateMockPaymentId();
      return res.json({
        success: true,
        clientSecret: 'mock_secret_' + mockPaymentId,
        paymentId: mockPaymentId,
        mock: true,
        message: 'Stripe not configured. Using mock payment for demo.',
      });
    }

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

    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ success: false, message: 'Stripe not configured' });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentId);

    if (paymentIntent.status === 'succeeded') {
      if (bookingId) {
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
