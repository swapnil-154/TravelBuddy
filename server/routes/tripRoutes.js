const express = require('express');
const router = express.Router();
const {
  getTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip,
} = require('../controllers/tripController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', getTrips);
router.get('/:id', getTrip);
router.post('/', createTrip);
router.put('/:id', updateTrip);
router.delete('/:id', deleteTrip);

module.exports = router;
