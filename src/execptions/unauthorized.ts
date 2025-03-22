import { HttpExceptions } from "./root.exception";

export class UnAuthorizedException extends HttpExceptions {
  constructor(message: string, errors: any, errorCode: number) {
    super(message, errorCode, 401, errors);
  }
}
