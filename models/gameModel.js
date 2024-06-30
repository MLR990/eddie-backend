const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  natStatCode: {
    type: String,
    required: [true, 'A game must have a nat stat code'],
  },
  homeTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
  },
  homeScore: {
    type: Number,
  },
  awayTeam: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
  },
  awayScore: {
    type: Number,
  },

  gameStatus: {
    type: String,
  },
  overtime: {
    type: String,
  },
  winner: {
    type: String,
  },
  loser: {
    type: String,
  },
  gameDay: {
    type: String,
  },
  gameNumber: {
    type: String,
  },
  venue: {
    type: mongoose.Schema.ObjectId,
    ref: 'Venue',
  },
  season: {
    type: Number,
  },
  league: {
    type: mongoose.Schema.ObjectId,
    ref: 'League',
    required: [true, 'A game must belong to a league'],
  },
});

gameSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'league',
    select: 'name',
  });
  this.populate({
    path: 'homeTeam',
    select: ['name', 'code', 'color1', 'color2', 'color3', 'colorText'],
  });
  this.populate({
    path: 'awayTeam',
    select: ['name', 'code', 'color1', 'color2', 'color3', 'colorText'],
  });
  this.populate({
    path: 'venue',
    select: ['name', 'location', 'latitude', 'longitude', 'capacity'],
  });
  next();
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
