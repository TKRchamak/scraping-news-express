import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(200).json({
      isSuccess: false,
      error: errors.array()[0].msg,
      data: null,
    });
  } else {
    next();
  }
}
