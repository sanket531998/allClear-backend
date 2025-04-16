import { HttpExceptions } from "./root.exception";

export class InternalException extends HttpExceptions {
  constructor(message: string, errorCodes: number, details?: any) {
    super(message, errorCodes, 500, details || null);
  }
}
