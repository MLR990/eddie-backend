const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  natStatCode: {
    type: String,
    required: [true, 'A league must have a name'],
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  description: {
    type: String,
  },
  homeOfThe: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  yearOpened: {
    type: Number,
  },
  yearClosed: {
    type: Number,
  },
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
