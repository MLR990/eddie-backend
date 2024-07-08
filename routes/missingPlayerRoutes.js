const express = require('express');
const missingPlayerController = require('../controllers/missingPlayerController');

const router = express.Router();

router
  .route('/')
  .get(missingPlayerController.getAllMissingPlayers)
  .post(missingPlayerController.addMissingPlayer);

module.exports = router;
