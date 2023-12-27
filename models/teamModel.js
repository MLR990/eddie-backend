const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true, 'A team must have an ID'],
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
    // required: [true, 'A team must have a primary color'],
    trim: true,
  },
  color2: {
    type: String,
    // required: [true, 'A team must have a secondary color'],
    trim: true,
  },
  color3: {
    type: String,
    trim: true,
  },
  colorText: {
    type: String,
    // required: [true, 'A team must have a text color'],
    trim: true,
  },
  championships: { type: Number, default: 0 },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
