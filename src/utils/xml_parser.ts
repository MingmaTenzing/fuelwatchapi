import { fuelwatch_xml_processed, fuelwatch_xml_raw } from "../../types";

export const xmlParser = (raw_data: fuelwatch_xml_raw[]) => {
  const data: fuelwatch_xml_processed[] = raw_data.map(
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
  return data;
};
