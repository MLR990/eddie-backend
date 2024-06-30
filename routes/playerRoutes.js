const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

router
  .route('/')
  .get(playerController.getAllPlayers)
  .post(playerController.addPlayer);

router
  .route('/:id')
  .get(playerController.getPlayer)
  .patch(playerController.updatePlayer)
  .delete(playerController.deletePlayer);

module.exports = router;
