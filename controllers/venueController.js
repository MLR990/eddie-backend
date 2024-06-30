const Venue = require('../models/venueModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllVenues = async (req, res) => {
  try {
    const results = new APIFeatures(Venue.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const venues = await results.query;

    res.status(200).json({
      status: 'success',
      results: venues.length,
      requestedAt: req.requestTime,
      data: {
        venues,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: 'Something went awry' });
  }
};

exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        venue,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: 'Something went awry' });
  }
};

exports.addVenue = async (req, res) => {
  try {
    const newVenue = await Venue.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        venue: newVenue,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const venue = await Venue.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        venue,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail to Update', message: err });
  }
};
exports.deleteVenue = async (req, res) => {
  try {
    await Venue.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: err });
  }
};
