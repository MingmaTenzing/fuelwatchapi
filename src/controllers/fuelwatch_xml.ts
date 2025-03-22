// uses the fuelwatch rss feed
// requires converting the xml to json

import { NextFunction, query, Request, Response } from "express";
import { fuelwatch_query_parameters, fuelwatch_xml } from "../../types";
import {
  BASE_ERROR,
  NotFoundError,
  UnAuthorizedError,
} from "../Errors-Classes/NotFoundError";
import { error } from "console";
import { StatusCodes } from "http-status-codes";

const parseString = require("xml2js").parseString;

// this function fetches the data from fuelwatch with provided query and converts to json
const fetch_xml_station_prices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query as fuelwatch_query_parameters;
  const searchParams = new URLSearchParams();

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      searchParams.set(key, value);
    }
  }

  try {
    const data = await fetch(
      ` https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?${searchParams.toString()}`
    );

    const response = await data.text();

    parseString(response, (err: any, result: any) => {
      if (err) {
        throw new Error("cannot parse the xml to json format");
      }

      const raw_data = result.rss.channel[0].item;
      if (!raw_data) {
        throw new NotFoundError("not found anay data data");
      }
      const processedData = raw_data.map((site: any) => ({
        title: site.title[0],
        description: site.description[0],
        brand: site.brand[0],
        date: site.date[0],
        price: Number(site.price[0]),
        trading_name: site["trading-name"][0],
        location: site.location[0],
        address: site.address[0],
        phone: site.phone[0],
        latitude: site.latitude[0],
        site_features: site["site-features"][0],
      }));

      res.status(StatusCodes.OK).json(processedData);
    });
  } catch (error) {
    next(error);
  }
};
export { fetch_xml_station_prices };
