export interface fuel_brand {
  name: string;
  description: string;
  svgLogoFileName: string;
}

export interface price_change_predict {
  percentage_change: number;
  tomorrow_predicted_price: number;
}

export interface fuelwatch_xml_raw {
  title: string;
  description: string;
  date: string;
  "trading-name": string;
  price: string;
  location: string;
  address: string;
  latitude: string;
  longitude: string;
  "site-features": string;
  phone: string;
  brand: string;
  brand_image?: string;
}

export interface map_view_search_query {
  suburb: string;
  fuelType: string;
  brands: string[];
}
export interface fuelwatch_xml_processed {
  title: string;
  description: string;
  date: string;
  trading_name: string;
  price: number;
  location: string;
  address: string;
  latitude: string;
  longitude: string;
  site_features: string;
  phone: string;
  brand: string;
  brand_image?: string;
}

export interface markerCluster_locations {
  lat: number;
  lng: number;
}

export interface clientContactDetails {
  phone: string;
  isPrimary: boolean;
}
export interface client {
  clientName: string;
  tradingName: string;
  clientContactDetails: Array<clientContactDetails>;
}

export interface tradingHours {
  day: string;
  startTime: string;
  endTime: string;
  stationClosedForTrading: boolean;
  nextOpeningDayMessage?: string;
}
export interface Address {
  id: number;
  line1: string;
  location: string;
  postCode: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface stationFeatures {
  featureName: string;
  description: string;
  isAvailable: boolean;
  iconName: string;
  isCaveatFeature: boolean;
}

export interface Product {
  shortName: string;
  isTruckStop: boolean;
  priceToday: number;
  priceTomorrow: number;
  isTwoPrice: boolean;
}

export interface FuelStation {
  id: number;
  siteName: string;
  address: Address;
  product: Product;
  productFuelType: string;
  brandName: string;
  isClosedNow: boolean;
  isClosedAllDayTomorrow: boolean;
  drivewayService: string;
  manned: boolean;
  operates247: boolean;
  membershipRequired: boolean;
  currentPricingOrder: number;
  nextPricingOrder: number;
  brand_image?: string;
}

export interface site_details {
  id: number;
  features: Array<stationFeatures>;
  address: Address;
  brand: fuel_brand;
  client: client;
  tradingHours: Array<tradingHours>;
}

export interface price_trend {
  averagePrice: number;
  publishDate: string;
}

export interface fuelwatch_query_parameters {
  Product?: number;
  Suburb?: string;
  Region?: number;
  Brand?: number;
  Day?: string;
  Surrounding?: string;
}
