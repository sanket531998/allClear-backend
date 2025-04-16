import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../middlewares/auth.middleware";
import { AddArticlesSchema } from "../schema/articles.schema";
import { prismaClient } from "..";
import { BadRequestException } from "../execptions/bad-request";
import { ErrorCodes } from "../execptions/root.exception";
import { PremiumCategoriesTypes } from "@prisma/client";

export const getUser = async (req: ExtendedRequest, res: Response) => {
  console.log(req?.user);
  res.send(req?.user);
};

export const addArticles = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const validatedArticlesData = AddArticlesSchema.parse(req?.body);
  let category;
  const user = req?.user;
  let premiumType;

  try {
    category = await prismaClient.categories.findFirstOrThrow({
      where: {
        category: validatedArticlesData?.categoryType,
        subCategory: validatedArticlesData?.categorySubType,
      },
    });
  } catch (error) {
    throw new BadRequestException(
      "Incorrect category or subCategory",
      ErrorCodes.INTERNAL_EXCEPTION
    );
  }

  try {
    premiumType = await prismaClient.premiumCategories.findFirstOrThrow({
      where: {
        premiumCategory:
          validatedArticlesData?.premiumCategoryType as PremiumCategoriesTypes,
      },
    });
  } catch (error) {
    throw new BadRequestException(
      "Incorrect premium type",
      ErrorCodes.INTERNAL_EXCEPTION
    );
  }

  // const addedArticle = await prismaClient.articles.create({
  //   data: {
  //     title: validatedArticlesData?.title,
  //     author: validatedArticlesData?.author,
  //     content: validatedArticlesData?.content,

  //     location: validatedArticlesData?.location
  //       ? validatedArticlesData?.location
  //       : "",

  //     categoryType: category?.categoryId,
  //     addedBy: user?.id!,
  //     premiumCategoryType: premiumType?.premiumCategoriesTypeId,
  //   },
  // });

  res.status(200).json({
    test: "Test",
  });
};

export const getArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const editArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const deleteArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
