import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { price_trend } from "../../types";

// uses the actual api url which provides a json response.

const all_fuel_prices = async (req: Request, res: Response) => {
  const response = await fetch(
    "https://www.fuelwatch.wa.gov.au/api/sites?fuelType=ULP"
  );

  const data = await response.json();

  res.status(StatusCodes.OK).json(data);
};

const site_details = async (req: Request, res: Response) => {
  const site_id = req.params.id;
  const response = await fetch(
    ` https://www.fuelwatch.wa.gov.au/api/sites/${site_id}`
  );

  const data = await response.json();

  res.status(StatusCodes.OK).json(data);
};

const price_trend = async (req: Request, res: Response) => {
  const fuelType = req.query.fuelType;
  const response = await fetch(
    `https://www.fuelwatch.wa.gov.au/api/report/price-trends?region=Metro&fuelType=${fuelType}`
  );
  const data: price_trend[] = await response.json();

  res.json(data);
};

export { price_trend, all_fuel_prices, site_details };
