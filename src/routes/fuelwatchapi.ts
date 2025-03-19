const express = require("express");

const { all_fuel_prices, site_details } = require("../controllers/fetch_data");

const router = express.Router();

// these routes uses the actual fuelwatch api url not the rss feed
router.route("/").get(all_fuel_prices);
router.route("/site/:id").get(site_details);

module.exports = router;
