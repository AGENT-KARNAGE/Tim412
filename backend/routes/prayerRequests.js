import express from 'express';
import {
  createPrayerRequest,
  getAllPrayerRequests,
  deletePrayerRequest,
} from '../controllers/prayerRequestController.js';

const router = express.Router();

router.post('/', createPrayerRequest);
router.get('/', getAllPrayerRequests);
router.delete('/:id', deletePrayerRequest);

export default router;