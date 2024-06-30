const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A player must have a name'],
    },
    natStatCode: {
      type: String,
      required: [true, 'A player must have a natStat code'],
      min: 0,
      max: 99,
    },
    number: {
      type: Number,
      min: 0,
      max: 99,
    },
    team: {
      type: mongoose.Schema.ObjectId,
      ref: 'Team',
    },
    careerStart: {
      type: Number,
    },
    dateOfBirth: {
      type: String,
    },
    height: {
      type: String,
    },
    hometown: {
      type: String,
    },
    nationality: {
      type: String,
    },
    league: {
      type: mongoose.Schema.ObjectId,
      ref: 'League',
      required: [true, 'A player must belong to a league'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

playerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'league',
    select: 'name',
  });

  next();
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
