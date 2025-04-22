import { CustomError } from "./custom-error";

export class DatabaseError extends CustomError {
  statusCode = 500;

  reason = 'Error connecting to database'

  constructor(message: string = "Database operation failed") {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
