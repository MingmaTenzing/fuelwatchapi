import { fuelwatch_xml_processed } from "../../types";
import { NotFoundError } from "../Errors/errors";
import { fuelwatch_parser } from "./fuelwatch_parser";
const parseString = require("xml2js").parseString;

// this function calculates the average fuel cost across five regions in WA.

export const region_price_calculator = async () => {
  let regions: fuelwatch_xml_processed[][] = [];
  let region_average_pricing = [
    {
      region: "North Metro",
      average_price: 0,
    },
    {
      region: "South Metro",
      average_price: 0,
    },
    {
      region: "Albany",
      average_price: 0,
    },
    {
      region: "Margaret_River",
      average_price: 0,
    },
    {
      region: "Bunbury",
      average_price: 0,
    },
  ];
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
  ]).then((value) => {
    for (let i = 0; i < value.length; i++) {
      parseString(value[i], (err: any, result: any) => {
        if (err) {
          throw new Error("cannot parse the xml to json format");
        }
        const raw_data = result.rss.channel[0].item;
        if (!raw_data) {
          throw new NotFoundError("didn't find any data");
        }
        const mapped_data = fuelwatch_parser(raw_data);
        regions.push(mapped_data);
      });
    }
  });

  if (regions.length > 0) {
    for (let i = 0; i < regions.length; i++) {
      for (let j = 0; j < regions[i].length; j++) {
        region_average_pricing[i].average_price += Number(regions[i][j].price);
        if (j == regions[i].length - 1) {
          region_average_pricing[i].average_price = parseFloat(
            (
              region_average_pricing[i].average_price /
              regions[i].length /
              100
            ).toFixed(2)
          );
        }
      }
    }
  }

  return region_average_pricing;
};
