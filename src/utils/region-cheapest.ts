const cheapest_north_price = async (region_code: string) => {
  const response = await fetch(
    `https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?Region=${region_code}`
  );
};
