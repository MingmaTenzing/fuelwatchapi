import { Request, Response } from "express";

const all_fuel_prices = async (req: Request, res: Response) => {
  const response = await fetch(
    "https://www.fuelwatch.wa.gov.au/api/sites?fuelType=ULP"
  );

  const data = await response.json();

  res.json(data);
};

module.exports = {
  all_fuel_prices,
};
