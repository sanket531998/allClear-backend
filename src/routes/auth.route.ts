import { Router } from "express";
import {
  passwordLogin,
  sendOTPViaEmail,
  signUp,
  verifyOtp,
} from "../controllers/auth.controller";
import { errorHandler } from "../../error-handler";
import { sendEmail } from "../services/email.service";

const authRouter: Router = Router();

authRouter.route("/send-email").post(sendOTPViaEmail);
authRouter.route("/verify-otp").post(verifyOtp);

// first time login
authRouter.route("/signup").post(errorHandler(signUp));

// every following login
authRouter.route("/login").post(errorHandler(passwordLogin));

export default authRouter;
