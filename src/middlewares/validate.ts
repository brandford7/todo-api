import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { ValidationError } from "../errors/validaton-error";
import { NotFoundError } from "../errors/not-found-error";


export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError("Validation failed", result.error.errors);
    }

    req.body = result.data;
    next();
  };
};
