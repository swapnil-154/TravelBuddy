const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['flight', 'hotel'],
      required: true,
    },
    details: {
      // Flight details
      airline: { type: String },
      flightNumber: { type: String },
      from: { type: String },
      to: { type: String },
      departureTime: { type: Date },
      arrivalTime: { type: Date },
      class: { type: String },
      passengers: { type: Number },
      // Hotel details
      hotelName: { type: String },
      hotelAddress: { type: String },
      checkIn: { type: Date },
      checkOut: { type: Date },
      roomType: { type: String },
      guests: { type: Number },
      // Common
      image: { type: String },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    totalCost: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
    },
    paymentId: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
  },
  { timestamps: true }
);

BookingSchema.pre('save', function (next) {
  if (!this.confirmationCode) {
    this.confirmationCode =
      'TB' +
      Date.now().toString(36).toUpperCase() +
      Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

module.exports = mongoose.model('Booking', BookingSchema);
