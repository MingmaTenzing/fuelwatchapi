import { fuelwatch_xml_processed, fuelwatch_xml_raw } from "../../types";
import { NotFoundError } from "../Errors/errors";
import { fuel_brands } from "./fuel_brands";

// xmlParser takes in an array of fuelwatch_xml_raw data and maps it
// to an processed array which can be used by frontend easily.
const parseString = require("xml2js").parseString;

export const fuelwatch_parser = (response: string) => {
  let raw_data: fuelwatch_xml_raw[] = [];

  parseString(response, (err: any, result: any) => {
    if (err) {
      throw new Error("cannot parse the xml to json format");
    }

    const data: fuelwatch_xml_raw[] = result.rss.channel[0].item;
    if (!data) {
      throw new NotFoundError("not found anay data data");
    }
    return (raw_data = data);
  });
  // mapping the xml parsed string to fuelwatch_xml_processed.
  const mapped_data: fuelwatch_xml_processed[] = raw_data.map(
    (site: fuelwatch_xml_raw) => ({
      title: site.title[0],
      description: site.description[0],
      brand: site.brand[0],
      date: site.date[0],
      price: Number(site.price[0]),
      trading_name: site["trading-name"][0],
      location: site.location[0],
      longitude: site.longitude[0],
      address: site.address[0],
      phone: site.phone[0],
      latitude: site.latitude[0],
      site_features: site["site-features"][0],
    })
  );

  // finding and adding respective brand images to the site object.
  const processed_data = mapped_data.map((site) => {
    const find_brand = fuel_brands.find(
      (brand) => brand?.description == site.brand
    );

    if (find_brand) {
      return {
        ...site,
        brand_image:
          "https://www.fuelwatch.wa.gov.au/assets/images/" +
          find_brand.svgLogoFileName,
      };
    }

    return site;
  });
  return processed_data;
};
