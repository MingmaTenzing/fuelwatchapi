import { parse } from "path";
import { fuelwatch_parser } from "./fuelwatch_parser";

export const region_cheapest_price = async (region_code: string) => {
  const response = await fetch(
    `https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=${region_code}`
  );
  const data = await response.text();

  const parsed_data = fuelwatch_parser(data);

  const sort_pricing = parsed_data.sort((a, b) => a.price - b.price);

  console.log(sort_pricing);
  return sort_pricing;
};
