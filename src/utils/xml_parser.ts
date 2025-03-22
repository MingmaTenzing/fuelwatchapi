import { FuelStation, fuelwatch_xml } from "../../types";
import { fuel_brands } from "./fuel_brands";

export const xml_image_mapper = (data: any) => {
  const processed_data = data.map((site: fuelwatch_xml) => {
    const find_brand = fuel_brands.find(
      (brand) => brand!.name == site.description
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
  console.log(processed_data);
  return processed_data;
};
