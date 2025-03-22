import { NextFunction, Request, Response } from "express";
import { UnAuthorizedException } from "../execptions/unauthorized";
import { ErrorCodes } from "../execptions/root.exception";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { User } from "@prisma/client";

export interface ExtendedRequest extends Request {
  user?: User;
}

const authMiddleware = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req?.headers?.authorization;

  if (!token) {
    throw new UnAuthorizedException(
      "User is unauthorised",
      404,
      ErrorCodes.UNAUTHORIZED_ACCESS
    );
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirstOrThrow({
      where: { id: payload?.id },
    });

    if (!user) {
      throw new UnAuthorizedException(
        "User is unauthorized",
        404,
        ErrorCodes.UNAUTHORIZED_ACCESS
      );
    }

    req.user = user!;
    next();
  } catch (error) {
    next(
      new UnAuthorizedException(
        "User is unauthorized",
        404,
        ErrorCodes.UNAUTHORIZED_ACCESS
      )
    );
  }
};

export default authMiddleware;
