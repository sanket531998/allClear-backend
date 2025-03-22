import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../middlewares/auth.middleware";

export const getUser = async (req: ExtendedRequest, res: Response) => {
  console.log(req?.user);
  res.send(req?.user);
};

export const addArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
