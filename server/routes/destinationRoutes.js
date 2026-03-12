const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  searchDestinations,
} = require('../controllers/destinationController');
const { protect, admin } = require('../middleware/auth');

router.get('/search', searchDestinations);
router.get('/', getDestinations);
router.get('/:id', getDestination);
router.post('/', protect, admin, createDestination);
router.put('/:id', protect, admin, updateDestination);
router.delete('/:id', protect, admin, deleteDestination);

module.exports = router;
