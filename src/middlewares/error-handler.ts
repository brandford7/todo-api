import { ErrorRequestHandler } from "express";
import { ValidationError } from "../errors/validaton-error";
import { NotFoundError } from "../errors/not-found-error";
import { DatabaseError } from "../errors/database-error";

export interface ErrorResponse {
  error: {
    type: string;
    message: string;
    details?: any;
  };
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  const response: ErrorResponse = {
    error: {
      type: "ServerError",
      message: "Something went wrong",
    },
  };

  let statusCode = 500;

  if (err instanceof ValidationError) {
    statusCode = err.statusCode;
    response.error = {
      type: err.name,
      message: err.message,
      details: err.details,
    };
  } else if (err instanceof NotFoundError) {
    statusCode = err.statusCode;
    response.error = {
      type: err.name,
      message: err.message,
    };
  } else if (err.name === "MongoError" || err instanceof DatabaseError) {
    statusCode = 500;
    response.error = {
      type: "DatabaseError",
      message: "Database operation failed",
    };
  } else if (err.name === "ZodError") {
    statusCode = 400;
    response.error = {
      type: "ValidationError",
      message: "Validation failed",
      details: err.errors,
    };
  } else if (err.name === "CastError") {
    statusCode = 400;
    response.error = {
      type: "InvalidIdError",
      message: "Invalid resource identifier",
    };
  } else if ("statusCode" in err) {
    statusCode = (err as any).statusCode || 500;
    response.error.message = err.message;
  } else {
    response.error.message = err.message || "Internal server error";
  }

  res.status(statusCode).json(response);
};
