const express = require("express");
const router = express.Router();
const { register, getAll, getActivateRegistrations, getYoungWinningRegistrations } = require("../controllers/registrationController");

router.post("/", register);
router.get("/all-registrations", getAll);
router.get('/activate', getActivateRegistrations);
router.get('/young-winning', getYoungWinningRegistrations);

module.exports = router;