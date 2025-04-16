import { Router } from "express";
import { errorHandler } from "../../error-handler";
import { createPremiumCategories } from "../controllers/premium-categories.controller";

export const PremiumCategoriesRouter: Router = Router();

PremiumCategoriesRouter.route("/add").post(
  errorHandler(createPremiumCategories)
);

// PremiumCategoriesRouter.route("/get").get(errorHandler());
// PremiumCategoriesRouter.route("/delete").delete(errorHandler());
