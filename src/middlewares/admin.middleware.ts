import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "./auth.middleware";
import { UnAuthorizedException } from "../execptions/unauthorized";
import { ErrorCodes } from "../execptions/root.exception";

export const AdminMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req?.user;
  if (user?.role === "ADMIN") {
    next();
  } else {
    next(
      new UnAuthorizedException(
        "Unauthorized",
        404,
        ErrorCodes.UNAUTHORIZED_ACCESS
      )
    );
  }
};
