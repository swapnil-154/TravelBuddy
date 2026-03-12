const mongoose = require('mongoose');

const UserPreferenceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    favoriteDestinations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
      },
    ],
    travelStyle: {
      type: String,
      enum: ['adventure', 'luxury', 'budget', 'cultural', 'family', 'solo', 'romantic'],
      default: 'adventure',
    },
    budgetRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 5000 },
      currency: { type: String, default: 'USD' },
    },
    preferredActivities: [{ type: String }],
    preferredClimate: [{ type: String }],
    notifications: {
      email: { type: Boolean, default: true },
      deals: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserPreference', UserPreferenceSchema);
