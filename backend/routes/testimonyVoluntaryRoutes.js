const express = require('express');
const router = express.Router();
const {
  createEntry,
  getAllEntries,
  deleteEntry,
} = require('../controllers/testimonyVoluntaryController');

router.post('/', createEntry);
router.get('/', getAllEntries);
router.delete('/:id', deleteEntry);

module.exports = router;