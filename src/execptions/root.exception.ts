export class HttpExceptions extends Error {
  message: string;
  errorCode: ErrorCodes;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCodes,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCodes {
  USER_ALREADY_EXISTS = 501,
  USER_NOT_FOUND = 404,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED_ACCESS = 4001,
  ZOD_ERROR = 5001,
}
