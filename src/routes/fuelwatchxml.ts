// routes that work with fuelwatch rss feed

import xmlexpress from "express";

const xmlrouter = xmlexpress.Router();

import {
  fetch_xml_station_prices,
  region_average_prices,
} from "../controllers/fuelwatch_xml";

xmlrouter.route("/").get(fetch_xml_station_prices);
xmlrouter.route("/region-average").get(region_average_prices);

module.exports = xmlrouter;
