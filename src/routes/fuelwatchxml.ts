// routes that work with fuelwatch rss feed

import xmlexpress from "express";

const xmlrouter = xmlexpress.Router();

import {
  fetch_perth_cheapest,
  fetch_region_cheapest,
  fetch_xml_station_prices,
  region_average_prices,
} from "../controllers/fuelwatch_xml";

xmlrouter.route("/").post(fetch_xml_station_prices);
xmlrouter.route("/region-average").get(region_average_prices);
xmlrouter.route("/region-cheapest").get(fetch_region_cheapest);
xmlrouter.route("/perth-cheapest").get(fetch_perth_cheapest);

module.exports = xmlrouter;
