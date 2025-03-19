import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

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

module.exports = {
  all_fuel_prices,
  site_details,
};
