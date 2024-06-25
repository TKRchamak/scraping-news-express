import express from "express";
import {
  getNewsList,
  removeNewsCollectionForDivision,
  updateNewsCollectionForDivision,
} from "./news.controller";
import scrapeData from "../../utils/scrapingWithCheerio";
import validationMiddleware from "../../middleware/validation.middleware";
import { body, param } from "express-validator";

const router = express.Router();

router.post(
  "/list",
  [
    body("query").notEmpty().withMessage("Query is required"),
    body("sortField").notEmpty().withMessage("SortField is required"),
    body("sortOrder").notEmpty().withMessage("SortOrder is required"),
    body("limit").notEmpty().withMessage("Limit is required"),
    validationMiddleware,
  ],
  getNewsList
);
router.get(
  "/addNews/:division",
  [
    // add validation middleware
    param("division")
      .trim()
      .notEmpty()
      .withMessage("Division Name is required"),
    validationMiddleware,
  ],
  updateNewsCollectionForDivision
);

router.delete("/deleteNews/:division", removeNewsCollectionForDivision);

// router.get("/test", (req, res) => {
//   scrapeData("ঢাকা-বিভাগ", "ঢাকা", "দোহার");

//   res.status(200).json({
//     status: "success",
//     data: "testing",
//   });
// });

export default router;
