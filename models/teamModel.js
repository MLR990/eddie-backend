const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true, 'A team must have an ID'],
  },
  league: {
    type: String,
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
    required: [true, 'A team must have a city'],
    trim: true,
  },
  nickname: {
    type: String,
    required: [true, 'A team must have a nickname'],
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
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
