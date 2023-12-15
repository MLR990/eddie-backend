const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A team must have a name'],
    unique: true,
  },
  city: {
    type: String,
    required: [true, 'A team must have a city'],
  },
  championships: { type: Number, default: 0 },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
