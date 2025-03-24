import { FuelStation, fuelwatch_xml_processed } from "../../types";
import { fuel_brands } from "./fuel_brands";

// xml_image_mappper takes the array that has been mapped to fuelwatch_xml_processed
// and adds it's respective brand image.
export const xml_image_mapper = (data: fuelwatch_xml_processed[]) => {
  const processed_data = data.map((site) => {
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
