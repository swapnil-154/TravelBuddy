const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  time: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  cost: { type: Number, default: 0 },
  type: {
    type: String,
    enum: ['sightseeing', 'food', 'transport', 'accommodation', 'activity', 'other'],
    default: 'activity',
  },
});

const DaySchema = new mongoose.Schema({
  dayNumber: { type: Number, required: true },
  date: { type: Date },
  title: { type: String },
  notes: { type: String },
  activities: [ActivitySchema],
});

const ItinerarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Trip title is required'],
      trim: true,
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destination',
    },
    destinationName: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    days: [DaySchema],
    budget: {
      total: { type: Number, default: 0 },
      spent: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    travelers: [
      {
        name: { type: String },
        email: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ['planning', 'confirmed', 'ongoing', 'completed', 'cancelled'],
      default: 'planning',
    },
    notes: { type: String },
    coverImage: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Itinerary', ItinerarySchema);
