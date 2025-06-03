const express = require("express");

import {
  all_fuel_prices,
  site_details,
  price_trend,
  search_filter,
} from "../controllers/fuelwatch_api";

const router = express.Router();

// these routes uses the actual fuelwatch api url not the rss feed
router.route("/").get(all_fuel_prices);
router.route("/trend").get(price_trend);
router.route("/site/:id").get(site_details);
router.route("/search").post(search_filter);

module.exports = router;
