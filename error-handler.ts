import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorCodes, HttpExceptions } from "./src/execptions/root.exception";
import { BadRequestException } from "./src/execptions/bad-request";
import { InternalException } from "./src/execptions/internal.exception";

export const errorHandler = (
  method: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
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
          exception = new InternalException(
            "Unprocessible entity",
            ErrorCodes.INTERNAL_EXCEPTION,
            error
          );
        }
      }

      next(exception);
    }
  };
};
