import express from "express";
import { errorHandler } from "./src/middlewares/errors";

const app = express();

const port: number = 3000;

const bodyParser = require("body-parser");

// routes
const fuelwatch_api_route = require("./src/routes/fuelwatchapi");
const fuelwatch_rss_route = require("./src/routes/fuelwatchxml");

app.use("/", fuelwatch_api_route);
app.use("/xml", fuelwatch_rss_route);

// middlewares

app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler);

app.listen(port, () => {
  console.log("app with typescript running");
});
