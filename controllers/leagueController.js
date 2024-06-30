const League = require('../models/leagueModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllLeagues = async (req, res) => {
  try {
    const results = new APIFeatures(League.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const leagues = await results.query;

    res.status(200).json({
      status: 'success',
      results: leagues.length,
      requestedAt: req.requestTime,
      data: {
        leagues,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong fetching all leagues',
    });
  }
};

exports.addLeague = async (req, res) => {
  try {
    const newLeague = await League.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        league: newLeague,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};
