import { Router } from "express";
import {
  createCategories,
  deleteCategories,
  editCategories,
  getCategories,
  getCategoryById,
  getOnlyCategories,
  getSubCategoryByCategoryId,
} from "../controllers/categories.controller";
import { errorHandler } from "../../error-handler";
import { error } from "console";

export const categoriesRouter: Router = Router();

categoriesRouter.route("/add").post(errorHandler(createCategories));
categoriesRouter.route("/get").get(errorHandler(getCategories));
categoriesRouter.route("/delete/:id").delete(errorHandler(deleteCategories));
categoriesRouter.route("/getById/:id").get(errorHandler(getCategoryById));
categoriesRouter
  .route("/getOnlyCategories")
  .get(errorHandler(getOnlyCategories));

categoriesRouter
  .route("/getSubCategoriesByCategoryId")
  .get(errorHandler(getSubCategoryByCategoryId));
categoriesRouter.route("/edit").patch(errorHandler(editCategories));
