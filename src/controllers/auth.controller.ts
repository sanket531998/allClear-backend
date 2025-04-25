import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { signInSchema, userSignUpSchema } from "../schema/user.schema";
import { compareSync, hashSync } from "bcryptjs";
import { BadRequestException } from "../execptions/bad-request";
import { ErrorCodes } from "../execptions/root.exception";
import { UnAuthorizedException } from "../execptions/unauthorized";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { sendEmail } from "../services/email.service";
import { InternalException } from "../execptions/internal.exception";
import { EmailSchema } from "../schema/articles.schema";

export const sendOTPViaEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const verifiedEmail = EmailSchema.parse(req.body);
  let emailStatus;
  let otp = Math.floor((Math.random() + 1) * 100000);

  try {
    emailStatus = await sendEmail(verifiedEmail.email, otp);
  } catch (error) {
    throw new InternalException(`Error while sending email ${error}`, 500);
  }

  res.status(200).json({
    response: emailStatus,
    success: true,
    status: "email sent successfully",
    otp: otp,
  });
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { userSentOtp, apiResponseOtp } = req.body;

  try {
    if (userSentOtp === apiResponseOtp) {
      res.status(200).json({ success: true, status: "otp matched" });
    } else {
      throw new UnAuthorizedException("Incorrect OTP", 404, 404);
    }
  } catch (error) {
    throw new UnAuthorizedException("Incorrect OTP", 404, 404);
  }
};

// to create a new account
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validatedData = userSignUpSchema.parse(req.body);

  // Verify email

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

// Auth 2.0 login with google
export const auth2Login = async () => {};

export const resetPassword = async () => {};

export const forgotPassword = async () => {};
