import { ZodError } from "zod/lib/ZodError";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode=400;

  constructor(public errors:ZodError) {
    super('err');
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.errors.map((err) => ({
      message: err.message,
      field: err.path.join("."), // Convert path array to string (e.g., "user.email")
    }));
  }
  
}
