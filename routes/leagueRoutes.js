const express = require('express');
const leagueController = require('../controllers/leagueController');

const router = express.Router();

router
  .route('/')
  .get(leagueController.getAllLeagues)
  .post(leagueController.addLeague);

module.exports = router;
