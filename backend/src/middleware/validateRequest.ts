import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors: Record<string, string> = {};

    errors.array().forEach((err: any) => {
      formattedErrors[err.path] = err.msg;
    });

    return res.status(422).json({
      message: "Validation failed",
      errors: formattedErrors,
    });
  }

  next();
};
