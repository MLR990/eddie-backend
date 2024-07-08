const MissingPlayer = require('../models/missingPlayerModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllMissingPlayers = async (req, res, next) => {
  try {
    const results = new APIFeatures(MissingPlayer.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const missingPlayers = await results.query;

    res.status(200).json({
      status: 'success',
      results: missingPlayers.length,
      requestedAt: req.requestTime,
      data: {
        missingPlayers,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong getting missing Players',
    });
  }
};

exports.addMissingPlayer = async (req, res) => {
  try {
    const newPlayer = await MissingPlayer.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        player: newPlayer,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};
