const fs = require('fs');

const teams = JSON.parse(fs.readFileSync(`${__dirname}/../data/teams.json`));

exports.checkId = (req, res, next, val) => {
  if (req.params.id * 1 > teams.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.city || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing city or name.',
    });
  }
  next();
};

exports.getAllTeams = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: teams.length,
    requestedAt: req.requestTime,
    data: {
      teams,
    },
  });
};
exports.getTeam = (req, res) => {
  const id = req.params.id * 1;
  const team = teams.find((x) => x.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      team,
    },
  });
};

exports.addTeam = (req, res) => {
  const newId = teams[teams.length - 1].id + 1;
  const newTeam = Object.assign({ id: newId }, req.body);
  teams.push(newTeam);

  fs.writeFile(`${__dirname}/data/teams.json`, JSON.stringify(teams), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        team: newTeam,
      },
    });
  });
};
exports.updateTeam = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      team: `We're going as fast as we can god damnit`,
    },
  });
};
exports.deleteTeam = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
