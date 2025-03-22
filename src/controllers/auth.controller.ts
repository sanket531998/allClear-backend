// export default const login = () => {};
import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { signInSchema, userSignUpSchema } from "../schema/user.schema";
import { compareSync, hashSync } from "bcryptjs";
import { BadRequestException } from "../execptions/bad-request";
import { ErrorCodes } from "../execptions/root.exception";
import { UnAuthorizedException } from "../execptions/unauthorized";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

// to create a new account
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = userSignUpSchema.parse(req.body);
  const hashedPassword = hashSync(validatedData?.password, 10);

  const user = await prismaClient.user.findFirst({
    where: { email: validatedData?.email },
  });

  if (user) {
    throw new BadRequestException(
      "User already exists",
      ErrorCodes.USER_ALREADY_EXISTS,
      user
    );
  }

  const addedUser = await prismaClient.user.create({
    data: {
      email: validatedData?.email,
      password: hashedPassword,
      firstName: validatedData?.firstName,
      lastName: validatedData?.lastName,
      phoneNumber: validatedData?.phoneNumber,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      role: true,
    },
  });

  const token = jwt.sign(
    { email: validatedData?.email, id: addedUser?.id, role: addedUser?.role },
    JWT_SECRET
  );

  res.json({ addedUser, token });
};

// Login with email and password
export const passwordLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = signInSchema.parse(req?.body);

  const user = await prismaClient.user.findFirstOrThrow({
    where: { email: validatedData?.email },
    // select: {
    //   id: true,
    //   email: true,
    //   firstName: true,
    //   lastName: true,
    //   phoneNumber: true,
    //   role: true,
    // },
  });

  if (!user) {
    throw new BadRequestException(
      "User does not exist",
      ErrorCodes.USER_NOT_FOUND
    );
  }

  if (!compareSync(validatedData?.password, user.password)) {
    throw new BadRequestException(
      "Incorrect password",
      ErrorCodes.UNAUTHORIZED_ACCESS
    );
  }

  const token = jwt.sign(
    { email: validatedData?.email, id: user?.id, role: user?.role },
    JWT_SECRET
  );

  // let userResponse;

  const { password, createdAt, updatedAt, ...userResponse } = user;

  res.send({ userResponse, token });
};

// Login with email and otp
export const otpLogin = async () => {};

export const resetPassword = async () => {};

export const forgotPassword = async () => {};
