const express = require('express');
const {
  createPrayerRequest,
  getAllPrayerRequests,
  deletePrayerRequest,
  getPrayerRequestsByUser, // 👈 Import the new function
} = require('../controllers/prayerRequestController');

const router = express.Router();

router.post('/', createPrayerRequest);
router.get('/', getAllPrayerRequests);
router.get('/user/:email', getPrayerRequestsByUser); // ✅ Add this line
router.delete('/:id', deletePrayerRequest);

module.exports = router;