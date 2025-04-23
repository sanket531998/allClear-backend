import { Router } from "express";
import {
  addArticles,
  deleteArticles,
  editArticles,
  getArticles,
  getUser,
} from "../controllers/articles.controller";
import { errorHandler } from "../../error-handler";
import { AdminMiddleware } from "../middlewares/admin.middleware";

export const articlesRouter: Router = Router();
articlesRouter.route("/get").get(getArticles);
articlesRouter.route("/me").get(getUser);

export const articlesRouterAdmin: Router = Router();
articlesRouterAdmin.post("/add", [AdminMiddleware], errorHandler(addArticles));
articlesRouterAdmin.route("/delete").delete(deleteArticles);
articlesRouterAdmin.route("/edit").put(editArticles);
