const express = require("express");
const router = express.Router(); // ✅ This creates the router

const functions = require("../controllers/authController");

router.post("/register", functions.register);
router.post("/login", functions.login);

module.exports = router; // ✅ Export the router