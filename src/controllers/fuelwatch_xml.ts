// uses the fuelwatch rss feed
// requires converting the xml to json

import { NextFunction, query, Request, Response } from "express";
import { fuelwatch_query_parameters, fuelwatch_xml } from "../../types";
import { BASE_ERROR, NotFoundError } from "../Errors/NotFoundError";

const parseString = require("xml2js").parseString;

const fetch_xml_station_prices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    throw new NotFoundError("something brokkeee");
  } catch (error) {
    next(error);
  }
  // const query = req.query as fuelwatch_query_parameters;

  // for (const [key, value] of Object.entries(query)) {
  // }

  // // if (Region) {
  // //   queryParams.set("Region", Region.toString());
  // //   console.log(queryParams);
  // // }

  // // console.log(queryParams.toString());

  // // console.log(Region);
  // // console.log(Product);
  // const data = await fetch(
  //   ` https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=1&Product=1`
  // );

  // const response = await data.text();

  // parseString(response, (err: any, result: any) => {
  //   const raw_data = result.rss.channel[0].item;

  //   const processedData = raw_data.map((site: any) => ({
  //     title: site.title[0],
  //     description: site.description[0],
  //     brand: site.brand[0],
  //     date: site.date[0],
  //     price: Number(site.price[0]),
  //     trading_name: site["trading-name"][0],
  //     location: site.location[0],
  //     address: site.address[0],
  //     phone: site.phone[0],
  //     latitude: site.latitude[0],
  //     site_features: site["site-features"][0],
  //   }));

  //   res.json(processedData);
  // });
};
export { fetch_xml_station_prices };
