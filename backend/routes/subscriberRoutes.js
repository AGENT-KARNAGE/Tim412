const {subscribe} = require("../controllers/subscribeController");
const express = require("express"); 
const router = express.Router()

router.post("/newsubscribe", subscribe);

module.exports = router