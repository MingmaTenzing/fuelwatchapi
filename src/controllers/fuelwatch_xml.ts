// uses the fuelwatch rss feed
// requires converting the xml to json

import { NextFunction, query, Request, response, Response } from "express";
import {
  fuelwatch_query_parameters,
  fuelwatch_xml_processed,
  fuelwatch_xml_raw,
} from "../../types";
import {
  BadRequestError,
  BASE_ERROR,
  NotFoundError,
  UnAuthorizedError,
} from "../Errors/errors";
import { error } from "console";
import { StatusCodes } from "http-status-codes";

import { fuelwatch_parser } from "../utils/fuelwatch_parser";
import { region_price_calculator } from "../utils/region_average_calculator";
import { region_cheapest_price } from "../utils/region-cheapest";

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

    const parsed_data = fuelwatch_parser(response);

    res.status(StatusCodes.OK).json(parsed_data);
  } catch (error) {
    next(error);
  }
};

const region_average_prices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const average_prices = await region_price_calculator();
    res.status(StatusCodes.OK).json(average_prices);
  } catch (error) {
    next(error);
  }
};

const fetch_region_cheapest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query.Region as string;
    if (!query) {
      throw new BadRequestError("no query provided");
    }

    const data = await region_cheapest_price(query);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};

const fetch_perth_cheapest = async (
  req: Request,
  res: Response,
  nex: NextFunction
) => {
  let combined_region_prices: fuelwatch_xml_processed[] = [];
  const [north_metro, south_metro] = await Promise.all([
    // north of river
    fetch(
      "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=25"
    ).then((response) => response.text()),

    //  south or river
    fetch(
      "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=26"
    ).then((response) => response.text()),
  ]);
  const parsed_north_metro = fuelwatch_parser(north_metro);
  const parsed_south_metro = fuelwatch_parser(south_metro);

  combined_region_prices = parsed_north_metro.concat(parsed_south_metro);

  combined_region_prices = combined_region_prices
    .sort((a, b) => a.price - b.price)
    .slice(0, 5);

  res.status(StatusCodes.OK).json(combined_region_prices);
};

export {
  fetch_xml_station_prices,
  region_average_prices,
  fetch_region_cheapest,
  fetch_perth_cheapest,
};
