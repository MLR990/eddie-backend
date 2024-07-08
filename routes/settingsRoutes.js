const express = require('express');
const settingsController = require('../controllers/settingsController');

const router = express.Router();

router
  .route('/scrape-game-index')
  .get(
    settingsController.getAllSettings,
    settingsController.aliasCurrentGameIndex,
  );

router
  .route('/')
  .get(settingsController.getAllSettings)
  .post(settingsController.addSettings);

router.route('/:id').patch(settingsController.updateSettings);

module.exports = router;
