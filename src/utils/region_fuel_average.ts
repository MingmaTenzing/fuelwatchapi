import { response } from "express";
import { fuelwatch_xml_processed } from "../../types";
import { NotFoundError } from "../Errors/errors";
import { xmlParser } from "./xml_parser";
import { xml_image_mapper } from "./xml_image_helper";
const parseString = require("xml2js").parseString;

export const region_fuel_average_calculator = async () => {
  let parsed_metro_north: fuelwatch_xml_processed[] = [];
  const [Metro_North, Metro_South, Albany, Margaret_River, Bunbury] =
    await Promise.all([
      fetch(
        "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25"
      ).then((response) => response.text()),
      fetch(
        "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=26"
      ).then((response) => response.text()),
      fetch(
        "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=15"
      ).then((response) => response.text()),
      fetch(
        "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=28"
      ).then((response) => response.text()),
      fetch(
        "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=16"
      ).then((response) => response.text()),
    ]);

  parseString(Metro_North, (err: any, result: any) => {
    if (err) {
      throw new Error("cannot parse the xml to json format");
    }

    const raw_data = result.rss.channel[0].item;
    if (!raw_data) {
      throw new NotFoundError("not found anay data data");
    }
    const parsed_xml_data = xmlParser(raw_data);
    parsed_metro_north = parsed_xml_data;
    console.log(parsed_metro_north);
  });
};
