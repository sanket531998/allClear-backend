import express, { Express } from "express";
import authRouter from "./routes/auth.route";

const app: Express = express();

app.use("api/v1/auth", authRouter);
