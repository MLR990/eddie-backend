const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  gamesForPlayerIndex: {
    type: Number,
    default: 0,
  },
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
