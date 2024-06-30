const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A league must have a name'],
  },
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;
