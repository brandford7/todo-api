import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";


export interface ErrorResponse {
  error: {
    type: string;
    message: string;
    details?: any;
  };
}

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  return res.status(400).json("Something went wrong");
};
