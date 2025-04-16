import { Router } from "express";
import authRouter from "./auth.route";
import { articlesRouter, articlesRouterAdmin } from "./articles.route";
import { AdminMiddleware } from "../middlewares/admin.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import { categoriesRouter } from "./categories.route";
import { PremiumCategoriesRouter } from "./premium-categories.route";

const rootRouter: Router = Router();

// Auth router
rootRouter.use("/auth", authRouter);

// Articles router with 2 types, admin and user
rootRouter.use(
  "/articles/admin",
  [authMiddleware, AdminMiddleware],
  articlesRouterAdmin
);
rootRouter.use("/articles/user", [authMiddleware], articlesRouter);

// Categories router
rootRouter.use(
  "/categories/admin",
  [authMiddleware, AdminMiddleware],
  categoriesRouter
);

rootRouter.use(
  "/premimumCategories/admin",
  [authMiddleware, AdminMiddleware],
  PremiumCategoriesRouter
);

export default rootRouter;
