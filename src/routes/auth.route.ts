import { Router } from "express";

const authRouter: Router = Router();

authRouter.route("/login").get((req, res) => {
  console.log("login");
});

export default authRouter;
