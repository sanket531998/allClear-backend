import { NextFunction, Request, Response } from "express";
import { AddCategoriesSchema } from "../schema/categories.schema";
import { prismaClient } from "..";
import { BadRequestException } from "../execptions/bad-request";
import { ErrorCodes } from "../execptions/root.exception";

export const createCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
