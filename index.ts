import express from "express";
import { errorHandler } from "./src/middlewares/error_handler";
import { error_logging } from "./src/middlewares/error_logger";
import cors from "cors";
const app = express();
const port: number = 3000;

const bodyParser = require("body-parser");

const fuelwatch_api_route = require("./src/routes/fuelwatchapi");
const fuelwatch_rss_route = require("./src/routes/fuelwatchxml");

// routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/", fuelwatch_api_route);
app.use("/xml", fuelwatch_rss_route);

// middlewares

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(error_logging);
app.use(errorHandler);

app.listen(port, () => {
  console.log("app with typescript running");
});
