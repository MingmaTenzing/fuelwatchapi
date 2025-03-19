// routes that work with fuelwatch rss feed

import xmlexpress from "express";

const xmlrouter = xmlexpress.Router();

import { fetch_xml_station_prices } from "../controllers/fuelwatch_xml";

xmlrouter.route("/").get(fetch_xml_station_prices);

module.exports = xmlrouter;
