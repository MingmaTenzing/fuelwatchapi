// routes that work with fuelwatch rss feed

const xmlexpress = require("express");

const xmlrouter = xmlexpress.Router();

const { fetch_xml_station_prices } = require("../controllers/fetch_xml_data");

xmlrouter.route("/").get(fetch_xml_station_prices);

module.exports = xmlrouter;
