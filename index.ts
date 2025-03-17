import express, { Request, Response } from "express";

const app = express();

const port: number = 3000;

app.get("/", async (req: Request, res: Response) => {
  const data = await fetch(
    "https://www.fuelwatch.wa.gov.au/api/sites?fuelType=ULP"
  );
  const response = await data.json();
  res.json(response);
});

app.listen(port, () => {
  console.log("app with typescript running");
});
