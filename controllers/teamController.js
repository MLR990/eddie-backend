const Team = require('../models/teamModel');

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({
      status: 'success',
      results: teams.length,
      requestedAt: req.requestTime,
      data: {
        teams,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: 'Something went awry' });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        team,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: 'Something went awry' });
  }
};

exports.addTeam = async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        team: newTeam,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        team,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: err });
  }
};
exports.deleteTeam = async (req, res) => {
  try {
    await Team.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: err });
  }
};
