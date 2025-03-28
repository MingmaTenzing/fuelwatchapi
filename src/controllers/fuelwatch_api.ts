import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FuelStation, price_trend, site_details } from "../../types";
import { api_image_mapper } from "../utils/api_image_helper";
import { BadRequestError, NotFoundError } from "../Errors/errors";

// uses the actual api url which provides a json response.

const all_fuel_prices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await fetch(
      "https://www.fuelwatch.wa.gov.au/api/sites?fuelType=ULP"
    );

    const data: FuelStation[] = await response.json();
    const stations_with_brand_image = api_image_mapper(data);
    res.status(StatusCodes.OK).json(stations_with_brand_image);
  } catch (error) {
    next(error);
  }
};

const site_details = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const site_id = req.params.id;
  console.log(site_id);

  if (!site_id) {
    throw new BadRequestError(
      "No id provide, Please provide the id in the request url for example localhost:300/site/179"
    );
  }

  try {
    const [site_details, site_price_details] = await Promise.all([
      fetch(` https://www.fuelwatch.wa.gov.au/api/sites/${site_id}`).then(
        (response) => {
          console.log(response);
          if (response.statusText == "No Content") {
            throw new NotFoundError(
              `Didn't find any fuel station with the provided id of ${site_id}`
            );
          }
          return response.json();
        }
      ),
      fetch(` https://www.fuelwatch.wa.gov.au/api/sites`)
        .then((response) => response.json())
        .then((site) =>
          site.filter((station: FuelStation) => station.id == Number(site_id))
        )
        .then((fuel_station) => api_image_mapper(fuel_station)),
    ]);

    res.status(StatusCodes.OK).json({ site_details, site_price_details });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const price_trend = async (req: Request, res: Response) => {
  const fuelType = req.query.fuelType as string;
  const response = await fetch(
    `https://www.fuelwatch.wa.gov.au/api/report/price-trends?region=Metro&fuelType=${fuelType}`
  );
  const data: price_trend[] = await response.json();

  res.json(data);
};

export { price_trend, all_fuel_prices, site_details };
