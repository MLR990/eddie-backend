const mongoose = require('mongoose');

const missingPlayerSchema = new mongoose.Schema(
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

missingPlayerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'league',
    select: 'name',
  });

  next();
});

const MissingPlayer = mongoose.model('MissingPlayer', missingPlayerSchema);

module.exports = MissingPlayer;
