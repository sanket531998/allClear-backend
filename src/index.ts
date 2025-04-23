// import app from "./app";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express } from "express";
import rootRouter from "./routes/index.routes";
import { errorHandler } from "../error-handler";
import { errorMiddleware } from "./middlewares/error.middleware";
import * as SibApiV3Sdk from "sib-api-v3-sdk";
import { BREVO_API_KEY } from "./secrets";

dotenv.config({ path: ".env" });

const app: Express = express();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = BREVO_API_KEY; // Replace with your actual Brevo API key

export const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

app.use(express.json());
app.use("/api/v1", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server runing at http://localhost:${process.env.PORT}`);
});
