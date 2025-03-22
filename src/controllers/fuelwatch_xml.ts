// uses the fuelwatch rss feed
// requires converting the xml to json

import { NextFunction, query, Request, Response } from "express";
import {
  fuelwatch_query_parameters,
  fuelwatch_xml_processed,
  fuelwatch_xml_raw,
} from "../../types";
import { BASE_ERROR, NotFoundError, UnAuthorizedError } from "../Errors/errors";
import { error } from "console";
import { StatusCodes } from "http-status-codes";

import { xmlParser } from "../utils/xml_parser";
import { xml_image_mapper } from "../utils/xml_image_helper";

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
      const parsed_xml_data = xmlParser(raw_data);
      const image_mapped_sites = xml_image_mapper(parsed_xml_data);

      res.status(StatusCodes.OK).json(image_mapped_sites);
    });
  } catch (error) {
    next(error);
  }
};
export { fetch_xml_station_prices };
