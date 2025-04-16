import { Router } from "express";
import {
  addArticles,
  deleteArticles,
  editArticles,
  getArticles,
  getUser,
} from "../controllers/articles.controller";
import { errorHandler } from "../../error-handler";

export const articlesRouter: Router = Router();
articlesRouter.route("/get").get(getArticles);
articlesRouter.route("/me").get(getUser);

export const articlesRouterAdmin: Router = Router();
articlesRouterAdmin.route("/add").post(errorHandler(addArticles));
articlesRouterAdmin.route("/delete").delete(deleteArticles);
articlesRouterAdmin.route("/edit").put(editArticles);
