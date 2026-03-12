const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: [{ type: String }],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    popularActivities: [{ type: String }],
    averageCost: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    bestTimeToVisit: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    climate: {
      type: String,
    },
    category: {
      type: String,
      enum: ['beach', 'mountain', 'city', 'cultural', 'adventure', 'wildlife'],
      default: 'city',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

DestinationSchema.index({ name: 'text', country: 'text', description: 'text' });

module.exports = mongoose.model('Destination', DestinationSchema);
