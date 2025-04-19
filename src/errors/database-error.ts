export class DatabaseError extends Error {
  statusCode: number;

  constructor(message: string = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
    this.statusCode = 500;
  }
}


