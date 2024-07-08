const Game = require('../models/gameModel');
const APIFeatures = require('../utils/apiFeatures');

const mainRoute = 'http://127.0.0.1:5000';

const getTodaysDate = (endDate) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  if (endDate) {
    return `${year}-${month}-${day} 23:59:00`;
  }
  return `${year}-${month}-${day}`;
};

exports.aliasTodaysGames = (req, res, next) => {
  req.query = { gameDay: { lt: getTodaysDate(true), gt: getTodaysDate() } };
  // req.query = { gameDay: getTodaysDate() };
  req.query.sort = 'gameDay';
  next();
};

exports.aliasGamesToScore = (req, res, next) => {
  req.query = { gameDay: { lt: getTodaysDate() }, gameStatus: { ne: 'Final' } };
  next();
};

exports.getAllGames = async (req, res) => {
  try {
    const results = new APIFeatures(Game.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const games = await results.query;

    const totalItems = await Game.countDocuments({});
    const totalPages = Math.ceil(totalItems / results.limit);
    const nextPage =
      results.currentPage < totalPages ? results.currentPage + 1 : null;

    res.status(200).json({
      status: 'success',
      results: games.length,
      totalResults: totalItems,
      requestedAt: req.requestTime,
      page: results.currentPage,
      totalPages,
      nextPage: nextPage
        ? `${mainRoute}/api/v1/games?page=${nextPage}&limit=${results.limit}`
        : null,
      data: {
        games,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Something went wrong fetching all games',
    });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        game,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: 'Something went awry' });
  }
};

exports.addGame = async (req, res) => {
  try {
    const newGame = await Game.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        game: newGame,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'Fail', message: err.message });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const filter = { _id: req.params.id };

    const game = await Game.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        game,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail to Update', message: err });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'Fail', message: err });
  }
};
