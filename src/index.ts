import express, { Express } from "express";

const app: Express = express();

app.on("error", () => {
  console.log("hello world");
});

app.listen(3000, () => {
  console.log("Server runing at http://localhost:3000");
});
