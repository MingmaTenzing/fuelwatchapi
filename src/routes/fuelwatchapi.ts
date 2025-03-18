const express = require("express");

const { all_fuel_prices } = require("../controllers/fetch_data");

const router = express.Router();

router.route("/").get(all_fuel_prices);

module.exports = router;
