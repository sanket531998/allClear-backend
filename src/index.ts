// import app from "./app";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import express, { Express } from "express";
import rootRouter from "./routes/index.routes";
import { errorHandler } from "../error-handler";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config({ path: ".env" });

const app: Express = express();

app.use(express.json());
app.use("/api/v1", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server runing at http://localhost:${process.env.PORT}`);
});
