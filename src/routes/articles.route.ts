import { Router } from "express";
import {
  addArticles,
  deleteArticles,
  editArticles,
  getArticles,
  getUser,
} from "../controllers/articles.controller";

export const articlesRouter: Router = Router();
articlesRouter.route("/get").get(getArticles);
articlesRouter.route("/me").get(getUser);

export const articlesRouterAdmin: Router = Router();
articlesRouterAdmin.route("/add/admin").post(addArticles);
articlesRouterAdmin.route("/delete/admin").delete(deleteArticles);
articlesRouterAdmin.route("/edit/admin").put(editArticles);
