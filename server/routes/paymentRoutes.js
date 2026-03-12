const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);

module.exports = router;
