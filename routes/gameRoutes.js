const express = require('express');
const gameController = require('../controllers/gameController');

const router = express.Router();

router
  .route('/todays-games')
  .get(gameController.aliasTodaysGames, gameController.getAllGames);

router
  .route('/games-to-score')
  .get(gameController.aliasGamesToScore, gameController.getAllGames);

router.route('/').get(gameController.getAllGames).post(gameController.addGame);

router
  .route('/:id')
  .get(gameController.getGame)
  .patch(gameController.updateGame)
  .delete(gameController.deleteGame);
module.exports = router;
