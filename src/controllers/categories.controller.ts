import { NextFunction, Request, Response } from "express";
import {
  AddCategoriesSchema,
  categorySingle,
  EditCategoriesSchema,
} from "../schema/categories.schema";
import { prismaClient } from "..";
import { BadRequestException } from "../execptions/bad-request";
import { ErrorCodes } from "../execptions/root.exception";
import { ExtendedRequest } from "../middlewares/auth.middleware";

export const createCategories = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const validatedData = AddCategoriesSchema.parse(req?.body);

  const user = await prismaClient.user.findFirst({
    where: { email: req?.user?.email },
  });

  if (!user) {
    throw new BadRequestException("User cannot be found", 4000);
  }

  const addCategory = await prismaClient.categories.create({
    data: {
      createdBy: +req?.user?.id!,
      category: validatedData?.category,
      subCategory: validatedData?.subCategory,
      description: validatedData?.description,
    },
  });

  res.json({ addedCategory: addCategory });
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await prismaClient.categories.findMany();

  res.status(200).json(categories);
};

export const editCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validatedData = EditCategoriesSchema.parse(req?.body);

  if (
    !validatedData?.category &&
    !validatedData?.description &&
    !validatedData?.subCategory
  ) {
    throw new BadRequestException(
      "Atleast one field has to be updated",
      ErrorCodes.INTERNAL_EXCEPTION
    );
  }

  const updatedCategory = await prismaClient.categories.update({
    where: { categoryId: +validatedData?.categoryId },
    data: {
      // category: validatedData?.category!,
      // subCategory: validatedData?.subCategory!,
      // description: validatedData?.description!,
      ...(validatedData.category && { category: validatedData.category }),
      ...(validatedData.subCategory && {
        subCategory: validatedData.subCategory,
      }),
      ...(validatedData.description && {
        description: validatedData.description,
      }),
    },
  });

  res.status(200).json(updatedCategory);
};

export const deleteCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req?.params?.id;

  const deletedCategory = await prismaClient.categories.delete({
    where: { categoryId: id },
  });

  res.status(200).json(deletedCategory);
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = +req?.params?.id;
  const category = await prismaClient.categories.findFirst({
    where: { categoryId: id },
  });

  res.status(200).json(category);
};

export const getOnlyCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mainCategories = await prismaClient.categories.groupBy({
    by: ["category"], // Grouping by category to ensure uniqueness
  });

  res.status(200).json(mainCategories);
};

export const getSubCategoryByCategoryId = async (
  req: Request,
  res: Response
) => {
  const validatedCategory = categorySingle.parse(req?.body);
  const subCategories = await prismaClient.categories.findMany({
    where: { category: validatedCategory?.category },
  });

  res.status(200).json(subCategories);
};
