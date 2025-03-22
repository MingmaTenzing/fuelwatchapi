import { FuelStation, fuelwatch_xml_processed } from "../../types";
import { fuel_brands } from "./fuel_brands";

// this function return an array of sites with their respecrtive brand logo
// following function should be used in the json end point of fuelwatch not the xml.
// for xml endpoints there's other image mapper called (xml_image_helper).
export const api_image_mapper = (data: FuelStation[]) => {
  const processed_data = data.map((site) => {
    const find_brand = fuel_brands.find(
      (brand) => brand?.name == site.brandName
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
