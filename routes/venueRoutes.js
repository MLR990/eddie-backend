const express = require('express');
const venueController = require('../controllers/venueController');

const router = express.Router();

router
  .route('/')
  .get(venueController.getAllVenues)
  .post(venueController.addVenue);

router
  .route('/:id')
  .get(venueController.getVenue)
  .patch(venueController.updateVenue)
  .delete(venueController.deleteVenue);

module.exports = router;
