const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  league: {
    type: mongoose.Schema.ObjectId,
    ref: 'League',
    required: [true, 'A player must belong to a league'],
  },
  code: {
    type: String,
    required: [true, 'A team must have a code'],
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'A team must have a name'],
    trim: true,
  },
  city: {
    type: String,
    // required: [true, 'A team must have a city'],
    trim: true,
  },
  nickname: {
    type: String,
    // required: [true, 'A team must have a nickname'],
    trim: true,
  },
  color1: {
    type: String,
    trim: true,
  },
  color2: {
    type: String,
    trim: true,
  },
  color3: {
    type: String,
    trim: true,
  },
  colorText: {
    type: String,
    trim: true,
  },
  championships: { type: Number, default: 0 },
  venue: {
    type: mongoose.Schema.ObjectId,
    ref: 'Venue',
  },
});

teamSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'league',
    select: 'name',
  });
  this.populate({
    path: 'venue',
    select: ['name', 'location', 'latitude', 'longitude', 'capacity'],
  });

  next();
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
