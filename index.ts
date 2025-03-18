import express, { Request, Response } from "express";

const app = express();

const port: number = 3000;

// routes
const fuelwatch_api_route = require("./src/routes/fuelwatchapi");

app.use("/", fuelwatch_api_route);

app.listen(port, () => {
  console.log("app with typescript running");
});
