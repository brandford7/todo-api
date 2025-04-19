

export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, public details?: any) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
  }
}
