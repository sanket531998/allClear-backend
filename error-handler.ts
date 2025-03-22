import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorCodes, HttpExceptions } from "./src/execptions/root.exception";
import { BadRequestException } from "./src/execptions/bad-request";

export const errorHandler = (
  sanket: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await sanket(req, res, next);
    } catch (error: any) {
      let exception: HttpExceptions;

      if (error instanceof HttpExceptions) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          exception = new BadRequestException(
            `Zod validation error`,
            ErrorCodes.ZOD_ERROR,
            error?.errors
          );
        } else {
          exception = new BadRequestException(
            "Unprocessible entity",
            ErrorCodes.INTERNAL_EXCEPTION,
            error
          );
        }
        // exception = new InternalException(
        //   "something went wrong",
        //   error,
        //   ErrorCodes.INTERNAL_EXCEPTIONS
        // );
      }

      next(exception);
    }
  };
};
