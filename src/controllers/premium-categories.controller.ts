import { NextFunction, Request, Response } from "express";
import { PremiumSchema } from "../schema/premium.schema";
import { prismaClient } from "..";

export const createPremiumCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = PremiumSchema.parse(req?.body);

  // const addedPremiumCategory = await prismaClient.premiumCategories.create({
  //   data: { premiumCategory: validatedData?.premiumCategory },
  // });

  res.status(200).json();
};

export const getPremiumCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const premiumCategories
};

export const deletePremiumCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
