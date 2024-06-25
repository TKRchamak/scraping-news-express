import express from "express";
import { body } from "express-validator";
import validationMiddleware from "../../middleware/validation.middleware";
import { getAreaList } from "./area.controller";

const router = express.Router();

router.get("/get-list", getAreaList);

router.put(
  "/update",
  [
    body("id").notEmpty().withMessage("ID is required"),
    body("lastUpdate").notEmpty().withMessage("Update Time is required"),
    validationMiddleware,
  ]
  //   updateNewsCollection
);

export default router;
