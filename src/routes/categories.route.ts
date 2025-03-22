import { Router } from "express";
import { createCategories } from "../controllers/categories.controller";

export const categoriesRouter: Router = Router();

categoriesRouter.route("/").post(createCategories);
