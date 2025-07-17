const express = require('express');
const {
  register,
  login,
  allUsers,
  delAllUsers,
} = require('../controllers/authController');

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Admin routes (optional)
router.get('/users', allUsers);
router.delete('/users', delAllUsers);

module.exports = router;