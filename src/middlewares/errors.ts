import { NextFunction, Request, Response } from "express";
import { BASE_ERROR } from "../Errors/NotFoundError";

export const errorHandler = (
  err: BASE_ERROR,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).json({ message: err.message });
};
