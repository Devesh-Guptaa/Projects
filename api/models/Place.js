const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
  },
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkout: Number,
  maxGuests: Number,
});

const PlaceModel = momgoose.model('Place', PlaceSchema);

module.exports = PlaceModel;
