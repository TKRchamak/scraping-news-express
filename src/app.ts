import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import newsRouter from "./modules/News/news.router";
import areaRouter from "./modules/Area/area.router";
import tagRouter from "./modules//Tag/tag.router";
// import fs from "fs";
import path from "path";
import seedData from "./utils/seed";

const app: Application = express();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// seedData(`${path.resolve(__dirname, "location.json")}`);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/api/v1/news", newsRouter);
app.use("/api/v1/area", areaRouter);
app.use("/api/v1/tag", tagRouter);

export default app;
