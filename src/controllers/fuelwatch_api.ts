import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FuelStation, price_trend, site_details } from "../../types";

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
  const [site_details, site_price_details]: [site_details, FuelStation] =
    await Promise.all([
      await fetch(` https://www.fuelwatch.wa.gov.au/api/sites/${site_id}`).then(
        (response) => response.json()
      ),
      await fetch(` https://www.fuelwatch.wa.gov.au/api/sites`)
        .then((response) => response.json())
        .then((site) =>
          site.find((station: FuelStation) => station.id == Number(site_id))
        ),
    ]);

  res.status(StatusCodes.OK).json({ site_details, site_price_details });
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
