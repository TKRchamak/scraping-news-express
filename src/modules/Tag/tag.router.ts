import express, { Request, Response } from "express";
import { body } from "express-validator";
import validationMiddleware from "../../middleware/validation.middleware";
import { readTagList } from "./tag.service";

const router = express.Router();

router.get("/list", async (req: Request, res: Response) => {
  try {
    const tagList = await readTagList();
    res.status(200).json({
      status: "success",
      data: tagList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      error,
    });
  }
});

export default router;
