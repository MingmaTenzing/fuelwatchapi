import { NextFunction, Request, Response } from "express";
import { BASE_ERROR } from "../Errors-Classes/NotFoundError";

export function error_logging(
  err: BASE_ERROR,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  console.log(
    "error loggin middleware done now passing it to globlal error handler"
  );
  next(err);
}
