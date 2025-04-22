import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { RequestValidationError as ValidationError} from "../errors/validaton-error";
import { NotFoundError } from "../errors/not-found-error";


export const validateRequest = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError( result.error);
    }

    req.body = result.data;
    next();
  };
};
