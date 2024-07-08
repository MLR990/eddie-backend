const Player = require('../models/playerModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllPlayers = async (req, res, next) => {
  try {
    const results = new APIFeatures(Player.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const players = await results.query;

    res.status(200).json({
      status: 'success',
      results: players.length,
      requestedAt: req.requestTime,
      data: {
        players,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong getting players',
    });
  }
};

exports.getPlayer = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        player,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: 'Something went awry' });
  }
};

exports.addPlayer = async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        player: newPlayer,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const filter = { _id: req.params.id };

    const player = await Player.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        player,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail to Update', message: err });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: err });
  }
};
