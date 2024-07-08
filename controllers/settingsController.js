const Settings = require('../models/settingsModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasCurrentGameIndex = (req, res, next) => {
  req.query.limit = 1;
  req.query.fields = 'gamesForPlayerIndex';
  next();
};

exports.getAllSettings = async (req, res) => {
  try {
    const results = new APIFeatures(Settings.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const settings = await results.query;

    res.status(200).json({
      status: 'success',
      results: settings.length,
      requestedAt: req.requestTime,
      data: {
        settings,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong fetching all leagues',
    });
  }
};

exports.addSettings = async (req, res) => {
  try {
    const newSettings = await Settings.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        settings: newSettings,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const settings = await Settings.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        settings,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail to Update', message: err });
  }
};
