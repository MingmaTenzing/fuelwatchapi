import { response } from "express";
import { fuelwatch_xml_processed } from "../../types";
import { NotFoundError } from "../Errors/errors";
import { xmlParser } from "./xml_parser";
import { xml_image_mapper } from "./xml_image_helper";
const parseString = require("xml2js").parseString;

export const region_fuel_average_calculator = async () => {
  let parsed_metro_north: fuelwatch_xml_processed[] = [];
  let parsed_metro_south: fuelwatch_xml_processed[] = [];
  let parsed_albany: fuelwatch_xml_processed[] = [];
  let parsed_margaret_river: fuelwatch_xml_processed[] = [];
  let parsed_bunbury: fuelwatch_xml_processed[] = [];

  let total_metro_north = 0;
  let total_metro_south = 0;
  let total_albany = 0;
  let total_margaret_river = 0;
  let total_bunbury = 0;
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
    console.log(parsed_metro_north.length);
  });

  parseString(Metro_South, (err: any, result: any) => {
    if (err) {
      throw new Error("cannot parse the xml to json format");
    }

    const raw_data = result.rss.channel[0].item;
    if (!raw_data) {
      throw new NotFoundError("not found anay data data");
    }
    const parsed_xml_data = xmlParser(raw_data);
    parsed_metro_south = parsed_xml_data;
    console.log(parsed_metro_south.length);
  });
  parseString(Albany, (err: any, result: any) => {
    if (err) {
      throw new Error("cannot parse the xml to json format");
    }

    const raw_data = result.rss.channel[0].item;
    if (!raw_data) {
      throw new NotFoundError("not found anay data data");
    }
    const parsed_xml_data = xmlParser(raw_data);
    parsed_albany = parsed_xml_data;
    console.log(parsed_albany.length);
  });
  parseString(Margaret_River, (err: any, result: any) => {
    if (err) {
      throw new Error("cannot parse the xml to json format");
    }

    const raw_data = result.rss.channel[0].item;
    if (!raw_data) {
      throw new NotFoundError("not found anay data data");
    }
    const parsed_xml_data = xmlParser(raw_data);
    parsed_margaret_river = parsed_xml_data;
    console.log(parsed_margaret_river.length);
  });
  parseString(Bunbury, (err: any, result: any) => {
    if (err) {
      throw new Error("cannot parse the xml to json format");
    }

    const raw_data = result.rss.channel[0].item;
    if (!raw_data) {
      throw new NotFoundError("not found anay data data");
    }
    const parsed_xml_data = xmlParser(raw_data);
    parsed_bunbury = parsed_xml_data;
    console.log(parsed_bunbury.length);
  });

  for (let i = 0; i < parsed_metro_north.length; i++) {
    total_metro_north += Number(parsed_metro_north[i].price);
  }
  for (let i = 0; i < parsed_metro_south.length; i++) {
    total_metro_south += Number(parsed_metro_south[i].price);
  }
  for (let i = 0; i < parsed_albany.length; i++) {
    total_albany += Number(parsed_albany[i].price);
  }
  for (let i = 0; i < parsed_margaret_river.length; i++) {
    total_margaret_river += Number(parsed_margaret_river[i].price);
  }
  for (let i = 0; i < parsed_bunbury.length; i++) {
    total_bunbury += Number(parsed_bunbury[i].price);
  }

  console.log([
    parseFloat(
      (total_metro_north / parsed_metro_north.length / 100).toFixed(2)
    ),
    parseFloat(
      (total_metro_south / parsed_metro_south.length / 100).toFixed(2)
    ),
    parseFloat(
      (total_margaret_river / parsed_margaret_river.length / 100).toFixed(2)
    ),
    parseFloat((total_albany / parsed_albany.length / 100).toFixed(2)),
    parseFloat((total_bunbury / parsed_bunbury.length / 100).toFixed(2)),
  ]);
  return [
    parseFloat(
      (total_metro_north / parsed_metro_north.length / 100).toFixed(2)
    ),
    parseFloat(
      (total_metro_south / parsed_metro_south.length / 100).toFixed(2)
    ),
    parseFloat(
      (total_margaret_river / parsed_margaret_river.length / 100).toFixed(2)
    ),
    parseFloat((total_albany / parsed_albany.length / 100).toFixed(2)),
    parseFloat((total_bunbury / parsed_bunbury.length / 100).toFixed(2)),
  ];
};
