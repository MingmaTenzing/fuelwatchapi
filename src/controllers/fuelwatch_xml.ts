// uses the fuelwatch rss feed
// requires converting the xml to json

import { Request, Response } from "express";
import { fuelwatch_xml } from "../../types";
import { title } from "process";

const parseString = require("xml2js").parseString;

const fetch_xml_station_prices = async (req: Request, res: Response) => {
  const Region = req.query;

  console.log(Region);
  console.log(req.query);
  const data = await fetch(
    ` https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=${Region.Region}&Product=${req.query.Product}`
  );

  const response = await data.text();

  parseString(response, (err: any, result: any) => {
    const raw_data = result.rss.channel[0].item;

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

    res.json(processedData);
  });
};
export { fetch_xml_station_prices };
