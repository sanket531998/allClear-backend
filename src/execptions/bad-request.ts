import { HttpExceptions } from "./root.exception";

export class BadRequestException extends HttpExceptions {
  constructor(message: string, errorCodes: number, details?: any) {
    super(message, errorCodes, 400, details || null);
  }
}
