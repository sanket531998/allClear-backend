import { Router } from "express";
import { passwordLogin, signUp } from "../controllers/auth.controller";
import { errorHandler } from "../../error-handler";

const authRouter: Router = Router();

authRouter.route("/signup").post(errorHandler(signUp));
authRouter.route("/login").post(errorHandler(passwordLogin));

export default authRouter;
