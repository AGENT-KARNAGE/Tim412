import express from 'express';
import { createEntry, getAllEntries, deleteEntry } from '../controllers/testimonyVoluntaryController.js';

const router = express.Router();

router.post('/', createEntry);
router.get('/', getAllEntries);
router.delete('/:id', deleteEntry);

export default router;